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

const ClientsPage = () => {
    return ( 
        <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Clientes</PageTitle>
          <PageDescription>
            Gerencie seus clientes
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <Button>Adicionar Cliente</Button>
        </PageActions>
      </PageHeader>
      <PageContent>
        Clientes
      </PageContent>
    </PageContainer>
    )
};

export default ClientsPage;
