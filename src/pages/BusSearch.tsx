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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <TopNavigation />
      
      {/* Logo Grid Section */}
      <div className="bg-white py-6 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 divide-x divide-gray-300 rounded-xl overflow-hidden shadow-lg">
            <div 
              className={`flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-300 ${
                selectedType === 'bus' 
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105' 
                  : 'bg-white hover:bg-gray-50'
              }`}
              onClick={() => handleLogoClick('bus')}
            >
              <img src={BusBar} alt="Bus Logo" className="h-16 w-auto object-contain mb-2" />
              <span className={`text-sm font-semibold ${selectedType === 'bus' ? 'text-white' : 'text-black'}`}>
                <b>Bus</b>
              </span>
            </div>
            <div 
              className={`flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-300 ${
                selectedType === 'car' 
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105' 
                  : 'bg-white hover:bg-gray-50'
              }`}
              onClick={() => handleLogoClick('car')}
            >
              <img src={CarBar} alt="Car Bar" className="h-16 w-auto object-contain mb-2" />
              <span className={`text-sm font-semibold ${selectedType === 'car' ? 'text-white' : 'text-black'}`}>
                <b>Car</b>
              </span>
            </div>
            <div 
              className={`flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-300 ${
                selectedType === 'traveller' 
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105' 
                  : 'bg-white hover:bg-gray-50'
              }`}
              onClick={() => handleLogoClick('traveller')}
            >
              <img src={TravellerLogo} alt="Traveller" className="h-16 w-auto object-contain mb-2" />
              <span className={`text-sm font-semibold ${selectedType === 'traveller' ? 'text-white' : 'text-black'}`}>
                <b>Traveller</b>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Mobile Layout */}
        {isMobile ? (
          <div className="space-y-4">
            {/* Filter Sidebar for Mobile - Redbus.in style */}
            <FilterSidebar 
              isOpen={isFilterOpen} 
              onToggle={toggleFilter}
            />
            
            {/* List Content for Mobile */}
            <div className="bg-white rounded-xl shadow-lg p-4">
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