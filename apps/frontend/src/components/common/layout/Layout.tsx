
import Footer from "./footer/Footer";
import { Outlet } from "react-router-dom";
import { Nav } from "./nav/Nav";


function Layout() {
  return (
    <>
        <Nav />
       <main>
        <Outlet />   
      </main>
      <Footer />
    </>
  );
}

export default Layout;