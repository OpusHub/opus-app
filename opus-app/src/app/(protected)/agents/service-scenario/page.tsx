import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/page-container";
import db from "@/db";
import { eq } from "drizzle-orm";
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
import { Edit, Plus } from "lucide-react";
import { InputSearch } from "@/components/input-search";
import { AddScenarioButton } from "./_components/add-scenario-btn";
import { supportScenariosTable } from "@/db/schema";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const ScenariosPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const scenarios = session?.user?.id
    ? await db.query.supportScenariosTable.findMany({
        where: eq(supportScenariosTable.userId, session.user.id),
      })
    : [];

  return (
    <PageContainer>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/agents">Agentes</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Cenários de Atendimento</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Cenários de Atendimento</PageTitle>
          <PageDescription>
            Configure o ideal do agente para situações específicas
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddScenarioButton
            label={"Adicionar Cenário"}
            icon={<Plus />}
            title={"Adicionar Cenário"}
          />
        </PageActions>
      </PageHeader>
      <PageContent>
        <InputSearch placeholder="Buscar" />

        <Table className="w-full">
          <TableCaption>Lista de cenários de atendimento.</TableCaption>
          <TableHeader className="w-full rounded">
            <TableRow>
              <TableHead className="text-muted-foreground">Situação</TableHead>

              <TableHead className="text-muted-foreground"></TableHead>
              <TableHead className="text-muted-foreground">
                Comportamento
              </TableHead>

              <TableHead className="text-muted-foreground"></TableHead>
              <TableHead className="text-muted-foreground">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scenarios.map((scenario) => (
              <TableRow key={scenario.id}>
                <TableCell className="max-w-[80px] overflow-hidden font-medium">
                  {scenario.title}
                </TableCell>
                <TableCell className="w-[30px] overflow-hidden font-medium"></TableCell>

                <TableCell className="max-w-[180px] overflow-hidden">
                  {scenario.instructions}
                </TableCell>
                <TableCell className="w-[30px] overflow-hidden font-medium"></TableCell>

                <TableCell>
                  <AddScenarioButton
                    scenario={scenario}
                    label={"Editar"}
                    icon={<Edit />}
                    title={"Editar Cenário"}
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

export default ScenariosPage;
