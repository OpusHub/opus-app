import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AuthShield } from "@/components/auth-shield"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
  <AuthShield>
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  </AuthShield>
  )
}