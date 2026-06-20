"use server";

import { serverDelete, serverMutation } from "../core/server";

export const createProperty = async (newProperty) => {
  return serverMutation("/api/properties", newProperty);
};

export const updateProperty=async(propertyId, updatedProperty)=>{
  return serverMutation(`/api/properties/${propertyId}`, updatedProperty, "PATCH")
}

export const deleteProperty = async (propertyId) => {
  return serverDelete(`/api/properties/${propertyId}`);
};
