import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui2/dialog';
import { Button } from '@/components/ui2/button';
import { Badge } from '@/components/ui2/badge';
import { Separator } from '@/components/ui2/separator';
import { Star, Wifi, Tv, Power, Car, Clock, MapPin, Users, Shield, CreditCard, Phone } from 'lucide-react';

interface Car {
  id: string;
  operatorName: string;
  carName: string;
  carType: string;
  duration: string;
  rating: number;
  reviewCount: number;
  fare: number;
  seatsLeft: number;
  amenities: string[];
  image: string;
  isAc: boolean;
  isPremium: boolean;
  maxPassengers: number;
}

interface CarDetailsModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
}

const CarDetailsModal = ({ car, isOpen, onClose }: CarDetailsModalProps) => {
  if (!car) return null;

  const renderAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi':
        return <Wifi className="w-5 h-5" />;
      case 'tv':
        return <Tv className="w-5 h-5" />;
      case 'power':
        return <Power className="w-5 h-5" />;
      case 'ac':
        return <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center text-xs text-blue-600 font-bold">AC</div>;
      default:
        return <Car className="w-5 h-5" />;
    }
  };

  const getAmenityLabel = (amenity: string) => {
    switch (amenity) {
      case 'wifi':
        return 'Free WiFi';
      case 'tv':
        return 'Entertainment System';
      case 'power':
        return 'Power Outlets';
      case 'ac':
        return 'Air Conditioning';
      default:
        return amenity;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Car Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Car Image and Basic Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Car Image */}
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={car.image}
                  alt={car.carName}
                  className="w-full h-64 object-cover rounded-lg border border-border"
                />
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  {car.isAc ? 'AC' : 'Non-AC'}
                </Badge>
                {car.isPremium && (
                  <Badge className="absolute top-4 right-4 bg-yellow-500 text-white">
                    Premium
                  </Badge>
                )}
              </div>
              
              {/* Operator Info */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{car.operatorName}</h3>
                <p className="text-muted-foreground">{car.carName}</p>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span className="font-medium">{car.rating}</span>
                  <span className="text-muted-foreground">({car.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Car Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Car Details</h3>
              
              {/* Duration */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{car.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Max Passengers:</span>
                  <span className="font-medium">{car.maxPassengers}</span>
                </div>
              </div>

              <Separator />

              {/* Pricing */}
              <div className="space-y-2">
                <h4 className="font-semibold">Pricing</h4>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Starting from</span>
                  <span className="text-3xl font-bold text-primary">₹{car.fare}</span>
                </div>
                <Badge variant={car.seatsLeft > 3 ? "secondary" : "destructive"}>
                  {car.seatsLeft} Seats Left
                </Badge>
              </div>

              <Separator />

              {/* Car Type */}
              <div className="space-y-2">
                <h4 className="font-semibold">Car Type</h4>
                <p className="text-muted-foreground">{car.carType}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Amenities */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {car.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                  {renderAmenityIcon(amenity)}
                  <span className="text-sm font-medium">{getAmenityLabel(amenity)}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Safety & Policies */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Safety & Policies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">Safe Travel</p>
                  <p className="text-sm text-muted-foreground">Sanitized cars & masks provided</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Secure Payment</p>
                  <p className="text-sm text-muted-foreground">Multiple payment options available</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <Phone className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-medium">24/7 Support</p>
                  <p className="text-sm text-muted-foreground">Customer care available round the clock</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-medium">Verified Drivers</p>
                  <p className="text-sm text-muted-foreground">All drivers are verified and trained</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1 bg-primary hover:bg-primary/90 text-lg py-3">
               Book Now
            </Button>
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarDetailsModal; 