import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const loginForm = z.object({
  email: z.string().trim().min(1).email({message: "Email inválido"}),
  password: z.string().trim().min(6,  { message: "Senha deve ter pelo menos 6 caracteres"})
});


const SigninForm = () => {
  const  form = useForm<z.infer<typeof loginForm>>({
    resolver: zodResolver(loginForm),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  function onSubmit(data: z.infer<typeof loginForm>) {
    console.log("Form submitted with data:", data);
  }


    return (
        <Card>
            <CardHeader>
              <CardTitle>Criar Conta</CardTitle>
              <CardDescription>
                Olá, crie sua conta para acessar o Opus Hub!
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
               <Form {...form}>
              <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Nome
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Pedro" {...field} type="text" autoComplete="name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Senha
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field} type="password" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">Criar Conta</Button>
              </form>
            </Form >
            </CardContent>
          </Card>
    )
}

export default SigninForm;