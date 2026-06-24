import { serverFetch } from "../core/server";

export const getAllBookings= async()=>{
  return serverFetch("/api/bookings")
}

export const getBookingsByUserId = async (userId) => {
  return serverFetch(`/api/bookings?userId=${userId}`);
};
