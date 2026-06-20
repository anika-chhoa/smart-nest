// "use client";

// import { Card, ListBox, Select } from "@heroui/react";
// import {
//   ArrowRight,
//   Bath,
//   BedDouble,
//   Car,
//   CheckCircle2,
//   ChefHat,
//   Cpu,
//   Gem,
//   Heart,
//   Layout,
//   MapPin,
//   Shield,
//   Square,
//   Star,
//   Waves,
//   Wifi,
//   Wine,
// } from "lucide-react";
// import Image from "next/image";
// import { useState } from "react";
// import { toast } from "react-hot-toast";

// // exact mapping connecting your array string values to premium luxury icons
// const amenityIconMap = {
//   wifi: <Wifi size={20} className="text-secondary" />,
//   parking: <Car size={20} className="text-secondary" />,
//   security: <Shield size={20} className="text-secondary" />,
//   "smart home": <Cpu size={20} className="text-secondary" />,
//   balcony: <Layout size={20} className="text-secondary" />,
//   "premium finishes": <Gem size={20} className="text-secondary" />,
//   "infinity pool": <Waves size={20} className="text-secondary" />,
//   "private chef": <ChefHat size={20} className="text-secondary" />,
//   "wine cellar": <Wine size={20} className="text-secondary" />,
// };

// export default function PropertyDetailsClient({ property }) {
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [arrivalDate, setArrivalDate] = useState("");
//   const [departureDate, setDepartureDate] = useState("");

//   const handleBookingSubmit = (e) => {
//     e.preventDefault();
//     if (!arrivalDate || !departureDate) {
//       toast.error("Please select valid arrival and departure dates.", {
//         style: { fontFamily: "var(--font-body)" },
//       });
//       return;
//     }
//     toast.success(`Booking request forwarded for ${property.title}!`, {
//       icon: "✨",
//       style: {
//         background: "#043927",
//         color: "#fff",
//         fontFamily: "var(--font-body)",
//       },
//     });
//   };

//   const toggleFavoriteState = () => {
//     setIsFavorite(!isFavorite);
//     toast(
//       isFavorite
//         ? "Removed from your collection"
//         : "Added to exclusive collection",
//       { icon: isFavorite ? "🗑️" : "❤️" },
//     );
//   };

//   // Dynamically extract and merge the raw array and the customAmenities text
//   const baseAmenities = property.amenities || []; // handles ["WiFi", "Parking", "Security"]
//   const specializedAmenities = property.customAmenities
//     ? property.customAmenities.split(",").map((item) => item.trim())
//     : [];

//   // Combine both collections and drop any duplicates dynamically
//   const mergedAmenities = Array.from(
//     new Set([...baseAmenities, ...specializedAmenities]),
//   );

//   return (
//     <div className="w-full">
//       {/* 1. HERO BANNER */}
//       <div className="relative w-full h-[65vh] md:h-[75vh] bg-surface-container overflow-hidden">
//         {property.images?.[0] ? (
//           <Image
//             src={property.images[0]}
//             alt={property.title}
//             height={200}
//             width={200}
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="w-full h-full bg-primary/20 flex items-center justify-center font-body text-muted">
//             Image Unavailable
//           </div>
//         )}

//         <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

//         <div className="absolute bottom-0 left-0 w-full pb-12 text-white z-10">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
//             <div className="flex flex-wrap gap-2">
//               <span className="bg-secondary/90 backdrop-blur-sm text-white font-body text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-sm">
//                 Luxury Exclusive
//               </span>
//               <span className="bg-white/20 backdrop-blur-sm text-white font-body text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-sm">
//                 {property.propertyType || "Estate"}
//               </span>
//             </div>

//             <div className="space-y-2">
//               <h1 className="font-heading text-4xl md:text-6xl font-medium tracking-wide">
//                 {property.title}
//               </h1>
//               <div className="flex items-center gap-2 text-white/90 text-sm md:text-base font-body">
//                 <MapPin size={16} className="text-secondary" />
//                 <span>{property.location}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 2. CORE LAYOUT CONTAINER */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
//         {/* LEFT COLUMN */}
//         <div className="lg:col-span-2 space-y-12">
//           {/* Spatial Metrics Ribbon */}
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-b border-border/30">
//             <div className="space-y-1">
//               <p className="text-xs font-semibold uppercase tracking-wider text-muted font-body">
//                 Price Per Month
//               </p>
//               <p className="font-heading text-2xl text-primary font-bold">
//                 ${Number(property.rentPrice || 0).toLocaleString()}
//               </p>
//             </div>
//             <div className="space-y-1">
//               <p className="text-xs font-semibold uppercase tracking-wider text-muted font-body">
//                 Bedrooms
//               </p>
//               <div className="flex items-center gap-2 font-heading text-2xl text-primary font-bold">
//                 <BedDouble size={20} className="text-secondary/80" />
//                 <span>{property.bedrooms}</span>
//               </div>
//             </div>
//             <div className="space-y-1">
//               <p className="text-xs font-semibold uppercase tracking-wider text-muted font-body">
//                 Bathrooms
//               </p>
//               <div className="flex items-center gap-2 font-heading text-2xl text-primary font-bold">
//                 <Bath size={20} className="text-secondary/80" />
//                 <span>{property.bathrooms}</span>
//               </div>
//             </div>
//             <div className="space-y-1">
//               <p className="text-xs font-semibold uppercase tracking-wider text-muted font-body">
//                 Living Area
//               </p>
//               <div className="flex items-center gap-2 font-heading text-2xl text-primary font-bold">
//                 <Square size={18} className="text-secondary/80" />
//                 <span>{Number(property.size || 0).toLocaleString()} Sqft</span>
//               </div>
//             </div>
//           </div>

//           {/* Architectural Copy */}
//           <div className="space-y-4">
//             <h2 className="font-heading text-2xl md:text-3xl text-primary font-medium tracking-wide">
//               Architectural Narrative
//             </h2>
//             <p className="font-body text-muted text-sm md:text-base leading-relaxed whitespace-pre-line">
//               {property.description}
//             </p>
//           </div>

//           {/* DYNAMIC AMENITIES GRID SECTION */}
//           <div className="space-y-6 pt-4">
//             <h2 className="font-heading text-2xl text-primary font-medium tracking-wide">
//               Curated Amenities
//             </h2>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//               {property.amenities.map((amenity, index) => {
//                 // Safely handle cases and spacing issues for lookup matching
//                 const lookupKey = amenity.toLowerCase().trim();
//                 const mappedIcon = amenityIconMap[lookupKey] || (
//                   <CheckCircle2 size={20} className="text-secondary" />
//                 );

//                 return (
//                   <div
//                     key={index}
//                     className="flex flex-col items-start gap-4 p-5 bg-surface-container-low border border-border/20 rounded-xl hover:shadow-xs transition-all duration-200"
//                   >
//                     <div className="p-2.5 bg-surface-container-lowest rounded-xl shadow-xs border border-border/10">
//                       {mappedIcon}
//                     </div>
//                     <span className="font-body text-xs md:text-sm text-primary font-semibold tracking-wide">
//                       {amenity}
//                     </span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* RIGHT COLUMN: BOOKING INTERACTIVE SIDEBAR */}
//         <div className="relative">
//           <Card className="sticky top-8 bg-surface-container-lowest border border-border/40 p-6 rounded-2xl shadow-xl space-y-6">
//             <div className="flex items-end justify-between border-b border-border/30 pb-4">
//               <div>
//                 <span className="font-heading text-3xl font-bold text-primary">
//                   ${Number(property.rentPrice || 0).toLocaleString()}
//                 </span>
//                 <span className="text-muted text-xs font-body font-medium">
//                   {" "}
//                   / {property.rentType === "Monthly" ? "month" : "year"}
//                 </span>
//               </div>
//               <div className="flex items-center gap-1 text-sm font-body font-semibold text-primary bg-surface-container px-2.5 py-1 rounded-md">
//                 <Star size={14} className="fill-secondary text-secondary" />
//                 <span>4.9</span>
//               </div>
//             </div>

//             <form onSubmit={handleBookingSubmit} className="space-y-4">
//               <div className="space-y-1">
//                 <label className="text-[11px] font-bold uppercase tracking-wider text-muted font-body block">
//                   Check Availability
//                 </label>
//                 <div className="grid grid-cols-2 gap-2">
//                   <div className="border border-border/60 rounded-xl p-3 bg-background/50">
//                     <span className="text-[10px] text-muted block font-body font-bold uppercase">
//                       Arrival
//                     </span>
//                     <input
//                       type="date"
//                       className="w-full bg-transparent text-xs font-body text-primary focus:outline-none pt-1 cursor-pointer"
//                       value={arrivalDate}
//                       onChange={(e) => setArrivalDate(e.target.value)}
//                     />
//                   </div>
//                   <div className="border border-border/60 rounded-xl p-3 bg-background/50">
//                     <span className="text-[10px] text-muted block font-body font-bold uppercase">
//                       Departure
//                     </span>
//                     <input
//                       type="date"
//                       className="w-full bg-transparent text-xs font-body text-primary focus:outline-none pt-1 cursor-pointer"
//                       value={departureDate}
//                       onChange={(e) => setDepartureDate(e.target.value)}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-1">
//                 <label className="text-[11px] font-bold uppercase tracking-wider text-muted font-body block">
//                   Residents
//                 </label>
//                 <Select defaultSelectedKeys={["2"]}>
//                   <Select.Trigger className="w-full bg-background/50 rounded-xl border border-border/60 px-4 py-3 text-xs flex items-center justify-between font-body text-primary">
//                     <Select.Value placeholder="2 Guests, 1 Infant" />
//                   </Select.Trigger>
//                   <Select.Popover className="bg-background border border-border rounded-xl shadow-xl p-1 min-w-[200px]">
//                     <ListBox>
//                       <ListBox.Item
//                         id="1"
//                         className="p-2 text-xs font-body hover:bg-surface-container rounded-lg cursor-pointer"
//                       >
//                         1 Guest
//                       </ListBox.Item>
//                       <ListBox.Item
//                         id="2"
//                         className="p-2 text-xs font-body hover:bg-surface-container rounded-lg cursor-pointer"
//                       >
//                         2 Guests, 1 Infant
//                       </ListBox.Item>
//                       <ListBox.Item
//                         id="4"
//                         className="p-2 text-xs font-body hover:bg-surface-container rounded-lg cursor-pointer"
//                       >
//                         4 Guests, Premium Suite
//                       </ListBox.Item>
//                     </ListBox>
//                   </Select.Popover>
//                 </Select>
//               </div>


//               {/* add to favorite button */}
//               <button
//                 onClick={toggleFavoriteState}
//                 className={`w-full border font-body font-semibold transition-all duration-300 rounded-xl h-[48px] flex items-center justify-center gap-2 text-sm cursor-pointer ${
//                   isFavorite
//                     ? "bg-red-50 border-red-200 text-red-600 shadow-inner"
//                     : "bg-transparent border-border hover:bg-surface-container-low text-primary"
//                 }`}
//               >
//                 <Heart
//                   size={16}
//                   className={
//                     isFavorite ? "fill-current text-red-600" : "text-muted"
//                   }
//                 />
//                 <span>
//                   {isFavorite ? "Saved in Collection" : "Add to Favorite"}
//                 </span>
//               </button>

//               <button
//                 type="submit"
//                 className="w-full bg-[#043927] hover:bg-[#03291c] text-white font-body font-semibold transition-all duration-300 rounded-xl h-[48px] flex items-center justify-center gap-2 text-sm shadow-md mt-2 cursor-pointer group"
//               >
//                 <span>Book Now</span>
//                 <ArrowRight
//                   size={16}
//                   className="group-hover:translate-x-1 transition-transform"
//                 />
//               </button>
//             </form>

//             <p className="text-center font-body text-[11px] text-muted tracking-wide">
//               You won't be charged yet
//             </p>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import {
  ArrowRight,
  Bath,
  BedDouble,
  Car,
  CheckCircle2,
  Cpu,
  Gem,
  Heart,
  Layout,
  MapPin,
  Shield,
  Square,
  Star,
  Waves,
  Wifi,
  Wine,
  CalendarDays,
  User,
  Phone,
  FileText,
  ChefHat
} from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";

const amenityIconMap = {
  wifi: <Wifi size={20} className="text-secondary" />,
  parking: <Car size={20} className="text-secondary" />,
  security: <Shield size={20} className="text-secondary" />,
  "smart home": <Cpu size={20} className="text-secondary" />,
  balcony: <Layout size={20} className="text-secondary" />,
  "premium finishes": <Gem size={20} className="text-secondary" />,
  "infinity pool": <Waves size={20} className="text-secondary" />,
  "private chef": <ChefHat size={20} className="text-secondary" />,
  "wine cellar": <Wine size={20} className="text-secondary" />,
};

export default function PropertyDetailsClient({ property }) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form Field Tracking States
  const [moveInDate, setMoveInDate] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const toggleFavoriteState = async () => {
    try {
      // Professional API optimization framework mock setup
      setIsFavorite(!isFavorite);
      toast.success(
        isFavorite ? "Removed from exclusive collection" : "Saved to your private dashboard favorites!", 
        { icon: isFavorite ? "🗑️" : "❤️" }
      );
    } catch (error) {
      toast.error("Failed to update selection collection profile.");
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!moveInDate || !contactNumber || !userInfo) {
      toast.error("Please complete all mandatory resident profiles.");
      return;
    }

    setIsModalOpen(false);
    toast.success("Reservation lock acquired! Re-routing to payment gateway...", {
      icon: "💳",
      style: { background: "#043927", color: "#fff" }
    });

    // Elegant operational timeout to clear animations safely before path navigation
    setTimeout(() => {
      router.push(`/checkout?propertyId=${property._id}&date=${moveInDate}`);
    }, 1200);
  };

  // Safe parsing loops covering combined string arrays and text splits
  const baseAmenities = property.amenities || [];
  const specializedAmenities = property.customAmenities
    ? property.customAmenities.split(",").map((item) => item.trim())
    : [];
  const mergedAmenities = Array.from(new Set([...baseAmenities, ...specializedAmenities]));

  return (
    <div className="w-full">
      {/* 1. HERO BRAND COVER LAYER */}
      <div className="relative w-full h-[65vh] md:h-[75vh] bg-surface-container overflow-hidden">
        {property.images?.[0] ? (
          <Image
            src={property.images[0]}
            alt={property.title}
            priority
            fill
            sizes="100vw"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-primary/20 flex items-center justify-center font-body text-muted">
            Image Unavailable
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full pb-12 text-white z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="bg-secondary/90 backdrop-blur-sm text-white font-body text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-sm">
                Luxury Exclusive
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white font-body text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-sm">
                {property.propertyType || "Estate"}
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="font-heading text-4xl md:text-6xl font-medium tracking-wide">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-white/90 text-sm md:text-base font-body">
                <MapPin size={16} className="text-secondary" />
                <span>{property.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CORE INTERACTION BLOCK MATRIX */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT COMPARTMENT */}
        <div className="lg:col-span-2 space-y-12">
          {/* Metadata Badges Container Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-b border-border/30">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted font-body">
                Price Per Month
              </p>
              <p className="font-heading text-2xl text-primary font-bold">
                ${Number(property.rentPrice || 0).toLocaleString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted font-body">
                Bedrooms
              </p>
              <div className="flex items-center gap-2 font-heading text-2xl text-primary font-bold">
                <BedDouble size={20} className="text-secondary/80" />
                <span>{property.bedrooms}</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted font-body">
                Bathrooms
              </p>
              <div className="flex items-center gap-2 font-heading text-2xl text-primary font-bold">
                <Bath size={20} className="text-secondary/80" />
                <span>{property.bathrooms}</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted font-body">
                Living Area
              </p>
              <div className="flex items-center gap-2 font-heading text-2xl text-primary font-bold">
                <Square size={18} className="text-secondary/80" />
                <span>{Number(property.size || 0).toLocaleString()} Sqft</span>
              </div>
            </div>
          </div>

          {/* Core Descriptive Text Frame */}
          <div className="space-y-4">
            <h2 className="font-heading text-2xl md:text-3xl text-primary font-medium tracking-wide">
              Architectural Narrative
            </h2>
            <p className="font-body text-muted text-sm md:text-base leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Grid Layout Loop */}
          <div className="space-y-6 pt-4">
            <h2 className="font-heading text-2xl text-primary font-medium tracking-wide">
              Curated Amenities
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {property.amenities.map((amenity, index) => {
                const lookupKey = amenity.toLowerCase().trim();
                const mappedIcon = amenityIconMap[lookupKey] || (
                  <CheckCircle2 size={20} className="text-secondary" />
                );

                return (
                  <div
                    key={index}
                    className="flex flex-col items-start gap-4 p-5 bg-surface-container-low border border-border/20 rounded-xl hover:shadow-xs transition-all duration-200"
                  >
                    <div className="p-2.5 bg-surface-container-lowest rounded-xl shadow-xs border border-border/10">
                      {mappedIcon}
                    </div>
                    <span className="font-body text-xs md:text-sm text-primary font-semibold tracking-wide">
                      {amenity}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: BOOKING CONTROLLER CONTAINER STICKY FRAME */}
        <div className="relative">
          <Card className="sticky top-30 bg-surface-container-lowest border border-border/40 p-6 rounded-2xl shadow-xl space-y-6">
            <div className="flex items-end justify-between border-b border-border/30 pb-4">
              <div>
                <span className="font-heading text-3xl font-bold text-primary">
                  ${Number(property.rentPrice || 0).toLocaleString()}
                </span>
                <span className="text-muted text-xs font-body font-medium">
                  / {property.rentType === "Monthly" ? "month" : "year"}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm font-body font-semibold text-primary bg-surface-container px-2.5 py-1 rounded-md">
                <Star size={14} className="fill-secondary text-secondary" />
                <span>4.9</span>
              </div>
            </div>

            <div className="space-y-3">
              {/* Trigger Booking Form via State Control */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-[#043927] hover:bg-[#03291c] text-white font-body font-semibold transition-all duration-300 rounded-xl h-[52px] flex items-center justify-center gap-2 text-sm shadow-md cursor-pointer group"
              >
                <span>Book Property</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Add to Favorites Toggle Handler */}
              <button
                onClick={toggleFavoriteState}
                className={`w-full border font-body font-semibold transition-all duration-300 rounded-xl h-[48px] flex items-center justify-center gap-2 text-sm cursor-pointer ${
                  isFavorite
                    ? "bg-red-50 border-red-200 text-red-600 shadow-inner"
                    : "bg-transparent border-border hover:bg-surface-container-low text-primary"
                }`}
              >
                <Heart
                  size={16}
                  className={isFavorite ? "fill-current text-red-600" : "text-muted"}
                />
                <span>
                  {isFavorite ? "Saved in Collection" : "Add to Favorite"}
                </span>
              </button>
            </div>

            <p className="text-center font-body text-[11px] text-muted tracking-wide">
              Secure premium verification via verified tenant portal profiles.
            </p>
          </Card>
        </div>
      </div>

      {/* 3. HEROUI MODAL SCHEDULER SYSTEM DIALOG */}
      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-lg rounded-2xl overflow-hidden border border-border/60 bg-background">
              <Modal.CloseTrigger className="cursor-pointer" />
              <Modal.Header className="bg-surface-container-low p-6 border-b border-border/20">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#043927]/10 text-[#043927] rounded-xl">
                    <CalendarDays className="size-5" />
                  </div>
                  <div>
                    <Modal.Heading className="text-xl font-heading font-bold text-primary">
                      Complete Property Booking
                    </Modal.Heading>
                    <p className="text-xs leading-5 text-muted font-body mt-0.5">
                      Review schedule windows and verification data entries below.
                    </p>
                  </div>
                </div>
              </Modal.Header>
              
              <Modal.Body className="p-6">
                <Surface variant="default">
                  <form onSubmit={handleBookingSubmit} id="booking-modal-form" className="flex flex-col gap-5">
                    
                    {/* User Profile Info Context Field */}
                    <TextField className="w-full" name="userInfo" isRequired variant="secondary">
                      <Label className="font-body text-xs font-bold text-primary uppercase tracking-wide flex items-center gap-1.5 mb-1">
                        <User size={13} className="text-muted" /> User Info / Full Name
                      </Label>
                      <Input 
                        placeholder="Enter your legal full name" 
                        className="rounded-xl font-body text-sm"
                        value={userInfo}
                        onChange={(e) => setUserInfo(e.target.value)}
                      />
                    </TextField>

                    {/* Move-in Date Picker Node */}
                    <TextField className="w-full" name="moveInDate" isRequired variant="secondary">
                      <Label className="font-body text-xs font-bold text-primary uppercase tracking-wide flex items-center gap-1.5 mb-1">
                        <CalendarDays size={13} className="text-muted" /> Requested Move-in Date
                      </Label>
                      <Input 
                        type="date" 
                        className="rounded-xl font-body text-sm cursor-pointer"
                        value={moveInDate}
                        onChange={(e) => setMoveInDate(e.target.value)}
                      />
                    </TextField>

                    {/* Verified Contact Number Entry Area */}
                    <TextField className="w-full" name="contactNumber" isRequired variant="secondary">
                      <Label className="font-body text-xs font-bold text-primary uppercase tracking-wide flex items-center gap-1.5 mb-1">
                        <Phone size={13} className="text-muted" /> Contact Number
                      </Label>
                      <Input 
                        type="tel" 
                        placeholder="+1 (555) 000-0000" 
                        className="rounded-xl font-body text-sm"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                      />
                    </TextField>

                    {/* Additional Notes Layout Area */}
                    <TextField className="w-full" name="additionalNotes" variant="secondary">
                      <Label className="font-body text-xs font-bold text-primary uppercase tracking-wide flex items-center gap-1.5 mb-1">
                        <FileText size={13} className="text-muted" /> Additional Notes
                      </Label>
                      <Input 
                        placeholder="Any special requests or structural terms specified with your manager..." 
                        className="rounded-xl font-body text-sm"
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                      />
                    </TextField>

                  </form>
                </Surface>
              </Modal.Body>

              <Modal.Footer className="bg-surface-container-low p-4 px-6 border-t border-border/20 flex items-center justify-end gap-3">
                <Button 
                  onClick={() => setIsModalOpen(false)} 
                  variant="secondary"
                  className="rounded-xl font-body font-medium text-xs cursor-pointer border border-border"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  form="booking-modal-form"
                  className="bg-[#043927] text-white hover:bg-[#03291c] rounded-xl font-body font-semibold text-xs px-6 cursor-pointer shadow-sm"
                >
                  Confirm & Proceed to Payment
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}