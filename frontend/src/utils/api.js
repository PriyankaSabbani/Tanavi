const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const getImageUrl = (imagePath, options = {}) => {
  if (!imagePath) return 'https://via.placeholder.com/400x300?text=No+Image';
  
  // If it's already a full URL (Cloudinary or external)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    // For Cloudinary URLs, we can modify the URL to get different image qualities
    if (imagePath.includes('cloudinary.com') && options.fullResolution) {
      // Remove any existing transformations and get the original image
      return imagePath.replace(/\/upload\/[^/]+/, '/upload');
    }
    return imagePath;
  }
  
  // If it's a local path (starts with /uploads/)
  if (imagePath.startsWith('/uploads/')) {
    return `${API_URL}${imagePath}`;
  }
  
  // If it's just a filename or relative path
  return `${API_URL}/uploads/${imagePath}`;
};

export const fetchWithTimeout = async (url, options = {}, timeout = 30000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        ...options.headers,
      }
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - please check your internet connection');
    }
    throw error;
  }
};

export default API_URL;
