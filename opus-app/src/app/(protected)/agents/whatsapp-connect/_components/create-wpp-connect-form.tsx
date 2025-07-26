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
import { instancesTable } from "@/db/schema";
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
import { upsertInstance } from "@/actions/upsert-instance";
import { deleteInstance } from "@/actions/delete-instance";

const formSchema = z.object({
  name: z
    .string()
    .max(20, { message: "Limite de 20 caracteres atingido." }).nonempty({ message: "Campo obrigatório." }),
  number: z.string().max(18, { message : "Máximo de caracteres atingido"}).nonempty({message : "Campo obrigatório"}),
  userId: z
    .string().uuid().optional()
});

interface UpsertInstanceFormProps {
  instance?: typeof instancesTable.$inferSelect;
  onSuccess?: () => void;
}

const UpsertInstanceForm = ({
  title,
  description,
  onSuccess,
  instance,
}: {
  title: string;
  description: string;
  onSuccess?: () => void;
  instance?: typeof instancesTable.$inferSelect;
}) => {


  const form = useForm<z.infer<typeof formSchema>>({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: instance?.name || "",
      number: instance?.number || ""
    },
  });

  const upsertInstanceAction = useAction(upsertInstance, {
    onSuccess: () => {
      toast.success("Salvo com Sucesso");
      if (onSuccess) onSuccess();
    },
    onError: () => {
      toast.error("Erro ao salvar");
    },
  });

   const deleteInstanceAction = useAction(deleteInstance, {
     onSuccess: () => {
       toast.success("Deletado com Sucesso");
       if (onSuccess) onSuccess();
     },
     onError: () => {
       toast.error('Erro ao tentar deletar')
     }
   })

   const handleDeleteFaqClick = () => {
     if (!instance) {
       return;
     }
     deleteInstanceAction.execute({ id: instance.id});
   }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    upsertInstanceAction.execute({
      ...values,
      id: instance?.id,
      status: "close",
      name_id: values.name + '_' + values.userId,
      token: " "
    });

    form.reset();
  }

  return (
    <DialogContent>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>
        {description}
      </DialogDescription>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ex: Wpp suporte" type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

              <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                <FormLabel>
                  Número
                </FormLabel>
                <FormControl>
                  <Input
                  {...field}
                  placeholder="Ex: (11) 9 9796-4191"
                  type="text"
                  onChange={e => {
                    const raw = e.target.value.replace(/\D/g, "");
                    let formatted = "";
                    if (raw.length <= 2) {
                    formatted = raw;
                    } else if (raw.length <= 7) {
                    formatted = `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
                    } else if (raw.length === 11) {
                    // (11) 9 9796-4191
                    formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 3)} ${raw.slice(3, 7)}-${raw.slice(7, 11)}`;
                    } else if (raw.length === 10 || raw.length === 12) {
                    // (11) 9796-4191
                    formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 6)}-${raw.slice(6, 10)}`;
                    } else if (raw.length > 11) {
                    formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 3)} ${raw.slice(3, 7)}-${raw.slice(7, 11)}`;
                    } else {
                    formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 3)} ${raw.slice(3, 7)}-${raw.slice(7, 11)}`;
                    }
                    field.onChange(formatted);
                  }}
                  value={field.value}
                  />
                </FormControl>
                <FormMessage />
                </FormItem>
              )}
              />
          <DialogFooter className="flex  w-full items-center justify-between">
            {instance && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="cursor-pointer" variant='destructive' >
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
                      Essa ação não tem retorno. Isso irá apagar permanentemente a conexão.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-700 hover:bg-red-800" onClick={handleDeleteFaqClick}>Deletar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            <Button
              type="submit"
              className="cursor-pointer"
              disabled={upsertInstanceAction.isPending}
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
export { UpsertInstanceForm };
