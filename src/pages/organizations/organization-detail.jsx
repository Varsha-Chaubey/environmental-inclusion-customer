import React, { useEffect, useRef, useState } from "react";
import PageLayout from "../../layout/PageLayout/pageLayout";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
  getOrganizationDetails,
  organizationListing,
  getWorkDetails,
  getTeamDetails,
  getProgramDetails,
  getPartnerDetails,
  getReportDetails,
  getMediaDetails,
} from "../../store/organization";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Details from "../../components/organizationDetail/details";
import Works from "../../components/organizationDetail/works";
import Teams from "../../components/organizationDetail/teams";
import Partners from "../../components/organizationDetail/partners";
import Media from "../../components/organizationDetail/media";
import Programs from "../../components/organizationDetail/programs";
import Reports from "../../components/organizationDetail/reports";
import Instagram from "../../include/images/Instagram-w.svg";
import facebook from "../../include/images/facebook.svg";
import website from "../../include/images/Website_icon.svg";
import twitter from "../../include/images/twitter-w.svg";
const OrganizationDetail = (props) => {
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
      props.getOrganizationDetails(id, (res) => {
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
      props.getWorkDetails(id, (res) => {
        if (res && res.status == 200) {
          setLoadingDetail(false);
        }
      });
      setLoadingDetail(true);
      props.getTeamDetails(id, (res) => {
        if (res && res.status == 200) {
          setLoadingDetail(false);
        }
      });
      setLoadingDetail(true);
      props.getProgramDetails(id, (res) => {
        if (res && res.status == 200) {
          setLoadingDetail(false);
        }
      });
      setLoadingDetail(true);
      props.getPartnerDetails(id, (res) => {
        if (res && res.status == 200) {
          setLoadingDetail(false);
        }
      });
      setLoadingDetail(true);
      props.getReportDetails(id, (res) => {
        if (res && res.status == 200) {
          setLoadingDetail(false);
        }
      });
      setLoadingDetail(true);
      props.getMediaDetails(id, (res) => {
        if (res && res.status == 200) {
          setLoadingDetail(false);
        }
      });
    }
  }, [location?.state?.id]);

  const details =
    props.organizationListing && props.organizationListing?.organizationDetail;

  const works =
    props.organizationListing && props.organizationListing?.workDetail;

  const team =
    props.organizationListing && props.organizationListing?.teamDetail;

  const partner =
    props.organizationListing && props.organizationListing?.partnerDetail;

  const program =
    props.organizationListing && props.organizationListing?.programDetail;

  const reports =
    props.organizationListing && props.organizationListing?.reportDetail;

  const medias =
    props.organizationListing && props.organizationListing?.mediaDetail;

  const PreviousButton = () => {
    if (menuItem == 1) {
      setMenuItem(8 - 1);
    } else {
      setMenuItem(menuItem - 1);
    }
  };

  const NextButton = () => {
    if (menuItem == 7) {
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
    variableWidth:true,
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
          variableWidth:true,
        },
      },
    ],
  };

  return (
    <PageLayout>
      <main id="main">
        <div class="org-hero-container">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <ul class="hero-social-media-list d-flex flex-wrap">
                  {details?.data?.websiteUrl ? (
                    <li class="hsm-item">
                      <a
                        href={details?.data?.websiteUrl}
                        target="_blank"
                        class="hsm-box"
                      >
                        <img src={website} alt="" />
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                  {details?.data?.socialMediaLink?.facebook ? (
                    <li class="hsm-item">
                      <a
                        href={details?.data?.socialMediaLink?.facebook}
                        target="_blank"
                        class="hsm-box"
                      >
                        <img src={facebook} alt="" />
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                  {details?.data?.socialMediaLink?.twitter ? (
                    <li class="hsm-item">
                      <a
                        href={details?.data?.socialMediaLink?.twitter}
                        target="_blank"
                        class="hsm-box"
                      >
                        <img src={twitter} alt="" />
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                  {details?.data?.socialMediaLink?.instagram ? (
                    <li class="hsm-item">
                      <a
                        href={details?.data?.socialMediaLink?.instagram}
                        target="_blank"
                        class="hsm-box"
                      >
                        <img src={Instagram} alt="" />
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div class="org-hero-bg">
            <img
              src={
                process.env.REACT_APP_MEDIA +
                details?.data?.bannerImage?.original
              }
              alt=""
            />
          </div>
        </div>
        <div class="org-detail-container">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="org-detail-main d-flex flex-wrap align-items-start">
                  <div class="od-logo">
                    <div class="od-logo-inner">
                      <img
                        src={
                          process.env.REACT_APP_MEDIA +
                          details?.data?.coverImage?.original
                        }
                        alt=""
                      />
                    </div>
                  </div>
                  <div class="od-content">
                    <span class="text-title text-green">Organisations</span>
                    <div class="od-content-heading d-flex">
                      <h1 className="caps-text">{details?.data?.name} </h1>
                    </div>
                    <ul class="page-detail-head-list">
                      <li class="page-detail-head-item">
                        <div class="page-detail-head-box">
                          <small>Year of Working</small>
                          <p>
                            {details?.data?.yearsOfWorking
                              ? details?.data?.yearsOfWorking
                              : "-"}
                          </p>
                        </div>
                      </li>
                      <li class="page-detail-head-item">
                        <div class="page-detail-head-box">
                          <small>Area of Habitat Covered </small>
                          <p>
                            {details?.data?.areaOfHabitatCovered
                              ? details?.data?.areaOfHabitatCovered
                              : "-"}
                          </p>
                        </div>
                      </li>
                      <li class="page-detail-head-item">
                        <div class="page-detail-head-box">
                          <small>Animals Receiving Care</small>
                          <p>
                            {details?.data?.animalReceivingCare
                              ? details?.data?.animalReceivingCare
                              : "-"}
                          </p>
                        </div>
                      </li>
                      <li class="page-detail-head-item">
                        <div class="page-detail-head-box">
                          <small>Animal Lives Saved</small>
                          <p>
                            {details?.data?.animalLivesSaved
                              ? details?.data?.animalLivesSaved
                              : "-"}
                          </p>
                        </div>
                      </li>
                      <li class="page-detail-head-item">
                        <div class="page-detail-head-box">
                          <small>Amount Invested</small>
                          <p>
                            {details?.data?.amountInvested
                              ? details?.data?.amountInvested
                              : "-"}
                          </p>
                        </div>
                      </li>
                      <li class="page-detail-head-item">
                        <div class="page-detail-head-box">
                          <small>Helping Hands</small>
                          <p>
                            {details?.data?.helpingHands
                              ? details?.data?.helpingHands
                              : "-"}
                          </p>
                        </div>
                      </li>
                    </ul>
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

                  {works?.data?.length > 0 && (
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
                        Work
                      </div>
                    </li>
                  )}

                  {team?.data?.length > 0 && (
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
                        Our Team
                      </div>
                    </li>
                  )}

                  {partner?.data?.length > 0 && (
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
                        Our Partners
                      </div>
                    </li>
                  )}

                  {medias?.data?.length > 0 && (
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
                        Media
                      </div>
                    </li>
                  )}

                  {program?.data?.length > 0 && (
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
                        Programs
                      </div>
                    </li>
                  )}

                  {reports?.data?.length > 0 && (
                    <li class="nav-item" role="presentation">
                      <div
                        class={`nav-link  cursor-pointer ${
                          menuItem == "7" && "active"
                        }`}
                        id="pills-six-tab"
                        onClick={() => setMenuItem("7")}
                        data-bs-toggle="pill"
                          data-bs-target="#pills-nine"
                          type="button"
                          role="tab"
                          aria-controls="pills-nine"
                          aria-selected="false"
                      >
                        Reports
                      </div>
                    </li>
                  )}
                </ul>

                <div class="nav-pill-mob-list nav-pill-mob-slider d-lg-none d-block ">
                  <Slider
                    {...productSlider}
                    ref={sliderRef}
                    className="nav-pill-mob-item"
                  >
                    <li class="nav-pill-mob-box"  role="presentation">
                      <div
                        class={`nsv-pill-mob-inner  cursor-pointer ${
                          menuItem == "1" && "mob-active"
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

                    {works?.data?.length > 0 && (
                      <li class="nav-pill-mob-box" role="presentation">
                        <div
                          class={`nsv-pill-mob-inner  cursor-pointer ${
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
                          Work
                        </div>
                      </li>
                    )}

                    {team?.data?.length > 0 && (
                      <li class="nav-pill-mob-box" role="presentation">
                        <div
                          class={`nsv-pill-mob-inner  cursor-pointer ${
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
                          Our Team
                        </div>
                      </li>
                    )}

                    {partner?.data?.length > 0 && (
                      <li class="nav-pill-mob-box" role="presentation">
                        <div
                          class={`nsv-pill-mob-inner  cursor-pointer ${
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
                          Our Partners
                        </div>
                      </li>
                    )}

                    {medias?.data?.length > 0 && (
                      <li class="nav-pill-mob-box" role="presentation">
                        <div
                          class={`nsv-pill-mob-inner  cursor-pointer ${
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
                          Media
                        </div>
                      </li>
                    )}

                    {program?.data?.length > 0 && (
                      <li class="nav-pill-mob-box" role="presentation">
                        <div
                          class={`nsv-pill-mob-inner  cursor-pointer ${
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
                          Programs
                        </div>
                      </li>
                    )}

                    {reports?.data?.length > 0 && (
                      <li class="nav-pill-mob-box" role="presentation">
                        <div
                          class={`nsv-pill-mob-inner  cursor-pointer ${
                            menuItem == "7" && "active"
                          }`}
                          id="pills-seven-tab"
                          onClick={() => setMenuItem("7")}
                          data-bs-toggle="pill"
                          data-bs-target="#pills-seven"
                          type="button"
                          role="tab"
                          aria-controls="pills-seven"
                          aria-selected="false"
                        >
                          Reports
                        </div>
                      </li>
                    )}
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
                <Works
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
                <Teams menuItem={menuItem} id={id} />
              </div>
            )}

            {menuItem == "4" && (
              <div
                class={`tab-pane fade ${menuItem == "4" && "active show"}`}
                id="pills-six"
              >
                <Partners
                  menuItem={menuItem}
                  id={id}
                  setSelectedId={setSelectedId}
                />
              </div>
            )}

            {menuItem == "5" && (
              <div
                class={`tab-pane fade ${menuItem == "5" && "active show"}`}
                id="pills-six"
              >
                <Media
                  menuItem={menuItem}
                  id={id}
                  setSelectedId={setSelectedId}
                />
              </div>
            )}

            {menuItem == "6" && (
              <div
                class={`tab-pane fade ${menuItem == "6" && "active show"}`}
                id="pills-six"
              >
                <Programs
                  menuItem={menuItem}
                  id={id}
                  name={details?.data?.name}
                  setSelectedId={setSelectedId}
                />
              </div>
            )}

            {menuItem == "7" && (
              <div
                class={`tab-pane fade ${menuItem == "7" && "active show"}`}
                id="pills-six"
              >
                <Reports
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
  getOrganizationDetails: (params, callback) =>
    dispatch(getOrganizationDetails(params, callback)),

  getWorkDetails: (params, callback) =>
    dispatch(getWorkDetails(params, callback)),

  getTeamDetails: (params, callback) =>
    dispatch(getTeamDetails(params, callback)),

  getProgramDetails: (params, callback) =>
    dispatch(getProgramDetails(params, callback)),

  getPartnerDetails: (params, callback) =>
    dispatch(getPartnerDetails(params, callback)),

  getReportDetails: (params, callback) =>
    dispatch(getReportDetails(params, callback)),

  getMediaDetails: (params, data, callback) =>
    dispatch(getMediaDetails(params, data, callback)),
});

const mapStateToProps = (state) => ({
  organizationListing: organizationListing(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(OrganizationDetail));
