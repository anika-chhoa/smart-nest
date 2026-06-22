import { serverFetch } from "../core/server"

export const getAllProperties=async()=>{
    return serverFetch ("/api/properties")
}
// export const getFilteredProperties=async(search,sort,propertyType)=>{
//     return serverFetch (`/api/properties?search=${search}&propertyType=${propertyType}&sort=${sort}`)
// }

export const getFilteredProperties = async ({ location, sort, propertyType }) => {
  const params = new URLSearchParams();

  if (location) params.append("search", location);
  if (sort && sort !== "newest") params.append("sort", sort);
  if (propertyType && propertyType !== "All") params.append("propertyType", propertyType);

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