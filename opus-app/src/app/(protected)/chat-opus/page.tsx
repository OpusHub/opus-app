import ChatScreen from "@/app/(protected)/chat-opus/_components/chat-screen";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return <ChatScreen name={session?.user?.name || "User"} />;
}
