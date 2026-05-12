import { SidebarNav } from "@/components/layout/sidebar-nav";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <SidebarNav />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
