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
import {AddAgentButton} from "./_components/add-agent-button";

const AgentsPage = () => {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Meu Agente</PageTitle>
          <PageDescription>
            Gerencie seu agente de atendimento
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
            <AddAgentButton />
        </PageActions>
      </PageHeader>
      <PageContent>
        Agente
      </PageContent>
    </PageContainer>
  );
};

export default AgentsPage;

export const metadata = {
  title: "Agentes",
  description: "Gerencie seus agentes de atendimento",
};
