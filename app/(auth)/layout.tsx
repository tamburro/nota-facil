import { SidebarNav } from "@/components/layout/sidebar-nav";
import { MobileTopBar } from "@/components/layout/mobile-top-bar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <SidebarNav />
      <div className="flex min-w-0 flex-1 flex-col">
        <MobileTopBar />
        <main className="flex-1 overflow-auto p-4 pb-24 md:p-6 md:pb-6">
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
