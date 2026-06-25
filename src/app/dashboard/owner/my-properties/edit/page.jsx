
import { redirect } from "next/navigation";

import { getUserSession } from "@/lib/core/session";
import EditPropertyForm from "./EditPropertyForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function EditPropertyPage() {
  const response = await auth.api.getToken({
    headers: await headers(),
  });
  const token = response?.token;
  const user= await getUserSession();

  if (!user) {
    redirect("/login");
  }
  
  return (
    <EditPropertyForm user={user} token={token} />
  );
}