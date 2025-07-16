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
import z from "zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { upsertAgent } from "@/actions/create-company/upsert-agent";
import { useAction } from 'next-safe-action/hooks'

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nome do seu agente tem que ter no mínimo 2 caracteres." })
    .max(100, { message: "Limite de 100 caracteres atingido." }),
  tom: z
    .string()
    .max(100, { message: "Limite de 100 caracteres atingido." })
    .nonempty({ message: "Campo obrigatório." }),
  about: z
    .string()
    .max(1000, { message: "Limite de 1.000 caracteres atingido." })
    .nonempty({ message: "Campo obrigatório." }),
  type: z.enum([
    "SDR",
    "Suporte",
    "Vendas",
    "Marketing",
    "Financeiro",
    "RH",
  ], { 
    required_error: "Tipo do agente é obrigatório." 
  }),
  question_alvo: z
    .string()
    .max(500, { message: "Limite de 500 caracteres atingido." })
    .optional(),
  qualification_roles: z
    .string()
    .max(500, { message: "Limite de 500 caracteres atingido." })
    .optional(),
});

interface UpsertAgentFormProps { 
  onSuccess?: () => void;
}

const UpsertAgentForm = ({ title, onSuccess }: { title: string, onSuccess?: () => void }) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      tom: "",
      about: "",
      type: undefined,
      question_alvo: "",
      qualification_roles: "",
    },
  });
  const typesAgentOptions = [
    "SDR",
    "Suporte",
    "Vendas",
    "Marketing",
    "Financeiro",
    "RH",
  ];

  const [selectedType, setSelectedType] = useState<string>("SDR");

  const upsertAgentAction = useAction(upsertAgent, {
    onSuccess: () => {
      toast.success("Agente Criado com Sucesso")
      if (onSuccess) onSuccess();
    },
    onError: () => {
      toast.error('Erro ao criar agente')
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    upsertAgentAction.execute({
      ...values
    });
    // Handle form submission logic here
    console.log("Form submitted with values:", values);
    form.reset()
  }

  return (
    <DialogContent>
      <DialogTitle>{title}</DialogTitle>
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
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Fale um pouco sobre o contexto que o agente vai atuar
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Ex: Você trabalha para a Opus Hub, uma empresa de consultoria de IA..."
                    className="max-h-32"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Como voce gostaria que o agente se comportasse?
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Ex: Seja amigável e prestativo."
                    className="max-h-32"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>              
              )}
              />

              <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                <FormLabel>Tipo do agente</FormLabel>
                <FormControl>
                  <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedType(value);
                  }}
                  >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Tipo do agente" />
                  </SelectTrigger>
                  <SelectContent>
                    {typesAgentOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                    ))}
                  </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
                </FormItem>
              )}
              />

          {
            selectedType == 'SDR' ? (
              <>
                <FormField
                  control={form.control}
                  name="question_alvo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Perguntas Alvo</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Ex: Qual o faturamento mensal"
                          className="max-h-32"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="qualification_roles"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Critério de Qualificação</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Ex: Lead deve ter um faturamento mensal maior que 50k "
                          className="max-h-32"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : <></>
          }
          <DialogFooter className="w-full flex items-center justify-end">
            <Button type="submit" className="w-full" disabled={upsertAgentAction.isPending}>
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
export { UpsertAgentForm };
