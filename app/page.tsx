'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, QrCode, X, Plus, Zap, TrendingDown, TrendingUp, Flashlight, Wallet, ChevronLeft, Sparkles, TrendingUp as Trending, AlertCircle, Camera, CheckCircle, Zap as ZapIcon, Download, FileText } from 'lucide-react';
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
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-400 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-400/30 transition-all"
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
                  className="w-full pl-12 pr-12 py-3 bg-white border-2 border-gray-400 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-400/30 transition-all"
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
              className="w-full py-3 bg-gradient-to-r from-gray-800 to-gray-700 text-white font-black rounded-lg hover:from-gray-700 hover:to-gray-600 transition-all uppercase tracking-widest border-2 border-gray-900 shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
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

interface PaymentBreakdown {
  totalUSD: number;
  deductedUSD: number;
  deductedINR: number;
  emergencyFee: number;
  merchant: string;
}

interface Transaction {
  id: string;
  name: string;
  amount: string;
  time: string;
  bgColor: string;
  borderColor: string;
  amountColor: string;
  note?: string;
  baseAmount?: number;
  fxFee?: number;
  timestamp?: string;
}

interface ReceiptData {
  merchant: string;
  baseAmount: number;
  fxFee: number;
  totalAmount: number;
  timestamp: string;
  transactionId: string;
  status: string;
}

// GlobePay Component (Main App)
function GlobePay() {
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [showTrends, setShowTrends] = useState(false);
  const [showLiquidityError, setShowLiquidityError] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptData | null>(null);
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC');
  const [flashOn, setFlashOn] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState('');
  const [convertTo, setConvertTo] = useState('USD');
  const [activeChartTab, setActiveChartTab] = useState('USD');
  const [loadingAddMoney, setLoadingAddMoney] = useState(false);
  const [loadingQRPay, setLoadingQRPay] = useState(false);
  const [currentExchangeRate, setCurrentExchangeRate] = useState(83.5);
  const [shortfallAmount, setShortfallAmount] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [insufficientUSD, setInsufficientUSD] = useState(false);
  const [paymentBreakdown, setPaymentBreakdown] = useState<PaymentBreakdown | null>(null);
  const [quickConvertCurrency, setQuickConvertCurrency] = useState<string | null>(null);
  const [quickConvertRate, setQuickConvertRate] = useState<number | null>(null);
  
  // State for wallet currencies - tracking local balances
  const [localWalletCurrencies, setLocalWalletCurrencies] = useState({
    INR: 50000,
    USD: 150.50,
    EUR: 120.75,
    GBP: 390,
    JPY: 5200
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Convex hooks
  const loadWalletMutation = useMutation(api.ledger.loadWallet);
  const processPaymentFromQrScanMutation = useMutation(api.ledger.processPaymentFromQrScan);
  const walletData = useQuery(api.ledger.getWallet);

  // Exchange rates for conversion
  const conversionRates: Record<string, number> = {
    USD: 0.012,
    EUR: 0.011,
    GBP: 0.0095,
    JPY: 1.8
  };

  // FIX 1: Calculate total balance from all currencies converted to INR
  const calculateTotalBalance = (currencies: typeof localWalletCurrencies) => {
    let total = currencies.INR || 0;
    
    // Convert USD to INR (using inverse of conversion rate)
    if (currencies.USD > 0) {
      total += currencies.USD * (1 / conversionRates.USD);
    }
    
    // Convert EUR to INR
    if (currencies.EUR > 0) {
      total += currencies.EUR * (1 / conversionRates.EUR);
    }
    
    // Convert GBP to INR
    if (currencies.GBP > 0) {
      total += currencies.GBP * (1 / conversionRates.GBP);
    }
    
    // JPY conversion (JPY already in correct rate)
    if (currencies.JPY > 0) {
      total += currencies.JPY / conversionRates.JPY;
    }
    
    return Math.floor(total);
  };

  // Calculate total balance whenever currencies change
  const totalBalance = calculateTotalBalance(localWalletCurrencies);

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
      textColor: 'text-red-700',
      rate: 83.5
    },
    {
      currency: 'EUR',
      status: 'UP',
      prediction: 'Bullish trend continuing',
      recommendation: 'Hold & Watch',
      icon: TrendingUp,
      bgColor: 'bg-gray-200',
      borderColor: 'border-gray-300',
      textColor: 'text-blue-700',
      rate: 90.2
    },
    {
      currency: 'GBP',
      status: 'STABLE',
      prediction: 'Sideways movement expected',
      recommendation: 'Monitor',
      icon: Zap,
      bgColor: 'bg-gray-200',
      borderColor: 'border-gray-300',
      textColor: 'text-green-700',
      rate: 106.0
    },
    {
      currency: 'JPY',
      status: 'DOWN',
      prediction: 'Potential dip opportunity',
      recommendation: 'Accumulate',
      icon: TrendingDown,
      bgColor: 'bg-gray-200',
      borderColor: 'border-gray-300',
      textColor: 'text-orange-700',
      rate: 0.62
    }
  ];

  // Sample transaction data with receipt info
  const transactions: Transaction[] = [
    { 
      id: 'txn_001',
      name: 'Payment to Acme Corp', 
      amount: '-₹2,500', 
      time: '2 hours ago', 
      bgColor: 'bg-gray-200', 
      borderColor: 'border-gray-400', 
      amountColor: 'text-red-700',
      note: 'emergency INR settled',
      baseAmount: 2400,
      fxFee: 100,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    { 
      id: 'txn_002',
      name: 'Received from Client', 
      amount: '+₹5,000', 
      time: '5 hours ago', 
      bgColor: 'bg-gray-200', 
      borderColor: 'border-gray-400', 
      amountColor: 'text-green-700',
      note: 'normal transfer',
      baseAmount: 5000,
      fxFee: 0,
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
    },
    { 
      id: 'txn_003',
      name: 'Currency Exchange', 
      amount: '₹1,200 → $15', 
      time: 'Yesterday', 
      bgColor: 'bg-gray-200', 
      borderColor: 'border-gray-400', 
      amountColor: 'text-blue-700',
      note: 'emergency INR settlement applied',
      baseAmount: 1000,
      fxFee: 200,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  // Handle receipt download
  const handleDownloadReceipt = (tx: Transaction) => {
    if (!tx.baseAmount) return;
    
    const receipt: ReceiptData = {
      merchant: tx.name,
      baseAmount: tx.baseAmount,
      fxFee: tx.fxFee || 0,
      totalAmount: tx.baseAmount + (tx.fxFee || 0),
      timestamp: tx.timestamp || new Date().toISOString(),
      transactionId: tx.id,
      status: 'Completed'
    };
    
    setSelectedReceipt(receipt);
    setShowReceiptModal(true);
  };

  // Start camera scanner
  const startScanner = async () => {
    try {
      setCameraError(null);
      const constraints = {
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(err => console.error('Play error:', err));
        };
      }

      setCameraActive(true);
    } catch (error: any) {
      console.error('Camera error:', error);
      let errorMessage = 'Unable to access camera';
      
      if (error.name === 'NotAllowedError') {
        errorMessage = 'Camera permission denied. Please enable in settings.';
      } else if (error.name === 'NotFoundError') {
        errorMessage = 'No camera device found.';
      } else if (error.name === 'NotReadableError') {
        errorMessage = 'Camera is already in use by another app.';
      }

      setCameraError(errorMessage);
      setCameraActive(false);
    }
  };

  // Stop camera scanner
  const stopScanner = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraActive(false);
    setCameraError(null);
  };

  // Handle QR code capture (simulate scanning)
  const handleCapture = async () => {
    setLoadingQRPay(true);
    try {
      // Mock payment amount: 500 USD cents = $5.00
      const mockAmountUSDCents = 50000;
      const mockAmountUSD = mockAmountUSDCents / 100;
      const inrPerUsd = currentExchangeRate;
      const currentUSDCents = walletData ? walletData.balanceUSD : 0;
      const currentINRPaisa = walletData ? walletData.balanceINR : 0;

      // Calculate emergency fee scenario
      let deductedUSD = 0;
      let deductedINR = 0;
      let emergencyFee = 0;

      if (currentUSDCents >= mockAmountUSDCents) {
        // Enough USD, no emergency fee needed
        deductedUSD = mockAmountUSD;
        setInsufficientUSD(false);
      } else {
        // USD shortfall, will use INR with emergency fee
        deductedUSD = currentUSDCents / 100;
        const shortfallUSDCents = mockAmountUSDCents - currentUSDCents;
        const shortfallUSD = shortfallUSDCents / 100;
        
        // Calculate INR debit with 2% emergency fee
        const inrNeeded = shortfallUSD * inrPerUsd;
        emergencyFee = inrNeeded * 0.02;
        deductedINR = inrNeeded + emergencyFee;
        setInsufficientUSD(true);
      }

      const qrPayload = JSON.stringify({
        v: 1,
        t: 'pay',
        merchant: 'Test Merchant',
        amountUSDCents: mockAmountUSDCents,
      });

      // Call processPaymentFromQrScan with currentExchangeRate
      const result = await processPaymentFromQrScanMutation({
        qrPayload,
        inrPerUsd,
      });

      // Set payment breakdown for success card
      setPaymentBreakdown({
        totalUSD: mockAmountUSD,
        deductedUSD,
        deductedINR,
        emergencyFee,
        merchant: 'Test Merchant'
      });

      setShowSuccessCard(true);
      stopScanner();
      setShowQRScanner(false);
    } catch (error: any) {
      // Extract shortfall amount from error message or calculate it
      const errorMsg = error.message || 'Unknown error';
      
      if (errorMsg.includes('Insufficient USD and INR')) {
        // Calculate approximate shortfall (500 USD cents as mock payment)
        const mockPaymentCents = 50000;
        const currentUSDCents = walletData ? walletData.balanceUSD : 0;
        const currentINRPaisa = walletData ? walletData.balanceINR : 0;
        const currentINRRupees = currentINRPaisa / 100;
        
        // Calculate how much INR would be needed
        const inrNeeded = (mockPaymentCents - currentUSDCents) * currentExchangeRate;
        const shortfallINRRupees = Math.max(0, inrNeeded - currentINRRupees);
        
        setShortfallAmount(shortfallINRRupees);
        setShowLiquidityError(true);
        stopScanner();
        setShowQRScanner(false);
      } else {
        alert(`Payment failed: ${errorMsg}`);
      }
    } finally {
      setLoadingQRPay(false);
    }
  };

  const handleAddMoney = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setLoadingAddMoney(true);
    try {
      // Convert Rupees to paisa (1 INR = 100 paisa)
      const amountINRPaisa = Math.floor(parseFloat(amount) * 100);
      
      // Determine target currency and rate
      const targetCurrency = quickConvertCurrency || 'INR';
      const inrPerUnit = quickConvertRate || 1;
      
      // Call loadWallet with the appropriate parameters
      const result = await loadWalletMutation({
        amountINRPaisa,
        targetCurrency,
        inrPerUnit,
      });

      alert(`Successfully added ₹${amount} from ${selectedBank} Bank at rate ₹${inrPerUnit}/${targetCurrency}!`);
      setAmount('');
      setShowAddMoney(false);
      setQuickConvertCurrency(null);
      setQuickConvertRate(null);
    } catch (error: any) {
      alert(`Error: ${error.message || 'Failed to add money'}`);
    } finally {
      setLoadingAddMoney(false);
    }
  };

  // FIX 2: Handle currency conversion FROM INR to other currencies
  const handleConvertCurrency = () => {
    if (!convertedAmount || parseFloat(convertedAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const inrAmount = parseFloat(convertedAmount);
    const targetCurrencyCode = convertTo;

    // Check if user has enough INR
    if (localWalletCurrencies.INR < inrAmount) {
      alert('Insufficient INR balance for conversion');
      return;
    }

    // Calculate how much foreign currency to add
    const inrToForeignRate = conversionRates[targetCurrencyCode];
    const foreignAmount = inrAmount * inrToForeignRate;

    // Update local wallet: deduct from INR, add to target currency
    setLocalWalletCurrencies(prev => ({
      ...prev,
      INR: prev.INR - inrAmount,
      [targetCurrencyCode]: (prev[targetCurrencyCode as keyof typeof prev] || 0) + foreignAmount
    }));

    // Show success message
    alert(`Successfully converted ₹${inrAmount.toFixed(2)} to ${foreignAmount.toFixed(2)} ${targetCurrencyCode}!`);
    setConvertedAmount('');
  };

  const handleAutoConvertINR = () => {
    setShowLiquidityError(false);
    setAmount(Math.ceil(shortfallAmount).toString());
    setShowAddMoney(true);
  };

  const handleInsightClick = (currency: string, rate: number) => {
    setSelectedInsight(currency);
    setActiveChartTab(currency);
    setCurrentExchangeRate(rate);
    setShowTrends(true);
  };

  // Handle Quick Convert from AI Strategy
  const handleQuickConvert = () => {
    setQuickConvertCurrency(activeChartTab);
    setQuickConvertRate(currentExchangeRate);
    setShowTrends(false);
    setShowAddMoney(true);
  };

  // Handle QR Scanner open/close
  const handleOpenQRScanner = () => {
    setShowQRScanner(true);
    setCameraError(null);
  };

  const handleCloseQRScanner = () => {
    stopScanner();
    setShowQRScanner(false);
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

  const errorOverlayVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  const successCardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 200, damping: 20 }
    },
    exit: { opacity: 0, y: 50, transition: { duration: 0.2 } }
  };

  const receiptModalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    },
    exit: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.2 } }
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
            { symbol: 'INR', amount: localWalletCurrencies.INR, flag: '🇮🇳' },
            { symbol: 'USD', amount: localWalletCurrencies.USD, flag: '🇺🇸' },
            { symbol: 'EUR', amount: localWalletCurrencies.EUR, flag: '🇪🇺' },
            { symbol: 'GBP', amount: localWalletCurrencies.GBP, flag: '🇬🇧' }
          ].map((currency) => (
            <motion.div
              key={currency.symbol}
              whileHover={{ scale: 1.08, y: -8 }}
              className="flex-shrink-0 bg-gradient-to-br from-white to-gray-200 text-gray-900 border-2 border-gray-400 rounded-full px-8 py-4 hover:shadow-xl transition-all cursor-pointer font-bold shadow-md"
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
                  onClick={() => handleInsightClick(insight.currency, insight.rate)}
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
              Global Ledger
            </h3>
          </div>
          <div className="space-y-3">
            {transactions.map((tx, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 8, scale: 1.02 }}
                className={`${tx.bgColor} border-2 ${tx.borderColor} rounded-xl p-5 cursor-pointer transition-all shadow-md hover:shadow-lg`}
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="text-gray-900 font-bold text-lg">{tx.name}</p>
                      {/* FX Auto-Settled Badge */}
                      {tx.note && tx.note.includes('emergency INR') && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="px-2 py-1 bg-red-600 text-white text-xs font-black rounded-full border border-red-700 shadow-md"
                        >
                          FX Auto-Settled
                        </motion.span>
                      )}
                    </div>
                    <p className="text-gray-600 text-xs font-bold uppercase">{tx.time}</p>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <p className={`font-black text-xl ${tx.amountColor}`}>
                      {tx.amount}
                    </p>
                    {/* Download Receipt Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDownloadReceipt(tx)}
                      className="p-2 bg-white hover:bg-gray-300 rounded-full transition-all border-2 border-gray-500 shadow-md"
                      title="Download Receipt"
                    >
                      <Download className="w-5 h-5 text-gray-900" />
                    </motion.button>
                  </div>
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
            onClick={handleOpenQRScanner}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-200 flex items-center justify-center text-gray-900 font-black border-2 border-gray-400 shadow-2xl active:scale-90 transition-transform"
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
            className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-gray-900 font-black border-2 border-gray-500 shadow-2xl active:scale-90 transition-transform"
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
            className="bg-gradient-to-r from-white to-gray-200 text-gray-900 font-black rounded-lg px-4 py-2 text-sm shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-center"
          >
            <div>Link Your Bank</div>
            <div>Account to GlobePay</div>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowAddMoney(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-200 flex items-center justify-center text-gray-900 font-black border-2 border-gray-400 shadow-2xl active:scale-90 transition-transform"
            title="Link Bank Account"
          >
            <Plus className="w-8 h-8" />
          </motion.button>
        </div>
      </div>

      {/* Receipt Modal */}
      <AnimatePresence>
        {showReceiptModal && selectedReceipt && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReceiptModal(false)}
              className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
            />

            <motion.div
              variants={receiptModalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-auto px-6"
            >
              <div className="bg-gradient-to-br from-gray-100 to-white border-2 border-gray-400 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                  {/* Receipt Header */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center mb-4"
                  >
                    <div className="p-4 bg-gray-200 rounded-full">
                      <FileText className="w-8 h-8 text-gray-700" />
                    </div>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="text-3xl font-black text-gray-900 mb-2"
                  >
                    Transaction Receipt
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-600 font-bold text-sm"
                  >
                    {selectedReceipt.status}
                  </motion.p>
                </div>

                {/* Receipt Details */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="bg-gray-50 border-2 border-gray-300 rounded-2xl p-6 mb-6 space-y-4"
                >
                  {/* Transaction ID */}
                  <div className="pb-4 border-b-2 border-gray-300">
                    <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-1">Transaction ID</p>
                    <p className="text-gray-900 font-black text-sm font-mono">{selectedReceipt.transactionId}</p>
                  </div>

                  {/* Merchant */}
                  <div className="pb-4 border-b-2 border-gray-300">
                    <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-1">Merchant</p>
                    <p className="text-gray-900 font-black text-lg">{selectedReceipt.merchant}</p>
                  </div>

                  {/* Base Amount */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="pb-4 border-b-2 border-gray-300"
                  >
                    <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-1">Base Amount</p>
                    <p className="text-gray-900 font-black text-xl">₹{selectedReceipt.baseAmount.toLocaleString()}</p>
                  </motion.div>

                  {/* FX Fee */}
                  {selectedReceipt.fxFee > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 }}
                      className="pb-4 border-b-2 border-gray-300"
                    >
                      <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-1">FX Processing Fee</p>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-900 font-black text-lg">₹{selectedReceipt.fxFee.toFixed(2)}</p>
                        <span className="px-2 py-1 bg-red-100 border-2 border-red-300 text-red-700 text-xs font-bold rounded">Emergency Fee</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Total Amount */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="pt-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-4"
                  >
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Total Amount Deducted</p>
                    <p className="text-white font-black text-2xl">₹{selectedReceipt.totalAmount.toLocaleString()}</p>
                  </motion.div>

                  {/* Timestamp */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className="text-center pt-4"
                  >
                    <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">Timestamp</p>
                    <p className="text-gray-900 font-bold text-sm mt-1">
                      {new Date(selectedReceipt.timestamp).toLocaleString()}
                    </p>
                  </motion.div>
                </motion.div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {/* Download Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // Simulate download
                      alert(`Receipt downloaded: ${selectedReceipt.transactionId}`);
                    }}
                    className="w-full py-4 bg-gradient-to-r from-gray-800 to-gray-700 text-white font-black rounded-lg hover:from-gray-700 hover:to-gray-600 transition-all uppercase tracking-widest border-2 border-gray-900 shadow-lg active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download PDF
                  </motion.button>

                  {/* Close Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowReceiptModal(false)}
                    className="w-full py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-200 transition-all border-2 border-gray-400 uppercase tracking-wide active:scale-95"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Payment Card Overlay */}
      <AnimatePresence>
        {showSuccessCard && paymentBreakdown && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccessCard(false)}
              className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
            />

            <motion.div
              variants={successCardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 z-50 w-full max-w-md mx-auto px-6"
            >
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 border-2 border-green-700 rounded-3xl p-8 shadow-2xl">
                <div className="flex flex-col items-center text-center">
                  {/* Success Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="mb-6"
                  >
                    <CheckCircle className="w-20 h-20 text-white drop-shadow-lg" />
                  </motion.div>

                  {/* Success Title */}
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-black text-white mb-2 uppercase tracking-wider drop-shadow-lg"
                  >
                    Payment Success
                  </motion.h2>

                  {/* Merchant Name */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-green-100 font-bold text-lg mb-6"
                  >
                    {paymentBreakdown.merchant}
                  </motion.p>

                  {/* Payment Breakdown */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-full bg-white/20 border-2 border-white/30 rounded-2xl p-6 mb-6 backdrop-blur-sm"
                  >
                    {/* Total Amount */}
                    <div className="mb-6 pb-6 border-b-2 border-white/30">
                      <p className="text-green-100 text-sm font-bold uppercase tracking-widest mb-2">Total Amount</p>
                      <p className="text-4xl font-black text-white">
                        ${paymentBreakdown.totalUSD.toFixed(2)}
                      </p>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-4">
                      {/* USD Deduction */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <p className="text-green-100 text-xs font-bold uppercase tracking-widest">USD Deducted</p>
                          <p className="text-white font-black text-lg">
                            ${paymentBreakdown.deductedUSD.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-4xl">💵</div>
                      </motion.div>

                      {/* Separator */}
                      {paymentBreakdown.deductedINR > 0 && (
                        <>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-px bg-white/30"></div>
                            <span className="text-white/60 text-xs font-bold">+</span>
                            <div className="flex-1 h-px bg-white/30"></div>
                          </div>

                          {/* INR Deduction */}
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex justify-between items-center"
                          >
                            <div>
                              <p className="text-green-100 text-xs font-bold uppercase tracking-widest">INR Deducted (Emergency)</p>
                              <p className="text-white font-black text-lg">
                                ₹{paymentBreakdown.deductedINR.toFixed(0)}
                              </p>
                              <p className="text-green-100 text-xs mt-1">
                                (Including {(paymentBreakdown.emergencyFee).toFixed(0)}₹ fee)
                              </p>
                            </div>
                            <div className="text-4xl">🇮🇳</div>
                          </motion.div>
                        </>
                      )}
                    </div>
                  </motion.div>

                  {/* Emergency Fee Notice */}
                  {paymentBreakdown.emergencyFee > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="w-full bg-white/10 border-l-4 border-white rounded-lg p-3 mb-6 text-left"
                    >
                      <p className="text-green-100 text-xs font-bold uppercase tracking-widest">Emergency Fee Applied</p>
                      <p className="text-white font-bold text-sm mt-1">
                        2% fee (₹{paymentBreakdown.emergencyFee.toFixed(0)}) added to cover USD shortfall
                      </p>
                    </motion.div>
                  )}

                  {/* Dismiss Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowSuccessCard(false)}
                    className="w-full py-4 bg-white text-green-600 font-black rounded-lg hover:bg-gray-100 transition-all uppercase tracking-widest border-2 border-white shadow-lg active:scale-95"
                  >
                    Done
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Global Liquidity Insufficient Error Overlay */}
      <AnimatePresence>
        {showLiquidityError && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLiquidityError(false)}
              className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
            />

            <motion.div
              variants={errorOverlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-auto px-6"
            >
              <div className="bg-gradient-to-br from-red-600 to-red-700 border-2 border-red-800 rounded-3xl p-8 shadow-2xl">
                <div className="flex flex-col items-center text-center">
                  {/* Error Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="mb-6"
                  >
                    <AlertCircle className="w-16 h-16 text-white drop-shadow-lg" />
                  </motion.div>

                  {/* Error Title */}
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl font-black text-white mb-3 uppercase tracking-wider drop-shadow-lg"
                  >
                    Global Liquidity
                  </motion.h2>
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="text-4xl font-black text-white mb-6 uppercase tracking-wider drop-shadow-lg"
                  >
                    Insufficient
                  </motion.h2>

                  {/* Error Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-red-100 font-bold text-lg mb-2"
                  >
                    Your USD and INR balances are insufficient for this transaction.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="text-red-100 font-bold text-sm mb-6"
                  >
                    Required shortfall: ₹{Math.ceil(shortfallAmount).toLocaleString()}
                  </motion.p>

                  {/* Buttons */}
                  <div className="w-full space-y-3">
                    {/* Auto-Convert INR Button */}
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAutoConvertINR}
                      className="w-full py-4 bg-gradient-to-r from-white to-gray-100 text-red-700 font-black rounded-lg hover:from-gray-50 hover:to-white transition-all uppercase tracking-widest border-2 border-white shadow-lg active:scale-95"
                    >
                      Auto-Convert INR
                    </motion.button>

                    {/* Dismiss Button */}
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowLiquidityError(false)}
                      className="w-full py-3 bg-red-800 text-white font-bold rounded-lg hover:bg-red-900 transition-all uppercase tracking-wide border-2 border-red-600 active:scale-95"
                    >
                      Dismiss
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
                <div className="bg-gradient-to-br from-white to-gray-200 border-2 border-gray-400 rounded-lg p-4 shadow-md mb-6">
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

                {/* AI Strategy Section with Quick Convert Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-blue-100 to-blue-50 border-2 border-blue-400 rounded-lg p-6 shadow-md"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <ZapIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h4 className="text-blue-900 font-black text-lg mb-2">AI Strategy for {activeChartTab}</h4>
                      <p className="text-blue-800 text-sm font-bold leading-relaxed mb-4">
                        Based on current market analysis, {activeChartTab} shows strong potential at ₹{currentExchangeRate.toFixed(2)} per unit. 
                        This is an optimal time to acquire before the projected 2.5% increase over 24 hours. Secure the AI-recommended rate now.
                      </p>
                      
                      {/* Quick Convert Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleQuickConvert}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all uppercase tracking-widest border-2 border-blue-800 shadow-lg active:scale-95 flex items-center justify-center gap-2"
                      >
                        <ZapIcon className="w-5 h-5" />
                        Quick Convert to {activeChartTab}
                      </motion.button>
                      
                      <p className="text-blue-700 text-xs mt-3 font-semibold text-center">
                        Guaranteed rate: ₹{currentExchangeRate.toFixed(2)} / {activeChartTab}
                      </p>
                    </div>
                  </div>
                </motion.div>
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
                  <h3 className="text-lg font-black text-gray-900 mb-4 uppercase tracking-widest">Your Balances</h3>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {[
                      { currency: 'INR', balance: localWalletCurrencies.INR },
                      { currency: 'USD', balance: localWalletCurrencies.USD },
                      { currency: 'EUR', balance: localWalletCurrencies.EUR },
                      { currency: 'GBP', balance: localWalletCurrencies.GBP }
                    ].map(({ currency, balance }) => (
                      <motion.div
                        key={currency}
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-br from-gray-200 to-gray-300 text-gray-900 border-2 border-gray-400 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all shadow-md"
                      >
                        <p className="text-gray-700 text-xs font-bold uppercase tracking-widest">{currency}</p>
                        <p className="text-2xl font-black text-gray-900">{balance.toLocaleString()}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Currency Converter - FROM INR */}
                <div className="mb-8">
                  <h3 className="text-lg font-black text-gray-900 mb-4 uppercase tracking-widest">Convert Currency</h3>
                  
                  <div className="space-y-3">
                    {/* From Amount (INR) */}
                    <div>
                      <label className="block text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Amount (in INR)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-700 font-black">₹</span>
                        <input
                          type="number"
                          placeholder="Enter INR amount"
                          value={convertedAmount}
                          onChange={(e) => setConvertedAmount(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-400 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-400/30 transition-all"
                        />
                      </div>
                    </div>

                    {/* To Currency */}
                    <div>
                      <label className="block text-sm font-black text-gray-900 mb-2 uppercase tracking-widest">Convert To</label>
                      <select
                        value={convertTo}
                        onChange={(e) => setConvertTo(e.target.value)}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-400 rounded-lg text-gray-900 font-bold focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-400/30 transition-all"
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="JPY">JPY</option>
                      </select>
                    </div>

                    {/* Conversion Rate Display */}
                    <div className="bg-gray-200 border-2 border-gray-400 rounded-lg p-3">
                      <p className="text-gray-700 text-xs font-bold uppercase tracking-widest">Conversion Rate</p>
                      <p className="text-gray-900 font-black">1 INR = {conversionRates[convertTo]} {convertTo}</p>
                      {convertedAmount && parseFloat(convertedAmount) > 0 && (
                        <p className="text-gray-800 text-sm font-bold mt-2">
                          ₹{convertedAmount} = {(parseFloat(convertedAmount) * conversionRates[convertTo]).toFixed(2)} {convertTo}
                        </p>
                      )}
                    </div>

                    {/* Convert Button - FROM INR TO OTHER CURRENCIES */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleConvertCurrency}
                      className="w-full py-3 bg-gradient-to-r from-gray-800 to-gray-700 text-white font-black rounded-lg hover:from-gray-700 hover:to-gray-600 transition-all uppercase tracking-widest border-2 border-gray-900 shadow-lg active:scale-95"
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
                      <span className="text-gray-900 font-black">₹{totalBalance.toLocaleString()}</span>
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
                  <h2 className="text-3xl font-black text-gray-900">
                    {quickConvertCurrency ? `Convert to ${quickConvertCurrency}` : 'Link Your Bank Account'}
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setShowAddMoney(false);
                      setQuickConvertCurrency(null);
                      setQuickConvertRate(null);
                    }}
                    className="p-2 hover:bg-gray-300 rounded-full transition-colors border-2 border-gray-400 active:scale-90 bg-white text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                {/* Quick Convert Info Banner */}
                {quickConvertCurrency && quickConvertRate && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 bg-blue-100 border-2 border-blue-400 rounded-lg p-4"
                  >
                    <p className="text-blue-900 font-bold text-sm">
                      🎯 AI-Recommended Rate: <span className="text-lg font-black">₹{quickConvertRate.toFixed(2)} / {quickConvertCurrency}</span>
                    </p>
                    <p className="text-blue-800 text-xs mt-2">Locked in for this transaction</p>
                  </motion.div>
                )}

                {/* Info Banner for Shortfall Auto-Fill */}
                {shortfallAmount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 bg-blue-100 border-2 border-blue-400 rounded-lg p-4 text-center"
                  >
                    <p className="text-blue-900 font-bold text-sm">Auto-filled with required shortfall: <span className="text-lg font-black">₹{Math.ceil(shortfallAmount)}</span></p>
                  </motion.div>
                )}

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
                      className="w-full pl-10 pr-4 py-4 bg-white border-2 border-gray-400 rounded-lg text-gray-900 text-lg placeholder-gray-500 focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-400/30 transition-all"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddMoney}
                  disabled={loadingAddMoney}
                  className="w-full py-4 bg-gradient-to-r from-gray-800 to-gray-700 text-white font-black rounded-lg hover:from-gray-700 hover:to-gray-600 transition-all mb-4 uppercase tracking-widest border-2 border-gray-900 shadow-lg active:scale-95 disabled:opacity-50"
                >
                  {loadingAddMoney ? 'Processing...' : `Add ₹${amount || '0'} to ${selectedBank}`}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowAddMoney(false);
                    setShortfallAmount(0);
                    setQuickConvertCurrency(null);
                    setQuickConvertRate(null);
                  }}
                  className="w-full py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-200 transition-all border-2 border-gray-400 uppercase tracking-wide active:scale-95"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* QR Scanner Modal with Live Camera Feed */}
      <AnimatePresence>
        {showQRScanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex flex-col"
            onAnimationComplete={() => {
              if (showQRScanner && !cameraActive) {
                startScanner();
              }
            }}
          >
            <div className="relative z-10 flex justify-between items-center p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-transparent border-b-2 border-gray-700">
              <h2 className="text-2xl font-black text-white uppercase tracking-widest flex items-center gap-2">
                <Camera className="w-6 h-6" />
                Scan QR Code
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCloseQRScanner}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors border-2 border-gray-600 active:scale-90 text-white"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-black">
              {cameraError ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center px-6 max-w-sm"
                >
                  <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-black text-white mb-2">Camera Error</h3>
                  <p className="text-gray-300 font-bold mb-6">{cameraError}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => startScanner()}
                    className="px-8 py-3 bg-white text-black font-black rounded-lg hover:bg-gray-200 transition-all uppercase tracking-widest"
                  >
                    Retry
                  </motion.button>
                </motion.div>
              ) : (
                <>
                  {/* Live Video Feed */}
                  <motion.video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: cameraActive ? 1 : 0 }}
                  />

                  {/* Scanning Frame Overlay */}
                  {cameraActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative w-72 h-72 border-4 border-white rounded-lg bg-transparent"
                    >
                      {/* Corner Indicators */}
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg" />

                      {/* Animated Scanning Line */}
                      <motion.div
                        animate={{ y: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-transparent via-white to-transparent"
                      />
                    </motion.div>
                  )}
                </>
              )}
            </div>

            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              className="relative z-10 bg-gradient-to-t from-gray-900 via-gray-800 to-transparent px-6 py-8 flex flex-col gap-4 border-t-2 border-gray-700"
            >
              {/* Insufficient USD Warning */}
              {insufficientUSD && cameraActive && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-3 text-center"
                >
                  <p className="text-yellow-200 font-bold text-sm">
                    ⚠️ Insufficient USD. Remaining amount will be settled from INR with a 2% emergency fee
                  </p>
                </motion.div>
              )}

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFlashOn(!flashOn)}
                  className={`flex-1 py-4 rounded-lg font-black transition-all flex items-center justify-center gap-2 uppercase tracking-wider border-2 ${
                    flashOn
                      ? 'bg-yellow-400 text-black border-yellow-500'
                      : 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-300 border-gray-600 hover:border-gray-500'
                  }`}
                  disabled={!cameraActive}
                >
                  <Flashlight className="w-5 h-5" />
                  Flash
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCapture}
                  disabled={loadingQRPay || !cameraActive}
                  className="flex-1 py-4 bg-gradient-to-r from-white to-gray-200 text-gray-900 font-black rounded-lg hover:from-gray-100 hover:to-gray-300 transition-all uppercase tracking-widest border-2 border-white shadow-lg active:scale-95 disabled:opacity-50"
                >
                  {loadingQRPay ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full mx-auto"
                    />
                  ) : (
                    'Capture'
                  )}
                </motion.button>
              </div>

              {/* Settlement Rate Label */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center text-gray-300 font-bold text-sm"
              >
                Settling at ₹<span className="text-white font-black">{currentExchangeRate.toFixed(1)}</span> / USD
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}