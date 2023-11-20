import React, { useEffect, useRef, useState } from "react";
import PageLayout from "../../layout/PageLayout/pageLayout";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import mapImg from "../../include/images/zoo-map.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Details from "../../components/zooSubTabs/details";
import ContactInfo from "../../components/zooSubTabs/contactInfo";
import Species from "../../components/zooSubTabs/species";
import Programs from "../../components/zooSubTabs/programs";
const ZooDetail = (props) => {
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
        <div class="page-details-row position-relative full-height">
          <div class="zoo-map">
            <img src={mapImg} alt="" />
          </div>
          <div class="container">
            <div class="row justify-content-end">
              <div class="col-lg-7">
                <div class="page-details-box">
                  <div class="page-heading-row text-capitalize">
                    <span class="d-block text-green fw-medium">Zoo</span>
                    <div class="d-flex flex-wrap align-items-center">
                      <h1>San Diego Zoo</h1>
                      <div class="page-link-list d-flex align-items-center">
                        {/* <a class="page-link" href="#!">
                          <img src="include/images/share.svg" alt="" />
                        </a>
                        <a class="page-link" href="#!">
                          <img src="include/images/edit.svg" alt="" />
                        </a> */}
                      </div>
                    </div>
                    <h2 class="fw-medium text-uppercase">USA</h2>
                  </div>
                  <div class="page-divider"></div>
                  <div class="page-list-content">
                    <div class="page-list d-flex flex-wrap">
                      <div class="page-list-item">
                        <div class="page-list-box w-100 h-100 d-flex flex-column">
                          <p>Land area</p>
                          <div class="page-list-editable">
                            <h4>99 acres(40 ha)</h4>
                          </div>
                        </div>
                      </div>
                      <div class="page-list-item">
                        <div class="page-list-box w-100 h-100 d-flex flex-column">
                          <p>No. of Animals</p>
                          <div class="page-list-editable">
                            <h4>3,600</h4>
                          </div>
                        </div>
                      </div>
                      <div class="page-list-item">
                        <div class="page-list-box w-100 h-100 d-flex flex-column">
                          <p>No. of Species</p>
                          <div class="page-list-editable">
                            <h4>300</h4>
                          </div>
                        </div>
                      </div>
                      <div class="page-list-item">
                        <div class="page-list-box w-100 h-100 d-flex flex-column">
                          <p>Annual Visitors</p>
                          <div class="page-list-editable">
                            <h4>1.5 million</h4>
                          </div>
                        </div>
                      </div>
                      <div class="page-list-item">
                        <div class="page-list-box w-100 h-100 d-flex flex-column">
                          <p>Endangered Species</p>
                          <div class="page-list-editable">
                            <h4>250</h4>
                          </div>
                        </div>
                      </div>
                      <div class="page-list-item">
                        <div class="page-list-box w-100 h-100 d-flex flex-column">
                          <p>Social media</p>
                          <div class="page-list-editable">
                            <ul class="page-social-link d-flex flex-wrap align-items-center">
                              <li>
                                <a href="#!">
                                  <i class="fab fa-facebook-f"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#!">
                                  <i class="fab fa-twitter"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#!">
                                  <i class="fab fa-instagram"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
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
                        Contact Info
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
                        Programs
                      </div>
                    </li>

                    <li class="nav-item" role="presentation">
                      <div
                        class={`nav-link  cursor-pointer ${
                          menuItem == "4" && "active"
                        }`}
                        id="pills-three-tab"
                        onClick={() => setMenuItem("4")}
                      >
                        Endangered Species
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
                            Contact Info
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
                            Programs
                          </div>
                        </li>
                      }
                       {
                        <li class="nav-item" role="presentation">
                          <div
                            class={`nav-link  cursor-pointer ${
                              menuItem == "4" && "active"
                            }`}
                            id="pills-three-tab"
                            onClick={() => setMenuItem("4")}
                          >
                           Endangered Species
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
                  <Details menuItem={menuItem} />
                </div>
              )}
              {menuItem == "2" && (
                <div
                  class={`tab-pane fade ${menuItem == "2" && "active show"}`}
                  id="pills-two"
                >
                  <ContactInfo menuItem={menuItem} />
                </div>
              )}
              {menuItem == "3" && (
                <div
                  class={`tab-pane fade ${menuItem == "3" && "active show"}`}
                  id="pills-three"
                >
                  <Programs menuItem={menuItem} />
                </div>
              )}
              {menuItem == "4" && (
                <div
                  class={`tab-pane fade ${menuItem == "4" && "active show"}`}
                  id="pills-three"
                >
                  <Species menuItem={menuItem} />
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
)(React.memo(ZooDetail));
