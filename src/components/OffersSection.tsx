import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Percent, Clock } from "lucide-react";

const OffersSection = () => {
  const offers = [
    {
      id: 1,
      title: "FIRST20",
      description: "Get 20% off on your first booking",
      discount: "20% OFF",
      validTill: "Valid till 31 Dec",
      icon: <Gift className="w-6 h-6" />
    },
    {
      id: 2,
      title: "WEEKEND50",
      description: "Save up to ₹50 on weekend bookings",
      discount: "₹50 OFF",
      validTill: "Valid on weekends",
      icon: <Percent className="w-6 h-6" />
    },
    {
      id: 3,
      title: "EARLY25",
      description: "Book early and save 25%",
      discount: "25% OFF",
      validTill: "Book 7 days ahead",
      icon: <Clock className="w-6 h-6" />
    }
  ];

  return (
    <section className="pt-2 pb-2 bg-chalosawari-light-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Exclusive Offers & Discounts
          </h2>
          <p className="text-muted-foreground text-lg">
            Save more with our limited-time offers and promotional codes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {offers.map((offer) => (
            <Card key={offer.id} className="p-6 border-2 border-primary/20 hover:border-primary/40 transition-colors bg-white shadow-card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {offer.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{offer.title}</h3>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {offer.discount}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">{offer.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{offer.validTill}</span>
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Use Code
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;