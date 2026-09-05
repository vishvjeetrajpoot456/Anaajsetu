import React, { useState } from 'react';
import { ShoppingCart, ShieldCheck, Trash2, CheckCircle2, IndianRupee, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function EscrowCartModal({ isOpen, onClose, cartItems, onUpdateQty, onRemoveItem, onClearCart }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.anaajSetuPrice * item.qtyKg), 0);
  const logisticsTotal = cartItems.reduce((sum, item) => sum + (item.logisticsCost * item.qtyKg), 0);
  const escrowPlatformFee = Math.round(subtotal * 0.03);
  const grandTotal = Math.round(subtotal + escrowPlatformFee);

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1500);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2 text-emerald-800">
            <ShoppingCart className="w-5 h-5 text-emerald-600" />
            <h3 className="font-extrabold text-slate-900 text-base">AnaajSetu Escrow Protected Cart</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 font-bold text-lg">✕</button>
        </div>

        {isPaid ? (
          <div className="text-center py-8 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h4 className="text-2xl font-extrabold text-slate-900">Escrow Payment Locked & Confirmed!</h4>
              <p className="text-xs text-slate-600">
                Transaction ID: <span className="font-mono font-bold text-emerald-700">UPI-ESCROW-884920</span>
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs text-emerald-900 leading-relaxed max-w-md mx-auto">
              🔒 <strong>Escrow Protection Active:</strong> Your funds of <strong>₹{grandTotal}</strong> are securely held in Bank Escrow. Money will be released to the Farmer's Bank Account only after quality inspection at destination hub.
            </div>

            <button
              onClick={() => {
                onClearCart();
                setIsPaid(false);
                onClose();
              }}
              className="btn-primary py-2.5 px-6 font-bold text-xs"
            >
              Back to Store
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-10 text-slate-400 space-y-2">
            <ShoppingCart className="w-12 h-12 mx-auto stroke-1 text-slate-300" />
            <p className="text-sm font-medium">Your Escrow Cart is empty.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Cart Items List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-slate-900">{item.name}</h4>
                      <p className="text-[11px] text-slate-500">₹{item.anaajSetuPrice}/kg • Farmer: {item.farmerName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
                      <button 
                        onClick={() => onUpdateQty(item.id, Math.max(10, item.qtyKg - 10))}
                        className="px-2 py-0.5 font-bold hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="px-2 font-bold">{item.qtyKg} kg</span>
                      <button 
                        onClick={() => onUpdateQty(item.id, item.qtyKg + 10)}
                        className="px-2 py-0.5 font-bold hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-bold text-slate-900 w-16 text-right">
                      ₹{Math.round(item.anaajSetuPrice * item.qtyKg)}
                    </span>

                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Summary Box */}
            <div className="bg-slate-100 p-4 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Produce Direct Value:</span>
                <span className="font-bold text-slate-800">₹{Math.round(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Hub Transport & Logistics:</span>
                <span className="font-bold text-slate-800">₹{Math.round(logisticsTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Bank Escrow & AI Quality Verification:</span>
                <span className="font-bold text-slate-800">₹{escrowPlatformFee}</span>
              </div>
              <div className="border-t border-slate-300 pt-2 flex justify-between text-sm font-extrabold text-slate-900">
                <span>Total Escrow Amount:</span>
                <span className="text-emerald-700 text-lg">₹{grandTotal}</span>
              </div>
            </div>

            {/* Escrow Guarantee Note */}
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-[11px] text-emerald-800 font-semibold">
              <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Funds locked in bank escrow until delivery & quality verification. Zero risk for buyer and farmer!</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full btn-primary py-3 font-bold text-sm"
            >
              {isProcessing ? 'Processing Escrow Deposit...' : `Proceed to Escrow Payment (₹${grandTotal})`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
