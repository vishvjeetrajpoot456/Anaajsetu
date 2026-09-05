import React, { useState } from 'react';
import { PhoneCall, Volume2, Mic, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function OfflineUSSDSimulator({ isOpen, onClose }) {
  const [screenStep, setScreenStep] = useState('menu'); // 'menu' | 'crop_list' | 'mandi_check' | 'success'
  const [ussdInput, setUssdInput] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  if (!isOpen) return null;

  const handleKeyClick = (key) => {
    if (key === 'SEND') {
      if (ussdInput === '1') setScreenStep('crop_list');
      else if (ussdInput === '2') setScreenStep('mandi_check');
      else if (ussdInput === '3') setScreenStep('success');
      else setUssdInput('');
    } else if (key === 'CLEAR') {
      setUssdInput('');
      setScreenStep('menu');
    } else {
      setUssdInput(prev => prev + key);
    }
  };

  const handleSimulateIvrCall = () => {
    setIsVoiceActive(true);
    const speech = new SpeechSynthesisUtterance("अनाजसेतु किसान हेल्पलाइन में आपका स्वागत है। अपनी फसल बेचने के लिए 1 दबाएं, मंडी भाव जानने के लिए 2 दबाएं।");
    speech.lang = "hi-IN";
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-md p-6 space-y-6">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2 text-amber-800">
            <PhoneCall className="w-5 h-5 text-amber-600" />
            <h3 className="font-extrabold text-slate-900 text-base">Feature Phone USSD & IVR Simulator</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 font-bold text-lg">✕</button>
        </div>

        {/* Feature Phone UI Mockup */}
        <div className="bg-slate-900 text-white rounded-3xl p-5 border-4 border-slate-700 shadow-2xl space-y-4 max-w-xs mx-auto">
          {/* Phone Speaker */}
          <div className="flex justify-center">
            <div className="w-12 h-1.5 bg-slate-700 rounded-full"></div>
          </div>

          {/* LCD Screen */}
          <div className="bg-emerald-950 text-emerald-300 font-mono text-xs p-4 rounded-xl border border-emerald-700 min-h-[180px] flex flex-col justify-between shadow-inner">
            <div className="flex items-center justify-between text-[10px] text-emerald-500 border-b border-emerald-900 pb-1">
              <span>*139*7#</span>
              <span>4G BSNL</span>
            </div>

            <div className="py-2 space-y-1.5">
              {screenStep === 'menu' && (
                <>
                  <p className="font-bold text-emerald-200">Welcome to AnaajSetu</p>
                  <p>1. List Crop at Village Hub</p>
                  <p>2. Check Agmarknet Rate</p>
                  <p>3. Check Escrow Payout</p>
                  <p>4. Request IVR Call</p>
                </>
              )}

              {screenStep === 'crop_list' && (
                <>
                  <p className="font-bold text-emerald-200">Enter Harvest Quantity:</p>
                  <p>Select: 50 Quintal Wheat</p>
                  <p className="text-amber-300">Net Farmer Rate: ₹38.50/kg</p>
                  <p className="text-[10px] text-emerald-400">Press SEND to confirm pickup</p>
                </>
              )}

              {screenStep === 'mandi_check' && (
                <>
                  <p className="font-bold text-emerald-200">Agmarknet Rates Today:</p>
                  <p>• Karnal Wheat: ₹31.00/kg</p>
                  <p>• Nashik Onion: ₹17.50/kg</p>
                  <p className="text-amber-300">AnaajSetu Rate: +20% higher</p>
                </>
              )}

              {screenStep === 'success' && (
                <div className="text-center space-y-1 py-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                  <p className="font-bold text-emerald-200">Order Confirmed!</p>
                  <p className="text-[10px]">FPO Hub Truck assigned. SMS sent to farmer.</p>
                </div>
              )}
            </div>

            <div className="bg-emerald-900/60 p-1.5 rounded border border-emerald-800 text-center text-amber-300 font-bold">
              Input: {ussdInput || '_'}
            </div>
          </div>

          {/* Physical Phone Keypad */}
          <div className="grid grid-cols-3 gap-2 text-slate-800 font-bold text-sm">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((key) => (
              <button
                key={key}
                onClick={() => handleKeyClick(key)}
                className="bg-slate-200 hover:bg-slate-300 active:bg-slate-400 p-2.5 rounded-lg text-center shadow"
              >
                {key}
              </button>
            ))}
          </div>

          <div className="flex justify-between gap-2 text-xs pt-1">
            <button
              onClick={() => handleKeyClick('SEND')}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-lg"
            >
              SEND
            </button>
            <button
              onClick={() => handleKeyClick('CLEAR')}
              className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded-lg"
            >
              CLEAR
            </button>
          </div>
        </div>

        {/* IVR Voice Call Trigger */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-2 text-center">
          <span className="text-xs font-bold text-amber-900 block">Multilingual Toll-Free IVR Helper</span>
          <button
            onClick={handleSimulateIvrCall}
            className="w-full btn-amber text-xs py-2 px-4 flex items-center justify-center gap-2"
          >
            <Volume2 className="w-4 h-4" />
            Listen to Hindi IVR Voice Demo
          </button>
        </div>
      </div>
    </div>
  );
}
