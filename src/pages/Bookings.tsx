import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { List, Clock, MapPin, Calendar, User, Home, HelpCircle, X, Bus, CreditCard, Phone, Mail, ArrowRight, Navigation, Car, Train, Plane } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import TopNavigation from "@/components/TopNavigation";

const Bookings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const upcomingBookings = [
    {
      id: 1,
      from: "Mumbai",
      to: "Delhi",
      date: "15 Aug, 2025",
      time: "09:00 AM",
      status: "Confirmed",
      bookingId: "BK123456",
      busNumber: "MH01AB1234",
      seatNumber: "A12",
      fare: "₹2,500",
      passengerName: "Rahul Sharma",
      passengerPhone: "+91 98765 43210",
      passengerEmail: "rahul.sharma@email.com",
      departureTerminal: "Mumbai Central",
      arrivalTerminal: "Delhi ISBT",
      duration: "18 hours",
      busType: "AC Sleeper",
      operator: "Maharashtra State Transport",
      vehicleType: "bus",
      driverName: "Rajesh Kumar",
      driverPhone: "+91 98765 12345"
    },
    {
      id: 2,
      from: "Bangalore",
      to: "Chennai",
      date: "20 Aug, 2025",
      time: "02:30 PM",
      status: "Confirmed",
      bookingId: "BK123457",
      busNumber: "KA02CD5678",
      seatNumber: "B15",
      fare: "₹1,800",
      passengerName: "Priya Patel",
      passengerPhone: "+91 87654 32109",
      passengerEmail: "priya.patel@email.com",
      departureTerminal: "Bangalore Majestic",
      arrivalTerminal: "Chennai Central",
      duration: "8 hours",
      busType: "AC Seater",
      operator: "Karnataka State Transport",
      vehicleType: "bus",
      driverName: "Suresh Reddy",
      driverPhone: "+91 87654 23456"
    }
  ];

  const pastBookings = [
    {
      id: 3,
      from: "Pune",
      to: "Mumbai",
      date: "10 Aug, 2025",
      time: "11:00 AM",
      status: "Completed",
      bookingId: "BK123458",
      busNumber: "MH03EF9012",
      seatNumber: "C08",
      fare: "₹800",
      passengerName: "Amit Kumar",
      passengerPhone: "+91 76543 21098",
      passengerEmail: "amit.kumar@email.com",
      departureTerminal: "Pune Station",
      arrivalTerminal: "Mumbai Central",
      duration: "4 hours",
      busType: "Non-AC Seater",
      operator: "Maharashtra State Transport",
      vehicleType: "bus",
      driverName: "Mohan Singh",
      driverPhone: "+91 76543 34567"
    }
  ];

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setIsDetailModalOpen(true);
  };



  const currentBookings = activeTab === "upcoming" ? upcomingBookings : pastBookings;
  
  // Filter bookings based on search and status
  const filteredBookings = currentBookings.filter(booking => {
    const matchesSearch = 
      booking.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.passengerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || booking.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "Completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getVehicleIcon = (vehicleType) => {
    switch (vehicleType) {
      case "bus":
        return <Bus className="w-5 h-5 text-blue-600" />;
      case "car":
        return <Car className="w-5 h-5 text-green-600" />;
      case "train":
        return <Train className="w-5 h-5 text-purple-600" />;
      case "plane":
        return <Plane className="w-5 h-5 text-indigo-600" />;
      default:
        return <Bus className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <TopNavigation />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
          <p className="text-blue-100">Manage your travel reservations</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto">
          <div className="flex">
            <button
              className={`flex-1 py-4 text-sm font-medium transition-all duration-200 ${
                activeTab === "upcoming"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              <div className="flex items-center justify-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Upcoming</span>
              </div>
            </button>
            <button
              className={`flex-1 py-4 text-sm font-medium transition-all duration-200 ${
                activeTab === "past"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("past")}
            >
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Past</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto p-6 space-y-6 pb-24">


        {/* Bookings List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {activeTab === "upcoming" ? "Upcoming" : "Past"} Bookings
            </h2>
          </div>
          
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {getVehicleIcon(booking.vehicleType)}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {booking.from} <ArrowRight className="inline w-4 h-4 mx-2 text-gray-400" /> {booking.to}
                      </h3>
                      <p className="text-sm text-gray-500">Booking ID: {booking.bookingId}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(booking.status)} font-medium`}>
                    {booking.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Date</p>
                      <p className="text-sm font-semibold text-gray-900">{booking.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Time</p>
                      <p className="text-sm font-semibold text-gray-900">{booking.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Bus className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Seat</p>
                      <p className="text-sm font-semibold text-gray-900">{booking.seatNumber}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg mb-4">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-600">Total Fare:</span>
                  </div>
                  <span className="text-xl font-bold text-blue-600">{booking.fare}</span>
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
                    onClick={() => handleViewDetails(booking)}
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    View Details
                  </Button>

                </div>
              </CardContent>
            </Card>
            ))
          ) : (
            <div className="text-center py-16">
              {searchTerm || filterStatus !== "all" ? (
                <>
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <List className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
                  <p className="text-gray-500 mb-6">
                    No bookings match your current search criteria.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setFilterStatus("all");
                    }}
                    className="mr-3"
                  >
                    Clear Filters
                  </Button>
                  <Link to="/">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <MapPin className="w-4 h-4 mr-2" />
                      Book a Trip
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <List className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No {activeTab} bookings</h3>
                  <p className="text-gray-500 mb-6">You don't have any {activeTab} bookings at the moment.</p>
                  <Link to="/">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <MapPin className="w-4 h-4 mr-2" />
                      Book a Trip
                    </Button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Booking Details Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto p-4 md:p-6">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-lg md:text-xl">
              <span>Booking Details</span>
            </DialogTitle>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-6">
              {/* Route Info */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 md:p-6 rounded-xl border border-blue-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-3 md:space-y-0">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    {getVehicleIcon(selectedBooking.vehicleType)}
                    <h3 className="text-lg md:text-2xl font-bold text-gray-900">
                      {selectedBooking.from} <ArrowRight className="inline w-4 h-4 md:w-6 md:h-6 mx-2 md:mx-3 text-blue-500" /> {selectedBooking.to}
                    </h3>
                  </div>
                  <Badge className={`${getStatusColor(selectedBooking.status)} text-xs md:text-sm font-medium px-2 py-1 md:px-3 md:py-1 w-fit`}>
                    {selectedBooking.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 font-medium">Booking ID</p>
                    <p className="font-mono font-semibold text-gray-900 text-sm md:text-base">{selectedBooking.bookingId}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Fare</p>
                    <p className="text-lg md:text-xl font-bold text-blue-600">{selectedBooking.fare}</p>
                  </div>
                </div>
              </div>

              {/* Journey Details */}
              <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200">
                <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-600" />
                  Journey Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div className="flex items-center space-x-2 md:space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="font-semibold text-sm md:text-base">{selectedBooking.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 md:space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                    <div>
                      <p className="text-xs text-gray-500">Time</p>
                      <p className="font-semibold text-sm md:text-base">{selectedBooking.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 md:space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Bus className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                    <div>
                      <p className="text-xs text-gray-500">Seat</p>
                      <p className="font-semibold text-sm md:text-base">{selectedBooking.seatNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 md:space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-semibold text-sm md:text-base">{selectedBooking.duration}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bus Details */}
              <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200">
                <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Bus className="w-4 h-4 md:w-5 md:h-5 mr-2 text-purple-600" />
                  Vehicle Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 font-medium">Bus Number</p>
                    <p className="font-semibold font-mono text-sm md:text-base">{selectedBooking.busNumber}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 font-medium">Type</p>
                    <p className="font-semibold text-sm md:text-base">{selectedBooking.busType}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 font-medium">Operator</p>
                    <p className="font-semibold text-sm md:text-base">{selectedBooking.operator}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 font-medium">Duration</p>
                    <p className="font-semibold text-sm md:text-base">{selectedBooking.duration}</p>
                  </div>
                </div>
              </div>

              {/* Driver Information */}
              <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200">
                <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="w-4 h-4 md:w-5 md:h-5 mr-2 text-orange-600" />
                  Driver Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div className="flex items-center space-x-2 md:space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <User className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
                    <div>
                      <p className="text-xs text-orange-600 font-medium">Driver Name</p>
                      <p className="font-semibold text-gray-900 text-sm md:text-base">{selectedBooking.driverName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 md:space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
                    <div>
                      <p className="text-xs text-orange-600 font-medium">Driver Contact</p>
                      <p className="font-semibold text-gray-900 text-sm md:text-base">{selectedBooking.driverPhone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Passenger Details */}
              <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200">
                <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="w-4 h-4 md:w-5 md:h-5 mr-2 text-green-600" />
                  Passenger Details
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 md:space-x-3 p-3 bg-gray-50 rounded-lg">
                    <User className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="font-semibold text-sm md:text-base">{selectedBooking.passengerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 md:space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="font-semibold text-sm md:text-base">{selectedBooking.passengerPhone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 md:space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-semibold text-sm md:text-base">{selectedBooking.passengerEmail}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terminals */}
              <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200">
                <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2 text-red-600" />
                  Terminal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div className="p-3 md:p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-xs text-red-600 font-medium mb-1">Departure Terminal</p>
                    <p className="font-semibold text-gray-900 text-sm md:text-base">{selectedBooking.departureTerminal}</p>
                  </div>
                  <div className="p-3 md:p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-xs text-green-600 font-medium mb-1">Arrival Terminal</p>
                    <p className="font-semibold text-gray-900 text-sm md:text-base">{selectedBooking.arrivalTerminal}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>



      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white shadow-lg z-50">
        <div className="flex justify-around py-3">
          <Link to="/" className="flex flex-col items-center space-y-1">
            <Home className="w-5 h-5 text-gray-500" />
            <span className="text-xs text-gray-500">Home</span>
          </Link>
          <Link to="/bookings" className="flex flex-col items-center space-y-1">
            <List className="w-5 h-5 text-blue-600" />
            <span className="text-xs text-blue-600 font-medium">Bookings</span>
          </Link>
          <Link to="/help" className="flex flex-col items-center space-y-1">
            <HelpCircle className="w-5 h-5 text-gray-500" />
            <span className="text-xs text-gray-500">Help</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center space-y-1">
            <User className="w-5 h-5 text-gray-500" />
            <span className="text-xs text-gray-500">Account</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Bookings; 