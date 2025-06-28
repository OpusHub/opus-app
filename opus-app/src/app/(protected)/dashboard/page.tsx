import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignOutButton from "./_components/sign-out-button";
import { redirect } from "next/navigation";
import db from "@/db";


const DashboardPage =  async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  
  if (!session?.user) {
    return redirect('/auth')
  } 

  const companies = await db.query.companysTable.findMany({
    where: (company, { eq }) => eq(company.userId, session.user.id),
    with: {
      user: true,
    },
  });

  if (companies.length === 0) {
    return redirect('/company-form');
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg">Olá {session?.user.name}</p>
      <p>Como vai a {companies[0]?.name}?</p>
      <SignOutButton />
    </div>
  );
}

export default DashboardPage;