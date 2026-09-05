import React, { useState } from 'react';
import { Users, CheckCircle2, Truck, ShieldCheck, ArrowRight } from 'lucide-react';

export default function GroupBuyingModal({ isOpen, onClose }) {
  const [joinedPool, setJoinedPool] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-lg p-6 space-y-6">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2 text-amber-800">
            <Users className="w-5 h-5 text-amber-600" />
            <h3 className="font-extrabold text-slate-900 text-base">Community Group Buying Pools</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 font-bold text-lg">✕</button>
        </div>

        <p className="text-xs text-slate-600">
          Pool your orders with nearby apartment societies or local housing clusters to unlock <strong>Wholesale Direct-from-Farm Pricing</strong> and <strong>Zero Logistics Delivery Fee</strong>.
        </p>

        {/* Active Pool Card */}
        <div className="glass-card p-5 space-y-4 border-2 border-amber-400 bg-amber-50/40">
          <div className="flex items-center justify-between">
            <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
              Active Neighborhood Pool
            </span>
            <span className="text-xs text-slate-500 font-semibold">Delhi Dwarka Sector 12 Pool</span>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-base">Sharbati Golden Wheat (Direct Karnal FPO)</h4>
            <p className="text-xs text-slate-500">Target Volume: 200 kg for Free Delivery Truck Dispatch</p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-amber-800">180 kg Pooled</span>
              <span className="text-slate-500">20 kg Remaining to Dispatch</span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-[90%] rounded-full transition-all"></div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-amber-200 text-xs flex justify-between items-center">
            <span>Wholesale Pooled Price:</span>
            <span className="font-extrabold text-emerald-700 text-sm">₹41.00 / kg <span className="line-through text-slate-400 text-xs">₹62.00</span></span>
          </div>

          {joinedPool ? (
            <div className="bg-emerald-100 border border-emerald-300 p-3 rounded-xl text-center text-xs font-bold text-emerald-800 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              You joined the pool with 20 kg! Target Unlocked. Truck dispatched!
            </div>
          ) : (
            <button
              onClick={() => setJoinedPool(true)}
              className="w-full btn-amber py-2.5 text-xs font-bold"
            >
              Add 20 kg to Complete Pool & Unlock Wholesale Rate
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
