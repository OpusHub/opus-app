"use client";


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
import { useState } from "react";
import { useForm } from "react-hook-form";
import z, { number } from "zod";
import { Button } from "@/components/ui/button";
import { Loader2,  TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { upsertAgent } from "@/actions/upsert-agent";
import { useAction } from "next-safe-action/hooks";
import { agentTable, customersTable, supportScenariosTable } from "@/db/schema";
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
import { upsertScenario } from "@/actions/upsert-scenario";
import { deleteScenario } from "@/actions/delete-scenario";

const formSchema = z.object({
    id: z.string().uuid().optional(),
  title: z
    .string()
    .min(5, {
      message: "Título do cenário tem que ter no mínimo 5 caracteres.",
    })
    .max(100, { message: "Limite de 100 caracteres atingido." }),
    instruction: z.string().nonempty({ message:  "Campo Obrigatório" }),
  
});

interface UpsertScenarioFormProps {
  scenario?: typeof supportScenariosTable.$inferSelect;
  onSuccess?: () => void;
}

const UpsertScenarioForm = ({
  title,
  onSuccess,
  scenario,
}: {
  title: string;
  onSuccess?: () => void;
  scenario?: typeof supportScenariosTable.$inferSelect;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
        id: scenario?.id || "",
      title: scenario?.title || "",
      instruction: scenario?.instructions || ""
    }});

  const [selectedStatus, setSelectedStatus] = useState(scenario?.enabled || "enabled");

  const upsertScenarioAction = useAction(upsertScenario, {
    onSuccess: () => {
      toast.success("Salvo com Sucesso");
      if (onSuccess) onSuccess();
    },
    onError: () => {
      toast.error("Erro ao salvar");
    },
  });

  const deleteScenarioAction = useAction(deleteScenario, {
    onSuccess: () => {
      toast.success("Deletado com Sucesso");
      if (onSuccess) onSuccess();
    },
    onError: () => {
      toast.error('Erro ao tentar deletar')
    }
  })

  const handleDeleteScenarioClick = () => {
    if (!scenario) {
      return;
    }
    deleteScenarioAction.execute({ id: scenario.id });
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    upsertScenarioAction.execute({
      ...values,
      id: scenario?.id,
      instructions: values.instruction,
      instructions_processed: "TESTE",
    });

    form.reset();
  }

  const statusAgentOptions = [
    { label: "Não Atender", value: "disable" },
    { label: "Atender", value: "enabled" },
    { label: "Em Atendimento Humano", value: "paused-human" },
  ];

  return (
    <DialogContent>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>
        {" "}
        {scenario ? "Edite os dados do cenário" : "Crie um novo cenário"}
      </DialogDescription>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titulo</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ex: Larissa" type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instruction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instrução</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Ex: Deve obter o email , apos obter o email, deve buscar os dados do pedido para encontrar o codigo de rastreio, caso o codigo de rastreio noa for encontrado entao notifique um humano, se for encontrado entao busque o status de entrega do pedio , se ja foi enviado entao notifique o cleinte com o codigo e explqie q nao pode ser cancelado, se nao foi enviado entao notifique o cliente que o pedido ainda nao foi enviado e que ele pode cancelar e voce ira direcionar para o humano"
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="flex  w-full items-center justify-between">
            {scenario && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant='destructive' className="cursor-pointer" >
                    <TrashIcon />
                    Deletar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Você tem certeza dessa ação ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Essa ação não tem retorno. Isso irá apagar permanentemente esse cenário.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-700 hover:bg-red-800" onClick={handleDeleteScenarioClick}>Deletar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            <Button
              type="submit"
              className="cursor-pointer"
              disabled={upsertScenarioAction.isPending}
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


}
export { UpsertScenarioForm };
