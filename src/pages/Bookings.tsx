import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { List, Clock, MapPin, Calendar, User, Home, HelpCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Bookings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingBookings = [
    {
      id: 1,
      from: "Mumbai",
      to: "Delhi",
      date: "15 Aug, 2025",
      time: "09:00 AM",
      status: "Confirmed",
      bookingId: "BK123456"
    },
    {
      id: 2,
      from: "Bangalore",
      to: "Chennai",
      date: "20 Aug, 2025",
      time: "02:30 PM",
      status: "Confirmed",
      bookingId: "BK123457"
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
      bookingId: "BK123458"
    }
  ];

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
          Upcoming
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
        {activeTab === "upcoming" ? (
          upcomingBookings.length > 0 ? (
            upcomingBookings.map((booking) => (
              <Card key={booking.id} className="p-4 border border-border">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {booking.from} → {booking.to}
                    </h3>
                    <p className="text-sm text-muted-foreground">Booking ID: {booking.bookingId}</p>
                  </div>
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
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
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <List className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No upcoming bookings</p>
            </div>
          )
        ) : (
          pastBookings.length > 0 ? (
            pastBookings.map((booking) => (
              <Card key={booking.id} className="p-4 border border-border">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {booking.from} → {booking.to}
                    </h3>
                    <p className="text-sm text-muted-foreground">Booking ID: {booking.bookingId}</p>
                  </div>
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
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
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <List className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No past bookings</p>
            </div>
          )
        )}
      </div>

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