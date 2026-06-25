import { getPropertyByPropertyId } from "@/lib/api/properties";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import PropertyDetailsClient from "./PropertyDetailsClient";
import { requireUser } from "@/lib/core/session";

const PropertyDetailsPage = async ({ params }) => {
  await requireUser();
  const response = await auth.api.getToken({
    headers: await headers(),
  });
  const token = response?.token;
  const { id } = await params;
  const property = await getPropertyByPropertyId(id, token);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-primary font-body">
        <p className="text-lg font-semibold">Luxury residence not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <PropertyDetailsClient property={property} />
    </div>
  );
};

export default PropertyDetailsPage;
