import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ArrowLeftRight, Calendar, MapPin, Search, Bus, Plane, PlaneTakeoff, Home, List, HelpCircle, User, Train } from "lucide-react";
import HomeBanner from "@/assets/HomeBanner.webp";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const HeroSection = () => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("2025-08-04");
  const [returnDate, setReturnDate] = useState("2025-08-06");
  const [pickupTime, setPickupTime] = useState("09:00");
  const [selectedDate, setSelectedDate] = useState("04");
  const [activeService, setActiveService] = useState("oneWay");
  const [womenBooking, setWomenBooking] = useState(false);

  const handleSwapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const handleSearch = () => {
    console.log("Searching for:", { fromLocation, toLocation, departureDate });
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    // Update the actual date value based on selected date
    const baseDate = "2025-08-";
    setDepartureDate(baseDate + date.padStart(2, '0'));
  };

  return (
    <section 
      className="relative min-h-screen flex flex-col bg-white"
    >
      {/* Desktop Hero Content */}
      <div className="hidden md:block relative min-h-[500px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${HomeBanner})` }}>
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              CHALO <span className="text-primary">SAWARI</span>
            </h1>
            <p className="text-xl text-white/90 mb-8">
                बस, कार, ट्रैवलर - शादी, बारात, टूर, पिकनिक, और हर ट्रैवल की जरूरत – अब सिर्फ एक क्लिक में बुक करें।
            </p>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:block">
            <Card className="max-w-4xl mx-auto p-6 bg-background/95 backdrop-blur-sm shadow-lg">
              <div className="grid grid-cols-5 gap-4 items-end">
                {/* From */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">From</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center z-10">
                      <Search className="w-3 h-3 text-primary" />
                    </div>
                    <Input
                      placeholder="Departure City"
                      className="pl-10 h-12"
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                    />
                  </div>
                </div>

                {/* Swap button */}
                <div className="flex justify-center self-end mb-3">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full hover:bg-muted hover:border-primary transition-colors"
                    onClick={handleSwapLocations}
                    title="Swap locations"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* To */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">To</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center z-10">
                      <MapPin className="w-3 h-3 text-primary" />
                    </div>
                    <Input
                      placeholder="Destination City"
                      className="pl-10 h-12"
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                    />
                  </div>
                </div>

                {/* Departure Date */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Departure</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      type="date"
                      className="pl-10 h-12"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                    />
                  </div>
                </div>

                {/* Search Button */}
                <Button 
                  className="h-12 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleSearch}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden flex-1 flex flex-col">
        {/* Top Service Navigation */}
        <div className="flex justify-center space-x-4 p-4 border-b border-border">
          <Button 
            variant={activeService === "oneWay" ? "default" : "outline"}
            size="sm"
            className={`${
              activeService === "oneWay" 
                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                : "text-muted-foreground border-border hover:bg-muted"
            }`}
            onClick={() => setActiveService("oneWay")}
          >
            One Way
          </Button>
          
          <Button 
            variant={activeService === "roundTrip" ? "default" : "outline"}
            size="sm"
            className={`${
              activeService === "roundTrip" 
                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                : "text-muted-foreground border-border hover:bg-muted"
            }`}
            onClick={() => setActiveService("roundTrip")}
          >
            Round Trip
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 space-y-4 pb-20">

          {/* Main Booking Card */}
          <Card className="p-4 bg-background shadow-sm rounded-xl border border-border">
            {/* From Field */}
            <div className="mb-4">
              <div className="relative">
                <Bus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  className="pl-12 h-12 border-border rounded-lg"
                  placeholder="From"
                />
              </div>
            </div>

            {/* To Field */}
            <div className="mb-4">
              <div className="relative">
                <Bus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  className="pl-12 h-12 border-border rounded-lg"
                  placeholder="To"
                />
              </div>
            </div>

            {/* Date of Journey */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Pickup Date</span>
                </div>
              </div>
              <div className="relative">
                <Input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="h-12 border-border rounded-lg"
                />
              </div>
            </div>

             {/* Pickup Time - Show for both One Way and Round Trip */}
             <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Pickup Time</span>
                </div>
              </div>
              <div className="relative">
                <Input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="h-12 border-border rounded-lg"
                />
              </div>
            </div>

            {/* Return Date - Only show for Round Trip */}
            {activeService === "roundTrip" && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Return Date</span>
                  </div>
                </div>
                <div className="relative">
                  <Input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="h-12 border-border rounded-lg"
                  />
                </div>
              </div>
            )}

           
          </Card>


          {/* Search Button */}
          <Button 
            className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-lg font-semibold"
            onClick={handleSearch}
          >
            <Search className="w-5 h-5 mr-2" />
            Search buses
          </Button>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background z-50">
          <div className="flex justify-around py-2">
            <Link to="/" className="flex flex-col items-center space-y-1">
              <Home className="w-5 h-5 text-primary" />
              <span className="text-xs text-primary font-medium">Home</span>
            </Link>
            <Link to="/bookings" className="flex flex-col items-center space-y-1">
              <List className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Bookings</span>
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
    </section>
  );
};

export default HeroSection;