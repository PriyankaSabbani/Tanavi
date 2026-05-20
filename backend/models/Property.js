const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  propertyCode: { type: String, unique: true, index: true },
  title: { type: String, required: true, index: true },
  category: { type: String, required: true, index: true },
  price: { type: String, required: true },
  location: { type: String, required: true, index: true },
  area: String,
  acres: Number,
  guntas: Number,
  road: String,
  roadType: String,
  propertyUnder: String,
  bedrooms: Number,
  bathrooms: Number,
  propertyFacing: String,
  boundaryType: String,
  bore: String,
  anyPTCase: String,
  propertyLocation: String,
  'revenueRegistration/subRegister': String,
  propertyCity: String,
  district: String,
  state: String,
  locationUrl: String,
  plotArea: Number,
  plotAreaSqYards: Number,
  totalFloors: Number,
  portions: Number,
  flatType: String,
  floorDetails: String,
  buildupArea: Number,
  propertyAge: Number,
  buildingAge: Number,
  furnishingStatus: String,
  parkingDetails: String,
  numberOfCarParking: Number,
  numberOfCarParkings: Number,
  expectedPrice: String,
  farmhouseAreaAcres: Number,
  swimmingPool: String,
  anyConstruction: String,
  commercialPropertyType: String,
  transactionType: String,
  garden: String,
  washrooms: Number,
  washroomInside: Number,
  washroomOutside: Number,
  washroomTotal: Number,
  description: String,
  features: [String],
  images: [String],
  video: String,
  status: { type: String, enum: ['available', 'sold', 'pending'], default: 'available', index: true },
  soldDate: { type: Date },
  sections: { type: [String], enum: ['featured', 'highlights', 'choice', 'user-submitted'] },
  expiryDate: { type: Date, index: true },
  isActive: { type: Boolean, default: true, index: true },
  renewalCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  parkingType: { type: String, enum: ['Public', 'Reserved', ''], default: '' },
  parkingCount: { type: Number, default: 0 },
  // User submission fields
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  name: String,
  email: String,
  phone: String,
  verificationDocuments: [String], // Secure storage for property confirmation documents
  // Office Space specific fields
  builtUpArea: String,
  pricePerSqFt: String,
  expectedRent: String,
  depositAmount: String,
  floor: String,
  plugAndPlay: String,
  workStations: String,
  cabins: String,
  conferenceHall: String,
  pantry: String,
  washroomDetails: String
}, { strict: true });

propertySchema.statics.generateUniquePropertyCode = async function() {
  const prefix = 'TP';
  const year = new Date().getFullYear().toString().slice(-2);
  const key = `${prefix}${year}`;

  try {
    // Use a dedicated counter collection and an atomic increment to avoid race conditions
    const coll = mongoose.connection.collection('property_code_counters');
    
    // First, get the current highest property code to sync the counter
    const latestProperty = await this.findOne(
      { propertyCode: { $regex: `^${prefix}${year}` } },
      { propertyCode: 1 }
    ).sort({ propertyCode: -1 }).lean();
    
    let startCounter = 1;
    if (latestProperty && latestProperty.propertyCode) {
      const codeNumber = parseInt(latestProperty.propertyCode.slice(-4));
      if (!isNaN(codeNumber)) {
        startCounter = codeNumber + 1;
      }
    }
    
    // Reset counter to sync with actual data
    await coll.findOneAndUpdate(
      { _id: key },
      { $max: { seq: startCounter } },
      { upsert: true }
    );
    
    // Use findOneAndUpdate with $inc to atomically increment and get the new value
    const result = await coll.findOneAndUpdate(
      { _id: key },
      { $inc: { seq: 1 } },
      { upsert: true, returnDocument: 'after' }
    );
    
    const counter = (result.value && result.value.seq) || startCounter;
    let propertyCode = `${prefix}${year}${String(counter).padStart(4, '0')}`;
    
    // Verify uniqueness - if exists, keep incrementing until we find a unique code
    let attempts = 0;
    while (await this.exists({ propertyCode }) && attempts < 100) {
      const result = await coll.findOneAndUpdate(
        { _id: key },
        { $inc: { seq: 1 } },
        { upsert: true, returnDocument: 'after' }
      );
      const counter = (result.value && result.value.seq) || 1;
      propertyCode = `${prefix}${year}${String(counter).padStart(4, '0')}`;
      attempts++;
    }
    
    return propertyCode;
    
  } catch (err) {
    console.error('Error generating property code:', err);
    // If counter store fails, fallback to timestamp-based unique code
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    return `${prefix}${year}${timestamp.slice(-4)}${random}`.slice(0, 8);
  }
};

propertySchema.pre('save', async function(next) {
  if (!this.propertyCode) {
    this.propertyCode = await this.constructor.generateUniquePropertyCode();
  }
  if (this.isNew && !this.expiryDate) {
    this.expiryDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
  }
  next();
});

propertySchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();
  if (update && !update.propertyCode) {
    const doc = await this.model.findOne(this.getQuery());
    if (doc && !doc.propertyCode) {
      update.propertyCode = await this.model.generateUniquePropertyCode();
      this.setUpdate(update);
    }
  }
  next();
});

propertySchema.index({ status: 1, sections: 1 });
propertySchema.index({ category: 1, status: 1 });

module.exports = mongoose.model('Property', propertySchema);
