import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DriverTopNavigation from "@/driver/components/DriverTopNavigation";
import { Home, MessageSquare, Car, User, LogOut, Settings, CreditCard, Star, Calendar, MapPin, Phone, Mail, Edit, Camera, Bell, Shield, HelpCircle, Download, Share2, Eye, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const DriverProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showEarningsDialog, setShowEarningsDialog] = useState(false);
  const [driverData, setDriverData] = useState({
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@email.com",
    location: "New Delhi, India",
    joinDate: "2022",
    rating: 4.8,
    totalReviews: 156,
    totalRides: 156,
    todayEarnings: 2450,
    weekEarnings: 8200,
    monthEarnings: 32500,
    acceptanceRate: 98,
    hoursOnline: 12
  });

  useEffect(() => {
    const driverLoggedIn = localStorage.getItem('isDriverLoggedIn');
    if (!driverLoggedIn) {
      navigate('/driver-auth');
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    switch (tab) {
      case "home":
        navigate('/driver');
        break;
      case "requests":
        navigate('/driver/requests');
        break;
      case "myvehicle":
        navigate('/driver/myvehicle');
        break;
      default:
        navigate('/driver/profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isDriverLoggedIn');
    navigate('/driver-auth');
  };

  const handleUpdateProfile = (updates: Partial<typeof driverData>) => {
    setDriverData(prev => ({ ...prev, ...updates }));
    setShowEditDialog(false);
    toast({
      title: "Profile Updated!",
      description: "Your profile information has been successfully updated.",
      variant: "default",
    });
  };

  const handleToggleNotifications = (enabled: boolean) => {
    setNotifications(enabled);
    toast({
      title: enabled ? "Notifications Enabled" : "Notifications Disabled",
      description: enabled ? "You will now receive ride requests and updates." : "You will no longer receive notifications.",
      variant: "default",
    });
  };

  const handleToggleLocationSharing = (enabled: boolean) => {
    setLocationSharing(enabled);
    toast({
      title: enabled ? "Location Sharing Enabled" : "Location Sharing Disabled",
      description: enabled ? "Your location will be shared with customers." : "Your location will no longer be shared.",
      variant: "default",
    });
  };

  const handleDownloadEarnings = () => {
    // Simulate downloading earnings report
    toast({
      title: "Download Started!",
      description: "Your earnings report is being downloaded.",
      variant: "default",
    });
  };

  const handleShareProfile = () => {
    // Simulate sharing profile
    if (navigator.share) {
      navigator.share({
        title: `${driverData.name} - Professional Driver`,
        text: `Check out ${driverData.name}'s driver profile with ${driverData.rating}⭐ rating and ${driverData.totalRides} rides!`,
        url: window.location.href
      });
    } else {
      toast({
        title: "Profile Link Copied!",
        description: "Profile link has been copied to clipboard.",
        variant: "default",
      });
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DriverTopNavigation />
      
      {/* Driver Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 md:py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold">Driver Module</h1>
                <p className="text-blue-100 text-sm md:text-base">Profile & Settings</p>
              </div>
            </div>
            <div className="flex space-x-2">
             
              <AlertDialog>
                <AlertDialogTrigger asChild>
                
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to logout? You will need to login again to access the driver portal.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4 md:py-6 pb-20">
        {/* Profile Header */}
        <Card className="mb-4 md:mb-6">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative">
                <Avatar className="w-16 h-16 md:w-20 md:h-20">
                  <AvatarImage src="/src/assets/BusLogo.png" alt="Driver" />
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
                <Button size="sm" className="absolute -bottom-1 -right-1 rounded-full w-6 h-6 md:w-8 md:h-8 p-0">
                  <Camera className="w-3 h-3 md:w-4 md:h-4" />
                </Button>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">{driverData.name}</h2>
                <p className="text-gray-600 text-sm md:text-base">Professional Driver</p>
                <div className="flex flex-col sm:flex-row items-center sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{driverData.rating}</span>
                    <span className="text-sm text-gray-500">({driverData.totalReviews} reviews)</span>
                  </div>
                  <Badge className="bg-green-600">Verified</Badge>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full md:w-auto"
                onClick={() => setShowEditDialog(true)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-4 md:mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
              <User className="w-5 h-5 text-blue-600" />
              <span>Contact Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm md:text-base">{driverData.phone}</p>
                  <p className="text-xs md:text-sm text-gray-500">Mobile Number</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm md:text-base truncate">{driverData.email}</p>
                  <p className="text-xs md:text-sm text-gray-500">Email Address</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm md:text-base">{driverData.location}</p>
                  <p className="text-xs md:text-sm text-gray-500">Location</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm md:text-base">Member since {driverData.joinDate}</p>
                  <p className="text-xs md:text-sm text-gray-500">Join Date</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Earnings Overview */}
        <Card className="mb-4 md:mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
              <CreditCard className="w-5 h-5 text-green-600" />
              <span>Earnings Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="text-center p-3 md:p-4 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors" onClick={() => setShowEarningsDialog(true)}>
                <div className="text-lg md:text-2xl font-bold text-green-600">₹{driverData.todayEarnings.toLocaleString()}</div>
                <div className="text-xs md:text-sm text-gray-600">Today</div>
              </div>
              <div className="text-center p-3 md:p-4 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors" onClick={() => setShowEarningsDialog(true)}>
                <div className="text-lg md:text-2xl font-bold text-blue-600">₹{driverData.weekEarnings.toLocaleString()}</div>
                <div className="text-xs md:text-sm text-gray-600">This Week</div>
              </div>
              <div className="text-center p-3 md:p-4 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors" onClick={() => setShowEarningsDialog(true)}>
                <div className="text-lg md:text-2xl font-bold text-purple-600">₹{driverData.monthEarnings.toLocaleString()}</div>
                <div className="text-xs md:text-sm text-gray-600">This Month</div>
              </div>
              <div className="text-center p-3 md:p-4 bg-orange-50 rounded-lg">
                <div className="text-lg md:text-2xl font-bold text-orange-600">{driverData.totalRides}</div>
                <div className="text-xs md:text-sm text-gray-600">Total Rides</div>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="outline" size="sm" onClick={handleDownloadEarnings}>
                <Download className="w-4 h-4 mr-2" />
                Download Earnings Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Performance Stats */}
        <Card className="mb-4 md:mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>Performance Statistics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-xl md:text-3xl font-bold text-blue-600">{driverData.acceptanceRate}%</div>
                <div className="text-xs md:text-sm text-gray-600">Acceptance Rate</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-xl md:text-3xl font-bold text-green-600">{driverData.rating}</div>
                <div className="text-xs md:text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-xl md:text-3xl font-bold text-purple-600">{driverData.hoursOnline}</div>
                <div className="text-xs md:text-sm text-gray-600">Hours Online</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="mb-4 md:mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
              <Settings className="w-5 h-5 text-gray-600" />
              <span>Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3 flex-1">
                <Bell className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm md:text-base">Push Notifications</p>
                  <p className="text-xs md:text-sm text-gray-500">Receive ride requests and updates</p>
                </div>
              </div>
              <Switch 
                checked={notifications} 
                onCheckedChange={handleToggleNotifications}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3 flex-1">
                <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm md:text-base">Location Sharing</p>
                  <p className="text-xs md:text-sm text-gray-500">Share location with customers</p>
                </div>
              </div>
              <Switch 
                checked={locationSharing} 
                onCheckedChange={handleToggleLocationSharing}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <EditProfileForm 
            driverData={driverData} 
            onSubmit={handleUpdateProfile} 
            onCancel={() => setShowEditDialog(false)} 
          />
        </DialogContent>
      </Dialog>

      {/* Earnings Details Dialog */}
      <Dialog open={showEarningsDialog} onOpenChange={setShowEarningsDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Earnings Details</DialogTitle>
          </DialogHeader>
          <EarningsDetailsDialog driverData={driverData} />
        </DialogContent>
      </Dialog>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white/95 backdrop-blur-md z-50 shadow-lg">
        <div className="flex justify-around py-3">
          <button 
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
              activeTab === "home" 
                ? "text-blue-600 bg-blue-50" 
                : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
            }`}
            onClick={() => handleTabChange("home")}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button 
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
              activeTab === "requests" 
                ? "text-blue-600 bg-blue-50" 
                : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
            }`}
            onClick={() => handleTabChange("requests")}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs font-medium">Requests</span>
          </button>
          <button 
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
              activeTab === "myvehicle" 
                ? "text-blue-600 bg-blue-50" 
                : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
            }`}
            onClick={() => handleTabChange("myvehicle")}
          >
            <Car className="w-5 h-5" />
            <span className="text-xs font-medium">MyVehicle</span>
          </button>
          <button 
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
              activeTab === "profile" 
                ? "text-blue-600 bg-blue-50" 
                : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
            }`}
            onClick={() => handleTabChange("profile")}
          >
            <User className="w-5 h-5" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Edit Profile Form Component
const EditProfileForm = ({ driverData, onSubmit, onCancel }: { 
  driverData: any; 
  onSubmit: (data: any) => void; 
  onCancel: () => void; 
}) => {
  const [formData, setFormData] = useState({
    name: driverData.name,
    phone: driverData.phone,
    email: driverData.email,
    location: driverData.location
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="editName">Full Name</Label>
        <Input 
          id="editName" 
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="editPhone">Phone Number</Label>
        <Input 
          id="editPhone" 
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="editEmail">Email Address</Label>
        <Input 
          id="editEmail" 
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="editLocation">Location</Label>
        <Input 
          id="editLocation" 
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          required
        />
      </div>
      <div className="flex space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          Update Profile
        </Button>
      </div>
    </form>
  );
};

// Earnings Details Dialog Component
const EarningsDetailsDialog = ({ driverData }: { driverData: any }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">₹{driverData.todayEarnings.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Today's Earnings</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">₹{driverData.weekEarnings.toLocaleString()}</div>
          <div className="text-sm text-gray-600">This Week</div>
        </div>
      </div>
      <div className="text-center p-4 bg-purple-50 rounded-lg">
        <div className="text-3xl font-bold text-purple-600">₹{driverData.monthEarnings.toLocaleString()}</div>
        <div className="text-sm text-gray-600">This Month</div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total Rides:</span>
          <span className="font-medium">{driverData.totalRides}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Average per Ride:</span>
          <span className="font-medium">₹{(driverData.monthEarnings / driverData.totalRides).toFixed(0)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Acceptance Rate:</span>
          <span className="font-medium">{driverData.acceptanceRate}%</span>
        </div>
      </div>
      <div className="flex space-x-3 pt-4">
        <Button variant="outline" className="flex-1" onClick={() => window.print()}>
          <Download className="w-4 h-4 mr-2" />
          Print Report
        </Button>
        <Button className="flex-1">
          <TrendingUp className="w-4 h-4 mr-2" />
          View Analytics
        </Button>
      </div>
    </div>
  );
};

export default DriverProfile; 