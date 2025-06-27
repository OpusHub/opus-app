'use client'

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/dist/client/components/navigation";
import { useState } from "react";


const SignOutButton = () => {
    const router = useRouter();
    const [click, setClick] = useState(false);


  return <Button className="min-w-[120px]" onClick={ () => {
    setClick(true);
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth");
        }
      }
    });
    

  }}>{
    click ? <Loader2 className="animate-spin" /> : "Sair"
  }</Button>;
};

export default SignOutButton;