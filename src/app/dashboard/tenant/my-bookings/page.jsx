import { getBookingByTenantId } from "@/lib/api/booking";
import { getUserSession } from "@/lib/core/session";
import MyBookingsClient from "./MyBookingsClient";

export default async function MyBookings() {
  const user = await getUserSession();
  const bookings = await getBookingByTenantId(user.id);
  console.log(bookings)
  const safeRequests = Array.isArray(bookings) ? bookings : [];

  return <MyBookingsClient bookings={safeRequests} />;
}
