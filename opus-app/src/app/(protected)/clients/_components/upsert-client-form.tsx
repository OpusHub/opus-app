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
import { useState } from "react";
import { useForm } from "react-hook-form";
import z, { number } from "zod";
import { Button } from "@/components/ui/button";
import { Loader2,  TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { upsertAgent } from "@/actions/upsert-agent";
import { useAction } from "next-safe-action/hooks";
import { agentTable, customersTable } from "@/db/schema";
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
import { upsertCustomer } from "@/actions/upsert-customer";
import { deleteCustomer } from "@/actions/delete-customer";

const formSchema = z.object({
    id: z.string().uuid().optional(),
  name: z
    .string()
    .min(2, {
      message: "Nome do seu cliente tem que ter no mínimo 2 caracteres.",
    })
    .max(100, { message: "Limite de 100 caracteres atingido." }),
    phone: z.string().max(18 , { message:  "Limite de caracteres atingido" }).nonempty({ message:  "Campo Obrigatório" }),
    email: z.string().optional(),
    status_ai: z.string().nonempty({ message:  "Campo Obrigatório" })
});

interface UpsertCustomerFormProps {
  customer?: typeof customersTable.$inferSelect;
  onSuccess?: () => void;
}

const UpsertCustomerForm = ({
  title,
  description,
  onSuccess,
  customer,
}: {
  title: string;
  description: string;
  onSuccess?: () => void;
  customer?: typeof customersTable.$inferSelect;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
        id: customer?.id || "",
      name: customer?.name || "",
      phone: customer?.phone || "",
      email: customer?.email || "",
      status_ai : customer?.status_ai || ""
    }});

  const [selectedStatus, setSelectedStatus] = useState(customer?.status_ai);

  const upsertCustomerAction = useAction(upsertCustomer, {
    onSuccess: () => {
      toast.success("Salvo com Sucesso");
      if (onSuccess) onSuccess();
    },
    onError: () => {
      toast.error("Erro ao salvar");
    },
  });

  const deleteCustomerAction = useAction(deleteCustomer, {
    onSuccess: () => {
      toast.success("Deletado com Sucesso");
      if (onSuccess) onSuccess();
    },
    onError: () => {
      toast.error('Erro ao tentar deletar')
    }
  })

  const handleDeleteCustomerClick = () => {
    if (!customer) {
      return;
    }
    deleteCustomerAction.execute({ id: customer.id });
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    upsertCustomerAction.execute({
      ...values,
      id: customer?.id,
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
        {customer ? "Edite os dados do cliente" : "Crie um novo cliente"}
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
                  <Input {...field} placeholder="Ex: Larissa" type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
           control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                <FormLabel>
                  Whatsapp
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
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  E-mail
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ex: lari@gmail.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status_ai"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status da IA</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedStatus(value);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Defina um status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusAgentOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="flex  w-full items-center justify-between">
            {customer && (
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
                      Essa ação não tem retorno. Isso irá apagar permanentemente os dados desse agente.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-700 hover:bg-red-800" onClick={handleDeleteCustomerClick}>Deletar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            <Button
              type="submit"
              className="cursor-pointer"
              disabled={upsertCustomerAction.isPending}
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
export { UpsertCustomerForm };
