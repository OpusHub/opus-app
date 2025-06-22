'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/dist/client/components/navigation";


const NavigateToAuthButton = () => {
    const router = useRouter();
  return <Button onClick={ () => { 
    router.push("/auth");

  }}>Entrar</Button>;
};

export default NavigateToAuthButton;