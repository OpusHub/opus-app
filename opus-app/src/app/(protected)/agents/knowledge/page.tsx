import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/page-container";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { AddFaqButton } from "./_components/add-faq-button";
import FaqCard from "./_components/faq-card";
import db from "@/db";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { faqTable } from "@/db/schema";
import { headers } from "next/headers";
import { Input } from "@/components/ui/input";
import { InputSearch } from "@/components/input-search";

const FaqAgentPage = async () => {

const session = await auth.api.getSession({
    headers : await headers(),
  })
  
  const faqs = session?.user?.id
    ? await db.query.faqTable.findMany({
where: eq(faqTable.userId, session.user.id)      })
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
                <BreadcrumbPage>Base de conhecimento</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <PageTitle>Base de conhecimento</PageTitle>
          <PageDescription>Gerencie a base de conhecimento do seu agente</PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddFaqButton />
        </PageActions>
      </PageHeader>
      <PageContent>
        <InputSearch placeholder="Buscar FAQ" />
        <div className="grid grid-cols-1 space-y-6">
          {faqs.map(faq => <FaqCard key={faq.id} faq={faq}></FaqCard>)}
        </div>
      </PageContent>
    </PageContainer>
  );
};


export default FaqAgentPage;
