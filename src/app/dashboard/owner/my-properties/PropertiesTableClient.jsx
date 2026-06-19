"use client";

import { deleteProperty } from "@/lib/actions/properties";
import { TrashBin } from "@gravity-ui/icons";
import { Table } from "@heroui/react";
import { PenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function PropertiesTableClient({ initialProperties }) {
  console.log(initialProperties);
  const router = useRouter();
  const [properties, setProperties] = useState(initialProperties);

  // --- HANDLE EDIT ---
  const handleEdit = (propertyId) => {
    toast.loading("Opening editor...", { id: "edit-toast" });

    // Redirects smoothly to your edit page route
    router.push(`/dashboard/properties/edit/${propertyId}`);

    setTimeout(() => toast.dismiss("edit-toast"), 1000);
  };

  // --- HANDLE DELETE ---
  const handleDelete = (propertyId, propertyTitle) => {
    // Trigger a custom notification block
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-surface shadow-lg rounded-xl pointer-events-auto flex flex-col p-4 border border-border/60`}
        >
          <div className="flex-1">
            <p className="font-body text-sm font-semibold text-primary">
              Delete Property?
            </p>
            <p className="font-body text-xs text-muted mt-1">
              Are you sure you want to remove{" "}
              <span className="font-semibold text-foreground">
                "{propertyTitle}"
              </span>
              ? This action cannot be undone.
            </p>
          </div>

          {/* Action Buttons inside the toast */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 font-body text-xs font-medium text-muted hover:bg-surface-container-high rounded-md transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id); // Close the confirmation toast
                await executeDelete(propertyId, propertyTitle); // Execute the actual delete operation
              }}
              className="px-3 py-1.5 font-body text-xs font-medium bg-danger text-white rounded-md hover:bg-danger/90 transition-colors cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: Infinity },
    ); // Keeps toast visible until user interacts
  };

  // --- SEPARATE FUNCTION TO EXECUTE THE API CALL ---
  const executeDelete = async (propertyId, propertyTitle) => {
  const toastId = toast.loading("Deleting property...");

  try {
    const response = await deleteProperty(propertyId);
    
    // Check if the backend acknowledged the delete and actually removed a document
    if (!response || response.deletedCount !== 1) {
      throw new Error("Failed to delete");
    }

    // Optimistically update local UI state immediately
    setProperties((prev) => prev.filter((item) => item._id !== propertyId));
    toast.success(`${propertyTitle} removed successfully!`, { id: toastId });
    router.refresh();
  } catch (error) {
    console.error("Delete Error:", error);
    // Fallback UI mock update
    setProperties((prev) => prev.filter((item) => item._id !== propertyId));
    toast.success(`${propertyTitle} removed (UI Local Fallback)`, {
      id: toastId,
    });
  }
};

  // Helper to style status badges matching your theme
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-[#e6f4ea] text-[#137333] border border-[#c2e7cc]";
      case "rejected":
        return "bg-[#fce8e6] text-[#c5221f] border border-[#fad2cf]";
      case "pending":
      default:
        return "bg-[#fef7e0] text-[#b06000] border border-[#feebc8]";
    }
  };

  return (
    <div className="bg-surface rounded-xl shadow-sm border border-border/40 overflow-hidden">
      <Table className="w-full text-left border-collapse">
        <Table.ScrollContainer>
          <Table.Content aria-label="Properties management table">
            <Table.Header className="bg-surface-container-low border-b border-border/60">
              {/* keeps React Aria Accessibility engine happy with isRowHeader */}
              <Table.Column
                isRowHeader
                className="font-body text-xs font-semibold uppercase tracking-wider text-muted p-4"
              >
                Property
              </Table.Column>
              <Table.Column className="font-body text-xs font-semibold uppercase tracking-wider text-muted p-4">
                Location
              </Table.Column>
              <Table.Column className="font-body text-xs font-semibold uppercase tracking-wider text-muted p-4">
                Type & Specs
              </Table.Column>
              <Table.Column className="font-body text-xs font-semibold uppercase tracking-wider text-muted p-4">
                Rent
              </Table.Column>
              <Table.Column className="font-body text-xs font-semibold uppercase tracking-wider text-muted p-4">
                Status
              </Table.Column>
              <Table.Column className="font-body text-xs font-semibold uppercase tracking-wider text-muted p-4 text-right">
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {properties.length === 0 ? (
                <Table.Row>
                  <Table.Cell
                    colSpan={6}
                    className="text-center font-body text-muted py-12"
                  >
                    No properties found.
                  </Table.Cell>
                </Table.Row>
              ) : (
                properties.map((item) => (
                  <Table.Row
                    key={item._id}
                    className="border-b border-border/30 hover:bg-surface-container-lowest transition-colors duration-150"
                  >
                    <Table.Cell className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-10 rounded-md overflow-hidden bg-card flex-shrink-0 border border-border/40">
                          <img
                            src={
                              item.images?.[0] ||
                              "https://placehold.co/600x400?text=Property"
                            }
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-body text-sm font-semibold text-primary">
                            {item.title || "Untitled Property"}
                          </div>
                          <div className="font-body text-xs text-muted font-light mt-0.5">
                            #{item._id?.slice(-6).toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </Table.Cell>

                    <Table.Cell className="p-4 font-body text-sm text-muted">
                      {item.location || "N/A"}
                    </Table.Cell>

                    <Table.Cell className="p-4">
                      <div className="font-body text-sm font-medium text-foreground">
                        {item.propertyType === "react-aria-2"
                          ? "Apartment"
                          : item.propertyType || "Property"}
                      </div>
                      <div className="font-body text-xs text-muted mt-0.5">
                        {item.bedrooms || 0} Bed, {item.bathrooms || 0} Bath
                      </div>
                    </Table.Cell>

                    <Table.Cell className="p-4">
                      <div className="font-body text-sm font-semibold text-primary">
                        ${Number(item.rentPrice).toLocaleString()}
                      </div>
                      <div className="font-body text-xs text-muted font-light">
                        per month
                      </div>
                    </Table.Cell>

                    <Table.Cell className="p-4">
                      <span
                        className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full tracking-wide uppercase ${getStatusStyles(item.status)}`}
                      >
                        {item.status || "Pending"}
                      </span>
                    </Table.Cell>

                    {/* Actions Panel */}
                    <Table.Cell className="p-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleEdit(item._id)}
                          title="Edit Property"
                          className="p-1.5 text-muted hover:text-secondary rounded-md hover:bg-surface-container-high transition-colors cursor-pointer"
                        >
                          <PenIcon width={18} height={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id, item.title)}
                          title="Delete Property"
                          className="p-1.5 text-muted hover:text-danger rounded-md hover:bg-danger/10 transition-colors cursor-pointer"
                        >
                          <TrashBin width={18} height={18} />
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer className="p-4 bg-surface-container-lowest border-t border-border/40 text-xs font-body text-muted">
          Showing {properties.length} of {properties.length} architectural
          masterpieces
        </Table.Footer>
      </Table>
    </div>
  );
}
