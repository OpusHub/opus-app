import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/page-container";

const SettingsPage = () => {
    return ( 
        <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Configurações</PageTitle>
          <PageDescription>
            Gerencie suas configurações
          </PageDescription>
        </PageHeaderContent>
      </PageHeader>
      <PageContent>
        Configurações
      </PageContent>
    </PageContainer>
    )
};

export default SettingsPage;
