import React, { useState } from 'react';
import { Button } from '@/components/ui2/button';
import { Card } from '@/components/ui2/card';
import { Badge } from '@/components/ui2/badge';
import { Star, Wifi, Tv, Power, Car, Eye } from 'lucide-react';
import bus1 from '@/assets/bus1.jpg';
import bus2 from '@/assets/bus2.jpg';
import bus3 from '@/assets/bus3.jpg';
import BusDetailsModal from './BusDetailsModal';

interface Bus {
  id: string;
  operatorName: string;
  busName: string;
  busType: string;
  departureTime: string;
  arrivalTime: string;
  departureLocation: string;
  arrivalLocation: string;
  duration: string;
  rating: number;
  reviewCount: number;
  fare: number;
  seatsLeft: number;
  amenities: string[];
  image: string;
  isAc: boolean;
  isSleeper: boolean;
}

const sampleBuses: Bus[] = [
  {
    id: '1',
    operatorName: 'Redbus Travels',
    busName: 'Mercedes Multi-Axle',
    busType: 'AC Seater / Sleeper (2+1)',
    departureTime: '20:30',
    arrivalTime: '06:15',
    departureLocation: 'Bangalore',
    arrivalLocation: 'Chennai',
    duration: '9h 45m',
    rating: 4.2,
    reviewCount: 156,
    fare: 850,
    seatsLeft: 12,
    amenities: ['wifi', 'tv', 'power', 'blanket'],
    image: bus1,
    isAc: true,
    isSleeper: true,
  },
  {
    id: '2',
    operatorName: 'SRS Travels',
    busName: 'Volvo Multi-Axle',
    busType: 'AC Sleeper (2+1)',
    departureTime: '21:00',
    arrivalTime: '06:45',
    departureLocation: 'Bangalore',
    arrivalLocation: 'Chennai',
    duration: '9h 45m',
    rating: 4.5,
    reviewCount: 298,
    fare: 920,
    seatsLeft: 8,
    amenities: ['wifi', 'tv', 'power'],
    image: bus2,
    isAc: true,
    isSleeper: true,
  },
  {
    id: '3',
    operatorName: 'KPN Travels',
    busName: 'Bharat Benz',
    busType: 'AC Seater (2+2)',
    departureTime: '22:15',
    arrivalTime: '07:30',
    departureLocation: 'Bangalore',
    arrivalLocation: 'Chennai',
    duration: '9h 15m',
    rating: 3.8,
    reviewCount: 89,
    fare: 650,
    seatsLeft: 18,
    amenities: ['wifi', 'power'],
    image: bus3,
    isAc: true,
    isSleeper: false,
  },
  {
    id: '4',
    operatorName: 'Orange Travels',
    busName: 'Scania Multi-Axle',
    busType: 'AC Sleeper (2+1)',
    departureTime: '20:45',
    arrivalTime: '06:00',
    departureLocation: 'Bangalore',
    arrivalLocation: 'Chennai',
    duration: '9h 15m',
    rating: 4.1,
    reviewCount: 204,
    fare: 780,
    seatsLeft: 6,
    amenities: ['wifi', 'tv', 'power', 'blanket'],
    image: bus1,
    isAc: true,
    isSleeper: true,
  },
];

const BusCard = ({ bus, onViewDetails }: { bus: Bus; onViewDetails: (bus: Bus) => void }) => {
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
    <Card className="p-4 mb-4 border border-border hover:shadow-lg transition-shadow cursor-pointer" 
          onClick={() => onViewDetails(bus)}>
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
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-foreground">{bus.operatorName}</h3>
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span className="font-medium">{bus.rating}</span>
              <span className="text-muted-foreground">({bus.reviewCount})</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-2">{bus.busName}</p>
          <p className="text-sm font-medium text-foreground mb-2">{bus.busType}</p>
          
          {/* Vehicle Image on Mobile */}
          <div className="lg:hidden mb-3">
            <img
              src={bus.image}
              alt={bus.busName}
              className="w-full h-32 object-cover rounded-md border border-border"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {bus.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center text-muted-foreground">
                {renderAmenityIcon(amenity)}
              </div>
            ))}
          </div>
        </div>

        {/* Timing Info */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{bus.departureTime}</p>
              <p className="text-sm text-muted-foreground">{bus.departureLocation}</p>
            </div>
            <div className="flex-1 mx-4 text-center">
              <p className="text-sm text-muted-foreground">{bus.duration}</p>
              <div className="w-full h-px bg-border my-1"></div>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{bus.arrivalTime}</p>
              <p className="text-sm text-muted-foreground">{bus.arrivalLocation}</p>
            </div>
          </div>
        </div>

        {/* Pricing and Action */}
        <div className="lg:col-span-3 text-right">
          <div className="mb-2">
            <p className="text-sm text-muted-foreground">Starts from</p>
            <p className="text-2xl font-bold text-foreground">₹ {bus.fare}</p>
          </div>
          
          
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="w-full lg:w-auto"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(bus);
              }}
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
                         <Button variant="default" className="w-full lg:w-auto bg-primary hover:bg-primary/90">
               Book
             </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const BusList = () => {
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          {sampleBuses.length} buses found
        </h2>
        <div className="text-sm text-muted-foreground">
          Showing buses from Bangalore to Chennai
        </div>
      </div>
      
      {sampleBuses.map((bus) => (
        <BusCard key={bus.id} bus={bus} onViewDetails={handleViewDetails} />
      ))}

      <BusDetailsModal 
        bus={selectedBus}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default BusList; 