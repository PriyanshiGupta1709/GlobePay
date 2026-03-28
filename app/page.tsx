"use client";

import React, { useState } from "react";
import { 
  QrCode, Plus, ArrowLeftRight, LayoutDashboard, Wallet, 
  History, TrendingUp, Sparkles, X, 
  Zap, ChevronRight, Landmark, Flashlight, Eye 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/** * 🔮 HYPER-AURA BRAND CONFIG 
 * Background updated to a sophisticated Matte Grey (#1A1C1E)
 */
const brand = {
  colors: {
    bg: "bg-[#1A1C1E]", // Matte Grey
    card: "bg-white/[0.06]", 
    primary: "from-[#C4FF4D] to-[#2AF598]", 
    secondary: "from-[#BF5AF2] to-[#5E5CE6]", 
    accent: "#C4FF4D",
    text: "text-white",
    textMuted: "text-zinc-500",
  },
  radius: "rounded-[2.5rem]",
};

export default function AuraDashboard() {
  // --- FUNCTIONAL STATES ---
  const [balance, setBalance] = useState(452300);
  const [usdBalance, setUsdBalance] = useState(5420);
  const [inputAmount, setInputAmount] = useState("");
  const [isAddMoneyOpen, setAddMoneyOpen] = useState(false);
  const [isExchangeOpen, setExchangeOpen] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  // --- LOGIC HANDLERS ---
  const handleAddMoney = () => {
    const amount = parseFloat(inputAmount);
    if (amount > 0) {
      setBalance((prev) => prev + amount);
      setInputAmount("");
      setAddMoneyOpen(false);
    }
  };

  const handleExchange = () => {
    const amountToSell = parseFloat(inputAmount);
    const rate = 84.20; 
    if (amountToSell > 0 && balance >= amountToSell) {
      setBalance((prev) => prev - amountToSell);
      setUsdBalance((prev) => prev + (amountToSell / rate));
      setInputAmount("");
      setExchangeOpen(false);
    }
  };

  return (
    <div className={`min-h-screen ${brand.colors.bg} ${brand.colors.text} font-sans selection:bg-lime-500/30 overflow-hidden`}>
      
      {/* 🌌 DYNAMIC AURA BACKGROUND (Subtle Glows) */}
      <div className="fixed top-[-20%] left-[-10%] w-[100%] h-[50%] bg-[#5E5CE6]/10 rounded-full blur-[140px] -z-10 animate-pulse" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[80%] h-[40%] bg-[#C4FF4D]/5 rounded-full blur-[120px] -z-10" />

      <main className="p-6 pb-32 relative z-10">
        <header className="flex justify-between items-center mb-10 pt-4">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#C4FF4D] to-[#BF5AF2] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative w-12 h-12 bg-black rounded-2xl flex items-center justify-center border border-white/10">
                <span className="text-[#C4FF4D] font-black italic">G</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter text-white">GlobePay</h1>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C4FF4D] animate-ping" />
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">System Live</p>
              </div>
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
            <Eye size={18} className="text-zinc-500" />
          </div>
        </header>

        {/* TOTAL BALANCE CARD */}
        <motion.section  
          whileHover={{ scale: 1.01 }}
          className={`relative overflow-hidden bg-gradient-to-br ${brand.colors.primary} ${brand.radius} p-8 mb-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)]`}
        >
          <div className="relative z-10 text-black">
            <div className="flex justify-between items-start mb-12">
              <div>
                <p className="text-black/50 text-[10px] font-black uppercase tracking-[0.2em]">Liquid Assets</p>
                <h2 className="text-5xl font-black tracking-tighter mt-1 italic">₹{balance.toLocaleString()}</h2>
              </div>
              <div className="bg-black/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-black/5 font-black text-xs">
                INR
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="bg-black/5 backdrop-blur-sm px-4 py-2 rounded-xl text-[11px] font-black border border-black/10">
                $ {Math.floor(usdBalance).toLocaleString()}
              </div>
              <div className="bg-black/5 backdrop-blur-sm px-4 py-2 rounded-xl text-[11px] font-black border border-black/10">
                € 4,910
              </div>
            </div>
          </div>
          <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>
        </motion.section>

        {/* AI INSIGHTS */}
        <section className={`backdrop-blur-2xl ${brand.colors.card} border border-white/5 ${brand.radius} p-6 mb-8 flex items-center gap-5 group cursor-pointer`}>
          <div className={`w-14 h-14 rounded-3xl bg-gradient-to-br ${brand.colors.secondary} flex items-center justify-center text-white shadow-2xl shadow-purple-500/20 group-hover:rotate-6 transition-transform`}>
            <Zap size={24} fill="currentColor" />
          </div>
          <div>
            <h3 className="font-black text-sm text-white">Market Anomaly</h3>
            <p className="text-xs font-medium text-zinc-400 leading-relaxed mt-1">
              USD is <span className="text-[#C4FF4D]">devaluing</span> against INR. Swap now to lock in <span className="text-white font-bold">₹84.20</span> rate.
            </p>
          </div>
        </section>

        {/* ACTION GRID */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => { setInputAmount(""); setAddMoneyOpen(true); }}
            className="flex flex-col gap-6 bg-white/[0.03] p-7 rounded-[2.5rem] border border-white/5 hover:bg-white/[0.06] transition-all group active:scale-95"
          >
            <div className="bg-[#C4FF4D] w-12 h-12 rounded-2xl flex items-center justify-center text-black group-hover:scale-110 transition-transform shadow-lg shadow-[#C4FF4D]/20">
              <Plus size={24} strokeWidth={3}/>
            </div>
            <span className="text-xs font-black uppercase tracking-widest opacity-60 group-hover:opacity-100">Deposit</span>
          </button>
          
          <button 
            onClick={() => { setInputAmount(""); setExchangeOpen(true); }}
            className="flex flex-col gap-6 bg-white/[0.03] p-7 rounded-[2.5rem] border border-white/5 hover:bg-white/[0.06] transition-all group active:scale-95"
          >
            <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <ArrowLeftRight size={24} strokeWidth={2}/>
            </div>
            <span className="text-xs font-black uppercase tracking-widest opacity-60 group-hover:opacity-100">Exchange</span>
          </button>
        </div>
      </main>

      {/* FLOATING ACTION BUTTON */}
      <div className="fixed bottom-10 left-0 right-0 flex justify-center pointer-events-none z-50">
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowScanner(true)} className="pointer-events-auto flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full shadow-2xl">
          <QrCode size={20} strokeWidth={3} />
          <span className="font-black text-[10px] uppercase tracking-[0.25em]">Transact</span>
        </motion.button>
      </div>

      {/* NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-3xl border-t border-white/5 px-12 py-8 flex justify-between items-center z-40">
        <LayoutDashboard className="text-[#C4FF4D]" size={26} strokeWidth={2.5} />
        <Wallet className="text-zinc-700 hover:text-white transition-colors" size={26} />
        <History className="text-zinc-700 hover:text-white transition-colors" size={26} />
      </nav>

      {/* ADD MONEY DRAWER */}
      <AnimatePresence>
        {isAddMoneyOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setAddMoneyOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="fixed bottom-0 left-0 right-0 bg-[#1A1C1E] rounded-t-[3rem] p-10 z-[70] border-t border-white/10">
              <div className="w-16 h-1.5 bg-white/10 rounded-full mx-auto mb-10" />
              <h3 className="text-2xl font-black mb-8 tracking-tighter text-white">Add Capital</h3>
              <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 mb-8">
                <input 
                  autoFocus type="number" value={inputAmount} onChange={(e) => setInputAmount(e.target.value)}
                  placeholder="₹ Amount" className="w-full bg-transparent text-4xl font-black focus:outline-none text-[#C4FF4D]"
                />
              </div>
              <button onClick={handleAddMoney} className="w-full py-6 bg-[#C4FF4D] text-black rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] active:scale-[0.98] transition-transform">
                Confirm Deposit
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* EXCHANGE DRAWER */}
      <AnimatePresence>
        {isExchangeOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setExchangeOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="fixed bottom-0 left-0 right-0 bg-[#1A1C1E] rounded-t-[3rem] p-10 z-[70] border-t border-white/10">
              <div className="w-16 h-1.5 bg-white/10 rounded-full mx-auto mb-10" />
              <h3 className="text-2xl font-black mb-2 tracking-tighter text-white">Currency Swap</h3>
              <p className="text-zinc-500 text-xs mb-8 uppercase font-bold tracking-widest">1 USD = ₹84.20</p>
              <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 mb-6">
                <input 
                  autoFocus type="number" value={inputAmount} onChange={(e) => setInputAmount(e.target.value)}
                  placeholder="₹ Sell INR" className="w-full bg-transparent text-4xl font-black focus:outline-none text-white"
                />
              </div>
              <div className="px-4 mb-8">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Estimated Receive</p>
                <p className="text-2xl font-black text-[#C4FF4D] mt-1">
                  ${(parseFloat(inputAmount || "0") / 84.2).toFixed(2)}
                </p>
              </div>
              <button onClick={handleExchange} className="w-full py-6 bg-gradient-to-r from-[#BF5AF2] to-[#5E5CE6] text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] active:scale-[0.98] transition-transform">
                Convert to USD
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SCANNER OVERLAY */}
      <AnimatePresence>
        {showScanner && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center p-8">
            <button onClick={() => setShowScanner(false)} className="absolute top-12 left-6 w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white"><X /></button>
            <div className="relative w-72 h-72">
              <div className="absolute inset-0 border-2 border-[#C4FF4D]/30 rounded-[3rem]" />
              <motion.div animate={{ top: ["5%", "95%", "5%"] }} transition={{ duration: 2, repeat: Infinity }} className="absolute left-6 right-6 h-1 bg-[#C4FF4D] blur-[2px] z-20" />
            </div>
            <p className="mt-12 text-[#C4FF4D] font-black text-[10px] uppercase tracking-[0.4em]">Searching for QR...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}