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
import {  CalendarCog } from "lucide-react";
import Link from "next/link";

const SettingsPage = () => {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Configurações</PageTitle>
          <PageDescription>Gerencie suas configurações</PageDescription>
        </PageHeaderContent>
      </PageHeader>
      <PageContent>
        <Link href="/settings/schedule-role">
        
          <Button variant="outline">
            <CalendarCog/>
            Regras pra agendar</Button>
        </Link>
      </PageContent>
    </PageContainer>
  );
};

export default SettingsPage;
