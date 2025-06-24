import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import CreateCompanyForm from "./components/new-company-form";
import { auth } from "@/lib/auth";
import { headers } from "next/dist/server/request/headers";
import { redirect } from "next/navigation";


const CompanyFormPage = async () => {

     const session = await auth.api.getSession({
        headers: await headers()
      });
    
    if (!session?.user) {
        return redirect('/auth');
    }

   return (
        <Dialog open >
      <form>
        <DialogContent className="sm:max-w-[425px] h-fit">
          <DialogHeader>
            <DialogTitle>Configurar Empresa</DialogTitle>
            <DialogDescription>
              Faça alterações na sua empresa aqui. Clique em salvar quando terminar.
            </DialogDescription>
          </DialogHeader>
          <CreateCompanyForm />
        </DialogContent>
      </form>
    </Dialog>
    
  )
}

export default CompanyFormPage;