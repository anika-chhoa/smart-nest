import {
  Briefcase,
  CirclePlus, // Better for Jobs
  Envelope,
  Gear,
  House,
  LayoutSideContentLeft,
  Person,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export function DashboardSidebar() {
  const dashboardItems = {
    "tenant": [
      { icon: House, href: "/dashboard/tenant", label: "Overview" },
      { icon: Briefcase, href: "/dashboard/tenant/my-bookings", label: "My Bookings" }, // Swapped Magnifier -> Briefcase
      
      {
        icon: Envelope,
        href: "/dashboard/tenant/favorites",
        label: "Favorites",
      },
      {
        icon: Person,
        href: "/dashboard/tenant/profile",
        label: "Profile",
      }
    ],
    "owner":[
       { icon: House, href: "/dashboard/owner", label: "Overview" },
       {
      icon: CirclePlus, // Swapped Bell -> CirclePlus
      href: "/dashboard/owner/add-property",
      label: "Add Property",
    },
    { icon: Briefcase, href: "/dashboard/owner/my-properties", label: "My Properties" }, // Swapped Magnifier -> Briefcase
    
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
    "admin":[
       {
      icon: CirclePlus, // Swapped Bell -> CirclePlus
      href: "/dashboard/admin/all-properties",
      label: "All Properties",
    },
    { icon: Briefcase, href: "/dashboard/admin/all-bookings", label: "All Bookings" }, // Swapped Magnifier -> Briefcase
    
    {
      icon: Envelope,
      href: "/dashboard/admin/transactions",
      label: "Transactions",
    },
    
    ]
  };

  const navItems = [
    { icon: House, href: "/dashboard/recruiter", label: "Home" },
    { icon: Briefcase, href: "/dashboard/recruiter/jobs", label: "Jobs" }, // Swapped Magnifier -> Briefcase
    {
      icon: CirclePlus, // Swapped Bell -> CirclePlus
      href: "/dashboard/recruiter/jobs/new",
      label: "Post a Job",
    },
    {
      icon: Envelope,
      href: "/dashboard/recruiter/company",
      label: "Create a Company",
    },
    {
      icon: Person,
      href: "/dashboard/recruiter/company/profile",
      label: "Company Profile",
    },
    { icon: Gear, href: "/dashboard/recruiter/settings", label: "Settings" },
  ];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          href={item.href}
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden md:block w-64 shrink-0 border-r border-default p-4">
        <Link href="/">
          <div className="flex items-center gap-3">
            <p className="font-heading font-bold text-2xl tracking-tight">
              Smart<span className="text-secondary">Nest</span>
            </p>
          </div>
        </Link>
        {navContent}
      </aside>
      <Drawer>
        <Button className="md:hidden" variant="secondary">
          <LayoutSideContentLeft />
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
