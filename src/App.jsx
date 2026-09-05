import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FarmerPortal from './components/FarmerPortal';
import ConsumerBuyerPortal from './components/ConsumerBuyerPortal';
import LogisticsHub from './components/LogisticsHub';
import ImpactDashboard from './components/ImpactDashboard';
import OfflineUSSDSimulator from './components/OfflineUSSDSimulator';
import AIQualityScannerModal from './components/AIQualityScannerModal';
import GroupBuyingModal from './components/GroupBuyingModal';
import EscrowCartModal from './components/EscrowCartModal';
import KisanVoiceAssistantModal from './components/KisanVoiceAssistantModal';
import { mockCrops } from './data/mockData';
import { translations } from './data/translations';

export default function App() {
  const [activeTab, setActiveTab] = useState('consumer');
  const [selectedLanguage, setSelectedLanguage] = useState('hi'); // Default Hindi for ease of farmers
  const [darkMode, setDarkMode] = useState(false);

  // Modals
  const [isUssdOpen, setIsUssdOpen] = useState(false);
  const [isQualityScannerOpen, setIsQualityScannerOpen] = useState(false);
  const [isGroupBuyingOpen, setIsGroupBuyingOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart State
  const [cartItems, setCartItems] = useState([
    { ...mockCrops[0], qtyKg: 25 },
    { ...mockCrops[1], qtyKg: 50 }
  ]);

  const handleAddToCart = (crop, defaultQty = 10) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === crop.id);
      if (existing) {
        return prev.map(item => item.id === crop.id ? { ...item, qtyKg: item.qtyKg + defaultQty } : item);
      }
      return [...prev, { ...crop, qtyKg: defaultQty }];
    });
    showToast(`🛒 ${crop.name} (${defaultQty}kg) added to Escrow Cart!`);
    setIsCartOpen(true);
  };

  const handleUpdateQty = (id, newQty) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, qtyKg: newQty } : item));
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const t = translations[selectedLanguage] || translations.hi;

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 text-slate-100 selection:bg-emerald-600' : 'bg-slate-50 text-slate-900 selection:bg-emerald-200'
    }`}>
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-[100] bg-emerald-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-2xl border border-emerald-600 animate-slideUp flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenUssd={() => setIsUssdOpen(true)}
        onOpenQualityScanner={() => setIsQualityScannerOpen(true)}
        onOpenVoiceAssistant={() => setIsVoiceAssistantOpen(true)}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'farmer' && (
          <FarmerPortal 
            onOpenQualityScanner={() => setIsQualityScannerOpen(true)}
            onOpenUssd={() => setIsUssdOpen(true)}
            language={selectedLanguage}
            darkMode={darkMode}
          />
        )}

        {activeTab === 'consumer' && (
          <ConsumerBuyerPortal 
            onAddToCart={handleAddToCart}
            onOpenGroupBuying={() => setIsGroupBuyingOpen(true)}
            language={selectedLanguage}
            darkMode={darkMode}
          />
        )}

        {activeTab === 'logistics' && (
          <LogisticsHub 
            darkMode={darkMode}
          />
        )}

        {activeTab === 'impact' && (
          <ImpactDashboard 
            darkMode={darkMode}
          />
        )}
      </main>

      {/* Footer */}
      <footer className={`py-10 border-t text-xs transition-colors duration-300 ${
        darkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-900 text-slate-400 border-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="text-white font-extrabold text-base flex items-center justify-center md:justify-start gap-2">
              <span>{t.appName || 'AnaajSetu'} 🌾</span>
            </h4>
            <p className="text-slate-400">{t.tagline || 'Direct Farmer-to-Consumer AI Bridge'}</p>
            <p className="text-emerald-400 font-semibold">Multilingual AI Voice & Village FPO Hub Network</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-slate-300">
            <button onClick={() => setActiveTab('farmer')} className="hover:text-emerald-400 font-bold">{t.farmerPortal}</button>
            <button onClick={() => setActiveTab('consumer')} className="hover:text-emerald-400 font-bold">{t.store}</button>
            <button onClick={() => setActiveTab('logistics')} className="hover:text-emerald-400 font-bold">{t.logistics}</button>
            <button onClick={() => setActiveTab('impact')} className="hover:text-amber-400 font-bold">{t.analytics}</button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <KisanVoiceAssistantModal 
        isOpen={isVoiceAssistantOpen}
        onClose={() => setIsVoiceAssistantOpen(false)}
        language={selectedLanguage}
      />

      <OfflineUSSDSimulator 
        isOpen={isUssdOpen} 
        onClose={() => setIsUssdOpen(false)} 
      />

      <AIQualityScannerModal 
        isOpen={isQualityScannerOpen} 
        onClose={() => setIsQualityScannerOpen(false)} 
      />

      <GroupBuyingModal 
        isOpen={isGroupBuyingOpen} 
        onClose={() => setIsGroupBuyingOpen(false)} 
      />

      <EscrowCartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
