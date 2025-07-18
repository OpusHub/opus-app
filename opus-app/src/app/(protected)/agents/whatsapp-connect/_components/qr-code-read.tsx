import { checkInstanceConnect } from "@/actions/check-instance-connection";
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

const QrCodeRead = ({
  instance_name,
  id,
}: {
  instance_name: string;
  id: string;
}) => {
  const [isGenerateState, setIsGenerateState] = useState(false);

  const connectInstanceAction = useAction(connectInstance, {
    onSuccess: () => {
      toast.success("QR Code gerado com Sucesso");
    },
    onError: () => {
      toast.error("Erro ao gerar QR Code");
    },
  });

  const handleGenerateQRcode = () => {
    setIsGenerateState(true)
    connectInstanceAction.execute({ name_id: instance_name });
    setIsGenerateState(false)
  };

  const checkConnectinInstanceAction = useAction(checkInstanceConnect, { 
    onSuccess: () => {
      toast.success("Instância conectada");
    },
    onError: () => {
      toast.error("Erro ao conectar, gere outro QR Code!");
    },
  })

  const handleCheckInstanceConnectionClick = () => { 
    checkConnectinInstanceAction.execute({name_id: instance_name, id: id})
  }
  
  return (
    <DialogContent className="flex min-h-[600px] min-w-[700px] flex-col justify-between">
      <DialogHeader>
        <DialogTitle>Conectar Whatsapp</DialogTitle>
        <DialogDescription>
          Leia o QR Code abaixo para realizar a conexão{" "}
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col w-full items-center justify-center gap-4">
        {
          connectInstanceAction.result?.data?.qrcode ? 
           <img src={connectInstanceAction.result?.data?.qrcode} alt="QR Code" className="max-w-xs" />: 
           <Button
          onClick={handleGenerateQRcode}
          className="cursor-pointer bg-white text-black hover:text-white w-full"
        >
          {
            isGenerateState == true ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                ) : ( "Gerar Qr Code")
          }
          
        </Button> 

        }
        
        
      </div>
      <DialogFooter>
        <Button className="w-full" variant="secondary" onClick={handleCheckInstanceConnectionClick}>
          Testar Conexão
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default QrCodeRead;
