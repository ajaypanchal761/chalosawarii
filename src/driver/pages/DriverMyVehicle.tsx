import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DriverTopNavigation from "@/driver/components/DriverTopNavigation";
import { Home, MessageSquare, Car, User, Plus, Edit, Trash2, MapPin, Calendar, Fuel, Settings, CheckCircle, AlertCircle, Search, Filter, Upload, ChevronLeft, ChevronRight, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { toast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface Vehicle {
  id: string;
  name: string;
  type: string;
  carVariant?: string; // Optional field for car variants
  model: string;
  year: string;
  registrationNumber: string;
  color: string;
  fuelType: string;
  capacity: number;
  status: 'active' | 'inactive' | 'maintenance';
  lastService: string;
  nextService: string;
  totalRides: number;
  rating: number;
  images: string[]; // Changed from single image to array of images
  basePrice: number;
}

const DriverMyVehicle = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("myvehicle");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [viewingVehicle, setViewingVehicle] = useState<Vehicle | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});
  const [detailImageIndex, setDetailImageIndex] = useState(0);

  // Car variants based on our FilterSidebar structure
  const carVariantOptions = {
    'Sedan': [
      'Honda Amaze', 'Swift Dzire', 'Ertiga', 'Hundai Aura', 
      'Honda City', 'Ciaz', 'Xcent Hundai'
    ],
    'Hatchback': [
      'Wagon R', 'Swift', 'Tiago', 'Renault Climber'
    ],
    'SUV': [
      'Scorpio N', 'Bolero', 'Scorpio Classic', 'Inova Crysta', 
      'Fortuner', 'Renault Triber'
    ]
  };
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: "1",
      name: "Swift Dzire",
      type: "Sedan",
      model: "Swift Dzire VDI",
      year: "2020",
      registrationNumber: "DL-01-AB-1234",
      color: "White",
      fuelType: "Diesel",
      capacity: 4,
      status: 'active',
      lastService: "2024-01-15",
      nextService: "2024-04-15",
      totalRides: 156,
      rating: 4.8,
      images: ["/Car1.webp", "/Car2.png"],
      basePrice: 1200,

    },
    {
      id: "2",
      name: "Honda City",
      type: "Sedan",
      model: "Honda City VX",
      year: "2021",
      registrationNumber: "DL-02-CD-5678",
      color: "Silver",
      fuelType: "Petrol",
      capacity: 5,
      status: 'maintenance',
      lastService: "2024-02-20",
      nextService: "2024-05-20",
      totalRides: 89,
      rating: 4.6,
      images: ["/Car2.png", "/Car3.png"],
      basePrice: 1500,

    }
  ]);

  useEffect(() => {
    const initializeDriverModule = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Check if driver is logged in
        const driverLoggedIn = localStorage.getItem('isDriverLoggedIn');
        if (!driverLoggedIn) {
          navigate('/driver-auth');
          return;
        }
        
        setIsLoggedIn(true);
        
        // Simulate loading time for better UX
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (err) {
        console.error('Error initializing driver module:', err);
        setError('Failed to load driver module. Please try refreshing the page.');
        toast({
          title: "Error",
          description: "Failed to load driver module. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeDriverModule();
  }, [navigate]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    switch (tab) {
      case "home":
        navigate('/driver');
        break;
      case "requests":
        navigate('/driver/requests');
        break;
      case "profile":
        navigate('/driver/profile');
        break;
      default:
        navigate('/driver/myvehicle');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-600';
      case 'inactive':
        return 'bg-gray-600';
      case 'maintenance':
        return 'bg-orange-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'inactive':
        return 'Inactive';
      case 'maintenance':
        return 'Maintenance';
      default:
        return 'Unknown';
    }
  };

  const handleAddVehicle = (vehicleData: Partial<Vehicle>) => {
    // For cars, use the car variant as the name
    let vehicleName = '';
    if (vehicleData.type && vehicleData.carVariant && ['Sedan', 'Hatchback', 'SUV'].includes(vehicleData.type)) {
      vehicleName = vehicleData.carVariant;
    } else if (vehicleData.type) {
      // For other vehicle types, use the type as name
      vehicleName = vehicleData.type;
    }

    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      name: vehicleName,
      type: vehicleData.type || '',
      model: vehicleData.model || '',
      year: vehicleData.year || '',
      registrationNumber: vehicleData.registrationNumber || '',
      color: vehicleData.color || '',
      fuelType: vehicleData.fuelType || '',
      capacity: vehicleData.capacity || 4,
      status: 'active',
      lastService: new Date().toISOString().split('T')[0],
      nextService: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      totalRides: 0,
      rating: 0,
      images: vehicleData.images || ["/Car1.webp"],
      basePrice: vehicleData.basePrice || 1000,

    };
    
    setVehicles(prev => [...prev, newVehicle]);
    setShowAddDialog(false);
    toast({
      title: "Vehicle Added!",
      description: `${newVehicle.name} has been successfully added to your fleet.`,
      variant: "default",
    });
  };

  const handleEditVehicle = (vehicleId: string, updates: Partial<Vehicle>) => {
    setVehicles(prev => prev.map(v => 
      v.id === vehicleId ? { ...v, ...updates } : v
    ));
    setEditingVehicle(null);
    toast({
      title: "Vehicle Updated!",
      description: "Vehicle details have been successfully updated.",
      variant: "default",
    });
  };

  const handleDeleteVehicle = (vehicleId: string) => {
    setVehicles(prev => prev.filter(v => v.id !== vehicleId));
    toast({
      title: "Vehicle Removed!",
      description: "Vehicle has been successfully removed from your fleet.",
      variant: "destructive",
    });
  };

  const handleToggleStatus = (vehicleId: string, newStatus: 'active' | 'inactive' | 'maintenance') => {
    setVehicles(prev => prev.map(v => 
      v.id === vehicleId ? { ...v, status: newStatus } : v
    ));
    toast({
      title: "Status Updated!",
      description: `Vehicle status changed to ${newStatus}.`,
      variant: "default",
    });
  };

  const handleImageNavigation = (vehicleId: string, direction: 'prev' | 'next') => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return;
    
    const currentIndex = currentImageIndex[vehicleId] || 0;
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? vehicle.images.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === vehicle.images.length - 1 ? 0 : currentIndex + 1;
    }
    
    setCurrentImageIndex(prev => ({ ...prev, [vehicleId]: newIndex }));
  };

  const handleViewDetails = (vehicle: Vehicle) => {
    setViewingVehicle(vehicle);
    setDetailImageIndex(0);
  };

  const handleDetailImageNavigation = (direction: 'prev' | 'next') => {
    if (!viewingVehicle) return;
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = detailImageIndex === 0 ? viewingVehicle.images.length - 1 : detailImageIndex - 1;
    } else {
      newIndex = detailImageIndex === viewingVehicle.images.length - 1 ? 0 : detailImageIndex + 1;
    }
    setDetailImageIndex(newIndex);
  };



  // Filter vehicles
  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || vehicle.status === filterStatus;
    const matchesType = filterType === "all" || vehicle.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading driver module...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DriverTopNavigation />
      
      {/* Driver Header */}
      <div className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold"> Owner Driver</h1>
              <p className="text-blue-100">My Vehicles</p>
            </div>
            <Button 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => setShowAddDialog(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Vehicle
            </Button>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Vehicle</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="vehicleType">Vehicle Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedan">Sedan</SelectItem>
                          <SelectItem value="hatchback">Hatchback</SelectItem>
                          <SelectItem value="suv">SUV</SelectItem>
                          <SelectItem value="bus">Bus</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="registrationNumber">Registration Number</Label>
                      <Input id="registrationNumber" placeholder="e.g., DL-01-AB-1234" />
                    </div>
                    <div>
                      <Label htmlFor="year">Year</Label>
                      <Input id="year" placeholder="e.g., 2020" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="color">Color</Label>
                      <Input id="color" placeholder="e.g., White" />
                    </div>
                    <div>
                      <Label htmlFor="fuelType">Fuel Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fuel type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="petrol">Petrol</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="electric">Electric</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="capacity">Passenger Capacity</Label>
                    <Input id="capacity" type="number" placeholder="e.g., 4" />
                  </div>
                  <Button className="w-full">Add Vehicle</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 pb-20">
        {/* Search and Filter Bar */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search vehicles by name or registration number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Sedan">Sedan</SelectItem>
                  <SelectItem value="Hatchback">Hatchback</SelectItem>
                  <SelectItem value="SUV">SUV</SelectItem>
                  <SelectItem value="Bus">Bus</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Vehicle Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{vehicles.length}</div>
              <div className="text-sm text-gray-600">Total Vehicles</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {vehicles.filter(v => v.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {vehicles.filter(v => v.status === 'maintenance').length}
              </div>
              <div className="text-sm text-gray-600">Maintenance</div>
            </CardContent>
          </Card>
        </div>

        {/* Vehicles List */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800">My Vehicles ({filteredVehicles.length})</h2>
          {filteredVehicles.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No vehicles found matching your criteria</p>
              </CardContent>
            </Card>
          ) : (
            filteredVehicles.map((vehicle) => (
            <Card key={vehicle.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Car className="w-5 h-5 text-blue-600" />
                    <span>{vehicle.name}</span>
                    <Badge className={getStatusColor(vehicle.status)}>
                      {getStatusText(vehicle.status)}
                    </Badge>
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingVehicle(vehicle)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove Vehicle</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove {vehicle.name} from your fleet? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDeleteVehicle(vehicle.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Remove Vehicle
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                     {/* Vehicle Images Carousel */}
                   <div className="relative">
                     <div className="relative h-48 overflow-hidden rounded-lg">
                       {vehicle.images.length > 0 ? (
                         <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentImageIndex[vehicle.id] || 0} * 100%)` }}>
                           {vehicle.images.map((image, index) => (
                             <img 
                               key={index}
                               src={image} 
                               alt={`${vehicle.name} - Image ${index + 1}`}
                               className="w-full h-48 object-cover flex-shrink-0"
                               onError={(e) => {
                                 const target = e.target as HTMLImageElement;
                                 target.src = '/placeholder.svg';
                               }}
                             />
                           ))}
                         </div>
                       ) : (
                         <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                           <Car className="w-12 h-12 text-gray-400" />
                         </div>
                       )}
                       
                       {/* Image Navigation */}
                       {vehicle.images.length > 1 && (
                         <>
                           <button
                             onClick={() => handleImageNavigation(vehicle.id, 'prev')}
                             className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75"
                           >
                             <ChevronLeft className="w-4 h-4" />
                           </button>
                           <button
                             onClick={() => handleImageNavigation(vehicle.id, 'next')}
                             className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75"
                           >
                             <ChevronRight className="w-4 h-4" />
                           </button>
                           
                           {/* Image Indicators */}
                           <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                             {vehicle.images.map((_, index) => (
                               <button
                                 key={index}
                                 onClick={() => setCurrentImageIndex(prev => ({ ...prev, [vehicle.id]: index }))}
                                 className={`w-2 h-2 rounded-full ${
                                   (currentImageIndex[vehicle.id] || 0) === index 
                                     ? 'bg-white' 
                                     : 'bg-white bg-opacity-50'
                                 }`}
                               />
                             ))}
                           </div>
                         </>
                       )}
                     </div>
                     
                     <div className="absolute top-2 right-2">
                       {vehicle.status === 'active' ? (
                         <CheckCircle className="w-6 h-6 text-green-600 bg-white rounded-full" />
                       ) : (
                         <AlertCircle className="w-6 h-6 text-orange-600 bg-white rounded-full" />
                       )}
                     </div>
                   </div>

                  {/* Vehicle Details */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Model:</span>
                        <p>{vehicle.model}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Year:</span>
                        <p>{vehicle.year}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Registration:</span>
                        <p className="font-mono">{vehicle.registrationNumber}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Color:</span>
                        <p>{vehicle.color}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Fuel Type:</span>
                        <p className="flex items-center">
                          <Fuel className="w-4 h-4 mr-1" />
                          {vehicle.fuelType}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Capacity:</span>
                        <p>{vehicle.capacity} passengers</p>
                      </div>
                    </div>

                    <Separator />

                    {/* Performance Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">{vehicle.totalRides}</div>
                        <div className="text-xs text-gray-600">Total Rides</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">{vehicle.rating}</div>
                        <div className="text-xs text-gray-600">Rating</div>
                      </div>
                    </div>

                    {/* Service Information */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Last Service:</span>
                        <span>{vehicle.lastService}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Next Service:</span>
                        <span className="font-medium">{vehicle.nextService}</span>
                      </div>
                    </div>



                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <Select 
                        value={vehicle.status} 
                        onValueChange={(value: 'active' | 'inactive' | 'maintenance') => 
                          handleToggleStatus(vehicle.id, value)
                        }
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                        </SelectContent>
                      </Select>
                                             <Button 
                         variant="outline" 
                         className="flex-1"
                         onClick={() => handleViewDetails(vehicle)}
                       >
                         View Details
                       </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )))}
        </div>
      </div>

      {/* Add Vehicle Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Vehicle</DialogTitle>
          </DialogHeader>
          <AddVehicleForm 
            onSubmit={handleAddVehicle} 
            onCancel={() => setShowAddDialog(false)} 
            carVariantOptions={carVariantOptions}
          />
        </DialogContent>
      </Dialog>

             {/* Edit Vehicle Dialog */}
       <Dialog open={!!editingVehicle} onOpenChange={() => setEditingVehicle(null)}>
         <DialogContent className="max-w-md">
           <DialogHeader>
             <DialogTitle>Edit Vehicle</DialogTitle>
           </DialogHeader>
                        {editingVehicle && (
               <EditVehicleForm 
                 vehicle={editingVehicle} 
                 onSubmit={(updates) => handleEditVehicle(editingVehicle.id, updates)} 
                 onCancel={() => setEditingVehicle(null)} 
                 carVariantOptions={carVariantOptions}
               />
             )}
         </DialogContent>
       </Dialog>

       {/* Vehicle Details Dialog */}
       <Dialog open={!!viewingVehicle} onOpenChange={() => setViewingVehicle(null)}>
         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
           <DialogHeader>
             <DialogTitle className="flex items-center space-x-2">
               <Car className="w-5 h-5 text-blue-600" />
               <span>{viewingVehicle?.name} - Detailed View</span>
               <Badge className={viewingVehicle ? getStatusColor(viewingVehicle.status) : ''}>
                 {viewingVehicle ? getStatusText(viewingVehicle.status) : ''}
               </Badge>
             </DialogTitle>
           </DialogHeader>
           
           {viewingVehicle && (
             <div className="space-y-6">
               {/* Large Image Carousel */}
               <div className="relative">
                 <div className="relative h-80 overflow-hidden rounded-lg bg-gray-100">
                   {viewingVehicle.images.length > 0 ? (
                     <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${detailImageIndex} * 100%)` }}>
                       {viewingVehicle.images.map((image, index) => (
                         <img 
                           key={index}
                           src={image} 
                           alt={`${viewingVehicle.name} - Image ${index + 1}`}
                           className="w-full h-80 object-cover flex-shrink-0"
                           onError={(e) => {
                             const target = e.target as HTMLImageElement;
                             target.src = '/placeholder.svg';
                           }}
                         />
                       ))}
                     </div>
                   ) : (
                     <div className="w-full h-80 flex items-center justify-center">
                       <Car className="w-16 h-16 text-gray-400" />
                     </div>
                   )}
                   
                   {/* Image Navigation */}
                   {viewingVehicle.images.length > 1 && (
                     <>
                       <button
                         onClick={() => handleDetailImageNavigation('prev')}
                         className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                       >
                         <ChevronLeft className="w-6 h-6" />
                       </button>
                       <button
                         onClick={() => handleDetailImageNavigation('next')}
                         className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                       >
                         <ChevronRight className="w-6 h-6" />
                       </button>
                       
                       {/* Image Counter */}
                       <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                         {detailImageIndex + 1} / {viewingVehicle.images.length}
                       </div>
                       
                       {/* Image Indicators */}
                       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                         {viewingVehicle.images.map((_, index) => (
                           <button
                             key={index}
                             onClick={() => setDetailImageIndex(index)}
                             className={`w-3 h-3 rounded-full transition-all ${
                               detailImageIndex === index 
                                 ? 'bg-white' 
                                 : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                             }`}
                           />
                         ))}
                       </div>
                     </>
                   )}
                 </div>
               </div>

               {/* Vehicle Information Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Basic Details */}
                 <div className="space-y-4">
                   <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Vehicle Information</h3>
                   <div className="grid grid-cols-2 gap-4 text-sm">
                     <div>
                       <span className="font-medium text-gray-600">Name:</span>
                       <p className="font-semibold">{viewingVehicle.name}</p>
                     </div>
                     <div>
                       <span className="font-medium text-gray-600">Type:</span>
                       <p>{viewingVehicle.type}</p>
                     </div>
                     <div>
                       <span className="font-medium text-gray-600">Model:</span>
                       <p>{viewingVehicle.model}</p>
                     </div>
                     <div>
                       <span className="font-medium text-gray-600">Year:</span>
                       <p>{viewingVehicle.year}</p>
                     </div>
                     <div>
                       <span className="font-medium text-gray-600">Registration:</span>
                       <p className="font-mono">{viewingVehicle.registrationNumber}</p>
                     </div>
                     <div>
                       <span className="font-medium text-gray-600">Color:</span>
                       <p>{viewingVehicle.color}</p>
                     </div>
                     <div>
                       <span className="font-medium text-gray-600">Fuel Type:</span>
                       <p className="flex items-center">
                         <Fuel className="w-4 h-4 mr-1" />
                         {viewingVehicle.fuelType}
                       </p>
                     </div>
                     <div>
                       <span className="font-medium text-gray-600">Capacity:</span>
                       <p>{viewingVehicle.capacity} passengers</p>
                     </div>
                   </div>
                 </div>

                 {/* Performance & Service */}
                 <div className="space-y-4">
                   <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Performance & Service</h3>
                   
                   {/* Performance Stats */}
                   <div className="grid grid-cols-2 gap-4 mb-4">
                     <div className="text-center p-4 bg-blue-50 rounded-lg">
                       <div className="text-2xl font-bold text-blue-600">{viewingVehicle.totalRides}</div>
                       <div className="text-sm text-gray-600">Total Rides</div>
                     </div>
                     <div className="text-center p-4 bg-green-50 rounded-lg">
                       <div className="text-2xl font-bold text-green-600">{viewingVehicle.rating}</div>
                       <div className="text-sm text-gray-600">Rating</div>
                     </div>
                   </div>

                   {/* Service Information */}
                   <div className="space-y-3">
                     <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                       <span className="text-gray-600">Last Service:</span>
                       <span className="font-medium">{viewingVehicle.lastService}</span>
                     </div>
                     <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                       <span className="text-gray-600">Next Service:</span>
                       <span className="font-medium">{viewingVehicle.nextService}</span>
                     </div>
                   </div>
                 </div>
               </div>

               {/* Action Buttons */}
               <div className="flex space-x-3 pt-4 border-t">
                 <Button 
                   variant="outline" 
                   onClick={() => {
                     setViewingVehicle(null);
                     setEditingVehicle(viewingVehicle);
                   }}
                   className="flex-1"
                 >
                   <Edit className="w-4 h-4 mr-2" />
                   Edit Vehicle
                 </Button>
                 <Button 
                   variant="outline" 
                   onClick={() => setViewingVehicle(null)}
                   className="flex-1"
                 >
                   Close
                 </Button>
               </div>
             </div>
           )}
         </DialogContent>
       </Dialog>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-white z-50">
        <div className="flex justify-around py-2">
          <button 
            className={`flex flex-col items-center space-y-1 p-2 ${activeTab === "home" ? "text-blue-600" : "text-gray-500"}`}
            onClick={() => handleTabChange("home")}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </button>
          <button 
            className={`flex flex-col items-center space-y-1 p-2 ${activeTab === "requests" ? "text-blue-600" : "text-gray-500"}`}
            onClick={() => handleTabChange("requests")}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs">Requests</span>
          </button>
          <button 
            className={`flex flex-col items-center space-y-1 p-2 ${activeTab === "myvehicle" ? "text-blue-600" : "text-gray-500"}`}
            onClick={() => handleTabChange("myvehicle")}
          >
            <Car className="w-5 h-5" />
            <span className="text-xs">MyVehicle</span>
          </button>
          <button 
            className={`flex flex-col items-center space-y-1 p-2 ${activeTab === "profile" ? "text-blue-600" : "text-gray-500"}`}
            onClick={() => handleTabChange("profile")}
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Add Vehicle Form Component
const AddVehicleForm = ({ 
  onSubmit, 
  onCancel, 
  carVariantOptions 
}: { 
  onSubmit: (data: Partial<Vehicle>) => void; 
  onCancel: () => void; 
  carVariantOptions: { [key: string]: string[] };
}) => {
  const [selectedVehicleCategory, setSelectedVehicleCategory] = useState<'auto-ricksaw' | 'car' | 'bus' | ''>('');
  const [formData, setFormData] = useState({
    type: '',
    carVariant: '', // New field for car variants
    model: '',
    year: '',
    registrationNumber: '',
    color: '',
    fuelType: '',
    capacity: 4,
    images: ['/Car1.webp'] // Default image
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>(['/Car1.webp']);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newImages = [...selectedImages, ...files];
      setSelectedImages(newImages);
      
      // Convert new files to preview URLs
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrls(prev => [...prev, reader.result as string]);
          setFormData(prev => ({ ...prev, images: [...prev.images, reader.result as string] }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Vehicle Category Selection */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">What type of vehicle do you want to add?</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setSelectedVehicleCategory('auto-ricksaw')}
            className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${
              selectedVehicleCategory === 'auto-ricksaw'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="text-2xl mb-2">🛺</div>
            <div className="font-medium">Auto-Ricksaw</div>
          </button>
          <button
            type="button"
            onClick={() => setSelectedVehicleCategory('car')}
            className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${
              selectedVehicleCategory === 'car'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="text-2xl mb-2">🚗</div>
            <div className="font-medium">Car</div>
          </button>
          <button
            type="button"
            onClick={() => setSelectedVehicleCategory('bus')}
            className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${
              selectedVehicleCategory === 'bus'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="text-2xl mb-2">🚌</div>
            <div className="font-medium">Bus</div>
          </button>
        </div>
      </div>

      {/* Show form only after category selection */}
      {selectedVehicleCategory && (
        <>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {selectedVehicleCategory === 'auto-ricksaw' && (
                    <>
                      <SelectItem value="Fuel">Fuel Auto-Ricksaw</SelectItem>
                      <SelectItem value="electric">Electric Auto-Ricksaw</SelectItem>
                      <SelectItem value="cng">CNG Auto-Ricksaw</SelectItem>
                    </>
                  )}
                  {selectedVehicleCategory === 'car' && (
                    <>
                      <SelectItem value="Sedan">Sedan</SelectItem>
                      <SelectItem value="Hatchback">Hatchback</SelectItem>
                      <SelectItem value="SUV">SUV</SelectItem>
                    </>
                  )}
                  {selectedVehicleCategory === 'bus' && (
                    <>
                      <SelectItem value="ac">AC Sleeper</SelectItem>
                      <SelectItem value="non-ac">Non-AC Sleeper</SelectItem>
                      <SelectItem value="52ac_non_ac">52-Seater AC/Non-AC</SelectItem>
                      <SelectItem value="40ac_non_ac">40-Seater AC/Non-AC</SelectItem>
                      <SelectItem value="32ac_non_ac">32-Seater AC/Non-AC</SelectItem>
                      <SelectItem value="26ac_non_ac">26-Seater AC/Non-AC</SelectItem>
                      <SelectItem value="17ac_non_ac">17-Seater AC/Non-AC</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Car Variant Selection - Only show for cars */}
          {selectedVehicleCategory === 'car' && formData.type && (
            <div>
              <Label htmlFor="carVariant">Car Model</Label>
              <Select value={formData.carVariant} onValueChange={(value) => setFormData(prev => ({ ...prev, carVariant: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select car model" />
                </SelectTrigger>
                <SelectContent>
                  {carVariantOptions[formData.type as keyof typeof carVariantOptions]?.map((variant) => (
                    <SelectItem key={variant} value={variant}>{variant}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="model">Model</Label>
          <Input 
            id="model" 
            placeholder={selectedVehicleCategory === 'auto-ricksaw' ? "e.g., Bajaj RE" : selectedVehicleCategory === 'car' ? "e.g., Swift Dzire VDI" : "e.g., Volvo 9400"}
            value={formData.model}
            onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="year">Year</Label>
          <Input 
            id="year" 
            placeholder="e.g., 2020" 
            value={formData.year}
            onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="registrationNumber">Registration Number</Label>
          <Input 
            id="registrationNumber" 
            placeholder="e.g., DL-01-AB-1234" 
            value={formData.registrationNumber}
            onChange={(e) => setFormData(prev => ({ ...prev, registrationNumber: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="color">Color</Label>
          <Input 
            id="color" 
            placeholder="e.g., White" 
            value={formData.color}
            onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fuelType">Fuel Type</Label>
          <Select value={formData.fuelType} onValueChange={(value) => setFormData(prev => ({ ...prev, fuelType: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select fuel type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Petrol">Petrol</SelectItem>
              <SelectItem value="Diesel">Diesel</SelectItem>
              <SelectItem value="Electric">Electric</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="capacity">Passenger Capacity</Label>
          <Input 
            id="capacity" 
            type="number" 
            placeholder={selectedVehicleCategory === 'auto-ricksaw' ? "e.g., 3" : selectedVehicleCategory === 'car' ? "e.g., 4" : "e.g., 40"}
            value={formData.capacity}
            onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) || 4 }))}
            required
          />
        </div>
      </div>
       
               {/* Vehicle Images Upload */}
        <div className="space-y-4">
          <Label>Vehicle Images ({previewUrls.length}/10)</Label>
          <div className="space-y-4">
            {/* Image Grid */}
            <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={url} 
                    alt={`Vehicle preview ${index + 1}`} 
                    className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  {index === 0 && (
                    <div className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                      Main
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Upload Button */}
            <div className="flex items-center space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => document.getElementById('addImageInput')?.click()}
                className="flex items-center space-x-2"
                disabled={previewUrls.length >= 10}
              >
                <Upload className="w-4 h-4" />
                <span>Add Images</span>
              </Button>
              {previewUrls.length > 1 && (
                                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setSelectedImages([]);
                      setPreviewUrls(['/Car1.webp']);
                      setFormData(prev => ({ ...prev, images: ['/Car1.webp'] }));
                    }}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  Reset All
                </Button>
              )}
            </div>
            <input
              id="addImageInput"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
            <p className="text-sm text-gray-500">
              Supported formats: JPG, PNG, WebP. Max size: 5MB per image. Up to 10 images.
            </p>
          </div>
        </div>
       
       <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          Add Vehicle
        </Button>
      </div>
        </>
      )}
    </form>
  );
};

// Edit Vehicle Form Component
const EditVehicleForm = ({ 
  vehicle, 
  onSubmit, 
  onCancel, 
  carVariantOptions 
}: { 
  vehicle: Vehicle; 
  onSubmit: (data: Partial<Vehicle>) => void; 
  onCancel: () => void; 
  carVariantOptions: { [key: string]: string[] };
}) => {
  const [formData, setFormData] = useState({
    type: vehicle.type,
    carVariant: vehicle.carVariant || '',
    model: vehicle.model,
    year: vehicle.year,
    registrationNumber: vehicle.registrationNumber,
    color: vehicle.color,
    fuelType: vehicle.fuelType,
    capacity: vehicle.capacity,
    images: vehicle.images
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>(vehicle.images);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newImages = [...selectedImages, ...files];
      setSelectedImages(newImages);
      
      // Convert new files to preview URLs
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrls(prev => [...prev, reader.result as string]);
          setFormData(prev => ({ ...prev, images: [...prev.images, reader.result as string] }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    if (previewUrls.length <= 1) return; // Keep at least one image
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="editVehicleType">Vehicle Type</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sedan">Sedan</SelectItem>
              <SelectItem value="Hatchback">Hatchback</SelectItem>
              <SelectItem value="SUV">SUV</SelectItem>
              <SelectItem value="Bus">Bus</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Car Variant Selection - Only show for cars */}
      {formData.type && ['Sedan', 'Hatchback', 'SUV'].includes(formData.type) && (
        <div>
          <Label htmlFor="editCarVariant">Car Model</Label>
          <Select value={formData.carVariant} onValueChange={(value) => setFormData(prev => ({ ...prev, carVariant: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select car model" />
            </SelectTrigger>
            <SelectContent>
              {carVariantOptions[formData.type as keyof typeof carVariantOptions]?.map((variant) => (
                <SelectItem key={variant} value={variant}>{variant}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="editModel">Model</Label>
          <Input 
            id="editModel" 
            placeholder="e.g., Swift Dzire VDI" 
            value={formData.model}
            onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="editYear">Year</Label>
          <Input 
            id="editYear" 
            placeholder="e.g., 2020" 
            value={formData.year}
            onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="editRegistrationNumber">Registration Number</Label>
          <Input 
            id="editRegistrationNumber" 
            placeholder="e.g., DL-01-AB-1234" 
            value={formData.registrationNumber}
            onChange={(e) => setFormData(prev => ({ ...prev, registrationNumber: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="editColor">Color</Label>
          <Input 
            id="editColor" 
            placeholder="e.g., White" 
            value={formData.color}
            onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="editFuelType">Fuel Type</Label>
          <Select value={formData.fuelType} onValueChange={(value) => setFormData(prev => ({ ...prev, fuelType: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select fuel type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Petrol">Petrol</SelectItem>
              <SelectItem value="Diesel">Diesel</SelectItem>
              <SelectItem value="Electric">Electric</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>
                 <div>
           <Label htmlFor="editCapacity">Passenger Capacity</Label>
           <Input 
             id="editCapacity" 
             type="number" 
             placeholder="e.g., 4" 
             value={formData.capacity}
             onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) || 4 }))}
             required
           />
         </div>
       </div>
       
               {/* Vehicle Images Upload */}
        <div className="space-y-4">
          <Label>Vehicle Images ({previewUrls.length}/10)</Label>
          <div className="space-y-4">
            {/* Image Grid */}
            <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={url} 
                    alt={`Vehicle preview ${index + 1}`} 
                    className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  {index === 0 && (
                    <div className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                      Main
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Upload Button */}
            <div className="flex items-center space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => document.getElementById('editImageInput')?.click()}
                className="flex items-center space-x-2"
                disabled={previewUrls.length >= 10}
              >
                <Upload className="w-4 h-4" />
                <span>Add More Images</span>
              </Button>
              {selectedImages.length > 0 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setSelectedImages([]);
                    setPreviewUrls(vehicle.images);
                    setFormData(prev => ({ ...prev, images: vehicle.images }));
                  }}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  Reset Changes
                </Button>
              )}
            </div>
            <input
              id="editImageInput"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
            <p className="text-sm text-gray-500">
              Supported formats: JPG, PNG, WebP. Max size: 5MB per image. Up to 10 images.
            </p>
          </div>
        </div>
       
       <div className="flex space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          Update Vehicle
        </Button>
      </div>
    </form>
  );
};

export default DriverMyVehicle; 