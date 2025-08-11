import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui2/button';
import { Card } from '@/components/ui2/card';
import { Badge } from '@/components/ui2/badge';
import { Star, Wifi, Tv, Power, Car, Eye, Users, Shield, Armchair } from 'lucide-react';
import AutoDetailsModal from './AutoDetailsModal';
import Auto1 from '@/assets/auto1.webp';
import Auto2 from '@/assets/auto2.jpg';
import Auto3 from '@/assets/auto1.webp';
import Auto4 from '@/assets/auto2.jpg';

interface Auto {
  id: string;
  operatorName: string;
  autoName: string;
  autoType: string;
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

interface AutoListProps {
  searchParams?: {
    from?: string;
    to?: string;
    date?: string;
    time?: string;
  };
}

const sampleAutos: Auto[] = [
  {
    id: '1',
    operatorName: 'Auto-Ricksaw Services',
    autoName: 'Premium Auto-Ricksaw',
    autoType: 'Premium Passenger Auto-Ricksaw',
    duration: '8h 45m',
    rating: 4.4,
    reviewCount: 203,
    fare: 1800,
    seatsLeft: 12,
    amenities: ['wifi', 'power', 'ac', 'tv'],
    image: Auto1,
    isAc: true,
    totalSeats: 12,
    isBooked: false,
  },
  {
    id: '2',
    operatorName: 'Auto-Ricksaw Express',
    autoName: 'Luxury Auto-Ricksaw',
    autoType: 'Luxury Passenger Auto-Ricksaw',
    duration: '8h 30m',
    rating: 4.7,
    reviewCount: 156,
    fare: 2200,
    seatsLeft: 15,
    amenities: ['wifi', 'tv', 'power', 'ac'],
    image: Auto2,
    isAc: true,
    totalSeats: 15,
    isBooked: true,
    bookedDate: '2025-08-04',
  },
  {
    id: '3',
    operatorName: 'City Auto-Ricksaw Cabs',
    autoName: 'Standard Auto-Ricksaw',
    autoType: 'Economy Passenger Auto-Ricksaw',
    duration: '9h 15m',
    rating: 3.8,
    reviewCount: 98,
    fare: 1400,
    seatsLeft: 10,
    amenities: ['ac', 'power'],
    image: Auto3,
    isAc: true,
    totalSeats: 10,
    isBooked: false,
  },
  {
    id: '4',
    operatorName: 'Premium Auto-Ricksaw Co.',
    autoName: 'Executive Auto-Ricksaw',
    autoType: 'Executive Passenger Auto-Ricksaw',
    duration: '8h 20m',
    rating: 4.5,
    reviewCount: 178,
    fare: 2000,
    seatsLeft: 13,
    amenities: ['wifi', 'power', 'ac', 'tv'],
    image: Auto4,
    isAc: true,
    totalSeats: 13,
    isBooked: true,
    bookedDate: '2025-08-04',
  },
];

const AutoCard = ({ auto, onViewDetails, onBookNow }: { 
  auto: Auto; 
  onViewDetails: (auto: Auto) => void;
  onBookNow: (auto: Auto) => void;
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
      auto.isBooked ? 'bg-red-50 border-red-200 cursor-not-allowed' : 'cursor-pointer'
    }`} 
          onClick={() => {
            if (!auto.isBooked) {
              onViewDetails(auto);
            }
          }}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Vehicle Image - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:block lg:col-span-2">
          <img
            src={auto.image}
            alt={auto.autoName}
            className="w-full h-20 object-cover rounded-md border border-border"
          />
        </div>

        {/* Auto Info */}
        <div className="lg:col-span-6">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-foreground">{auto.operatorName}</h3>
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span className="font-medium">{auto.rating}</span>
              <span className="text-muted-foreground">({auto.reviewCount})</span>
            </div>
            <span className={`ml-2 px-2 py-0.5 rounded text-xs font-semibold ${auto.isBooked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                              Available
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-2">{auto.autoName}</p>
          <p className="text-sm font-medium text-foreground mb-2">{auto.autoType}</p>
          <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
            <Armchair className="w-4 h-4 mr-1" />
            {auto.totalSeats} Seater
          </p>
          <p className="text-sm text-muted-foreground mb-2">Duration: {auto.duration}</p>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>Max {auto.maxPassengers} passengers</span>
            </div>
            {auto.isPremium && (
              <Badge className="bg-yellow-100 text-yellow-800">Premium</Badge>
            )}
          </div>
          
          {/* Vehicle Image on Mobile */}
          <div className="lg:hidden mb-3">
            <img
              src={auto.image}
              alt={auto.autoName}
              className="w-full h-32 object-cover rounded-md border border-border"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {auto.amenities.map((amenity, index) => (
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
            <p className="text-2xl font-bold text-foreground">₹ {auto.fare}</p>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button 
              variant="outline" 
              size="lg"
              className="w-full border-2 hover:bg-muted/50 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(auto);
              }}
              disabled={auto.isBooked}
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
            <Button 
              variant="default" 
              size="lg"
              disabled={auto.isBooked}
              className={`w-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 ${
                auto.isBooked 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-primary hover:bg-primary/90 text-white'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (!auto.isBooked) {
                  onBookNow(auto);
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

export const AutoList = ({ searchParams }: AutoListProps) => {
  const navigate = useNavigate();
  const [selectedAuto, setSelectedAuto] = useState<Auto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (auto: Auto) => {
    setSelectedAuto(auto);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAuto(null);
  };

  const handleBookNow = (auto: Auto) => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
      // Show booking confirmation message
      alert(`Booking Confirmed!
      
Vehicle: ${auto.autoName}
Operator: ${auto.operatorName}
From: Bangalore to Chennai
Date: 2024-01-15
Time: 22:00
Passengers: 1
Total Fare: ₹${auto.fare}
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

  // Filter autos based on search date
  const filteredAutos = sampleAutos.map(auto => {
    if (searchParams?.date && auto.bookedDate === searchParams.date) {
      return { ...auto, isBooked: true };
    }
    return auto;
  });
  const availableAutos = filteredAutos.filter(auto => !auto.isBooked);
  const bookedAutos = filteredAutos.filter(auto => auto.isBooked);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          {filteredAutos.length} auto-ricksaws found
        </h2>
        <div className="text-sm text-muted-foreground">
          Showing auto-ricksaws from Bangalore to Chennai
        </div>
      </div>
      {/* Available Autos */}
      {availableAutos.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Available Auto-Ricksaws ({availableAutos.length})
          </h3>
          {availableAutos.map((auto) => (
            <AutoCard key={auto.id} auto={auto} onViewDetails={handleViewDetails} onBookNow={handleBookNow} />
          ))}
        </div>
      )}

      <AutoDetailsModal 
        auto={selectedAuto}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default AutoList;
