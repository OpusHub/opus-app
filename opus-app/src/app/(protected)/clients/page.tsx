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
import { AddCustomerButton } from "./_components/add-customer-btn";
import db from "@/db";
import { customersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import CustomerCard from "./_components/customer-card";

const ClientsPage = async () => {

   const session = await auth.api.getSession({
    headers: await headers(),
  });

  const customers = session?.user?.id
    ? await db.query.customersTable.findMany({
        where: eq(customersTable.userId, session.user.id),
      })
    : [];

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
          <AddCustomerButton />
        </PageActions>
      </PageHeader>
      <PageContent>
        {customers.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </PageContent>
    </PageContainer>
    )
};

export default ClientsPage;
