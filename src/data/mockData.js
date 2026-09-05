export const mockCrops = [
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
    
    // Price Breakdown comparison (per kg)
    farmerEarnings: 38.50, // Farmer gets ₹38.50
    logisticsCost: 3.50,   // Hub-to-hub direct transport
    platformFee: 1.50,     // Escrow + Quality audit
    anaajSetuPrice: 43.50, // Consumer pays ₹43.50
    
    agmarknetBasePrice: 31.00, // Mandi base rate
    traditionalRetailPrice: 62.00, // Traditional 5-layer middleman market price
    
    organic: true,
    moistureContent: "11.2%",
    description: "Naturally sun-dried Sharbati wheat grown along the Narmada basin. High protein content, ideal for soft rotis.",
    demandStatus: "High Demand",
    demandIncrease: "+18% this week"
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
    description: "Medium to large sized firm red onions with high shelf life (up to 3 months). Direct from Lasalgaon hub.",
    demandStatus: "Very High Demand",
    demandIncrease: "+25% this week"
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
    description: "Juicy, rich vitamin-C rich vine-ripened tomatoes harvested fresh every morning.",
    demandStatus: "Moderate Demand",
    demandIncrease: "+12% this week"
  },
  {
    id: "crop-4",
    name: "Traditional Organic Arhar / Tur Dal",
    hindiName: "जैविक अरहर दाल",
    category: "Pulses & Legumes",
    variety: "Desi Unpolished",
    location: "Gulbarga (Kalaburagi), Karnataka",
    fpoName: "Tur City Farmer Collective",
    farmerName: "Basavaraj Patil",
    farmerRating: 5.0,
    farmerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1585994191611-724d262b9a7b?w=600&auto=format&fit=crop&q=80",
    availableQtyKg: 6500,
    minOrderKg: 20,
    unit: "kg",
    grade: "Grade A+",
    harvestDate: "2026-08-15",
    
    farmerEarnings: 115.00,
    logisticsCost: 6.00,
    platformFee: 4.00,
    anaajSetuPrice: 125.00,
    
    agmarknetBasePrice: 92.00,
    traditionalRetailPrice: 175.00,
    
    organic: true,
    moistureContent: "9.8%",
    description: "GI-tagged Gulbarga Tur Dal, unpolished and chemical-free. Rich protein aroma.",
    demandStatus: "High Demand",
    demandIncrease: "+30% this week"
  },
  {
    id: "crop-5",
    name: "1121 Pusa Basmati Rice",
    hindiName: "1121 बास्मती चावल",
    category: "Grains & Cereals",
    variety: "1121 Extra Long Grain",
    location: "Karnal, Haryana",
    fpoName: "Karnal Agri-Export FPO",
    farmerName: "Gurpreet Singh Dhillon",
    farmerRating: 4.9,
    farmerImage: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
    availableQtyKg: 8000,
    minOrderKg: 25,
    unit: "kg",
    grade: "Grade A+",
    harvestDate: "2026-08-20",
    
    farmerEarnings: 76.00,
    logisticsCost: 5.00,
    platformFee: 3.00,
    anaajSetuPrice: 84.00,
    
    agmarknetBasePrice: 58.00,
    traditionalRetailPrice: 130.00,
    
    organic: false,
    moistureContent: "12.0%",
    description: "Aged 12 months for non-sticky, aromatic long grain culinary perfection.",
    demandStatus: "High Demand",
    demandIncrease: "+22% this week"
  },
  {
    id: "crop-6",
    name: "Organic Pahadi Ginger",
    hindiName: "पहाड़ी जैविक अदरक",
    category: "Spices & Herbs",
    variety: "Himachali Fresh",
    location: "Sirmaur, Himachal Pradesh",
    fpoName: "Himalayan Organic Growers",
    farmerName: "Devender Thakur",
    farmerRating: 4.8,
    farmerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80",
    availableQtyKg: 1500,
    minOrderKg: 10,
    unit: "kg",
    grade: "Grade A",
    harvestDate: "2026-09-01",
    
    farmerEarnings: 55.00,
    logisticsCost: 6.00,
    platformFee: 3.00,
    anaajSetuPrice: 64.00,
    
    agmarknetBasePrice: 40.00,
    traditionalRetailPrice: 110.00,
    
    organic: true,
    moistureContent: "85%",
    description: "High oleoresin mountain ginger, hand-dug from chemical-free terraced fields.",
    demandStatus: "Trending",
    demandIncrease: "+40% this week"
  }
];

export const fpoHubs = [
  {
    id: "hub-1",
    name: "Karnal Farmers Village Aggregation Hub",
    district: "Karnal",
    state: "Haryana",
    memberFarmers: 340,
    totalColdStorageTonnes: 150,
    coordinator: "Sukhwinder Singh",
    contact: "+91 98765 43210",
    activeCrops: ["Basmati Rice", "Wheat", "Mustard"],
    lat: 29.6857,
    lng: 76.9905
  },
  {
    id: "hub-2",
    name: "Lasalgaon Onion & Veg Agro Hub",
    district: "Nashik",
    state: "Maharashtra",
    memberFarmers: 580,
    totalColdStorageTonnes: 400,
    coordinator: "Manish Borse",
    contact: "+91 98220 11223",
    activeCrops: ["Red Onions", "Pomegranate", "Grapes"],
    lat: 20.1471,
    lng: 74.2272
  },
  {
    id: "hub-3",
    name: "Gulbarga Pulses Collective Hub",
    district: "Kalaburagi",
    state: "Karnataka",
    memberFarmers: 290,
    totalColdStorageTonnes: 100,
    coordinator: "Sharanappa Patil",
    contact: "+91 94481 99887",
    activeCrops: ["Arhar / Tur Dal", "Bengal Gram"],
    lat: 17.3297,
    lng: 76.8343
  }
];

export const AgmarknetLiveRates = [
  { commodity: "Wheat (Sharbati)", mandi: "Sehore Mandi", state: "MP", modalPrice: "₹3,100 / Quintal", date: "Today, 09:30 AM", trend: "up" },
  { commodity: "Onion (Red)", mandi: "Lasalgaon Mandi", state: "MH", modalPrice: "₹1,750 / Quintal", date: "Today, 10:15 AM", trend: "up" },
  { commodity: "Tomato (Desi)", mandi: "Kolar Mandi", state: "KA", modalPrice: "₹1,400 / Quintal", date: "Today, 10:00 AM", trend: "down" },
  { commodity: "Arhar (Tur)", mandi: "Gulbarga Mandi", state: "KA", modalPrice: "₹9,200 / Quintal", date: "Today, 08:45 AM", trend: "up" },
  { commodity: "Pusa Basmati 1121", mandi: "Karnal Mandi", state: "HR", modalPrice: "₹5,800 / Quintal", date: "Today, 09:00 AM", trend: "up" }
];

export const SihResearchStats = {
  problemStatementId: "26033",
  title: "Multiple Intermediaries reduce farmers earnings and increase consumer prices",
  rbiBulletinStat: "Farmers receive only ~33%–37% of consumer spend for vegetables (RBI Bulletin 2024).",
  eNamStat: "e-NAM adoption yielded a 5.5% higher price realization, but lacks direct buyer last-mile logistics.",
  redGramStudyStat: "Farmers bear 66% of total supply chain costs but capture only 39% of profits (Karnataka Study).",
  anaajSetuImpact: {
    farmerProfitIncrease: "+22.4%",
    consumerPriceSavings: "-18.6%",
    foodSpoilageReduction: "-35.0%",
    supplyChainLayers: "Cut from 5 layers to 2 layers"
  }
};
