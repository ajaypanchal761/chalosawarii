import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';
import TopNavigation from '@/components/TopNavigation';
import BusList from '@/components/BusList';
import CarList from '@/components/CarList';
import TravellerList from '@/components/TravellerList';
import FilterSidebar from '@/components/FilterSidebar';
import TravellerLogo from '@/assets/Traveller.png';
import CarBar from '@/assets/CarBar.png';
import BusBar from '@/assets/BusBar.png';
import BusHover from '@/assets/BusHover.png';
import CarBarHover from '@/assets/CarBarHover.png';
import TravellerHover from '@/assets/TravellerHover.png';

const BusSearch = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isFilterOpen, setIsFilterOpen] = useState(!isMobile);
  const [selectedType, setSelectedType] = useState<'bus' | 'car' | 'traveller'>('bus');

  // Get search parameters from hero section
  const searchParams = location.state || {};
  const { from, to, date } = searchParams;

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleLogoClick = (type: 'bus' | 'car' | 'traveller') => {
    setSelectedType(type);
  };

  const renderList = () => {
    switch (selectedType) {
      case 'car':
        return <CarList searchParams={searchParams} />;
      case 'traveller':
        return <TravellerList searchParams={searchParams} />;
      case 'bus':
      default:
        return <BusList searchParams={searchParams} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <TopNavigation />
      
      {/* Logo Grid Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-4 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-1">
          {/* Mobile: horizontal scroll, Desktop: grid */}
          <div className="flex lg:grid lg:grid-cols-3 gap-2 lg:gap-0 overflow-x-auto scrollbar-hide rounded-2xl shadow-xl bg-white divide-x-0 lg:divide-x lg:overflow-visible">
            {/* Bus Logo */}
            <div 
              className={`flex flex-col items-center justify-center p-3 min-w-[110px] cursor-pointer transition-all duration-300 ${
                selectedType === 'bus' 
                  ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-xl transform scale-105' 
                  : 'bg-white hover:bg-blue-50 hover:shadow-md'
              }`}
              onClick={() => handleLogoClick('bus')}
            >
              <img src={selectedType === 'bus' ? BusHover : BusBar} alt="Bus Logo" 
                className={` h-16 w-auto object-contain transition-all duration-300  ${
                  selectedType === 'bus' ? 'drop-shadow-lg' : ''
                }`}
              />
              <span className={`text-sm font-bold mt-1 ${selectedType === 'bus' ? 'text-white' : 'text-gray-800'}`}>Bus</span>
            </div>
            {/* Car Logo */}
            <div 
              className={`flex flex-col items-center justify-center p-3 min-w-[110px] cursor-pointer transition-all duration-300 ${
                selectedType === 'car' 
                  ? 'bg-gradient-to-br from-green-500 to-green-700 text-white shadow-xl transform scale-105' 
                  : 'bg-white hover:bg-green-50 hover:shadow-md'
              }`}
              onClick={() => handleLogoClick('car')}
            >
              <img 
                src={selectedType === 'car' ? CarBarHover : CarBar} 
                alt="Car Bar" 
                className={`h-16 w-auto object-contain transition-all duration-300 ${
                  selectedType === 'car' ? 'drop-shadow-lg' : ''
                }`}
              />
              <span className={`text-sm font-bold mt-1 ${selectedType === 'car' ? 'text-white' : 'text-gray-800'}`}>Car</span>
            </div>
            {/* Traveller Logo */}
            <div 
              className={`flex flex-col items-center justify-center p-3 min-w-[110px] cursor-pointer transition-all duration-300 ${
                selectedType === 'traveller' 
                  ? 'bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-xl transform scale-105' 
                  : 'bg-white hover:bg-purple-50 hover:shadow-md'
              }`}
              onClick={() => handleLogoClick('traveller')}
            >
              <img 
                src={selectedType === 'traveller' ? TravellerHover : TravellerLogo} 
                alt="Traveller" 
                className={`h-16 w-auto object-contain transition-all duration-300 ${
                  selectedType === 'traveller' ? 'drop-shadow-lg' : ''
                }`}
              />
              <span className={`text-sm font-bold mt-1 ${selectedType === 'traveller' ? 'text-white' : 'text-gray-800'}`}>Traveller</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        {/* Mobile Layout */}
        {isMobile ? (
          <div className="space-y-4">
            {/* Filter Sidebar for Mobile - Redbus.in style */}
            <div className="mb-2">
              <FilterSidebar 
                isOpen={isFilterOpen} 
                onToggle={toggleFilter}
              />
            </div>
            {/* List Content for Mobile */}
            <div className="bg-white rounded-xl shadow-lg p-2 sm:p-4">
              {renderList()}
            </div>
          </div>
        ) : (
          /* Desktop Layout */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filter Sidebar */}
            <div className="lg:col-span-1">
              <FilterSidebar 
                isOpen={isFilterOpen} 
                onToggle={toggleFilter}
              />
            </div>
            {/* List Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-lg p-6">
                {renderList()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusSearch;