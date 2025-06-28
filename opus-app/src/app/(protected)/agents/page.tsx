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

const AgentsPage = () => {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Agentes</PageTitle>
          <PageDescription>
            Gerencie seus agentes de atendimento
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <Button>Adicionar Agente</Button>
        </PageActions>
      </PageHeader>
      <PageContent>
        Agentes
      </PageContent>
    </PageContainer>
  );
};

export default AgentsPage;

export const metadata = {
  title: "Agentes",
  description: "Gerencie seus agentes de atendimento",
};
