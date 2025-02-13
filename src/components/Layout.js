import { Outlet } from "react-router-dom";
import Header from "./Header";


const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* This will render the component based on the route */}
      </main>
     
    </>
  );
};

export default Layout;
