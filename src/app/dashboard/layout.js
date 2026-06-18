import { DashboardSidebar } from "@/components/shared/DashboardSidebar";
import { getUserSession } from "@/lib/core/session";


export default async function DashboardLayout({ children }) {
    const user = await getUserSession();
  return (
    <div className="flex min-h-screen">
        <DashboardSidebar user={user}/>
      <div className="flex-1">{children}</div>
    </div>
  );
}
