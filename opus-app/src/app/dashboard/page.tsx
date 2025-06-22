import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignOutButton from "./components/sign-out-button";
import NavigateToAuthButton from "./components/session-off-navigate-for-auth-button";


const DashboardPage =  async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  
  if (!session?.user.name) {
   
    return (
    <div className="flex flex-col items-center justify-center h-screen">
      <NavigateToAuthButton />
    </div>
  );
}


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg">Olá {session?.user.name}</p>
      <SignOutButton />
    </div>
  );
}

export default DashboardPage;