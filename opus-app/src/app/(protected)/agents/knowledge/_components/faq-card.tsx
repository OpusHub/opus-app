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
import { faqTable } from "@/db/schema";
import { useState } from "react";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { Edit} from "lucide-react";
import { upsertFaq } from "@/actions/upsert-faq";
import { UpsertFaqForm } from "./upsert-faq-form";

interface FaqCardProps {
  faq: typeof faqTable.$inferSelect;
}

const FaqCard = ({ faq }: FaqCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateAgentStatusAction = useAction(upsertFaq, {
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
    <Card className="w-full max-h-[200px] h-[200px] flex justify-between">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <h2 className="font-medium">{faq.question}</h2>
              <p className="text-sm text-muted-foreground font-medium">{faq.answer}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="flex flex-col gap-4">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full cursor-pointer" variant="outline">
              <Edit/>
              Editar</Button>
          </DialogTrigger>

          <UpsertFaqForm
            title="Editar FAQ"
            faq={faq}
            onSuccess={() => setIsOpen(false)}
          ></UpsertFaqForm>
        </Dialog>
       
        
        
      </CardFooter>
    </Card>
  );
};

export default FaqCard;
