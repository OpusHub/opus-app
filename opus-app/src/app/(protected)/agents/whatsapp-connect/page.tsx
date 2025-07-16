import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/page-container";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { AddWppButton } from "./_components/add-wpp-button";


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
                <BreadcrumbPage>Conexão com Whatsapp</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <PageTitle>Conexão com Whatsapp</PageTitle>
          <PageDescription>Gerencie a conexão de seu agente a um whatsapp</PageDescription>
        </PageHeaderContent>
        <PageActions>
         <AddWppButton></AddWppButton>
        </PageActions>
      </PageHeader>
      <PageContent>
        Conexões
      </PageContent>
    </PageContainer>
  );
};


export default FaqAgentPage;
