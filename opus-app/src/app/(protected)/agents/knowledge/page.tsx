import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/page-container";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { AddFaqButton } from "./_components/add-faq-button";

const FaqAgentPage = () => {
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
        Faq
      </PageContent>
    </PageContainer>
  );
};


export default FaqAgentPage;
