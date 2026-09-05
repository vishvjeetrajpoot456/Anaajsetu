import React, { useState } from 'react';
import { ScanLine, CheckCircle2, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function AIQualityScannerModal({ isOpen, onClose }) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  if (!isOpen) return null;

  const handleRunScan = () => {
    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        grade: 'Grade A+',
        purityScore: 96.8,
        moistureContent: '11.2%',
        defectPercentage: '0.4%',
        sizeUniformity: '98.5%',
        certifiedPriceBoost: '+15% Premium Rate',
        escrowStampId: `QUAL-ESCROW-${Math.floor(100000 + Math.random() * 900000)}`
      });
    }, 1500);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-lg p-6 space-y-6">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ScanLine className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">AI Computer Vision Quality Scanner</h3>
              <p className="text-xs text-slate-500">Automated Grade & Defect Classification</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 font-bold text-lg">✕</button>
        </div>

        {/* Scan Frame */}
        <div className="relative bg-slate-900 rounded-2xl overflow-hidden h-56 flex flex-col items-center justify-center text-white border-2 border-slate-700">
          <img 
            src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80" 
            alt="Scan sample"
            className="w-full h-full object-cover opacity-60"
          />

          {/* Laser scanning line */}
          {isScanning && (
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-400 shadow-[0_0_15px_#10b981] animate-bounce"></div>
          )}

          <div className="absolute inset-0 bg-slate-950/40 flex flex-col items-center justify-center p-4 text-center">
            {isScanning ? (
              <div className="space-y-2">
                <Sparkles className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
                <span className="font-bold text-sm text-emerald-300">Analyzing grain color, moisture & defect parameters...</span>
              </div>
            ) : scanResult ? (
              <div className="bg-emerald-950/90 border border-emerald-500/60 p-4 rounded-xl space-y-1">
                <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto" />
                <span className="text-xl font-extrabold text-white block">{scanResult.grade} Certified</span>
                <span className="text-xs text-emerald-300 block">{scanResult.certifiedPriceBoost}</span>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-200">Position produce sample batch inside frame for AI inspection</p>
                <button
                  onClick={handleRunScan}
                  className="btn-primary text-xs py-2 px-4 font-bold shadow-lg"
                >
                  Start AI Quality Audit
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Scan Results Breakdown */}
        {scanResult && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Escrow Stamp Hash:</span>
                <span className="font-mono font-bold text-emerald-800">{scanResult.escrowStampId}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block">Purity Score</span>
                  <span className="font-extrabold text-emerald-700 text-sm">{scanResult.purityScore}%</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block">Moisture</span>
                  <span className="font-bold text-slate-800 text-sm">{scanResult.moistureContent}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block">Defects</span>
                  <span className="font-bold text-slate-800 text-sm">{scanResult.defectPercentage}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block">Uniformity</span>
                  <span className="font-bold text-slate-800 text-sm">{scanResult.sizeUniformity}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full btn-primary text-xs py-2.5 font-bold"
            >
              Attach Stamp & Confirm Listing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
