import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, IndianRupee } from "lucide-react";

const PopularRoutes = () => {
  const routes = [
    {
      from: "Delhi",
      to: "Mumbai",
      duration: "18h 30m",
      price: "₹1,200",
      discount: "20% OFF",
      buses: "25+ buses"
    },
    {
      from: "Bangalore",
      to: "Chennai",
      duration: "6h 45m",
      price: "₹800",
      discount: "15% OFF",
      buses: "30+ buses"
    },
    {
      from: "Hyderabad",
      to: "Pune",
      duration: "9h 15m",
      price: "₹950",
      discount: "25% OFF",
      buses: "20+ buses"
    },
    {
      from: "Mumbai",
      to: "Goa",
      duration: "10h 20m",
      price: "₹750",
      discount: "18% OFF",
      buses: "15+ buses"
    },
    {
      from: "Chennai",
      to: "Coimbatore",
      duration: "7h 30m",
      price: "₹650",
      discount: "22% OFF",
      buses: "18+ buses"
    },
    {
      from: "Delhi",
      to: "Jaipur",
      duration: "5h 45m",
      price: "₹550",
      discount: "30% OFF",
      buses: "35+ buses"
    }
  ];

  return (
    <section className="py-16 bg-chalosawari-light-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Popular Bus Routes
          </h2>
          <p className="text-muted-foreground text-lg">
            Book tickets for the most traveled routes with the best prices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {routes.map((route, index) => (
            <Card key={index} className="p-6 bg-white shadow-card hover:shadow-lg transition-all border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-lg text-foreground">
                    {route.from} → {route.to}
                  </span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {route.discount}
                </Badge>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{route.duration}</span>
                  </div>
                  <span className="text-muted-foreground">{route.buses}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-primary font-bold text-xl">
                    <IndianRupee className="w-5 h-5" />
                    <span>{route.price.replace('₹', '')}</span>
                  </div>
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Book Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;