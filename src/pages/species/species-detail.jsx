import React, { useEffect, useRef, useState } from "react";
import PageLayout from "../../layout/PageLayout/pageLayout";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
  getSpeciesDetails,
  speciesListings,
  getDonation,
  getEnvironmentalist,
  getNews,
  getOrganizations,
  getScienceAndEducation,
  getZoo,
  getRegion,
  getMedia,
} from "../../store/species";
import { getSpeciesList, sideBarApisListings } from "../../store/sidebarApis";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Details from "../../components/speciesDetailsPages/details";
import Threats from "../../components/speciesDetailsPages/threats";
import Organizations from "../../components/speciesDetailsPages/organizations";
import People from "../../components/speciesDetailsPages/people";
import Contribute from "../../components/speciesDetailsPages/contribute";
import Region from "../../components/speciesDetailsPages/region";
import ScienceAndEducation from "../../components/speciesDetailsPages/scienceAndEducation";
import Media from "../../components/speciesDetailsPages/media";
import News from "../../components/speciesDetailsPages/news";
import Zoo from "../../components/speciesDetailsPages/zoo";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SpeciesDetail = (props) => {
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
      props.getSpeciesDetails(id, (res) => {
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
      props.getEnvironmentalist(id, (res) => {
        if (res && res.status == 200) {
          setLoadingDetail(false);
        }
      });
      setLoadingDetail(true);
      props.getDonation(id, (res) => {
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
      props.getScienceAndEducation(id, (res) => {
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
      props.getRegion(id, (res) => {
        if (res && res.status == 200) {
          setLoadingDetail(false);
        }
      });

      setLoadingDetail(true);
      props.getMedia(id, (res) => {
        if (res && res.status == 200) {
          setLoadingDetail(false);
        }
      });
    }
  }, [location?.state?.id]);

  const details = props.speciesListings && props.speciesListings.speciesDetail;
  const organizations =
    props.speciesListings && props.speciesListings?.organization?.data;

  const people =
    props.speciesListings && props.speciesListings.environmentalist?.data;

  const news = props.speciesListings && props.speciesListings.news?.data;

  const zoo = props.speciesListings && props.speciesListings.zoo?.data;

  const contribute =
    props.speciesListings && props.speciesListings.donation?.data;

  const science =
    props.speciesListings && props.speciesListings.scienceAndEducation?.data;

  const region = props.speciesListings && props.speciesListings.region?.data;

  const media = props.speciesListings && props.speciesListings.media?.data;


  const PreviousButton = () => {
    if (menuItem == 1) {
      setMenuItem(10 - 1);
    } else {
      setMenuItem(menuItem - 1);
    }
  };

  const NextButton = () => {
    if (menuItem == 9) {
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
    variableWidth:true,
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
          variableWidth:true,
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
                <div class="listing-details-container d-flex flex-wrap justify-content-between">
                  <div class="ldc-image detail-img-box">
                    <div class="species-details-img detail-img">
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
                      <span class="text-title text-red caps-text">
                        {details?.data?.dangerLevelName}
                      </span>
                      <div class="ldc-text-main">
                        <h1>
                          <span className="caps-text ">
                            {details?.data?.name}
                          </span>{" "}
                        </h1>
                        <img
                          src={
                            process.env.REACT_APP_MEDIA +
                            details?.data?.dangerLevelImage?.small
                          }
                          class="ldc-text-main-icon"
                          style={{ top: "-12px" }}
                          alt=""
                        />
                      </div>
                      <small className="caps-text">
                        {details?.data?.scientificName ? (
                          details?.data?.scientificName
                        ) : (
                          <h4>-</h4>
                        )}
                      </small>
                    </div>
                    <div class="ldc-text-body">
                      <ul class="ltb-details-list d-flex flex-wrap">
                        <li class="ltb-details-item">
                          <div
                            class={
                              zoo?.length
                                ? `ltb-details-box cursor-pointer ${
                                    menuItem == "9" && "active"
                                  }`
                                : `ltb-details-box pointer-event-none`
                            }
                            onClick={() => setMenuItem("9")}
                          >
                            <p className="">National Parks/ Sanctuaries</p>
                            {zoo && zoo.length > 0 ? (
                              zoo.map(
                                (item, idx) => idx <= 1 && <h4>{item?.name}</h4>
                              )
                            ) : (
                              <h4>-</h4>
                            )}
                          </div>
                        </li>
                        <li class="ltb-details-item">
                          <div class="ltb-details-box">
                            <p>ESA Categories</p>
                            <h4 className="caps-text">
                              {details?.data?.speciesCategoryName
                                ? details?.data?.speciesCategoryName
                                : "-"}
                            </h4>
                          </div>
                        </li>
                        <li class="ltb-details-item">
                          <div class="ltb-details-box">
                            <p>Population</p>
                            <h4>
                              {details?.data?.population
                                ? details?.data?.population
                                : "-"}
                            </h4>
                          </div>
                        </li>
                        <li class="ltb-details-item">
                          <div class="ltb-details-box">
                            <p>Weight</p>
                            <h4>
                              {details?.data?.weight
                                ? details?.data?.weight
                                : "-"}
                            </h4>
                          </div>
                        </li>
                        <li class="ltb-details-item">
                          <div class="ltb-details-box">
                            <p>Habitat</p>
                            <h4 className="caps-text">
                              {details?.data?.habitat
                                ? details?.data?.habitat
                                : "-"}
                            </h4>
                          </div>
                        </li>
                        <li class="ltb-details-item">
                          <div class="ltb-details-box">
                            <p>Life Span</p>
                            <h4>
                              {details?.data?.lifeSpan
                                ? details?.data?.lifeSpan
                                : "-"}
                            </h4>
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
                      data-bs-toggle="pill" data-bs-target="#pills-one" type="button" role="tab" aria-controls="pills-one" aria-selected="true"
                    >
                      Details
                    </div>
                  </li>
                  {details &&
                    details?.data &&
                    details?.data?.naturalThreat !== null &&
                    details &&
                    details?.data &&
                    details?.data?.climateChangeThreat !== null &&
                    details &&
                    details?.data &&
                    details?.data?.humanThreat !== null && (
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
                          Threats
                        </div>
                      </li>
                    )}
                  {organizations?.length > 0 && (
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
                  )}
                  {people?.length > 0 && (
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
                        People
                      </div>
                    </li>
                  )}
                  {contribute?.length > 0 && (
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
                        Contribute
                      </div>
                    </li>
                  )}
                  {region?.length > 0 && (
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
                        Region
                      </div>
                    </li>
                  )}
                  {science?.length > 0 && (
                    <li class="nav-item" role="presentation">
                      <div
                        class={`nav-link  cursor-pointer ${
                          menuItem == "7" && "active"
                        }`}
                        id="pills-seve-tab"
                        onClick={() => setMenuItem("7")}
                        data-bs-toggle="pill"
                        data-bs-target="#pills-seven"
                        type="button"
                        role="tab"
                        aria-controls="pills-seven"
                        aria-selected="false"
                      >
                        Science & Education
                      </div>
                    </li>
                  )}
                  {media?.length > 0 && (
                    <li class="nav-item" role="presentation">
                      <div
                        class={`nav-link  cursor-pointer ${
                          menuItem == "8" && "active"
                        }`}
                        id="pills-eight-tab"
                        onClick={() => setMenuItem("8")}
                        data-bs-toggle="pill"
                        data-bs-target="#pills-eight"
                        type="button"
                        role="tab"
                        aria-controls="pills-eight"
                        aria-selected="false"
                      >
                        Media
                      </div>
                    </li>
                  )}

                  {zoo?.length > 0 && (
                    <li class="nav-item" role="presentation">
                      <div
                        class={`nav-link  cursor-pointer ${
                          menuItem == "9" && "active"
                        }`}
                        id="pills-nine-tab"
                        onClick={() => setMenuItem("9")}
                        data-bs-toggle="pill"
                        data-bs-target="#pills-nine"
                        type="button"
                        role="tab"
                        aria-controls="pills-nine"
                        aria-selected="false"
                      >
                        Zoos & Wildlife Reserves
                      </div>
                    </li>
                  )}

                  {/* {news?.length > 0 && (
                    <li class="nav-item" role="presentation">
                      <div
                        class={`nav-link  cursor-pointer ${
                          menuItem == "10" && "active"
                        }`}
                        id="pills-eight-tab"
                        onClick={() => setMenuItem("10")}
                      >
                        News
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
                    <li class="nav-pill-mob-box  " role="presentation">
                      <div
                        class={`nsv-pill-mob-inner  cursor-pointer ${
                          menuItem == "1" && "mob-active"
                        }`}
                        id="pills-one-tab"
                        onClick={() => setMenuItem("1")}
                      >
                        Details
                      </div>
                    </li>

                    {details &&
                      details?.data &&
                      details?.data?.naturalThreat !== null &&
                      details &&
                      details?.data &&
                      details?.data?.climateChangeThreat !== null &&
                      details &&
                      details?.data &&
                      details?.data?.humanThreat !== null && (
                        <li class="nav-pill-mob-box  " role="presentation">
                          <div
                            class={`nsv-pill-mob-inner  cursor-pointer ${
                              menuItem == "2" && "active"
                            }`}
                            id="pills-two-tab"
                            onClick={() => setMenuItem("2")}
                          >
                            Threats
                          </div>
                        </li>
                      )}

                    {organizations?.length > 0 && (
                      <li class="nav-pill-mob-box " role="presentation">
                        <div
                          class={`nsv-pill-mob-inner  cursor-pointer ${
                            menuItem == "3" && "active"
                          }`}
                          id="pills-three-tab"
                          onClick={() => setMenuItem("3")}
                        >
                          Organizations
                        </div>
                      </li>
                    )}
                    {people?.length > 0 && (
                      <li class="nav-pill-mob-box " role="presentation">
                        <div
                          class={`nsv-pill-mob-inner  cursor-pointer ${
                            menuItem == "4" && "active"
                          }`}
                          id="pills-four-tab"
                          onClick={() => setMenuItem("4")}
                        >
                          People
                        </div>
                      </li>
                    )}
                    {contribute?.length > 0 && (
                      <li class="nav-pill-mob-box" role="presentation">
                        <div
                          class={`nsv-pill-mob-inner  cursor-pointer ${
                            menuItem == "5" && "active"
                          }`}
                          id="pills-five-tab"
                          onClick={() => setMenuItem("5")}
                        >
                          Contribute
                        </div>
                      </li>
                    )}
                    {region?.length > 0 && (
                      <li class="nav-pill-mob-box" role="presentation">
                        <div
                          class={`nsv-pill-mob-inner  cursor-pointer ${
                            menuItem == "6" && "active"
                          }`}
                          id="pills-six-tab"
                          onClick={() => setMenuItem("6")}
                        >
                          Region
                        </div>
                      </li>
                    )}
                    {science?.length > 0 && (
                      <li class="nav-pill-mob-box" role="presentation">
                        <div
                          class={`nsv-pill-mob-inner  cursor-pointer ${
                            menuItem == "7" && "active"
                          }`}
                          id="pills-seve-tab"
                          onClick={() => setMenuItem("7")}
                        >
                          Science & Education
                        </div>
                      </li>
                    )}
                    {media?.length > 0 && (
                      <li class="nav-pill-mob-box " role="presentation">
                        <div
                          class={`nsv-pill-mob-inner  cursor-pointer ${
                            menuItem == "8" && "active"
                          }`}
                          id="pills-eight-tab"
                          onClick={() => setMenuItem("8")}
                        >
                          Media
                        </div>
                      </li>
                    )}

                    {zoo?.length > 0 && (
                      <li class="nav-pill-mob-box " role="presentation">
                        <div
                          class={`nsv-pill-mob-inner  cursor-pointer ${
                            menuItem == "9" && "active"
                          }`}
                          id="pills-nine-tab"
                          onClick={() => setMenuItem("9")}
                        >
                          Zoos & Wildlife Reserves
                        </div>
                      </li>
                    )}

                    {/* {
                      <li class="nav-item" role="presentation">
                        <div
                          class={`nav-link  cursor-pointer ${
                            menuItem == "10" && "active"
                          }`}
                          id="pills-eight-tab"
                          onClick={() => setMenuItem("10")}
                        >
                          News
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
                <Details
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
                <Threats
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
                <Organizations menuItem={menuItem} id={id} />
              </div>
            )}
            {menuItem == "4" && (
              <div
                class={`tab-pane fade ${menuItem == "4" && "active show"}`}
                id="pills-four"
              >
                <People menuItem={menuItem} id={id} />
              </div>
            )}
            {menuItem == "5" && (
              <div
                class={`tab-pane fade ${menuItem == "5" && "active show"}`}
                id="pills-five"
              >
                <Contribute
                  menuItem={menuItem}
                  id={id}
                  name={details?.data?.name}
                />
              </div>
            )}
            {menuItem == "6" && (
              <div
                class={`tab-pane fade ${menuItem == "6" && "active show"}`}
                id="pills-six"
              >
                <Region
                  menuItem={menuItem}
                  id={id}
                  setSelectedId={setSelectedId}
                />
              </div>
            )}
            {menuItem == "7" && (
              <div
                class={`tab-pane fade ${menuItem == "7" && "active show"}`}
                id="pills-seven"
              >
                <ScienceAndEducation menuItem={menuItem} id={id} />
              </div>
            )}
            {menuItem == "8" && (
              <div
                class={`tab-pane fade ${menuItem == "8" && "active show"}`}
                id="pills-eight"
              >
                <Media menuItem={menuItem} id={id} />
              </div>
            )}

            {menuItem == "9" && (
              <div
                class={`tab-pane fade ${menuItem == "9" && "active show"}`}
                id="pills-eight"
              >
                <Zoo menuItem={menuItem} id={id} />
              </div>
            )}

            {/* {menuItem == "10" && (
              <div
                class={`tab-pane fade ${menuItem == "10" && "active show"}`}
                id="pills-eight"
              >
                <News menuItem={menuItem} id={id} />
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
  getSpeciesDetails: (params, callback) =>
    dispatch(getSpeciesDetails(params, callback)),

  getSpeciesList: (params, callback) =>
    dispatch(getSpeciesList(params, callback)),

  getDonation: (params, callback) => dispatch(getDonation(params, callback)),

  getEnvironmentalist: (params, callback) =>
    dispatch(getEnvironmentalist(params, callback)),

  getNews: (params, callback) => dispatch(getNews(params, callback)),

  getOrganizations: (params, callback) =>
    dispatch(getOrganizations(params, callback)),

  getScienceAndEducation: (params, callback) =>
    dispatch(getScienceAndEducation(params, callback)),

  getZoo: (params, data, callback) => dispatch(getZoo(params, data, callback)),
  getRegion: (params, data, callback) =>
    dispatch(getRegion(params, data, callback)),
  getMedia: (params, data, callback) =>
    dispatch(getMedia(params, data, callback)),
});

const mapStateToProps = (state) => ({
  speciesListings: speciesListings(state),
  sideBarApisListings: sideBarApisListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(SpeciesDetail));
