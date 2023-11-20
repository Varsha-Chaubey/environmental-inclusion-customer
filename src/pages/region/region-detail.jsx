import React, { useEffect, useRef, useState } from "react";
import PageLayout from "../../layout/PageLayout/pageLayout";
import Details from "../../components/Region/regionDetailsPage/details";
import EnvironmentThreats from "../../components/Region/regionDetailsPage/environmentThreats";
import Zoo from "../../components/Region/regionDetailsPage/zoo";
import EndangeredSpecies from "../../components/Region/regionDetailsPage/endangeredSpecies";
import Organizations from "../../components/Region/regionDetailsPage/organizations";
import News from "../../components/Region/regionDetailsPage/news";
import Blog from "../../components/Region/regionDetailsPage/blog";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
  getBlog,
  getNews,
  getOrganizations,
  getRegionDetails,
  getScienceEducation,
  getSpecies,
  getWetMarkets,
  getZoo,
  regionListings,
} from "../../store/region";
import ScienceEducation from "../../components/Region/regionDetailsPage/scienceEducation";
import USMap from "../../common/maps/regionDetail/usMap";
import WorldMap from "../../common/maps/regionDetail/worldMap";
import { getRegionList, sideBarApisListings } from "../../store/sidebarApis";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  environmentalistListings,
  getEnvironmentalist,
} from "../../store/environmentalist";
import Environmentalist from "../../components/Region/regionDetailsPage/environmentalist";
import App from "../../common/maps/map";
const RegionDetail = (props) => {
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
      props.getRegionDetails(id, (res) => {
        if (res && res.status == 200) {
          setLoadingDetail(false);
        }
      });
    }
  }, [selectedId, location?.state?.id]);

  useEffect(() => {
    if (location?.state?.id) {
      const id = location?.state?.id;
      setLoadingDetail(true);
      props.getBlog(id, (res) => {
        if (res && res.status == 200) {
          setLoadingDetail(false);
        }
      });
      setLoadingDetail(true);
      props.getSpecies(id, (res) => {
        if (res && res.status == 200) {
          setLoadingDetail(false);
        }
      });
      setLoadingDetail(true);
      props.getWetMarkets(id, {}, (res) => {
        if (res && res.status == 200) {
          setLoadingDetail(false);
        }
      });
      setLoadingDetail(true);
      props.getNews(id, (res) => {
        if (res && res.status == 200) {
          setLoadingDetail(false);
        }
      });
      setLoadingDetail(true);
      props.getOrganizations(id, (res) => {
        if (res && res.status == 200) {
          setLoadingDetail(false);
        }
      });
      setLoadingDetail(true);
      props.getScienceEducation(id, (res) => {
        if (res && res.status == 200) {
          setLoadingDetail(false);
        }
      });
      setLoadingDetail(true);
      props.getZoo(id, (res) => {
        if (res && res.status == 200) {
          setLoadingDetail(false);
        }
      });
      setLoadingDetail(true);
      props.getEnvironmentalist({ regions: id }, (res) => {
        if (res && res.status == 200) {
          setLoadingDetail(false);
        }
      });
    }
  }, [location?.state?.id]);

  const details = props.regionDetails && props.regionDetails.regionDetails;
  const blog = props.regionDetails && props.regionDetails.blog?.data;
  const endangeredSepecies =
    props.regionDetails && props.regionDetails.species?.data;
  const threats = props.regionDetails && props.regionDetails.wetMarkets;
  const news = props.regionDetails && props.regionDetails.news?.data;
  const organizations =
    props.regionDetails && props.regionDetails.organization?.data;
  const science =
    props.regionDetails && props.regionDetails.scienceAndEducation?.data;
  const zoo = props.regionDetails && props.regionDetails.zoo?.data;
  const environmentalist =
    props?.environmentalistListings?.environmentalist?.data;

  const allRegionDetails = props?.sideBarApisListings?.regionList?.data;

  useEffect(() => {
    props.getRegionList({}, (res) => {
      if (res && res.status == 200) {
      }
    });
  }, []);

  const usRegions =
    allRegionDetails &&
    allRegionDetails.length > 0 &&
    allRegionDetails.filter((item) => item.country == "US");

  const PreviousButton = () => {
    if (menuItem == 1) {
      setMenuItem(9 - 1);
    } else {
      setMenuItem(menuItem - 1);
    }
  };

  const NextButton = () => {
    if (menuItem == 8) {
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
    slidesToShow: 1,
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
          slidesToShow: 1,
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

  console.log("PROPS", props);

  return (
    <PageLayout>
      <main id="main">
        <div
          class="content-container region-heading-container"
          style={{ padding: "30px 0px 0px 0px" }}
        >
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="rhc-box d-flex flex-wrap justify-content-between">
                  <div class="rhc-box-left">
                    <span class="text-title text-green">Region</span>
                    <h1>{details && details?.state}</h1>
                    <div class="rhc-box-icon d-flex">
                      {/* <a href="#!" style={{pointerEvents:"none"}}>
                        <img src={share} alt="" />
                      </a> */}
                      {/* <a href="#!">
                        <img src={edit} alt="" />
                      </a> */}
                    </div>
                  </div>
                  {/* <div class="rhc-box-right">
                    <div class="rhc-box-inner d-flex flex-wrap">
                      <div
                        class={`rhc-statics-box nav-link  cursor-pointer ${
                          menuItem == "4" && "active"
                        }`}
                        id="pills-four-tab"
                        onClick={() => setMenuItem("4")}
                      >
                        <p>Number of Species</p>
                        <h6>{details && details.speciesCount}</h6>
                      </div>
                      <div
                        class={`rhc-statics-box nav-link  cursor-pointer ${
                          menuItem == "5" && "active"
                        }`}
                        id="pills-five-tab"
                        onClick={() => setMenuItem("5")}
                      >
                        <p>Organisations</p>
                        <h6>{details && details.organizationCount}</h6>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="map-hero">
          <div class="map-hero-image">
            {details && details.countryName == "United States" ? (
              <USMap
                name={
                  details && details.countryName == "United States"
                    ? details.state
                    : details.countryName
                }
                data={usRegions}
                setSelectedId={setSelectedId}
              />
            ) : (
              <WorldMap
                name={details.countryName}
                data={allRegionDetails}
                setSelectedId={setSelectedId}
              />
            )}
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
                        Environmental Landscape
                      </div>
                    </li>
                    {threats?.length > 0 && (
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
                          War on the Environment – Threats ({threats?.length})
                        </div>
                      </li>
                    )}
                    {zoo?.length > 0 && (
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
                          Zoos & Wildlife Reserves ({zoo?.length})
                        </div>
                      </li>
                    )}
                    {endangeredSepecies?.length > 0 && (
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
                          Endangered Species ({endangeredSepecies?.length})
                        </div>
                      </li>
                    )}
                    {organizations?.length > 0 && (
                      <li class="nav-item" role="presentation">
                        <div
                          class={`nav-link  cursor-pointer ${
                            menuItem == "5" && "active"
                          }`}
                          id="pills-five-tab"
                          onClick={() => setMenuItem("5")}
                          data-bs-toggle="pill"
                          data-bs-target="#pills-five"
                          type="button"
                          role="tab"
                          aria-controls="pills-five"
                          aria-selected="false"
                        >
                          Organizations ({organizations?.length})
                        </div>
                      </li>
                    )}
                    {science?.length > 0 && (
                      <li class="nav-item" role="presentation">
                        <div
                          class={`nav-link  cursor-pointer ${
                            menuItem == "6" && "active"
                          }`}
                          id="pills-six-tab"
                          onClick={() => setMenuItem("6")}
                          data-bs-toggle="pill"
                          data-bs-target="#pills-six"
                          type="button"
                          role="tab"
                          aria-controls="pills-six"
                          aria-selected="false"
                        >
                          Science & Education ({science?.length})
                        </div>
                      </li>
                    )}
                    {environmentalist?.length > 0 && (
                      <li class="nav-item" role="presentation">
                        <div
                          class={`nav-link  cursor-pointer ${
                            menuItem == "7" && "active"
                          }`}
                          id="pills-six-tab"
                          onClick={() => setMenuItem("7")}
                          data-bs-toggle="pill"
                          data-bs-target="#pills-six"
                          type="button"
                          role="tab"
                          aria-controls="pills-six"
                          aria-selected="false"
                        >
                          Environmentalist ({environmentalist?.length})
                        </div>
                      </li>
                    )}
                    {/* {news?.length > 0 && (
                      <li class="nav-item" role="presentation">
                        <div
                          class={`nav-link  cursor-pointer ${
                            menuItem == "7" && "active"
                          }`}
                          id="pills-seve-tab"
                          onClick={() => setMenuItem("7")}
                        >
                          News
                        </div>
                      </li>
                    )} */}
                    {/* {blog?.length > 0 && (
                      <li class="nav-item" role="presentation">
                        <div
                          class={`nav-link  cursor-pointer ${
                            menuItem == "8" && "active"
                          }`}
                          id="pills-eight-tab"
                          onClick={() => setMenuItem("8")}
                        >
                          Blog
                        </div>
                      </li>
                    )} */}
                  </ul>

                  <div class="nav-pill-mob-list nav-pill-mob-slider d-lg-none d-block ">
                    <Slider
                      {...productSlider}
                      ref={sliderRef}
                      className="nav-pill-mob-item"
                    >
                      <li class="nav-pill-mob-box" role="presentation">
                        <div
                          class={`nsv-pill-mob-inner  cursor-pointer ${
                            menuItem == "1" && "mob-active"
                          }`}
                          id="pills-one-tab"
                          onClick={() => setMenuItem("1")}
                        >
                          Environmental Landscape
                        </div>
                      </li>
                      {
                        <li class="nav-pill-mob-box" role="presentation">
                          <div
                            class={`nsv-pill-mob-inner  cursor-pointer ${
                              menuItem == "2" && "active"
                            }`}
                            id="pills-two-tab"
                            onClick={() => setMenuItem("2")}
                          >
                            War on the Environment – Threats
                          </div>
                        </li>
                      }
                      {
                        <li class="nav-pill-mob-box" role="presentation">
                          <div
                            class={`nsv-pill-mob-inner  cursor-pointer ${
                              menuItem == "3" && "active"
                            }`}
                            id="pills-three-tab"
                            onClick={() => setMenuItem("3")}
                          >
                            Zoos & Wildlife Reserves
                          </div>
                        </li>
                      }
                      {
                        <li class="nav-pill-mob-box" role="presentation">
                          <div
                            class={`nsv-pill-mob-inner  cursor-pointer ${
                              menuItem == "4" && "active"
                            }`}
                            id="pills-four-tab"
                            onClick={() => setMenuItem("4")}
                          >
                            Endangered Species
                          </div>
                        </li>
                      }
                      {
                        <li class="nav-pill-mob-box" role="presentation">
                          <div
                            class={`nsv-pill-mob-inner  cursor-pointer ${
                              menuItem == "5" && "active"
                            }`}
                            id="pills-five-tab"
                            onClick={() => setMenuItem("5")}
                          >
                            Organizations
                          </div>
                        </li>
                      }
                      {
                        <li class="nav-pill-mob-box" role="presentation">
                          <div
                            class={`nsv-pill-mob-inner  cursor-pointer ${
                              menuItem == "6" && "active"
                            }`}
                            id="pills-six-tab"
                            onClick={() => setMenuItem("6")}
                          >
                            Science & Education
                          </div>
                        </li>
                      }
                      {
                        <li class="nav-pill-mob-box" role="presentation">
                          <div
                            class={`nsv-pill-mob-inner  cursor-pointer ${
                              menuItem == "7" && "active"
                            }`}
                            id="pills-six-tab"
                            onClick={() => setMenuItem("7")}
                          >
                            Environmentalist
                          </div>
                        </li>
                      }
                      {/* {
                        <li class="nav-item" role="presentation">
                          <div
                            class={`nav-link  cursor-pointer ${
                              menuItem == "7" && "active"
                            }`}
                            id="pills-seve-tab"
                            onClick={() => setMenuItem("7")}
                          >
                            News
                          </div>
                        </li>
                      }
                      {
                        <li class="nav-item" role="presentation">
                          <div
                            class={`nav-link  cursor-pointer ${
                              menuItem == "8" && "active"
                            }`}
                            id="pills-eight-tab"
                            onClick={() => setMenuItem("8")}
                          >
                            Blog
                          </div>
                        </li>
                      } */}
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
                  <Details menuItem={menuItem} id={id} />
                </div>
              )}
              {menuItem == "2" && (
                <div
                  class={`tab-pane fade ${menuItem == "2" && "active show"}`}
                  id="pills-two"
                >
                  <EnvironmentThreats menuItem={menuItem} id={id} />
                </div>
              )}
              {menuItem == "3" && (
                <div
                  class={`tab-pane fade ${menuItem == "3" && "active show"}`}
                  id="pills-three"
                >
                  <Zoo menuItem={menuItem} id={id} />
                </div>
              )}
              {menuItem == "4" && (
                <div
                  class={`tab-pane fade ${menuItem == "4" && "active show"}`}
                  id="pills-four"
                >
                  <EndangeredSpecies menuItem={menuItem} id={id} />
                </div>
              )}
              {menuItem == "5" && (
                <div
                  class={`tab-pane fade ${menuItem == "5" && "active show"}`}
                  id="pills-five"
                >
                  <Organizations menuItem={menuItem} id={id} />
                </div>
              )}
              {menuItem == "6" && (
                <div
                  class={`tab-pane fade ${menuItem == "6" && "active show"}`}
                  id="pills-six"
                >
                  <ScienceEducation menuItem={menuItem} id={id} />
                </div>
              )}
              {menuItem == "7" && (
                <div
                  class={`tab-pane fade ${menuItem == "7" && "active show"}`}
                  id="pills-six"
                >
                  <Environmentalist
                    menuItem={menuItem}
                    id={id}
                    environmentalist={environmentalist}
                  />
                </div>
              )}
              {zoo &&
                zoo?.length > 0 &&
                organizations &&
                organizations?.length > 0 && (
                  <div className="map-region-page">
                    <App
                      mapType="zoo"
                      zoom={"zoom"}
                      isMultiMarker={true}
                      data={
                        zoo && zoo?.length > 0
                          ? zoo.map((item) => ({
                              name: item.name,
                              coordinates: item.geoLocation,
                            }))
                          : []
                      }
                      data1={
                        organizations && organizations?.length > 0
                          ? organizations.map((item) => ({
                              name: item.name,
                              coordinates: item.geoLocation,
                            }))
                          : []
                      }
                    />
                  </div>
                )}
              {/* {menuItem == "7" && (
                <div
                  class={`tab-pane fade ${menuItem == "7" && "active show"}`}
                  id="pills-seven"
                >
                  <News menuItem={menuItem} id={id} />
                </div>
              )}
              {menuItem == "8" && (
                <div
                  class={`tab-pane fade ${menuItem == "8" && "active show"}`}
                  id="pills-eight"
                >
                  <Blog menuItem={menuItem} id={id} />
                </div>
              )} */}
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};
const mapDispatchToProps = (dispatch) => ({
  getRegionDetails: (params, callback) =>
    dispatch(getRegionDetails(params, callback)),
  getRegionList: (params, callback) =>
    dispatch(getRegionList(params, callback)),
  getBlog: (params, data, callback) =>
    dispatch(getBlog(params, data, callback)),

  getSpecies: (params, callback) => dispatch(getSpecies(params, callback)),

  getWetMarkets: (params, data, callback) =>
    dispatch(getWetMarkets(params, data, callback)),

  getNews: (params, callback) => dispatch(getNews(params, callback)),

  getOrganizations: (params, callback) =>
    dispatch(getOrganizations(params, callback)),

  getScienceEducation: (params, callback) =>
    dispatch(getScienceEducation(params, callback)),
  getEnvironmentalist: (params, callback) =>
    dispatch(getEnvironmentalist(params, callback)),

  getZoo: (params, data, callback) => dispatch(getZoo(params, data, callback)),
});

const mapStateToProps = (state) => ({
  regionDetails: regionListings(state),

  sideBarApisListings: sideBarApisListings(state),
  environmentalistListings: environmentalistListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(RegionDetail));
