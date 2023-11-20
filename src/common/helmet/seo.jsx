import React from "react";
import { Helmet } from "react-helmet";
import logo from "../../include/images/logo.svg";

const SEO = () => {
  return (
    <Helmet>
      <title>{"Salvex Environmental Inclusion"}</title>
      {process.env.REACT_APP_MODE === "development" && (
        <meta name="robots" content="noindex,nofollow" />
      )}
      {process.env.REACT_APP_MODE === "prod" && (
        <meta name="robots" content="index,follow" />
      )}
      <meta name="description" content="Salvex Environmental Inclusion" />
      <meta name="image" content={logo} />
    </Helmet>
  );
};

export default SEO;
