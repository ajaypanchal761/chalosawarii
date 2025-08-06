import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/admin/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  Users, 
  Search, 
  Filter, 
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
  RefreshCw,
  Shield,
  ShieldOff,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  status: 'active' | 'suspended' | 'pending';
  joinDate: string;
  totalBookings: number;
  totalSpent: number;
  lastActive: string;
  isVerified: boolean;
}

interface EditUserForm {
  name: string;
  email: string;
  phone: string;
  location: string;
  status: 'active' | 'suspended' | 'pending';
  isVerified: boolean;
  totalBookings: number;
  totalSpent: number;
  joinDate: string;
}

const AdminUserManagement = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editUserForm, setEditUserForm] = useState<EditUserForm>({
    name: "",
    email: "",
    phone: "",
    location: "",
    status: "active",
    isVerified: false,
    totalBookings: 0,
    totalSpent: 0,
    joinDate: ""
  });
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Ajay Panchal",
      email: "ajay@example.com",
      phone: "+91 9876543210",
      location: "Indore, Madhya Pradesh",
      avatar: "https://github.com/shadcn.png",
      status: "active",
      joinDate: "2024-01-15",
      totalBookings: 12,
      totalSpent: 15000,
      lastActive: "2024-03-15 14:30",
      isVerified: true
    },
    {
      id: "2",
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "+91 8765432109",
      location: "Mumbai, Maharashtra",
      avatar: "https://github.com/shadcn.png",
      status: "active",
      joinDate: "2024-02-20",
      totalBookings: 8,
      totalSpent: 12000,
      lastActive: "2024-03-14 16:45",
      isVerified: true
    },
    {
      id: "3",
      name: "Rahul Kumar",
      email: "rahul@example.com",
      phone: "+91 7654321098",
      location: "Delhi, NCR",
      avatar: "https://github.com/shadcn.png",
      status: "suspended",
      joinDate: "2024-01-10",
      totalBookings: 5,
      totalSpent: 8000,
      lastActive: "2024-03-10 09:15",
      isVerified: false
    },
    {
      id: "4",
      name: "Neha Patel",
      email: "neha@example.com",
      phone: "+91 6543210987",
      location: "Ahmedabad, Gujarat",
      avatar: "https://github.com/shadcn.png",
      status: "pending",
      joinDate: "2024-03-01",
      totalBookings: 0,
      totalSpent: 0,
      lastActive: "2024-03-15 11:20",
      isVerified: false
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
        
        // Simulate loading data
        await new Promise(resolve => setTimeout(resolve, 800));
        
      } catch (err) {
        console.error('Error initializing admin module:', err);
        toast({
          title: "Error",
          description: "Failed to load user management. Please try again.",
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
      case 'active':
        return 'bg-green-100 text-green-800';
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

  const handleStatusChange = (userId: string, newStatus: 'active' | 'suspended' | 'pending') => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    
    let message = `User status changed to ${newStatus}`;
    if (newStatus === 'active' && user.status === 'suspended') {
      message = `${user.name} has been unsuspended successfully`;
    } else if (newStatus === 'suspended' && user.status === 'active') {
      message = `${user.name} has been suspended`;
    }
    
    toast({
      title: newStatus === 'active' && user.status === 'suspended' ? "User Unsuspended" : "Status Updated",
      description: message,
      variant: "default",
    });
  };

  const handleUnsuspendUser = (userId: string) => {
    handleStatusChange(userId, 'active');
  };

  const handleVerificationToggle = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, isVerified: !user.isVerified } : user
    ));
    
    toast({
      title: "Verification Updated",
      description: "User verification status updated",
      variant: "default",
    });
  };

  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find(user => user.id === userId);
    if (userToDelete && window.confirm(`Are you sure you want to delete user ${userToDelete.name}? This action cannot be undone.`)) {
      setUsers(prev => prev.filter(user => user.id !== userId));
      toast({
        title: "User Deleted",
        description: `${userToDelete.name} has been permanently removed`,
        variant: "destructive",
      });
    }
  };

  const handleBulkStatusChange = (newStatus: 'active' | 'suspended' | 'pending') => {
    if (selectedUsers.length === 0) {
      toast({
        title: "No Users Selected",
        description: "Please select users to update",
        variant: "destructive",
      });
      return;
    }

    const updatedUsers = users.map(user => {
      if (selectedUsers.includes(user.id)) {
        return { ...user, status: newStatus };
      }
      return user;
    });

    setUsers(updatedUsers);
    setSelectedUsers([]);
    setShowBulkActions(false);

    let message = `${selectedUsers.length} users have been updated to ${newStatus}`;
    if (newStatus === 'active') {
      const suspendedCount = users.filter(user => selectedUsers.includes(user.id) && user.status === 'suspended').length;
      if (suspendedCount > 0) {
        message = `${suspendedCount} suspended users have been unsuspended`;
      }
    }

    toast({
      title: newStatus === 'active' ? "Bulk Unsuspend Complete" : "Bulk Update Complete",
      description: message,
    });
  };

  const handleBulkUnsuspend = () => {
    const suspendedUsers = selectedUsers.filter(userId => {
      const user = users.find(u => u.id === userId);
      return user && user.status === 'suspended';
    });

    if (suspendedUsers.length === 0) {
      toast({
        title: "No Suspended Users Selected",
        description: "Please select suspended users to unsuspend",
        variant: "destructive",
      });
      return;
    }

    handleBulkStatusChange('active');
  };

  const handleBulkDelete = () => {
    if (selectedUsers.length === 0) {
      toast({
        title: "No Users Selected",
        description: "Please select users to delete",
        variant: "destructive",
      });
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${selectedUsers.length} users? This action cannot be undone.`)) {
      const updatedUsers = users.filter(user => !selectedUsers.includes(user.id));
      setUsers(updatedUsers);
      setSelectedUsers([]);
      setShowBulkActions(false);

      toast({
        title: "Bulk Delete Complete",
        description: `${selectedUsers.length} users have been deleted successfully`,
      });
    }
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const selectAllUsers = () => {
    setSelectedUsers(filteredUsers.map(user => user.id));
  };

  const clearSelection = () => {
    setSelectedUsers([]);
  };

  // Edit user functions
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setEditUserForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
      status: user.status,
      isVerified: user.isVerified,
      totalBookings: user.totalBookings,
      totalSpent: user.totalSpent,
      joinDate: user.joinDate
    });
    setShowEditUser(true);
  };

  const handleEditFormChange = (field: keyof EditUserForm, value: any) => {
    setEditUserForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user in the list
      setUsers(prev => prev.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...editUserForm }
          : user
      ));
      
      toast({
        title: "User Updated",
        description: `${editUserForm.name}'s information has been updated successfully`,
        variant: "default",
      });

      setShowEditUser(false);
      setEditingUser(null);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesVerification = verificationFilter === "all" || 
                               (verificationFilter === "verified" && user.isVerified) ||
                               (verificationFilter === "unverified" && !user.isVerified);
    
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
          <p className="text-gray-600">Loading user management...</p>
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
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600 text-sm lg:text-base">Manage all registered users on the platform</p>
        </div>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
              <Users className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900">
                  {users.filter(u => u.status === 'active').length}
                </p>
              </div>
              <UserCheck className="w-6 h-6 lg:w-8 lg:h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Verified Users</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900">
                  {users.filter(u => u.isVerified).length}
                </p>
              </div>
              <Shield className="w-6 h-6 lg:w-8 lg:h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Suspended Users</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900">
                  {users.filter(u => u.status === 'suspended').length}
                </p>
              </div>
              <UserX className="w-6 h-6 lg:w-8 lg:h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bulk Actions Bar */}
      {selectedUsers.length > 0 && (
        <Card className="mb-4 shadow-sm border-0 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-blue-900">
                  {selectedUsers.length} user(s) selected
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
                <Select onValueChange={handleBulkStatusChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Change Status" />
                  </SelectTrigger>
                  <SelectContent>
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

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-4 lg:p-6">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users by name, email, or phone..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={verificationFilter} onValueChange={setVerificationFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Verification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
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
                  setSelectedUsers([]);
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

      {/* Users List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg lg:text-xl">Users ({filteredUsers.length})</CardTitle>
            {filteredUsers.length > 0 && (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                  onChange={selectAllUsers}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-600">Select All</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No users found matching your criteria</p>
            </div>
          ) : (
            <div className="space-y-4">
                            {filteredUsers.map((user) => (
                <div key={user.id} className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 border rounded-lg hover:bg-gray-50 gap-4">
                  <div className="flex items-start space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                      className="rounded border-gray-300 mt-2"
                    />
                    <Avatar className="w-12 h-12 flex-shrink-0">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 gap-2">
                        <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
                        <div className="flex flex-wrap gap-2">
                          {user.isVerified && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                              <Shield className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          <Badge className={`${getStatusColor(user.status)} text-xs`}>
                            {getStatusIcon(user.status)}
                            <span className="ml-1 capitalize">{user.status}</span>
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-600 mt-2 gap-1">
                        <span className="flex items-center">
                          <Mail className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span className="truncate">{user.email}</span>
                        </span>
                        <span className="flex items-center">
                          <Phone className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span className="truncate">{user.phone}</span>
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span className="truncate">{user.location}</span>
                        </span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs text-gray-500 mt-2 gap-1">
                        <span>Joined: {user.joinDate}</span>
                        <span>Bookings: {user.totalBookings}</span>
                        <span>Spent: {formatCurrency(user.totalSpent)}</span>
                        <span>Last Active: {user.lastActive}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end space-x-2 lg:flex-shrink-0">
                    {user.status === 'suspended' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUnsuspendUser(user.id)}
                        className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                      >
                        <UserCheck className="w-4 h-4 mr-1" />
                        Unsuspend
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditUser(user)}
                      className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowUserDetails(true);
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
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleVerificationToggle(user.id)}>
                          {user.isVerified ? (
                            <>
                              <ShieldOff className="w-4 h-4 mr-2" />
                              Remove Verification
                            </>
                          ) : (
                            <>
                              <Shield className="w-4 h-4 mr-2" />
                              Verify User
                            </>
                          )}
                        </DropdownMenuItem>
                        {user.status === 'suspended' ? (
                          <DropdownMenuItem onClick={() => handleUnsuspendUser(user.id)}>
                            <UserCheck className="w-4 h-4 mr-2" />
                            Unsuspend User
                          </DropdownMenuItem>
                        ) : (
                          <>
                            <DropdownMenuItem onClick={() => handleStatusChange(user.id, 'active')}>
                              <UserCheck className="w-4 h-4 mr-2" />
                              Activate
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(user.id, 'suspended')}>
                              <UserX className="w-4 h-4 mr-2" />
                              Suspend User
                            </DropdownMenuItem>
                          </>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete User
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete User</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {user.name}? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteUser(user.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete User
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

      {/* User Details Dialog */}
      <Dialog open={showUserDetails} onOpenChange={setShowUserDetails}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Avatar className="w-16 h-16 flex-shrink-0">
                  <AvatarImage src={selectedUser.avatar} />
                  <AvatarFallback>{selectedUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold truncate">{selectedUser.name}</h3>
                  <p className="text-gray-600 truncate">{selectedUser.email}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Badge className={getStatusColor(selectedUser.status)}>
                      {getStatusIcon(selectedUser.status)}
                      <span className="ml-1 capitalize">{selectedUser.status}</span>
                    </Badge>
                    {selectedUser.isVerified && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <p className="text-gray-900 break-all">{selectedUser.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Location</label>
                  <p className="text-gray-900 break-all">{selectedUser.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Join Date</label>
                  <p className="text-gray-900">{selectedUser.joinDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Last Active</label>
                  <p className="text-gray-900">{selectedUser.lastActive}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Total Bookings</label>
                  <p className="text-gray-900">{selectedUser.totalBookings}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Total Spent</label>
                  <p className="text-gray-900">{formatCurrency(selectedUser.totalSpent)}</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => handleVerificationToggle(selectedUser.id)}
                  className="flex-1"
                >
                  {selectedUser.isVerified ? 'Remove Verification' : 'Verify User'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleStatusChange(selectedUser.id, selectedUser.status === 'active' ? 'suspended' : 'active')}
                  className={`flex-1 ${selectedUser.status === 'suspended' ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' : ''}`}
                >
                  {selectedUser.status === 'active' ? 'Suspend User' : 'Unsuspend User'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={showEditUser} onOpenChange={setShowEditUser}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Edit User Information
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Full Name *</label>
                  <Input
                    placeholder="Enter user's full name"
                    value={editUserForm.name}
                    onChange={(e) => handleEditFormChange('name', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Email Address *</label>
                  <Input
                    type="email"
                    placeholder="user@example.com"
                    value={editUserForm.email}
                    onChange={(e) => handleEditFormChange('email', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Phone Number *</label>
                  <Input
                    type="tel"
                    placeholder="+91 9876543210"
                    value={editUserForm.phone}
                    onChange={(e) => handleEditFormChange('phone', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Location *</label>
                  <Input
                    placeholder="City, State"
                    value={editUserForm.location}
                    onChange={(e) => handleEditFormChange('location', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Status and Verification */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Status & Verification</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">User Status *</label>
                  <Select value={editUserForm.status} onValueChange={(value: 'active' | 'suspended' | 'pending') => handleEditFormChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Verification Status</label>
                  <div className="flex items-center space-x-2 pt-2">
                    <input
                      type="checkbox"
                      id="isVerified"
                      checked={editUserForm.isVerified}
                      onChange={(e) => handleEditFormChange('isVerified', e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="isVerified" className="text-sm text-gray-700">
                      User is verified
                    </label>
                  </div>
                </div>
              </div>

              {/* Status Summary */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Badge className={getStatusColor(editUserForm.status)}>
                    {getStatusIcon(editUserForm.status)}
                    <span className="ml-1 capitalize">{editUserForm.status}</span>
                  </Badge>
                  {editUserForm.isVerified && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Join Date</label>
                  <Input
                    type="date"
                    value={editUserForm.joinDate}
                    onChange={(e) => handleEditFormChange('joinDate', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Total Bookings</label>
                  <Input
                    type="number"
                    min="0"
                    value={editUserForm.totalBookings}
                    onChange={(e) => handleEditFormChange('totalBookings', parseInt(e.target.value) || 0)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Total Spent (₹)</label>
                  <Input
                    type="number"
                    min="0"
                    value={editUserForm.totalSpent}
                    onChange={(e) => handleEditFormChange('totalSpent', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              {/* Account Summary */}
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-800">Total Bookings:</span>
                    <span className="font-medium text-blue-900">{editUserForm.totalBookings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-800">Total Spent:</span>
                    <span className="font-medium text-blue-900">{formatCurrency(editUserForm.totalSpent)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-800">Average per Booking:</span>
                    <span className="font-medium text-blue-900">
                      {editUserForm.totalBookings > 0 
                        ? formatCurrency(editUserForm.totalSpent / editUserForm.totalBookings)
                        : '₹0'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => {
                setShowEditUser(false);
                setEditingUser(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateUser}
              className="min-w-[120px]"
            >
              <Edit className="w-4 h-4 mr-2" />
              Update User
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminUserManagement; 