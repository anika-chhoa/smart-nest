"use server";
import { protectedFetch } from "../core/server";

export const getAllBookings = async () => {
  return protectedFetch("/api/bookings");
};

export const getBookingsByOwnerId = async (ownerId) => {
  return protectedFetch(`/api/bookings?ownerId=${ownerId}`);
};

export const getBookingByTenantId = async (tenantId) => {
  return protectedFetch(`/api/bookings?tenantId=${tenantId}`);
};
