import React, { useState } from 'react';
import { Card } from '@/components/ui2/card';
import { Checkbox } from '@/components/ui2/checkbox';
import { Label } from '@/components/ui2/label';
import { Separator } from '@/components/ui2/separator';
import { Button } from '@/components/ui2/button';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterSidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export const FilterSidebar = ({ isOpen = true, onToggle }: FilterSidebarProps) => {
  const [expandedSections, setExpandedSections] = useState({
    departureTime: true,
    busType: true,
    operators: true,
    amenities: false,
    busPartner: false,
  });

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const departureTimeOptions: FilterOption[] = [
    { id: 'early-morning', label: 'Early Morning (4 AM - 8 AM)', count: 5 },
    { id: 'morning', label: 'Morning (8 AM - 12 PM)', count: 12 },
    { id: 'afternoon', label: 'Afternoon (12 PM - 6 PM)', count: 8 },
    { id: 'evening', label: 'Evening (6 PM - 10 PM)', count: 15 },
    { id: 'night', label: 'Night (10 PM - 4 AM)', count: 18 },
  ];

  const busTypeOptions: FilterOption[] = [
    { id: 'ac', label: 'AC', count: 25 },
    { id: 'non-ac', label: 'Non AC', count: 12 },
    { id: 'sleeper', label: 'Sleeper', count: 18 },
    { id: 'seater', label: 'Seater', count: 20 },
    { id: 'semi-sleeper', label: 'Semi Sleeper', count: 8 },
  ];

  const operatorOptions: FilterOption[] = [
    { id: 'redbus-travels', label: 'Redbus Travels', count: 8 },
    { id: 'srs-travels', label: 'SRS Travels', count: 6 },
    { id: 'kpn-travels', label: 'KPN Travels', count: 4 },
    { id: 'orange-travels', label: 'Orange Travels', count: 5 },
    { id: 'kallada-travels', label: 'Kallada Travels', count: 3 },
    { id: 'parveen-travels', label: 'Parveen Travels', count: 2 },
  ];

  const amenityOptions: FilterOption[] = [
    { id: 'wifi', label: 'WiFi', count: 15 },
    { id: 'charging-point', label: 'Charging Point', count: 22 },
    { id: 'entertainment', label: 'Entertainment', count: 12 },
    { id: 'blankets', label: 'Blankets', count: 8 },
    { id: 'pillow', label: 'Pillow', count: 6 },
    { id: 'water-bottle', label: 'Water Bottle', count: 10 },
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (filterId: string, checked: boolean) => {
    setSelectedFilters(prev => 
      checked 
        ? [...prev, filterId]
        : prev.filter(id => id !== filterId)
    );
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
  };

  const FilterSection = ({ 
    title, 
    options, 
    sectionKey 
  }: { 
    title: string; 
    options: FilterOption[]; 
    sectionKey: keyof typeof expandedSections;
  }) => (
    <div className="mb-6">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full py-2 text-left"
      >
        <h3 className="font-semibold text-foreground">{title}</h3>
        {expandedSections[sectionKey] ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      
      {expandedSections[sectionKey] && (
        <div className="mt-3 space-y-3">
          {options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                checked={selectedFilters.includes(option.id)}
                onCheckedChange={(checked) => 
                  handleFilterChange(option.id, checked as boolean)
                }
              />
              <Label
                htmlFor={option.id}
                className="text-sm text-foreground cursor-pointer flex-1"
              >
                {option.label}
              </Label>
              {option.count && (
                <span className="text-xs text-muted-foreground">({option.count})</span>
              )}
            </div>
          ))}
        </div>
      )}
      <Separator className="mt-4" />
    </div>
  );

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={onToggle}
        className="mb-4 lg:hidden"
      >
        <Filter className="w-4 h-4 mr-2" />
        Show Filters
      </Button>
    );
  }

  return (
    <Card className="p-4 h-fit sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Filter className="w-5 h-5" />
          FILTERS
        </h2>
        {selectedFilters.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-primary hover:text-primary/80"
          >
            Clear All
          </Button>
        )}
      </div>

      {selectedFilters.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {selectedFilters.length} filter(s) applied
          </p>
          <Separator className="mt-2" />
        </div>
      )}

      <div className="space-y-0">
        <FilterSection
          title="DEPARTURE TIME"
          options={departureTimeOptions}
          sectionKey="departureTime"
        />

        <FilterSection
          title="BUS TYPE"
          options={busTypeOptions}
          sectionKey="busType"
        />

        <FilterSection
          title="OPERATORS"
          options={operatorOptions}
          sectionKey="operators"
        />

        <FilterSection
          title="AMENITIES"
          options={amenityOptions}
          sectionKey="amenities"
        />
      </div>

      {/* Mobile close button */}
      <div className="lg:hidden mt-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={onToggle}
        >
          Apply Filters
        </Button>
      </div>
    </Card>
  );
};

export default FilterSidebar; 