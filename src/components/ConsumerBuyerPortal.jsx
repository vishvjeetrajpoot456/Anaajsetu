import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  MapPin, 
  ShieldCheck, 
  Users, 
  TrendingDown, 
  Info, 
  Plus, 
  Check, 
  Star,
  Warehouse,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { mockCrops } from '../data/mockData';

export default function ConsumerBuyerPortal({ onAddToCart, onOpenGroupBuying }) {
  const [buyerMode, setBuyerMode] = useState('consumer'); // 'consumer' | 'bulk'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedCropForBreakdown, setInspectedCropForBreakdown] = useState(null);

  const categories = ['All', 'Grains & Cereals', 'Vegetables', 'Pulses & Legumes', 'Spices & Herbs'];

  const filteredCrops = mockCrops.filter(crop => {
    const matchesCategory = selectedCategory === 'All' || crop.category === selectedCategory;
    const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          crop.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Store Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 glass-panel p-6 rounded-3xl border border-slate-200">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="badge-green">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Direct Farmer Sourced
            </span>
            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
              Escrow Guaranteed
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
            Farm-Fresh Produce. <span className="text-emerald-600">Zero Middlemen.</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Save up to 20% on retail prices while giving farmers 15-25% higher income directly.
          </p>
        </div>

        {/* Buyer Mode Switcher & Group Buy Launcher */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="bg-slate-200 p-1 rounded-2xl flex items-center">
            <button
              onClick={() => setBuyerMode('consumer')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                buyerMode === 'consumer'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Household Consumer
            </button>
            <button
              onClick={() => setBuyerMode('bulk')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                buyerMode === 'bulk'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bulk / Business Buyer (100kg+)
            </button>
          </div>

          <button
            onClick={onOpenGroupBuying}
            className="btn-amber text-xs sm:text-sm font-bold py-2.5 px-4"
          >
            <Users className="w-4 h-4" />
            Group Buy Pooling
          </button>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search crops, locations, FPOs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Crop Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrops.map((crop) => {
          const discountPercent = Math.round(((crop.traditionalRetailPrice - crop.anaajSetuPrice) / crop.traditionalRetailPrice) * 100);
          
          return (
            <div key={crop.id} className="glass-card overflow-hidden flex flex-col justify-between">
              {/* Image & Badges */}
              <div className="relative h-48 overflow-hidden group">
                <img 
                  src={crop.image} 
                  alt={crop.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-extrabold px-2.5 py-1 rounded-lg">
                    {crop.grade}
                  </span>
                  {crop.organic && (
                    <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                      100% Organic
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-lg shadow">
                  Save {discountPercent}%
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                      {crop.category}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {crop.farmerRating}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-lg leading-snug">
                    {crop.name}
                  </h3>

                  <div className="text-xs text-slate-500 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{crop.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                      <Warehouse className="w-3.5 h-3.5 text-emerald-600" />
                      <span>FPO: {crop.fpoName}</span>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown Preview */}
                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-black text-slate-900">₹{crop.anaajSetuPrice}</span>
                      <span className="text-xs text-slate-500"> / kg</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 line-through">₹{crop.traditionalRetailPrice}/kg</span>
                      <span className="block text-[10px] text-emerald-700 font-bold">Mandi Retail Price</span>
                    </div>
                  </div>

                  {/* Intermediary Transparency Link */}
                  <button
                    onClick={() => setInspectedCropForBreakdown(crop)}
                    className="w-full text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-100/60 hover:bg-emerald-100 p-1.5 rounded-xl text-center flex items-center justify-center gap-1 transition-colors"
                  >
                    <Info className="w-3.5 h-3.5 text-emerald-600" />
                    View Price Waterfall Breakdown
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => onAddToCart(crop, buyerMode === 'bulk' ? 100 : 10)}
                  className="w-full btn-primary py-2.5 text-xs font-bold"
                >
                  <Plus className="w-4 h-4" />
                  Add to Escrow Cart ({buyerMode === 'bulk' ? '100 kg Min' : '10 kg'})
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Transparent Price Breakdown Modal */}
      {inspectedCropForBreakdown && (
        <div className="modal-overlay">
          <div className="modal-content p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Info className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Price Transparency Breakdown</h3>
                  <p className="text-xs text-slate-500">AnaajSetu Direct Connection vs. 5-Layer Middlemen</p>
                </div>
              </div>
              <button 
                onClick={() => setInspectedCropForBreakdown(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-3">
                <h4 className="font-extrabold text-emerald-950 text-sm flex items-center justify-between">
                  <span>AnaajSetu Direct Price Waterfall:</span>
                  <span className="text-emerald-700 font-black text-lg">₹{inspectedCropForBreakdown.anaajSetuPrice} / kg</span>
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-emerald-100">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      Farmer Net Direct Payout:
                    </span>
                    <span className="font-extrabold text-emerald-700 text-sm">₹{inspectedCropForBreakdown.farmerEarnings} (88.5%)</span>
                  </div>

                  <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-emerald-100">
                    <span className="font-medium text-slate-700 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                      Village Hub Multi-Drop Logistics:
                    </span>
                    <span className="font-bold text-slate-800">₹{inspectedCropForBreakdown.logisticsCost} (8.0%)</span>
                  </div>

                  <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-emerald-100">
                    <span className="font-medium text-slate-700 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      Escrow & AI Quality Verification:
                    </span>
                    <span className="font-bold text-slate-800">₹{inspectedCropForBreakdown.platformFee} (3.5%)</span>
                  </div>
                </div>
              </div>

              {/* Comparison against Traditional Middleman Model */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 space-y-3">
                <h4 className="font-extrabold text-red-950 text-sm flex items-center justify-between">
                  <span>Traditional 5-Layer Intermediary Model:</span>
                  <span className="text-red-700 font-bold text-lg line-through">₹{inspectedCropForBreakdown.traditionalRetailPrice} / kg</span>
                </h4>

                <div className="text-xs text-red-900 space-y-1.5">
                  <div className="flex justify-between">
                    <span>• Farmer gets only (Mandi Rate):</span>
                    <span className="font-bold">₹{inspectedCropForBreakdown.agmarknetBasePrice} / kg (Only ~35%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Village Commission Agent (Kacha Arhtia):</span>
                    <span>+ ₹{Math.round(inspectedCropForBreakdown.agmarknetBasePrice * 0.15)} / kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Transport & Loading Middlemen:</span>
                    <span>+ ₹{Math.round(inspectedCropForBreakdown.agmarknetBasePrice * 0.20)} / kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Wholesale Mandi Commission (Pacca Arhtia):</span>
                    <span>+ ₹{Math.round(inspectedCropForBreakdown.agmarknetBasePrice * 0.25)} / kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• City Retailer Margin & Spoilage Surcharge:</span>
                    <span>+ ₹{Math.round(inspectedCropForBreakdown.agmarknetBasePrice * 0.40)} / kg</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setInspectedCropForBreakdown(null)}
                className="btn-primary text-xs py-2.5 px-5"
              >
                Close & Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
