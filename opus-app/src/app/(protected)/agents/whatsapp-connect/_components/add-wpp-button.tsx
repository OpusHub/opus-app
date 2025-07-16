"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { UpsertInstanceForm } from "./create-wpp-connect-form";

const AddWppButton = () => {
  
const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
       <DialogTrigger asChild>
         <Button>
           <Plus />
           Criar Conexão
         </Button>
       </DialogTrigger>
       <UpsertInstanceForm title="Criar conexão" description="Crie uma nova conexão com o whatsapp" onSuccess={() => setDialogIsOpen(false)}></UpsertInstanceForm>
    </Dialog>
  );    
};

export { AddWppButton };
