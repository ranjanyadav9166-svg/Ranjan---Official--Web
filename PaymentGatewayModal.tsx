import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  X, 
  CreditCard, 
  QrCode, 
  Building2, 
  Smartphone, 
  CheckCircle2, 
  Sparkles, 
  Percent, 
  Download, 
  Clock, 
  Check, 
  ArrowRight,
  Receipt,
  Wallet
} from 'lucide-react';

export const PaymentGatewayModal: React.FC = () => {
  const { 
    isPaymentModalOpen, 
    setIsPaymentModalOpen, 
    selectedPlanForPayment,
    setSelectedPlanForPayment,
    userSubscription,
    setUserSubscription,
    showToast 
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  
  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('Ranjan Kumar Yadav');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardBrand, setCardBrand] = useState<'visa' | 'mastercard' | 'rupay' | 'generic'>('rupay');

  // UPI details
  const [upiId, setUpiId] = useState('ranjankr@okaxis');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'cred'>('gpay');
  const [timeLeft, setTimeLeft] = useState(599); // 10 minutes

  // Netbanking details
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Processing & Success states
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  // Countdown timer for UPI QR
  useEffect(() => {
    if (!isPaymentModalOpen || isSuccess) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaymentModalOpen, isSuccess]);

  // Card brand detection
  useEffect(() => {
    const raw = cardNumber.replace(/\s+/g, '');
    if (raw.startsWith('4')) setCardBrand('visa');
    else if (raw.startsWith('5')) setCardBrand('mastercard');
    else if (raw.startsWith('6') || raw.startsWith('508')) setCardBrand('rupay');
    else setCardBrand('generic');
  }, [cardNumber]);

  if (!isPaymentModalOpen) return null;

  // Pricing calculations
  const basePriceINR = selectedPlanForPayment === 'enterprise' 
    ? (billingCycle === 'yearly' ? 5999 : 7499) 
    : (billingCycle === 'yearly' ? 1999 : 2499);

  const basePriceUSD = selectedPlanForPayment === 'enterprise' 
    ? (billingCycle === 'yearly' ? 79 : 99) 
    : (billingCycle === 'yearly' ? 24 : 29);

  const rawSubtotal = currency === 'INR' ? basePriceINR : basePriceUSD;
  const discountAmount = isPromoApplied ? Math.round(rawSubtotal * 0.15) : 0;
  const taxableAmount = rawSubtotal - discountAmount;
  const taxAmount = currency === 'INR' ? Math.round(taxableAmount * 0.18) : Math.round(taxableAmount * 0.10);
  const totalDue = taxableAmount + taxAmount;

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleApplyPromo = () => {
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'RANJAN' || clean === 'NEXORA' || clean === 'BEAST10') {
      setIsPromoApplied(true);
      setPromoDiscount(15);
      showToast({
        title: 'Coupon Applied! 🎉',
        description: `Code "${clean}" applied successfully: 15% discount granted.`,
        type: 'success'
      });
    } else {
      showToast({
        title: 'Invalid Coupon',
        description: 'Try promo code "RANJAN" or "NEXORA" for 15% off.',
        type: 'warning'
      });
    }
  };

  const handlePayNow = () => {
    setIsProcessing(true);
    setProcessingStep('Initializing 256-bit encrypted banking session...');

    setTimeout(() => {
      setProcessingStep('Authenticating payment with gateway authorization token...');
    }, 1000);

    setTimeout(() => {
      setProcessingStep('Awaiting 2FA & instant UPI / 3D-Secure clearance...');
    }, 2000);

    setTimeout(() => {
      const generatedTxn = 'TXN_NEX_' + Math.floor(1000000000 + Math.random() * 9000000000);
      setTransactionId(generatedTxn);
      setIsProcessing(false);
      setIsSuccess(true);

      const nextYear = new Date();
      nextYear.setFullYear(nextYear.getFullYear() + 1);

      const updatedSub = {
        plan: selectedPlanForPayment,
        activeUntil: nextYear.toISOString().split('T')[0],
        lastTransactionId: generatedTxn
      };

      setUserSubscription(updatedSub);
      localStorage.setItem('nexora_subscription', JSON.stringify(updatedSub));

      showToast({
        title: 'Payment Successful! 🎉',
        description: `Upgraded to NEXORA ${selectedPlanForPayment.toUpperCase()}. All features active.`,
        type: 'success'
      });
    }, 3200);
  };

  const handleDownloadInvoice = () => {
    // Generate simulated downloadable invoice
    const invoiceContent = `=====================================================
NEXORA TECHNOLOGIES INC. — OFFICIAL TAX INVOICE
=====================================================
Invoice ID: INV-2026-${transactionId.replace('TXN_NEX_', '')}
Transaction Reference: ${transactionId}
Date & Time: ${new Date().toLocaleString()}
Status: COMPLETED (PAID IN FULL)

Billed To:
Name: ${cardHolder || 'Ranjan Kumar Yadav'}
Account: Alex Vance (alex.vance@nexora.io)
Address: Narula Institute of Technology, Kolkata, WB

Items:
-----------------------------------------------------
1. NEXORA ${selectedPlanForPayment.toUpperCase()} Tier (${billingCycle.toUpperCase()})
   Amount: ${currency === 'INR' ? '₹' : '$'}${rawSubtotal}
   Discount: -${currency === 'INR' ? '₹' : '$'}${discountAmount}
   GST / VAT: +${currency === 'INR' ? '₹' : '$'}${taxAmount}
-----------------------------------------------------
TOTAL PAID: ${currency === 'INR' ? '₹' : '$'}${totalDue}
Payment Gateway: Razorpay / Stripe Secure Switch
=====================================================
Thank you for choosing NEXORA Workspace AI!`;

    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NEXORA_Invoice_${transactionId}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    showToast({
      title: 'Invoice Downloaded',
      description: `Receipt saved as NEXORA_Invoice_${transactionId}.txt`,
      type: 'info'
    });
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#0E131F] border border-blue-500/30 shadow-2xl overflow-hidden gemini-border-glow my-auto">
        
        {/* Top Header Strip */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#1E2538] bg-[#0A0D14]/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-[#0A0D14] rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base text-white tracking-wide">
                  NEXORA Secure Gateway
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold text-emerald-400">
                  <Lock className="w-2.5 h-2.5" />
                  256-Bit SSL Encrypted
                </span>
              </div>
              <span className="text-[10px] text-slate-400">Powered by Stripe & Razorpay Unified Checkout</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Currency Switcher */}
            <div className="flex items-center bg-[#13192B] rounded-lg p-0.5 border border-slate-700/60 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setCurrency('INR')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  currency === 'INR' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                ₹ INR
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  currency === 'USD' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                $ USD
              </button>
            </div>

            <button
              onClick={() => {
                setIsPaymentModalOpen(false);
                setIsSuccess(false);
              }}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PROCESSING OVERLAY */}
        {isProcessing && (
          <div className="p-12 sm:p-16 flex flex-col items-center justify-center text-center space-y-6">
            <div className="relative w-20 h-20">
              <div className="w-20 h-20 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="w-7 h-7 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div className="space-y-2 max-w-md">
              <h3 className="text-lg font-bold text-white">Processing Secure Payment</h3>
              <p className="text-xs text-slate-400 font-mono animate-pulse">{processingStep}</p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-300">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              Do not refresh or close this browser window
            </div>
          </div>
        )}

        {/* SUCCESS RECEIPT SCREEN */}
        {!isProcessing && isSuccess && (
          <div className="p-6 sm:p-10 space-y-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h2 className="text-2xl font-black text-white">Payment Successful!</h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                Your workspace has been upgraded to <strong className="text-white">NEXORA {selectedPlanForPayment.toUpperCase()}</strong>. All AI and project capabilities are unlocked.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="max-w-lg mx-auto rounded-2xl bg-[#090C14] border border-[#1E2538] p-5 space-y-3">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-white/[0.06]">
                <span className="text-slate-400">Transaction ID</span>
                <span className="font-mono font-bold text-cyan-300">{transactionId}</span>
              </div>
              <div className="flex items-center justify-between text-xs pb-3 border-b border-white/[0.06]">
                <span className="text-slate-400">Plan Activated</span>
                <span className="font-bold text-white capitalize">{selectedPlanForPayment} Tier ({billingCycle})</span>
              </div>
              <div className="flex items-center justify-between text-xs pb-3 border-b border-white/[0.06]">
                <span className="text-slate-400">Amount Paid</span>
                <span className="font-extrabold text-base text-emerald-400">
                  {currency === 'INR' ? '₹' : '$'}{totalDue.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Status</span>
                <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                  <Check className="w-3.5 h-3.5" /> Instant Verified
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadInvoice}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-bold text-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Tax Invoice (PDF)</span>
              </button>
              <button
                onClick={() => {
                  setIsPaymentModalOpen(false);
                  setIsSuccess(false);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Continue to Pro Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* MAIN CHECKOUT FORM */}
        {!isProcessing && !isSuccess && (
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
            
            {/* LEFT COLUMN: ORDER SUMMARY & PLAN INFO (5 Cols) */}
            <div className="lg:col-span-5 p-5 sm:p-6 bg-[#090D17]/80 border-b lg:border-b-0 lg:border-r border-[#1E2538] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Selected Plan</span>
                  <div className="inline-flex rounded-lg bg-[#111728] p-0.5 text-[10px] font-bold border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setBillingCycle('monthly')}
                      className={`px-2 py-0.5 rounded-md ${billingCycle === 'monthly' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => setBillingCycle('yearly')}
                      className={`px-2 py-0.5 rounded-md flex items-center gap-1 ${billingCycle === 'yearly' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
                    >
                      <span>Yearly</span>
                      <span className="text-[9px] text-amber-300 font-extrabold">-20%</span>
                    </button>
                  </div>
                </div>

                {/* Plan Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-b from-[#151B2E] to-[#0E1322] border border-blue-500/30 shadow-lg relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-extrabold text-white text-base capitalize">
                      {selectedPlanForPayment} Plan
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 text-[10px] font-extrabold uppercase">
                      Popular
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-2xl sm:text-3xl font-black text-white">
                      {currency === 'INR' ? '₹' : '$'}{rawSubtotal.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-slate-300">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>Unlimited Projects, Boards & Tasks</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>Autonomous AI Sprint Decomposition</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>Bring Your Own Gemini / OpenAI API Key</span>
                    </li>
                  </ul>
                </div>

                {/* Promo Code Input */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                    <Percent className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Have a promo code? (Try "RANJAN")</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="e.g. RANJAN"
                      className="flex-1 px-3 py-1.5 rounded-xl bg-[#101524] border border-[#1E2538] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-3 border-t border-[#1E2538] text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>{currency === 'INR' ? '₹' : '$'}{rawSubtotal.toLocaleString()}</span>
                </div>
                {isPromoApplied && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount (15% Off)</span>
                    <span>-{currency === 'INR' ? '₹' : '$'}{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>GST / Tax ({currency === 'INR' ? '18%' : '10%'})</span>
                  <span>+{currency === 'INR' ? '₹' : '$'}{taxAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-extrabold text-white pt-2 border-t border-white/[0.08]">
                  <span>Total Due</span>
                  <span className="text-cyan-300">
                    {currency === 'INR' ? '₹' : '$'}{totalDue.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: PAYMENT METHODS & FORM (7 Cols) */}
            <div className="lg:col-span-7 p-5 sm:p-6 flex flex-col justify-between space-y-5">
              <div>
                {/* Payment Method Selector Tabs */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-bold transition-all ${
                      paymentMethod === 'upi'
                        ? 'bg-blue-600/20 border-cyan-400 text-white shadow-sm shadow-cyan-500/20'
                        : 'bg-[#101524] border-[#1E2538] text-slate-400 hover:text-white'
                    }`}
                  >
                    <QrCode className="w-4 h-4 mb-1 text-cyan-400" />
                    <span>UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-bold transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-blue-600/20 border-cyan-400 text-white shadow-sm shadow-cyan-500/20'
                        : 'bg-[#101524] border-[#1E2538] text-slate-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mb-1 text-purple-400" />
                    <span>Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-bold transition-all ${
                      paymentMethod === 'netbanking'
                        ? 'bg-blue-600/20 border-cyan-400 text-white shadow-sm shadow-cyan-500/20'
                        : 'bg-[#101524] border-[#1E2538] text-slate-400 hover:text-white'
                    }`}
                  >
                    <Building2 className="w-4 h-4 mb-1 text-emerald-400" />
                    <span>Net Banking</span>
                  </button>
                </div>

                {/* METHOD 1: UPI & DYNAMIC QR */}
                {paymentMethod === 'upi' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-[#090C14] border border-[#1E2538] flex flex-col sm:flex-row items-center gap-4">
                      {/* Realistic Styled Vector QR Code */}
                      <div className="w-32 h-32 rounded-xl bg-white p-2 flex flex-col items-center justify-center relative shadow-lg flex-shrink-0">
                        <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                          {/* Corner markers */}
                          <rect x="5" y="5" width="28" height="28" rx="4" fill="none" stroke="#000" strokeWidth="6" />
                          <rect x="12" y="12" width="14" height="14" fill="#000" />
                          <rect x="67" y="5" width="28" height="28" rx="4" fill="none" stroke="#000" strokeWidth="6" />
                          <rect x="74" y="12" width="14" height="14" fill="#000" />
                          <rect x="5" y="67" width="28" height="28" rx="4" fill="none" stroke="#000" strokeWidth="6" />
                          <rect x="12" y="74" width="14" height="14" fill="#000" />
                          {/* Data points */}
                          <rect x="42" y="8" width="6" height="6" />
                          <rect x="52" y="14" width="6" height="6" />
                          <rect x="42" y="24" width="6" height="6" />
                          <rect x="10" y="44" width="6" height="6" />
                          <rect x="22" y="48" width="6" height="6" />
                          <rect x="42" y="42" width="16" height="16" rx="2" fill="#2563EB" />
                          <rect x="68" y="44" width="6" height="6" />
                          <rect x="80" y="48" width="6" height="6" />
                          <rect x="44" y="70" width="6" height="6" />
                          <rect x="54" y="76" width="6" height="6" />
                          <rect x="76" y="72" width="6" height="6" />
                          <rect x="86" y="82" width="6" height="6" />
                        </svg>
                        <span className="text-[8px] font-black tracking-widest text-slate-800 uppercase mt-0.5">
                          BHIM UPI
                        </span>
                      </div>

                      <div className="space-y-2 text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-amber-300 font-mono">
                          <Clock className="w-3.5 h-3.5 animate-spin" />
                          <span>QR valid for: <strong>{formatTimer(timeLeft)}</strong></span>
                        </div>
                        <h4 className="text-sm font-bold text-white">Scan with any UPI App</h4>
                        <p className="text-[11px] text-slate-400">
                          Google Pay, PhonePe, Paytm, CRED, BHIM, or any banking app.
                        </p>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                          {['GPay', 'PhonePe', 'Paytm', 'CRED'].map(app => (
                            <span key={app} className="px-2 py-0.5 rounded-md bg-[#13192B] border border-slate-800 text-[10px] text-slate-300 font-semibold">
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Or enter VPA / UPI ID */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-300">Or Pay via UPI Virtual Payment Address (VPA)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="username@okhdfcbank"
                          className="flex-1 px-3.5 py-2 rounded-xl bg-[#101524] border border-[#1E2538] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            showToast({
                              title: 'UPI Request Dispatched',
                              description: `Approve collect request of ${currency === 'INR' ? '₹' : '$'}${totalDue} in your UPI app.`,
                              type: 'info'
                            });
                          }}
                          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
                        >
                          Verify
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* METHOD 2: CREDIT / DEBIT CARD */}
                {paymentMethod === 'card' && (
                  <div className="space-y-3.5">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold text-slate-300">Card Number</label>
                        <span className="text-[10px] uppercase font-bold text-cyan-400 font-mono">
                          {cardBrand}
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          placeholder="4532 8901 2345 6789"
                          className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-[#101524] border border-[#1E2538] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                        />
                        <CreditCard className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 mb-1 block">Expiry Date</label>
                        <input
                          type="text"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full px-3.5 py-2 rounded-xl bg-[#101524] border border-[#1E2538] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 mb-1 block">CVC / CVV</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          className="w-full px-3.5 py-2 rounded-xl bg-[#101524] border border-[#1E2538] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-300 mb-1 block">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="Ranjan Kumar Yadav"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#101524] border border-[#1E2538] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                )}

                {/* METHOD 3: NET BANKING */}
                {paymentMethod === 'netbanking' && (
                  <div className="space-y-3.5">
                    <label className="text-[11px] font-bold text-slate-300 block">Select Popular Bank</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Bank', 'Punjab National Bank'].map(bank => (
                        <button
                          key={bank}
                          type="button"
                          onClick={() => setSelectedBank(bank)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                            selectedBank === bank
                              ? 'bg-blue-600/20 border-cyan-400 text-white font-bold'
                              : 'bg-[#101524] border-[#1E2538] text-slate-400 hover:text-white'
                          }`}
                        >
                          <Building2 className="w-3.5 h-3.5 mb-1 text-cyan-400" />
                          <div className="truncate">{bank}</div>
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-400 pt-1">
                      You will be securely redirected to <strong>{selectedBank}</strong>'s net banking portal to authenticate and complete transaction.
                    </p>
                  </div>
                )}
              </div>

              {/* Authorize & Pay CTA */}
              <div className="space-y-2 pt-4 border-t border-[#1E2538]">
                <button
                  type="button"
                  onClick={handlePayNow}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs sm:text-sm font-black shadow-xl shadow-purple-600/30 transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Pay {currency === 'INR' ? '₹' : '$'}{totalDue.toLocaleString()}</span>
                </button>
                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>RBI Compliant Tokenization • 100% Refund Guarantee Within 14 Days</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
