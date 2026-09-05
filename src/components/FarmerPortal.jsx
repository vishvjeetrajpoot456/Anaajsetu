import React, { useState } from 'react';
import { 
  Sprout, 
  PlusCircle, 
  TrendingUp, 
  Warehouse, 
  Sparkles, 
  ShieldCheck, 
  IndianRupee, 
  Layers, 
  ScanLine, 
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  ArrowUpRight,
  Info
} from 'lucide-react';
import { mockCrops, fpoHubs, AgmarknetLiveRates } from '../data/mockData';
import { calculateFairPrice, generateDemandForecast } from '../services/aiPricingService';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function FarmerPortal({ onOpenQualityScanner, onOpenUssd }) {
  const [userListings, setUserListings] = useState(mockCrops);
  const [selectedCropDemand, setSelectedCropDemand] = useState('Sharbati Golden Wheat');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Grains & Cereals',
    availableQtyKg: 1000,
    agmarknetPrice: 30,
    grade: 'Grade A',
    organic: true,
    location: 'Karnal, Haryana',
    fpoName: 'Karnal Agri-Export FPO'
  });

  const [aiPriceSuggestion, setAiPriceSuggestion] = useState(null);

  const handleCalculateAiPrice = () => {
    const calculation = calculateFairPrice(
      Number(formData.agmarknetPrice), 
      formData.grade, 
      formData.organic
    );
    setAiPriceSuggestion(calculation);
  };

  const handleAddProduce = (e) => {
    e.preventDefault();
    const finalPrice = aiPriceSuggestion ? aiPriceSuggestion.finalConsumerPrice : formData.agmarknetPrice * 1.2;
    const newCrop = {
      id: `crop-${Date.now()}`,
      name: formData.name || 'Organic Fresh Batch',
      hindiName: 'जैविक फसल',
      category: formData.category,
      variety: 'Standard Grade',
      location: formData.location,
      fpoName: formData.fpoName,
      farmerName: 'You (Farmer / FPO)',
      farmerRating: 5.0,
      farmerImage: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=200&auto=format&fit=crop&q=80',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
      availableQtyKg: Number(formData.availableQtyKg),
      minOrderKg: 50,
      unit: 'kg',
      grade: formData.grade,
      harvestDate: new Date().toISOString().split('T')[0],
      farmerEarnings: aiPriceSuggestion ? aiPriceSuggestion.recommendedFarmerEarning : formData.agmarknetPrice * 1.2,
      logisticsCost: 3.5,
      platformFee: 1.5,
      anaajSetuPrice: finalPrice,
      agmarknetBasePrice: Number(formData.agmarknetPrice),
      traditionalRetailPrice: formData.agmarknetPrice * 2.0,
      organic: formData.organic,
      demandStatus: 'High Demand'
    };

    setUserListings([newCrop, ...userListings]);
    setShowAddForm(false);
    alert('✅ Produce batch successfully listed on AnaajSetu! Aggregation pickup scheduled at nearest FPO Hub.');
  };

  const demandData = generateDemandForecast(selectedCropDemand);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner / Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs px-3 py-1 rounded-full font-semibold">
              <Sprout className="w-3.5 h-3.5" /> FPO & Smallholder Empowerment Hub
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading leading-tight">
              Sell Direct. Earn <span className="text-amber-400">15–25% More</span> Per Harvest.
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base">
              Bypass 4-5 layers of Mandi agents. List your produce at your local Village Aggregation Hub with AI Agmarknet dynamic fair pricing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-amber text-sm font-bold py-3.5 px-5 shadow-lg"
            >
              <PlusCircle className="w-5 h-5" />
              List New Crop Batch
            </button>

            <button
              onClick={onOpenQualityScanner}
              className="bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-600/50 py-3.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <ScanLine className="w-5 h-5 text-emerald-400" />
              AI Quality Scanner
            </button>
          </div>
        </div>

        {/* Live Agmarknet Ticker */}
        <div className="mt-6 pt-4 border-t border-emerald-600/40 flex items-center gap-4 overflow-x-auto text-xs text-emerald-100">
          <span className="font-bold text-amber-300 flex items-center gap-1 shrink-0">
            <Sparkles className="w-3.5 h-3.5" /> Live Agmarknet Benchmarks:
          </span>
          {AgmarknetLiveRates.map((rate, idx) => (
            <div key={idx} className="bg-emerald-950/50 px-3 py-1 rounded-lg border border-emerald-700/50 shrink-0 flex items-center gap-2">
              <span className="font-medium">{rate.commodity} ({rate.mandi}):</span>
              <span className="font-bold text-amber-300">{rate.modalPrice}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Add Produce Form Modal */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Sprout className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">List Produce Batch</h3>
                  <p className="text-xs text-slate-500">AI-suggested dynamic pricing & FPO hub pickup</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAddForm(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProduce} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Crop Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sharbati Wheat / Desi Tomato"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option>Grains & Cereals</option>
                    <option>Vegetables</option>
                    <option>Pulses & Legumes</option>
                    <option>Fruits</option>
                    <option>Spices & Herbs</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Available Quantity (Kg)</label>
                  <input
                    type="number"
                    required
                    value={formData.availableQtyKg}
                    onChange={(e) => setFormData({ ...formData, availableQtyKg: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Current Agmarknet Mandi Price (₹/kg)</label>
                  <input
                    type="number"
                    required
                    value={formData.agmarknetPrice}
                    onChange={(e) => setFormData({ ...formData, agmarknetPrice: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Quality Grade</label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option>Grade A+</option>
                    <option>Grade A</option>
                    <option>Grade B</option>
                  </select>
                </div>
              </div>

              {/* AI Fair Price Calculator Box */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" /> AI Agmarknet Fair Price Suggestion Engine
                  </span>
                  <button
                    type="button"
                    onClick={handleCalculateAiPrice}
                    className="btn-primary text-xs py-1.5 px-3"
                  >
                    Calculate Optimal Price
                  </button>
                </div>

                {aiPriceSuggestion && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs">
                    <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                      <span className="text-slate-500 block">Agmarknet Mandi</span>
                      <span className="font-bold text-slate-700 text-sm">₹{aiPriceSuggestion.agmarknetBasePrice}/kg</span>
                    </div>
                    <div className="bg-emerald-100 p-2.5 rounded-xl border border-emerald-300">
                      <span className="text-emerald-900 block font-bold">Farmer Earning</span>
                      <span className="font-extrabold text-emerald-700 text-base">₹{aiPriceSuggestion.recommendedFarmerEarning}/kg</span>
                      <span className="text-[10px] text-emerald-800 block font-bold">+{aiPriceSuggestion.farmerGainPercent}% gain</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                      <span className="text-slate-500 block">AnaajSetu Price</span>
                      <span className="font-bold text-emerald-600 text-sm">₹{aiPriceSuggestion.finalConsumerPrice}/kg</span>
                    </div>
                    <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                      <span className="text-amber-900 block">Middlemen Market</span>
                      <span className="font-bold text-amber-800 text-sm line-through">₹{aiPriceSuggestion.traditionalPrice}/kg</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="btn-secondary text-xs py-2.5 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-amber text-xs font-bold py-2.5 px-5"
                >
                  Confirm & Publish Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Grid: My Active Crop Listings & FPO Village Hub Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: My Active Listings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-600" /> Active Produce Batches
              </h3>
              <p className="text-xs text-slate-500">Live listings linked to local village aggregation hubs</p>
            </div>
            <span className="badge-green">{userListings.length} Active Batches</span>
          </div>

          <div className="space-y-4">
            {userListings.map((crop) => (
              <div key={crop.id} className="glass-card p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                <div className="flex gap-4 items-start sm:items-center">
                  <img 
                    src={crop.image} 
                    alt={crop.name} 
                    className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-slate-900 text-base">{crop.name}</h4>
                      <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-md">
                        {crop.grade}
                      </span>
                      {crop.organic && (
                        <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-md">
                          Organic
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-500 flex items-center gap-3 flex-wrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {crop.location}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-emerald-700">
                        <Warehouse className="w-3.5 h-3.5" /> {crop.fpoName}
                      </span>
                    </div>

                    <div className="text-xs pt-1 flex items-center gap-4">
                      <span className="text-slate-600">Stock: <strong className="text-slate-900">{crop.availableQtyKg} kg</strong></span>
                      <span className="text-slate-600">Agmarknet Base: <span className="line-through text-slate-400">₹{crop.agmarknetBasePrice}/kg</span></span>
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                  <div className="text-left sm:text-right">
                    <span className="text-[11px] text-slate-500 block font-medium">Your Direct Net Earning</span>
                    <span className="text-xl font-extrabold text-emerald-700">₹{crop.farmerEarnings} <span className="text-xs text-slate-500">/kg</span></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2.5 py-1 rounded-lg">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Escrow Verified
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: AI Crop Planning & FPO Hub Status */}
        <div className="space-y-6">
          {/* FPO Village Hub Aggregation Card */}
          <div className="glass-card p-6 space-y-4 border-l-4 border-l-emerald-600">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-slate-900 flex items-center gap-2">
                <Warehouse className="w-5 h-5 text-emerald-600" /> My Village FPO Hub
              </h4>
              <span className="pulse-dot"></span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Hub Name:</span>
                <span className="font-bold text-slate-800">{fpoHubs[0].name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pooled Batch Volume:</span>
                <span className="font-bold text-emerald-700">4.5 Tonnes (Ready for Dispatch)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Member Farmers:</span>
                <span className="font-bold text-slate-800">{fpoHubs[0].memberFarmers} Active</span>
              </div>
            </div>

            <div className="text-xs text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-200 leading-relaxed">
              💡 <strong>Bulk Pooling Discount:</strong> Combining your harvest with 340 neighboring farmers in Karnal reduces per-kg logistics cost from ₹8.00 down to ₹3.50.
            </div>
          </div>

          {/* AI Crop Demand Forecasting (Prophet Model) */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-600" /> AI Demand Forecasting
                </h4>
                <p className="text-xs text-slate-500">Prophet AI model 6-week harvest price trends</p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">Select Crop for AI Planning:</label>
              <select
                value={selectedCropDemand}
                onChange={(e) => setSelectedCropDemand(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option>Sharbati Golden Wheat</option>
                <option>Nashik Red Onions</option>
                <option>Desi Organic Tomatoes</option>
                <option>Arhar / Tur Dal</option>
              </select>

              {/* Recharts Demand Graph */}
              <div className="h-44 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={demandData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} domain={['auto', 'auto']} />
                    <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                    <Line type="monotone" dataKey="expectedPrice" stroke="#059669" strokeWidth={3} dot={{ r: 4 }} name="Expected Fair Price (₹/kg)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <p className="text-[11px] text-slate-500 italic text-center">
                *High buyer demand projected in Week 4 (+24%). Harvesting around this window will yield maximum price.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
