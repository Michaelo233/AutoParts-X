
import Footer from "./Footer/footer";
import { Outlet } from "react-router-dom";
import { Nav } from "./Navegation/Nav";


function Layout() {
  return (
    <>
        <Nav />
        {/* Outlet is used to render the child routes of the layout component */}
        <Outlet /> 
      <Footer />
    </>
  );
}

export default Layout;