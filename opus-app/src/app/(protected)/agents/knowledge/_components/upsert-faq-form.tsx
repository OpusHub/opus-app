"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Loader2,  TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { upsertFaq } from "@/actions/upsert-faq";
import { useAction } from "next-safe-action/hooks";
import { faqTable } from "@/db/schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteAgent } from "@/actions/delete-agent";

const formSchema = z.object({
  question: z
    .string()
    .max(100, { message: "Limite de 100 caracteres atingido." }).nonempty({ message: "Campo obrigatório." }),
  answer: z
    .string()
    .max(100, { message: "Limite de 100 caracteres atingido." })
    .nonempty({ message: "Campo obrigatório." }),
  userId: z
    .string().uuid().optional()
});

interface UpsertFaqFormProps {
  faq?: typeof faqTable.$inferSelect;
  onSuccess?: () => void;
}

const UpsertFaqForm = ({
  title,
  onSuccess,
  faq,
}: {
  title: string;
  onSuccess?: () => void;
  faq?: typeof faqTable.$inferSelect;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: faq?.question || "",
      answer: faq?.answer || ""
    },
  });

  const upsertFaqAction = useAction(upsertFaq, {
    onSuccess: () => {
      toast.success("Salvo com Sucesso");
      if (onSuccess) onSuccess();
    },
    onError: () => {
      toast.error("Erro ao salvar");
    },
  });

   const deleteAgentAction = useAction(deleteAgent, {
     onSuccess: () => {
       toast.success("Deletado com Sucesso");
       if (onSuccess) onSuccess();
     },
     onError: () => {
       toast.error('Erro ao tentar deletar')
     }
   })

   const handleDeleteAgentClick = () => {
     if (!faq) {
       return;
     }
     deleteAgentAction.execute({ id: faq.id});
   }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    upsertFaqAction.execute({
      ...values,
      id: faq?.id,
    });

    form.reset();
  }

  return (
    <DialogContent>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>
        {" "}
        {faq ? "Edite a pergunta" : "Crie uma nova pergunta para a base de conhecimento do agente"}
      </DialogDescription>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pergunta</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ex: Qual o endereço?" type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Resposta
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Ex: Av das Nações 2856, Ap 05 - Santo André..."
                    className="max-h-32"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="flex  w-full items-center justify-between">
            {faq && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="cursor-pointer bg-background border  hover:bg-red-800" >
                  <TrashIcon></TrashIcon>
                    Deletar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Você tem certeza dessa ação ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Essa ação não tem retorno. Isso irá apagar permanentemente os dados desse agente.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-700 hover:bg-red-800" onClick={handleDeleteAgentClick}>Deletar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            <Button
              type="submit"
              className="cursor-pointer"
              disabled={upsertFaqAction.isPending}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Salvar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
export { UpsertFaqForm };
