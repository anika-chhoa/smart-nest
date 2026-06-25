"use server";

import { protectedMutation, serverDelete, serverMutation } from "../core/server";

export const createProperty = async (newProperty) => {
  return protectedMutation("/api/properties", newProperty);
};

export const updateProperty=async(propertyId, updatedProperty)=>{
  return protectedMutation(`/api/properties/${propertyId}`, updatedProperty, "PATCH")
}

export const deleteProperty = async (propertyId) => {
  return serverDelete(`/api/properties/${propertyId}`);
};
