import Nav from "../navigation/Navigation";

interface Layout {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<Layout> = ({ children, className }) => {
  return (
    <div className="layout-container">
        <Nav />
        
        <main className={`layout ${className || ''}`}>
         {children}
        </main>
    </div>
  );
}
   

export default Layout;