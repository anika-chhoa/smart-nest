"use client";

import { Input, ListBox, Select } from "@heroui/react";
import { ChevronDown, MapPin, Search } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Banner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Track state synchronized with browser queries including min/max price
  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    propertyType: searchParams.get("propertyType") || "All",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sort: searchParams.get("sort") || "low-to-high",
  });

  // Unified routing handler function
  const updateSearchParam = (key, value) => {
    const resolvedValue =
      typeof value === "object" && value.currentKey ? value.currentKey : value;

    const updatedFilters = { ...filters, [key]: resolvedValue };
    setFilters(updatedFilters);

    const params = new URLSearchParams();

    if (updatedFilters.location.trim()) {
      params.set("location", updatedFilters.location.trim());
    }
    if (updatedFilters.propertyType && updatedFilters.propertyType !== "All") {
      params.set("propertyType", updatedFilters.propertyType);
    }
    if (updatedFilters.minPrice) {
      params.set("minPrice", updatedFilters.minPrice);
    }
    if (updatedFilters.maxPrice) {
      params.set("maxPrice", updatedFilters.maxPrice);
    }
    if (updatedFilters.sort) {
      params.set("sort", updatedFilters.sort);
    }

    // Instantly redirects onto your listings search page matrix
    router.push(`/properties?${params.toString()}`);
  };

  // Helper for manual search button trigger
  const handleSearchSubmit = () => {
    updateSearchParam("location", filters.location);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-12 overflow-hidden">
      {/* Background Underlay Graphics */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/drvj2pqs7/image/upload/v1782114488/ultra_luxurious_coastal_mansion_at_sunset_overlooking_the_mediterranean_sea_fsqicc.png')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/30 to-background/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl mb-12">
          <h1 className="font-heading text-5xl md:text-7xl text-foreground leading-[1.1] mb-6 text-balance tracking-tight">
            Discover Your Next{" "}
            <span className="italic font-normal text-champagne-accent text-[#FDB73E]">
              Masterpiece
            </span>{" "}
            Living.
          </h1>
          <p className="font-body text-lg md:text-xl text-foreground/80 max-w-xl">
            Experience the world's most exclusive rentals, curated for those who
            seek the extraordinary in every detail.
          </p>
        </div>

        {/* Floating Metrics Badge Component */}
        <div className="absolute top-1/4 right-2 hidden xl:block bg-glass backdrop-blur-md p-4 rounded-xl shadow-2xl border border-border/20 animate-bounce [animation-duration:3000ms]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-champagne-accent/30">
              <Image
                className="object-cover w-full h-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-SEQzwcb-quC7pqfiW_fVDKm0kGGapYdEAKECWHCpVrIdKHlLE5FyLsybRzQz1mZ_QAINzbudZZNiRimjdqBGbwLmL5z-6yBiN20fEySNPYW_Q2bLW5j2XW0y8CbQCFJED7E7nfMus9g77Gb7Qup2ymjDbn_07X4uYyxRwPqWPuuI8lh5JNTw1q_Q18KEkVYfKMsnX289g-zkoE5ZgHVrWFe_r_mh0ORknYR-dH9xcQmLcQDfa8L_tPNfOsphgD0U_TJ00AaPAaT5"
                
                alt="Feedback avatar"
                height={100}
                width={100}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <p className="text-xs font-semibold text-muted font-body">
                  Just Booked
                </p>
              </div>
              <p className="font-body text-sm font-medium text-champagne-accent">
                Villa Serene, Ibiza
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar Input Container Grid (5 Columns matching AllPropertiesClient) */}
        <div className="bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-border/40 shadow-xl max-w-6xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            
            {/* 1. Location Input Field */}
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted z-10 pointer-events-none">
                <MapPin size={16} />
              </span>
              <Input
                aria-label="Location Search"
                className="w-full bg-background rounded-xl text-sm font-body pl-8"
                placeholder="Location"
                value={filters.location}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, location: e.target.value }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearchSubmit();
                }}
              />
            </div>

            {/* 2. Property Type Select Dropdown */}
            <div className="w-full">
              <Select
                aria-label="Filter by Property Type"
                onSelectionChange={(key) => updateSearchParam("propertyType", key)}
              >
                <Select.Trigger className="w-full bg-background rounded-xl border border-border/60 px-4 py-2.5 text-sm flex items-center justify-between text-muted font-body h-[40px]">
                  <Select.Value
                    placeholder={
                      filters.propertyType === "All" || !filters.propertyType
                        ? "Property Type"
                        : filters.propertyType
                    }
                  />
                  <Select.Indicator>
                    <ChevronDown size={16} className="text-muted" />
                  </Select.Indicator>
                </Select.Trigger>

                <Select.Popover className="bg-background border border-border rounded-xl shadow-xl p-1 min-w-[200px]">
                  <ListBox>
                    {["All", "Villa", "Penthouse", "Apartment", "Mansion"].map((type) => (
                      <ListBox.Item
                        key={type}
                        id={type}
                        textValue={type}
                        className="p-2 text-sm text-foreground hover:bg-card rounded-lg cursor-pointer font-body"
                      >
                        {type === "All" ? "All Types" : type}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* 3. Max Price Filter */}
            <div className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-sm font-body z-10 pointer-events-none">$</span>
              <Input
                aria-label="Maximum Budget Filter"
                type="number"
                className="w-full bg-background rounded-xl text-sm font-body pl-6"
                placeholder="Max price"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearchSubmit();
                }}
              />
            </div>

            {/* 4. Min Price Filter */}
            <div className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-sm font-body z-10 pointer-events-none">$</span>
              <Input
                aria-label="Minimum Budget Filter"
                type="number"
                className="w-full bg-background rounded-xl text-sm font-body pl-6"
                placeholder="Min price"
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, minPrice: e.target.value }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearchSubmit();
                }}
              />
            </div>

            {/* 5. Search Submission Button */}
            <div className="w-full">
              <button
                onClick={handleSearchSubmit}
                className="w-full bg-midnight-emerald hover:opacity-90 text-white font-body font-medium transition-opacity rounded-xl h-[40px] flex items-center justify-center gap-2 text-sm shadow-md cursor-pointer"
              >
                <Search size={16} />
                <span>Search Estates</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}