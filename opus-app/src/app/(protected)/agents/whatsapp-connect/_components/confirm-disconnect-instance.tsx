import { checkInstanceConnect } from "@/actions/check-instance-connection";
import { disconnecInstance } from "@/actions/disconnect-instance";
import { connectInstance } from "@/actions/instance-connect";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Loader, Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

const ConfirmDisconnectInstance = ({
  instance_name,
  id,
}: {
  instance_name: string;
  id: string;
}) => {


  const desconnectInstanceAction = useAction(disconnecInstance, { 
    onSuccess: () => {
      toast.success("Instância desconectada");
    },
    onError: () => {
      toast.error("Erro ao desconectar, tente novamente!");
    },
  })

  const handleDisconnectInstanceClick = () => { 
    desconnectInstanceAction.execute({name_id: instance_name, id: id})
  }
  
  return (
    <DialogContent className="flex flex-col justify-between">
      <DialogHeader>
        <DialogTitle>Tem certeza dessa ação?</DialogTitle>
        <DialogDescription>
          Essa ação irá desconectar o Whatsapp. Seu agente não irá mais poder responder as mensagens.
        </DialogDescription>
      </DialogHeader>
      
      <DialogFooter>
         
        <Button className="w-full cursor-pointer" variant="destructive" onClick={handleDisconnectInstanceClick}>
        Desconectar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default ConfirmDisconnectInstance;
