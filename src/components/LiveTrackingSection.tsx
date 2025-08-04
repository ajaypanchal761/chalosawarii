import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Smartphone, Bell, Shield } from "lucide-react";

const LiveTrackingSection = () => {
  const features = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Real-time Location",
      description: "Track your bus location on live map"
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Smart Notifications",
      description: "Get alerts for delays and arrivals"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile App",
      description: "Track from anywhere using our app"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safe Journey",
      description: "Share trip details with family"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Track Your Vehicle Live
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Stay informed about your journey with real-time vehicle tracking. Know exactly where your Bus, Car, or Traveller is and when it will arrive at your destination.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Track My Vehicle
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                Learn More
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <Card className="p-8 bg-white shadow-lg">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-6">
                  <MapPin className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Live Vehicle Tracking
                </h3>
                <p className="text-muted-foreground mb-4">
                  Track your vehicle in real-time
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-chalosawari-light-gray rounded">
                    <span className="text-sm">Current Location</span>
                    <span className="text-sm font-semibold text-primary">Pune</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-chalosawari-light-gray rounded">
                    <span className="text-sm">ETA</span>
                    <span className="text-sm font-semibold text-primary">2h 30m</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-chalosawari-light-gray rounded">
                    <span className="text-sm">Status</span>
                    <span className="text-sm font-semibold text-green-600">On Time</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveTrackingSection;