import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="w-screen h-screen scroll-smooth relative">
      <Header />
      <Footer />
    </div>
  );
};

export default Layout;
