import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/page-container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AddWppButton } from "./_components/add-wpp-button";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import db from "@/db";
import { eq } from "drizzle-orm";
import { instancesTable } from "@/db/schema";
import InstanceCard from "./_components/instance-card";

const FaqAgentPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const instances = session?.user?.id
    ? await db.query.instancesTable.findMany({
        where: eq(instancesTable.userId, session.user.id),
      })
    : [];


  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/agents">Agentes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Conexão com Whatsapp</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <PageTitle>Conexão com Whatsapp</PageTitle>
          <PageDescription>
            Gerencie a conexão de seu agente a um whatsapp
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddWppButton></AddWppButton>
        </PageActions>
      </PageHeader>
      <PageContent>
         <div className="grid grid-cols-1 space-y-6">
                  {instances.map(instance => <InstanceCard key={instance.id} instance={instance}></InstanceCard>)}
                </div>
      </PageContent>
    </PageContainer>
  );
};

export default FaqAgentPage;
