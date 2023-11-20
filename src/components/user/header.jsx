import React, { useState } from "react";
import logo from "../../include/images/logo.svg";
import check from "../../include/images/check-14x14.svg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const Header = (props) => {
 
  return (
    <header id="header">
      <nav class="navbar navbar-expand-xl">
        <div class="container">
          <div class="nav-inside d-flex align-items-center justify-content-between">
            <Link class="navbar-brand" to={"/"}>
              <img src={logo} alt="" />
            </Link>
            <div class="flex-step-list d-flex flex-wrap align-items-lg-center flex-lg-grow-1 justify-content-lg-between">
              <div
                class={
                  props.step == "step-1"
                    ? "flex-step-item position-relative current"
                    : props.step == "step-2"
                    ? "flex-step-item position-relative complete"
                    : props.step == "step-3"
                    ? "flex-step-item position-relative complete"
                    : "flex-step-item position-relative current"
                }
              >
                <div class="flex-step-box overflo-hidden d-inline-block fw-medium text-nowrap h-100 position-relative">
                  <div class="flex-step-count d-flex align-items-center justify-content-center rounded-circle">
                    <span>1</span>
                    <img class="check" src={check} alt="check icon" />
                  </div>
                  <div class="flex-step-txt text-capitalize position-relative">
                    Contact Info
                  </div>
                </div>
              </div>
              <div
                class={
                  props.step == "step-1" && props.data?.code
                    ? "flex-step-item position-relative complete"
                    : props.step == "step-2"
                    ? "flex-step-item position-relative current"
                    : props.step == "step-3"
                    ? "flex-step-item position-relative complete"
                    : "flex-step-item position-relative "
                }
              >
                <div class="flex-step-box overflo-hidden d-inline-block fw-medium text-nowrap h-100 position-relative ">
                  <div class="flex-step-count d-flex align-items-center justify-content-center rounded-circle">
                    <span>2</span>
                    <img class="check" src={check} alt="check icon" />
                  </div>
                  <div class="flex-step-txt text-capitalize position-relative">
                    Verify Your Email
                  </div>
                </div>
              </div>
              <div
                class={
                  props.step == "step-3"
                    ? "flex-step-item position-relative current"
                    : "flex-step-item position-relative "
                }
              >
                <div class="flex-step-box overflo-hidden d-inline-block fw-medium text-nowrap  h-100 position-relative ">
                  <div class="flex-step-count d-flex align-items-center justify-content-center rounded-circle">
                    <span>3</span>
                    <img
                      class="check"
                      src="include/images/check-14x14.svg"
                      alt="check icon"
                    />
                  </div>
                  <div class="flex-step-txt text-capitalize position-relative">
                    Choose Interests
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
