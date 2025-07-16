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
import { faqTable, instancesTable } from "@/db/schema";
import { useState } from "react";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { Edit } from "lucide-react";
import { UpsertInstanceForm } from "./create-wpp-connect-form";
import { upsertInstance } from "@/actions/upsert-instance";
import { Badge } from "@/components/ui/badge";

interface InstanceCardProps {
  instance: typeof instancesTable.$inferSelect;
}

const InstanceCard = ({ instance }: InstanceCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateAgentStatusAction = useAction(upsertInstance, {
    onSuccess: (data) => {
      // Se a ação retornar os dados atualizados, você pode usá-los.
      // Ou simplesmente confiar que o estado já está correto.
      toast.success("Atualizado com sucesso!");
      // Opcional: Se a sua action retorna o novo agente, você pode sincronizar aqui.
      // setAgentStatus(data.updatedAgent.status);
    },
    onError: (error) => {
      toast.error("Erro ao atualizar. Tente novamente.");
    },
  });

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
              <Button className="w-[180px]">Conectar</Button>
            ) : (
              <Button variant="destructive" className="w-[180px]">
                Desconectar
              </Button>
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
