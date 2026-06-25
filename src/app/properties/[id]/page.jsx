
import { getPropertyByPropertyId } from "@/lib/api/properties";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import PropertyDetailsClient from "./PropertyDetailsClient";
import { requireUser } from "@/lib/core/session";

const PropertyDetailsPage = async ({ params }) => {
  await requireUser();

  const headersList = await headers();

  const response = await auth.api.getToken({ headers: headersList });
  const token = response?.token;

  const { id } = await params;
  const property = await getPropertyByPropertyId(id, token);

  const session = await auth.api.getSession({ headers: headersList });
  const user = session?.user;

  let isFavorited = false;
  let initialFavoriteId = null;

  if (user?.role === "tenant" && user?.id && property?._id) {
    try {
      const propertyId = property._id?.toString();
      const tenantId = user.id?.toString();

      // ✅ Use process.env.API_URL (server-side) not NEXT_PUBLIC
      const baseUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const url = `${baseUrl}/api/favorites?tenantId=${tenantId}&propertyId=${propertyId}`;

      console.log("Fetching favorites URL:", url);
      console.log("tenantId:", tenantId, "propertyId:", propertyId);

      const res = await fetch(url, { cache: "no-store" });
      const favorites = await res.json();

      console.log("Favorites result:", favorites);

      if (Array.isArray(favorites) && favorites.length > 0) {
        isFavorited = true;
        initialFavoriteId = favorites[0]._id?.toString();
      }
    } catch (err) {
      console.error("Favorite fetch error:", err);
    }
  } else {
    console.log("Skipping fetch — user:", user?.id, "role:", user?.role, "property:", property?._id);
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-primary font-body">
        <p className="text-lg font-semibold">Luxury residence not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <PropertyDetailsClient
        property={property}
        isFavorited={isFavorited}
        initialFavoriteId={initialFavoriteId}
      />
    </div>
  );
};

export default PropertyDetailsPage;

