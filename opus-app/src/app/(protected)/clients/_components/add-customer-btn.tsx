"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { UpsertCustomerForm } from "./upsert-client-form";

const AddCustomerButton = () => {

const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
       <DialogTrigger asChild>
         <Button>
           <Plus />
           Adicionar Cliente
         </Button>
       </DialogTrigger>
       <UpsertCustomerForm title="Criar Cliente" description="Crie um novo cliente" onSuccess={() => setDialogIsOpen(false)}></UpsertCustomerForm>
    </Dialog>
  );    
};

export { AddCustomerButton };
