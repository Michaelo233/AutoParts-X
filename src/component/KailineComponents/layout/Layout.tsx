import type { ReactNode } from "react";
import Nav from "../navigation/Navigation";
import Header from "../../Header/header";
import Footer from "../../Footer/footer";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

function Layout({ children, className }: LayoutProps) {
  return (
    <>
      <Header />
      <Nav />

      <main className={className}>
        {children}
        </main>

        
      <Footer />
    </>
  );
}

export default Layout;