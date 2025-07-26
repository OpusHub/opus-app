import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { usePathname, useRouter } from "next/navigation";


export const AuthShield = async ( { children } : { children: React.ReactNode }) => {
    


    const session = await auth.api.getSession({
    headers: await headers()
  });

  
  if (!session?.user) {
    return redirect('/auth')
  } 

    return (
        <div>
            {children}
        </div>
    );
};
