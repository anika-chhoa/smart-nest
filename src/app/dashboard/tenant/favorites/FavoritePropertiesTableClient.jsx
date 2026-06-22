"use client";


import { TrashBin } from "@gravity-ui/icons";
import { Table } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteFavorite } from "@/lib/actions/AddToFavorite";

export default function FavoritePropertiesTableClient({ initialFavorites }) {
  const router = useRouter();
  const [favorites, setFavorites] = useState(initialFavorites);

  const handleDeleteConfirmation = (favoriteId, propertyTitle) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-sm sm:max-w-md w-full bg-surface shadow-lg rounded-xl pointer-events-auto flex flex-col p-4 border border-border/60 mx-4 sm:mx-0`}
        >
          <div className="flex-1">
            <p className="font-body text-sm font-semibold text-primary">
              Remove from Favorites?
            </p>
            <p className="font-body text-xs text-muted mt-1">
              Are you sure you want to remove{" "}
              <span className="font-semibold text-foreground">
                "{propertyTitle}"
              </span>{" "}
              from your favorite properties?
            </p>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 font-body text-xs font-medium text-muted hover:bg-surface-container-high rounded-md transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                await executeRemove(favoriteId, propertyTitle);
              }}
              className="px-3 py-1.5 font-body text-xs font-medium bg-danger text-white rounded-md hover:bg-danger/90 transition-colors cursor-pointer"
            >
              Remove
            </button>
          </div>
        </div>
      ),
      { duration: Infinity, position: "top-center" }
    );
  };

  const executeRemove = async (favoriteId, propertyTitle) => {
    
    const toastId = toast.loading("Removing listing from saved items...");
    try {
      const response = await deleteFavorite(favoriteId)
      
      if (!response || response.success === false) {
        throw new Error("Failed to remove item record.");
      }
      
      setFavorites((prev) => prev.filter((item) => item._id !== favoriteId));
      toast.success(`${propertyTitle} removed completely!`, { id: toastId });
      router.refresh();
    } catch (error) {
      console.error("Remove Favorite Error:", error);
      toast.error(`Could not remove ${propertyTitle}. Please try again.`, {
        id: toastId,
      });
    }
  };

  return (
    <div className="w-full bg-surface rounded-2xl sm:rounded-3xl shadow-sm border border-border/40 overflow-hidden">
      {/* Scroll container locks table component overflow to the x-axis exclusively */}
      <Table.ScrollContainer className="w-full overflow-x-auto object-contain last:border-0">
        <Table className="w-full min-w-[600px] text-left border-collapse table-auto">
          <Table.Content aria-label="User responsive favorite properties table">
            <Table.Header className="bg-surface-container-low border-b border-border/60">
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
                Rent Price
              </Table.Column>
              <Table.Column className="font-body text-xs font-semibold uppercase tracking-wider text-muted p-4">
                Rent Type
              </Table.Column>
              <Table.Column className="font-body text-xs font-semibold uppercase tracking-wider text-muted p-4 text-right">
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {favorites.length === 0 ? (
                <Table.Row>
                  <Table.Cell
                    colSpan={5}
                    className="text-center font-body text-muted py-12"
                  >
                    You have no saved properties yet.
                  </Table.Cell>
                </Table.Row>
              ) : (
                favorites.map((item) => (
                  <Table.Row
                    key={item._id}
                    className="border-b border-border/30 hover:bg-surface-container-lowest transition-colors duration-150"
                  >
                    {/* Column 1: Image & Title */}
                    <Table.Cell className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-14 rounded-md overflow-hidden bg-card flex-shrink-0 border border-border/40 relative">
                          <Image
                            src={
                              item.propertyImage?.[0] ||
                              "https://placehold.co/600x400?text=Property"
                            }
                            alt={item.propertyTitle || "Property"}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                        <div className="max-w-[220px] sm:max-w-xs overflow-hidden">
                          <div className="font-body text-sm font-semibold text-primary truncate">
                            {item.propertyTitle || "Untitled Property"}
                          </div>
                        </div>
                      </div>
                    </Table.Cell>

                    {/* Column 2: Location */}
                    <Table.Cell className="p-4 font-body text-sm text-muted whitespace-nowrap">
                      {item.propertyLocation || "N/A"}
                    </Table.Cell>

                    {/* Column 3: Rent Price */}
                    <Table.Cell className="p-4 whitespace-nowrap">
                      <div className="font-body text-sm font-semibold text-primary">
                        ${Number(item.propertyRentPrice || 0).toLocaleString()}
                      </div>
                    </Table.Cell>

                    {/* Column 4: Rent Type */}
                    <Table.Cell className="p-4 whitespace-nowrap">
                      <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full tracking-wide uppercase bg-surface-container border border-border/40 text-foreground">
                        {item.propertyRentType || "Monthly"}
                      </span>
                    </Table.Cell>

                    {/* Column 5: Delete Action */}
                    <Table.Cell className="p-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end">
                        <button
                          onClick={() => handleDeleteConfirmation(item._id, item.propertyTitle)}
                          title="Remove from Favorites"
                          className="p-1.5 text-muted hover:text-danger rounded-md hover:bg-danger/10 transition-colors cursor-pointer inline-flex items-center justify-center"
                        >
                          <TrashBin width={18} height={18} className="text-secondary" />
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table.Content>
        </Table>
      </Table.ScrollContainer>
      
      <Table.Footer className="p-4 bg-surface-container-lowest border-t border-border/40 text-xs font-body text-muted flex items-center justify-between">
        <span>Showing {favorites.length} saved properties</span>
      </Table.Footer>
    </div>
  );
}