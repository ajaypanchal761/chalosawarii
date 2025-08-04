import { Button } from "@/components/ui/button";
import { ChevronDown, Globe, HelpCircle, User, Phone, Menu, X } from "lucide-react";
import busLogo from "@/assets/BusLogo.png";
import { useState } from "react";
import { Link } from "react-router-dom";

const TopNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLoginClick = () => {
    setIsMobileMenuOpen(false);
  };

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
        <div className="flex justify-between items-center py-2">
                    <Link to="/" className="flex items-center ml-2 md:ml-4 hover:opacity-80 transition-opacity">
            <div className="flex items-center space-x-1 md:space-x-2">
              {/* Logo Icon */}
              <img src={busLogo} alt="Bus Logo" className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain" />
              {/* Logo Text */}
              <div className="flex flex-col">
                <div className="flex items-baseline">
                  <span className="text-lg md:text-xl lg:text-2xl font-bold text-black">CHALO</span>
                  <span className="text-lg md:text-xl lg:text-2xl font-bold text-blue-600 ml-1">SAWARI</span>
                </div>
                <span className="text-xs text-gray-600 hidden sm:block">Travel with Confidence</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Button variant="ghost" className="font-medium">
              My Bookings
            </Button>
            <Button variant="ghost" className="font-medium">
              Track Vehicle
            </Button>
            <Button variant="ghost" className="font-medium">
              Offers
            </Button>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/auth">
              <Button variant="ghost" className="text-foreground">
                <User className="w-4 h-4 mr-2" />
                Login/Signup
              </Button>
            </Link>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Download App
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-14 h-14"
            >
              {isMobileMenuOpen ? <X className="w-9 h-9" /> : <Menu className="w-9 h-9" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Button variant="ghost" className="justify-start font-medium">
                My Bookings
              </Button>
              <Button variant="ghost" className="justify-start font-medium">
                Track Vehicle
              </Button>
              <Button variant="ghost" className="justify-start font-medium">
                Offers
              </Button>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Link to="/auth" className="w-full" onClick={handleLoginClick}>
                  <Button variant="ghost" className="justify-start w-full">
                    <User className="w-4 h-4 mr-2" />
                    Login/Signup
                  </Button>
                </Link>
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Download App
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNavigation;