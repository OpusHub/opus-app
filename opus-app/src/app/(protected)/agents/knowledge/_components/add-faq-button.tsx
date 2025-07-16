"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { UpsertFaqForm } from "./upsert-faq-form";

const AddFaqButton = () => {
  
const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
       <DialogTrigger asChild>
         <Button>
           <Plus />
           Adicionar FAQ
         </Button>
       </DialogTrigger>
       <UpsertFaqForm title="Criar FAQ" onSuccess={()=> setDialogIsOpen(false)}></UpsertFaqForm>
    </Dialog>
  );    
};

export { AddFaqButton };
