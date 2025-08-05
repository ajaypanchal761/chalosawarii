import React, { useState } from 'react';
import { Button } from '@/components/ui2/button';
import { Card } from '@/components/ui2/card';
import { Badge } from '@/components/ui2/badge';
import { Star, Wifi, Tv, Power, Car, Eye, Users, MapPin } from 'lucide-react';
import TravellerDetailsModal from './TravellerDetailsModal';

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

const sampleTravellers: Traveller[] = [
  {
    id: '1',
    operatorName: 'Force Traveller Services',
    travellerName: 'Force Traveller',
    travellerType: 'Premium Passenger Van',
    duration: '8h 45m',
    rating: 4.4,
    reviewCount: 203,
    fare: 1800,
    seatsLeft: 12,
    amenities: ['wifi', 'power', 'ac', 'tv'],
    image: '/src/assets/Traveller1.png',
    isAc: true,
    isPremium: true,
    maxPassengers: 12,
  },
  {
    id: '2',
    operatorName: 'Traveller Express',
    travellerName: 'Force Traveller Deluxe',
    travellerType: 'Luxury Passenger Van',
    duration: '8h 30m',
    rating: 4.7,
    reviewCount: 156,
    fare: 2200,
    seatsLeft: 15,
    amenities: ['wifi', 'tv', 'power', 'ac'],
    image: '/src/assets/Traveller2.webp',
    isAc: true,
    isPremium: true,
    maxPassengers: 15,
  },
  {
    id: '3',
    operatorName: 'City Traveller Cabs',
    travellerName: 'Force Traveller Standard',
    travellerType: 'Economy Passenger Van',
    duration: '9h 15m',
    rating: 3.8,
    reviewCount: 98,
    fare: 1400,
    seatsLeft: 10,
    amenities: ['ac', 'power'],
    image: '/src/assets/Traveller3.webp',
    isAc: true,
    isPremium: false,
    maxPassengers: 10,
  },
  {
    id: '4',
    operatorName: 'Premium Traveller Co.',
    travellerName: 'Force Traveller Premium',
    travellerType: 'Executive Passenger Van',
    duration: '8h 20m',
    rating: 4.5,
    reviewCount: 178,
    fare: 2000,
    seatsLeft: 13,
    amenities: ['wifi', 'power', 'ac', 'tv'],
    image: '/src/assets/Traveller4.png',
    isAc: true,
    isPremium: true,
    maxPassengers: 13,
  },
];

const TravellerCard = ({ traveller, onViewDetails }: { traveller: Traveller; onViewDetails: (traveller: Traveller) => void }) => {
  const renderAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi':
        return <Wifi className="w-4 h-4" />;
      case 'tv':
        return <Tv className="w-4 h-4" />;
      case 'power':
        return <Power className="w-4 h-4" />;
      case 'ac':
        return <div className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center text-xs text-blue-600 font-bold">AC</div>;
      default:
        return <Car className="w-4 h-4" />;
    }
  };

  return (
    <Card className="p-4 mb-4 border border-border hover:shadow-lg transition-shadow cursor-pointer" 
          onClick={() => onViewDetails(traveller)}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Vehicle Image - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:block lg:col-span-2">
          <img
            src={traveller.image}
            alt={traveller.travellerName}
            className="w-full h-20 object-cover rounded-md border border-border"
          />
        </div>

        {/* Traveller Info */}
        <div className="lg:col-span-6">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-foreground">{traveller.operatorName}</h3>
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span className="font-medium">{traveller.rating}</span>
              <span className="text-muted-foreground">({traveller.reviewCount})</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-2">{traveller.travellerName}</p>
          <p className="text-sm font-medium text-foreground mb-2">{traveller.travellerType}</p>
          <p className="text-sm text-muted-foreground mb-2">Duration: {traveller.duration}</p>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>Max {traveller.maxPassengers} passengers</span>
            </div>
            {traveller.isPremium && (
              <Badge className="bg-yellow-100 text-yellow-800">Premium</Badge>
            )}
          </div>
          
          {/* Vehicle Image on Mobile */}
          <div className="lg:hidden mb-3">
            <img
              src={traveller.image}
              alt={traveller.travellerName}
              className="w-full h-32 object-cover rounded-md border border-border"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {traveller.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center text-muted-foreground">
                {renderAmenityIcon(amenity)}
              </div>
            ))}
          </div>
        </div>

        {/* Pricing and Action */}
        <div className="lg:col-span-4">
          <div className="mb-4 text-right">
            <p className="text-sm text-muted-foreground">Starts from</p>
            <p className="text-2xl font-bold text-foreground">₹ {traveller.fare}</p>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button 
              variant="outline" 
              size="lg"
              className="w-full border-2 hover:bg-muted/50 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(traveller);
              }}
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
            <Button 
              variant="default" 
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const TravellerList = () => {
  const [selectedTraveller, setSelectedTraveller] = useState<Traveller | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (traveller: Traveller) => {
    setSelectedTraveller(traveller);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTraveller(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          {sampleTravellers.length} travellers found
        </h2>
        <div className="text-sm text-muted-foreground">
          Showing travellers from Bangalore to Chennai
        </div>
      </div>
      
      {sampleTravellers.map((traveller) => (
        <TravellerCard key={traveller.id} traveller={traveller} onViewDetails={handleViewDetails} />
      ))}

      <TravellerDetailsModal 
        traveller={selectedTraveller}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default TravellerList; 