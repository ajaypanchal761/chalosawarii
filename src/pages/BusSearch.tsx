import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import TopNavigation from '@/components/TopNavigation';
import BusList from '@/components/BusList';
import CarList from '@/components/CarList';
import TravellerList from '@/components/TravellerList';
import FilterSidebar from '@/components/FilterSidebar';
import TravellerLogo from '@/assets/Traveller.png';
import CarBar from '@/assets/CarBar.png';
import BusBar from '@/assets/BusBar.png';

const BusSearch = () => {
  const isMobile = useIsMobile();
  const [isFilterOpen, setIsFilterOpen] = useState(!isMobile);
  const [selectedType, setSelectedType] = useState<'bus' | 'car' | 'traveller'>('bus');

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleLogoClick = (type: 'bus' | 'car' | 'traveller') => {
    setSelectedType(type);
  };

  const renderList = () => {
    switch (selectedType) {
      case 'car':
        return <CarList />;
      case 'traveller':
        return <TravellerList />;
      case 'bus':
      default:
        return <BusList />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />
      {/* Logo Grid Section */}
      <div className="bg-white py-6 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 divide-x divide-gray-300">
            <div 
              className={`flex items-center justify-center p-4 rounded-l-lg border border-gray-200 cursor-pointer transition-all duration-200 ${
                selectedType === 'bus' 
                  ? 'bg-blue-50 border-blue-300 shadow-md' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => handleLogoClick('bus')}
            >
              <img src={BusBar} alt="Bus Logo" className="h-16 w-auto object-contain" />
            </div>
            <div 
              className={`flex items-center justify-center p-4 border-t border-b border-gray-200 cursor-pointer transition-all duration-200 ${
                selectedType === 'car' 
                  ? 'bg-blue-50 border-blue-300 shadow-md' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => handleLogoClick('car')}
            >
              <img src={CarBar} alt="Car Bar" className="h-16 w-auto object-contain" />
            </div>
            <div 
              className={`flex items-center justify-center p-4 rounded-r-lg border border-gray-200 cursor-pointer transition-all duration-200 ${
                selectedType === 'traveller' 
                  ? 'bg-blue-50 border-blue-300 shadow-md' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => handleLogoClick('traveller')}
            >
              <img src={TravellerLogo} alt="Traveller" className="h-16 w-auto object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <FilterSidebar 
              isOpen={isFilterOpen} 
              onToggle={toggleFilter}
            />
          </div>

          {/* List Content */}
          <div className="lg:col-span-3">
            {renderList()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusSearch; 