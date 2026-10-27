
import Footer from "./footer/Footer";
import { Outlet } from "react-router-dom";
import { Nav } from "./nav/Nav";


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