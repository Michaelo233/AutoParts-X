
import Header from "./Header/header";
import Footer from "./Footer/footer";
import { Outlet } from "react-router-dom";


function Layout() {
  return (
    <>
      <Header />
        {/* Outlet is used to render the child routes of the layout component */}
        <Outlet /> 
      <Footer />
    </>
  );
}

export default Layout;