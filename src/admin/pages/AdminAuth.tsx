import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Shield, Loader2, Mail, Lock, ArrowRight } from "lucide-react";
import busLogo from "@/assets/BusLogo.png";
import { toast } from "@/hooks/use-toast";

const AdminAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Check if admin is already logged in
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (isAdminLoggedIn) {
      navigate('/admin');
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // For demo purposes, accept admin@chalosawari.com / admin123
      if (formData.email === "admin@chalosawari.com" && formData.password === "admin123") {
        localStorage.setItem('isAdminLoggedIn', 'true');
        localStorage.setItem('adminEmail', formData.email);
        
        toast({
          title: "Login Successful!",
          description: "Welcome to the Admin Panel",
          variant: "default",
        });

        navigate('/admin');
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
              <img src={busLogo} alt="Bus Logo" className="relative w-20 h-20 drop-shadow-lg" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            <span className="text-gray-800">CHALO</span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SAWARI</span>
          </h1>
          <p className="text-gray-600 font-medium">Admin Portal</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm rounded-2xl">
          <CardHeader className="text-center pb-6 pt-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </CardTitle>
            <p className="text-gray-600 text-sm">
              Sign in to access the admin dashboard
            </p>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@chalosawari.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`h-14 pl-12 pr-4 text-base border-2 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                      errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-gray-200"
                    }`}
                    disabled={isLoading}
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                {errors.email && (
                  <Alert variant="destructive" className="py-3 border-red-200 bg-red-50">
                    <AlertDescription className="text-sm font-medium">
                      {errors.email}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`h-14 pl-12 pr-12 text-base border-2 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                      errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-gray-200"
                    }`}
                    disabled={isLoading}
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <Alert variant="destructive" className="py-3 border-red-200 bg-red-50">
                    <AlertDescription className="text-sm font-medium">
                      {errors.password}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Demo Credentials Alert */}
              <Alert className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 rounded-xl">
                <AlertDescription className="text-sm text-blue-800 font-medium">
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-blue-100 rounded-full mt-0.5">
                      <Shield className="w-3 h-3 text-blue-600" />
                    </div>
                    <div>
                      <strong>Demo Credentials:</strong><br />
                      Email: admin@chalosawari.com<br />
                      Password: admin123
                    </div>
                  </div>
                </AlertDescription>
              </Alert>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In to Admin Panel
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Additional Info */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Having trouble? Contact{" "}
                <a href="mailto:support@chalosawari.com" className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200">
                  support@chalosawari.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 font-medium">
            © 2024 Chalo Sawari. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth; 