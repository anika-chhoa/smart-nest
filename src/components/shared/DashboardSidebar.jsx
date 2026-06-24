"use client";

import React, { useState } from "react";
import {
  Briefcase,
  ChartLineArrowUp,
  CirclePlus,
  Envelope,
  Heart,
  House,
  LayoutSideContentLeft,
  Person,
  PersonFill,
  SquareChartColumn,
  XmarkShape,
} from "@gravity-ui/icons";
import { Button, Drawer, DrawerContent, DrawerBody } from "@heroui/react";
import Link from "next/link";

export function DashboardSidebar({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  const dashboardItems = {
    tenant: [
      { icon: House, href: "/dashboard/tenant", label: "Overview" },
      { icon: Briefcase, href: "/dashboard/tenant/my-bookings", label: "My Bookings" },
      { icon: Heart, href: "/dashboard/tenant/favorites", label: "Favorites" },
      { icon: Person, href: "/dashboard/tenant/profile", label: "Profile" },
    ],
    owner: [
      { icon: ChartLineArrowUp, href: "/dashboard/owner", label: "Overview" },
      { icon: CirclePlus, href: "/dashboard/owner/add-property", label: "Add Property" },
      { icon: Briefcase, href: "/dashboard/owner/my-properties", label: "My Properties" },
      { icon: Envelope, href: "/dashboard/owner/booking-requests", label: "Booking Requests" },
      { icon: Person, href: "/dashboard/owner/profile", label: "Profile" },
    ],
    admin: [
      { icon: PersonFill, href: "/dashboard/admin/all-users", label: "All Users" },
      { icon: Briefcase, href: "/dashboard/admin/all-properties", label: "All Properties" },
      { icon: Envelope, href: "/dashboard/admin/all-bookings", label: "All Bookings" },
      { icon: SquareChartColumn, href: "/dashboard/admin/transactions", label: "Transactions" },
    ],
  };

  const navItems = dashboardItems[user?.role] || [];

  // Core navigation renderer shared between Mobile Drawer and Desktop Sidebar
  const renderNavContent = () => (
    <nav className="flex flex-col gap-1.5 mt-6 font-body w-full">
      {navItems.map((item) => (
        <Link
          key={item.label}
          onClick={() => setIsOpen(false)} // Closes mobile drawer automatically on selection
          className="group flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium text-muted border-l-2 border-transparent transition-all duration-200 hover:text-foreground hover:bg-card hover:border-secondary active:scale-[0.98]"
          href={item.href}
        >
          <item.icon className="w-5 h-5 text-muted group-hover:text-secondary transition-colors duration-200 shrink-0" />
          <span className="truncate">{item.label}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR: Visible only on md screens and up */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-border/20 bg-surface/50 backdrop-blur-md p-5 min-h-[calc(100vh-4rem)] sticky top-16 font-body">
        <Link href="/" className="px-2 mb-4 block">
          <div className="flex items-center gap-3">
            <p className="font-heading font-bold text-2xl tracking-tight text-foreground">
              Smart<span className="text-secondary">Nest</span>
            </p>
          </div>
        </Link>
        <div className="px-2 py-0.5">
          <p className="text-[10px] font-bold text-muted uppercase tracking-widest">
            {user?.role || "Workspace"} Management
          </p>
        </div>
        {renderNavContent()}
      </aside>

      {/* MOBILE NAVIGATION HEADER: Visible on small viewports, stacks above main content */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border/10 bg-background/80 backdrop-blur-md sticky top-0 z-30 w-full font-body">
        <div className="flex items-center justify-between w-full">
          
          {/* Menu Trigger Button */}
          <Button
            onPress={() => setIsOpen(true)}
            className="min-w-0 p-2.5 h-10 w-10 bg-card border border-border/20 text-foreground hover:bg-surface-container rounded-xl transition-all active:scale-95"
            aria-label="Open Menu"
          >
            <LayoutSideContentLeft className="w-5 h-5 shrink-0" />
          </Button>

          {/* Mobile App Branding */}
          <p className="font-heading font-bold text-lg tracking-tight text-foreground">
            Smart<span className="text-secondary">Nest</span>
          </p>
          
          {/* Dummy element to preserve centered/justified layout symmetry */}
          <div className="w-10 h-10" /> 
        </div>
      </div>

      {/* HeroUI Drawer Element */}
      <Drawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement="left"
        size="xs"
        classNames={{
          base: "bg-surface max-w-[280px] h-full rounded-r-2xl border-r border-border/20 shadow-xl",
          backdrop: "bg-black/40 backdrop-blur-sm",
        }}
      >
        <DrawerContent>
          {() => (
            <DrawerBody className="p-0 flex flex-col h-full">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-border/10 px-5 py-4 shrink-0">
                <div className="flex flex-col">
                  <p className="font-heading font-bold text-xl tracking-tight text-foreground">
                    Smart<span className="text-secondary">Nest</span>
                  </p>
                  <p className="text-[10px] text-muted uppercase tracking-widest font-bold mt-0.5">
                    {user?.role || "Tenant"} Navigation
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted p-2 hover:bg-card hover:text-foreground rounded-xl transition-all active:scale-90"
                  aria-label="Close Sidebar"
                >
                  <XmarkShape className="w-4 h-4" />
                </button>
              </div>
              
              {/* Drawer Navigation Links */}
              <div className="flex-1 overflow-y-auto px-4 py-2">
                {renderNavContent()}
              </div>
            </DrawerBody>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}