"use client";

import { createCompany } from "@/actions/create-company";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { z } from "zod";

const companyFormSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório" }),
  industry: z.string().trim().min(1, { message: "Indústria é obrigatória" }),
  address: z.string().trim().min(1, { message: "Endereço é obrigatório" }),
  phone: z.string().trim().min(1, { message: "Telefone é obrigatório" }),
  website: z.string().trim().optional(),
  instagram: z.string().trim().optional(),
  linkedin: z.string().trim().optional(),
  logo: z.string().trim().optional()
});

const CreateCompanyForm = () => {
  const form = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: "",
      industry: "",
      address: "",
      phone: "",
      website: "",
      instagram: "",
      linkedin: "",
      logo: "",
    },
  });

  async function onSubmit(values: z.infer<typeof companyFormSchema>) {
    try {
      const data = new FormData();
      data.append("name", values.name);
      data.append("industry", values.industry);
      data.append("address", values.address);
      data.append("phone", values.phone);
      data.append("website", values.website ?? "");
      data.append("instagram", values.instagram ?? "");
      data.append("linkedin", values.linkedin ?? "");
      data.append("logo", values.logo ?? "");
      // If you have a description field, add it here as well
      // data.append("description", values.description ?? "");

      await createCompany(
        data
      );
      
      
    } catch (error) {
      

      if (isRedirectError(error)) {
        return;
      }

      toast.error("Erro ao criar empresa. Por favor, tente novamente.: ");

    }
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Opus Hub" {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Indústria</FormLabel>
              <FormControl>
                <Input placeholder="Tecnologia" {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input placeholder="Rua Exemplo, 123" {...field} type="text" />
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
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                <Input
                  placeholder="(99) 99999-9999"
                  {...field}
                  type="text"
                  maxLength={15}
                  onChange={e => {
                  // Remove all non-digit characters
                  let value = e.target.value.replace(/\D/g, "");
                  // Apply mask
                  if (value.length > 11) value = value.slice(0, 11);
                  if (value.length > 10) {
                    // (00) 0 0000-0000
                    value = value.replace(/^(\d{2})(\d{1})(\d{4})(\d{4}).*/, "($1) $2 $3-$4");
                  } else if (value.length > 6) {
                    // (00) 0000-0000
                    value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
                  } else if (value.length > 2) {
                    value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
                  } else {
                    value = value.replace(/^(\d{0,2})/, "($1");
                  }
                  field.onChange(value);
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
              name="website"
              render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.exemplo.com"
                  {...field}
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram</FormLabel>
              <FormControl>
                <Input placeholder="@opusbr" {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Linkedin</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.linkedin.com/in/opusbr"
                  {...field}
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {form.formState.isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Criar"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateCompanyForm;
