"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Select, 
  Label, 
  Description, 
  ListBox, 
  TextArea,
  Input, 
  Checkbox,
  Avatar, 
  Button 
} from "@heroui/react";
import { 
  FileText, 
  DollarSign, 
  Home, 
  MapPin, 
  Image as ImageIcon, 
  Sparkles, 
  CloudUpload,
  Loader2,
  CheckCircle,
  ChevronDown
} from "lucide-react";
import toast from "react-hot-toast";
import { createProperty } from "@/lib/actions/properties";

export default function AddPropertyForm({ user }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  // Base Form Fields
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    propertyType: "",
    rentPrice: "",
    rentType: "Monthly",
    bedrooms: "",
    bathrooms: "",
    size: "",
    customAmenities: "",
  });

  // Safe Array State for Amenities Multi-Selection
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // Toggle Function ensuring perfect interaction when clicking anywhere on the amenity cards
  const toggleAmenity = (id) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Cloudinary Direct Unsigned REST Upload Pipeline
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploadingImages(true);
    const toastId = toast.loading("Uploading images to Cloudinary...");

    try {
      const uploadPromises = files.map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET); 

        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: "POST", body: data }
        );
        
        if (!res.ok) throw new Error("Upload failed");
        const fileData = await res.json();
        return fileData.secure_url;
      });

      const urls = await uploadPromises;
      setUploadedImages((prev) => [...prev, ...urls]);
      toast.success("Images added successfully!", { id: toastId });
    } catch (err) {
      toast.error("Failed uploading images. Check Cloudinary settings.", { id: toastId });
    } finally {
      setUploadingImages(false);
    }
  };

  // Form Submission Handler
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!formData.title || !formData.location || !formData.rentPrice || !formData.propertyType) {
      toast.error("Please fill in all core metadata fields.");
      return;
    }

    if (uploadedImages.length === 0) {
      toast.error("Please upload at least one property asset image.");
      return;
    }

    setLoading(true);

    // Form entries payload structure combining text inputs, cloud images, and chosen features array
    const fullPayload = {
      ...formData,
      amenities: selectedAmenities, 
      images: uploadedImages,
      status: "Pending",
      ownerInfo: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        plan: user?.plan
      }
    };

    try {
      const newPost = await createProperty(fullPayload);
      console.log(newPost)

      if (!newPost || !newPost.acknowledged) throw new Error("Server storage process rejected execution.");

      toast.success("Masterpiece Listing Published!");
      router.push("/dashboard/owner/my-properties");
    } catch (error) {
        console.log(error)
      toast.error(error.message || "Failed to finalize listing entry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-body min-h-screen bg-background text-foreground py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Structural Title Area */}
      <div className="mb-10">
        <h1 className="font-heading font-bold text-4xl text-foreground tracking-tight mb-2">
          List Your Masterpiece
        </h1>
        <p className="text-muted text-sm max-w-2xl">
          Curate an experience for your prospective tenants. Provide exquisite details to match the calibre of your property.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COMPONENT COLUMN: Input Form Field Stack */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
          
          {/* Section 1: Basic Specifications Data Box */}
          <div className="bg-surface border border-border/20 rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2 text-secondary font-semibold border-b border-border/10 pb-3">
              <FileText size={18} />
              <h3>Basic Information</h3>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-semibold text-foreground">Property Title</Label>
              <Input
                name="title"
                placeholder="e.g. Azure Cliffside Villa"
                required
                variant="bordered"
                className="w-full px-4 py-3 bg-card border border-border/30 rounded-xl min-h-[48px] text-sm focus:outline-none focus:border-secondary"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-semibold text-foreground">Property Type</Label>
                <Select
                  value={formData.propertyType}
                  onSelectionChange={(key) => setFormData(p => ({ ...p, propertyType: key }))}
                >
                  <Select.Trigger className="w-full flex items-center justify-between px-4 py-3 bg-card border border-border/30 rounded-xl text-sm min-h-[48px] text-left">
                    <Select.Value placeholder="Select Type" />
                    <ChevronDown size={16} className="text-muted" />
                  </Select.Trigger>
                  <Select.Popover className="bg-surface border border-border/30 rounded-xl shadow-xl mt-1">
                    <ListBox className="p-1">
                      <ListBox.Item key="Villa" className="px-3 py-2 text-sm rounded-lg hover:bg-card cursor-pointer">Villa</ListBox.Item>
                      <ListBox.Item key="Apartment" className="px-3 py-2 text-sm rounded-lg hover:bg-card cursor-pointer">Apartment</ListBox.Item>
                      <ListBox.Item key="Penthouse" className="px-3 py-2 text-sm rounded-lg hover:bg-card cursor-pointer">Penthouse</ListBox.Item>
                      <ListBox.Item key="Mansion" className="px-3 py-2 text-sm rounded-lg hover:bg-card cursor-pointer">Mansion</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-semibold text-foreground">Description</Label>
              <TextArea
                aria-label="Property Description"
                placeholder="Describe the architectural soul of the property..."
                value={formData.description}
                onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                className="w-full bg-card border border-border/30 rounded-xl p-4 min-h-[120px] focus:outline-none focus:border-secondary text-sm resize-none"
              />
            </div>
          </div>

          {/* Section 2: Financial Matrix + Dimensional Properties */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Rent Configurations */}
            <div className="bg-surface border border-border/20 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-secondary font-semibold border-b border-border/10 pb-2">
                <DollarSign size={18} />
                <h3>Pricing & Availability</h3>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-semibold text-foreground">Rent Price ($)</Label>
                <Input
                  type="number"
                  name="rentPrice"
                  placeholder="3,500"
                  required
                  variant="bordered bg-card border-border/30 rounded-xl min-h-[48px]"
                  value={formData.rentPrice}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-semibold text-foreground">Rent Type</Label>
                <Select
                  value={formData.rentType}
                  onSelectionChange={(key) => setFormData(p => ({ ...p, rentType: key }))}
                >
                  <Select.Trigger className="w-full flex items-center justify-between px-4 py-3 bg-card border border-border/30 rounded-xl text-sm min-h-[48px] text-left">
                    <Select.Value placeholder="Monthly" />
                    <ChevronDown size={16} className="text-muted" />
                  </Select.Trigger>
                  <Select.Popover className="bg-surface border border-border/30 rounded-xl shadow-xl mt-1">
                    <ListBox className="p-1">
                      <ListBox.Item key="Monthly" className="px-3 py-2 text-sm rounded-lg hover:bg-card cursor-pointer">Monthly</ListBox.Item>
                      <ListBox.Item key="Weekly" className="px-3 py-2 text-sm rounded-lg hover:bg-card cursor-pointer">Weekly</ListBox.Item>
                      <ListBox.Item key="Daily" className="px-3 py-2 text-sm rounded-lg hover:bg-card cursor-pointer">Daily</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            {/* Scale/Size Matrix Configurations */}
            <div className="bg-surface border border-border/20 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-secondary font-semibold border-b border-border/10 pb-2">
                <Home size={18} />
                <h3>Property Specs</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm font-semibold text-foreground">Bedrooms</Label>
                  <Input
                    type="number"
                    name="bedrooms"
                    placeholder="4"
                    required
                    variant="bordered bg-card border-border/30 rounded-xl min-h-[48px]"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm font-semibold text-foreground">Bathrooms</Label>
                  <Input
                    type="number"
                    step="0.5"
                    name="bathrooms"
                    placeholder="2.5"
                    required
                    variant="bordered bg-card border-border/30 rounded-xl min-h-[48px]"
                    
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-semibold text-foreground">Size (sqft)</Label>
                <Input
                  type="number"
                  name="size"
                  placeholder="4500"
                  required
                  variant="bordered bg-white border-border/30 rounded-xl min-h-[48px]"
                  value={formData.size}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Location Card */}
          <div className="bg-surface border border-border/20 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-secondary font-semibold border-b border-border/10 pb-3">
              <MapPin size={18} />
              <h3>Location</h3>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-semibold text-foreground">Full Address</Label>
              <Input
                name="location"
                placeholder="Start typing the address..."
                required
                variant="bordered bg-white border-border/30 rounded-xl min-h-[48px]"
               
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Section 4: Cloudinary Media Gallery Upload Block */}
          <div className="bg-surface border border-border/20 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-secondary font-semibold border-b border-border/10 pb-3">
              <ImageIcon size={18} />
              <h3>Media Gallery</h3>
            </div>
            <div className="border-2 border-dashed border-border/40 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-card/40 transition hover:bg-card/70 relative">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer disabled:pointer-events-none"
                disabled={uploadingImages}
              />
              <CloudUpload size={40} className="text-muted mb-3" />
              <p className="text-sm font-semibold text-foreground">Drag and drop high-res property images</p>
              <p className="text-xs text-muted mt-1 mb-4">Recommended: 4:3 aspect ratio, minimum 1920x1080px</p>
              <Button size="sm" variant="flat" className="bg-surface border border-border/30 font-medium">
                {uploadingImages ? "Uploading..." : "Browse Files"}
              </Button>
            </div>

            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
                {uploadedImages.map((url, index) => (
                  <div key={index} className="aspect-square relative rounded-xl overflow-hidden border border-border/30">
                    <img src={url} alt="Uploaded Item Preview" className="object-cover w-full h-full" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 5: Extras & Amenities Block (Interactive Multiple Choice Group Setup) */}
          <div className="bg-surface border border-border/20 rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2 text-secondary font-semibold border-b border-border/10 pb-3">
              <Sparkles size={18} />
              <h3>Luxury Amenities & Features</h3>
            </div>

            <div className="flex flex-col gap-4">
              <Label className="text-sm font-semibold text-foreground">Select one or more highlights for this property listing</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Amenity 1 */}
                <div 
                  onClick={() => toggleAmenity("smartHome")}
                  className={`p-4 border rounded-xl bg-card/30 transition-all cursor-pointer flex items-start gap-3 select-none ${
                    selectedAmenities.includes("smartHome") ? "border-secondary bg-secondary/5" : "border-border/20"
                  }`}
                >
                  <Checkbox isSelected={selectedAmenities.includes("smartHome")} aria-label="Smart Home Systems" />
                  <div className="flex flex-col -mt-0.5">
                    <span className="text-sm font-semibold text-foreground">Smart Home Systems</span>
                    <Description className="text-xs text-muted mt-0.5">Integrated automated lighting, climate, and app control units.</Description>
                  </div>
                </div>

                {/* Amenity 2 */}
                <div 
                  onClick={() => toggleAmenity("infinityPool")}
                  className={`p-4 border rounded-xl bg-card/30 transition-all cursor-pointer flex items-start gap-3 select-none ${
                    selectedAmenities.includes("infinityPool") ? "border-secondary bg-secondary/5" : "border-border/20"
                  }`}
                >
                  <Checkbox isSelected={selectedAmenities.includes("infinityPool")} aria-label="Private Infinity Pool" />
                  <div className="flex flex-col -mt-0.5">
                    <span className="text-sm font-semibold text-foreground">Private Infinity Pool</span>
                    <Description className="text-xs text-muted mt-0.5">Glass-walled premium heated infinity pool with skyline orientation.</Description>
                  </div>
                </div>

                {/* Amenity 3 */}
                <div 
                  onClick={() => toggleAmenity("wineCellar")}
                  className={`p-4 border rounded-xl bg-card/30 transition-all cursor-pointer flex items-start gap-3 select-none ${
                    selectedAmenities.includes("wineCellar") ? "border-secondary bg-secondary/5" : "border-border/20"
                  }`}
                >
                  <Checkbox isSelected={selectedAmenities.includes("wineCellar")} aria-label="Sommelier Wine Cellar" />
                  <div className="flex flex-col -mt-0.5">
                    <span className="text-sm font-semibold text-foreground">Sommelier Wine Cellar</span>
                    <Description className="text-xs text-muted mt-0.5">Climate and humidity display protection vault for fine vintages.</Description>
                  </div>
                </div>

                {/* Amenity 4 */}
                <div 
                  onClick={() => toggleAmenity("concierge")}
                  className={`p-4 border rounded-xl bg-card/30 transition-all cursor-pointer flex items-start gap-3 select-none ${
                    selectedAmenities.includes("concierge") ? "border-secondary bg-secondary/5" : "border-border/20"
                  }`}
                >
                  <Checkbox isSelected={selectedAmenities.includes("concierge")} aria-label="24/7 Elite Concierge" />
                  <div className="flex flex-col -mt-0.5">
                    <span className="text-sm font-semibold text-foreground">24/7 Elite Concierge</span>
                    <Description className="text-xs text-muted mt-0.5">On-demand luxury hospitality, guest reception, and booking service.</Description>
                  </div>
                </div>

              </div>
            </div>

            {/* Custom Amenities Open Textarea Field */}
            <div className="flex flex-col gap-1.5 pt-2">
              <Label className="text-sm font-semibold text-foreground">Custom Extra Features</Label>
              <TextArea
                aria-label="Custom Highlights"
                placeholder="Any unique highlights not mentioned above (e.g., Helipad access, Private Spa)..."
                value={formData.customAmenities}
                onChange={(e) => setFormData(p => ({ ...p, customAmenities: e.target.value }))}
                className="w-full bg-white border border-border/30 rounded-xl p-4 min-h-[90px] focus:outline-none focus:border-secondary text-sm resize-none"
              />
              <Description className="text-xs text-muted px-1">
                Characters: {formData.customAmenities.length}
              </Description>
            </div>
          </div>

          {/* Small Screen Layout Submission Trigger Wrapper */}
          <div className="lg:hidden">
            <Button
              type="submit"
              disabled={loading || uploadingImages}
              className="w-full bg-midnight-emerald text-white dark:bg-secondary dark:text-background py-6 rounded-full font-bold text-base shadow-md"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Publish Listing"}
            </Button>
          </div>
        </form>

        {/* RIGHT COLUMN COMPONENT: Sticky Preview Control Metadata Sidecard Panel */}
        <div className="space-y-6 lg:sticky lg:top-6">
          
          {/* Owner Account Card Section */}
          <div className="bg-surface border border-border/20 rounded-3xl p-5 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar src={user?.image} name={user?.name} size="md" radius="lg" className="border border-border/30" />
              <div>
                <h4 className="font-bold text-sm text-foreground">{user?.name || "Owner Profile"}</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-card text-muted rounded-md border border-border/20">
                    {user?.role || "Owner"}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-muted font-semibold uppercase tracking-wider">Email</p>
              <p className="text-xs font-medium text-foreground/80 max-w-[120px] truncate">{user?.email}</p>
            </div>
          </div>

          {/* Review Progress Tracker Status Monitoring Card */}
          <div className="bg-surface border border-border/20 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border/10 pb-3">
              <span className="text-xs font-bold text-muted uppercase tracking-wider">Submission Status</span>
              <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full flex items-center gap-1">
                ● Pending
              </span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Complete all required fields marked with an asterisk to enable listing publication. Your layout configuration forces a default verification review status.
            </p>
            
            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-muted font-medium">Current Plan:</span>
              <span className="font-bold text-secondary uppercase bg-secondary/10 px-2 py-0.5 rounded">
                {user?.plan?.replace("_", " ") || "OWNER FREE"}
              </span>
            </div>
          </div>

          {/* Large Screen Trigger Action Button Block */}
          <div className="hidden lg:block">
            <Button
              type="button"
              disabled={loading || uploadingImages}
              onClick={() => handleSubmit()}
              className="w-full bg-midnight-emerald text-white dark:bg-secondary dark:text-background py-6 rounded-2xl font-bold text-base shadow-md hover:opacity-95 transition active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={18} />
                  <span>Publishing Masterpiece...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} />
                  <span>Publish Listing</span>
                </div>
              )}
            </Button>
            <p className="text-[11px] text-muted text-center mt-3 max-w-[250px] mx-auto leading-normal">
              By publishing, you agree to our Property Listing Terms and Luxury Quality Standards.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}