import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/admin/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Car, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  UserCheck, 
  UserX, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Plus,
  Download,
  RefreshCw,
  Shield,
  ShieldOff,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Award,
  FileText,
  Car as CarIcon,
  Bus as BusIcon,
  Truck,
  Bike,
  Upload,
  X,
  Loader2,
  Key,
  User,
  Building,
  Fuel,
  Palette,
  Settings,
  DollarSign,
  Route,
  Wifi,
  Snowflake,
  Bed,
  Zap,
  FileImage,
  FileText as FileTextIcon,
  Shield as ShieldIcon,
  EyeOff,
  AlertTriangle,
  Check,
  Ban,
  Filter
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  status: 'active' | 'suspended' | 'pending' | 'verified';
  joinDate: string;
  totalTrips: number;
  totalEarnings: number;
  rating: number;
  isVerified: boolean;
  vehicleCount: number;
  licenseNumber: string;
  licenseExpiry: string;
  documentsSubmitted: boolean;
  lastActive: string;
  vehicleTypes: string[];
}

interface PendingVehicleRequest {
  id: string;
  driverId: string;
  driverName: string;
  driverEmail: string;
  driverPhone: string;
  vehicleType: 'car' | 'bus' | 'traveller';
  registrationNumber: string;
  seatingCapacity: number;
  fuelType: string;
  manufacturingYear: string;
  vehicleColor: string;
  hasAC: boolean;
  hasSleeper: boolean;
  hasChargingPoints: boolean;
  basePricePerTrip: number;
  pricePerKilometer: number;
  vehicleDescription: string;
  availableSeats: number;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
}

interface NewDriverForm {
  // Basic Information
  driverName: string;
  registrationNumber: string;
  seatingCapacity: string;
  fuelType: string;
  manufacturingYear: string;
  vehicleColor: string;
  
  // Vehicle Type
  vehicleType: 'car' | 'bus' | 'traveller';
  
  // Vehicle Features
  hasAC: boolean;
  hasSleeper: boolean;
  hasChargingPoints: boolean;
  
  // Pricing Information
  basePricePerTrip: string;
  pricePerKilometer: string;
  
  // Documents
  registrationCertificate: File | null;
  insuranceCertificate: File | null;
  vehicleImages: File[];
  
  // Additional Information
  vehicleDescription: string;
  availableSeats: string;
  
  // Driver Account
  driverEmail: string;
  driverPhone: string;
  driverPassword: string;
  confirmPassword: string;
}

interface EditDriverForm {
  // Basic Information
  name: string;
  email: string;
  phone: string;
  location: string;
  licenseNumber: string;
  licenseExpiry: string;
  
  // Status and Verification
  status: 'active' | 'suspended' | 'pending' | 'verified';
  isVerified: boolean;
  documentsSubmitted: boolean;
  
  // Vehicle Information
  vehicleCount: number;
  vehicleTypes: string[];
  
  // Additional Information
  totalTrips: number;
  totalEarnings: number;
  rating: number;
}

interface Vehicle {
  id: string;
  type: 'car' | 'bus' | 'truck' | 'bike';
  model: string;
  brand: string;
  year: number;
  registrationNumber: string;
  owner: string;
  ownerPhone: string;
  status: 'active' | 'inactive' | 'maintenance' | 'pending';
  location: string;
  lastService: string;
  nextService: string;
  totalTrips: number;
  rating: number;
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  seats: number;
  documents: {
    rc: boolean;
    insurance: boolean;
    permit: boolean;
    fitness: boolean;
  };
}

const AdminDriverManagement = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [showDriverDetails, setShowDriverDetails] = useState(false);
  const [showAddDriver, setShowAddDriver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showEditDriver, setShowEditDriver] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  
  // Vehicle management states
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [vehicleSearchTerm, setVehicleSearchTerm] = useState("");
  const [vehicleStatusFilter, setVehicleStatusFilter] = useState<string>("all");
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState<string>("all");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showVehicleDetails, setShowVehicleDetails] = useState(false);
  
  // Vehicle approval workflow states
  const [pendingVehicleRequests, setPendingVehicleRequests] = useState<PendingVehicleRequest[]>([
    {
      id: "1",
      driverId: "5",
      driverName: "Rajesh Kumar",
      driverEmail: "rajesh@example.com",
      driverPhone: "+91 9876543211",
      vehicleType: "car",
      registrationNumber: "DL-01-AB-1234",
      seatingCapacity: 4,
      fuelType: "petrol",
      manufacturingYear: "2022",
      vehicleColor: "White",
      hasAC: true,
      hasSleeper: false,
      hasChargingPoints: true,
      basePricePerTrip: 500,
      pricePerKilometer: 12,
      vehicleDescription: "Well-maintained sedan with AC and charging points",
      availableSeats: 4,
      submittedAt: "2024-03-15 10:30",
      status: "pending"
    },
    {
      id: "2",
      driverId: "6",
      driverName: "Suresh Patel",
      driverEmail: "suresh@example.com",
      driverPhone: "+91 8765432108",
      vehicleType: "bus",
      registrationNumber: "MH-02-CD-5678",
      seatingCapacity: 25,
      fuelType: "diesel",
      manufacturingYear: "2021",
      vehicleColor: "Blue",
      hasAC: true,
      hasSleeper: true,
      hasChargingPoints: false,
      basePricePerTrip: 2000,
      pricePerKilometer: 8,
      vehicleDescription: "Comfortable bus with AC and sleeper seats for long journeys",
      availableSeats: 25,
      submittedAt: "2024-03-14 15:45",
      status: "pending"
    },
    {
      id: "3",
      driverId: "7",
      driverName: "Mohan Singh",
      driverEmail: "mohan@example.com",
      driverPhone: "+91 7654321097",
      vehicleType: "traveller",
      registrationNumber: "KA-03-EF-9012",
      seatingCapacity: 12,
      fuelType: "diesel",
      manufacturingYear: "2023",
      vehicleColor: "Silver",
      hasAC: true,
      hasSleeper: false,
      hasChargingPoints: true,
      basePricePerTrip: 800,
      pricePerKilometer: 10,
              vehicleDescription: "Modern auto-ricksaw with AC and USB charging points",
      availableSeats: 12,
      submittedAt: "2024-03-13 09:20",
      status: "pending"
    }
  ]);
  const [selectedRequest, setSelectedRequest] = useState<PendingVehicleRequest | null>(null);
  const [showRequestDetails, setShowRequestDetails] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  
  const [newDriverForm, setNewDriverForm] = useState<NewDriverForm>({
    driverName: "",
    registrationNumber: "",
    seatingCapacity: "",
    fuelType: "",
    manufacturingYear: "",
    vehicleColor: "",
    vehicleType: "car",
    hasAC: false,
    hasSleeper: false,
    hasChargingPoints: false,
    basePricePerTrip: "",
    pricePerKilometer: "",
    registrationCertificate: null,
    insuranceCertificate: null,
    vehicleImages: [],
    vehicleDescription: "",
    availableSeats: "",
    driverEmail: "",
    driverPhone: "",
    driverPassword: "",
    confirmPassword: ""
  });

  const [editDriverForm, setEditDriverForm] = useState<EditDriverForm>({
    name: "",
    email: "",
    phone: "",
    location: "",
    licenseNumber: "",
    licenseExpiry: "",
    status: "active",
    isVerified: false,
    documentsSubmitted: false,
    vehicleCount: 0,
    vehicleTypes: [],
    totalTrips: 0,
    totalEarnings: 0,
    rating: 0
  });
  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: "1",
      name: "Rahul Kumar",
      email: "rahul@example.com",
      phone: "+91 9876543210",
      location: "Delhi, NCR",
      avatar: "https://github.com/shadcn.png",
      status: "verified",
      joinDate: "2024-01-15",
      totalTrips: 156,
      totalEarnings: 45000,
      rating: 4.8,
      isVerified: true,
      vehicleCount: 2,
      licenseNumber: "DL-01-2020-1234567",
      licenseExpiry: "2025-12-31",
      documentsSubmitted: true,
      lastActive: "2024-03-15 14:30",
      vehicleTypes: ["Car", "SUV"]
    },
    {
      id: "2",
      name: "Amit Singh",
      email: "amit@example.com",
      phone: "+91 8765432109",
      location: "Mumbai, Maharashtra",
      avatar: "https://github.com/shadcn.png",
      status: "active",
      joinDate: "2024-02-20",
      totalTrips: 89,
      totalEarnings: 32000,
      rating: 4.6,
      isVerified: true,
      vehicleCount: 1,
      licenseNumber: "MH-02-2019-9876543",
      licenseExpiry: "2024-08-15",
      documentsSubmitted: true,
      lastActive: "2024-03-14 16:45",
      vehicleTypes: ["Car"]
    },
    {
      id: "3",
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "+91 7654321098",
      location: "Bangalore, Karnataka",
      avatar: "https://github.com/shadcn.png",
      status: "pending",
      joinDate: "2024-03-01",
      totalTrips: 0,
      totalEarnings: 0,
      rating: 0,
      isVerified: false,
      vehicleCount: 0,
      licenseNumber: "KA-03-2021-4567890",
      licenseExpiry: "2026-03-01",
      documentsSubmitted: false,
      lastActive: "2024-03-15 11:20",
      vehicleTypes: []
    },
    {
      id: "4",
      name: "Vikram Patel",
      email: "vikram@example.com",
      phone: "+91 6543210987",
      location: "Ahmedabad, Gujarat",
      avatar: "https://github.com/shadcn.png",
      status: "suspended",
      joinDate: "2024-01-10",
      totalTrips: 45,
      totalEarnings: 18000,
      rating: 3.2,
      isVerified: false,
      vehicleCount: 1,
      licenseNumber: "GJ-04-2018-7890123",
      licenseExpiry: "2024-06-30",
      documentsSubmitted: true,
      lastActive: "2024-03-10 09:15",
      vehicleTypes: ["Bus"]
    }
  ]);

  useEffect(() => {
    const initializeAdminModule = async () => {
      try {
        setIsLoading(true);
        
        // Check if admin is logged in
        const adminLoggedIn = localStorage.getItem('isAdminLoggedIn');
        if (!adminLoggedIn) {
          navigate('/admin-auth');
          return;
        }
        
        setIsLoggedIn(true);
        
        // Load vehicles data
        await loadVehicles();
        
        // Simulate loading data
        await new Promise(resolve => setTimeout(resolve, 800));
        
      } catch (err) {
        console.error('Error initializing admin module:', err);
        toast({
          title: "Error",
          description: "Failed to load driver management. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeAdminModule();
  }, [navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <Award className="w-4 h-4" />;
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'suspended':
        return <XCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleStatusChange = (driverId: string, newStatus: 'active' | 'suspended' | 'pending' | 'verified') => {
    const driver = drivers.find(d => d.id === driverId);
    if (!driver) return;

    setDrivers(prev => prev.map(driver => 
      driver.id === driverId ? { ...driver, status: newStatus } : driver
    ));
    
    let message = `Driver status changed to ${newStatus}`;
    if (newStatus === 'active' && driver.status === 'suspended') {
      message = `${driver.name} has been unsuspended successfully`;
    } else if (newStatus === 'suspended' && driver.status === 'active') {
      message = `${driver.name} has been suspended`;
    }
    
    toast({
      title: newStatus === 'active' && driver.status === 'suspended' ? "Driver Unsuspended" : "Status Updated",
      description: message,
      variant: "default",
    });
  };

  const handleUnsuspendDriver = (driverId: string) => {
    handleStatusChange(driverId, 'active');
  };

  const handleBulkStatusChange = (newStatus: 'active' | 'suspended' | 'pending' | 'verified') => {
    if (selectedDrivers.length === 0) {
      toast({
        title: "No Drivers Selected",
        description: "Please select drivers to update",
        variant: "destructive",
      });
      return;
    }

    const updatedDrivers = drivers.map(driver => {
      if (selectedDrivers.includes(driver.id)) {
        return { ...driver, status: newStatus };
      }
      return driver;
    });

    setDrivers(updatedDrivers);
    setSelectedDrivers([]);
    setShowBulkActions(false);

    let message = `${selectedDrivers.length} drivers have been updated to ${newStatus}`;
    if (newStatus === 'active') {
      const suspendedCount = drivers.filter(driver => selectedDrivers.includes(driver.id) && driver.status === 'suspended').length;
      if (suspendedCount > 0) {
        message = `${suspendedCount} suspended drivers have been unsuspended`;
      }
    }

    toast({
      title: newStatus === 'active' ? "Bulk Unsuspend Complete" : "Bulk Update Complete",
      description: message,
    });
  };

  const handleBulkUnsuspend = () => {
    const suspendedDrivers = selectedDrivers.filter(driverId => {
      const driver = drivers.find(d => d.id === driverId);
      return driver && driver.status === 'suspended';
    });

    if (suspendedDrivers.length === 0) {
      toast({
        title: "No Suspended Drivers Selected",
        description: "Please select suspended drivers to unsuspend",
        variant: "destructive",
      });
      return;
    }

    handleBulkStatusChange('active');
  };

  const handleBulkDelete = () => {
    if (selectedDrivers.length === 0) {
      toast({
        title: "No Drivers Selected",
        description: "Please select drivers to delete",
        variant: "destructive",
      });
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${selectedDrivers.length} drivers? This action cannot be undone.`)) {
      const updatedDrivers = drivers.filter(driver => !selectedDrivers.includes(driver.id));
      setDrivers(updatedDrivers);
      setSelectedDrivers([]);
      setShowBulkActions(false);

      toast({
        title: "Bulk Delete Complete",
        description: `${selectedDrivers.length} drivers have been deleted successfully`,
      });
    }
  };

  const toggleDriverSelection = (driverId: string) => {
    setSelectedDrivers(prev => 
      prev.includes(driverId) 
        ? prev.filter(id => id !== driverId)
        : [...prev, driverId]
    );
  };

  const selectAllDrivers = () => {
    setSelectedDrivers(filteredDrivers.map(driver => driver.id));
  };

  const clearSelection = () => {
    setSelectedDrivers([]);
  };

  // Edit driver functions
  const handleEditDriver = (driver: Driver) => {
    setEditingDriver(driver);
    setEditDriverForm({
      name: driver.name,
      email: driver.email,
      phone: driver.phone,
      location: driver.location,
      licenseNumber: driver.licenseNumber,
      licenseExpiry: driver.licenseExpiry,
      status: driver.status,
      isVerified: driver.isVerified,
      documentsSubmitted: driver.documentsSubmitted,
      vehicleCount: driver.vehicleCount,
      vehicleTypes: [...driver.vehicleTypes],
      totalTrips: driver.totalTrips,
      totalEarnings: driver.totalEarnings,
      rating: driver.rating
    });
    setShowEditDriver(true);
  };

  const handleEditFormChange = (field: keyof EditDriverForm, value: any) => {
    setEditDriverForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateDriver = async () => {
    if (!editingDriver) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update driver in the list
      setDrivers(prev => prev.map(driver => 
        driver.id === editingDriver.id 
          ? { ...driver, ...editDriverForm }
          : driver
      ));
      
      toast({
        title: "Driver Updated",
        description: `${editDriverForm.name}'s information has been updated successfully`,
        variant: "default",
      });

      setShowEditDriver(false);
      setEditingDriver(null);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update driver. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addVehicleType = (vehicleType: string) => {
    if (!editDriverForm.vehicleTypes.includes(vehicleType)) {
      handleEditFormChange('vehicleTypes', [...editDriverForm.vehicleTypes, vehicleType]);
    }
  };

  const removeVehicleType = (vehicleType: string) => {
    handleEditFormChange('vehicleTypes', editDriverForm.vehicleTypes.filter(type => type !== vehicleType));
  };

  // Vehicle management functions
  const loadVehicles = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockVehicles: Vehicle[] = [
        {
          id: "1",
          type: "car",
          model: "Swift Dzire",
          brand: "Maruti Suzuki",
          year: 2022,
          registrationNumber: "DL-01-AB-1234",
          owner: "Rahul Kumar",
          ownerPhone: "+91 98765-43210",
          status: "active",
          location: "Delhi",
          lastService: "2024-01-15",
          nextService: "2024-04-15",
          totalTrips: 45,
          rating: 4.5,
          fuelType: "petrol",
          seats: 4,
          documents: { rc: true, insurance: true, permit: true, fitness: true }
        },
        {
          id: "2",
          type: "bus",
          model: "Volvo B8R",
          brand: "Volvo",
          year: 2021,
          registrationNumber: "MH-02-CD-5678",
          owner: "Mumbai Travels",
          ownerPhone: "+91 98765-43211",
          status: "active",
          location: "Mumbai",
          lastService: "2024-02-01",
          nextService: "2024-05-01",
          totalTrips: 120,
          rating: 4.8,
          fuelType: "diesel",
          seats: 45,
          documents: { rc: true, insurance: true, permit: true, fitness: true }
        },
        {
          id: "3",
          type: "truck",
          model: "Tata 407",
          brand: "Tata",
          year: 2020,
          registrationNumber: "KA-03-EF-9012",
          owner: "Karnataka Logistics",
          ownerPhone: "+91 98765-43212",
          status: "maintenance",
          location: "Bangalore",
          lastService: "2024-01-20",
          nextService: "2024-04-20",
          totalTrips: 78,
          rating: 4.2,
          fuelType: "diesel",
          seats: 2,
          documents: { rc: true, insurance: true, permit: true, fitness: false }
        },
        {
          id: "4",
          type: "bike",
          model: "Pulsar 150",
          brand: "Bajaj",
          year: 2023,
          registrationNumber: "TN-04-GH-3456",
          owner: "Suresh Kumar",
          ownerPhone: "+91 98765-43213",
          status: "pending",
          location: "Chennai",
          lastService: "2024-03-01",
          nextService: "2024-06-01",
          totalTrips: 23,
          rating: 4.0,
          fuelType: "petrol",
          seats: 2,
          documents: { rc: true, insurance: false, permit: true, fitness: true }
        }
      ];

      setVehicles(mockVehicles);
      setFilteredVehicles(mockVehicles);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load vehicles",
        variant: "destructive",
      });
    }
  };

  const getVehicleStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'maintenance':
        return <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>;
      case 'pending':
        return <Badge className="bg-blue-100 text-blue-800">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleVehicleAction = (action: string, vehicleId: string) => {
    switch (action) {
      case 'view':
        const vehicle = vehicles.find(v => v.id === vehicleId);
        setSelectedVehicle(vehicle || null);
        setShowVehicleDetails(true);
        break;
      case 'edit':
        toast({
          title: "Edit Vehicle",
          description: "Edit functionality will be implemented",
        });
        break;
      case 'delete':
        toast({
          title: "Delete Vehicle",
          description: "Delete functionality will be implemented",
        });
        break;
    }
  };

  // Filter vehicles
  useEffect(() => {
    let filtered = vehicles;

    if (vehicleSearchTerm) {
      filtered = filtered.filter(vehicle =>
        vehicle.model.toLowerCase().includes(vehicleSearchTerm.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(vehicleSearchTerm.toLowerCase()) ||
        vehicle.registrationNumber.toLowerCase().includes(vehicleSearchTerm.toLowerCase()) ||
        vehicle.owner.toLowerCase().includes(vehicleSearchTerm.toLowerCase())
      );
    }

    if (vehicleStatusFilter !== "all") {
      filtered = filtered.filter(vehicle => vehicle.status === vehicleStatusFilter);
    }

    if (vehicleTypeFilter !== "all") {
      filtered = filtered.filter(vehicle => vehicle.type === vehicleTypeFilter);
    }

    setFilteredVehicles(filtered);
  }, [vehicles, vehicleSearchTerm, vehicleStatusFilter, vehicleTypeFilter]);

  const handleVerificationToggle = (driverId: string) => {
    const driver = drivers.find(d => d.id === driverId);
    if (!driver) return;

    setDrivers(prev => prev.map(driver => 
      driver.id === driverId ? { ...driver, isVerified: !driver.isVerified } : driver
    ));
    
    toast({
      title: driver.isVerified ? "Verification Removed" : "Driver Verified",
      description: driver.isVerified 
        ? `${driver.name}'s verification has been removed` 
        : `${driver.name} has been verified successfully`,
      variant: "default",
    });
  };

  const handleDocumentApproval = (driverId: string) => {
    const driver = drivers.find(d => d.id === driverId);
    if (!driver) return;

    setDrivers(prev => prev.map(driver => 
      driver.id === driverId ? { ...driver, documentsSubmitted: true } : driver
    ));
    
    toast({
      title: "Documents Approved",
      description: `${driver.name}'s documents have been approved`,
      variant: "default",
    });
  };

  const handleBulkDocumentApproval = () => {
    const driversWithoutDocs = selectedDrivers.filter(driverId => {
      const driver = drivers.find(d => d.id === driverId);
      return driver && !driver.documentsSubmitted;
    });

    if (driversWithoutDocs.length === 0) {
      toast({
        title: "No Drivers Selected",
        description: "Please select drivers without approved documents",
        variant: "destructive",
      });
      return;
    }

    setDrivers(prev => prev.map(driver => 
      selectedDrivers.includes(driver.id) ? { ...driver, documentsSubmitted: true } : driver
    ));

    setSelectedDrivers([]);
    setShowBulkActions(false);

    toast({
      title: "Bulk Document Approval Complete",
      description: `${driversWithoutDocs.length} drivers' documents have been approved`,
    });
  };

  const handleDeleteDriver = (driverId: string) => {
    setDrivers(prev => prev.filter(driver => driver.id !== driverId));
    toast({
      title: "Driver Deleted",
      description: "Driver has been permanently removed",
      variant: "destructive",
    });
  };

  // Vehicle approval workflow functions
  const handleApproveVehicle = (requestId: string) => {
    setPendingVehicleRequests(prev => prev.map(request => {
      if (request.id === requestId) {
        return { ...request, status: 'approved' as const, adminNotes };
      }
      return request;
    }));

    // Add vehicle to driver's count
    const request = pendingVehicleRequests.find(r => r.id === requestId);
    if (request) {
      setDrivers(prev => prev.map(driver => {
        if (driver.id === request.driverId) {
          return {
            ...driver,
            vehicleCount: driver.vehicleCount + 1,
            vehicleTypes: [...driver.vehicleTypes, request.vehicleType.charAt(0).toUpperCase() + request.vehicleType.slice(1)]
          };
        }
        return driver;
      }));
    }

    toast({
      title: "Vehicle Approved",
      description: "Vehicle has been approved and added to driver's fleet",
      variant: "default",
    });

    setShowRequestDetails(false);
    setSelectedRequest(null);
    setAdminNotes("");
  };

  const handleRejectVehicle = (requestId: string) => {
    setPendingVehicleRequests(prev => prev.map(request => {
      if (request.id === requestId) {
        return { ...request, status: 'rejected' as const, adminNotes };
      }
      return request;
    }));

    toast({
      title: "Vehicle Rejected",
      description: "Vehicle request has been rejected",
      variant: "destructive",
    });

    setShowRequestDetails(false);
    setSelectedRequest(null);
    setAdminNotes("");
  };

  const getVehicleIcon = (vehicleType: string) => {
    switch (vehicleType.toLowerCase()) {
      case 'car': return <CarIcon className="w-4 h-4 text-green-600" />;
      case 'bus': return <BusIcon className="w-4 h-4 text-purple-600" />;
      case 'traveller': return <CarIcon className="w-4 h-4 text-blue-600" />;
      default: return <CarIcon className="w-4 h-4 text-gray-600" />;
    }
  };

  // Generate random password
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedPassword(password);
    setNewDriverForm(prev => ({
      ...prev,
      driverPassword: password,
      confirmPassword: password
    }));
  };

  // Handle form input changes
  const handleFormChange = (field: keyof NewDriverForm, value: any) => {
    setNewDriverForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle file uploads
  const handleFileUpload = (field: 'registrationCertificate' | 'insuranceCertificate', file: File) => {
    setNewDriverForm(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleVehicleImagesUpload = (files: FileList) => {
    const newImages = Array.from(files);
    setNewDriverForm(prev => ({
      ...prev,
      vehicleImages: [...prev.vehicleImages, ...newImages]
    }));
  };

  const removeVehicleImage = (index: number) => {
    setNewDriverForm(prev => ({
      ...prev,
      vehicleImages: prev.vehicleImages.filter((_, i) => i !== index)
    }));
  };

  // Submit new driver form
  const handleSubmitNewDriver = async () => {
    if (!newDriverForm.driverPassword || newDriverForm.driverPassword !== newDriverForm.confirmPassword) {
      toast({
        title: "Password Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create new driver
      const newDriver: Driver = {
        id: Date.now().toString(),
        name: newDriverForm.driverName,
        email: newDriverForm.driverEmail,
        phone: newDriverForm.driverPhone,
        location: "New Location",
        avatar: "https://github.com/shadcn.png",
        status: "pending",
        joinDate: new Date().toISOString().split('T')[0],
        totalTrips: 0,
        totalEarnings: 0,
        rating: 0,
        isVerified: false,
        vehicleCount: 1,
        licenseNumber: newDriverForm.registrationNumber,
        licenseExpiry: "2025-12-31",
        documentsSubmitted: true,
        lastActive: new Date().toLocaleString(),
        vehicleTypes: [newDriverForm.vehicleType]
      };

      setDrivers(prev => [newDriver, ...prev]);
      
      toast({
        title: "Driver Account Created",
        description: `Driver account created successfully. Password: ${newDriverForm.driverPassword}`,
        variant: "default",
      });

      // Reset form
      setNewDriverForm({
        driverName: "",
        registrationNumber: "",
        seatingCapacity: "",
        fuelType: "",
        manufacturingYear: "",
        vehicleColor: "",
        vehicleType: "car",
        hasAC: false,
        hasSleeper: false,
        hasChargingPoints: false,
        basePricePerTrip: "",
        pricePerKilometer: "",
        registrationCertificate: null,
        insuranceCertificate: null,
        vehicleImages: [],
        vehicleDescription: "",
        availableSeats: "",
        driverEmail: "",
        driverPhone: "",
        driverPassword: "",
        confirmPassword: ""
      });
      
      setShowAddDriver(false);
      setGeneratedPassword("");
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create driver account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter drivers
  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.phone.includes(searchTerm) ||
                         driver.licenseNumber.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || driver.status === statusFilter;
    const matchesVerification = verificationFilter === "all" || 
                               (verificationFilter === "verified" && driver.isVerified) ||
                               (verificationFilter === "unverified" && !driver.isVerified);
    
    return matchesSearch && matchesStatus && matchesVerification;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading driver management...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 lg:mb-8 gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Driver Management</h1>
          <p className="text-gray-600 text-sm lg:text-base">Manage all registered drivers and their verification status</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="w-full sm:w-auto" onClick={() => setShowAddDriver(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Driver
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Total Drivers</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900">{drivers.length}</p>
              </div>
              <Car className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Total Vehicles</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900">
                  {drivers.reduce((total, driver) => total + driver.vehicleCount, 0)}
                </p>
              </div>
              <CarIcon className="w-6 h-6 lg:w-8 lg:h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Pending Requests</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900">
                  {pendingVehicleRequests.filter(r => r.status === 'pending').length}
                </p>
              </div>
              <AlertTriangle className="w-6 h-6 lg:w-8 lg:h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Verified Drivers</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900">
                  {drivers.filter(d => d.isVerified).length}
                </p>
              </div>
              <Shield className="w-6 h-6 lg:w-8 lg:h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Pending Verification</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900">
                  {drivers.filter(d => d.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-6 h-6 lg:w-8 lg:h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Active Drivers</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900">
                  {drivers.filter(d => d.status === 'active' || d.status === 'verified').length}
                </p>
              </div>
              <UserCheck className="w-6 h-6 lg:w-8 lg:h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-4 lg:p-6">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search drivers by name, email, phone, or license number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={verificationFilter} onValueChange={setVerificationFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Verification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Drivers</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="unverified">Unverified</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setVerificationFilter("all");
                  setSelectedDrivers([]);
                  toast({
                    title: "Refreshed",
                    description: "Filters have been reset and data refreshed",
                  });
                }}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions Bar */}
      {selectedDrivers.length > 0 && (
        <Card className="mb-4 shadow-sm border-0 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-blue-900">
                  {selectedDrivers.length} driver(s) selected
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearSelection}
                  className="text-blue-700 border-blue-300 hover:bg-blue-100"
                >
                  Clear Selection
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkUnsuspend}
                  className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  Unsuspend Selected
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkDocumentApproval}
                  className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Approve Documents
                </Button>
                <Select onValueChange={handleBulkStatusChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Change Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleBulkDelete}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Drivers List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg lg:text-xl">Drivers ({filteredDrivers.length})</CardTitle>
            {filteredDrivers.length > 0 && (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedDrivers.length === filteredDrivers.length && filteredDrivers.length > 0}
                  onChange={selectAllDrivers}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-600">Select All</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {filteredDrivers.length === 0 ? (
            <div className="text-center py-8">
              <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No drivers found matching your criteria</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDrivers.map((driver) => (
                <div key={driver.id} className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 border rounded-lg hover:bg-gray-50 gap-4">
                  <div className="flex items-start space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedDrivers.includes(driver.id)}
                      onChange={() => toggleDriverSelection(driver.id)}
                      className="rounded border-gray-300 mt-2"
                    />
                    <Avatar className="w-12 h-12 flex-shrink-0">
                      <AvatarImage src={driver.avatar} />
                      <AvatarFallback>{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 gap-2">
                        <h3 className="font-semibold text-gray-900 truncate">{driver.name}</h3>
                        <div className="flex flex-wrap gap-2">
                          {driver.isVerified && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                              <Shield className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          <Badge className={`${getStatusColor(driver.status)} text-xs`}>
                            {getStatusIcon(driver.status)}
                            <span className="ml-1 capitalize">{driver.status}</span>
                          </Badge>
                          <div className="flex items-center text-yellow-600">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="ml-1 text-sm">{driver.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-600 mt-2 gap-1">
                        <span className="flex items-center">
                          <Mail className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span className="truncate">{driver.email}</span>
                        </span>
                        <span className="flex items-center">
                          <Phone className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span className="truncate">{driver.phone}</span>
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span className="truncate">{driver.location}</span>
                        </span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs text-gray-500 mt-2 gap-1">
                        <span>License: {driver.licenseNumber}</span>
                        <span>Trips: {driver.totalTrips}</span>
                        <span>Earnings: {formatCurrency(driver.totalEarnings)}</span>
                        <span>Last Active: {driver.lastActive}</span>
                      </div>
                      
                      {/* Enhanced Vehicle Information */}
                      <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="flex items-center space-x-2">
                            <CarIcon className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-800">
                              {driver.vehicleCount} Vehicle{driver.vehicleCount !== 1 ? 's' : ''}
                            </span>
                          </div>
                          {driver.vehicleTypes.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1">
                              {driver.vehicleTypes.map((type, index) => {
                                const getVehicleIcon = (vehicleType: string) => {
                                  switch (vehicleType.toLowerCase()) {
                                    case 'car': return <CarIcon className="w-3 h-3 text-green-600" />;
                                    case 'bus': return <BusIcon className="w-3 h-3 text-purple-600" />;
                                    case 'truck': return <Truck className="w-3 h-3 text-orange-600" />;
                                    case 'bike': return <Bike className="w-3 h-3 text-red-600" />;
                                    case 'traveller': return <CarIcon className="w-3 h-3 text-blue-600" />;
                                    default: return <CarIcon className="w-3 h-3 text-gray-600" />;
                                  }
                                };
                                
                                return (
                                  <Badge key={index} variant="outline" className="text-xs bg-white">
                                    {getVehicleIcon(type)}
                                    <span className="ml-1 capitalize">{type}</span>
                                  </Badge>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end space-x-2 lg:flex-shrink-0">
                    {driver.status === 'suspended' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUnsuspendDriver(driver.id)}
                        className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                      >
                        <UserCheck className="w-4 h-4 mr-1" />
                        Unsuspend
                      </Button>
                    )}
                    {!driver.documentsSubmitted && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDocumentApproval(driver.id)}
                        className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                      >
                        <FileText className="w-4 h-4 mr-1" />
                        Approve Docs
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditDriver(driver)}
                      className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedDriver(driver);
                        setShowDriverDetails(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditDriver(driver)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Driver
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleVerificationToggle(driver.id)}>
                          {driver.isVerified ? (
                            <>
                              <ShieldOff className="w-4 h-4 mr-2" />
                              Remove Verification
                            </>
                          ) : (
                            <>
                              <Shield className="w-4 h-4 mr-2" />
                              Verify Driver
                            </>
                          )}
                        </DropdownMenuItem>
                        {!driver.documentsSubmitted && (
                          <DropdownMenuItem onClick={() => handleDocumentApproval(driver.id)}>
                            <FileText className="w-4 h-4 mr-2" />
                            Approve Documents
                          </DropdownMenuItem>
                        )}
                        {driver.status === 'suspended' ? (
                          <DropdownMenuItem onClick={() => handleUnsuspendDriver(driver.id)}>
                            <UserCheck className="w-4 h-4 mr-2" />
                            Unsuspend Driver
                          </DropdownMenuItem>
                        ) : (
                          <>
                            <DropdownMenuItem onClick={() => handleStatusChange(driver.id, 'verified')}>
                              <Award className="w-4 h-4 mr-2" />
                              Mark Verified
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(driver.id, 'active')}>
                              <UserCheck className="w-4 h-4 mr-2" />
                              Activate
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(driver.id, 'suspended')}>
                              <UserX className="w-4 h-4 mr-2" />
                              Suspend Driver
                            </DropdownMenuItem>
                          </>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Driver
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Driver</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {driver.name}? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteDriver(driver.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete Driver
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Vehicle Approval Requests */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            Vehicle Approval Requests ({pendingVehicleRequests.filter(r => r.status === 'pending').length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingVehicleRequests.filter(r => r.status === 'pending').length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <p className="text-gray-600">No pending vehicle requests</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingVehicleRequests
                .filter(request => request.status === 'pending')
                .map((request) => (
                  <div key={request.id} className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 border rounded-lg hover:bg-gray-50 gap-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full flex-shrink-0">
                        {getVehicleIcon(request.vehicleType)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 gap-2">
                          <h3 className="font-semibold text-gray-900 truncate">{request.driverName}</h3>
                          <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200 text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            Pending Approval
                          </Badge>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-600 mt-2 gap-1">
                          <span className="flex items-center">
                            <Mail className="w-3 h-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{request.driverEmail}</span>
                          </span>
                          <span className="flex items-center">
                            <Phone className="w-3 h-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{request.driverPhone}</span>
                          </span>
                          <span className="flex items-center">
                            <CarIcon className="w-3 h-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{request.vehicleType.charAt(0).toUpperCase() + request.vehicleType.slice(1)}</span>
                          </span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs text-gray-500 mt-2 gap-1">
                          <span>Reg: {request.registrationNumber}</span>
                          <span>Seats: {request.seatingCapacity}</span>
                          <span>Fuel: {request.fuelType}</span>
                          <span>Year: {request.manufacturingYear}</span>
                          <span>Submitted: {request.submittedAt}</span>
                        </div>
                        
                        <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">
                            <strong>Pricing:</strong> ₹{request.basePricePerTrip} base + ₹{request.pricePerKilometer}/km
                          </p>
                          <p className="text-xs text-blue-600 mt-1">
                            {request.vehicleDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end space-x-2 lg:flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowRequestDetails(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 border-green-200 hover:bg-green-50"
                        onClick={() => handleApproveVehicle(request.id)}
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleRejectVehicle(request.id)}
                      >
                        <Ban className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* All Vehicles Management */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
            <CarIcon className="w-5 h-5 text-blue-600" />
            All Vehicles ({filteredVehicles.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Vehicle Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search vehicles by model, brand, registration, or owner..."
                  value={vehicleSearchTerm}
                  onChange={(e) => setVehicleSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={vehicleStatusFilter} onValueChange={setVehicleStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={vehicleTypeFilter} onValueChange={setVehicleTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="car">Car</SelectItem>
                <SelectItem value="bus">Bus</SelectItem>
                <SelectItem value="truck">Truck</SelectItem>
                <SelectItem value="bike">Bike</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Vehicle Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredVehicles.map((vehicle) => (
              <Card key={vehicle.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 md:p-6">
                  {/* Vehicle Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {getVehicleIcon(vehicle.type)}
                      <div>
                        <h3 className="font-semibold text-gray-900">{vehicle.brand} {vehicle.model}</h3>
                        <p className="text-sm text-gray-600">{vehicle.registrationNumber}</p>
                      </div>
                    </div>
                    {getVehicleStatusBadge(vehicle.status)}
                  </div>

                  {/* Vehicle Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Owner: {vehicle.owner}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Location: {vehicle.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Year: {vehicle.year}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Rating: {vehicle.rating}/5</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Fuel className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Fuel: {vehicle.fuelType}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Seats: {vehicle.seats}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleVehicleAction('view', vehicle.id)}
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleVehicleAction('edit', vehicle.id)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredVehicles.length === 0 && (
            <div className="text-center py-8">
              <CarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No vehicles found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Driver Details Dialog */}
      <Dialog open={showDriverDetails} onOpenChange={setShowDriverDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Driver Details</DialogTitle>
          </DialogHeader>
          {selectedDriver && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedDriver.avatar} />
                  <AvatarFallback>{selectedDriver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedDriver.name}</h3>
                  <p className="text-gray-600">{selectedDriver.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className={getStatusColor(selectedDriver.status)}>
                      {getStatusIcon(selectedDriver.status)}
                      <span className="ml-1 capitalize">{selectedDriver.status}</span>
                    </Badge>
                    {selectedDriver.isVerified && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    <div className="flex items-center text-yellow-600">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1">{selectedDriver.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <p className="text-gray-900">{selectedDriver.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Location</label>
                  <p className="text-gray-900">{selectedDriver.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">License Number</label>
                  <p className="text-gray-900">{selectedDriver.licenseNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">License Expiry</label>
                  <p className="text-gray-900">{selectedDriver.licenseExpiry}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Total Trips</label>
                  <p className="text-gray-900">{selectedDriver.totalTrips}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Total Earnings</label>
                  <p className="text-gray-900">{formatCurrency(selectedDriver.totalEarnings)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Vehicle Count</label>
                  <p className="text-gray-900">{selectedDriver.vehicleCount}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Documents Submitted</label>
                  <p className="text-gray-900">
                    {selectedDriver.documentsSubmitted ? (
                      <span className="text-green-600">✓ Yes</span>
                    ) : (
                      <span className="text-red-600">✗ No</span>
                    )}
                  </p>
                </div>
              </div>
              
              {selectedDriver.vehicleTypes.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Vehicle Types</label>
                  <div className="flex space-x-2 mt-1">
                    {selectedDriver.vehicleTypes.map((type, index) => (
                      <Badge key={index} variant="outline">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => handleVerificationToggle(selectedDriver.id)}
                  className="flex-1"
                >
                  {selectedDriver.isVerified ? 'Remove Verification' : 'Verify Driver'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleStatusChange(selectedDriver.id, selectedDriver.status === 'active' ? 'suspended' : 'active')}
                  className={`flex-1 ${selectedDriver.status === 'suspended' ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' : ''}`}
                >
                  {selectedDriver.status === 'active' ? 'Suspend Driver' : 'Unsuspend Driver'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Vehicle Request Details Dialog */}
      <Dialog open={showRequestDetails} onOpenChange={setShowRequestDetails}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg lg:text-xl">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Vehicle Request Details
            </DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              {/* Driver Information */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full flex-shrink-0">
                  {getVehicleIcon(selectedRequest.vehicleType)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold truncate">{selectedRequest.driverName}</h3>
                  <p className="text-gray-600 truncate">{selectedRequest.driverEmail}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200 text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      Pending Approval
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {selectedRequest.vehicleType.charAt(0).toUpperCase() + selectedRequest.vehicleType.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* Vehicle Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Driver Phone</label>
                  <p className="text-gray-900 break-all">{selectedRequest.driverPhone}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Registration Number</label>
                  <p className="text-gray-900 break-all">{selectedRequest.registrationNumber}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Seating Capacity</label>
                  <p className="text-gray-900">{selectedRequest.seatingCapacity} seats</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Fuel Type</label>
                  <p className="text-gray-900 capitalize">{selectedRequest.fuelType}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Manufacturing Year</label>
                  <p className="text-gray-900">{selectedRequest.manufacturingYear}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Vehicle Color</label>
                  <p className="text-gray-900 capitalize">{selectedRequest.vehicleColor}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Base Price per Trip</label>
                  <p className="text-gray-900">₹{selectedRequest.basePricePerTrip}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Price per Kilometer</label>
                  <p className="text-gray-900">₹{selectedRequest.pricePerKilometer}</p>
                </div>
              </div>
              
              {/* Vehicle Features */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Vehicle Features</label>
                <div className="flex flex-wrap gap-2">
                  {selectedRequest.hasAC && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      <Snowflake className="w-3 h-3 mr-1" />
                      AC
                    </Badge>
                  )}
                  {selectedRequest.hasSleeper && (
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      <Bed className="w-3 h-3 mr-1" />
                      Sleeper
                    </Badge>
                  )}
                  {selectedRequest.hasChargingPoints && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Zap className="w-3 h-3 mr-1" />
                      Charging Points
                    </Badge>
                  )}
                  {!selectedRequest.hasAC && !selectedRequest.hasSleeper && !selectedRequest.hasChargingPoints && (
                    <p className="text-sm text-gray-500">No special features</p>
                  )}
                </div>
              </div>
              
              {/* Vehicle Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Vehicle Description</label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-900 text-sm">{selectedRequest.vehicleDescription || 'No description provided'}</p>
                </div>
              </div>
              
              {/* Pricing Summary */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Pricing Summary</label>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-800">Base Price:</span>
                    <span className="font-medium text-blue-900">₹{selectedRequest.basePricePerTrip}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-blue-800">Per Kilometer:</span>
                    <span className="font-medium text-blue-900">₹{selectedRequest.pricePerKilometer}</span>
                  </div>
                  <div className="border-t border-blue-200 mt-2 pt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-blue-900">Example (100km):</span>
                      <span className="font-bold text-blue-900">₹{selectedRequest.basePricePerTrip + (selectedRequest.pricePerKilometer * 100)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Submitted At */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Submitted At</label>
                <p className="text-gray-900">{selectedRequest.submittedAt}</p>
              </div>
              
              {/* Admin Notes */}
              <div className="space-y-2">
                <Label htmlFor="adminNotes" className="text-sm font-medium text-gray-600">Admin Notes (Optional)</Label>
                <Textarea
                  id="adminNotes"
                  placeholder="Add any notes or comments for the driver..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={3}
                  className="resize-none"
                />
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowRequestDetails(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleRejectVehicle(selectedRequest.id)}
                  className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Ban className="w-4 h-4 mr-2" />
                  Reject Request
                </Button>
                <Button 
                  onClick={() => handleApproveVehicle(selectedRequest.id)}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Approve Vehicle
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Driver Dialog */}
      <Dialog open={showAddDriver} onOpenChange={setShowAddDriver}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Add New Driver & Vehicle
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="driverName">Driver Name *</Label>
                  <Input
                    id="driverName"
                    placeholder="Enter driver's full name"
                    value={newDriverForm.driverName}
                    onChange={(e) => handleFormChange('driverName', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="driverEmail">Driver Email *</Label>
                  <Input
                    id="driverEmail"
                    type="email"
                    placeholder="driver@example.com"
                    value={newDriverForm.driverEmail}
                    onChange={(e) => handleFormChange('driverEmail', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="driverPhone">Driver Phone *</Label>
                  <Input
                    id="driverPhone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={newDriverForm.driverPhone}
                    onChange={(e) => handleFormChange('driverPhone', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="driverLicense">Driver License Number *</Label>
                  <Input
                    id="driverLicense"
                    placeholder="e.g., DL-01-2020-1234567"
                    value={newDriverForm.registrationNumber}
                    onChange={(e) => handleFormChange('registrationNumber', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="driverLocation">Driver Location *</Label>
                  <Input
                    id="driverLocation"
                    placeholder="e.g., Delhi, Mumbai, Bangalore"
                    value={newDriverForm.manufacturingYear}
                    onChange={(e) => handleFormChange('manufacturingYear', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="driverExperience">Years of Experience</Label>
                  <Input
                    id="driverExperience"
                    type="number"
                    placeholder="e.g., 5"
                    min="0"
                    max="50"
                    value={newDriverForm.seatingCapacity}
                    onChange={(e) => handleFormChange('seatingCapacity', e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>



            <TabsContent value="pricing" className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="basePricePerTrip">Base Price per Trip (₹) *</Label>
                  <Input
                    id="basePricePerTrip"
                    type="number"
                    placeholder="e.g., 500"
                    value={newDriverForm.basePricePerTrip}
                    onChange={(e) => handleFormChange('basePricePerTrip', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="pricePerKilometer">Price per Kilometer (₹) *</Label>
                  <Input
                    id="pricePerKilometer"
                    type="number"
                    placeholder="e.g., 15"
                    value={newDriverForm.pricePerKilometer}
                    onChange={(e) => handleFormChange('pricePerKilometer', e.target.value)}
                  />
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pricing Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Base Price per Trip:</span>
                      <span className="font-medium">₹{newDriverForm.basePricePerTrip || '0'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price per Kilometer:</span>
                      <span className="font-medium">₹{newDriverForm.pricePerKilometer || '0'}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Example (100km trip):</span>
                        <span>₹{(parseInt(newDriverForm.basePricePerTrip) || 0) + ((parseInt(newDriverForm.pricePerKilometer) || 0) * 100)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="registrationCertificate">Registration Certificate *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {newDriverForm.registrationCertificate ? (
                      <div className="space-y-2">
                        <FileTextIcon className="w-8 h-8 mx-auto text-green-600" />
                        <p className="text-sm font-medium">{newDriverForm.registrationCertificate.name}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleFormChange('registrationCertificate', null)}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PDF, JPG, PNG (max 5MB)</p>
                        <input
                          type="file"
                          id="registrationCertificate"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload('registrationCertificate', file);
                          }}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => document.getElementById('registrationCertificate')?.click()}
                        >
                          Choose File
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="insuranceCertificate">Insurance Certificate *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {newDriverForm.insuranceCertificate ? (
                      <div className="space-y-2">
                        <ShieldIcon className="w-8 h-8 mx-auto text-green-600" />
                        <p className="text-sm font-medium">{newDriverForm.insuranceCertificate.name}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleFormChange('insuranceCertificate', null)}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PDF, JPG, PNG (max 5MB)</p>
                        <input
                          type="file"
                          id="insuranceCertificate"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload('insuranceCertificate', file);
                          }}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => document.getElementById('insuranceCertificate')?.click()}
                        >
                          Choose File
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Vehicle Images</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <div className="text-center mb-4">
                    <FileImage className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Upload multiple vehicle images</p>
                    <p className="text-xs text-gray-500">JPG, PNG (max 5MB each)</p>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files) handleVehicleImagesUpload(files);
                      }}
                    />
                                                 <Button
                       variant="outline"
                       size="sm"
                       className="mt-2"
                       onClick={() => {
                         const fileInput = document.querySelector('input[type="file"][multiple]') as HTMLInputElement;
                         fileInput?.click();
                       }}
                     >
                      Choose Images
                    </Button>
                  </div>
                  
                  {newDriverForm.vehicleImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {newDriverForm.vehicleImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Vehicle ${index + 1}`}
                            className="w-full h-20 object-cover rounded border"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 w-6 h-6 p-0"
                            onClick={() => removeVehicleImage(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="account" className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="driverEmail">Driver Email *</Label>
                  <Input
                    id="driverEmail"
                    type="email"
                    placeholder="driver@example.com"
                    value={newDriverForm.driverEmail}
                    onChange={(e) => handleFormChange('driverEmail', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="driverPhone">Driver Phone *</Label>
                  <Input
                    id="driverPhone"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={newDriverForm.driverPhone}
                    onChange={(e) => handleFormChange('driverPhone', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="driverPassword">Driver Password *</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={generatePassword}
                    >
                      <Key className="w-4 h-4 mr-1" />
                      Generate
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                
                <Input
                  id="driverPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={newDriverForm.driverPassword}
                  onChange={(e) => handleFormChange('driverPassword', e.target.value)}
                />
                
                {generatedPassword && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Generated Password:</strong> {generatedPassword}
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      This password will be provided to the driver for login
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={newDriverForm.confirmPassword}
                  onChange={(e) => handleFormChange('confirmPassword', e.target.value)}
                />
                {newDriverForm.confirmPassword && newDriverForm.driverPassword !== newDriverForm.confirmPassword && (
                  <p className="text-sm text-red-600">Passwords do not match</p>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => setShowAddDriver(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitNewDriver}
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <User className="w-4 h-4 mr-2" />
                  Add Vehicle
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Driver Dialog */}
      <Dialog open={showEditDriver} onOpenChange={setShowEditDriver}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Edit Driver Information
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="status">Status & Verification</TabsTrigger>
              <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editName">Driver Name *</Label>
                  <Input
                    id="editName"
                    placeholder="Enter driver's full name"
                    value={editDriverForm.name}
                    onChange={(e) => handleEditFormChange('name', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="editEmail">Email Address *</Label>
                  <Input
                    id="editEmail"
                    type="email"
                    placeholder="driver@example.com"
                    value={editDriverForm.email}
                    onChange={(e) => handleEditFormChange('email', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="editPhone">Phone Number *</Label>
                  <Input
                    id="editPhone"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={editDriverForm.phone}
                    onChange={(e) => handleEditFormChange('phone', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="editLocation">Location *</Label>
                  <Input
                    id="editLocation"
                    placeholder="City, State"
                    value={editDriverForm.location}
                    onChange={(e) => handleEditFormChange('location', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="editLicenseNumber">License Number *</Label>
                  <Input
                    id="editLicenseNumber"
                    placeholder="License number"
                    value={editDriverForm.licenseNumber}
                    onChange={(e) => handleEditFormChange('licenseNumber', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="editLicenseExpiry">License Expiry Date *</Label>
                  <Input
                    id="editLicenseExpiry"
                    type="date"
                    value={editDriverForm.licenseExpiry}
                    onChange={(e) => handleEditFormChange('licenseExpiry', e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="status" className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editStatus">Driver Status *</Label>
                  <Select value={editDriverForm.status} onValueChange={(value: 'active' | 'suspended' | 'pending' | 'verified') => handleEditFormChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="editVerification">Verification Status</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="editVerification"
                      checked={editDriverForm.isVerified}
                      onCheckedChange={(checked) => handleEditFormChange('isVerified', checked)}
                    />
                    <Label htmlFor="editVerification">
                      {editDriverForm.isVerified ? 'Verified' : 'Not Verified'}
                    </Label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="editDocuments">Documents Submitted</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="editDocuments"
                      checked={editDriverForm.documentsSubmitted}
                      onCheckedChange={(checked) => handleEditFormChange('documentsSubmitted', checked)}
                    />
                    <Label htmlFor="editDocuments">
                      {editDriverForm.documentsSubmitted ? 'Documents Approved' : 'Documents Pending'}
                    </Label>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Status Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Badge className={getStatusColor(editDriverForm.status)}>
                      {getStatusIcon(editDriverForm.status)}
                      <span className="ml-1 capitalize">{editDriverForm.status}</span>
                    </Badge>
                    {editDriverForm.isVerified && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {editDriverForm.documentsSubmitted && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <FileText className="w-3 h-3 mr-1" />
                        Documents Approved
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vehicles" className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editVehicleCount">Number of Vehicles</Label>
                  <Input
                    id="editVehicleCount"
                    type="number"
                    min="0"
                    value={editDriverForm.vehicleCount}
                    onChange={(e) => handleEditFormChange('vehicleCount', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">Vehicle Types</Label>
                <div className="flex flex-wrap gap-2">
                  {editDriverForm.vehicleTypes.map((type, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      {getVehicleIcon(type)}
                      <span className="capitalize">{type}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-red-100"
                        onClick={() => removeVehicleType(type)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Select onValueChange={addVehicleType}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Add vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="car">Car</SelectItem>
                      <SelectItem value="bus">Bus</SelectItem>
                      <SelectItem value="traveller">Auto-Ricksaw</SelectItem>
                      <SelectItem value="truck">Truck</SelectItem>
                      <SelectItem value="bike">Bike</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-gray-500">Click to add vehicle type</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editTotalTrips">Total Trips</Label>
                  <Input
                    id="editTotalTrips"
                    type="number"
                    min="0"
                    value={editDriverForm.totalTrips}
                    onChange={(e) => handleEditFormChange('totalTrips', parseInt(e.target.value) || 0)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="editTotalEarnings">Total Earnings (₹)</Label>
                  <Input
                    id="editTotalEarnings"
                    type="number"
                    min="0"
                    value={editDriverForm.totalEarnings}
                    onChange={(e) => handleEditFormChange('totalEarnings', parseInt(e.target.value) || 0)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="editRating">Rating</Label>
                  <Input
                    id="editRating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={editDriverForm.rating}
                    onChange={(e) => handleEditFormChange('rating', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Performance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Trips:</span>
                      <span className="font-medium">{editDriverForm.totalTrips}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Earnings:</span>
                      <span className="font-medium">{formatCurrency(editDriverForm.totalEarnings)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Rating:</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-current text-yellow-500" />
                        <span className="ml-1 font-medium">{editDriverForm.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Average per Trip:</span>
                      <span className="font-medium">
                        {editDriverForm.totalTrips > 0 
                          ? formatCurrency(editDriverForm.totalEarnings / editDriverForm.totalTrips)
                          : '₹0'
                        }
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => {
                setShowEditDriver(false);
                setEditingDriver(null);
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateDriver}
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Update Driver
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Vehicle Details Dialog */}
      <Dialog open={showVehicleDetails} onOpenChange={setShowVehicleDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Vehicle Details</DialogTitle>
          </DialogHeader>
          {selectedVehicle && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Vehicle Type</Label>
                  <p className="mt-1">{selectedVehicle.type.toUpperCase()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Brand & Model</Label>
                  <p className="mt-1">{selectedVehicle.brand} {selectedVehicle.model}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Year</Label>
                  <p className="mt-1">{selectedVehicle.year}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Registration</Label>
                  <p className="mt-1">{selectedVehicle.registrationNumber}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Owner</Label>
                  <p className="mt-1">{selectedVehicle.owner}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Phone</Label>
                  <p className="mt-1">{selectedVehicle.ownerPhone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Location</Label>
                  <p className="mt-1">{selectedVehicle.location}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Fuel Type</Label>
                  <p className="mt-1">{selectedVehicle.fuelType}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Seats</Label>
                  <p className="mt-1">{selectedVehicle.seats}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Total Trips</Label>
                  <p className="mt-1">{selectedVehicle.totalTrips}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Rating</Label>
                  <p className="mt-1">{selectedVehicle.rating}/5</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Last Service</Label>
                  <p className="mt-1">{selectedVehicle.lastService}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Next Service</Label>
                  <p className="mt-1">{selectedVehicle.nextService}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">Documents Status</Label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    {selectedVehicle.documents.rc ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span className="text-sm">RC Book</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedVehicle.documents.insurance ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span className="text-sm">Insurance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedVehicle.documents.permit ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span className="text-sm">Permit</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedVehicle.documents.fitness ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span className="text-sm">Fitness</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminDriverManagement; 