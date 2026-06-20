
import { redirect } from "next/navigation";

import { getUserSession } from "@/lib/core/session";
import EditPropertyForm from "./EditPropertyForm";

export default async function EditPropertyPage() {
  const user= await getUserSession();

  if (!user) {
    redirect("/login");
  }
  
  return (
    <EditPropertyForm user={user} />
  );
}