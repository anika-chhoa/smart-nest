"use server";

import { serverMutation } from "../core/server";


export const payment=async(paymentData)=>{
    return serverMutation("/api/bookings", paymentData)
} 