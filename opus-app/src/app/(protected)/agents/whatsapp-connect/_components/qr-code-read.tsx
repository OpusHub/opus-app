import { connectInstance } from "@/actions/instance-connect";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

const QrCodeRead = ({ instance_name, id }: { instance_name: string, id: string }) => {
  const [isGenerateState, setIsGenerateState] = useState(true);
  const [qrCode, setQrCode] = useState('');

  const connectInstanceAction = useAction(connectInstance, {
       onSuccess: () => {
         toast.success("QR Code gerado com Sucesso");
         
       },
       onError: () => {
         toast.error('Erro ao tentar conectar')
       }
     })


  const handleGenerateQRcode = () => {
    console.log("gerando...");
    connectInstanceAction.execute({ name_id: instance_name });
    setQrCode(connectInstanceAction.result?.data?.qrcode
);

  };

  return (
    <DialogContent className="flex min-h-[600px] min-w-[700px] flex-col justify-between">
      <DialogHeader>
        <DialogTitle>Conectar Whatsapp</DialogTitle>
        <DialogDescription>
          Leia o QR Code abaixo para realizar a conexão{" "}
        </DialogDescription>
      </DialogHeader>
    <div className="w-full flex justify-center items-center">
        
        {
            qrCode ? <img src={qrCode} alt="QR Code" className="max-w-xs" /> : <Button onClick={handleGenerateQRcode} className="cursor-pointer bg-white text-black hover:text-white" >Gerar Qr Code</Button>
        }
    </div>
      <DialogFooter>
        <Button className="w-full" variant="secondary">
          Testar Conexão
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default QrCodeRead;
