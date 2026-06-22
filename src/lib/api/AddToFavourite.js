import { serverFetch } from "../core/server";

export const getFavoritePropertyByUserId = async (tenantId) => {
  return serverFetch(`/api/favorites?tenantId=${tenantId}`);
};
export const getFavoriteButtonToggle = async (tenantId, propertyId) => {
  return serverFetch(`/api/favorites?tenantId=${tenantId}&propertyId=${propertyId}`);
};
