import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <div className="w-screen h-screen scroll-smooth relative">
      <Header />
      <div className="p-4 overflow-y-auto">{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
