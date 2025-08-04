import { Card } from "@/components/ui/card";
import { Shield, Clock, MapPin, Headphones, CreditCard, Star } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safe & Secure",
      description: "Verified bus operators and secure payment gateway for safe transactions"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round the clock customer support to assist you with your travel needs"
    },
    
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Customer Care",
      description: "Dedicated customer care team to help you with bookings and queries"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Easy Payments",
      description: "Multiple payment options including UPI, cards, and digital wallets"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Best Prices",
      description: "Compare prices across operators and get the best deals on Bus, Car, and Traveller bookings"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Chalo Sawari?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the best Bus, Car, and Traveller booking platform with unmatched service quality and customer satisfaction
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-border bg-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;