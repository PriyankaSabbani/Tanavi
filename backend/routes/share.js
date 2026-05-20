const express = require('express');
const Property = require('../models/Property');
const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).send('Property not found');
    }

    // Construct full image URL - ALWAYS use HTTPS for WhatsApp compatibility
    const apiUrl = process.env.BACKEND_URL || process.env.API_URL || 'http://localhost:5000';
    let imageUrl = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200';
    
    if (property.images?.[0]) {
      const imagePath = property.images[0];
      // Check if it's already a full URL (Cloudinary or external)
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        // Force HTTPS for ALL URLs (required by WhatsApp)
        imageUrl = imagePath.replace(/^http:\/\//i, 'https://');
      } else {
        // Local upload - construct full URL with HTTPS
        const secureApiUrl = apiUrl.replace(/^http:\/\//i, 'https://');
        imageUrl = `${secureApiUrl}/uploads/${imagePath}`;
      }
    }
    
    const propertyId = property.propertyCode ? `[${property.propertyCode}]` : '';
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const propertyUrl = `${frontendUrl}/property/${property._id}`;
    
    // Format price
    const formattedPrice = property.price ? `₹${property.price}` : 'Price on request';
    
    // Create title - Property Code and Title
    const title = `${propertyId} ${property.title}`;
    
    // Create description - Category, Price, Location
    const description = `${property.category || 'Property'} - ${formattedPrice} at ${property.location}. Your trusted partner in finding the perfect property!`;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>${title}</title>
  <meta name="title" content="${title}">
  <meta name="description" content="${description}">
  
  <!-- Open Graph / Facebook / WhatsApp -->
  <meta property="fb:app_id" content="1234567890" />
  <meta property="og:type" content="website">
  <meta property="og:url" content="${propertyUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:secure_url" content="${imageUrl}">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${property.title} - ${property.location}">
  <meta property="og:site_name" content="Tanavi Properties">
  <meta property="og:locale" content="en_IN">
  
  <!-- Force WhatsApp to refresh cache -->
  <meta property="og:updated_time" content="${Date.now()}" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${propertyUrl}">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${imageUrl}">
  <meta name="twitter:image:alt" content="${property.title}">
  
  <!-- Additional Meta Tags -->
  <link rel="canonical" href="${propertyUrl}">
  <link rel="icon" type="image/x-icon" href="${frontendUrl}/favicon.ico">
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
    }
    .container {
      max-width: 500px;
      text-align: center;
      background: rgba(255, 255, 255, 0.1);
      padding: 40px;
      border-radius: 20px;
      backdrop-filter: blur(10px);
    }
    .spinner {
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top: 4px solid white;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    h2 {
      font-size: 24px;
      margin-bottom: 15px;
      font-weight: 600;
    }
    p {
      font-size: 16px;
      margin-bottom: 10px;
      opacity: 0.9;
    }
    .property-info {
      margin: 20px 0;
      padding: 15px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 10px;
    }
    a {
      color: white;
      text-decoration: none;
      display: inline-block;
      margin-top: 20px;
      padding: 12px 30px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 25px;
      transition: all 0.3s ease;
      border: 2px solid white;
    }
    a:hover {
      background: white;
      color: #667eea;
    }
  </style>
  
  <script>
    // Only redirect if it's a real user (not a bot/crawler)
    // WhatsApp and other social media crawlers don't execute JavaScript
    if (!/bot|crawler|spider|crawling|whatsapp|facebook|twitter/i.test(navigator.userAgent)) {
      setTimeout(function() {
        window.location.href = '${propertyUrl}';
      }, 1500);
    } else {
      // For crawlers, redirect after longer delay
      setTimeout(function() {
        window.location.href = '${propertyUrl}';
      }, 5000);
    }
  </script>
</head>
<body>
  <div class="container">
    <div class="spinner"></div>
    <h2>Loading Property Details</h2>
    <div class="property-info">
      <p><strong>${title}</strong></p>
      <p>${description}</p>
    </div>
    <p>Redirecting you to Tanavi Properties...</p>
    <a href="${propertyUrl}">View Property Now</a>
  </div>
</body>
</html>
    `;

    res.set('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error('Error in share route:', error);
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Error - Tanavi Properties</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #f5f5f5;
            margin: 0;
          }
          .error {
            text-align: center;
            padding: 40px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
        </style>
      </head>
      <body>
        <div class="error">
          <h1>Property Not Found</h1>
          <p>Sorry, we couldn't load this property.</p>
          <a href="${process.env.FRONTEND_URL || 'https://tanaviproperties.com'}">Go to Homepage</a>
        </div>
      </body>
      </html>
    `);
  }
});

module.exports = router;
