import React from 'react';
import { 
  Sprout, 
  ShoppingBag, 
  Truck, 
  BarChart3, 
  PhoneCall, 
  ScanLine, 
  Globe, 
  ShoppingCart,
  ShieldCheck,
  Sun,
  Moon,
  Bot,
  Volume2
} from 'lucide-react';
import { translations } from '../data/translations';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  cartCount, 
  onOpenCart, 
  onOpenUssd, 
  onOpenQualityScanner,
  onOpenVoiceAssistant,
  selectedLanguage,
  setSelectedLanguage,
  darkMode,
  setDarkMode
}) {
  const t = translations[selectedLanguage] || translations.en;

  const languages = [
    { code: 'hi', name: 'हिन्दी (Hindi)' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'hr', name: 'हरियाणवी (Haryanvi)' },
    { code: 'mr', name: 'मराठी (Marathi)' },
    { code: 'bho', name: 'भोजपुरी (Bhojpuri)' },
    { code: 'en', name: 'English' }
  ];

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-300 border-b ${
      darkMode 
        ? 'bg-slate-900/90 border-slate-800 text-white backdrop-blur-md' 
        : 'glass-panel border-emerald-100 text-slate-800'
    }`}>
      {/* Top Banner (Purely focused on Direct Farmer Payouts & Escrow Protection) */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white text-xs py-1.5 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded text-[10px] uppercase">
              Direct Farmer Payouts
            </span>
            <span className="font-medium text-emerald-200 hidden sm:inline">
              🌾 Empowering Producers & Consumers with Zero Intermediaries
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-emerald-300 hidden md:inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Bank Escrow Protection
            </span>

            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-emerald-950/80 px-2.5 py-0.5 rounded-lg border border-emerald-700/60">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code} className="bg-slate-900 text-white">
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('consumer')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/30 group-hover:scale-105 transition-transform">
            <Sprout className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className={`text-2xl font-extrabold tracking-tight font-heading ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {t.appName || 'AnaajSetu'}
              </h1>
              <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-1.5 py-0.5 rounded">AI Voice</span>
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              {t.tagline || 'Direct Farmer-to-Consumer AI Bridge'}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className={`hidden lg:flex items-center gap-1 p-1.5 rounded-2xl border ${
          darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => setActiveTab('farmer')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'farmer'
                ? 'bg-emerald-600 text-white shadow-md'
                : darkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-200/60'
            }`}
          >
            <Sprout className="w-4 h-4" />
            {t.farmerPortal}
          </button>

          <button
            onClick={() => setActiveTab('consumer')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'consumer'
                ? 'bg-emerald-600 text-white shadow-md'
                : darkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-200/60'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            {t.store}
          </button>

          <button
            onClick={() => setActiveTab('logistics')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'logistics'
                ? 'bg-emerald-600 text-white shadow-md'
                : darkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-200/60'
            }`}
          >
            <Truck className="w-4 h-4" />
            {t.logistics}
          </button>

          <button
            onClick={() => setActiveTab('impact')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'impact'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : darkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-200/60'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            {t.analytics}
          </button>
        </nav>

        {/* Actions: Voice Assistant, Quality Scanner, Dark/Light Mode & Cart */}
        <div className="flex items-center gap-2">
          {/* Kisan Voice Assistant Trigger */}
          <button
            onClick={onOpenVoiceAssistant}
            className="bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-500 hover:to-amber-400 text-white text-xs font-extrabold py-2 px-3 rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
          >
            <Bot className="w-4 h-4 animate-bounce" />
            <span className="hidden sm:inline">{t.voiceAssistant}</span>
          </button>

          {/* AI Quality Audit Trigger */}
          <button
            onClick={onOpenQualityScanner}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border ${
              darkMode 
                ? 'bg-slate-800 text-emerald-400 border-slate-700 hover:bg-slate-700' 
                : 'btn-secondary border-emerald-200 text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            <ScanLine className="w-4 h-4 text-emerald-500" />
            <span className="hidden sm:inline">{t.aiAudit}</span>
          </button>

          {/* Dark / Light Mode Switcher */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle Dark / Light Mode"
            className={`p-2 rounded-xl border transition-colors ${
              darkMode 
                ? 'bg-slate-800 text-amber-400 border-slate-700 hover:bg-slate-700' 
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Cart Badge */}
          <button
            onClick={onOpenCart}
            className="relative btn-primary py-2 px-3 text-xs font-bold"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">{t.escrowCart}</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-slate-950 text-xs font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
