import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { authClient } from "@/lib/auth-client"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const resgisterSchema = z.object({
  name: z.string().trim().min(1, {message: "Nome é obrigatório"}),
  email: z.string().trim().min(1).email({message: "Email inválido"}),
  password: z.string().trim().min(6,  { message: "Senha deve ter pelo menos 6 caracteres"}),
  confirmPassword: z.string().trim().min(6, {message : "Confirmação de senha é obrigatória"}),
});


const SignupForm = () => {
    const router = useRouter()
 
  const  form = useForm<z.infer<typeof resgisterSchema>>({
    resolver: zodResolver(resgisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof resgisterSchema>) {
    if (data.password !== data.confirmPassword) {
        form.setError("confirmPassword", {
            type: "manual",
            message: "As senhas não coincidem",
        });
        return;
    }

    await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        callbackURL: '/dashboard',
    } , {
        onSuccess: () => {
            form.reset();
            router.push('/dashboard');
        },
        onError: (error) => {
           if (error.error.status === 422) 
            {
              toast.error("Já existe uma conta com esse email");
            }
            else {
                toast.error("Erro ao criar conta, tente novamente mais tarde");
            }
        }
    })

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
                  name="name"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="pedro@gmail.com" {...field} type="email" autoComplete="email"
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Confirmar Senha
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

                <Button
                type="submit"
                className="w-full"
                disabled={!form.formState.isValid || form.formState.isSubmitting}
                >
                { form.formState.isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                ) : ( "Criar Conta")}
                </Button>
              </form>
            </Form >
            </CardContent>
          </Card>
    )
}

export default SignupForm;