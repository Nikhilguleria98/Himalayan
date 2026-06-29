import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { DashboardNav } from "../../components/Dashboard/dashboardNav";
import { Button } from "../../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen flex-col">
      <div
        className={`container flex-1 items-start transition-all duration-300 ${
          isSidebarOpen
            ? "md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-8"
            : "block"
        }`}
      >
        {/* Collapsible Sidebar - Visible on Mobile & Desktop when open */}
        {isSidebarOpen && (
          <aside className="w-full shrink-0 md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] bg-white rounded-xl border p-3 shadow-sm md:shadow-none md:border-y-0 md:border-l-0 md:border-r md:rounded-none mb-4 md:mb-0 z-20">
            <div className="flex items-center justify-between pb-2 border-b mb-2 px-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Dashboard Menu
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                onClick={() => setIsSidebarOpen(false)}
                title="Hide sidebar"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
            <DashboardNav />
          </aside>
        )}

        <main className="flex w-full flex-col overflow-hidden relative pt-2">
          {/* Re-open Sidebar Arrow Button when hidden */}
          {!isSidebarOpen && (
            <div className="mb-4 flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5 shadow-sm border-teal-600 text-teal-700 hover:bg-teal-50"
                onClick={() => setIsSidebarOpen(true)}
                title="Show sidebar menu"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="text-xs font-medium">Show Menu</span>
              </Button>
            </div>
          )}

          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
