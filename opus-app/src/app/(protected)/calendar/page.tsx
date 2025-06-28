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

const CalendarPage = () => {
    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Agenda</PageTitle>
                    <PageDescription>
                        Gerencie seus agendamentos
                    </PageDescription>
                </PageHeaderContent>
                <PageActions>
                    <Button>Adicionar Agendamento</Button>
                </PageActions>
            </PageHeader>
            <PageContent>
                Eventos
            </PageContent>
        </PageContainer>
    );
}

export default CalendarPage;