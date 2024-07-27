import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <div className="w-screen h-screen scroll-smooth relative">
      <div className="w-full sticky top-0">
        <Header />
      </div>

      <div className="md:p-6 p-4 overflow-y-auto">{props.children}</div>
      <div className="w-full fixed bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
