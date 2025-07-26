import {
  PageContainer,
  PageHeader,
  PageHeaderContent,
  PageTitle,
  PageDescription,
  PageActions,
  PageContent,
} from "@/components/page-container";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "./_components/date-picker";
import db from "@/db";
import { sessionsTable } from "@/db/schema";
import { eq, gte, lte, and, sum } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BadgeMinus, Clock4, Coins, MessageCircleMore, PackageMinus, PackageX, ShoppingBagIcon, User } from "lucide-react";
import CardDashboard from "@/components/card-dashboard";

interface DashboardPageProps {
  searchParams: Promise<{
    from: string;
    to: string;
  }>;
}

const DashboardPage = async ({ searchParams }: DashboardPageProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/auth");
  }

  if (!session?.user?.company) {
    redirect("/company-form");
  }

  // const { from, to } = await searchParams;

  // const totalCost = await db.select(
  //   {total: sum(sessionsTable.cost)}
  // ).from(sessionsTable).where(
  //   and(
  //     eq(sessionsTable.userId, session?.user?.id),
  //     eq(sessionsTable.status, "completed"),
  //     gte(sessionsTable.startTime, new Date(from)),
  //     lte(sessionsTable.endTime, new Date(to))
  //   )
  // )

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Dashboard</PageTitle>
          <PageDescription>
            Tenha uma visão geral do desempenho do seu negócio, visualize
            métricas importantes e acesse informações relevantes de forma rápida
            e fácil.
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <DateRangePicker label="Filtre por data" />
        </PageActions>
      </PageHeader>
      <PageContent>
        <div className="grid grid-cols-4 gap-2">
          <CardDashboard
            title="Total de Pedidos"
            Icon={ShoppingBagIcon}
            value={235.000}
          />
          <CardDashboard
            title="Pedidos Reembolsados"
            Icon={PackageMinus}
            value={30}
          />
          <CardDashboard title="Pedidos Cancelados" Icon={PackageX} value={32.000} />
          <CardDashboard title="Taxa ChargeBack" Icon={BadgeMinus} value={"5%"} />
          
        </div>
        <div className="grid grid-cols-4 gap-2">
          <CardDashboard
            title="Mensagens Enviadas"
            Icon={MessageCircleMore}
            value={235.000}
          />
          <CardDashboard
            title="Custo de conversa"
            Icon={Coins}
            value={'R$ 0.028'}
          />
          <CardDashboard title="Total de Clientes Atendidos" Icon={User} value={"32"} />
          <CardDashboard title="Tempo médio de resposta" Icon={Clock4} value={"47seg"} />
          
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default DashboardPage;
