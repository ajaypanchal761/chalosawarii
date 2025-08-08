import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui2/button';
import { Card } from '@/components/ui2/card';
import { Badge } from '@/components/ui2/badge';
import { Star, Wifi, Tv, Power, Car, Eye, Calendar, AlertCircle, Armchair } from 'lucide-react';
import bus1 from '@/assets/bus1.jpg';
import bus2 from '@/assets/bus2.jpg';
import bus3 from '@/assets/bus3.jpg';
import BusDetailsModal from './BusDetailsModal';

interface Bus {
  id: string;
  operatorName: string;
  busName: string;
  busType: string;
  duration: string;
  rating: number;
  reviewCount: number;
  fare: number;
  seatsLeft: number;
  amenities: string[];
  image: string;
  isAc: boolean;
  isSleeper: boolean;
  isBooked?: boolean; // New property to track booking status
  bookedDate?: string; // Date when bus is booked
  totalSeats: number; // Total number of seats
}

interface BusListProps {
  searchParams?: {
    from?: string;
    to?: string;
    date?: string;
    time?: string;
  };
}

const sampleBuses: Bus[] = [
  {
    id: '1',
    operatorName: 'Redbus Travels',
    busName: 'Mercedes Multi-Axle',
    busType: 'AC Seater / Sleeper (2+1)',
    duration: '9h 45m',
    rating: 4.2,
    reviewCount: 156,
    fare: 850,
    seatsLeft: 12,
    amenities: ['wifi', 'tv', 'power', 'blanket'],
    image: bus1,
    isAc: true,
    isSleeper: true,
    isBooked: false,
    totalSeats: 40,
  },
  {
    id: '2',
    operatorName: 'SRS Travels',
    busName: 'Volvo Multi-Axle',
    busType: 'AC Sleeper (2+1)',
    duration: '9h 45m',
    rating: 4.5,
    reviewCount: 298,
    fare: 920,
    seatsLeft: 8,
    amenities: ['wifi', 'tv', 'power'],
    image: bus2,
    isAc: true,
    isSleeper: true,
    isBooked: true,
    bookedDate: '2025-08-04',
    totalSeats: 36,
  },
  {
    id: '3',
    operatorName: 'KPN Travels',
    busName: 'Bharat Benz',
    busType: 'AC Seater (2+2)',
    duration: '9h 15m',
    rating: 3.8,
    reviewCount: 89,
    fare: 650,
    seatsLeft: 18,
    amenities: ['wifi', 'power'],
    image: bus3,
    isAc: true,
    isSleeper: false,
    isBooked: false,
    totalSeats: 44,
  },
  {
    id: '4',
    operatorName: 'Orange Travels',
    busName: 'Scania Multi-Axle',
    busType: 'AC Sleeper (2+1)',
    duration: '9h 15m',
    rating: 4.1,
    reviewCount: 204,
    fare: 780,
    seatsLeft: 6,
    amenities: ['wifi', 'tv', 'power', 'blanket'],
    image: bus1,
    isAc: true,
    isSleeper: true,
    isBooked: true,
    bookedDate: '2025-08-04',
    totalSeats: 36,
  },
];

const BusCard = ({ bus, onViewDetails, onBookNow }: { 
  bus: Bus; 
  onViewDetails: (bus: Bus) => void;
  onBookNow: (bus: Bus) => void;
}) => {
  const renderAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi':
        return <Wifi className="w-4 h-4" />;
      case 'tv':
        return <Tv className="w-4 h-4" />;
      case 'power':
        return <Power className="w-4 h-4" />;
      case 'blanket':
        return <div className="w-4 h-4 bg-muted rounded flex items-center justify-center text-xs">B</div>;
      default:
        return <Car className="w-4 h-4" />;
    }
  };

  return (
    <Card className={`p-4 mb-4 border border-border hover:shadow-lg transition-shadow ${
      bus.isBooked ? 'bg-red-50 border-red-200 cursor-not-allowed' : 'cursor-pointer'
    }`} 
          onClick={() => {
            if (!bus.isBooked) {
              onViewDetails(bus);
            }
          }}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Vehicle Image - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:block lg:col-span-2">
          <img
            src={bus.image}
            alt={bus.busName}
            className="w-full h-20 object-cover rounded-md border border-border"
          />
        </div>

        {/* Bus Info */}
        <div className="lg:col-span-6">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-foreground">{bus.operatorName}</h3>
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span className="font-medium">{bus.rating}</span>
              <span className="text-muted-foreground">({bus.reviewCount})</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">{bus.busName}</p>
            <span className="ml-2 px-2 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-700">
              Available
            </span>
          </div>
          <p className="text-sm font-medium text-foreground mb-2">{bus.busType}</p>
          <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
            <Armchair className="w-4 h-4 mr-1" />
            {bus.totalSeats} Seater
          </p>
          
          
         
          {/* Vehicle Image on Mobile */}
          <div className="lg:hidden mb-3">
            <img
              src={bus.image}
              alt={bus.busName}
              className="w-full h-32 object-cover rounded-md border border-border"
            />
          </div>
        </div>

        {/* Pricing and Action */}
        <div className="lg:col-span-4">
          <div className="mb-4 text-right">
            <p className="text-sm text-muted-foreground">Book at only</p>
            <p className="text-2xl font-bold text-foreground">₹ {bus.fare}</p>
          </div>
          
          <div className="flex flex-col gap-3">
            {!bus.isBooked && (
              <Button 
                variant="outline" 
                size="lg"
                className="w-full border-2 hover:bg-muted/50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails(bus);
                }}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            )}
            <Button 
              variant="default" 
              size="lg"
              disabled={bus.isBooked}
              className={`w-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 ${
                bus.isBooked 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-primary hover:bg-primary/90 text-white'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (!bus.isBooked) {
                  onBookNow(bus);
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

export const BusList = ({ searchParams }: BusListProps) => {
  const navigate = useNavigate();
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (bus: Bus) => {
    setSelectedBus(bus);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBus(null);
  };

  const handleBookNow = (bus: Bus) => {
    setSelectedBus(bus);
    setIsModalOpen(true);
  };

  // Filter buses based on search date
  const filteredBuses = sampleBuses.map(bus => {
    // If search date matches booked date, mark as booked
    if (searchParams?.date && bus.bookedDate === searchParams.date) {
      return { ...bus, isBooked: true };
    }
    return bus;
  });

  const availableBuses = filteredBuses.filter(bus => !bus.isBooked);
  const bookedBuses = filteredBuses.filter(bus => bus.isBooked);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          {filteredBuses.length} buses found
        </h2>
        <div className="text-sm text-muted-foreground">
          {searchParams?.from && searchParams?.to && searchParams?.date 
            ? `Showing buses from ${searchParams.from} to ${searchParams.to} on ${searchParams.date}`
            : 'Showing buses from Bangalore to Chennai'
          }
        </div>
      </div>

      {/* Show search parameters if available */}
      {searchParams?.from && searchParams?.to && searchParams?.date && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-blue-800">
            <Calendar className="w-4 h-4" />
            <span className="font-medium">Search Results for:</span>
          </div>
          <div className="mt-2 text-sm text-blue-700">
            <p><strong>From:</strong> {searchParams.from}</p>
            <p><strong>To:</strong> {searchParams.to}</p>
            <p><strong>Date:</strong> {searchParams.date}</p>
            {searchParams.time && <p><strong>Time:</strong> {searchParams.time}</p>}
          </div>
        </div>
      )}
      
      {/* Available Buses */}
      {availableBuses.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Available Buses ({availableBuses.length})
          </h3>
          {availableBuses.map((bus) => (
            <BusCard key={bus.id} bus={bus} onViewDetails={handleViewDetails} onBookNow={handleBookNow} />
          ))}
        </div>
      )}

      <BusDetailsModal 
        bus={selectedBus}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default BusList; 