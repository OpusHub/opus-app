"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { agentTable } from "@/db/schema";
import { UpsertAgentForm } from "./upsert-agent-form";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateAgentStatus } from "@/actions/update-status-agent";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { Brain, Edit, Loader2 } from "lucide-react";
import Link from "next/link";
import { WhatsappLogo } from "@phosphor-icons/react";

interface AgentCardProps {
  agent: typeof agentTable.$inferSelect;
}

const AgentCard = ({ agent }: AgentCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [agentStatus, setAgentStatus] = useState(agent.status);

  const updateAgentStatusAction = useAction(updateAgentStatus, {
    onSuccess: (data) => {
      // Se a ação retornar os dados atualizados, você pode usá-los.
      // Ou simplesmente confiar que o estado já está correto.
      toast.success("Status atualizado com sucesso!");
      // Opcional: Se a sua action retorna o novo agente, você pode sincronizar aqui.
      // setAgentStatus(data.updatedAgent.status);
    },
    onError: (error) => {
      // AQUI ESTÁ A MÁGICA!
      // Se a atualização falhou, reverta o estado da UI para o valor original.
      setAgentStatus(agent.status);
      toast.error("Erro ao atualizar o status. Tente novamente.");
    },
  });

  const handleUpdateStatusAgent = (id: string, value: string) => {
    if (!agent) {
      return;
    }
    updateAgentStatusAction.execute({ id: id, status: value });
  };

  const agentInitials = agent.name
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <Card className="min-w-fit min-h-[320px] flex flex-col justify-between">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback>{agentInitials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h2 className="font-medium">{agent.name}</h2>
              <p className="text-muted-foreground text-sm">{agent.type}</p>
            </div>
          </div>
          {updateAgentStatusAction.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Select
              value={agent.status}
              disabled={updateAgentStatusAction.isPending}
              onValueChange={(value) => {
                handleUpdateStatusAgent(agent.id, value);
              }}
            >
              <SelectTrigger
                className={`w-fit ${
                  agent.status === "enabled"
                    ? "border-green-700 font-bold text-green-800 shadow-lg"
                    : "border-red-700 font-bold text-red-800"
                }`}
              >
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="enabled">Ligado</SelectItem>
                <SelectItem value="disabled">Desligado</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </CardHeader>
      <Separator></Separator>
      <CardContent>
        <h3 className="text-sm font-medium">Sobre</h3>
        <p className="text-muted-foreground text-sm">{agent.about}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full cursor-pointer">
              <Edit/>
              Editar</Button>
          </DialogTrigger>

          <UpsertAgentForm
            title="Editar Agente"
            agent={agent}
            onSuccess={() => setIsOpen(false)}
          ></UpsertAgentForm>
        </Dialog>
        <Link href="/agents/knowledge" className="w-full">
          <Button
            variant="outline"
            className="shadow-accent-foreground w-full cursor-pointer hover:bg-gray-700"
          >
            <Brain />
            Base de conhecimento
          </Button>
        </Link>
        <Link href="/agents/whatsapp-connect" className="w-full">
          <Button
            variant="outline"
            className="shadow-accent-foreground w-full cursor-pointer hover:bg-gray-700"
          >
            <WhatsappLogo size={24} />
            Conexão com Whatsapp
          </Button>
        </Link>
        <Button variant="outline" className="shadow-accent-foreground w-full cursor-pointer hover:bg-gray-700" onClick={() => {}}>
          
          Instruções de atendimento
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AgentCard;
