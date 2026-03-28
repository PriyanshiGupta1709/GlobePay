"use client";

import { QrCode, Plus, ArrowLeftRight } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white p-4 pb-24">
      
      {/* Header */}
      <h1 className="text-xl font-semibold mb-4">GlobePay</h1>

      {/* Total Balance Card */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 rounded-2xl shadow-lg mb-4">
        <p className="text-sm text-gray-200">Total Balance</p>
        <h2 className="text-3xl font-bold mt-1">₹50,000</h2>

        {/* Currency Pills */}
        <div className="flex gap-2 mt-4">
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">$610</span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">€560</span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">£480</span>
        </div>
      </div>

      {/* AI Insights */}
      <div className="mb-4">
        <h3 className="text-sm text-gray-400 mb-2">AI Forecaster</h3>
        <div className="flex gap-3 overflow-x-auto">
          <div className="min-w-[250px] bg-[#121826] p-4 rounded-xl shadow">
            <p className="text-sm">
              USD is at a 3-month low. Load ₹10,000 now to save ₹400 later.
            </p>
          </div>
          <div className="min-w-[250px] bg-[#121826] p-4 rounded-xl shadow">
            <p className="text-sm">
              EUR expected to rise next week. Consider converting today.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <button className="bg-[#121826] p-4 rounded-xl flex flex-col items-center">
          <ArrowLeftRight className="mb-2" />
          <span className="text-sm">Convert</span>
        </button>

        <button className="bg-[#121826] p-4 rounded-xl flex flex-col items-center">
          <Plus className="mb-2" />
          <span className="text-sm">Add Money</span>
        </button>

        <button className="bg-[#121826] p-4 rounded-xl flex flex-col items-center">
          <QrCode className="mb-2" />
          <span className="text-sm">Pay</span>
        </button>
      </div>

      {/* Floating Scan & Pay Button */}
      <button className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-indigo-600 p-4 rounded-full shadow-lg flex items-center gap-2">
        <QrCode />
        <span className="font-medium">Scan & Pay</span>
      </button>
    </div>
  );
}