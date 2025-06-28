"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2).max(100),
  tom: z.string().max(100).optional(),
  about: z.string().max(1000).optional(),
  type: z.enum(["SDR", "Suporte"]),
  question_alvo: z.string().max(500).optional(),
  qualification_roles: z.string().max(500).optional(),
});

const UpsertAgentForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      tom: "",
      about: "",
      type: "SDR",
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle form submission logic here
    console.log("Form submitted with values:", values);
  }

  return (
    <DialogContent>
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
            name="tom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tipo do agente
                </FormLabel>
                <FormControl>
                  <Select  > 
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tipo do agente" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                          typesAgentOptions.map((option) => (
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


          <FormField
            control={form.control}
            name="question_alvo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                    Perguntas Alvo
                </FormLabel>
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
                <FormLabel>
                  Critério de Qualificação
                </FormLabel>
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
        <Button>Criar</Button>
        </form>

      </Form>
    </DialogContent>
  );
};
export { UpsertAgentForm };
