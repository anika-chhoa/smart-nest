"use server"

import { serverMutation } from "../core/server";

export const createProperty = async (newProperty) => {
  return serverMutation("/api/properties", newProperty);
};
