import { serverMutation } from "../core/server";

export const rejectionReason = async (newRejection) => {
  return serverMutation("/api/rejections", newRejection);
};
