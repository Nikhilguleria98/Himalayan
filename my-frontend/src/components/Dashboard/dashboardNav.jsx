import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { ListIcon, Users, NotebookPen } from "lucide-react";

export function DashboardNav() {
  const location = useLocation();
  const pathname = location.pathname;
  const { user } = useSelector((state) => state.auth);

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

  // Only display "Publish Blog" for Admin users
  if (user?.role === "admin") {
    navItems.push({
      title: "Publish Blog",
      href: "/admin/blog/create",
      icon: NotebookPen,
    });
  }

  return (
    <nav className="grid items-start gap-2 px-2 py-4">
      {navItems.map((item) => {
        const isActive = 
          pathname === item.href || 
          (item.href === "/admin/blog/create" && pathname === "/Dashboard/blogs/new");
          
        return (
          <Button
            key={item.href}
            variant={isActive ? "default" : "ghost"}
            className={cn("justify-start", isActive && "")}
            asChild
          >
            <Link to={item.href}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
