'use client'

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
interface AgentCardProps {
  agent: typeof agentTable.$inferSelect;
}

const AgentCard = ({ agent }: AgentCardProps) => {  
    const [isOpen, setIsOpen] = useState(false)

  const agentInitials = agent.name
    .split(" ")
    .map((name) => name[0])
    .join("");
  return (
    <Card className="max-w-[350px]">
      <CardHeader>
        <div className="items-center flex justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarFallback>{agentInitials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <h2 className="font-medium">{agent.name}</h2>
            <p className="text-muted-foreground text-sm">{agent.type}</p>
            </div>
          </div>
          <Badge
            variant={agent.status === "disabled" ? "destructive" : "outline"}
          >
            {agent.status === 'disabled' ? 'Desligado' : "Ligado"}
          </Badge>
        </div>

        
      </CardHeader>
      <Separator></Separator>
      <CardContent>
        <h3 className="text-sm font-medium">Sobre</h3>
        <p className="text-muted-foreground text-sm">{agent.about}</p>
      </CardContent>
      <CardFooter>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">Ver Detalhes</Button>
          </DialogTrigger>

          <UpsertAgentForm title="Editar Agente" agent={agent} onSuccess={() => setIsOpen(false)}></UpsertAgentForm>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default AgentCard;
