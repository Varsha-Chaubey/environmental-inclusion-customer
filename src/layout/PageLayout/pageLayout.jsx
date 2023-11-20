import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

const PageLayout = (props) => {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
};

export default PageLayout;
