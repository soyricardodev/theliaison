import { Cart } from "~/components/cart/cart";
import { QuotesRotate } from "~/components/quotes-rotate";
import { Footer } from "../components/footer";
import { Header } from "./_components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <Cart />
      {children}

      <QuotesRotate className="text-foreground" />
      <Footer />
    </div>
  );
}
