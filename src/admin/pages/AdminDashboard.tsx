import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/admin/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Car, 
  Bus, 
  Calendar, 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  MessageSquare,
  BarChart3,
  Activity,
  DollarSign,
  UserCheck,
  UserX,
  Car as CarIcon,
  Bus as BusIcon,
  Truck,
  Bike,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Plus,
  Settings
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DashboardStats {
  totalUsers: number;
  totalDrivers: number;
  totalVehicles: number;
  totalBookings: number;
  totalRevenue: number;
  activeTrips: number;
  pendingVerifications: number;
  supportTickets: number;
}

interface RecentActivity {
  id: string;
  type: 'user' | 'driver' | 'booking' | 'payment' | 'support';
  title: string;
  description: string;
  time: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalDrivers: 0,
    totalVehicles: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeTrips: 0,
    pendingVerifications: 0,
    supportTickets: 0
  });

  const [recentActivities] = useState<RecentActivity[]>([
    {
      id: "1",
      type: "user",
      title: "New User Registration",
      description: "Ajay Panchal registered as a new user",
      time: "2 minutes ago",
      status: "success"
    },
    {
      id: "2",
      type: "driver",
      title: "Driver Verification Pending",
      description: "Rahul Kumar submitted verification documents",
      time: "15 minutes ago",
      status: "warning"
    },
    {
      id: "3",
      type: "booking",
      title: "Trip Completed",
      description: "Trip from Delhi to Mumbai completed successfully",
      time: "1 hour ago",
      status: "success"
    },
    {
      id: "4",
      type: "payment",
      title: "Payment Received",
      description: "₹2,500 received for booking #CS12345",
      time: "2 hours ago",
      status: "success"
    },
    {
      id: "5",
      type: "support",
      title: "Support Ticket Opened",
      description: "User reported issue with booking cancellation",
      time: "3 hours ago",
      status: "error"
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
        
        // Simulate loading dashboard data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Set mock data
        setStats({
          totalUsers: 2547,
          totalDrivers: 156,
          totalVehicles: 89,
          totalBookings: 1247,
          totalRevenue: 4520000,
          activeTrips: 23,
          pendingVerifications: 8,
          supportTickets: 12
        });
        
      } catch (err) {
        console.error('Error initializing admin module:', err);
        toast({
          title: "Error",
          description: "Failed to load admin dashboard. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeAdminModule();
  }, [navigate]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return <Users className="w-4 h-4" />;
      case 'driver': return <Car className="w-4 h-4" />;
      case 'booking': return <Calendar className="w-4 h-4" />;
      case 'payment': return <CreditCard className="w-4 h-4" />;
      case 'support': return <MessageSquare className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
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
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-sm md:text-base text-gray-600">Welcome back! Here's what's happening with your business today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
              <div className="ml-3 md:ml-4">
                <p className="text-xs md:text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-lg md:text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Car className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
              <div className="ml-3 md:ml-4">
                <p className="text-xs md:text-sm font-medium text-gray-600">Total Drivers</p>
                <p className="text-lg md:text-2xl font-bold text-gray-900">{stats.totalDrivers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Bus className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
              </div>
              <div className="ml-3 md:ml-4">
                <p className="text-xs md:text-sm font-medium text-gray-600">Total Vehicles</p>
                <p className="text-lg md:text-2xl font-bold text-gray-900">{stats.totalVehicles}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
              </div>
              <div className="ml-3 md:ml-4">
                <p className="text-xs md:text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-lg md:text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-lg md:text-xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600">Active Trips</p>
                <p className="text-lg md:text-xl font-bold text-gray-900">{stats.activeTrips}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600">Pending Verifications</p>
                <p className="text-lg md:text-xl font-bold text-gray-900">{stats.pendingVerifications}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600">Support Tickets</p>
                <p className="text-lg md:text-xl font-bold text-gray-900">{stats.supportTickets}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/users')}>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600">Manage Users</p>
                <p className="text-lg md:text-xl font-bold text-gray-900">Users</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/drivers')}>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600">Manage Drivers</p>
                <p className="text-lg md:text-xl font-bold text-gray-900">Drivers</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Car className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>



        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/bookings')}>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600">View Bookings</p>
                <p className="text-lg md:text-xl font-bold text-gray-900">Bookings</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/settings')}>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600">System Settings</p>
                <p className="text-lg md:text-xl font-bold text-gray-900">Settings</p>
              </div>
              <div className="p-2 bg-gray-100 rounded-lg">
                <Settings className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getStatusColor(activity.status)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">System Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">System Health</span>
                  <span className="text-green-600 font-medium">Excellent</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Server Load</span>
                  <span className="text-blue-600 font-medium">Normal</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Database</span>
                  <span className="text-green-600 font-medium">Healthy</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">API Response</span>
                  <span className="text-green-600 font-medium">Fast</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard; 