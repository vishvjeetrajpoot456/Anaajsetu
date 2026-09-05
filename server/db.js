import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFilePath = path.join(__dirname, 'anaajsetu_db.json');

// Initial seed dataset
const defaultData = {
  crops: [
    {
      id: "crop-1",
      name: "Sharbati Golden Wheat",
      hindiName: "शरबाती गेंहू",
      category: "Grains & Cereals",
      variety: "Sharbati Premium",
      location: "Sehore, Madhya Pradesh",
      fpoName: "Sehore Narmada Kisan FPO",
      farmerName: "Rameshwar Singh Patel",
      farmerRating: 4.9,
      farmerImage: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=200&auto=format&fit=crop&q=80",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80",
      availableQtyKg: 4500,
      minOrderKg: 50,
      unit: "kg",
      grade: "Grade A+",
      harvestDate: "2026-08-25",
      farmerEarnings: 38.50,
      logisticsCost: 3.50,
      platformFee: 1.50,
      anaajSetuPrice: 43.50,
      agmarknetBasePrice: 31.00,
      traditionalRetailPrice: 62.00,
      organic: true,
      moistureContent: "11.2%",
      description: "Naturally sun-dried Sharbati wheat grown along the Narmada basin.",
      demandStatus: "High Demand"
    },
    {
      id: "crop-2",
      name: "Nashik Red Onions (Export Quality)",
      hindiName: "नासिक लाल प्याज",
      category: "Vegetables",
      variety: "Pusa Red",
      location: "Lasalgaon, Nashik, Maharashtra",
      fpoName: "Sahyadri Farmers Producer Co.",
      farmerName: "Eknath Rao Shinde",
      farmerRating: 4.8,
      farmerImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
      image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8ce?w=600&auto=format&fit=crop&q=80",
      availableQtyKg: 12000,
      minOrderKg: 100,
      unit: "kg",
      grade: "Grade A",
      harvestDate: "2026-08-28",
      farmerEarnings: 24.00,
      logisticsCost: 2.80,
      platformFee: 1.20,
      anaajSetuPrice: 28.00,
      agmarknetBasePrice: 17.50,
      traditionalRetailPrice: 48.00,
      organic: false,
      moistureContent: "13.5%",
      description: "Medium to large sized firm red onions with high shelf life.",
      demandStatus: "Very High Demand"
    },
    {
      id: "crop-3",
      name: "Desi Organic Tomatoes",
      hindiName: "ऑर्गेनिक देसी टमाटर",
      category: "Vegetables",
      variety: "Desi Flavored",
      location: "Kolar, Karnataka",
      fpoName: "Kolar Green Gold FPO",
      farmerName: "Venkatesh Gowda",
      farmerRating: 4.9,
      farmerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
      availableQtyKg: 3200,
      minOrderKg: 25,
      unit: "kg",
      grade: "Grade A",
      harvestDate: "2026-09-02",
      farmerEarnings: 22.00,
      logisticsCost: 3.00,
      platformFee: 1.00,
      anaajSetuPrice: 26.00,
      agmarknetBasePrice: 14.00,
      traditionalRetailPrice: 42.00,
      organic: true,
      moistureContent: "92%",
      description: "Juicy, rich vitamin-C rich vine-ripened tomatoes.",
      demandStatus: "Moderate Demand"
    }
  ],
  fpoHubs: [
    {
      id: "hub-1",
      name: "Karnal Farmers Village Aggregation Hub",
      district: "Karnal",
      state: "Haryana",
      memberFarmers: 340,
      totalColdStorageTonnes: 150,
      coordinator: "Sukhwinder Singh",
      contact: "+91 98765 43210"
    },
    {
      id: "hub-2",
      name: "Lasalgaon Onion & Veg Agro Hub",
      district: "Nashik",
      state: "Maharashtra",
      memberFarmers: 580,
      totalColdStorageTonnes: 400,
      coordinator: "Manish Borse",
      contact: "+91 98220 11223"
    }
  ],
  orders: [],
  mandiRates: [
    { commodity: "Wheat (Sharbati)", mandi: "Sehore Mandi", state: "MP", modalPrice: "₹3,100 / Quintal", trend: "up" },
    { commodity: "Onion (Red)", mandi: "Lasalgaon Mandi", state: "MH", modalPrice: "₹1,750 / Quintal", trend: "up" },
    { commodity: "Tomato (Desi)", mandi: "Kolar Mandi", state: "KA", modalPrice: "₹1,400 / Quintal", trend: "down" }
  ]
};

// Initialize DB file
if (!fs.existsSync(dbFilePath)) {
  fs.writeFileSync(dbFilePath, JSON.stringify(defaultData, null, 2));
}

export function readDB() {
  try {
    const raw = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return defaultData;
  }
}

export function writeDB(data) {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
}
