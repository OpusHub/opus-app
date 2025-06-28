import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const AuthShield = async ( { children } : { children: React.ReactNode }) => {
    
    const session = await auth.api.getSession({
    headers: await headers()
  });

  
  if (!session?.user) {
    return redirect('/auth')
  } 

  if (!session?.user?.company) {
    return redirect('/company-form');
  }

    return (
        <div>
            {children}
        </div>
    );
};
