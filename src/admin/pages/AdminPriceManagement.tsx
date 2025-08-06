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



const AdminPriceManagement = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [prices, setPrices] = useState({
    car: 40,
    bus: 80,
    traveller: 60,
  });
  const [editPrices, setEditPrices] = useState(prices);
  const [isEditingPrices, setIsEditingPrices] = useState(false);
  const [priceCalculator, setPriceCalculator] = useState({
    departure: "Delhi",
    destination: "Mumbai",
    distance: 1400, // in kilometers
    vehicleType: "car" as 'car' | 'bus' | 'traveller'
  });

  const handlePriceChange = (type: 'car' | 'bus' | 'traveller', value: string) => {
    setEditPrices((prev) => ({ ...prev, [type]: Number(value) }));
  };

  const handleCalculatorChange = (field: string, value: string) => {
    setPriceCalculator((prev) => ({ ...prev, [field]: value }));
  };

  const calculateFare = () => {
    const rate = prices[priceCalculator.vehicleType];
    const totalFare = rate * priceCalculator.distance;
    return totalFare;
  };

  const savePrices = () => {
    setPrices(editPrices);
    setIsEditingPrices(false);
    toast({ title: 'Prices updated successfully!' });
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

      {/* Price Management Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
        {/* Price Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Price Settings</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditingPrices ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="car-price">Car Price (per km)</Label>
                  <Input
                    id="car-price"
                    type="number"
                    value={editPrices.car}
                    onChange={(e) => handlePriceChange('car', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="bus-price">Bus Price (per km)</Label>
                  <Input
                    id="bus-price"
                    type="number"
                    value={editPrices.bus}
                    onChange={(e) => handlePriceChange('bus', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="traveller-price">Traveller Price (per km)</Label>
                  <Input
                    id="traveller-price"
                    type="number"
                    value={editPrices.traveller}
                    onChange={(e) => handlePriceChange('traveller', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={() => setIsEditingPrices(false)} variant="outline">
                    Cancel
                  </Button>
                  <Button onClick={() => {
                    setPrices(editPrices);
                    setIsEditingPrices(false);
                    toast({
                      title: "Prices Updated",
                      description: "Vehicle prices have been updated successfully",
                      variant: "default",
                    });
                  }}>
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Car</span>
                  <span className="text-lg font-bold">₹{prices.car}/km</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Bus</span>
                  <span className="text-lg font-bold">₹{prices.bus}/km</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Traveller</span>
                  <span className="text-lg font-bold">₹{prices.traveller}/km</span>
                </div>
                <Button onClick={() => setIsEditingPrices(true)} className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Prices
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

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
                    <SelectItem value="car">Car</SelectItem>
                    <SelectItem value="bus">Bus</SelectItem>
                    <SelectItem value="traveller">Traveller</SelectItem>
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