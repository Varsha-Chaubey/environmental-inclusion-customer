import React from "react";
import Header from "../header/header";
import pageNotFound from "../../include/images/404.svg"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const PageNotFound = (props) => {
  return (
    <>
      <Header />
      <main id="main">
        <div class="content-container">
          <div class="container">
            <div class="error">
                <p className="error-p">ERROR</p>
                <div className="mb-4" style={{padding:"20px"}}>
                    <img src={pageNotFound} alt="" style={{height:"120px"}}/>
                </div>
                <p className="error-p mb-5">PAGE NOT FOUND </p>
            </div>
            <div class=" d-flex justify-content-center mt-4">
                <Link
                 to="/"
                  class="btn btn-default header-btn cursor-pointer"
                >
                Back To Home
                </Link>
              </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PageNotFound;
