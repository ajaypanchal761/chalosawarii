import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui2/dialog';
import { Button } from '@/components/ui2/button';
import { Badge } from '@/components/ui2/badge';
import { Separator } from '@/components/ui2/separator';
import { Star, Wifi, Tv, Power, Car, Clock, MapPin, Users, Shield, CreditCard, Phone, Minus, Plus, Hotel, Plane, Bus } from 'lucide-react';
import TravellerLogo from '@/assets/TravellerLogo.png';
import TravellerBar from '@/assets/TravellerBar.png';

interface Traveller {
  id: string;
  operatorName: string;
  packageName: string;
  packageType: string;
  duration: string;
  rating: number;
  reviewCount: number;
  fare: number;
  packagesLeft: number;
  amenities: string[];
  image: string;
  isPremium: boolean;
  isGuided: boolean;
  accommodation: string;
  meals: string;
  transport: string;
}

interface TravellerDetailsModalProps {
  traveller: Traveller | null;
  isOpen: boolean;
  onClose: () => void;
}

const TravellerDetailsModal = ({ traveller, isOpen, onClose }: TravellerDetailsModalProps) => {
  const navigate = useNavigate();
  const [packageCount, setPackageCount] = useState(1);

  if (!traveller) return null;

  const renderAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi':
        return <Wifi className="w-5 h-5" />;
      case 'hotel':
        return <Hotel className="w-5 h-5" />;
      case 'transport':
        return <Car className="w-5 h-5" />;
      case 'guide':
        return <Users className="w-5 h-5" />;
      case 'meals':
        return <div className="w-5 h-5 bg-muted rounded flex items-center justify-center text-xs">🍽️</div>;
      case 'insurance':
        return <Shield className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  const getAmenityLabel = (amenity: string) => {
    switch (amenity) {
      case 'wifi':
        return 'Free WiFi';
      case 'hotel':
        return 'Hotel Accommodation';
      case 'transport':
        return 'Transport Included';
      case 'guide':
        return 'Professional Guide';
      case 'meals':
        return 'Meals Included';
      case 'insurance':
        return 'Travel Insurance';
      default:
        return amenity;
    }
  };

  const handlePackageChange = (increment: boolean) => {
    if (increment && packageCount < traveller.packagesLeft) {
      setPackageCount(packageCount + 1);
    } else if (!increment && packageCount > 1) {
      setPackageCount(packageCount - 1);
    }
  };

  const handleProceedToPayment = () => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
      // Show booking confirmation message
      alert(`Travel Package Confirmed!
      
Package: ${traveller.packageName}
Operator: ${traveller.operatorName}
Destination: Bangalore to Chennai
Date: 2024-01-15
Duration: ${traveller.duration}
Packages: ${packageCount}
Total Fare: ₹${traveller.fare * packageCount}
Package Numbers: ${Array.from({ length: packageCount }, (_, i) => `PKG${i + 1}`).join(', ')}

Your travel package has been confirmed. You will receive a confirmation SMS shortly.`);
    } else {
      // Redirect to auth page
      navigate('/auth', { 
        state: { 
          returnUrl: '/bookings'
        } 
      });
    }
    
    // Close the modal
    onClose();
  };

  const totalFare = traveller.fare * packageCount;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Travel Package Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Package Image and Basic Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Package Image */}
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={traveller.image}
                  alt={traveller.packageName}
                  className="w-full h-64 object-cover rounded-lg border border-border"
                />
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  {traveller.isPremium ? 'Premium' : 'Standard'}
                </Badge>
                <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
                  {traveller.isGuided ? 'Guided' : 'Self-Guided'}
                </Badge>
              </div>
              
              {/* Operator Info */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{traveller.operatorName}</h3>
                <p className="text-muted-foreground">{traveller.packageName}</p>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span className="font-medium">{traveller.rating}</span>
                  <span className="text-muted-foreground">({traveller.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Package Details */}
            <div className="space-y-4">

              {/* Pricing */}
              <div className="space-y-2">
                <h4 className="font-semibold">Pricing</h4>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Starting from</span>
                  <span className="text-3xl font-bold text-primary">₹{traveller.fare}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Package Count Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Select Number of Vehicle
            </h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Number of Vehicles</p>
                  <p className="text-sm text-gray-600">Select how many vehicle want to book</p>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePackageChange(false)}
                    disabled={packageCount <= 1}
                    className="w-10 h-10 p-0"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <div className="w-16 text-center">
                    <span className="text-2xl font-bold text-gray-800">{packageCount}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePackageChange(true)}
                    disabled={packageCount >= traveller.packagesLeft}
                    className="w-10 h-10 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Total Fare Display */}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Fare</p>
                    <p className="text-2xl font-bold text-blue-600">₹{totalFare.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">₹{traveller.fare} × {packageCount}</p>
                    <p className="text-xs text-green-600">No convenience fee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Close
            </Button>
            <Button 
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={handleProceedToPayment}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Proceed to Payment - ₹{totalFare.toLocaleString()}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TravellerDetailsModal; 