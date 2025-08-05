import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';
import TopNavigation from '@/components/TopNavigation';
import BusList from '@/components/BusList';
import FilterSidebar from '@/components/FilterSidebar';
import { Button } from '@/components/ui2/button';
import { Input } from '@/components/ui2/input';
import { Card } from '@/components/ui2/card';
import { Calendar, MapPin, Search, Filter } from 'lucide-react';

const BusSearch = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isFilterOpen, setIsFilterOpen] = useState(!isMobile);
  
  // Get search parameters from navigation state
  const searchParams = location.state || {};
  const [fromLocation, setFromLocation] = useState(searchParams.from || '');
  const [toLocation, setToLocation] = useState(searchParams.to || '');
  const [departureDate, setDepartureDate] = useState(searchParams.date || new Date().toISOString().split('T')[0]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4">Bus Search</h1>
          
          {/* Search Form */}
          <Card className="p-4 bg-background">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Departure City" 
                    className="pl-10"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Arrival City" 
                    className="pl-10"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    type="date" 
                    className="pl-10"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">&nbsp;</label>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Search className="w-4 h-4 mr-2" />
                  Search Buses
                </Button>
              </div>
            </div>
          </Card>
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