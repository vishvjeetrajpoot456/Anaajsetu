import React from 'react';
import { 
  Award, 
  BookOpen, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Users, 
  Sprout, 
  Layers, 
  FileText, 
  Sparkles,
  PieChart as PieIcon
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

export default function ImpactDashboard({ darkMode }) {
  // Pie chart data: Traditional vs AnaajSetu
  const traditionalSplit = [
    { name: 'Farmer Share', value: 35, color: '#EF4444' },
    { name: 'Local Agents', value: 15, color: '#F59E0B' },
    { name: 'Transport Middlemen', value: 12, color: '#3B82F6' },
    { name: 'Wholesale Mandi Commission', value: 18, color: '#8B5CF6' },
    { name: 'Retailer Surcharge & Waste', value: 20, color: '#64748B' }
  ];

  const anaajSetuSplit = [
    { name: 'Farmer Net Direct Share', value: 88.5, color: '#10B981' },
    { name: 'Direct Hub Logistics', value: 8.0, color: '#0284C7' },
    { name: 'Platform Escrow & Audit', value: 3.5, color: '#D97706' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner Header */}
      <div className={`rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl border transition-colors duration-300 ${
        darkMode 
          ? 'bg-slate-900 border-slate-800 text-white' 
          : 'bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white border-emerald-800/40'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500 text-slate-950 text-xs px-3 py-1 rounded-full font-black uppercase tracking-wider">
              <Sprout className="w-4 h-4" /> Platform Impact & Producer Analytics
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading leading-tight">
              AnaajSetu <span className="text-emerald-400">Direct Value Realization</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Empowering farmers with <strong>15–25% higher profit margins</strong> while cutting consumer food inflation and transit spoilage.
            </p>
          </div>

          <div className="bg-emerald-900/60 p-4 rounded-2xl border border-emerald-600/40 text-center shrink-0">
            <span className="text-xs text-emerald-300 block font-semibold">Net Producer Benefit</span>
            <span className="text-3xl font-black text-amber-400">+22.4% Income</span>
            <span className="text-xs text-emerald-200 block">Across 1,200+ FPO Member Farmers</span>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`glass-card p-5 space-y-2 border-l-4 border-l-emerald-600 ${darkMode ? 'bg-slate-900 text-white border-slate-800' : ''}`}>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">Farmer Income Boost</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">+22.4%</span>
            <span className="text-xs text-emerald-600 font-bold flex items-center">
              <TrendingUp className="w-3.5 h-3.5" /> Direct Net
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Producers earn ₹38.50/kg vs ₹31/kg raw mandi price.</p>
        </div>

        <div className={`glass-card p-5 space-y-2 border-l-4 border-l-amber-500 ${darkMode ? 'bg-slate-900 text-white border-slate-800' : ''}`}>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">Consumer Price Reduction</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-500">-18.6%</span>
            <span className="text-xs text-amber-500 font-bold flex items-center">
              <TrendingDown className="w-3.5 h-3.5" /> Savings
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Consumers pay ₹43.50/kg vs ₹62/kg retail market.</p>
        </div>

        <div className={`glass-card p-5 space-y-2 border-l-4 border-l-blue-600 ${darkMode ? 'bg-slate-900 text-white border-slate-800' : ''}`}>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">Transit Spoilage Saved</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-blue-500">-35.0%</span>
            <span className="text-xs text-blue-500 font-bold">Waste Reduction</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Village Hub direct routes cut transit multi-handling.</p>
        </div>

        <div className={`glass-card p-5 space-y-2 border-l-4 border-l-purple-600 ${darkMode ? 'bg-slate-900 text-white border-slate-800' : ''}`}>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">Supply Chain Efficiency</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-purple-500">1 to 2</span>
            <span className="text-xs text-purple-500 font-bold">Layers Only</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Compressed from 5 middleman trader levels.</p>
        </div>
      </div>

      {/* Waterfall Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Traditional Model */}
        <div className={`glass-card p-6 space-y-4 ${darkMode ? 'bg-slate-900 text-white border-slate-800' : ''}`}>
          <div>
            <h3 className="text-lg font-extrabold flex items-center gap-2">
              <Layers className="w-5 h-5 text-red-500" /> Traditional Middleman Market Model
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Farmers receive only ~35% of total consumer rupee</p>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={traditionalSplit} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {traditionalSplit.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="text-xs space-y-1 bg-red-50 dark:bg-red-950/40 p-3 rounded-xl text-red-900 dark:text-red-300 border border-red-200 dark:border-red-800">
            <strong>Key Vulnerability:</strong> Farmers bear 66% of total supply chain costs while capturing only 39% of profit.
          </div>
        </div>

        {/* AnaajSetu Direct Model */}
        <div className={`glass-card p-6 space-y-4 border-2 border-emerald-500 ${darkMode ? 'bg-slate-900 text-white' : ''}`}>
          <div>
            <h3 className="text-lg font-extrabold flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-500" /> AnaajSetu Direct Producer Bridge
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Farmers capture 88.5% of final produce value directly</p>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={anaajSetuSplit} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {anaajSetuSplit.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="text-xs space-y-1 bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl text-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <strong>AnaajSetu Model:</strong> Direct FPO village hub aggregation with AI pricing & escrow payout release.
          </div>
        </div>
      </div>
    </div>
  );
}
