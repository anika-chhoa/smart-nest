"use server"

import { serverMutation } from "../core/server"

export const postReviews=async(newReview)=>{
    return serverMutation("/api/reviews",newReview)
}