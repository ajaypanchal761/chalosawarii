import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeftRight, Calendar, MapPin, Search } from "lucide-react";
import HomeBanner from "@/assets/HomeBanner.webp";

const HeroSection = () => {
  return (
    <section 
      className="relative min-h-[500px] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${HomeBanner})` }}
    >
      <div className="absolute inset-0 "></div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            CHALO <span className="text-blue-600">SAWARI</span>
          </h1>
          <p className="text-xl text-white/90 mb-8">
              बस, कार, ट्रैवलर - शादी, बारात, टूर, पिकनिक, और हर ट्रैवल की जरूरत – अब सिर्फ एक क्लिक में बुक करें।
          </p>
        </div>

        <Card className="max-w-4xl mx-auto p-6 bg-white/95 backdrop-blur-sm shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            {/* From */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Departure City"
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Swap button */}
            <div className="flex justify-center md:self-end mb-3">
              <Button variant="outline" size="icon" className="rounded-full">
                <ArrowLeftRight className="w-4 h-4" />
              </Button>
            </div>

            {/* To */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Destination City"
                  className="pl-10 h-12"
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
                />
              </div>
            </div>

            {/* Search Button */}
            <Button className="h-12 bg-blue-600 text-white hover:bg-blue-700">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default HeroSection;