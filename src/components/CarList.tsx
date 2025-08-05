import React, { useState } from 'react';
import { Button } from '@/components/ui2/button';
import { Card } from '@/components/ui2/card';
import { Badge } from '@/components/ui2/badge';
import { Star, Wifi, Tv, Power, Car, Eye, Users, MapPin } from 'lucide-react';
import CarDetailsModal from './CarDetailsModal';
import Car1 from '@/assets/Car1.webp';
import Car2 from '@/assets/Car2.png';
import Car3 from '@/assets/Car3.png';
import Car4 from '@/assets/Car4.webp';

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

const sampleCars: Car[] = [
  {
    id: '1',
    operatorName: 'Sawariya Cabs',
    carName: 'Suzuki Ertiga',
    carType: 'Premium MPV',
    duration: '8h 30m',
    rating: 4.3,
    reviewCount: 189,
    fare: 1200,
    seatsLeft: 6,
    amenities: ['wifi', 'power', 'ac'],
    image: Car1,
    isAc: true,
    isPremium: true,
    maxPassengers: 6,
  },
  {
    id: '2',
    operatorName: 'Tirupati Travels',
    carName: 'Toyota Innova',
    carType: 'Luxury MPV',
    duration: '8h 15m',
    rating: 4.6,
    reviewCount: 245,
    fare: 1500,
    seatsLeft: 7,
    amenities: ['wifi', 'tv', 'power', 'ac'],
    image: Car2,
    isAc: true,
    isPremium: true,
    maxPassengers: 7,
  },
  {
    id: '3',
    operatorName: 'Vrindavan Cabs',
    carName: 'Maruti Swift',
    carType: 'Economy Hatchback',
    duration: '8h 45m',
    rating: 3.9,
    reviewCount: 112,
    fare: 800,
    seatsLeft: 4,
    amenities: ['ac', 'power'],
    image: Car3,
    isAc: true,
    isPremium: false,
    maxPassengers: 4,
  },
  {
    id: '4',
    operatorName: 'Home Travels',
    carName: 'Honda City',
    carType: 'Sedan',
    duration: '8h 20m',
    rating: 4.2,
    reviewCount: 167,
    fare: 1100,
    seatsLeft: 4,
    amenities: ['wifi', 'power', 'ac'],
    image: Car4,
    isAc: true,
    isPremium: false,
    maxPassengers: 4,
  },
];

const CarCard = ({ car, onViewDetails }: { car: Car; onViewDetails: (car: Car) => void }) => {
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
          onClick={() => onViewDetails(car)}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Vehicle Image - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:block lg:col-span-2">
          <img
            src={car.image}
            alt={car.carName}
            className="w-full h-20 object-cover rounded-md border border-border"
          />
        </div>

        {/* Car Info */}
        <div className="lg:col-span-6">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-foreground">{car.operatorName}</h3>
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span className="font-medium">{car.rating}</span>
              <span className="text-muted-foreground">({car.reviewCount})</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-2">{car.carName}</p>
          <p className="text-sm font-medium text-foreground mb-2">{car.carType}</p>
          <p className="text-sm text-muted-foreground mb-2">Duration: {car.duration}</p>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>Max {car.maxPassengers} passengers</span>
            </div>
            {car.isPremium && (
              <Badge className="bg-yellow-100 text-yellow-800">Premium</Badge>
            )}
          </div>
          
          {/* Vehicle Image on Mobile */}
          <div className="lg:hidden mb-3">
            <img
              src={car.image}
              alt={car.carName}
              className="w-full h-32 object-cover rounded-md border border-border"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {car.amenities.map((amenity, index) => (
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
            <p className="text-2xl font-bold text-foreground">₹ {car.fare}</p>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button 
              variant="outline" 
              size="lg"
              className="w-full border-2 hover:bg-muted/50 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(car);
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

export const CarList = () => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (car: Car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          {sampleCars.length} cars found
        </h2>
        <div className="text-sm text-muted-foreground">
          Showing cars from Bangalore to Chennai
        </div>
      </div>
      
      {sampleCars.map((car) => (
        <CarCard key={car.id} car={car} onViewDetails={handleViewDetails} />
      ))}

      <CarDetailsModal 
        car={selectedCar}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default CarList; 