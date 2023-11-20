import React, { useEffect, useRef, useState } from "react";
import PageLayout from "../../layout/PageLayout/pageLayout";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
  getEnvironmentalistDetails,
  environmentalistListings,
} from "../../store/environmentalist";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Detail from "../../components/environmentalistDetail/detail";
import Species from "../../components/environmentalistDetail/species";
import Organization from "../../components/environmentalistDetail/organization";
import Regions from "../../components/environmentalistDetail/regions";

const EnvironmentalistDetail = (props) => {
  const location = useLocation();
  let sliderRef = useRef();
  const [menuItem, setMenuItem] = useState("1");
  const [id, setId] = useState("");
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location?.state?.id) {
      const id = location?.state?.id;
      setId(id);
      setLoadingDetail(true);
      props.getEnvironmentalistDetails(id, (res) => {
        if (res && res.status == 200) {
          setLoadingDetail(false);
        }
      });
    }
  }, [selectedId, location?.state?.id]);

  const details =
    props.environmentalistListings &&
    props.environmentalistListings.environmentalistDetail;

  const PreviousButton = () => {
    if (menuItem == 1) {
      setMenuItem(11 - 1);
    } else {
      setMenuItem(menuItem - 1);
    }
  };

  const NextButton = () => {
    if (menuItem == 10) {
      setMenuItem(1);
    } else {
      setMenuItem(parseInt(menuItem) + 1);
    }
  };
  const ArrowLeft = (props) => (
    <button
      {...props}
      className={"slick-prev slick-arrow"}
      aria-label="Previous"
      onClick={() => {
        props.onClick();
        PreviousButton();
      }}
    />
  );
  const ArrowRight = (props) => (
    <button
      {...props}
      className={"slick-next slick-arrow"}
      aria-label="Next"
      onClick={() => {
        props.onClick();
        NextButton();
      }}
    />
  );

  const productSlider = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <ArrowLeft />,
    nextArrow: <ArrowRight />,
    swipeToSlide: true,
    swipe: true,
    focusOnSelect: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
          prevArrow: <ArrowLeft />,
          nextArrow: <ArrowRight />,
          swipeToSlide: true,
          swipe: true,
          focusOnSelect: true,
          variableWidth: true,
        },
      },
    ],
  };

  return (
    <PageLayout>
      <main id="main">
        <div class="content-container overflow-hidden pt-4">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="listing-details-container d-flex flex-wrap justify-content-between environmentalist-details-container">
                  <div class="ldc-image">
                    <div class="environmentalist-details-img ">
                      <img
                        src={
                          process.env.REACT_APP_MEDIA +
                          details?.data?.detailTabImage?.original
                        }
                        alt=""
                      />
                    </div>
                  </div>
                  <div class="ldc-text">
                    <div class="ldc-text-head">
                      <span class="text-title text-green">
                        Environmentalist
                      </span>
                      <div class="ldc-text-main">
                        <h1 className="caps-text">
                          <span>
                            {details && details?.data && details?.data?.name}
                          </span>{" "}
                        </h1>
                      </div>
                    </div>
                    <div class="ldc-text-body">
                      <ul class="ltb-details-list d-flex flex-wrap">
                        <li class="ltb-details-item">
                          <div class="ltb-details-box">
                            <p>Movement</p>
                            {details &&
                            details?.data &&
                            details?.data &&
                            details?.data?.movements.length > 0 ? (
                              details &&
                              details?.data?.movements?.map(
                                (item, idx) =>
                                  idx <= 1 && (
                                    <h4 className="caps-text">{item?.name}</h4>
                                  )
                              )
                            ) : (
                              <h4>-</h4>
                            )}
                          </div>
                        </li>
                        <li class="ltb-details-item">
                          <div class="ltb-details-box">
                            <p>Years active</p>
                            <h4>{details?.data?.yearsActive}</h4>
                          </div>
                        </li>
                        <li class="ltb-details-item">
                          <div class="ltb-details-box">
                            <p>Organizations Founded</p>
                            {details &&
                            details?.data &&
                            details?.data &&
                            details?.data?.foundedOrganizations.length > 0 ? (
                              details &&
                              details?.data?.foundedOrganizations?.map(
                                (item, idx) =>
                                  idx <= 1 && (
                                    <h4 className="caps-text">{item?.name}</h4>
                                  )
                              )
                            ) : (
                              <h4>-</h4>
                            )}
                          </div>
                        </li>
                        <li class="ltb-details-item">
                          <div class="ltb-details-box">
                            <p>Awards</p>
                            <h4>{details?.data?.awards?.length}</h4>
                          </div>
                        </li>
                        <li class="ltb-details-item">
                          <div class="ltb-details-box">
                            <p>Working in Region</p>
                            <h4>
                              {" "}
                              {details &&
                              details?.data &&
                              details?.data &&
                              details?.data?.regions.length > 0 ? (
                                details &&
                                details?.data?.regions?.map(
                                  (item, idx) =>
                                    idx <= 1 && (
                                      <h4>
                                        {" "}
                                        {item &&
                                        item?.countryName === "United States"
                                          ? `${item?.state}, ${item?.countryName}`
                                          : item?.countryName}
                                      </h4>
                                    )
                                )
                              ) : (
                                <h4>-</h4>
                              )}
                            </h4>
                          </div>
                        </li>
                        <li class="ltb-details-item">
                          <div class="ltb-details-box">
                            <p>Social media</p>
                            <div class="ltb-icon-list d-flex flex-wrap">
                              {details?.data?.socialMediaLink?.facebook ? (
                                <div class="ltb-icon-item">
                                  <a
                                    href={
                                      details?.data?.socialMediaLink?.facebook
                                    }
                                    target="_blank"
                                    class="ltb-icon-box"
                                  >
                                    <i class="fab fa-facebook-f"></i>
                                  </a>
                                </div>
                              ) : (
                                "-"
                              )}
                              {details?.data?.socialMediaLink?.twitter ? (
                                <div class="ltb-icon-item">
                                  <a
                                    href={
                                      details?.data?.socialMediaLink?.twitter
                                    }
                                    target="_blank"
                                    class="ltb-icon-box"
                                  >
                                    <i class="fab fa-twitter"></i>
                                  </a>
                                </div>
                              ) : (
                                ""
                              )}
                              {details?.data?.socialMediaLink?.instagram ? (
                                <div class="ltb-icon-item">
                                  <a
                                    href={
                                      details?.data?.socialMediaLink?.instagram
                                    }
                                    target="_blank"
                                    class="ltb-icon-box"
                                  >
                                    <i class="fab fa-instagram"></i>
                                  </a>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="tabs-block-container">
          <div class="tbc-head ">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <ul
                    class="nav nav-pills d-lg-flex d-none"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li class="nav-item" role="presentation">
                      <div
                        class={`nav-link  cursor-pointer ${
                          menuItem == "1" && "active"
                        }`}
                        id="pills-one-tab"
                        onClick={() => setMenuItem("1")}
                        data-bs-toggle="pill"
                          data-bs-target="#pills-one"
                          type="button"
                          role="tab"
                          aria-controls="pills-one"
                          aria-selected="false"
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
                        data-bs-toggle="pill"
                          data-bs-target="#pills-two"
                          type="button"
                          role="tab"
                          aria-controls="pills-two"
                          aria-selected="false"
                      >
                        Species
                      </div>
                    </li>

                    <li class="nav-item" role="presentation">
                      <div
                        class={`nav-link  cursor-pointer ${
                          menuItem == "3" && "active"
                        }`}
                        id="pills-three-tab"
                        onClick={() => setMenuItem("3")}
                        data-bs-toggle="pill"
                          data-bs-target="#pills-three"
                          type="button"
                          role="tab"
                          aria-controls="pills-three"
                          aria-selected="false"
                      >
                        Organizations
                      </div>
                    </li>

                    <li class="nav-item" role="presentation">
                      <div
                        class={`nav-link  cursor-pointer ${
                          menuItem == "4" && "active"
                        }`}
                        id="pills-four-tab"
                        onClick={() => setMenuItem("4")}
                        data-bs-toggle="pill"
                          data-bs-target="#pills-four"
                          type="button"
                          role="tab"
                          aria-controls="pills-four"
                          aria-selected="false"
                      >
                        Region
                      </div>
                    </li>
                  </ul>

                  <div class="nav-pill-mob-list nav-pill-mob-slider d-lg-none d-block ">
                    <Slider
                      {...productSlider}
                      ref={sliderRef}
                      className="nav-pill-mob-item"
                    >
                      <li class="nav-pill-mob-box " role="presentation">
                        <div
                          class={`nsv-pill-mob-inner cursor-pointer ${
                            menuItem == "1" && "mob-active"
                          }`}
                          id="pills-one-tab"
                          onClick={() => setMenuItem("1")}
                        >
                          Details
                        </div>
                      </li>

                      {
                        <li class="nav-pill-mob-box " role="presentation">
                          <div
                            class={`nsv-pill-mob-inner cursor-pointer ${
                              menuItem == "2" && "active"
                            }`}
                            id="pills-three-tab"
                            onClick={() => setMenuItem("2")}
                          >
                            Species
                          </div>
                        </li>
                      }
                      {
                        <li class="nav-pill-mob-box " role="presentation">
                          <div
                            class={`nsv-pill-mob-inner cursor-pointer ${
                              menuItem == "3" && "active"
                            }`}
                            id="pills-four-tab"
                            onClick={() => setMenuItem("3")}
                          >
                            Organization
                          </div>
                        </li>
                      }

                      {
                        <li class="nav-pill-mob-box " role="presentation">
                          <div
                            class={`nsv-pill-mob-inner cursor-pointer ${
                              menuItem == "4" && "active"
                            }`}
                            id="pills-six-tab"
                            onClick={() => setMenuItem("4")}
                          >
                            Region
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
                  <Detail
                    menuItem={menuItem}
                    id={id}
                    setSelectedId={setSelectedId}
                  />
                </div>
              )}
              {menuItem == "2" && (
                <div
                  class={`tab-pane fade ${menuItem == "2" && "active show"}`}
                  id="pills-two"
                >
                  <Species
                    menuItem={menuItem}
                    id={id}
                    setSelectedId={setSelectedId}
                  />
                </div>
              )}
              {menuItem == "3" && (
                <div
                  class={`tab-pane fade ${menuItem == "3" && "active show"}`}
                  id="pills-three"
                >
                  <Organization menuItem={menuItem} id={id} />
                </div>
              )}

              {menuItem == "4" && (
                <div
                  class={`tab-pane fade ${menuItem == "4" && "active show"}`}
                  id="pills-four"
                >
                  <Regions
                    menuItem={menuItem}
                    id={id}
                    setSelectedId={setSelectedId}
                  />
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
  getEnvironmentalistDetails: (params, callback) =>
    dispatch(getEnvironmentalistDetails(params, callback)),
});

const mapStateToProps = (state) => ({
  environmentalistListings: environmentalistListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(EnvironmentalistDetail));
