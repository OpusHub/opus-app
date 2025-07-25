import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/page-container";
import { Button } from "@/components/ui/button";
import { AddCustomerButton } from "./_components/add-customer-btn";
import db from "@/db";
import { customersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import CustomerCard from "./_components/customer-card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Edit, Plus } from "lucide-react";
import { UpsertCustomerForm } from "./_components/upsert-client-form";
import { InputSearch } from "@/components/input-search";

const ClientsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const customers = session?.user?.id
    ? await db.query.customersTable.findMany({
        where: eq(customersTable.userId, session.user.id),
      })
    : [];

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Clientes</PageTitle>
          <PageDescription>Gerencie seus clientes</PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddCustomerButton
            label="Adicionar Cliente"
            icon={<Plus />}
            description="Adicione um novo cliente"
            title="Adicionar Cliente"
            variant="default"
          />
        </PageActions>
      </PageHeader>
      <PageContent>
        <InputSearch
          placeholder="Buscar Cliente"
        />

        <Table className="w-full">
          <TableCaption>Lista dos seus clientes.</TableCaption>
          <TableHeader className="bg-muted w-full rounded">
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Status IA</TableHead>
              <TableHead></TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>
                  {customer.status_ai === "disabled"
                    ? "Desativado"
                    : customer.status_ai === "paused-human"
                      ? "Em atendimetno humano"
                      : "Ativado"}
                </TableCell>
                <TableCell> </TableCell>
                <TableCell>
                  <AddCustomerButton
                    label="Editar"
                    icon={<Edit />}
                    customer={customer}
                    description="Edite as informações do cliente"
                    title="Editar Cliente"
                    variant="outline"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageContent>
    </PageContainer>
  );
};

export default ClientsPage;
