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
import db from "@/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { agentTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import AgentCard from "./_components/agent-card";

const AgentsPage = async () => {

    const session = await auth.api.getSession({
    headers : await headers(),
  })
  
  const agents = session?.user?.id
    ? await db.query.agentTable.findMany({
where: eq(agentTable.userId, session.user.id)      })
    : [];


  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Meu Agentes</PageTitle>
          <PageDescription>
            Gerencie seu agentes
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
            <AddAgentButton />
        </PageActions>
      </PageHeader>
      <PageContent>
        <div className="grid grid-cols-3 gap-6">
          {agents.map(agent => <AgentCard key={agent.id} agent={agent}></AgentCard>)}
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default AgentsPage;

export const metadata = {
  title: "Agentes",
  description: "Gerencie seus agentes de atendimento",
};
