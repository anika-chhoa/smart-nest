"use server"
import { protectedFetch, serverFetch } from "../core/server";

export const getAllBookings= async()=>{
  return protectedFetch("/api/bookings")
}

export const getBookingsByUserId = async (userId) => {
  return protectedFetch(`/api/bookings?userId=${userId}`);
};
