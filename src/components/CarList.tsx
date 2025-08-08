import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui2/button';
import { Card } from '@/components/ui2/card';
import { Badge } from '@/components/ui2/badge';
import { Star, Wifi, Tv, Power, Car, Eye, Users, Shield, Armchair } from 'lucide-react';
import Car1 from '@/assets/Car1.webp';
import Car2 from '@/assets/Car2.png';
import Car3 from '@/assets/Car3.png';
import Car4 from '@/assets/Car4.webp';
import CarDetailsModal from './CarDetailsModal';

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
  totalSeats: number;
  isBooked?: boolean; // New property
  bookedDate?: string; // Optional
}

interface CarListProps {
  searchParams?: {
    from?: string;
    to?: string;
    date?: string;
    time?: string;
  };
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
    totalSeats: 6,
    isBooked: false,
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
    totalSeats: 7,
    isBooked: true,
    bookedDate: '2025-08-04',
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
    totalSeats: 4,
    isBooked: false,
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
    totalSeats: 4,
    isBooked: true,
    bookedDate: '2025-08-04',
  },
];

const CarCard = ({ car, onViewDetails, onBookNow }: { 
  car: Car; 
  onViewDetails: (car: Car) => void;
  onBookNow: (car: Car) => void;
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
      car.isBooked ? 'bg-red-50 border-red-200 cursor-not-allowed' : 'cursor-pointer'
    }`} 
          onClick={() => {
            if (!car.isBooked) {
              onViewDetails(car);
            }
          }}>
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
            <span className={`ml-2 px-2 py-0.5 rounded text-xs font-semibold ${car.isBooked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                              Available
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-2">{car.carName}</p>
          <p className="text-sm font-medium text-foreground mb-2">{car.carType}</p>
          <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
            <Armchair className="w-4 h-4 mr-1" />
            {car.totalSeats} Seater
          </p>
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
              disabled={car.isBooked}
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
            <Button 
              variant="default" 
              size="lg"
              disabled={car.isBooked}
              className={`w-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 ${
                car.isBooked 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-primary hover:bg-primary/90 text-white'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (!car.isBooked) {
                  onBookNow(car);
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

export const CarList = ({ searchParams }: CarListProps) => {
  const navigate = useNavigate();
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

  const handleBookNow = (car: Car) => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
      // Show booking confirmation message
      alert(`Booking Confirmed!
      
Vehicle: ${car.carName}
Operator: ${car.operatorName}
From: Bangalore to Chennai
Date: 2024-01-15
Time: 22:00
Passengers: 1
Total Fare: ₹${car.fare}
Seats: Front

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

  // Filter cars based on search date
  const filteredCars = sampleCars.map(car => {
    if (searchParams?.date && car.bookedDate === searchParams.date) {
      return { ...car, isBooked: true };
    }
    return car;
  });
  const availableCars = filteredCars.filter(car => !car.isBooked);
  const bookedCars = filteredCars.filter(car => car.isBooked);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          {filteredCars.length} cars found
        </h2>
        <div className="text-sm text-muted-foreground">
          Showing cars from Bangalore to Chennai
        </div>
      </div>
      {/* Available Cars */}
      {availableCars.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Available Cars ({availableCars.length})
          </h3>
          {availableCars.map((car) => (
            <CarCard key={car.id} car={car} onViewDetails={handleViewDetails} onBookNow={handleBookNow} />
          ))}
        </div>
      )}

      <CarDetailsModal 
        car={selectedCar}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default CarList; 