import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Fuel, 
  Leaf, 
  ShieldAlert, 
  Play, 
  Layers, 
  Warehouse,
  RotateCw
} from 'lucide-react';
import { sampleRoutes, optimizeHubDispatch } from '../services/routeOptimizationService';
import { fpoHubs } from '../data/mockData';

export default function LogisticsHub() {
  const [routes, setRoutes] = useState(sampleRoutes);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState(null);

  const handleRunOptimizer = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      const result = optimizeHubDispatch([
        { qtyKg: 1200 }, { qtyKg: 1800 }, { qtyKg: 1500 }, { qtyKg: 3000 }
      ]);
      setOptimizationResult(result);
      setIsOptimizing(false);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner Header */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-emerald-950 text-emerald-400 border border-emerald-700/60 text-xs px-3 py-1 rounded-full font-semibold">
              <Truck className="w-3.5 h-3.5" /> Multi-Drop Vehicle Routing Engine (OR-Tools)
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading leading-tight">
              Village Hub-and-Spoke <span className="text-emerald-400">Smart Logistics</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Consolidating smallholder harvests at village FPO hubs. Algorithmic multi-stop routes eliminate empty return trips and reduce food spoilage by 35%.
            </p>
          </div>

          <button
            onClick={handleRunOptimizer}
            disabled={isOptimizing}
            className="btn-primary py-3.5 px-6 font-bold text-sm shadow-lg shadow-emerald-600/30"
          >
            {isOptimizing ? (
              <>
                <RotateCw className="w-5 h-5 animate-spin" /> Optimizing Routes...
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" /> Run OR-Tools Optimizer
              </>
            )}
          </button>
        </div>

        {/* Live Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
          <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700">
            <span className="text-slate-400 text-xs flex items-center gap-1">
              <Fuel className="w-3.5 h-3.5 text-amber-400" /> Fuel Saved
            </span>
            <span className="text-xl sm:text-2xl font-extrabold text-amber-400">32.4%</span>
          </div>

          <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700">
            <span className="text-slate-400 text-xs flex items-center gap-1">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" /> CO2 Reduction
            </span>
            <span className="text-xl sm:text-2xl font-extrabold text-emerald-400">119.4 kg</span>
          </div>

          <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700">
            <span className="text-slate-400 text-xs flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-blue-400" /> Spoilage Saved
            </span>
            <span className="text-xl sm:text-2xl font-extrabold text-blue-400">450 kg</span>
          </div>

          <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700">
            <span className="text-slate-400 text-xs flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-purple-400" /> Route Efficiency
            </span>
            <span className="text-xl sm:text-2xl font-extrabold text-purple-400">94.2%</span>
          </div>
        </div>
      </div>

      {/* Optimization Result Notification */}
      {optimizationResult && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm">OR-Tools Optimization Complete!</h4>
              <p className="text-xs text-slate-600">
                Grouped {optimizationResult.totalOrders} pending farm orders ({optimizationResult.totalWeightKg} kg) into {optimizationResult.trucksNeeded} optimized multi-drop electric dispatch trucks.
              </p>
            </div>
          </div>
          <span className="badge-green text-xs font-bold px-3 py-1">Score: {optimizationResult.optimizationScore}/100</span>
        </div>
      )}

      {/* Active Dispatch Routes List */}
      <div className="space-y-6">
        <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <Truck className="w-5 h-5 text-emerald-600" /> Active Multi-Drop Truck Dispatches
        </h3>

        <div className="space-y-6">
          {routes.map((route) => (
            <div key={route.id} className="glass-card p-6 space-y-5">
              {/* Route Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-base">{route.truckId}</h4>
                      <span className="badge-green">{route.status}</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Driver: <strong className="text-slate-700">{route.driverName}</strong> ({route.driverPhone})
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right text-xs">
                  <span className="text-slate-500 block">Hub Origin:</span>
                  <span className="font-bold text-emerald-700 text-sm">{route.hubOrigin}</span>
                </div>
              </div>

              {/* Multi-Drop Stops Timeline */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-700 block">Multi-Drop Stop Sequence:</span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {route.destinations.map((dest, idx) => (
                    <div key={idx} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2 relative">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                          Stop #{idx + 1}
                        </span>
                        <span className={`font-bold text-[11px] ${
                          dest.status === 'Delivered' ? 'text-emerald-600' : 
                          dest.status === 'In-Transit' ? 'text-amber-600' : 'text-slate-500'
                        }`}>
                          {dest.status}
                        </span>
                      </div>

                      <h5 className="font-bold text-slate-900 text-sm">{dest.name}</h5>

                      <div className="text-xs text-slate-500 flex justify-between pt-1">
                        <span>Distance: {dest.distanceKm} km</span>
                        <span>ETA: {dest.eta}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
