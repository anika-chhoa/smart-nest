import { getAllProperties } from "@/lib/api/properties";
import AllPropertiesTableClient from "./AllPropertiesTableClient";

export const metadata = {
  title: "Admin Panel | Manage Master Architecture Listings",
};

// Next.js 15 configuration: searchParams is a Promise that must be awaited
export default async function AllPropertiesPage(props) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const limit = 9; 

  const allPropertiesData = await getAllProperties(page, limit);

  return (
    <div className="font-body p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-3xl text-foreground tracking-tight">
          Global Asset Inventory
        </h1>
        <p className="text-muted text-xs mt-1 max-w-xl">
          Review, approve, modify, or permanently evict structural property
          entries across the entire user base landscape.
        </p>
      </div>

      <AllPropertiesTableClient initialProperties={allPropertiesData} />
    </div>
  );
}