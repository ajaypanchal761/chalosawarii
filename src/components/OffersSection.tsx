import { Card } from "@/components/ui/card";
import Vrindavan from "@/assets/vrindavan.png";
import Sawariya from "@/assets/Sawariya.png";
import Tirupati from "@/assets/Tirupati.png";

const OffersSection = () => {
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
          <Card className="p-6 border-2 border-primary/20 bg-white shadow-card">
            <img 
              src={Vrindavan} 
              alt="Vrindavan" 
              className="w-full h-auto max-w-md mx-auto"
            />
          </Card>
          
          <Card className="p-6 border-2 border-primary/20 bg-white shadow-card">
            <img 
              src={Sawariya} 
              alt="Sawariya" 
              className="w-full h-auto max-w-md mx-auto"
            />
          </Card>
          
          <Card className="p-6 border-2 border-primary/20 bg-white shadow-card">
            <img 
              src={Tirupati} 
              alt="Tirupati" 
              className="w-full h-auto max-w-md mx-auto"
            />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;