import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Bookings from "./pages/Bookings";
import Help from "./pages/Help";
import Profile from "./pages/Profile";
import BusSearch from "./pages/BusSearch";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";
import DriverAuth from "./driver/pages/DriverAuth";
import DriverHome from "./driver/pages/DriverHome";
import DriverRequests from "./driver/pages/DriverRequests";
import DriverMyVehicle from "./driver/pages/DriverMyVehicle";
import DriverProfile from "./driver/pages/DriverProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bus-search" element={<BusSearch />} />
          <Route path="/payment" element={<Payment />} />
          
          {/* Driver Module Routes */}
          <Route path="/driver-auth" element={<DriverAuth />} />
          <Route path="/driver" element={<DriverHome />} />
          <Route path="/driver/requests" element={<DriverRequests />} />
          <Route path="/driver/myvehicle" element={<DriverMyVehicle />} />
          <Route path="/driver/profile" element={<DriverProfile />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
