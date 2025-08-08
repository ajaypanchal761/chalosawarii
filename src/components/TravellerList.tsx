import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui2/button';
import { Card } from '@/components/ui2/card';
import { Badge } from '@/components/ui2/badge';
import { Star, Wifi, Tv, Power, Car, Eye, Users, Shield, Armchair } from 'lucide-react';
import TravellerDetailsModal from './TravellerDetailsModal';
import Traveller1 from '@/assets/Traveller1.png';
import Traveller2 from '@/assets/Traveller2.webp';
import Traveller3 from '@/assets/Traveller3.webp';
import Traveller4 from '@/assets/Traveller4.png';

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
  totalSeats: number;
  isBooked?: boolean; // New property
  bookedDate?: string; // Optional
}

interface TravellerListProps {
  searchParams?: {
    from?: string;
    to?: string;
    date?: string;
    time?: string;
  };
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
    image: Traveller1,
    isAc: true,
    totalSeats: 12,
    isBooked: false,
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
    image: Traveller2,
    isAc: true,
    totalSeats: 15,
    isBooked: true,
    bookedDate: '2025-08-04',
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
    image: Traveller3,
    isAc: true,
    totalSeats: 10,
    isBooked: false,
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
    image: Traveller4,
    isAc: true,
    totalSeats: 13,
    isBooked: true,
    bookedDate: '2025-08-04',
  },
];

const TravellerCard = ({ traveller, onViewDetails, onBookNow }: { 
  traveller: Traveller; 
  onViewDetails: (traveller: Traveller) => void;
  onBookNow: (traveller: Traveller) => void;
}) => {
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
    <Card className={`p-4 mb-4 border border-border hover:shadow-lg transition-shadow ${
      traveller.isBooked ? 'bg-red-50 border-red-200 cursor-not-allowed' : 'cursor-pointer'
    }`} 
          onClick={() => {
            if (!traveller.isBooked) {
              onViewDetails(traveller);
            }
          }}>
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
            <span className={`ml-2 px-2 py-0.5 rounded text-xs font-semibold ${traveller.isBooked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                              Available
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-2">{traveller.travellerName}</p>
          <p className="text-sm font-medium text-foreground mb-2">{traveller.travellerType}</p>
          <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
            <Armchair className="w-4 h-4 mr-1" />
            {traveller.totalSeats} Seater
          </p>
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
              disabled={traveller.isBooked}
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
            <Button 
              variant="default" 
              size="lg"
              disabled={traveller.isBooked}
              className={`w-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 ${
                traveller.isBooked 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-primary hover:bg-primary/90 text-white'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (!traveller.isBooked) {
                  onBookNow(traveller);
                }
              }}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const TravellerList = ({ searchParams }: TravellerListProps) => {
  const navigate = useNavigate();
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

  const handleBookNow = (traveller: Traveller) => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
      // Show booking confirmation message
      alert(`Booking Confirmed!
      
Vehicle: ${traveller.travellerName}
Operator: ${traveller.operatorName}
From: Bangalore to Chennai
Date: 2024-01-15
Time: 22:00
Passengers: 1
Total Fare: ₹${traveller.fare}
Seats: A1

Your booking has been confirmed. You will receive a confirmation SMS shortly.`);
    } else {
      // Redirect to auth page
      navigate('/auth', { 
        state: { 
          returnUrl: '/bookings'
        } 
      });
    }
  };

  // Filter travellers based on search date
  const filteredTravellers = sampleTravellers.map(traveller => {
    if (searchParams?.date && traveller.bookedDate === searchParams.date) {
      return { ...traveller, isBooked: true };
    }
    return traveller;
  });
  const availableTravellers = filteredTravellers.filter(traveller => !traveller.isBooked);
  const bookedTravellers = filteredTravellers.filter(traveller => traveller.isBooked);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          {filteredTravellers.length} travellers found
        </h2>
        <div className="text-sm text-muted-foreground">
          Showing travellers from Bangalore to Chennai
        </div>
      </div>
      {/* Available Travellers */}
      {availableTravellers.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Available Travellers ({availableTravellers.length})
          </h3>
          {availableTravellers.map((traveller) => (
            <TravellerCard key={traveller.id} traveller={traveller} onViewDetails={handleViewDetails} onBookNow={handleBookNow} />
          ))}
        </div>
      )}

      <TravellerDetailsModal 
        traveller={selectedTraveller}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default TravellerList; 