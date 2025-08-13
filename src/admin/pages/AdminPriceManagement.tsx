import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/admin/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus,
  Edit,
  Settings
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Type definitions for pricing structures
interface DistanceBasedPricing {
  '50km': number;
  '100km': number;
  '150km': number;
  '200km': number;
}

interface SimplePricing {
  [key: string]: number;
}

interface VehiclePricing {
  'auto-ricksaw': SimplePricing;
  'car': SimplePricing;
  'bus': { [key: string]: DistanceBasedPricing };
}

interface CarVariantPricing {
  [carType: string]: {
    [variant: string]: DistanceBasedPricing;
  };
}



const AdminPriceManagement = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<'auto-ricksaw' | 'car' | 'bus' | ''>('');
  const [prices, setPrices] = useState<VehiclePricing>({
    'auto-ricksaw': {
      'Fuel Auto-Ricksaw': 30,
      'Electric Auto-Ricksaw': 35,
      'CNG Auto-Ricksaw': 32,
    },
    'car': {
      'Sedan': 40,
      'Hatchback': 35,
      'SUV': 50,
    },
    'bus': {
      'AC Sleeper': { '50km': 120, '100km': 115, '150km': 110, '200km': 105 },
      'Non-AC Sleeper': { '50km': 100, '100km': 95, '150km': 90, '200km': 85 },
      '52-Seater AC/Non-AC': { '50km': 90, '100km': 85, '150km': 80, '200km': 75 },
      '40-Seater AC/Non-AC': { '50km': 85, '100km': 80, '150km': 75, '200km': 70 },
      '32-Seater AC/Non-AC': { '50km': 80, '100km': 75, '150km': 70, '200km': 65 },
      '26-Seater AC/Non-AC': { '50km': 75, '100km': 70, '150km': 65, '200km': 60 },
      '17-Seater AC/Non-AC': { '50km': 70, '100km': 65, '150km': 60, '200km': 55 },
    }
  });

  // Car variants with distance-based pricing
  const [carVariantPrices, setCarVariantPrices] = useState<CarVariantPricing>({
    'sedan': {
      'Honda Amaze': { '50km': 42, '100km': 40, '150km': 38, '200km': 35 },
      'Swift Dzire': { '50km': 40, '100km': 38, '150km': 36, '200km': 34 },
      'Ertiga': { '50km': 45, '100km': 43, '150km': 41, '200km': 39 },
      'Hundai Aura': { '50km': 38, '100km': 36, '150km': 34, '200km': 32 },
      'Honda City': { '50km': 48, '100km': 46, '150km': 44, '200km': 42 },
      'Ciaz': { '50km': 50, '100km': 48, '150km': 46, '200km': 44 },
      'Xcent Hundai': { '50km': 35, '100km': 33, '150km': 31, '200km': 29 },
    },
    'hatchback': {
      'Wagon R': { '50km': 32, '100km': 30, '150km': 28, '200km': 26 },
      'Swift': { '50km': 35, '100km': 33, '150km': 31, '200km': 29 },
      'Tiago': { '50km': 30, '100km': 28, '150km': 26, '200km': 24 },
      'Renault Climber': { '50km': 33, '100km': 31, '150km': 29, '200km': 27 },
    },
    'suv': {
      'Scorpio N': { '50km': 55, '100km': 53, '150km': 51, '200km': 49 },
      'Bolero': { '50km': 45, '100km': 43, '150km': 41, '200km': 39 },
      'Inova Crysta': { '50km': 58, '100km': 56, '150km': 54, '200km': 52 },
      'Fortuner': { '50km': 75, '100km': 73, '150km': 71, '200km': 69 },
      'Renault Triber': { '50km': 48, '100km': 46, '150km': 44, '200km': 42 },
    }
  });
  const [editPrices, setEditPrices] = useState(prices);
  const [editCarVariantPrices, setEditCarVariantPrices] = useState(carVariantPrices);
  const [isEditingPrices, setIsEditingPrices] = useState(false);
  const [isEditingCarVariants, setIsEditingCarVariants] = useState(false);
  const [priceCalculator, setPriceCalculator] = useState({
    departure: "Delhi",
    destination: "Mumbai",
    distance: 1400, // in kilometers
    vehicleType: "Sedan" as string
  });

  const handlePriceChange = (category: 'auto-ricksaw' | 'car' | 'bus', vehicleType: string, distance: string, value: string) => {
    setEditPrices((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [vehicleType]: category === 'auto-ricksaw' 
          ? Number(value) // Simple pricing for auto-ricksaw
          : { // Distance-based pricing for bus and car
              ...(prev[category][vehicleType] as any),
              [distance]: Number(value)
            }
      }
    }));
  };

  const handleCarVariantPriceChange = (carType: string, variant: string, distance: string, value: string) => {
    setEditCarVariantPrices((prev) => ({
      ...prev,
      [carType]: {
        ...prev[carType as keyof typeof prev],
        [variant]: {
          ...(prev[carType as keyof typeof prev][variant] as any),
          [distance]: Number(value)
        }
      }
    }));
  };

  const handleCalculatorChange = (field: string, value: string) => {
    setPriceCalculator((prev) => ({ ...prev, [field]: value }));
  };

  const calculateFare = () => {
    // First check if it's a car variant
    for (const carType in carVariantPrices) {
      if (carVariantPrices[carType as keyof typeof carVariantPrices] && 
          priceCalculator.vehicleType in (carVariantPrices[carType as keyof typeof carVariantPrices] as any)) {
        const variantPrices = (carVariantPrices[carType as keyof typeof carVariantPrices] as any)[priceCalculator.vehicleType];
        
        // Determine which distance bracket to use
        let rate = variantPrices['200km']; // default to highest distance
        if (priceCalculator.distance <= 50) {
          rate = variantPrices['50km'];
        } else if (priceCalculator.distance <= 100) {
          rate = variantPrices['100km'];
        } else if (priceCalculator.distance <= 150) {
          rate = variantPrices['150km'];
        } else if (priceCalculator.distance <= 200) {
          rate = variantPrices['200km'];
        }
        
        return rate * priceCalculator.distance;
      }
    }
    
    // If not a car variant, check main categories
    for (const category in prices) {
      if (prices[category as keyof typeof prices] && 
          typeof prices[category as keyof typeof prices] === 'object' &&
          priceCalculator.vehicleType in (prices[category as keyof typeof prices] as any)) {
        const variantPrices = (prices[category as keyof typeof prices] as any)[priceCalculator.vehicleType];
        
        // Check if it's distance-based pricing
        if (typeof variantPrices === 'object' && variantPrices !== null) {
          // Determine which distance bracket to use
          let rate = variantPrices['200km']; // default to highest distance
          if (priceCalculator.distance <= 50) {
            rate = variantPrices['50km'];
          } else if (priceCalculator.distance <= 100) {
            rate = variantPrices['100km'];
          } else if (priceCalculator.distance <= 150) {
            rate = variantPrices['150km'];
          } else if (priceCalculator.distance <= 200) {
            rate = variantPrices['200km'];
          }
          return rate * priceCalculator.distance;
        } else {
          // Simple pricing (fallback)
          return variantPrices * priceCalculator.distance;
        }
      }
    }
    
    return 0;
  };

  const savePrices = () => {
    setPrices(editPrices);
    setIsEditingPrices(false);
    toast({ title: 'Prices updated successfully!' });
  };

  const saveCarVariantPrices = () => {
    setCarVariantPrices(editCarVariantPrices);
    setIsEditingCarVariants(false);
    toast({ title: 'Car variant prices updated successfully!' });
  };

  useEffect(() => {
    const checkAuth = () => {
      const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
      if (!isAdminLoggedIn) {
        navigate('/admin/login');
        return;
      }
      setIsLoggedIn(true);
    };

    checkAuth();
  }, [navigate]);





  if (!isLoggedIn) {
    return null;
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Price Management</h1>
        <p className="text-sm md:text-base text-gray-600">Manage vehicle prices and fare calculations</p>
      </div>

      {/* Vehicle Category Selection */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Select Vehicle Category to Manage Prices</h2>
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => setSelectedCategory('auto-ricksaw')}
            className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${
              selectedCategory === 'auto-ricksaw'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="text-2xl mb-2">🛺</div>
            <div className="font-medium">Auto-Ricksaw</div>
          </button>
          <button
            onClick={() => setSelectedCategory('car')}
            className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${
              selectedCategory === 'car'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="text-2xl mb-2">🚗</div>
            <div className="font-medium">Car</div>
          </button>
          <button
            onClick={() => setSelectedCategory('bus')}
            className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${
              selectedCategory === 'bus'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="text-2xl mb-2">🚌</div>
            <div className="font-medium">Bus</div>
          </button>
        </div>
      </div>

      {/* Price Management Section */}
      <div className={`grid gap-6 md:gap-8 mb-6 md:mb-8 ${
        selectedCategory === 'car' ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'
      }`}>
        {/* Price Settings - Only show for Auto-Ricksaw */}
        {selectedCategory === 'auto-ricksaw' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Auto-Ricksaw Price Settings</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditingPrices ? (
                <div className="space-y-4">
                  {Object.entries(prices[selectedCategory]).map(([vehicleType, price]) => (
                    <div key={vehicleType}>
                      <Label htmlFor={`${vehicleType}-price`}>{vehicleType} Price (per km)</Label>
                      <Input
                        id={`${vehicleType}-price`}
                        type="number"
                        value={editPrices[selectedCategory][vehicleType]}
                        onChange={(e) => handlePriceChange(selectedCategory, vehicleType, 'base', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  ))}
                  <div className="flex space-x-2">
                    <Button onClick={() => setIsEditingPrices(false)} variant="outline">
                      Cancel
                    </Button>
                    <Button onClick={() => {
                      setPrices(editPrices);
                      setIsEditingPrices(false);
                      toast({
                        title: "Prices Updated",
                        description: "Auto-Ricksaw prices have been updated successfully",
                        variant: "default",
                      });
                    }}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(prices[selectedCategory]).map(([vehicleType, price]) => (
                    <div key={vehicleType} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{vehicleType}</span>
                      <span className="text-lg font-bold">₹{price}/km</span>
                    </div>
                  ))}
                  <Button onClick={() => setIsEditingPrices(true)} className="w-full">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Prices
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Bus Variant Prices - Only show when bus category is selected */}
        {selectedCategory === 'bus' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Bus Variant Prices</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditingPrices ? (
                <div className="space-y-4">
                  {Object.entries(prices[selectedCategory]).map(([vehicleType, distancePrices]) => (
                    <div key={vehicleType} className="border border-gray-100 rounded-lg p-3">
                      <h5 className="font-medium text-gray-700 mb-2">{vehicleType}</h5>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(distancePrices as any).map(([distance, price]) => (
                          <div key={distance}>
                            <Label htmlFor={`${vehicleType}-${distance}`}>{distance}</Label>
                            <Input
                              id={`${vehicleType}-${distance}`}
                              type="number"
                              value={editPrices[selectedCategory][vehicleType][distance as keyof typeof distancePrices]}
                              onChange={(e) => handlePriceChange(selectedCategory, vehicleType, distance, e.target.value)}
                              className="mt-1"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="flex space-x-2">
                    <Button onClick={() => setIsEditingPrices(false)} variant="outline">
                      Cancel
                    </Button>
                    <Button onClick={() => {
                      setPrices(editPrices);
                      setIsEditingPrices(false);
                      toast({
                        title: "Prices Updated",
                        description: "Bus prices have been updated successfully",
                        variant: "default",
                      });
                    }}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Distance Headers - Hidden on mobile */}
                  <div className="hidden md:grid grid-cols-5 gap-2 mb-3">
                    <div className="text-xs font-medium text-gray-500">Bus Type</div>
                    <div className="text-xs font-medium text-gray-500 text-center">50km</div>
                    <div className="text-xs font-medium text-gray-500 text-center">100km</div>
                    <div className="text-xs font-medium text-gray-500 text-center">150km</div>
                    <div className="text-xs font-medium text-gray-500 text-center">200km</div>
                  </div>
                  
                  {/* Desktop View */}
                  <div className="hidden md:space-y-2">
                    {Object.entries(prices[selectedCategory]).map(([vehicleType, distancePrices]) => (
                      <div key={vehicleType} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="w-1/5 font-medium text-gray-700">{vehicleType}</div>
                        <div className="w-1/5 text-center text-sm font-bold text-blue-600">₹{(distancePrices as any)['50km']}/km</div>
                        <div className="w-1/5 text-center text-sm font-bold text-blue-600">₹{(distancePrices as any)['100km']}/km</div>
                        <div className="w-1/5 text-center text-sm font-bold text-blue-600">₹{(distancePrices as any)['150km']}/km</div>
                        <div className="w-1/5 text-center text-sm font-bold text-blue-600">₹{(distancePrices as any)['200km']}/km</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Mobile View */}
                  <div className="md:hidden space-y-3">
                    {Object.entries(prices[selectedCategory]).map(([vehicleType, distancePrices]) => (
                      <div key={vehicleType} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                        <h5 className="font-medium text-gray-700 mb-2 text-sm">{vehicleType}</h5>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex justify-between items-center p-2 bg-white rounded">
                            <span className="text-xs text-gray-600">50km</span>
                            <span className="text-sm font-bold text-blue-600">₹{(distancePrices as any)['50km']}/km</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded">
                            <span className="text-xs text-gray-600">100km</span>
                            <span className="text-sm font-bold text-blue-600">₹{(distancePrices as any)['100km']}/km</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded">
                            <span className="text-xs text-gray-600">150km</span>
                            <span className="text-sm font-bold text-blue-600">₹{(distancePrices as any)['150km']}/km</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded">
                            <span className="text-xs text-gray-600">200km</span>
                            <span className="text-sm font-bold text-blue-600">₹{(distancePrices as any)['200km']}/km</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button onClick={() => setIsEditingPrices(true)} className="w-full">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Bus Variant Prices
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

                {/* Car Variant Prices - Only show when car category is selected */}
        {selectedCategory === 'car' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Car Variant Prices</CardTitle>
            </CardHeader>
            <CardContent>


              {isEditingCarVariants ? (
                <div className="space-y-4">
                  {Object.entries(carVariantPrices).map(([carType, variants]) => (
                    <div key={carType} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3 capitalize">{carType} Models</h4>
                      <div className="space-y-3">
                        {Object.entries(variants).map(([variant, distancePrices]) => (
                          <div key={variant} className="border border-gray-100 rounded-lg p-3">
                            <h5 className="font-medium text-gray-700 mb-2">{variant}</h5>
                            <div className="grid grid-cols-2 gap-2">
                              {Object.entries(distancePrices as any).map(([distance, price]) => (
                                <div key={distance}>
                                  <Label htmlFor={`${carType}-${variant}-${distance}`}>{distance}</Label>
                                  <Input
                                    id={`${carType}-${variant}-${distance}`}
                                    type="number"
                                    value={editCarVariantPrices[carType as keyof typeof editCarVariantPrices][variant][distance as keyof typeof distancePrices]}
                                    onChange={(e) => handleCarVariantPriceChange(carType, variant, distance, e.target.value)}
                                    className="mt-1"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="flex space-x-2">
                    <Button onClick={() => setIsEditingCarVariants(false)} variant="outline">
                      Cancel
                    </Button>
                    <Button onClick={saveCarVariantPrices}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(carVariantPrices).map(([carType, variants]) => (
                    <div key={carType} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3 capitalize">{carType} Models</h4>
                      
                      {/* Distance Headers - Hidden on mobile */}
                      <div className="hidden md:grid grid-cols-5 gap-2 mb-3">
                        <div className="text-xs font-medium text-gray-500">Model</div>
                        <div className="text-xs font-medium text-gray-500 text-center">50km</div>
                        <div className="text-xs font-medium text-gray-500 text-center">100km</div>
                        <div className="text-xs font-medium text-gray-500 text-center">150km</div>
                        <div className="text-xs font-medium text-gray-500 text-center">200km</div>
                      </div>
                      
                      {/* Desktop View */}
                      <div className="hidden md:space-y-2">
                        {Object.entries(variants as any).map(([variant, distancePrices]) => (
                          <div key={variant} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="w-1/5 font-medium text-gray-700">{variant}</div>
                            <div className="w-1/5 text-center text-sm font-bold text-blue-600">₹{(distancePrices as any)['50km']}/km</div>
                            <div className="w-1/5 text-center text-sm font-bold text-blue-600">₹{(distancePrices as any)['100km']}/km</div>
                            <div className="w-1/5 text-center text-sm font-bold text-blue-600">₹{(distancePrices as any)['150km']}/km</div>
                            <div className="w-1/5 text-center text-sm font-bold text-blue-600">₹{(distancePrices as any)['200km']}/km</div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Mobile View */}
                      <div className="md:hidden space-y-3">
                        {Object.entries(variants as any).map(([variant, distancePrices]) => (
                          <div key={variant} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                            <h5 className="font-medium text-gray-700 mb-2 text-sm">{variant}</h5>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex justify-between items-center p-2 bg-white rounded">
                                <span className="text-xs text-gray-600">50km</span>
                                <span className="text-sm font-bold text-blue-600">₹{(distancePrices as any)['50km']}/km</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-white rounded">
                                <span className="text-xs text-gray-600">100km</span>
                                <span className="text-sm font-bold text-blue-600">₹{(distancePrices as any)['100km']}/km</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-white rounded">
                                <span className="text-xs text-gray-600">150km</span>
                                <span className="text-sm font-bold text-blue-600">₹{(distancePrices as any)['150km']}/km</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-white rounded">
                                <span className="text-xs text-gray-600">200km</span>
                                <span className="text-sm font-bold text-blue-600">₹{(distancePrices as any)['200km']}/km</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Button onClick={() => setIsEditingCarVariants(true)} className="w-full">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Car Variant Prices
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Fare Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Fare Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="departure">From</Label>
                <Input
                  id="departure"
                  value={priceCalculator.departure}
                  onChange={(e) => handleCalculatorChange('departure', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="destination">To</Label>
                <Input
                  id="destination"
                  value={priceCalculator.destination}
                  onChange={(e) => handleCalculatorChange('destination', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="distance">Distance (km)</Label>
                <Input
                  id="distance"
                  type="number"
                  value={priceCalculator.distance}
                  onChange={(e) => handleCalculatorChange('distance', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="vehicle-type">Vehicle Type</Label>
                <Select
                  value={priceCalculator.vehicleType}
                  onValueChange={(value) => handleCalculatorChange('vehicleType', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto-ricksaw" disabled>-- Auto-Ricksaw --</SelectItem>
                    {Object.entries(prices['auto-ricksaw']).map(([type, price]) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                    
                    <SelectItem value="car" disabled>-- Car Types --</SelectItem>
                    {Object.entries(prices.car).map(([type, price]) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                    
                    <SelectItem value="car-variants" disabled>-- Car Models --</SelectItem>
                    {Object.entries(carVariantPrices).map(([carType, variants]) => 
                      Object.entries(variants as any).map(([variant, distancePrices]) => (
                        <SelectItem key={variant} value={variant}>{variant}</SelectItem>
                      ))
                    ).flat()}
                    
                    <SelectItem value="bus" disabled>-- Bus Types --</SelectItem>
                    {Object.entries(prices.bus).map(([type, price]) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Estimated Fare</p>
                  <p className="text-2xl font-bold text-blue-600">₹{calculateFare().toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>  
    </AdminLayout>
  );
};

export default AdminPriceManagement; 