import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Shield, 
  Lock, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Users,
  CreditCard as CreditCardIcon,
  Smartphone,
  Wallet,
  Check,
  Star,
  Zap,
  Wifi,
  Tv,
  Power,
  Coffee
} from 'lucide-react';
import TopNavigation from '@/components/TopNavigation';
import busLogo from '@/assets/BusLogo.png';

interface BookingDetails {
  vehicleType: 'bus' | 'car' | 'traveller';
  operatorName: string;
  vehicleName: string;
  from: string;
  to: string;
  date: string;
  time: string;
  passengers: number;
  fare: number;
  seats: string[];
  amenities: string[];
}

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'upi' | 'wallet'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Get booking details from route state or use default
  const [bookingDetails] = useState<BookingDetails>(
    location.state?.bookingDetails || {
      vehicleType: 'bus',
      operatorName: 'Redbus Travels',
      vehicleName: 'Mercedes Multi-Axle',
      from: 'Bangalore',
      to: 'Chennai',
      date: '2024-01-15',
      time: '22:00',
      passengers: 2,
      fare: 1700,
      seats: ['A1', 'A2'],
      amenities: ['wifi', 'tv', 'power', 'blanket']
    }
  );

  // Payment form states
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: ''
  });

  const [upiDetails, setUpiDetails] = useState({
    upiId: ''
  });

  const [walletDetails, setWalletDetails] = useState({
    walletType: 'paytm'
  });

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const loginStatus = localStorage.getItem('isLoggedIn');
      if (loginStatus === 'true') {
        setIsLoggedIn(true);
      } else {
        // Redirect to auth page with return URL
        navigate('/auth', { 
          state: { 
            returnUrl: '/payment',
            bookingDetails: bookingDetails 
          } 
        });
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate, bookingDetails]);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setShowSuccess(true);
    
    // Redirect to success page after 3 seconds
    setTimeout(() => {
      navigate('/bookings');
    }, 3000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'tv': return <Tv className="w-4 h-4" />;
      case 'power': return <Power className="w-4 h-4" />;
      case 'blanket': return <Coffee className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-ping"></div>
          </div>
          <p className="text-gray-600 font-medium">Loading payment gateway...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null; // Will redirect to auth
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100">
        <TopNavigation />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <Card className="text-center p-8 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-gray-800 mb-3">Payment Successful!</CardTitle>
              <CardDescription className="text-lg mb-6 text-gray-600">
                Your booking has been confirmed. You will receive a confirmation SMS and email shortly.
              </CardDescription>
              <div className="space-y-3">
                <Button onClick={() => navigate('/bookings')} className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg">
                  View My Bookings
                </Button>
                <Button variant="outline" onClick={() => navigate('/')} className="w-full h-12">
                  Back to Home
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <TopNavigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 hover:bg-white/50 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <img src={busLogo} alt="Logo" className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Secure Payment
                  </h1>
                  <p className="text-gray-600 text-sm">Complete your booking securely</p>
                </div>
              </div>
            </div>
            
            {/* Security Badge */}
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">256-bit SSL Secured</span>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Enhanced Payment Form */}
            <div className="xl:col-span-2 space-y-6">
              {/* Payment Method Selection */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    Payment Method
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Choose your preferred payment method for a seamless experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Enhanced Payment Method Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                      className={`relative p-6 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                        selectedPaymentMethod === 'card'
                          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-md bg-white'
                      }`}
                      onClick={() => setSelectedPaymentMethod('card')}
                    >
                      {selectedPaymentMethod === 'card' && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedPaymentMethod === 'card' ? 'bg-blue-500' : 'bg-gray-100'
                        }`}>
                          <CreditCardIcon className={`w-5 h-5 ${selectedPaymentMethod === 'card' ? 'text-white' : 'text-gray-600'}`} />
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800">Credit/Debit Card</span>
                          <p className="text-sm text-gray-600">Visa, Mastercard, RuPay</p>
                        </div>
                      </div>
                    </div>
                    
                    <div
                      className={`relative p-6 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                        selectedPaymentMethod === 'upi'
                          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-md bg-white'
                      }`}
                      onClick={() => setSelectedPaymentMethod('upi')}
                    >
                      {selectedPaymentMethod === 'upi' && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedPaymentMethod === 'upi' ? 'bg-blue-500' : 'bg-gray-100'
                        }`}>
                          <Smartphone className={`w-5 h-5 ${selectedPaymentMethod === 'upi' ? 'text-white' : 'text-gray-600'}`} />
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800">UPI Payment</span>
                          <p className="text-sm text-gray-600">Instant transfer</p>
                        </div>
                      </div>
                    </div>
                    
                    <div
                      className={`relative p-6 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                        selectedPaymentMethod === 'wallet'
                          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-md bg-white'
                      }`}
                      onClick={() => setSelectedPaymentMethod('wallet')}
                    >
                      {selectedPaymentMethod === 'wallet' && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedPaymentMethod === 'wallet' ? 'bg-blue-500' : 'bg-gray-100'
                        }`}>
                          <Wallet className={`w-5 h-5 ${selectedPaymentMethod === 'wallet' ? 'text-white' : 'text-gray-600'}`} />
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800">Digital Wallet</span>
                          <p className="text-sm text-gray-600">Paytm, PhonePe, GPay</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Payment Form Based on Selection */}
                  {selectedPaymentMethod === 'card' && (
                    <div className="space-y-6 p-6 bg-gray-50 rounded-xl">
                      <div>
                        <Label htmlFor="cardNumber" className="text-sm font-medium text-gray-700 mb-2 block">
                          Card Number
                        </Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.cardNumber}
                          onChange={(e) => setCardDetails({
                            ...cardDetails,
                            cardNumber: formatCardNumber(e.target.value)
                          })}
                          maxLength={19}
                          className="h-12 text-lg font-mono"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardHolder" className="text-sm font-medium text-gray-700 mb-2 block">
                            Card Holder Name
                          </Label>
                          <Input
                            id="cardHolder"
                            placeholder="John Doe"
                            value={cardDetails.cardHolder}
                            onChange={(e) => setCardDetails({
                              ...cardDetails,
                              cardHolder: e.target.value
                            })}
                            className="h-12"
                          />
                        </div>
                        <div>
                          <Label htmlFor="expiry" className="text-sm font-medium text-gray-700 mb-2 block">
                            Expiry Date
                          </Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({
                              ...cardDetails,
                              expiry: formatExpiry(e.target.value)
                            })}
                            maxLength={5}
                            className="h-12 font-mono"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="cvv" className="text-sm font-medium text-gray-700 mb-2 block">
                          CVV
                        </Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({
                            ...cardDetails,
                            cvv: e.target.value.replace(/\D/g, '').slice(0, 3)
                          })}
                          maxLength={3}
                          className="h-12 font-mono w-32"
                        />
                      </div>
                    </div>
                  )}

                  {selectedPaymentMethod === 'upi' && (
                    <div className="p-6 bg-gray-50 rounded-xl">
                      <Label htmlFor="upiId" className="text-sm font-medium text-gray-700 mb-2 block">
                        UPI ID
                      </Label>
                      <Input
                        id="upiId"
                        placeholder="username@upi"
                        value={upiDetails.upiId}
                        onChange={(e) => setUpiDetails({
                          ...upiDetails,
                          upiId: e.target.value
                        })}
                        className="h-12 text-lg"
                      />
                    </div>
                  )}

                  {selectedPaymentMethod === 'wallet' && (
                    <div className="p-6 bg-gray-50 rounded-xl">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Select Wallet
                      </Label>
                                             <div className="grid grid-cols-2 gap-3">
                         <div
                           className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                             walletDetails.walletType === 'paytm'
                               ? 'border-blue-500 bg-blue-50'
                               : 'border-gray-200 hover:border-gray-300'
                           }`}
                           onClick={() => setWalletDetails({ ...walletDetails, walletType: 'paytm' })}
                         >
                           <div className="flex flex-col sm:flex-row items-center gap-3">
                             <div className="w-12 h-12 sm:w-10 sm:h-10 bg-yellow-500 rounded-lg flex items-center justify-center overflow-hidden">
                               <img 
                                 src="/paytm.png" 
                                 alt="Paytm" 
                                 className="w-10 h-10 sm:w-8 sm:h-8 object-contain"
                                 onError={(e) => {
                                   e.currentTarget.style.display = 'none';
                                   e.currentTarget.nextSibling.style.display = 'flex';
                                 }}
                               />
                               <span className="text-white font-bold text-sm hidden">P</span>
                             </div>
                             <div className="text-center sm:text-left">
                               <span className="font-semibold text-gray-800 text-sm sm:text-base">Paytm</span>
                               <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Digital Wallet</p>
                             </div>
                           </div>
                         </div>
                         
                         <div
                           className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                             walletDetails.walletType === 'phonepe'
                               ? 'border-purple-500 bg-purple-50'
                               : 'border-gray-200 hover:border-gray-300'
                           }`}
                           onClick={() => setWalletDetails({ ...walletDetails, walletType: 'phonepe' })}
                         >
                           <div className="flex flex-col sm:flex-row items-center gap-3">
                             <div className="w-12 h-12 sm:w-10 sm:h-10 bg-purple-600 rounded-lg flex items-center justify-center overflow-hidden">
                               <img 
                                 src="/phonepe.png" 
                                 alt="PhonePe" 
                                 className="w-10 h-10 sm:w-8 sm:h-8 object-contain"
                                 onError={(e) => {
                                   e.currentTarget.style.display = 'none';
                                   e.currentTarget.nextSibling.style.display = 'flex';
                                 }}
                               />
                               <span className="text-white font-bold text-sm hidden">P</span>
                             </div>
                             <div className="text-center sm:text-left">
                               <span className="font-semibold text-gray-800 text-sm sm:text-base">PhonePe</span>
                               <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">UPI Payment</p>
                             </div>
                           </div>
                         </div>
                         
                         <div
                           className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                             walletDetails.walletType === 'googlepay'
                               ? 'border-blue-500 bg-blue-50'
                               : 'border-gray-200 hover:border-gray-300'
                           }`}
                           onClick={() => setWalletDetails({ ...walletDetails, walletType: 'googlepay' })}
                         >
                           <div className="flex flex-col sm:flex-row items-center gap-3">
                             <div className="w-12 h-12 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center overflow-hidden">
                               <img 
                                 src="/googlepay.png" 
                                 alt="Google Pay" 
                                 className="w-10 h-10 sm:w-8 sm:h-8 object-contain"
                                 onError={(e) => {
                                   e.currentTarget.style.display = 'none';
                                   e.currentTarget.nextSibling.style.display = 'flex';
                                 }}
                               />
                               <span className="text-white font-bold text-sm hidden">G</span>
                             </div>
                             <div className="text-center sm:text-left">
                               <span className="font-semibold text-gray-800 text-sm sm:text-base">Google Pay</span>
                               <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Digital Payment</p>
                             </div>
                           </div>
                         </div>
                         
                         <div
                           className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                             walletDetails.walletType === 'amazonpay'
                               ? 'border-orange-500 bg-orange-50'
                               : 'border-gray-200 hover:border-gray-300'
                           }`}
                           onClick={() => setWalletDetails({ ...walletDetails, walletType: 'amazonpay' })}
                         >
                           <div className="flex flex-col sm:flex-row items-center gap-3">
                             <div className="w-12 h-12 sm:w-10 sm:h-10 bg-orange-500 rounded-lg flex items-center justify-center overflow-hidden">
                               <img 
                                 src="/amazonpay.png" 
                                 alt="Amazon Pay" 
                                 className="w-10 h-10 sm:w-8 sm:h-8 object-contain"
                                 onError={(e) => {
                                   e.currentTarget.style.display = 'none';
                                   e.currentTarget.nextSibling.style.display = 'flex';
                                 }}
                               />
                               <span className="text-white font-bold text-sm hidden">A</span>
                             </div>
                             <div className="text-center sm:text-left">
                               <span className="font-semibold text-gray-800 text-sm sm:text-base">Amazon Pay</span>
                               <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">E-commerce Wallet</p>
                             </div>
                           </div>
                         </div>
                       </div>
                    </div>
                  )}

                  {/* Enhanced Terms and Conditions */}
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <Checkbox id="terms" className="mt-1" />
                    <Label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
                      I agree to the <Button variant="link" className="p-0 h-auto text-blue-600 font-medium">Terms & Conditions</Button> and{' '}
                      <Button variant="link" className="p-0 h-auto text-blue-600 font-medium">Privacy Policy</Button>
                    </Label>
                  </div>

                  {/* Enhanced Pay Button */}
                  <Button
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        Processing Payment...
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5" />
                        Pay ₹{bookingDetails.fare.toLocaleString()}
                      </div>
                    )}
                  </Button>

                  {/* Enhanced Security Notice */}
                  <div className="flex items-center gap-3 text-sm text-gray-600 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-green-800">Secure Payment Gateway</p>
                      <p className="text-green-700">Your payment is protected with bank-level security</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Booking Summary */}
            <div className="xl:col-span-1">
              <Card className="sticky top-6 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    Booking Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Journey Details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{bookingDetails.from} → {bookingDetails.to}</p>
                        <p className="text-sm text-gray-600">Direct Route</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{new Date(bookingDetails.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{bookingDetails.time}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{bookingDetails.passengers} Passenger(s)</span>
                    </div>
                  </div>

                  <Separator className="bg-gray-200" />

                  {/* Enhanced Vehicle Details */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-blue-500" />
                      Vehicle Details
                    </h4>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium text-gray-800">{bookingDetails.operatorName}</p>
                      <p className="text-sm text-gray-600">{bookingDetails.vehicleName}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {bookingDetails.amenities.map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs flex items-center gap-1 bg-blue-100 text-blue-700">
                          {getAmenityIcon(amenity)}
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-gray-200" />

                  {/* Enhanced Seats */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800">Selected Seats</h4>
                    <div className="flex flex-wrap gap-2">
                      {bookingDetails.seats.map((seat, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                          Seat {seat}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-gray-200" />

                  {/* Enhanced Price Breakdown */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800">Price Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Base Fare</span>
                        <span className="font-medium">₹{(bookingDetails.fare / bookingDetails.passengers).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Passengers</span>
                        <span className="font-medium">× {bookingDetails.passengers}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Convenience Fee</span>
                        <span className="font-medium text-green-600">₹0</span>
                      </div>
                      <Separator className="bg-gray-200" />
                      <div className="flex justify-between font-bold text-xl text-gray-800">
                        <span>Total Amount</span>
                        <span className="text-blue-600">₹{bookingDetails.fare.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Savings Badge */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">No convenience fee charged!</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment; 