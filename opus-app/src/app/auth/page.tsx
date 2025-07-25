import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignupForm from "./components/signup-form";
import SigninForm from "./components/signin-form";
import { auth } from "@/lib/auth";
import { headers } from "next/dist/server/request/headers";
import { redirect } from "next/navigation";

const AuthPage = async () => {
  const session = await auth.api.getSession({
      headers: await headers()
    });
  
    
    if (session?.user) {
      redirect('/dashboard');
    }
  

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6">
      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Entrar</TabsTrigger>
          <TabsTrigger value="signup">Criar Conta</TabsTrigger>
        </TabsList>
         <TabsContent value="login">
          <SigninForm/>
        </TabsContent>
        <TabsContent value="signup">
          <SignupForm/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthPage;


