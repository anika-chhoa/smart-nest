"use client";

import { Card, Input, ListBox, Pagination, Select } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bath,
  BedDouble,
  ChevronDown,
  MapPin,
  Search,
  SlidersHorizontal,
  Square,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

// Animation Configuration Presets
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function AllPropertiesClient({
  propertiesData,
  activeFilters = {},
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const properties = propertiesData.data;
  const currentPage = propertiesData.page;
  const totalPages = propertiesData.totalPage;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const displayedCount = properties.length;
  const totalCount = propertiesData.totalData;

  const updateSearchParam = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "All") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    if (key !== "page") {
      params.delete("page");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto space-y-12"
    >
      {/* HEADER SECTION */}
      <motion.div variants={itemVariants} className="space-y-3 max-w-2xl">
        <h1 className="font-heading text-4xl md:text-5xl text-primary font-medium tracking-tight">
          Curated Exclusivity
        </h1>
        <p className="font-body text-muted text-sm md:text-base leading-relaxed">
          Discover an architectural journey through the world's most prestigious
          residences, from sky-high penthouses to serene coastal retreats.
        </p>
      </motion.div>

      {/* SEARCH AND FILTERS BAR */}
      <motion.div 
        variants={itemVariants}
        className="bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-border/40 shadow-sm grid grid-cols-1 md:grid-cols-5 gap-4 items-center"
      >
        {/* 1. Location Filter */}
        <div className="relative w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted z-10 pointer-events-none">
            <MapPin size={16} />
          </span>
          <Input
            aria-label="Location Search"
            className="w-full bg-background rounded-xl text-sm font-body pl-8"
            placeholder="Location"
            defaultValue={activeFilters.location}
            onBlur={(e) => updateSearchParam("location", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") updateSearchParam("location", e.target.value);
            }}
          />
        </div>

        {/* 2. Property Type Dropdown */}
        <div className="w-full">
          <Select
            aria-label="Filter by Property Type"
            onSelectionChange={(key) => updateSearchParam("propertyType", key)}
          >
            <Select.Trigger className="w-full bg-background rounded-xl border border-border/60 px-4 py-2.5 text-sm flex items-center justify-between text-muted font-body h-[40px]">
              <Select.Value
                placeholder={
                  activeFilters.propertyType === "All" || !activeFilters.propertyType
                    ? "Property Type"
                    : activeFilters.propertyType
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
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-sm font-body z-10 pointer-events-none">
            $
          </span>
          <Input
            aria-label="Maximum Budget Filter"
            type="number"
            className="w-full bg-background rounded-xl text-sm font-body pl-6"
            placeholder="Max price"
            defaultValue={activeFilters.maxPrice}
            onBlur={(e) => updateSearchParam("maxPrice", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") updateSearchParam("maxPrice", e.target.value);
            }}
          />
        </div>

        {/* 4. Min Price Filter */}
        <div className="relative w-full">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-sm font-body z-10 pointer-events-none">
            $
          </span>
          <Input
            aria-label="Minimum Budget Filter"
            type="number"
            className="w-full bg-background rounded-xl text-sm font-body pl-6"
            placeholder="Min price"
            defaultValue={activeFilters.minPrice}
            onBlur={(e) => updateSearchParam("minPrice", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") updateSearchParam("minPrice", e.target.value);
            }}
          />
        </div>

        {/* 5. Search Action Button */}
        <div className="w-full">
          <motion.button 
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#043927] hover:bg-[#03291c] text-white font-body font-medium transition-colors rounded-xl h-[40px] flex items-center justify-center gap-2 text-sm shadow-sm cursor-pointer"
          >
            <Search size={16} />
            <span>Search</span>
          </motion.button>
        </div>
      </motion.div>

      {/* FILTER DETAILS AND COUNTER */}
      <motion.div 
        variants={itemVariants}
        className="pt-4 border-t border-border/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="space-y-1">
          <h2 className="font-heading text-2xl text-primary font-medium">
            Featured Listings
          </h2>
          <p className="text-xs text-muted font-body">
            Showing{" "}
            <span className="font-semibold text-primary">{displayedCount}</span>{" "}
            out of{" "}
            <span className="font-semibold text-primary">{totalCount}</span>{" "}
            properties
          </p>
        </div>
      </motion.div>

      {/* LISTINGS DISPLAY MATRIX */}
      <AnimatePresence mode="wait">
        {properties.length === 0 ? (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-20 bg-card/20 rounded-2xl border border-dashed border-border/60"
          >
            <SlidersHorizontal className="mx-auto text-muted mb-4" size={32} />
            <p className="text-muted font-body font-medium">
              No luxury estates matched your selection criteria.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="grid-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <motion.div 
                  key={property._id} 
                  variants={itemVariants}
                  layout
                >
                  <Card className="bg-surface-container-lowest border border-border/40 overflow-hidden hover:shadow-xl transition-all duration-300 rounded-2xl group flex flex-col h-full">
                    
                    {/* Media Container with smooth image zoom mapping */}
                    <div className="relative aspect-[4/3] w-full bg-surface-container overflow-hidden">
                      {property.images?.[0] ? (
                        <motion.div 
                          className="w-full h-full"
                          whileHover={{ scale: 1.04 }}
                          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                        >
                          <Image
                            src={property.images[0]}
                            alt={property.title}
                            height={400}
                            width={400}
                            className="object-cover w-full h-full rounded-t-2xl"
                            loading="lazy"
                          />
                        </motion.div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted/60 text-xs uppercase tracking-wider font-body">
                          Image Coming Soon
                        </div>
                      )}
                      
                      {Number(property.rentPrice) > 15000 && (
                        <span className="absolute top-4 left-4 bg-midnight-emerald/90 backdrop-blur-sm text-white font-body text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm z-10">
                          Exclusive Listing
                        </span>
                      )}
                      
                      {property.propertyType && (
                        <span className="absolute top-4 right-4 bg-secondary/90 backdrop-blur-sm text-white font-body text-[11px] font-medium px-2.5 py-1 rounded-full shadow-sm z-10">
                          {property.propertyType}
                        </span>
                      )}
                    </div>

                    {/* Meta Card Details */}
                    <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                      <div>
                        <h3 className="font-heading text-xl text-primary font-semibold tracking-wide line-clamp-1 mb-2 group-hover:text-secondary transition-colors">
                          {property.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-muted text-xs font-body">
                          <MapPin size={13} className="text-muted/80" />
                          <span>{property.location}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-border/30 text-xs font-body text-muted">
                        <div className="flex items-center gap-1.5">
                          <BedDouble size={14} className="text-muted/70" />
                          <span>{property.bedrooms} Beds</span>
                        </div>
                        <div className="flex items-center gap-1.5 justify-center border-x border-border/30">
                          <Bath size={14} className="text-muted/70" />
                          <span>{property.bathrooms} Baths</span>
                        </div>
                        <div className="flex items-center gap-1.5 justify-end">
                          <Square size={13} className="text-muted/70" />
                          <span>
                            {Number(property.size || 0).toLocaleString()} Sqft
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div>
                          <span className="font-heading text-lg font-bold text-primary">
                            ${Number(property.rentPrice || 0).toLocaleString()}
                          </span>
                          <span className="text-muted text-xs font-body">
                            /{property.rentType === "Monthly" ? "mo" : "yr"}
                          </span>
                        </div>

                        <Link href={`/properties/${property._id}`}>
                          <motion.button 
                            whileHover={{ x: 3 }}
                            className="text-secondary hover:text-champagne font-body font-bold text-sm underline underline-offset-4 decoration-2 transition-colors duration-200 py-1 flex items-center gap-0.5 cursor-pointer"
                          >
                            View Details
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* HERO UI PAGINATION COMPONENT */}
            {totalPages > 1 && (
              <motion.div variants={itemVariants} className="flex justify-center pt-10">
                <Pagination className="flex flex-col sm:flex-row items-center gap-4 bg-card/20 p-4 rounded-xl border border-border/40">
                  <Pagination.Summary className="text-xs text-muted font-body">
                    Page {currentPage} of {totalPages}
                  </Pagination.Summary>

                  <Pagination.Content>
                    <Pagination.Item>
                      <Pagination.Previous
                        disabled={currentPage === 1}
                        onClick={() => currentPage > 1 && updateSearchParam("page", currentPage - 1)}
                        className={`flex items-center gap-1 text-sm font-body ${
                          currentPage === 1 ? "opacity-50 pointer-events-none" : "cursor-pointer"
                        }`}
                      >
                        <Pagination.PreviousIcon />
                        <span>Previous</span>
                      </Pagination.Previous>
                    </Pagination.Item>

                    {pages.map((pageNum) => (
                      <Pagination.Item key={pageNum}>
                        <Pagination.Link
                          isActive={currentPage === pageNum}
                          onClick={() => updateSearchParam("page", pageNum)}
                          className={`cursor-pointer font-body text-sm relative transition-colors ${
                            currentPage === pageNum && "bg-secondary backdrop-blur-sm text-white"
                          }`}
                        >
                          {pageNum}
                        </Pagination.Link>
                      </Pagination.Item>
                    ))}

                    <Pagination.Item>
                      <Pagination.Next
                        disabled={currentPage === totalPages}
                        onClick={() => currentPage < totalPages && updateSearchParam("page", currentPage + 1)}
                        className={`flex items-center gap-1 text-sm font-body ${
                          currentPage === totalPages ? "opacity-50 pointer-events-none" : "cursor-pointer"
                        }`}
                      >
                        <span>Next</span>
                        <Pagination.NextIcon />
                      </Pagination.Next>
                    </Pagination.Item>
                  </Pagination.Content>
                </Pagination>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}