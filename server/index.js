import express from 'express';
import cors from 'cors';
import { readDB, writeDB } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'AnaajSetu Backend REST API', timestamp: new Date().toISOString() });
});

// 1. Get all crops
app.get('/api/crops', (req, res) => {
  const db = readDB();
  res.json(db.crops || []);
});

// 2. Post new crop batch
app.post('/api/crops', (req, res) => {
  const db = readDB();
  const cropData = req.body;
  
  const newCrop = {
    id: `crop-${Date.now()}`,
    name: cropData.name || 'Organic Harvest Batch',
    hindiName: cropData.hindiName || 'जैविक फसल',
    category: cropData.category || 'Grains & Cereals',
    variety: cropData.variety || 'Standard Grade',
    location: cropData.location || 'Karnal, Haryana',
    fpoName: cropData.fpoName || 'Karnal Agri-Export FPO',
    farmerName: cropData.farmerName || 'Registered Farmer',
    farmerRating: 5.0,
    farmerImage: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=200&auto=format&fit=crop&q=80',
    image: cropData.image || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
    availableQtyKg: Number(cropData.availableQtyKg || 1000),
    minOrderKg: 20,
    unit: 'kg',
    grade: cropData.grade || 'Grade A',
    harvestDate: new Date().toISOString().split('T')[0],
    farmerEarnings: Number(cropData.farmerEarnings || 38.5),
    logisticsCost: 3.5,
    platformFee: 1.5,
    anaajSetuPrice: Number(cropData.anaajSetuPrice || 43.5),
    agmarknetBasePrice: Number(cropData.agmarknetBasePrice || 31.0),
    traditionalRetailPrice: Number(cropData.agmarknetBasePrice || 31.0) * 2.0,
    organic: cropData.organic ?? true,
    moistureContent: '11.5%',
    description: cropData.description || 'Farm-fresh crop listing connected to local FPO hub.',
    demandStatus: 'High Demand'
  };

  db.crops.unshift(newCrop);
  writeDB(db);

  res.status(201).json({ success: true, message: 'Produce batch successfully listed in AnaajSetu database!', crop: newCrop });
});

// 3. Get FPO Village Hubs
app.get('/api/hubs', (req, res) => {
  const db = readDB();
  res.json(db.fpoHubs || []);
});

// 4. Get Agmarknet Live Mandi Rates
app.get('/api/mandi', (req, res) => {
  const db = readDB();
  res.json(db.mandiRates || []);
});

// 5. Escrow Orders Endpoint
app.post('/api/orders', (req, res) => {
  const db = readDB();
  const { items, totalAmount, buyerType } = req.body;

  const newOrder = {
    id: `ORDER-ESCROW-${Math.floor(100000 + Math.random() * 900000)}`,
    items: items || [],
    totalAmount: totalAmount || 0,
    buyerType: buyerType || 'consumer',
    escrowStatus: 'LOCKED', // LOCKED -> IN_TRANSIT -> QUALITY_VERIFIED -> RELEASED
    paymentMethod: 'Bank Escrow Protected UPI',
    createdAt: new Date().toISOString()
  };

  db.orders.unshift(newOrder);
  writeDB(db);

  res.status(201).json({
    success: true,
    message: 'Payment securely held in Bank Escrow. Funds will be released to farmer upon quality check at destination hub.',
    order: newOrder
  });
});

app.get('/api/orders', (req, res) => {
  const db = readDB();
  res.json(db.orders || []);
});

// 6. AI Fair Pricing Recommender API
app.post('/api/ai/pricing', (req, res) => {
  const { agmarknetBasePrice, grade, organic } = req.body;
  const base = Number(agmarknetBasePrice || 30);
  
  let gradeMultiplier = grade === 'Grade A+' ? 1.15 : grade === 'Grade A' ? 1.08 : 0.95;
  let organicMultiplier = organic ? 1.12 : 1.0;

  const recommendedFarmerEarning = Math.round(base * 1.20 * gradeMultiplier * organicMultiplier * 10) / 10;
  const estimatedLogistics = Math.round((base * 0.08 + 1.5) * 10) / 10;
  const platformFee = Math.round((base * 0.03 + 0.5) * 10) / 10;
  const finalConsumerPrice = Math.round((recommendedFarmerEarning + estimatedLogistics + platformFee) * 10) / 10;
  const traditionalPrice = Math.round((base * 2.0 * gradeMultiplier) * 10) / 10;

  res.json({
    agmarknetBasePrice: base,
    recommendedFarmerEarning,
    estimatedLogistics,
    platformFee,
    finalConsumerPrice,
    traditionalPrice,
    farmerGainPercent: Math.round(((recommendedFarmerEarning - base) / base) * 100),
    consumerSavingsPercent: Math.round(((traditionalPrice - finalConsumerPrice) / traditionalPrice) * 100)
  });
});

// 7. AI Kisan Voice Assistant Endpoint
app.post('/api/ai/voice', (req, res) => {
  const { query, language } = req.body;
  const lang = language || 'hi';

  let responseText = "अनाजसेतु एआई विश्लेषण के अनुसार आपकी फसल का रेट ₹38.50/किग्रा तय हुआ है। पिकअप कल सुबह 8 बजे तय है।";
  if (lang === 'hr') {
    responseText = "राम-राम भाई! थारी गेंहू फसल का पक्का रेट ₹38.50/किग्रा तय होया सै। मंडी ते ₹7.50 फाल्तू मिलेगा अर गाम हब ते गाड़ी काल सुबे 8 बजे आवेगी!";
  } else if (lang === 'pa') {
    responseText = "ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ ਜੀ! ਤੁਹਾਡੀ ਫਸਲ ਦਾ ਰੇਟ ₹38.50/ਕਿਲੋ ਤੈਅ ਹੋਇਆ ਹੈ। ਮੰਡੀ ਨਾਲੋਂ ₹7.50 ਵਧੇਰੇ ਮਿਲੇਗਾ।";
  } else if (lang === 'mr') {
    responseText = "नमस्कार! आपल्या पिकाचा थेट दर ₹३८.५०/किलो निश्चित झाला आहे. बाजार समितीपेक्षा ₹७.५० जास्त मिळतील.";
  } else if (lang === 'bho') {
    responseText = "प्रणाम भाई! राउर फसल के सही दाम ₹38.50/किग्रा तय भईल बा। मंडी से ₹7.50 जादा मिली।";
  }

  res.json({
    query,
    language: lang,
    reply: responseText,
    audioData: null
  });
});

app.listen(PORT, () => {
  console.log(`✅ AnaajSetu Backend REST API Server listening at http://localhost:${PORT}`);
});
