import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ArrowLeftRight, Calendar, MapPin, Search, Bus, Plane, PlaneTakeoff, Home, List, HelpCircle, User, Train } from "lucide-react";
import HomeBanner from "@/assets/Home3.png";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Marquee Component
const Marquee = ({ text }: { text: string }) => {
  return (
    <div className="overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 py-2">
      <div className="animate-marquee whitespace-nowrap">
        <span className="text-white text-lg font-medium mx-4">{text}</span>
        <span className="text-white text-lg font-medium mx-4">{text}</span>
        <span className="text-white text-lg font-medium mx-4">{text}</span>
        <span className="text-white text-lg font-medium mx-4">{text}</span>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();
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
    // Navigate to bus search page with search parameters
    navigate('/bus-search', { 
      state: { 
        from: fromLocation, 
        to: toLocation, 
        date: departureDate 
      } 
    });
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    // Update the actual date value based on selected date
    const baseDate = "2025-08-";
    setDepartureDate(baseDate + date.padStart(2, '0'));
  };

  return (
    <section  className="relative min-h-[600px] flex flex-col bg-white">
      {/* Marquee at the top - touching navigation */}
      <Marquee text="बस, कार, ट्रैवलर - शादी, बारात, टूर, पिकनिक, और हर ट्रैवल की जरूरत – अब सिर्फ एक क्लिक में बुक करें।" />
      
      {/* Desktop Hero Content */}
      <div className="hidden md:block relative min-h-[580px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${HomeBanner})` }}>
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative z-10 container mx-auto px-4 -ml-20">
          <div className="text-right mb-8">
            <h1 className="text-5x1 md:text-7xl font-bold text-black mt-6 mr-44">
              CHALO <span className="text-blue-700">SAWARI</span>
            </h1>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:block">
            {/* Service Type Selection */}
            <div className="flex justify-center space-x-4 -mt-3 mb-12 ml-[500px]">
              <Button 
                variant={activeService === "oneWay" ? "default" : "outline"}
                size="sm"
                className={`${
                  activeService === "oneWay" 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                    : "text-muted-foreground border-border hover:bg-muted bg-white"
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
                    : "text-muted-foreground border-border hover:bg-muted bg-white"
                }`}
                onClick={() => setActiveService("roundTrip")}
              >
                Return Trip
              </Button>
            </div>

            <Card className="max-w-6xl px-6 pt-4 pb-6 bg-white/95 backdrop-blur-md shadow-2xl border-0 rounded-2xl -mt-10 ml-[450px]">
              <div className={`grid gap-6 items-end -mt-2 ${activeService === "roundTrip" ? "grid-cols-5" : "grid-cols-4"}`}>
                {/* From */}
                <div className="space-y-2 relative">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">From</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center z-10">
                      <Search className="w-4 h-4 text-blue-600" />
                    </div>
                    <Input
                      placeholder="Departure ( कहाँ से )"
                      className="pl-12 h-14 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base"
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                    />
                  </div>
                  {/* Swap Icon overlapping From field */}
                  <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 z-20">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full w-10 h-10 bg-white shadow-lg hover:bg-blue-50 hover:border-blue-500 transition-all duration-200 border-gray-200"
                      onClick={handleSwapLocations}
                      title="Swap locations"
                    >
                      <ArrowLeftRight className="w-5 h-5 text-gray-600" />
                    </Button>
                  </div>
                </div>

                {/* To */}
                <div className="space-y-2 relative">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">To</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-7 h-7 bg-green-100 rounded-full flex items-center justify-center z-10">
                      <MapPin className="w-4 h-4 text-green-600" />
                    </div>
                    <Input
                      placeholder="Destination ( कहाँ तक )"
                      className="pl-12 h-14 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-base"
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                    />
                  </div>
                </div>

                {/* Departure Date */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Pickup Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 w-5 h-5" />
                    <Input
                      type="date"
                      className="pl-12 h-14 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-base"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                    />
                  </div>
                </div>

                {/* Pickup Time */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Pickup Time</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
                    <Input
                      type="time"
                      className="pl-12 h-14 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-base"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                    />
                  </div>
                </div>

                {/* Return Date - Only show for Round Trip */}
                {activeService === "roundTrip" && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Return</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                      <Input
                        type="date"
                        className="pl-12 h-14 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-base"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                      />
                    </div>
                  </div>
                )}


              </div>
            </Card>
            
            {/* Search Button - Outside Card */}
            <div className="flex justify-center mt-6 ml-[450px]">
              <Button 
                className="-mt-11 h-12 px-6 bg-primary text-primary-foreground hover:bg-primary/90 rounded-3xl shadow-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105"
                onClick={handleSearch}
              >
                <Search className="w-5 h-5 mr-3" />
                Search
              </Button>
            </div>
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
            Return Trip
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 space-y-4 pb-20">

          {/* Main Booking Card */}
          <Card className="p-4 bg-background shadow-sm rounded-xl border border-border">
            {/* From Field */}
            <div className="mb-4 relative">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-7 h-7 bg-primary/20 rounded-full flex items-center justify-center z-10">
                  <Search className="w-4 h-4 text-primary" />
                </div>
                <Input
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  className="pl-14 h-14 border-border/50 bg-background/90 backdrop-blur-sm text-lg font-medium rounded-xl"
                  placeholder="Departure City ( कहाँ से )"
                />
              </div>
              {/* Swap Icon overlapping From field */}
              <div className="absolute right-5 top-full transform -translate-y-3 z-20">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-border/50 hover:bg-primary/10 hover:border-primary transition-all duration-200 w-10 h-10 shadow-md bg-white"
                  onClick={handleSwapLocations}
                >
                  <ArrowLeftRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* To Field */}
            <div className="mb-6 relative">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-7 h-7 bg-primary/20 rounded-full flex items-center justify-center z-10">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <Input
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  className="pl-14 h-14 border-border/50 bg-background/90 backdrop-blur-sm text-lg font-medium rounded-xl"
                  placeholder="Destination City ( कहाँ तक )"
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

          {/* Search Button - Mobile */}
          <Button 
            className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl shadow-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 mt-4"
            onClick={handleSearch}
          >
            <Search className="w-5 h-5 mr-3" />
            Search
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