'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, QrCode, X, Plus, Zap, TrendingDown, TrendingUp, Flashlight, Wallet, ChevronLeft, Sparkles, TrendingUp as Trending } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <GlobePay />;
  }

  return <LoginPage setIsLoggedIn={setIsLoggedIn} />;
}

interface LoginPageProps {
  setIsLoggedIn: (value: boolean) => void;
}

function LoginPage({ setIsLoggedIn }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      alert('Please enter a valid email');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans overflow-hidden flex flex-col items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-0 left-0 w-96 h-96 bg-gray-700/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-gray-700/20 rounded-full blur-3xl"
        />
      </div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        {/* Logo & Title */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <h1 className="text-6xl font-black text-white drop-shadow-lg mb-2">
              GlobePay
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-gray-500 to-gray-400 mx-auto rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6"
          >
            <p className="text-4xl font-black text-transparent bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text leading-tight">
              Smart Pay, Global Way
            </p>
            <p className="text-gray-400 text-sm mt-3 font-semibold tracking-wide">
              Transfer money across the world in seconds
            </p>
          </motion.div>
        </div>

        {/* Login Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-gradient-to-br from-white to-gray-100 text-gray-900 border-2 border-gray-400 rounded-3xl p-8 shadow-2xl"
        >
          <h2 className="text-3xl font-black mb-8 text-center">Welcome Back</h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <label className="block text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-400 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-400/30 transition-all font-semibold"
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <label className="block text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-white border-2 border-gray-400 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-400/30 transition-all font-semibold"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Remember Me */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="flex items-center justify-between"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-2 border-gray-400 rounded accent-gray-700"
                />
                <span className="text-sm font-semibold text-gray-700">Remember me</span>
              </label>
              <a href="#" className="text-sm font-bold text-gray-700 hover:text-gray-900 transition-colors">
                Forgot password?
              </a>
            </motion.div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-gray-800 to-gray-700 text-white font-black rounded-lg hover:from-gray-700 hover:to-gray-600 transition-all uppercase tracking-widest border-2 border-gray-800 active:scale-95 shadow-md text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Logging in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="mt-6 text-center"
          >
            <p className="text-gray-700 font-semibold">
              Don't have an account?{' '}
              <a href="#" className="font-black text-gray-900 hover:text-gray-800 transition-colors">
                Sign up
              </a>
            </p>
          </motion.div>
        </motion.div>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="mt-8 bg-white/5 border-2 border-gray-600 rounded-lg p-4 backdrop-blur-sm text-center"
        >
          <p className="text-gray-400 text-xs font-semibold mb-2 uppercase tracking-widest">Demo Credentials</p>
          <p className="text-gray-300 text-sm mb-1">
            <span className="font-black">Email:</span> demo@globepay.com
          </p>
          <p className="text-gray-300 text-sm">
            <span className="font-black">Password:</span> demo123
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

// GlobePay Component (Main App)
function GlobePay() {
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [showTrends, setShowTrends] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC');
  const [flashOn, setFlashOn] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState('');
  const [convertTo, setConvertTo] = useState('USD');
  const [walletCurrencies, setWalletCurrencies] = useState({
    USD: 560,
    EUR: 480,
    GBP: 390,
    JPY: 5200
  });
  const [activeChartTab, setActiveChartTab] = useState('USD');
  const [totalBalance, setTotalBalance] = useState(45230);
  const videoRef = useRef<HTMLVideoElement>(null);

  const weeklyChartData: Record<string, Array<{ day: string; price: number }>> = {
    USD: [
      { day: 'Mon', price: 82.5 },
      { day: 'Tue', price: 82.8 },
      { day: 'Wed', price: 83.1 },
      { day: 'Thu', price: 82.9 },
      { day: 'Fri', price: 83.5 },
      { day: 'Sat', price: 83.2 },
      { day: 'Sun', price: 82.5 }
    ],
    EUR: [
      { day: 'Mon', price: 89.8 },
      { day: 'Tue', price: 90.2 },
      { day: 'Wed', price: 90.5 },
      { day: 'Thu', price: 91.1 },
      { day: 'Fri', price: 91.8 },
      { day: 'Sat', price: 92.3 },
      { day: 'Sun', price: 91.9 }
    ],
    GBP: [
      { day: 'Mon', price: 104.5 },
      { day: 'Tue', price: 104.9 },
      { day: 'Wed', price: 105.3 },
      { day: 'Thu', price: 106.1 },
      { day: 'Fri', price: 106.8 },
      { day: 'Sat', price: 107.5 },
      { day: 'Sun', price: 108.1 }
    ]
  };

  const hourlyChartData: Record<string, Array<{ time: string; price: number }>> = {
    USD: [
      { time: '9 AM', price: 83.2 },
      { time: '10 AM', price: 83.5 },
      { time: '11 AM', price: 83.1 },
      { time: '12 PM', price: 83.8 },
      { time: '1 PM', price: 82.9 },
      { time: '2 PM', price: 83.3 },
      { time: '3 PM', price: 82.5 }
    ],
    EUR: [
      { time: '9 AM', price: 90.2 },
      { time: '10 AM', price: 90.8 },
      { time: '11 AM', price: 91.2 },
      { time: '12 PM', price: 91.9 },
      { time: '1 PM', price: 91.5 },
      { time: '2 PM', price: 92.1 },
      { time: '3 PM', price: 92.8 }
    ],
    GBP: [
      { time: '9 AM', price: 105.2 },
      { time: '10 AM', price: 105.8 },
      { time: '11 AM', price: 106.1 },
      { time: '12 PM', price: 106.9 },
      { time: '1 PM', price: 107.2 },
      { time: '2 PM', price: 107.8 },
      { time: '3 PM', price: 108.5 }
    ]
  };

  const aiInsights = [
    {
      currency: 'USD',
      status: 'LOW',
      prediction: 'Expected to rise 2.5% in next 24h',
      recommendation: 'Buy Now',
      icon: TrendingDown,
      bgColor: 'bg-gray-200',
      borderColor: 'border-gray-300',
      textColor: 'text-red-700'
    },
    {
      currency: 'EUR',
      status: 'UP',
      prediction: 'Bullish trend continuing',
      recommendation: 'Hold & Watch',
      icon: TrendingUp,
      bgColor: 'bg-gray-200',
      borderColor: 'border-gray-300',
      textColor: 'text-blue-700'
    },
    {
      currency: 'GBP',
      status: 'STABLE',
      prediction: 'Sideways movement expected',
      recommendation: 'Monitor',
      icon: Zap,
      bgColor: 'bg-gray-200',
      borderColor: 'border-gray-300',
      textColor: 'text-green-700'
    },
    {
      currency: 'JPY',
      status: 'DOWN',
      prediction: 'Potential dip opportunity',
      recommendation: 'Accumulate',
      icon: TrendingDown,
      bgColor: 'bg-gray-200',
      borderColor: 'border-gray-300',
      textColor: 'text-orange-700'
    }
  ];

  const conversionRates: Record<string, number> = {
    USD: 0.012,
    EUR: 0.011,
    GBP: 0.0095,
    JPY: 1.8
  };

  React.useEffect(() => {
    if (showQRScanner && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
          videoRef.current!.srcObject = stream;
        })
        .catch(err => console.error('Camera access denied:', err));
    }
  }, [showQRScanner]);

  const handleAddMoney = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const addAmount = parseFloat(amount);
    setTotalBalance(prev => prev + addAmount);
    setWalletCurrencies(prev => ({
      ...prev,
      INR: (prev.INR || 0) + addAmount
    }));

    alert(`Successfully added ₹${amount} from ${selectedBank} Bank!`);
    setAmount('');
    setShowAddMoney(false);
  };

  const handleCurrencyConvert = () => {
    if (!convertedAmount || parseFloat(convertedAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const convertAmount = parseFloat(convertedAmount);
    const rate = conversionRates[convertTo];
    const convertedValue = parseFloat((convertAmount * rate).toFixed(2));

    setWalletCurrencies(prev => ({
      ...prev,
      [convertTo]: (prev[convertTo as keyof typeof prev] || 0) + convertedValue
    }));

    alert(`Successfully converted ₹${convertedAmount} to ${convertedValue} ${convertTo}!`);
    setConvertedAmount('');
  };

  const handleInsightClick = (currency: string) => {
    setSelectedInsight(currency);
    setActiveChartTab(currency);
    setShowTrends(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const slideVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.3 } }
  };

  const bounceVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
        duration: 0.6
      }
    },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 font-sans overflow-hidden">
      {/* Header with Bouncing GlobePay */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-8 pb-6 relative z-10 flex justify-between items-center bg-gradient-to-r from-gray-800 to-gray-700 border-b-2 border-gray-600 rounded-b-xl shadow-lg"
      >
        <motion.div
          variants={bounceVariants}
          initial="hidden"
          animate={["visible", "animate"]}
        >
          <h1 className="text-5xl font-black text-white drop-shadow-lg">
            GlobePay
          </h1>
          <p className="text-gray-300 text-sm mt-1 font-bold uppercase tracking-widest">Your global fintech companion</p>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-6 pb-40 relative z-10 py-6"
      >
        {/* Total Balance Card - Light Grey */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-gray-200 to-gray-300 text-gray-900 border-2 border-gray-400 rounded-3xl p-8 mb-4 relative overflow-hidden cursor-pointer hover:shadow-2xl transition-all shadow-lg"
        >
          <div className="relative z-10">
            <p className="text-gray-700 text-sm mb-2 font-bold uppercase tracking-widest">Total Balance</p>
            <h2 className="text-7xl font-black text-gray-900 mb-1">₹{totalBalance.toLocaleString()}</h2>
            <p className="text-gray-600 text-sm font-bold">+₹1,230 today</p>
          </div>
        </motion.div>

        {/* Tagline 1 - Bouncing */}
        <motion.div
          variants={bounceVariants}
          initial="hidden"
          animate={["visible", "animate"]}
          className="mb-8 flex items-center gap-3"
        >
          <Sparkles className="w-6 h-6 text-yellow-400" />
          <p className="text-lg font-black text-white italic drop-shadow-lg">
            "Your Money, Your Rules - Anywhere in the World"
          </p>
        </motion.div>

        {/* Currency Pills */}
        <motion.div variants={itemVariants} className="flex gap-4 mb-10 overflow-x-auto pb-2">
          {[
            { symbol: 'USD', amount: walletCurrencies.USD, flag: '🇺🇸' },
            { symbol: 'EUR', amount: walletCurrencies.EUR, flag: '🇪🇺' },
            { symbol: 'GBP', amount: walletCurrencies.GBP, flag: '🇬🇧' }
          ].map((currency) => (
            <motion.div
              key={currency.symbol}
              whileHover={{ scale: 1.08, y: -8 }}
              className="flex-shrink-0 bg-gradient-to-br from-white to-gray-200 text-gray-900 border-2 border-gray-400 rounded-full px-8 py-4 hover:shadow-xl transition-all cursor-pointer font-bold shadow-md hover:border-gray-500"
            >
              <p className="text-xs text-gray-600 uppercase tracking-widest">{currency.symbol}</p>
              <p className="text-lg font-black text-gray-900">{currency.amount.toLocaleString()}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* AI Forecaster - Interactive Cards - Light Grey */}
        <motion.div variants={itemVariants} className="mb-4">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-8 h-8 text-white" />
            <h3 className="text-2xl font-black text-white uppercase tracking-wider drop-shadow-lg">
              AI Forecaster Insights
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiInsights.map((insight, idx) => {
              const IconComponent = insight.icon;
              return (
                <motion.button
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => handleInsightClick(insight.currency)}
                  className={`${insight.bgColor} border-2 ${insight.borderColor} rounded-2xl p-6 relative overflow-hidden cursor-pointer transition-all shadow-lg hover:shadow-xl text-left`}
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <h4 className="text-gray-900 font-black text-xl">{insight.currency}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${insight.textColor} bg-white border-2 border-current`}>
                          {insight.status}
                        </span>
                      </div>
                      <IconComponent className={`w-6 h-6 ${insight.textColor}`} />
                    </div>
                    
                    <p className="text-gray-800 text-sm font-bold mb-3">{insight.prediction}</p>
                    
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <span className={insight.textColor}>{insight.recommendation}</span>
                      <ArrowRight className={`w-4 h-4 ${insight.textColor}`} />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Tagline 2 - Bouncing */}
        <motion.div
          variants={bounceVariants}
          initial="hidden"
          animate={["visible", "animate"]}
          transition={{
            animate: {
              y: [0, -10, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.3
              }
            }
          }}
          className="mb-10 flex items-center gap-3 bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-2 border-gray-600 rounded-2xl p-4"
        >
          <Trending className="w-6 h-6 text-green-400 flex-shrink-0" />
          <p className="text-base font-black text-gray-300 italic">
            "Real-time market insights, so you're always one step ahead 📈"
          </p>
        </motion.div>

        {/* Recent Transactions - Light Grey */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-2xl font-black text-white uppercase tracking-wider drop-shadow-lg">
              Recent Activity
            </h3>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Payment to Acme Corp', amount: '-₹2,500', time: '2 hours ago', bgColor: 'bg-gray-200', borderColor: 'border-gray-400', amountColor: 'text-red-700' },
              { name: 'Received from Client', amount: '+₹5,000', time: '5 hours ago', bgColor: 'bg-gray-200', borderColor: 'border-gray-400', amountColor: 'text-green-700' },
              { name: 'Currency Exchange', amount: '₹1,200 → $15', time: 'Yesterday', bgColor: 'bg-gray-200', borderColor: 'border-gray-400', amountColor: 'text-blue-700' }
            ].map((tx, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 8, scale: 1.02 }}
                className={`${tx.bgColor} border-2 ${tx.borderColor} rounded-xl p-5 cursor-pointer transition-all shadow-md hover:shadow-lg`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-900 font-bold text-lg">{tx.name}</p>
                    <p className="text-gray-600 text-xs font-bold uppercase">{tx.time}</p>
                  </div>
                  <p className={`font-black text-xl ${tx.amountColor}`}>
                    {tx.amount}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tagline 3 - Bouncing */}
        <motion.div
          variants={bounceVariants}
          initial="hidden"
          animate={["visible", "animate"]}
          transition={{
            animate: {
              y: [0, -10, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.6
              }
            }
          }}
          className="mt-10 text-center"
        >
          <p className="text-sm font-black text-gray-400 italic drop-shadow-lg">
            💡 "Fast, Secure, and Borderless - The Future of Money is Here"
          </p>
        </motion.div>
      </motion.div>

      {/* Floating Action Buttons with Hover Tooltips */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-6">
        {/* QR Scanner Button with Tooltip */}
        <div className="flex items-center gap-3 group">
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-r from-white to-gray-200 text-gray-900 font-black rounded-lg px-4 py-2 text-sm shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Click to Pay
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowQRScanner(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-200 flex items-center justify-center text-gray-900 font-black border-2 border-gray-400 shadow-2xl active:scale-90 transition-transform hover:shadow-2xl hover:from-gray-100 hover:to-gray-300"
            title="Click to Pay"
          >
            <QrCode className="w-8 h-8" />
          </motion.button>
        </div>

        {/* Wallet Button with Tooltip */}
        <div className="flex items-center gap-3 group">
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-r from-white to-gray-200 text-gray-900 font-black rounded-lg px-4 py-2 text-sm shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
          >
            My Wallet
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowWallet(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-gray-900 font-black border-2 border-gray-500 shadow-2xl active:scale-90 transition-transform hover:shadow-2xl hover:from-gray-200 hover:to-gray-300"
            title="My Wallet"
          >
            <Wallet className="w-8 h-8" />
          </motion.button>
        </div>

        {/* Link Bank Account Button with Tooltip */}
        <div className="flex items-center gap-3 group">
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-r from-white to-gray-200 text-gray-900 font-black rounded-lg px-4 py-2 text-sm shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-center leading-tight"
          >
            <div>Link Your Bank</div>
            <div>Account to GlobePay</div>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowAddMoney(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-200 flex items-center justify-center text-gray-900 font-black border-2 border-gray-400 shadow-2xl active:scale-90 transition-transform hover:shadow-2xl hover:from-gray-100 hover:to-gray-300"
            title="Link Bank Account"
          >
            <Plus className="w-8 h-8" />
          </motion.button>
        </div>
      </div>

      {/* Currency Trends Modal */}
      <AnimatePresence>
        {showTrends && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTrends(false)}
              className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
            />

            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-gray-100 to-gray-50 rounded-t-3xl z-50 max-h-[95vh] overflow-y-auto border-t-2 border-gray-400 shadow-2xl"
            >
              <div className="flex justify-between items-center p-6 sticky top-0 bg-white rounded-t-3xl border-b-2 border-gray-200">
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowTrends(false)}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors border-2 border-gray-400 text-gray-700"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>
                  <h2 className="text-3xl font-black text-gray-900">{selectedInsight} Weekly Trends</h2>
                </div>
              </div>

              <div className="px-6 pb-10 pt-6">
                {/* Tab Selection */}
                <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                  {['USD', 'EUR', 'GBP'].map((currency) => (
                    <motion.button
                      key={currency}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setActiveChartTab(currency)}
                      className={`px-5 py-3 rounded-lg font-bold uppercase tracking-wider transition-all border-2 ${
                        activeChartTab === currency
                          ? 'border-gray-800 bg-gray-800 text-white shadow-md'
                          : 'border-gray-400 bg-white text-gray-900 hover:border-gray-600'
                      }`}
                    >
                      {currency}
                    </motion.button>
                  ))}
                </div>

                {/* Weekly Chart */}
                <div className="bg-gradient-to-br from-white to-gray-100 border-2 border-gray-400 rounded-2xl p-6 shadow-lg mb-8">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Weekly Price Movement</h3>
                  <div className="h-64 -mx-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weeklyChartData[activeChartTab]} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorWeekly" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#374151" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#374151" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                        <XAxis dataKey="day" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255,255,255,0.95)', 
                            border: '2px solid #6b7280',
                            borderRadius: '8px',
                            color: '#000000'
                          }}
                          labelStyle={{ color: '#374151' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="price" 
                          stroke="#4b5563" 
                          strokeWidth={2}
                          fillOpacity={1} 
                          fill="url(#colorWeekly)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Hourly Chart */}
                <div className="bg-gradient-to-br from-white to-gray-100 border-2 border-gray-400 rounded-2xl p-6 shadow-lg mb-8">
                  <h3 className="text-xl font-black text-gray-900 mb-4">Hourly Price Movement (Today)</h3>
                  <div className="h-64 -mx-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={hourlyChartData[activeChartTab]} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorHourly" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#374151" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#374151" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                        <XAxis dataKey="time" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255,255,255,0.95)', 
                            border: '2px solid #6b7280',
                            borderRadius: '8px',
                            color: '#000000'
                          }}
                          labelStyle={{ color: '#374151' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="price" 
                          stroke="#4b5563" 
                          strokeWidth={2}
                          fillOpacity={1} 
                          fill="url(#colorHourly)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Stats */}
                <div className="bg-gradient-to-br from-white to-gray-200 border-2 border-gray-400 rounded-lg p-4 shadow-md mt-8">
                  <h4 className="text-gray-900 font-black mb-3 uppercase tracking-widest">Weekly Statistics</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-700 font-bold block">Highest</span>
                      <span className="text-gray-900 font-black text-lg">108.50</span>
                    </div>
                    <div>
                      <span className="text-gray-700 font-bold block">Lowest</span>
                      <span className="text-gray-900 font-black text-lg">104.50</span>
                    </div>
                    <div>
                      <span className="text-gray-700 font-bold block">Avg</span>
                      <span className="text-gray-900 font-black text-lg">106.34</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Wallet Modal */}
      <AnimatePresence>
        {showWallet && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWallet(false)}
              className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
            />

            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-gray-100 to-gray-50 rounded-t-3xl z-50 max-h-[95vh] overflow-y-auto border-t-2 border-gray-400 shadow-2xl"
            >
              <div className="flex justify-center pt-4 pb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full" />
              </div>

              <div className="px-6 pb-10">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-black text-gray-900">My Wallet</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowWallet(false)}
                    className="p-2 hover:bg-gray-300 rounded-full transition-colors border-2 border-gray-400 active:scale-90 bg-white text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                {/* Wallet Balance Display */}
                <div className="mb-8">
                  <h3 className="text-lg font-black text-gray-900 mb-4 uppercase tracking-widest">Converted Currencies</h3>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {Object.entries(walletCurrencies).map(([currency, balance]) => (
                      <motion.div
                        key={currency}
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-br from-gray-200 to-gray-300 text-gray-900 border-2 border-gray-400 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all shadow-md"
                      >
                        <p className="text-gray-700 text-xs font-bold uppercase tracking-widest">{currency}</p>
                        <p className="text-2xl font-black text-gray-900">{typeof balance === 'number' ? balance.toLocaleString() : balance}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Currency Converter */}
                <div className="mb-8">
                  <h3 className="text-lg font-black text-gray-900 mb-4 uppercase tracking-widest">Convert Currency</h3>
                  
                  <div className="space-y-3">
                    {/* From Amount */}
                    <div>
                      <label className="block text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Amount (INR)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-700 font-black">₹</span>
                        <input
                          type="number"
                          placeholder="Enter INR amount"
                          value={convertedAmount}
                          onChange={(e) => setConvertedAmount(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-400 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-400/30 transition-all font-bold"
                        />
                      </div>
                    </div>

                    {/* To Currency */}
                    <div>
                      <label className="block text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Convert To</label>
                      <select
                        value={convertTo}
                        onChange={(e) => setConvertTo(e.target.value)}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-400 rounded-lg text-gray-900 font-bold focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-400/30 transition-all uppercase cursor-pointer"
                      >
                        {Object.keys(conversionRates).map((curr) => (
                          <option key={curr} value={curr} className="bg-white">
                            {curr}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Conversion Rate */}
                    <div className="bg-gray-200 border-2 border-gray-400 rounded-lg p-3">
                      <p className="text-gray-700 text-xs font-bold uppercase tracking-widest">Conversion Rate</p>
                      <p className="text-gray-900 font-black">1 INR = {conversionRates[convertTo]} {convertTo} (Live Rate)</p>
                    </div>

                    {/* Convert Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCurrencyConvert}
                      className="w-full py-3 bg-gradient-to-r from-gray-800 to-gray-700 text-white font-black rounded-lg hover:from-gray-700 hover:to-gray-600 transition-all uppercase tracking-widest border-2 border-gray-800 active:scale-95 shadow-md"
                    >
                      Convert Now
                    </motion.button>
                  </div>
                </div>

                {/* Wallet Stats */}
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-gray-400 rounded-lg p-4 shadow-md">
                  <h4 className="text-gray-900 font-black mb-3 uppercase tracking-widest">Wallet Statistics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-700 font-bold">Total Holdings</span>
                      <span className="text-gray-900 font-black">₹{totalBalance.toLocaleString()}+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700 font-bold">Safe Score</span>
                      <span className="text-gray-900 font-black">98/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700 font-bold">Month Growth</span>
                      <span className="text-gray-900 font-black">+12.5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Sheet - Add Money */}
      <AnimatePresence>
        {showAddMoney && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddMoney(false)}
              className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
            />

            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-gray-100 to-gray-50 rounded-t-3xl z-50 max-h-[90vh] overflow-y-auto border-t-2 border-gray-400 shadow-2xl"
            >
              <div className="flex justify-center pt-4 pb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full" />
              </div>

              <div className="px-6 pb-10">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-black text-gray-900">Link Your Bank Account</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowAddMoney(false)}
                    className="p-2 hover:bg-gray-300 rounded-full transition-colors border-2 border-gray-400 active:scale-90 bg-white text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-black text-gray-900 mb-4 uppercase tracking-widest">
                    Linked Bank Account
                  </label>
                  <div className="space-y-2">
                    {['HDFC', 'ICICI', 'Axis', 'SBI'].map((bank) => (
                      <motion.button
                        key={bank}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedBank(bank)}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left font-bold uppercase tracking-wide shadow-md ${
                          selectedBank === bank
                            ? 'border-gray-700 bg-gradient-to-r from-gray-800 to-gray-700 text-white'
                            : 'border-gray-400 bg-white text-gray-900 hover:border-gray-600'
                        }`}
                      >
                        {bank} Bank
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-black text-gray-900 mb-3 uppercase tracking-widest">
                    Amount (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-700 font-black">₹</span>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-10 pr-4 py-4 bg-white border-2 border-gray-400 rounded-lg text-gray-900 text-lg placeholder-gray-500 focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-400/30 transition-all font-bold"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddMoney}
                  className="w-full py-4 bg-gradient-to-r from-gray-800 to-gray-700 text-white font-black rounded-lg hover:from-gray-700 hover:to-gray-600 transition-all mb-4 uppercase tracking-widest border-2 border-gray-800 active:scale-95 shadow-md text-lg"
                >
                  Add ₹{amount || '0'} to {selectedBank}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowAddMoney(false)}
                  className="w-full py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-200 transition-all border-2 border-gray-400 uppercase tracking-wide active:scale-95"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* QR Scanner Modal */}
      <AnimatePresence>
        {showQRScanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex flex-col"
          >
            <div className="relative z-10 flex justify-between items-center p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-transparent border-b-2 border-gray-700">
              <h2 className="text-2xl font-black text-white uppercase tracking-widest">Scan QR Code</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowQRScanner(false)}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors border-2 border-gray-600 active:scale-90 text-white"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="relative w-64 h-64 border-4 border-gray-400 rounded-lg bg-gray-400/10">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-gray-300 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-gray-300 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-gray-300 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-gray-300 rounded-br-lg" />
              </div>
            </div>

            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              className="relative z-10 bg-gradient-to-t from-gray-900 via-gray-800 to-transparent px-6 py-8 flex gap-4 border-t-2 border-gray-700"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFlashOn(!flashOn)}
                className={`flex-1 py-4 rounded-lg font-black transition-all flex items-center justify-center gap-2 uppercase tracking-wider border-2 ${
                  flashOn
                    ? 'bg-yellow-400 text-black border-yellow-500'
                    : 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-300 border-gray-600 hover:border-gray-500'
                }`}
              >
                <Flashlight className="w-5 h-5" />
                Flash
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  alert('Payment of ₹500 successful!');
                  setShowQRScanner(false);
                }}
                className="flex-1 py-4 bg-gradient-to-r from-white to-gray-200 text-gray-900 font-black rounded-lg hover:from-gray-100 hover:to-gray-300 transition-all uppercase tracking-widest border-2 border-gray-400 active:scale-95 text-lg"
              >
                Payment Successful
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}