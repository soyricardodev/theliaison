import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { Toaster } from "~/components/ui/sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      {children}
      <Toaster />
      <Footer />
    </div>
  );
}
