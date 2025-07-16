"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { UpsertAgentForm } from "./upsert-agent-form";
import { useState } from "react";

const AddAgentButton = () => {
  
const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
       <DialogTrigger asChild>
         <Button>
           <Plus />
           Adicionar Agente
         </Button>
       </DialogTrigger>
       <UpsertAgentForm title="Criar Agente" onSuccess={() => setDialogIsOpen(false)}/>
    </Dialog>
  );
};

export { AddAgentButton };
