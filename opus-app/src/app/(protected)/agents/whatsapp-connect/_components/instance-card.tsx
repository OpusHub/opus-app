"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { instancesTable } from "@/db/schema";
import { useState } from "react";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { Edit, Wifi } from "lucide-react";
import { UpsertInstanceForm } from "./create-wpp-connect-form";
import { Badge } from "@/components/ui/badge";
import QrCodeRead from "./qr-code-read";
import { connectInstance } from "@/actions/instance-connect";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@radix-ui/react-alert-dialog";
import ConfirmDesconnectInstance from "./confirm-disconnect-instance";
import ConfirmDisconnectInstance from "./confirm-disconnect-instance";

interface InstanceCardProps {
  instance: typeof instancesTable.$inferSelect;
}

const InstanceCard = ({ instance }: InstanceCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenQrCodeDialog, setIsOpenQrCodeDialog] = useState(false);
  
  const [isDisconnectDialogOpen, setIsDisconnectDialogOpen] = useState(false);


  return (
    <Card className="flex w-[550px] justify-between">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <h2 className="font-medium">{instance.name}</h2>
              <p className="text-muted-foreground text-sm font-medium">
                {instance.number}
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-8">
            {instance.status == "close" ? (
              <Dialog
                open={isDisconnectDialogOpen}
                onOpenChange={setIsDisconnectDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    className="w-full cursor-pointer hover:bg-green-900"
                    variant="outline"
                  >
                    <Wifi />
                    Conectar
                  </Button>
                </DialogTrigger>

                <QrCodeRead instance_name={instance.name_id} id={instance.id} />
              </Dialog>
            ) : (
              <Dialog
                open={isOpenQrCodeDialog}
                onOpenChange={setIsOpenQrCodeDialog}
              >
                <DialogTrigger asChild>
                  <Button
                    className="w-full cursor-pointer hover:bg-red-900"
                    variant="outline"
                  >
                    
                    Desconectar
                  </Button>
                </DialogTrigger>

                <ConfirmDisconnectInstance instance_name={instance.name_id} id={instance.id} />
              </Dialog>
            )}
          </div>
        </div>
      </CardHeader>
      <Separator></Separator>
      <CardContent className="space-y-1">
        <div className="flex w-full justify-between">
          <p className="text-muted-foreground text-sm">Criado em:</p>
          <Badge variant="outline">
            {instance.createdAt.getDate()}/{instance.createdAt.getMonth()}/
            {instance.createdAt.getFullYear()} ás{" "}
            {instance.createdAt.toLocaleTimeString("pt-BR")}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full cursor-pointer" variant="outline">
              <Edit />
              Editar
            </Button>
          </DialogTrigger>

          <UpsertInstanceForm
            title="Editar Conexão"
            description="Edite os dados da conexão"
            instance={instance}
            onSuccess={() => setIsOpen(false)}
          ></UpsertInstanceForm>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default InstanceCard;
