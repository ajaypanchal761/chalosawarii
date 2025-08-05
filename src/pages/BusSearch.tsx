import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import TopNavigation from '@/components/TopNavigation';
import BusList from '@/components/BusList';
import FilterSidebar from '@/components/FilterSidebar';

const BusSearch = () => {
  const isMobile = useIsMobile();
  const [isFilterOpen, setIsFilterOpen] = useState(!isMobile);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Bus Search Results</h1>
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

          {/* Bus List */}
          <div className="lg:col-span-3">
            <BusList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusSearch; 