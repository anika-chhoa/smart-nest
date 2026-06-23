import { serverFetch } from "../core/server"

export const getAllProperties=async()=>{
    return serverFetch ("/api/properties")
}



export const getFilteredProperties = async ({ location, propertyType, minPrice, maxPrice, page=1 }) => {
  const params = new URLSearchParams();

  if (location) params.append("search", location);
  
  if (propertyType && propertyType !== "All") params.append("propertyType", propertyType);

  if (minPrice) params.append("minPrice", minPrice);
  if (maxPrice) params.append("maxPrice", maxPrice);

  params.append("page", page);

  const queryString = params.toString();
  const path = queryString ? `/api/properties?${queryString}` : "/api/properties";

  return serverFetch(path);
};


export const getPropertiesByUserId=async(userId)=>{
    return serverFetch(`/api/properties?userId=${userId}`)
}

export const getPropertyByPropertyId=async(id)=>{
    return serverFetch(`/api/properties/${id}`)
}