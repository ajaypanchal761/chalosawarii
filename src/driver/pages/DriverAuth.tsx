import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Lock, User, Phone, ArrowLeft, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import TopNavigation from "@/components/TopNavigation";
import busLogo from "@/assets/BusLogo.png";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import DriverTopNavigation from "../components/DriverTopNavigation";

const DriverAuth = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  // Form states
  const [loginForm, setLoginForm] = useState({
    phone: "",
    password: "",
    otp: ""
  });

  // Timer for resend OTP
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!loginForm.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (loginForm.phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits";
    }
    
    if (!loginForm.password.trim()) {
      newErrors.password = "Password is required";
    } else if (loginForm.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowOtpField(true);
      setOtpSent(true);
      setResendTimer(30); // 30 seconds cooldown
      
      toast({
        title: "OTP Sent!",
        description: `Verification code sent to ${countryCode} ${loginForm.phone}`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!showOtpField) {
      handleSendOtp();
      return;
    }
    
    if (!loginForm.otp.trim()) {
      setErrors({ otp: "Please enter the OTP" });
      return;
    }
    
    if (loginForm.otp.length !== 6) {
      setErrors({ otp: "OTP must be 6 digits" });
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept any 6-digit OTP
      localStorage.setItem('isDriverLoggedIn', 'true');
      localStorage.setItem('driverPhone', countryCode + loginForm.phone);
      
      toast({
        title: "Login Successful!",
        description: "Welcome back to your driver dashboard.",
        variant: "default",
      });
      
      navigate('/driver');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setShowOtpField(false);
    setOtpSent(false);
    setLoginForm({ ...loginForm, otp: "" });
    setErrors({});
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResendTimer(30);
      toast({
        title: "OTP Resent!",
        description: "New verification code sent to your phone.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <DriverTopNavigation />
      
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
                    <span className="text-xs text-gray-600"> Owner Driver Module</span>
                  </div>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">Owner Driver Login</CardTitle>
              <CardDescription>Access your Dashboard</CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              {!showOtpField ? (
                // Phone Number and Password Input Screen
                <div className="space-y-6">
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
                          <SelectItem value="+1">+92</SelectItem>
                          <SelectItem value="+44">+44</SelectItem>
                          <SelectItem value="+61">+61</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        id="mobileNumber"
                        type="tel"
                        placeholder="Mobile number"
                        className={`flex-1 ${errors.phone ? 'border-red-500' : ''}`}
                        value={loginForm.phone}
                        onChange={(e) => {
                          setLoginForm({...loginForm, phone: e.target.value});
                          if (errors.phone) setErrors({...errors, phone: ''});
                        }}
                      />
                    </div>
                    {errors.phone && (
                      <Alert variant="destructive" className="py-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.phone}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                        value={loginForm.password}
                        onChange={(e) => {
                          setLoginForm({...loginForm, password: e.target.value});
                          if (errors.password) setErrors({...errors, password: ''});
                        }}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {errors.password && (
                      <Alert variant="destructive" className="py-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.password}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  {/* Generate OTP Button */}
                  <Button 
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 h-12 rounded-lg"
                    onClick={handleSendOtp}
                    disabled={isLoading || !loginForm.phone.trim() || !loginForm.password.trim()}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending OTP...
                      </>
                    ) : (
                      'Generate OTP'
                    )}
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
                        className={`pl-10 ${errors.otp ? 'border-red-500' : ''}`}
                        value={loginForm.otp}
                        onChange={(e) => {
                          setLoginForm({...loginForm, otp: e.target.value});
                          if (errors.otp) setErrors({...errors, otp: ''});
                        }}
                        maxLength={6}
                      />
                    </div>
                    {errors.otp && (
                      <Alert variant="destructive" className="py-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.otp}</AlertDescription>
                      </Alert>
                    )}
                    <div className="text-center">
                      <Button 
                        variant="link" 
                        className="text-sm p-0 h-auto"
                        onClick={handleResendOtp}
                        disabled={resendTimer > 0 || isLoading}
                      >
                        {resendTimer > 0 
                          ? `Resend in ${resendTimer}s` 
                          : "Didn't receive code? Resend"
                        }
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-blue-600 text-white hover:bg-blue-700"
                    onClick={handleLogin}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify & Sign In'
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DriverAuth; 