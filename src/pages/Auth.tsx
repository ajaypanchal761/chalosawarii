import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock, User, Phone, Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import TopNavigation from "@/components/TopNavigation";
import busLogo from "@/assets/BusLogo.png";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <TopNavigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <Card className="w-full max-w-md shadow-lg border border-gray-200">
            <CardHeader className="text-center">
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
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to your account or create a new one
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                {/* Login Tab */}
                <TabsContent value="login" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
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
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember" className="text-sm">Remember me</Label>
                      </div>
                      <Button variant="link" className="text-sm p-0 h-auto">
                        Forgot password?
                      </Button>
                    </div>
                    
                                         <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                       Sign In
                     </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="text-center text-sm text-muted-foreground">
                      Or continue with
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <Button variant="outline" className="w-full">
                        <Facebook className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Twitter className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Instagram className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Sign Up Tab */}
                <TabsContent value="signup" className="space-y-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="firstName"
                            placeholder="First name"
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="lastName"
                            placeholder="Last name"
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signupEmail">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="signupEmail"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signupPassword">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="signupPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          className="pl-10 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
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
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          className="pl-10 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <Button variant="link" className="text-sm p-0 h-auto">
                          Terms of Service
                        </Button>{" "}
                        and{" "}
                        <Button variant="link" className="text-sm p-0 h-auto">
                          Privacy Policy
                        </Button>
                      </Label>
                    </div>
                    
                                         <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                       Create Account
                     </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="text-center text-sm text-muted-foreground">
                      Or sign up with
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <Button variant="outline" className="w-full">
                        <Facebook className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Twitter className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Instagram className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
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
    </div>
  );
};

export default Auth; 