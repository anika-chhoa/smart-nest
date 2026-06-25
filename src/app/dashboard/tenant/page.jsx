// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";

const TenantDashboard = async () => {
// const {session} = await auth.api.getSession({
//     headers: await headers(),
//   });
//   const token = session?.token;
//   console.log(token);
  return (
    <div>
      Tenant Dashboard
      <p>Hi, Welcome Back!</p>
    </div>
  );
};

export default TenantDashboard;
