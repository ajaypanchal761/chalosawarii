import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Mail, Lock, User, Phone, Facebook, Twitter, Instagram, Home, List, HelpCircle, ArrowLeft, X, ChevronDown } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TopNavigation from "@/components/TopNavigation";
import busLogo from "@/assets/BusLogo.png";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [showOtpField, setShowOtpField] = useState(false);
  const [showSignupOtpField, setShowSignupOtpField] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  
  // Get return URL from location state
  const returnUrl = location.state?.returnUrl || '/profile';
  const bookingDetails = location.state?.bookingDetails;

  // Form states
  const [loginForm, setLoginForm] = useState({
    phone: "",
    otp: ""
  });

  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    otp: ""
  });

  const handleSendOtp = () => {
    if (loginForm.phone.trim()) {
      setShowOtpField(true);
      // Here you would typically make an API call to send OTP
      console.log("Sending OTP to:", countryCode + loginForm.phone);
    }
  };

  const handleSendSignupOtp = () => {
    if (signupForm.phone.trim() && signupForm.firstName.trim() && signupForm.lastName.trim()) {
      setShowSignupOtpField(true);
      // Here you would typically make an API call to send OTP
      console.log("Sending signup OTP to:", countryCode + signupForm.phone);
    }
  };

  const handleLogin = () => {
    if (showOtpField && loginForm.otp.trim()) {
      // For demo purposes, we'll just navigate to profile
      // In a real app, you'd validate OTP here
      localStorage.setItem('isLoggedIn', 'true');
      
      // Navigate to return URL if coming from payment page
      if (returnUrl === '/payment' && bookingDetails) {
        navigate('/payment', { state: { bookingDetails } });
      } else {
        navigate(returnUrl);
      }
    } else if (!showOtpField) {
      handleSendOtp();
    }
  };

  const handleBackToPhone = () => {
    setShowOtpField(false);
    setLoginForm({ ...loginForm, otp: "" });
  };

  const handleBackToSignupPhone = () => {
    setShowSignupOtpField(false);
    setSignupForm({ ...signupForm, otp: "" });
  };

  const handleSignup = () => {
    if (showSignupOtpField && signupForm.otp.trim()) {
      // For demo purposes, we'll just navigate to profile
      // In a real app, you'd validate OTP and create account here
      localStorage.setItem('isLoggedIn', 'true');
      
      // Navigate to return URL if coming from payment page
      if (returnUrl === '/payment' && bookingDetails) {
        navigate('/payment', { state: { bookingDetails } });
      } else {
        navigate(returnUrl);
      }
    } else if (!showSignupOtpField) {
      handleSendSignupOtp();
    }
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign in
    console.log("Google sign in clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <TopNavigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <Card className="w-full max-w-md shadow-lg border border-gray-200">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="flex items-center space-x-2">
                  <img src={busLogo} alt="Bus Logo" className="w-12 h-12 object-contain" />
                  <div className="flex flex-col">
                    <div className="flex items-baseline">
                      <span className="text-xl font-bold text-black">CHALO</span>
                      <span className="text-xl font-bold text-blue-600 ml-1">SAWARI</span>
                    </div>
                    <span className="text-xs text-gray-600">Travel with Confidence</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                {/* Login Tab */}
                <TabsContent value="login" className="space-y-4">
                  {!showOtpField ? (
                    // Phone Number Input Screen
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Login to get exciting offers</span>
                      </div>

                      {/* Main Question */}
                      <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800">What's your mobile number?</h2>
                      </div>

                      {/* Mobile Number Input */}
                      <div className="space-y-2">
                        <Label htmlFor="mobileNumber" className="text-sm font-medium">Mobile Number</Label>
                        <div className="flex space-x-2">
                          <Select value={countryCode} onValueChange={setCountryCode}>
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="+91">+91</SelectItem>
                              <SelectItem value="+1">+1</SelectItem>
                              <SelectItem value="+44">+44</SelectItem>
                              <SelectItem value="+61">+61</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            id="mobileNumber"
                            type="tel"
                            placeholder="Mobile number"
                            className="flex-1"
                            value={loginForm.phone}
                            onChange={(e) => setLoginForm({...loginForm, phone: e.target.value})}
                          />
                        </div>
                      </div>

                      {/* Generate OTP Button */}
                      <Button 
                        className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300 h-12 rounded-lg"
                        onClick={handleSendOtp}
                        disabled={!loginForm.phone.trim()}
                      >
                        Generate OTP
                      </Button>

                      {/* Separator */}
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-white px-2 text-gray-500">or</span>
                        </div>
                      </div>

                      {/* Google Sign In */}
                      <Button 
                        variant="outline" 
                        className="w-full h-12 rounded-lg border-gray-300"
                        onClick={handleGoogleSignIn}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">G</div>
                          <span>Sign in with Google</span>
                        </div>
                      </Button>

                      {/* Footer */}
                      <div className="text-center text-xs text-gray-600 space-y-1">
                        <div>By logging in, I agree</div>
                        <div className="space-x-2">
                          <Button variant="link" className="text-xs p-0 h-auto text-blue-600">Terms & Conditions</Button>
                          <Button variant="link" className="text-xs p-0 h-auto text-blue-600">Privacy Policy</Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // OTP Input Screen
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 mb-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleBackToPhone}
                            className="p-1 h-auto"
                          >
                            <ArrowLeft className="w-4 h-4" />
                          </Button>
                          <Label htmlFor="otp" className="text-base">Enter OTP</Label>
                        </div>
                        <div className="text-sm text-muted-foreground mb-4">
                          We've sent a verification code to {countryCode} {loginForm.phone}
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="otp"
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            className="pl-10"
                            value={loginForm.otp}
                            onChange={(e) => setLoginForm({...loginForm, otp: e.target.value})}
                            maxLength={6}
                          />
                        </div>
                        <div className="text-center">
                          <Button variant="link" className="text-sm p-0 h-auto">
                            Didn't receive code? Resend
                          </Button>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full bg-blue-600 text-white hover:bg-blue-700"
                        onClick={handleLogin}
                      >
                        Verify & Sign In
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                {/* Sign Up Tab */}
                <TabsContent value="signup" className="space-y-4">
                  {!showSignupOtpField ? (
                    // Signup Form Screen
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Create account to get started</span>
                      </div>

                      {/* Main Question */}
                      <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800">Create your account</h2>
                      </div>

                      {/* Name Fields */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              id="firstName"
                              placeholder="First name"
                              className="pl-10"
                              value={signupForm.firstName}
                              onChange={(e) => setSignupForm({...signupForm, firstName: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              id="lastName"
                              placeholder="Last name"
                              className="pl-10"
                              value={signupForm.lastName}
                              onChange={(e) => setSignupForm({...signupForm, lastName: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Mobile Number Input */}
                      <div className="space-y-2">
                        <Label htmlFor="signupMobileNumber" className="text-sm font-medium">Mobile Number</Label>
                        <div className="flex space-x-2">
                          <Select value={countryCode} onValueChange={setCountryCode}>
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="+91">+91</SelectItem>
                              <SelectItem value="+1">+1</SelectItem>
                              <SelectItem value="+44">+44</SelectItem>
                              <SelectItem value="+61">+61</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            id="signupMobileNumber"
                            type="tel"
                            placeholder="Mobile number"
                            className="flex-1"
                            value={signupForm.phone}
                            onChange={(e) => setSignupForm({...signupForm, phone: e.target.value})}
                          />
                        </div>
                      </div>

                      {/* Generate OTP Button */}
                      <Button 
                        className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300 h-12 rounded-lg"
                        onClick={handleSendSignupOtp}
                        disabled={!signupForm.phone.trim() || !signupForm.firstName.trim() || !signupForm.lastName.trim()}
                      >
                        Generate OTP
                      </Button>

                      {/* Separator */}
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-white px-2 text-gray-500">or</span>
                        </div>
                      </div>

                      {/* Google Sign In */}
                      <Button 
                        variant="outline" 
                        className="w-full h-12 rounded-lg border-gray-300"
                        onClick={handleGoogleSignIn}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">G</div>
                          <span>Sign up with Google</span>
                        </div>
                      </Button>

                      {/* Footer */}
                      <div className="text-center text-xs text-gray-600 space-y-1">
                        <div>By creating an account, I agree</div>
                        <div className="space-x-2">
                          <Button variant="link" className="text-xs p-0 h-auto text-blue-600">Terms & Conditions</Button>
                          <Button variant="link" className="text-xs p-0 h-auto text-blue-600">Privacy Policy</Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Signup OTP Input Screen
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 mb-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleBackToSignupPhone}
                            className="p-1 h-auto"
                          >
                            <ArrowLeft className="w-4 h-4" />
                          </Button>
                          <Label htmlFor="signupOtp" className="text-base">Enter OTP</Label>
                        </div>
                        <div className="text-sm text-muted-foreground mb-4">
                          We've sent a verification code to {countryCode} {signupForm.phone}
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="signupOtp"
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            className="pl-10"
                            value={signupForm.otp}
                            onChange={(e) => setSignupForm({...signupForm, otp: e.target.value})}
                            maxLength={6}
                          />
                        </div>
                        <div className="text-center">
                          <Button variant="link" className="text-sm p-0 h-auto">
                            Didn't receive code? Resend
                          </Button>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full bg-blue-600 text-white hover:bg-blue-700"
                        onClick={handleSignup}
                      >
                        Verify & Create Account
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 text-center text-sm text-muted-foreground">
                {activeTab === "login" ? (
                  <>
                    Don't have an account?{" "}
                                         <Button 
                       variant="link" 
                       className="p-0 h-auto text-blue-600"
                       onClick={() => setActiveTab("signup")}
                     >
                       Sign up
                     </Button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                                         <Button 
                       variant="link" 
                       className="p-0 h-auto text-blue-600"
                       onClick={() => setActiveTab("login")}
                     >
                       Sign in
                     </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background z-50">
        <div className="flex justify-around py-2">
          <Link to="/" className="flex flex-col items-center space-y-1">
            <Home className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Home</span>
          </Link>
          <Link to="/bookings" className="flex flex-col items-center space-y-1">
            <List className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Bookings</span>
          </Link>
          <Link to="/help" className="flex flex-col items-center space-y-1">
            <HelpCircle className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Help</span>
          </Link>
          <Link to="/auth" className="flex flex-col items-center space-y-1">
            <User className="w-5 h-5 text-primary" />
            <span className="text-xs text-primary font-medium">Account</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth; 