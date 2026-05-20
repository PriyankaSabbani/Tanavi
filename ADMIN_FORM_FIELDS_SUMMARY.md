# Admin Dashboard - Dynamic Property Form Fields

## Overview
The admin form now dynamically shows different fields based on the selected property category. All fields are configured in `/admin-portal/src/utils/propertyFieldsConfig.js`.

## Fields by Category

### 1. Agricultural Land
- Acres *
- Guntas *
- Expected Price *
- Property Facing * (dropdown: East, West, North, South, Corner)
- Road Type * (dropdown: Highway, BT Road, Matti Road)
- Road *
- Property Under * (dropdown: GHMC, Municipal Corporation, Municipality, Gram Panchayat)
- Boundary Type * (dropdown: Compound Wall, Precast Compound, Fencing, Open)
- Bore * (text input)
- Any PT Case * (dropdown: Yes, No)
- Property Location *
- Revenue Registration *
- Sub-Register *
- Property City *
- District *
- State *
- Property Location URL (Optional)
- Property Images (Max 8)
- Property Video (Max 30 seconds)

### 2. Independent House
- Plot Area (Sq Yards) *
- Total Floors *
- Portions *
- Bedrooms *
- Washrooms *
- Furnishing Status * (dropdown: Fully Furnished, Semi-Furnished, Unfurnished)
- Building Age *
- Parking Details * (dropdown: Public, Reserved)
- Number of Car Parkings *
- Expected Price *
- Bore * (text input)
- Road Type * (dropdown: Highway-Commercial, Semi Commercial, Residential)
- Road *
- Property Under * (dropdown: GHMC, Municipal Corporation, Municipality, Gram Panchayat)
- Property Facing * (dropdown: East, West, North, South, Corner)
- Property Location *
- District *
- State *
- Property Location URL (Optional)
- Property Images (Max 8)
- Property Video (Max 30 seconds)

### 3. Apartment
- Flat Type * (dropdown: Single Bedroom, Double Bedroom, Triple Bedroom)
- Buildup Area *
- Expected Price *
- Floor Details *
- Property Age *
- Furnishing Status * (dropdown: Fully Furnished, Semi-Furnished, Unfurnished)
- **Washroom Details * (3 fields: Inside, Outside, Total)**
- Parking Details *
- Number of Car Parking *
- Road Type * (dropdown: Tar Road, Metal Road, Mud Road, Pucca Road)
- Road *
- Property Under * (dropdown: Gram Panchayat, Municipality, Corporation, HMDA, DTCP)
- Property Facing * (dropdown: East, West, North, South, North-East, North-West, South-East, South-West)
- Property Location *
- Revenue Registration *
- Sub-Register *
- Property City *
- District *
- State *
- Property Location URL (Optional)
- Property Images (Max 8)
- Property Video (Max 30 seconds)

### 4. Open Plot
- Plot Area *
- Expected Price *
- Bore * (dropdown: Yes, No)
- Road Type * (dropdown: Tar Road, Metal Road, Mud Road, Pucca Road)
- Road *
- Property Under * (dropdown: Gram Panchayat, Municipality, Corporation, HMDA, DTCP)
- Property Facing * (dropdown: East, West, North, South, North-East, North-West, South-East, South-West)
- Property Location *
- Revenue Registration *
- Sub-Register *
- Property City *
- District *
- State *
- Property Location URL (Optional)
- Property Images (Max 8)
- Property Video (Max 30 seconds)

### 5. Farmhouse
- Farmhouse Area (Acres) *
- Guntas *
- Expected Price *
- Road Type * (dropdown: Tar Road, Metal Road, Mud Road, Pucca Road)
- Road *
- Property Under * (dropdown: Gram Panchayat, Municipality, Corporation, HMDA, DTCP)
- Property Facing * (dropdown: East, West, North, South, North-East, North-West, South-East, South-West)
- Boundary Type * (dropdown: Fencing, Wall, Compound, Open)
- Any PT Case * (dropdown: Yes, No)
- Bore * (dropdown: Yes, No)
- Swimming Pool * (dropdown: Yes, No)
- Any Construction * (dropdown: Yes, No)
- **Washroom Details * (3 fields: Inside, Outside, Total)**
- Garden * (dropdown: Yes, No)
- Property Location *
- Revenue Registration *
- Sub-Register *
- Property City *
- District *
- State *
- Property Location URL (Optional)
- Property Images (Max 8)
- Property Video (Max 30 seconds)

### 6. Commercial Space
- Commercial Property Type * (dropdown: Office Space, Retail Space, Warehouse, Showroom, Co-working Space)
- Transaction Type * (dropdown: Sale, Rent, Lease)
- Road Type * (dropdown: Tar Road, Metal Road, Mud Road, Pucca Road)
- Road *
- Property Under * (dropdown: Gram Panchayat, Municipality, Corporation, HMDA, DTCP)
- Property Facing * (dropdown: East, West, North, South, North-East, North-West, South-East, South-West)
- Property Location *
- Revenue Registration *
- Sub-Register *
- Property City *
- District *
- State *
- Property Location URL (Optional)
- Property Images (Max 8)
- Property Video (Max 30 seconds)

### 7. Office Space (Custom Implementation)
- Built-up Area (Sq. Ft) *
- Floor *
- Expected Price (Per Sq.Ft) *
- Deposit Amount *
- Plug & Play * (dropdown: Yes, No)
- Work Stations *
- Cabins *
- Conference Hall *
- Pantry *
- Washroom Details *
- Property Images (Max 8)
- Property Video (Max 30 seconds)

## Common Fields (All Categories)
- Title *
- Category * (dropdown)
- Location * (dropdown: Hyderabad, Secunderabad, Gachibowli, Madhapur, Kondapur, Kukatpally, Miyapur, Nizampet, Bachupally, Kompally)
- Status (dropdown: Available, Pending, Sold)
- Display Sections (checkboxes: Featured, Highlights, Choice Property - max 3)
- Description
- Features (comma separated)

## Notes
- Fields marked with * are required
- All numeric fields only accept numbers
- Images are compressed before upload (max 5MB per image)
- Videos must be 30 seconds or less (max 50MB)
- Property Location URL is optional for all categories
- The form automatically shows/hides fields based on the selected category
- All field configurations are centralized in `propertyFieldsConfig.js` for easy maintenance

## How It Works
1. Admin selects a property category
2. Form dynamically renders fields from `PROPERTY_FIELDS_CONFIG[category]`
3. Office Space uses custom implementation (already existing)
4. All other categories use the configuration-driven approach
5. Form data is validated and submitted to the backend
