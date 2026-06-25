import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { ListIcon, Users } from "lucide-react";

const navItems = [
  {
    title: "Listings",
    href: "/Dashboard",
    icon: ListIcon,
  },
  {
    title: "Admin Panel",
    href: "/Dashboard/users",
    icon: Users,
  },
];

export function DashboardNav() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav className="grid items-start gap-2 px-2 py-4">
      {navItems.map((item) => (
        <Button
          key={item.href}
          variant={pathname === item.href ? "default" : "ghost"}
          className={cn("justify-start", pathname === item.href && "")}
          asChild
        >
          <Link to={item.href}>
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
