import { serverMutation } from "../core/server"

export const updateBookingStatus=async(bookingId,status)=>{
    const payload = { BookingStatus: status };
    return serverMutation(`/api/bookings/${bookingId}`,payload,"PATCH")
}