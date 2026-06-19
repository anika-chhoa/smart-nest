import { serverFetch } from "../core/server"

export const getAllProperties=async()=>{
    return serverFetch ("/api/properties")
}

export const getPropertiesByUserId=async(userId)=>{
    return serverFetch(`/api/properties?userId=${userId}`)
}

