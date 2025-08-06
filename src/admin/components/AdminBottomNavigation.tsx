import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Calendar, 
  CreditCard, 
  User,
  Home,
  FileText,
  LogOut,
  Settings,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AdminBottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [adminProfile] = useState({
    name: "Admin User",
    email: "admin@chalosawari.com",
    avatar: "https://github.com/shadcn.png"
  });

  const navigationItems = [
    {
      title: "Home",
      href: "/admin",
      icon: Home,
    },
    {
      title: "Booking",
      href: "/admin/bookings",
      icon: Calendar,
    },
    {
      title: "Price",
      href: "/admin/vehicles",
      icon: CreditCard,
    },
    {
      title: "Profile",
      href: "/admin/profile",
      icon: User,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin-auth');
  };

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
      <div className="flex justify-around">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-3 px-3 min-w-0 flex-1",
                "transition-colors duration-200",
                active
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 mb-1",
                active ? "text-blue-600" : "text-gray-500"
              )} />
              <span className={cn(
                "text-xs font-medium truncate",
                active ? "text-blue-600" : "text-gray-600"
              )}>
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdminBottomNavigation; 