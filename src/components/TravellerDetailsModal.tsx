import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogPortal, DialogOverlay } from '@/components/ui2/dialog';
import { Button } from '@/components/ui2/button';
import { Badge } from '@/components/ui2/badge';
import { Separator } from '@/components/ui2/separator';
import { Star, Wifi, Tv, Power, Car, Clock, MapPin, Users, Shield, CreditCard, Phone } from 'lucide-react';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

interface Traveller {
  id: string;
  operatorName: string;
  travellerName: string;
  travellerType: string;
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

interface TravellerDetailsModalProps {
  traveller: Traveller | null;
  isOpen: boolean;
  onClose: () => void;
}

const TravellerDetailsModal = ({ traveller, isOpen, onClose }: TravellerDetailsModalProps) => {
  if (!traveller) return null;

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
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg max-h-[90vh] overflow-y-auto"
          )}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Traveller Details</DialogTitle>
          </DialogHeader>

        <div className="space-y-6">
          {/* Traveller Image and Basic Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Traveller Image */}
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={traveller.image}
                  alt={traveller.travellerName}
                  className="w-full h-64 object-cover rounded-lg border border-border"
                />
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  {traveller.isAc ? 'AC' : 'Non-AC'}
                </Badge>
                {traveller.isPremium && (
                  <Badge className="absolute top-4 right-4 bg-yellow-500 text-white">
                    Premium
                  </Badge>
                )}
              </div>
              
              {/* Operator Info */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{traveller.operatorName}</h3>
                <p className="text-muted-foreground">{traveller.travellerName}</p>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span className="font-medium">{traveller.rating}</span>
                  <span className="text-muted-foreground">({traveller.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Traveller Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Traveller Details</h3>
              
              {/* Duration */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{traveller.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Max Passengers:</span>
                  <span className="font-medium">{traveller.maxPassengers}</span>
                </div>
              </div>

              <Separator />

              {/* Pricing */}
              <div className="space-y-2">
                <h4 className="font-semibold">Pricing</h4>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Starting from</span>
                  <span className="text-3xl font-bold text-primary">₹{traveller.fare}</span>
                </div>
                <Badge variant={traveller.seatsLeft > 5 ? "secondary" : "destructive"}>
                  {traveller.seatsLeft} Seats Left
                </Badge>
              </div>

              <Separator />

              {/* Traveller Type */}
              <div className="space-y-2">
                <h4 className="font-semibold">Traveller Type</h4>
                <p className="text-muted-foreground">{traveller.travellerType}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Amenities */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {traveller.amenities.map((amenity, index) => (
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
                  <p className="text-sm text-muted-foreground">Sanitized travellers & masks provided</p>
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
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};

export default TravellerDetailsModal; 