"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { UpsertAgentForm } from "./upsert-agent-form";

const AddAgentButton = () => {
  return (
    <Dialog>
       <DialogTrigger asChild>
         <Button>
           <Plus />
           Adicionar Agente
         </Button>
       </DialogTrigger>
       <UpsertAgentForm title="Criar Agente"/>
    </Dialog>
  );
};

export { AddAgentButton };
