import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { List, Clock, MapPin, Calendar, User, Home, HelpCircle, X, Bus, CreditCard, Phone, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Bookings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

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
      operator: "Maharashtra State Transport"
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
      operator: "Karnataka State Transport"
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
      operator: "Maharashtra State Transport"
    }
  ];

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setIsDetailModalOpen(true);
  };

  const handleCancelBooking = () => {
    setIsCancelModalOpen(true);
  };

  const confirmCancelBooking = () => {
    // Here you would typically make an API call to cancel the booking
    console.log("Cancelling booking:", selectedBooking.bookingId);
    setIsCancelModalOpen(false);
    setIsDetailModalOpen(false);
    setSelectedBooking(null);
    // You could also update the local state to remove the booking
  };

  const currentBookings = activeTab === "upcoming" ? upcomingBookings : pastBookings;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <h1 className="text-xl font-semibold">My Bookings</h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-border">
        <button
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === "upcoming"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Booking
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === "past"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("past")}
        >
          Past
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 pb-20">
        {currentBookings.length > 0 ? (
          currentBookings.map((booking) => (
            <Card key={booking.id} className="p-4 border border-border">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">
                    {booking.from} → {booking.to}
                  </h3>
                  <p className="text-sm text-muted-foreground">Booking ID: {booking.bookingId}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  booking.status === "Confirmed" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {booking.status}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{booking.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{booking.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bus className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">Seat {booking.seatNumber}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleViewDetails(booking)}
                >
                  View Details
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <List className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No {activeTab} bookings</p>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Booking Details</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDetailModalOpen(false)}
              >
               
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-4">
              {/* Route Info */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">
                    {selectedBooking.from} → {selectedBooking.to}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    selectedBooking.status === "Confirmed" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {selectedBooking.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Booking ID: {selectedBooking.bookingId}</p>
              </div>

              {/* Journey Details */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Journey Details</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedBooking.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedBooking.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bus className="w-4 h-4 text-muted-foreground" />
                    <span>Seat {selectedBooking.seatNumber}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedBooking.fare}</span>
                  </div>
                </div>
              </div>

              {/* Bus Details */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Bus Details</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Bus Number:</strong> {selectedBooking.busNumber}</div>
                  <div><strong>Bus Type:</strong> {selectedBooking.busType}</div>
                  <div><strong>Operator:</strong> {selectedBooking.operator}</div>
                  <div><strong>Duration:</strong> {selectedBooking.duration}</div>
                </div>
              </div>

              {/* Passenger Details */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Passenger Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedBooking.passengerName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedBooking.passengerPhone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedBooking.passengerEmail}</span>
                  </div>
                </div>
              </div>

              {/* Terminals */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Terminals</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Departure:</strong> {selectedBooking.departureTerminal}</div>
                  <div><strong>Arrival:</strong> {selectedBooking.arrivalTerminal}</div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation Modal */}
      <Dialog open={isCancelModalOpen} onOpenChange={setIsCancelModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Are you sure you want to cancel your booking from {selectedBooking?.from} to {selectedBooking?.to}?
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> Cancellation charges may apply based on the cancellation policy.
            </p>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsCancelModalOpen(false)}
              >
                Keep Booking
              </Button>
              <Button 
                className="flex-1 bg-red-600 text-white hover:bg-red-700"
                onClick={confirmCancelBooking}
              >
                Cancel Booking
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background z-50">
        <div className="flex justify-around py-2">
          <Link to="/" className="flex flex-col items-center space-y-1">
            <Home className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Home</span>
          </Link>
          <Link to="/bookings" className="flex flex-col items-center space-y-1">
            <List className="w-5 h-5 text-primary" />
            <span className="text-xs text-primary font-medium">Bookings</span>
          </Link>
          <Link to="/help" className="flex flex-col items-center space-y-1">
            <HelpCircle className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Help</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center space-y-1">
            <User className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Account</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Bookings; 