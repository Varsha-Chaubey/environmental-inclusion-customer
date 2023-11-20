import React, { useEffect, useRef, useState } from "react";
import PageLayout from "../../layout/PageLayout/pageLayout";

import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import mapImg from "../../include/images/tab-map1.png"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Details from "../../components/wetMarketSubTabs/details";
import Image from "../../components/wetMarketSubTabs/image";
import Extinct from "../../components/wetMarketSubTabs/extinct";
const WetMarketDetail = (props) => {
  const location = useLocation();
  let sliderRef = useRef();
  const [menuItem, setMenuItem] = useState("1");

  const ArrowLeft = (props) => (
    <button
      {...props}
      className={"slick-prev slick-arrow"}
      aria-label="Previous"
      onClick={() => {
        sliderRef?.current?.slickPrev();
        if (menuItem == "1") {
          setMenuItem("8");
        } else {
          setMenuItem(+menuItem - 1);
        }
      }}
    />
  );
  const ArrowRight = (props) => (
    <button
      {...props}
      className={"slick-next slick-arrow"}
      aria-label="Next"
      onClick={() => {
        sliderRef?.current?.slickNext();
        if (menuItem == "8") {
          setMenuItem("1");
        } else {
          setMenuItem(+menuItem + 1);
        }
      }}
    />
  );

  const productSlider = {
    variableWidth: false,
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    arrows: true,
    prevArrow: <ArrowLeft />,
    nextArrow: <ArrowRight />,
    swipeToSlide: true,
    swipe: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          arrows: true,
          prevArrow: <ArrowLeft />,
          nextArrow: <ArrowRight />,
          swipeToSlide: true,
          swipe: true,
        },
      },
    ],
  };

  return (
    <PageLayout>
      <main id="main">
        <div class="map-hero">
          <div class="map-hero-image">
            <img src={mapImg} alt="" />
          </div>
        </div>

        <div class="content-container region-heading-container">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="rhc-box d-flex flex-wrap justify-content-between">
                  <div class="rhc-box-left">
                    <span class="text-title text-green">Wet Market</span>
                    <h1>Belo Horizonte</h1>
                    <div class="rhc-box-icon d-flex">
                      {/* <a href="#!" style={{pointerEvents:"none"}}>
                        <img src={share} alt="" />
                      </a> */}
                      {/* <a href="#!">
                        <img src={edit} alt="" />
                      </a> */}
                    </div>
                  </div>
                  <div class="rhc-box-right">
                    <div class="rhc-box-inner d-flex flex-wrap">
                      <div
                        class={`rhc-statics-box nav-link  cursor-pointer ${
                          menuItem == "3" && "active"
                        }`}
                        id="pills-four-tab"
                        onClick={() => setMenuItem("3")}
                      >
                        <p>Species Sold</p>
                        <h6>25</h6>
                      </div>
                      <div
                        class={`rhc-statics-box nav-link  cursor-pointer ${
                          menuItem == "3" && "active"
                        }`}
                        id="pills-five-tab"
                        onClick={() => setMenuItem("3")}
                      >
                        <p>Endangered Species</p>
                        <h6>15</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="tabs-block-container">
          <div class="tbc-head mob-height-container">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <ul
                    class="nav nav-pills d-lg-flex d-none region-detail-slider"
                    id="pills-tab"
                  >
                    <li class="nav-item" role="presentation">
                      <div
                        class={`nav-link  cursor-pointer ${
                          menuItem == "1" && "active"
                        }`}
                        id="pills-one-tab"
                        onClick={() => setMenuItem("1")}
                      >
                        Details
                      </div>
                    </li>

                    <li class="nav-item" role="presentation">
                      <div
                        class={`nav-link  cursor-pointer ${
                          menuItem == "2" && "active"
                        }`}
                        id="pills-two-tab"
                        onClick={() => setMenuItem("2")}
                      >
                        Images
                      </div>
                    </li>

                    <li class="nav-item" role="presentation">
                      <div
                        class={`nav-link  cursor-pointer ${
                          menuItem == "3" && "active"
                        }`}
                        id="pills-three-tab"
                        onClick={() => setMenuItem("3")}
                      >
                        Extinct
                      </div>
                    </li>
                  </ul>

                  <div class="nav-pill-mob-list nav-pill-mob-slider d-lg-none d-block slick-initialized slick-slider">
                    <Slider
                      {...productSlider}
                      ref={sliderRef}
                      className="slick-initialized slick-slider"
                    >
                      <li class="nav-item  slick-slide" role="presentation">
                        <div
                          class={`nav-link  cursor-pointer ${
                            menuItem == "1" && "mob-active"
                          }`}
                          id="pills-one-tab"
                          onClick={() => setMenuItem("1")}
                        >
                          Details
                        </div>
                      </li>
                      {
                        <li class="nav-item  slick-slide" role="presentation">
                          <div
                            class={`nav-link  cursor-pointer ${
                              menuItem == "2" && "active"
                            }`}
                            id="pills-two-tab"
                            onClick={() => setMenuItem("2")}
                          >
                            Images
                          </div>
                        </li>
                      }
                      {
                        <li class="nav-item" role="presentation">
                          <div
                            class={`nav-link  cursor-pointer ${
                              menuItem == "3" && "active"
                            }`}
                            id="pills-three-tab"
                            onClick={() => setMenuItem("3")}
                          >
                            Extinct
                          </div>
                        </li>
                      }
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tbc-body overflow-hidden">
            <div class="tab-content tab-content-slider" id="pills-tabContent">
               {menuItem == "1" && (
                <div
                  class={`tab-pane fade ${menuItem == "1" && "active show"}`}
                  id="pills-one"
                >
                  <Details menuItem={menuItem}  />
                </div>
              )}
            {menuItem == "2" && (
                <div
                  class={`tab-pane fade ${menuItem == "2" && "active show"}`}
                  id="pills-two"
                >
                  <Image menuItem={menuItem} />
                </div>
              )}
               {menuItem == "3" && (
                <div
                  class={`tab-pane fade ${menuItem == "3" && "active show"}`}
                  id="pills-three"
                >
                  <Extinct menuItem={menuItem} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};
const mapDispatchToProps = (dispatch) => ({
  //   getRegionList: (params, callback) =>
  //     dispatch(getRegionList(params, callback)),
});

const mapStateToProps = (state) => ({
  //   sideBarApisListings: sideBarApisListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(WetMarketDetail));
