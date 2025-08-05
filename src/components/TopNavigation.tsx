import { Button } from "@/components/ui/button";
import { ChevronDown, Globe, HelpCircle, User, Phone, Home, List } from "lucide-react";
import busLogo from "@/assets/BusLogo.png";
import { Link, useLocation } from "react-router-dom";

const TopNavigation = () => {
  const location = useLocation();
  const isOnAuthPage = location.pathname === "/auth";

  return (
    <nav className="w-full bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        {/* Top bar with contact info */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm border-b">
          <div className="flex items-center space-x-4 text-muted-foreground">
            <span className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              Customer Care: 8904-455-455
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Globe className="w-4 h-4 mr-2" />
              English
              <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help
            </Button>
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex justify-between items-center py-1 md:py-1 py-3">
          <Link to="/" className="flex items-center ml-2 md:ml-4 hover:opacity-80 transition-opacity">
            <div className="flex items-center space-x-1 md:space-x-2">
              {/* Logo Icon */}
              <img src={busLogo} alt="Bus Logo" className="w-12 h-12 md:w-14 md:h-14 lg:w-18 lg:h-18 object-contain" />
              {/* Logo Text */}
                              <div className="flex flex-col">
                  <div className="flex items-baseline">
                    <span className="text-lg md:text-lg lg:text-xl font-bold text-black">CHALO</span>
                    <span className="text-lg md:text-lg lg:text-xl font-bold text-blue-600 ml-1">SAWARI</span>
                  </div>
                  <span className="text-xs text-gray-600 hidden sm:block">Travel with Confidence</span>
                </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
              <Home className="w-5 h-5 text-primary" />
              <span className="font-medium">Home</span>
            </Link>
            <Link to="/bookings" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
              <List className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium text-muted-foreground">Bookings</span>
            </Link>
            <Link to="/help" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
              <HelpCircle className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium text-muted-foreground">Help</span>
            </Link>
            <Link to="/profile" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
              <User className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium text-muted-foreground">Account</span>
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Download App
            </Button>
          </div>

          {/* Medium Screen Navigation (Tablets) */}
          <div className="hidden md:flex lg:hidden items-center space-x-4">
            <Link to="/" className="flex items-center space-x-1 px-2 py-2 rounded-md hover:bg-gray-100 transition-colors">
              <Home className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Home</span>
            </Link>
            <Link to="/bookings" className="flex items-center space-x-1 px-2 py-2 rounded-md hover:bg-gray-100 transition-colors">
              <List className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Bookings</span>
            </Link>
            <Link to="/help" className="flex items-center space-x-1 px-2 py-2 rounded-md hover:bg-gray-100 transition-colors">
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Help</span>
            </Link>
            <Link to="/profile" className="flex items-center space-x-1 px-2 py-2 rounded-md hover:bg-gray-100 transition-colors">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Account</span>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile navigation content removed */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;