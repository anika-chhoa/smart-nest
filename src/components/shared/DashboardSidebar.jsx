
import {
  Briefcase,
  ChartLineArrowUp,
  CirclePlus,
  Envelope,
  Gear,
  Heart,
  House,
  LayoutSideContentLeft,
  Person,
  SquareChartColumn,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export async function DashboardSidebar({user}) {
  
  
  const dashboardItems = {
    tenant: [
      { icon: House, href: "/dashboard/tenant", label: "Overview" },
      {
        icon: Briefcase,
        href: "/dashboard/tenant/my-bookings",
        label: "My Bookings",
      },
      {
        icon: Heart,
        href: "/dashboard/tenant/favorites",
        label: "Favorites",
      },
      {
        icon: Person,
        href: "/dashboard/tenant/profile",
        label: "Profile",
      },
    ],
    owner: [
      { icon:ChartLineArrowUp, href: "/dashboard/owner", label: "Overview" },
      {
        icon: CirclePlus,
        href: "/dashboard/owner/add-property",
        label: "Add Property",
      },
      {
        icon: Briefcase,
        href: "/dashboard/owner/my-properties",
        label: "My Properties",
      },
      {
        icon: Envelope,
        href: "/dashboard/owner/booking-requests",
        label: "Booking Requests",
      },
      {
        icon: Person,
        href: "/dashboard/owner/profile",
        label: "Profile",
      },
    ],
    admin: [
      {
        icon: Briefcase,
        href: "/dashboard/admin/all-properties",
        label: "All Properties",
      },
      {
        icon: Envelope,
        href: "/dashboard/admin/all-bookings",
        label: "All Bookings",
      },
      {
        icon: SquareChartColumn,
        href: "/dashboard/admin/transactions",
        label: "Transactions",
      },
    ],
  };

  const navItems = dashboardItems[user?.role] || [];

  const navContent = (
    <nav className="flex flex-col gap-1.5 mt-6 font-body">
      {navItems.map((item) => (
        <Link
          key={item.label}
          className="group flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium text-muted border-l-2 border-transparent transition-all duration-200 hover:text-foreground hover:bg-card hover:border-secondary"
          href={item.href}
        >
          <item.icon className="w-5 h-5 text-muted group-hover:text-secondary transition-colors duration-200" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
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
        {navContent}
      </aside>

      {/* Mobile Top Action Anchor Bar & Drawer implementation */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border/10 bg-background sticky top-16 z-30 w-full font-body">
        <div className="flex items-center gap-3">
          <Drawer>
            <Button 
              className="md:hidden min-w-0 p-2.5 h-auto bg-card border border-border/20 text-foreground hover:bg-surface-container rounded-xl transition-colors" 
              variant="secondary"
            >
              <LayoutSideContentLeft className="w-5 h-5" />
            </Button>
            <Drawer.Backdrop className="backdrop-blur-sm" />
            <Drawer.Content placement="left" className="bg-surface max-w-[280px]">
              <Drawer.Dialog className="p-0 border-r border-border/20 h-full">
                <div className="flex items-center justify-between border-b border-border/10 px-5 py-4">
                  <div className="flex flex-col">
                    <p className="font-heading font-bold text-xl tracking-tight text-foreground">
                      Smart<span className="text-secondary">Nest</span>
                    </p>
                    <p className="text-[10px] text-muted uppercase tracking-widest font-bold mt-0.5">
                      {user?.role || "Tenant"} Navigation
                    </p>
                  </div>
                  <Drawer.CloseTrigger className="text-muted p-1 hover:bg-card rounded-lg transition-colors" />
                </div>
                <Drawer.Body className="px-3 py-2">
                  {navContent}
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer>
          <span className="text-xs font-bold uppercase tracking-wider text-muted">
            Dashboard Menu
          </span>
        </div>
      </div>
    </>
  );
}