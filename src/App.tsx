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

import NotFound from "./pages/NotFound";
import DriverAuth from "./driver/pages/DriverAuth";
import DriverHome from "./driver/pages/DriverHome";
import DriverRequests from "./driver/pages/DriverRequests";
import DriverMyVehicle from "./driver/pages/DriverMyVehicle";
import DriverProfile from "./driver/pages/DriverProfile";
import AdminAuth from "./admin/pages/AdminAuth";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminUserManagement from "./admin/pages/AdminUserManagement";
import AdminDriverManagement from "./admin/pages/AdminDriverManagement";
import AdminPriceManagement from "./admin/pages/AdminPriceManagement";
import AdminVehicleManagement from "./admin/pages/AdminVehicleManagement";
import AdminSettings from "./admin/pages/AdminSettings";
import AdminSupportManagement from "./admin/pages/AdminSupportManagement";
import AdminPaymentManagement from "./admin/pages/AdminPaymentManagement";

import AdminBookingManagement from "./admin/pages/AdminBookingManagement";
import AdminProfile from "./admin/pages/AdminProfile";
import AdminOffersCoupons from "./admin/pages/AdminOffersCoupons";

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

          
          {/* Driver Module Routes */}
          <Route path="/driver-auth" element={<DriverAuth />} />
          <Route path="/driver" element={<DriverHome />} />
          <Route path="/driver/requests" element={<DriverRequests />} />
          <Route path="/driver/myvehicle" element={<DriverMyVehicle />} />
          <Route path="/driver/profile" element={<DriverProfile />} />
          
          {/* Admin Module Routes */}
          <Route path="/admin-auth" element={<AdminAuth />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUserManagement />} />
          <Route path="/admin/drivers" element={<AdminDriverManagement />} />
          <Route path="/admin/vehicles" element={<AdminVehicleManagement />} />
          <Route path="/admin/prices" element={<AdminPriceManagement />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/support" element={<AdminSupportManagement />} />
          <Route path="/admin/payments" element={<AdminPaymentManagement />} />
          <Route path="/admin/offers-coupons" element={<AdminOffersCoupons />} />

          <Route path="/admin/bookings" element={<AdminBookingManagement />} />
          <Route path="/admin/bookings/active" element={<AdminBookingManagement />} />
          <Route path="/admin/bookings/completed" element={<AdminBookingManagement />} />
          <Route path="/admin/bookings/cancelled" element={<AdminBookingManagement />} />
          <Route path="/admin/bookings/analytics" element={<AdminBookingManagement />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
