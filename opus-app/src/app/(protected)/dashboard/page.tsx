import { PageContainer, PageHeader, PageHeaderContent, PageTitle, PageDescription, PageActions, PageContent } from "@/components/page-container";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "./_components/date-picker";

const DashboardPage = async () => {


  




  return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Dashboard</PageTitle>
                    <PageDescription>
                        Tenha uma visão geral do desempenho do seu negócio, visualize métricas importantes e acesse informações relevantes de forma rápida e fácil.
                    </PageDescription>
                </PageHeaderContent>
                <PageActions>
                    <DateRangePicker label="Filtre por data" />
                </PageActions>
            </PageHeader>
            <PageContent>
                Eventos
            </PageContent>
        </PageContainer>
    );
};

export default DashboardPage;
