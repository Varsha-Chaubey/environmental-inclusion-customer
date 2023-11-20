import React from "react";
import heroImg from "../../include/images/hero-bg.png";
import dogPaw from "../../include/images/dog-paw.svg";
import birdPaw from "../../include/images/bird-paw.svg";

const Cover = (props) => {
  return (
    <div class="hero-container">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="hero-container-content d-flex flex-wrap position-relative">
              <div class="hero-container-text">
                <h1>{props.intro}</h1>
              </div>
              <div class="hero-container-image">
                <div class="hci-inner">
                  <img src={heroImg} alt="" />
                </div>
              </div>
              <div class="dog-paw">
                <img src={dogPaw} alt="" />
              </div>
              <div class="bird-paw">
                <img src={birdPaw} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cover;
