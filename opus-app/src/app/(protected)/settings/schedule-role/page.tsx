import {
  PageContainer,
  PageHeader,
  PageHeaderContent,
  PageTitle,
  PageDescription,
  PageContent,
} from "@/components/page-container";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, ArrowLeft, Link } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ScheduleRolePage = () => {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/settings">Configurações</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Regras pra agendar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <PageTitle>Regras para agendar</PageTitle>
          <PageDescription>Gerencie suas configurações</PageDescription>
        </PageHeaderContent>
      </PageHeader>
      <PageContent>Sua regra</PageContent>
    </PageContainer>
  );
};

export default ScheduleRolePage;
