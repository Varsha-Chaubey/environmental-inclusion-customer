import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import SpeciesAndCategoryEditModal from "../feedEditModals/speciesAndCategoryEditModal";
import RegionEditModal from "../feedEditModals/regionEditModal";
import WhoToFollowEditModal from "../feedEditModals/whoToFollowEditModal";
import ScienceAndEducationEditModal from "../feedEditModals/scienceAndEducationEditModal";
import OrganizationEditModal from "../feedEditModals/organizationEditModal";
import WetMarketEditModal from "../feedEditModals/wetMarketEditModal";
import { getUsersPreferences, getUser } from "../../../store/users";
import { connect } from "react-redux";
import AlertError from "../../../common/alerts/alertError";
import { toast } from "react-toastify";
const RightFeedSidebar = (props) => {
  const [isOrgMenu, setIsOrgMenu] = useState(true);
  const [isZooMenu, setIsZooMenu] = useState(false);
  const [isEnvMenu, setIsEnvMenu] = useState(true);
  const [isFriendMenu, setIsFriendMenu] = useState(false);

  // for edit modals
  const [showSpeciesAndCategories, setshowSpeciesAndCategories] =
    useState(false);
  const [showRegion, setShowRegion] = useState(false);
  const [showWetMarket, setShowWetMarket] = useState(false);
  const [showWhoToFollow, setShowWhoToFollow] = useState(false);
  const [showScienceAndEducation, setShowScienceAndEducation] = useState(false);
  const [showOrganizationAndZoo, setShowOrganizationAndZoo] = useState(false);

  // temp state for selection
  const [tempSelectSpeciesCategory, setTempSelectSpeciesCategory] = useState([]);
  const [tempSelectSpecies, setTempSelectSpecies] = useState([]);
  const [tempSelectSpeciesName, setTempSelectSpeciesName] = useState([]);
  const [tempSelectScience, setTempSelectScience] = useState([]);
  const [tempSelectScienceName, setTempSelectScienceName] = useState([]);
  const [tempSelectRegion, setTempSelectRegion] = useState([]);
  const [tempSelectRegionName, setTempSelectRegionName] = useState([]);
  const [tempSelectOrg, setTempSelectOrg] = useState([]);
  const [tempSelectOrgName, setTempSelectOrgName] = useState([]);
  const [tempSelectZoo, setTempSelectZoo] = useState([]);
  const [tempSelectZooName, setTempSelectZooName] = useState([]);
  const [tempSelectEnv, setTempSelectEnv] = useState([]);
  const [tempSelectEnvName, setTempSelectEnvName] = useState([]);
  const [tempSelectUser, setTempSelectUser] = useState([]);
  const [tempSelectUserName, setTempSelectUserName] = useState([]);
  const [tempSelectWetMarket, setTempSelectWetMarket] = useState([]);
  const [tempSelectWetMarketName, setTempSelectWetMarketName] = useState([]);

  
  const togglerZoo = () => {
    setIsZooMenu(!isZooMenu);
    if (isOrgMenu) {
      setIsOrgMenu(!isOrgMenu);
    }
  };

  const togglerOrg = () => {
    setIsOrgMenu(!isOrgMenu);
    if (isZooMenu) {
      setIsZooMenu(!isZooMenu);
    }
  };

  const togglerEnv = () => {
    setIsEnvMenu(!isEnvMenu);
    if (isFriendMenu) {
      setIsFriendMenu(!isFriendMenu);
    }
  };
  const togglerFriend = () => {
    setIsFriendMenu(!isFriendMenu);
    if (isEnvMenu) {
      setIsEnvMenu(!isEnvMenu);
    }
  };

  //  for toggle modals
  const toggleSpeciesAndCategories = () => {
    setshowSpeciesAndCategories(!showSpeciesAndCategories);
   
  };
  const toggleRegion = () => {
    setShowRegion(!showRegion);
  };
  const toggleWetMarket = () => {
    setShowWetMarket(!showWetMarket);
  };

  const toggleWhoToFollow = () => {
    setShowWhoToFollow(!showWhoToFollow);
  };

  const toggleScience = () => {
    setShowScienceAndEducation(!showScienceAndEducation);
  };

  const toggleOrgAndZoo = () => {
    setShowOrganizationAndZoo(!showOrganizationAndZoo);
  };

  const [isEdit, setIsEdit] = useState(false);
  const [isViewAll, setIsViewAll] = useState(false);

  // for preference list data
  const [loadingMain, setLoadingMain] = useState(false);
  const [regionData, setRegionData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [speciesCatData, setSpeciesCatData] = useState(null);
  const [envData, setEnvData] = useState(null);
  const [orgData, setOrgData] = useState(null);
  const [wetMarketData, setWetMarketData] = useState(null);
  const [zooData, setZooData] = useState(null);
  const [scienceAndEducationData, setScienceAndEducationData] = useState(null);
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    setLoadingMain(true);
    props.getUsersPreferences("region", (res) => {
      if (res && res.status === 200) {
        setRegionData(res?.data?.data);
        setLoadingMain(false);
      } else {
        setLoadingMain(false);
        toast(
          <AlertError
            message={
              res && res.data && res.data.message
                ? res.data.message
                : "Something Went Wrong"
            }
          />
        );
      }
    });
  }, []);

  useEffect(() => {
    setLoadingMain(true);
    props.getUsersPreferences("species", (res) => {
      if (res && res.status === 200) {
        setSpeciesData(res?.data?.data);
        setLoadingMain(false);
      } else {
        setLoadingMain(false);
        toast(
          <AlertError
            message={
              res && res.data && res.data.message
                ? res.data.message
                : "Something Went Wrong"
            }
          />
        );
      }
    });
  }, []);

  useEffect(() => {
    setLoadingMain(true);
    props.getUsersPreferences("speciesCategory", (res) => {
      if (res && res.status === 200) {
        setSpeciesCatData(res?.data?.data);
        setLoadingMain(false);
      } else {
        setLoadingMain(false);
        toast(
          <AlertError
            message={
              res && res.data && res.data.message
                ? res.data.message
                : "Something Went Wrong"
            }
          />
        );
      }
    });
  }, []);

  useEffect(() => {
    setLoadingMain(true);
    props.getUsersPreferences("organization", (res) => {
      if (res && res.status === 200) {
        setOrgData(res?.data?.data);
        setLoadingMain(false);
      } else {
        setLoadingMain(false);
        toast(
          <AlertError
            message={
              res && res.data && res.data.message
                ? res.data.message
                : "Something Went Wrong"
            }
          />
        );
      }
    });
  }, []);

  useEffect(() => {
    setLoadingMain(true);
    props.getUsersPreferences("environmentalist", (res) => {
      if (res && res.status === 200) {
        setEnvData(res?.data?.data);
        setLoadingMain(false);
      } else {
        setLoadingMain(false);
        toast(
          <AlertError
            message={
              res && res.data && res.data.message
                ? res.data.message
                : "Something Went Wrong"
            }
          />
        );
      }
    });
  }, []);

  useEffect(() => {
    setLoadingMain(true);
    props.getUsersPreferences("wetMarket", (res) => {
      if (res && res.status === 200) {
        setWetMarketData(res?.data?.data);
        setLoadingMain(false);
      } else {
        setLoadingMain(false);
        toast(
          <AlertError
            message={
              res && res.data && res.data.message
                ? res.data.message
                : "Something Went Wrong"
            }
          />
        );
      }
    });
  }, []);

  useEffect(() => {
    setLoadingMain(true);
    props.getUsersPreferences("scienceAndEducation", (res) => {
      if (res && res.status === 200) {
        setScienceAndEducationData(res?.data?.data);
        setLoadingMain(false);
      } else {
        setLoadingMain(false);
        toast(
          <AlertError
            message={
              res && res.data && res.data.message
                ? res.data.message
                : "Something Went Wrong"
            }
          />
        );
      }
    });
  }, []);

  useEffect(() => {
    setLoadingMain(true);
    props.getUsersPreferences("zoo", (res) => {
      if (res && res.status === 200) {
        setZooData(res?.data?.data);
        setLoadingMain(false);
      } else {
        setLoadingMain(false);
        toast(
          <AlertError
            message={
              res && res.data && res.data.message
                ? res.data.message
                : "Something Went Wrong"
            }
          />
        );
      }
    });
  }, []);

  useEffect(() => {
    setLoadingMain(true);
    props.getUsersPreferences("user", (res) => {
      if (res && res.status === 200) {
        setUserData(res?.data?.data);
        setLoadingMain(false);
      } else {
        setLoadingMain(false);
        toast(
          <AlertError
            message={
              res && res.data && res.data.message
                ? res.data.message
                : "Something Went Wrong"
            }
          />
        );
      }
    });
  }, []);

  return (
    <Accordion
      className="border-accordion accordion accordion-flush"
      id="accordionCategoryWidget"
      defaultActiveKey={["1"]}
    >
      <Accordion.Item className="accordion-item" id="two-tab-pane" eventKey="1">
        <Accordion.Button
          className="accordion-button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseWidgetOne"
          aria-expanded="true"
        >
          <div className="accordion-button-label">
            Major Categories of Species <br /> to Follow
            <span>({speciesData && speciesData.length})</span>
          </div>
        </Accordion.Button>
        <div
          id="collapseWidgetOne"
          className="accordion-collapse collapse show"
        >
          <Accordion.Body className="accordion-body">
            <div className="accor-edit-btn">
              <Link
                className="edit-green-btn"
                onClick={() => {
                  if (isViewAll) {
                    setIsViewAll(false);
                  }
                  setIsEdit(true);
                  toggleSpeciesAndCategories();
                  props.setShowRightMenu(false);
                }}
              >
                Edit
              </Link>
            </div>
            <ul className="border-accor-list">
              {speciesData && speciesData.length > 0
                ? speciesData.map((item, idx) => {
                    return (
                      idx < 5 && (
                        <li>
                          <a href="#">{item?.name}</a>
                        </li>
                      )
                    );
                  })
                : "Select Major Categories of Species to Follow"}
            </ul>
            {speciesData && speciesData.length > 0 ? (
              <div
                className="accor-view-all-btn"
                data-bs-toggle="collapse"
                data-bs-target=".multi-collapse"
                aria-expanded="false"
              >
                <button
                  type="button"
                  className="view-all-btn"
                  onClick={() => {
                    if (isEdit) {
                      setIsEdit(false);
                    }
                    setIsViewAll(true);
                    toggleSpeciesAndCategories();
                    props.setShowRightMenu(false);
                  }}
                >
                  View All
                </button>
              </div>
            ) : (
              ""
            )}
          </Accordion.Body>
        </div>
      </Accordion.Item>

      <Accordion.Item className="accordion-item" eventKey="2">
        <Accordion.Button
          className="accordion-button collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#collapseWidgetTwo"
          aria-expanded="false"
        >
          <div className="accordion-button-label">
            Science & Education to Follow
            <span>
              ( {scienceAndEducationData && scienceAndEducationData.length} )
            </span>
          </div>
        </Accordion.Button>
        <div
          id="collapseWidgetTwo"
          className="accordion-collapse collapse show"
        >
          <Accordion.Body className="accordion-body">
            <div className="accor-edit-btn">
              <Link
                className="edit-green-btn"
                onClick={() => {
                  setIsEdit(true);
                  if (isViewAll) {
                    setIsViewAll(false);
                  }
                  toggleScience();
                  props.setShowRightMenu(false);
                }}
              >
                Edit
              </Link>
            </div>
            <ul className="border-accor-list">
              {scienceAndEducationData && scienceAndEducationData.length > 0
                ? scienceAndEducationData.map(
                    (item, idx) =>
                      idx < 5 && (
                        <li>
                          <a href="#">{item?.name}</a>
                        </li>
                      )
                  )
                : "Select Science & Education to Follow"}
            </ul>
            {scienceAndEducationData && scienceAndEducationData.length > 0 ? (
              <div
                className="accor-view-all-btn"
                data-bs-toggle="collapse"
                data-bs-target=".multi-collapse2"
                aria-expanded="false"
              >
                <button
                  type="button"
                  className="view-all-btn"
                  onClick={() => {
                    setIsViewAll(true);
                    if (isEdit) {
                      setIsEdit(false);
                    }
                    toggleScience();
                    props.setShowRightMenu(false);
                  }}
                >
                  View All
                </button>
              </div>
            ) : (
              ""
            )}
          </Accordion.Body>
        </div>
      </Accordion.Item>
      <Accordion.Item className="accordion-item" eventKey="3">
        <Accordion.Button
          className="accordion-button collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#collapseWidgetThree"
          aria-expanded="false"
        >
          <div className="accordion-button-label">
            Organizations, Zoos and <br /> Wildlife Reserves to Follow
            <span>
              ({" "}
              {orgData ? orgData && orgData.length : zooData && zooData.length}{" "}
              )
            </span>
          </div>
        </Accordion.Button>
        <div
          id="collapseWidgetThree"
          className="accordion-collapse collapse show"
        >
          <Accordion.Body className="accordion-body">
            <div className="nav nav-tabs step-tabs" id="myTab1">
              <div className="nav-item">
                <div
                  onClick={togglerOrg}
                  className={isOrgMenu ? "nav-link active" : "nav-link"}
                  id="tabA-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#tabA-tab-pane"
                  aria-selected="true"
                >
                  Organizations
                </div>
              </div>
              <div className="nav-item">
                <div
                  onClick={togglerZoo}
                  className={isZooMenu ? "nav-link active" : "nav-link"}
                  id="tabB-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#tabB-tab-pane"
                  aria-selected="false"
                >
                  Zoos & Wildlife Reserves
                </div>
              </div>
            </div>
            <div className="tab-content" id="myTabContent">
              {isOrgMenu && (
                <div className="tab-pane fade show active" id="tabA-tab-pane">
                  <div className="accor-edit-btn">
                    <Link
                      className="edit-green-btn"
                      onClick={() => {
                        setIsEdit(true);
                        if (isViewAll) {
                          setIsViewAll(false);
                        }
                        toggleOrgAndZoo();
                        props.setShowRightMenu(false);
                      }}
                    >
                      Edit
                    </Link>
                  </div>
                  <div className="accor-d-area">
                    {orgData && orgData.length > 0
                      ? orgData.map(
                          (item, idx) =>
                            idx < 5 && (
                              <div className="d-item">
                                <div className="accor-d-title">
                                  {item?.name}
                                </div>
                                <div className="accor-d-subtitle">
                                  {item?.headQuarter
                                    ? `${item?.headQuarter?.cityName} ${item?.headQuarter?.stateName}, ${item?.headQuarter?.countryName}`
                                    : ""}
                                </div>
                              </div>
                            )
                        )
                      : "Select Organizations, Zoos and Wildlife Reserves to Follow"}
                  </div>
                  {orgData && orgData.length > 0 ? (
                    <div
                      className="accor-view-all-btn"
                      data-bs-toggle="collapse"
                      data-bs-target=".multi-collapse3"
                      aria-expanded="false"
                    >
                      <button
                        type="button"
                        className="view-all-btn"
                        onClick={() => {
                          setIsViewAll(true);
                          if (isEdit) {
                            setIsEdit(false);
                          }
                          toggleOrgAndZoo();
                          props.setShowRightMenu(false);
                        }}
                      >
                        View All
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
              {isZooMenu && (
                <div className="tab-pane fade show active" id="tabB-tab-pane">
                  <div className="accor-edit-btn">
                    <Link
                      className="edit-green-btn"
                      onClick={() => {
                        setIsEdit(true);
                        if (isViewAll) {
                          setIsViewAll(false);
                        }
                        toggleOrgAndZoo();
                        props.setShowRightMenu(false);
                      }}
                    >
                      Edit
                    </Link>
                  </div>
                  <div className="accor-d-area">
                    {zooData && zooData.length > 0
                      ? zooData.map(
                          (item, idx) =>
                            idx < 5 && (
                              <div className="d-item">
                                <div className="accor-d-title">
                                  {item?.name}
                                </div>
                                <div className="accor-d-subtitle">
                                  {item?.headQuarter
                                    ? `${item?.headQuarter?.cityName} ${item?.headQuarter?.stateName}, ${item?.headQuarter?.countryName}`
                                    : ""}
                                </div>
                              </div>
                            )
                        )
                      : "Select Organizations, Zoos and Wildlife Reserves to Follow"}
                  </div>
                  {zooData && zooData.length > 0 ? (
                    <div
                      className="accor-view-all-btn"
                      data-bs-toggle="collapse"
                      data-bs-target=".multi-collapse4"
                      aria-expanded="false"
                    >
                      <button
                        type="button"
                        className="view-all-btn"
                        onClick={() => {
                          setIsViewAll(true);
                          if (isEdit) {
                            setIsEdit(false);
                          }
                          toggleOrgAndZoo();
                          props.setShowRightMenu(false);
                        }}
                      >
                        View All
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
          </Accordion.Body>
        </div>
      </Accordion.Item>
      <Accordion.Item eventKey="4" className="accordion-item">
        <Accordion.Button
          className="accordion-button collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#collapseWidgetFour"
          aria-expanded="false"
        >
          <div className="accordion-button-label">
            War and Threats to <br /> Environment to Follow
            <span>( {wetMarketData && wetMarketData.length} )</span>
          </div>
        </Accordion.Button>
        <div
          id="collapseWidgetFour"
          className="accordion-collapse collapse show"
        >
          <Accordion.Body className="accordion-body">
            <div className="accor-edit-btn">
              <Link
                className="edit-green-btn"
                onClick={() => {
                  if (isViewAll) {
                    setIsViewAll(false);
                  }
                  setIsEdit(true);
                  toggleWetMarket();
                  props.setShowRightMenu(false);
                }}
              >
                Edit
              </Link>
            </div>
            <ul className="border-accor-list">
              {wetMarketData && wetMarketData.length > 0
                ? wetMarketData.map(
                    (item, idx) =>
                      idx < 5 && (
                        <li>
                          <a href="#">{item?.name}</a>
                        </li>
                      )
                  )
                : "Select War and Threats to Environment to Follow"}
            </ul>
            {wetMarketData && wetMarketData.length > 0 ? (
              <div
                className="accor-view-all-btn"
                data-bs-toggle="collapse"
                data-bs-target=".multi-collapse5"
                aria-expanded="false"
              >
                <button
                  type="button"
                  className="view-all-btn"
                  onClick={() => {
                    setIsViewAll(true);
                    if (isEdit) {
                      setIsEdit(false);
                    }
                    toggleWetMarket();
                    props.setShowRightMenu(false);
                  }}
                >
                  View All
                </button>
              </div>
            ) : (
              ""
            )}
          </Accordion.Body>
        </div>
      </Accordion.Item>
      <Accordion.Item eventKey="5" className="accordion-item">
        <Accordion.Button
          className="accordion-button collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#collapseWidgetFive"
          aria-expanded="false"
        >
          <div className="accordion-button-label">
            Regions <br /> to Follow
            <span>({regionData && regionData.length})</span>
          </div>
        </Accordion.Button>
        <div
          id="collapseWidgetFive"
          className="accordion-collapse collapse show"
        >
          <Accordion.Body className="accordion-body">
            <div className="accor-edit-btn">
              <Link
                className="edit-green-btn"
                onClick={() => {
                  if (isViewAll) {
                    setIsViewAll(false);
                  }
                  setIsEdit(true);
                  toggleRegion();
                  props.setShowRightMenu(false);
                }}
              >
                Edit
              </Link>
            </div>
            <ul className="border-accor-list">
              {regionData && regionData.length > 0
                ? regionData.map(
                    (item, idx) =>
                      idx < 5 && (
                        <li>
                          <a href="#">
                            {item?.country === "US"
                              ? `${item.name}, ${item?.countryName}`
                              : item?.name}
                          </a>
                        </li>
                      )
                  )
                : "Select Regions to Follow"}
            </ul>
            {regionData && regionData.length > 0 ? (
              <div
                className="accor-view-all-btn"
                data-bs-toggle="collapse"
                data-bs-target=".multi-collapse"
                aria-expanded="false"
              >
                <button
                  type="button"
                  className="view-all-btn"
                  onClick={() => {
                    setIsViewAll(true);
                    if (isEdit) {
                      setIsEdit(false);
                    }
                    toggleRegion();
                    props.setShowRightMenu(false);
                  }}
                >
                  View All
                </button>
              </div>
            ) : (
              ""
            )}
          </Accordion.Body>
        </div>
      </Accordion.Item>

      <Accordion.Item eventKey="6" className="accordion-item">
        <Accordion.Button
          className="accordion-button collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#collapseWidgetSix"
          aria-expanded="false"
        >
          <div className="accordion-button-label">
            Biologists and Friend <br />s to Follow
            <span>
              ({" "}
              {envData
                ? envData && envData.length
                : userData && userData.length}{" "}
              )
            </span>
          </div>
        </Accordion.Button>
        <div
          id="collapseWidgetSix"
          className="accordion-collapse collapse show"
        >
          <Accordion.Body className="accordion-body">
            <div className="nav nav-tabs step-tabs" id="myTab2">
              <div className="nav-item">
                <div
                  onClick={togglerEnv}
                  className={isEnvMenu ? "nav-link active" : "nav-link"}
                  id="tab1"
                  data-bs-toggle="tab"
                  data-bs-target="#tab1-pane"
                  aria-selected="true"
                >
                  Biologists
                </div>
              </div>
              <div className="nav-item">
                <div
                  onClick={togglerFriend}
                  className={isFriendMenu ? "nav-link active" : "nav-link"}
                  id="tab2"
                  data-bs-toggle="tab"
                  data-bs-target="#tab2-pane"
                  aria-selected="false"
                >
                  Friends
                </div>
              </div>
            </div>
            <div className="tab-content" id="my2TabContent">
              {isEnvMenu && (
                <div className="tab-pane fade show active" id="tab1-pane">
                  <div className="accor-edit-btn">
                    <Link
                      className="edit-green-btn"
                      onClick={() => {
                        setIsEdit(true);
                        if (isViewAll) {
                          setIsViewAll(false);
                        }
                        toggleWhoToFollow();
                        props.setShowRightMenu(false);
                      }}
                    >
                      Edit
                    </Link>
                  </div>
                  <div className="tc-friends-list">
                    {envData && envData.length
                      ? envData.map(
                          (item, idx) =>
                            idx < 5 && (
                              <div className="tc-friends-item">
                                <div className="tc-friends-row d-flex flex-wrap align-items-center justify-content-between">
                                  <div className="friends-list d-flex flex-wrap align-items-center">
                                    <div className="friends-img-box">
                                      <img
                                        src={
                                          item?.coverImage?.original
                                            ? process.env.REACT_APP_MEDIA +
                                              item?.coverImage?.original
                                            : ""
                                        }
                                        alt="frand img 03"
                                      />
                                    </div>
                                    <div className="friends-text-box">
                                      {item?.name}
                                    </div>
                                  </div>
                                  <div className="tc-friends-btn">
                                    <Link className="btn btn-default btn-block">
                                      Follow
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            )
                        )
                      : "Select Biologists and Friend to Follow"}
                  </div>
                  {envData && envData.length > 0 ? (
                    <div
                      className="accor-view-all-btn"
                      data-bs-toggle="collapse"
                      data-bs-target=".multi-collapse"
                      aria-expanded="false"
                    >
                      <button
                        type="button"
                        className="view-all-btn"
                        onClick={() => {
                          setIsViewAll(true);
                          if (isEdit) {
                            setIsEdit(false);
                          }
                          toggleWhoToFollow();
                          props.setShowRightMenu(false);
                        }}
                      >
                        Show more
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}

              {isFriendMenu && (
                <div className="tab-pane fade show active" id="tab2-pane">
                  <div className="accor-edit-btn">
                    <Link
                      className="edit-green-btn"
                      onClick={() => {
                        setIsEdit(true);
                        if (isViewAll) {
                          setIsViewAll(false);
                        }
                        toggleWhoToFollow();
                        props.setShowRightMenu(false);
                      }}
                    >
                      Edit
                    </Link>
                  </div>
                  <div className="tc-friends-list">
                    {userData && userData.length > 0
                      ? userData.map(
                          (item, idx) =>
                            idx < 5 && (
                              <div className="tc-friends-item">
                                <div className="tc-friends-row d-flex flex-wrap align-items-center justify-content-between">
                                  <div className="friends-list d-flex flex-wrap align-items-center">
                                    <div className="friends-img-box">
                                      <img
                                        src={
                                          item?.followingId?.profilePicture
                                            ?.original
                                            ? process.env.REACT_APP_MEDIA +
                                              item?.followingId?.profilePicture
                                                ?.original
                                            : ""
                                        }
                                        alt="frand img 03"
                                      />
                                    </div>
                                    <div className="friends-text-box caps-text">
                                      {item?.followingId &&
                                        item?.followingId.firstName}{" "}
                                      {item?.followingId &&
                                        item?.followingId.lastName}
                                    </div>
                                  </div>
                                  <div className="tc-friends-btn">
                                    <a
                                      href="#"
                                      className="btn btn-default btn-block"
                                    >
                                      Follow
                                    </a>
                                  </div>
                                </div>
                              </div>
                            )
                        )
                      : "Select Biologists and Friend to Follow"}
                  </div>
                  {userData && userData.length > 0 ? (
                    <div
                      className="accor-view-all-btn"
                      data-bs-toggle="collapse"
                      data-bs-target=".multi-collapse6"
                      aria-expanded="false"
                    >
                      <button
                        type="button"
                        className="view-all-btn"
                        onClick={() => {
                          setIsViewAll(true);
                          if (isEdit) {
                            setIsEdit(false);
                          }
                          toggleWhoToFollow();
                          props.setShowRightMenu(false);
                        }}
                      >
                        Show more
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
          </Accordion.Body>
        </div>
      </Accordion.Item>

      <Accordion.Item eventKey="7" className="accordion-item">
        <Accordion.Button
          className="accordion-button collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#collapseWidgetSeven"
          aria-expanded="false"
        >
          <div className="accordion-button-label">
            Suggested Users<span>( 15 )</span>
          </div>
        </Accordion.Button>
        <div
          id="collapseWidgetSeven"
          className="accordion-collapse collapse show"
        >
          <Accordion.Body className="accordion-body">
            <div className="accor-edit-btn">
              <a href="#" className="edit-green-btn">
                Edit
              </a>
            </div>
            <div className="tc-friends-list">
              <div className="tc-friends-item">
                <div className="tc-friends-row d-flex flex-wrap align-items-center justify-content-between">
                  <div className="friends-list d-flex flex-wrap align-items-center">
                    <div className="friends-img-box">
                      <img
                        src="include/images/image-u-1.jpg"
                        alt="frand img 03"
                      />
                    </div>
                    <div className="friends-text-box">Tatiana Aminoff</div>
                  </div>
                  <div className="tc-friends-btn">
                    <a href="#" className="btn btn-default btn-block">
                      Follow
                    </a>
                  </div>
                </div>
              </div>
              <div className="tc-friends-item">
                <div className="tc-friends-row d-flex flex-wrap align-items-center justify-content-between">
                  <div className="friends-list d-flex flex-wrap align-items-center">
                    <div className="friends-img-box">
                      <img
                        src="include/images/image-u-2.jpg"
                        alt="frand img 03"
                      />
                    </div>
                    <div className="friends-text-box">Zain Siphron</div>
                  </div>
                  <div className="tc-friends-btn">
                    <a href="#" className="btn btn-default btn-block">
                      Follow
                    </a>
                  </div>
                </div>
              </div>
              <div className="tc-friends-item">
                <div className="tc-friends-row d-flex flex-wrap align-items-center justify-content-between">
                  <div className="friends-list d-flex flex-wrap align-items-center">
                    <div className="friends-img-box">
                      <img
                        src="include/images/image-u-3.jpg"
                        alt="frand img 03"
                      />
                    </div>
                    <div className="friends-text-box">Tiana Curtis</div>
                  </div>
                  <div className="tc-friends-btn">
                    <a href="#" className="btn btn-default btn-block">
                      Follow
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Accordion.Body>
        </div>
      </Accordion.Item>
      <SpeciesAndCategoryEditModal
        show={showSpeciesAndCategories}
        onHide={toggleSpeciesAndCategories}
        loading={loadingMain}
        setLoading={setLoadingMain}
        speciesData={speciesData}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        isViewAll={isViewAll}
        setIsViewAll={setIsViewAll}
        setSpeciesData={setSpeciesData}
        setSpeciesCatData={setSpeciesCatData}
        speciesCatData={speciesCatData}
        tempSelectSpeciesCategory={tempSelectSpeciesCategory}
        setTempSelectSpeciesCategory={setTempSelectSpeciesCategory}
        tempSelectSpecies={tempSelectSpecies}
        setTempSelectSpecies={setTempSelectSpecies}
        tempSelectSpeciesName={tempSelectSpeciesName}
        setTempSelectSpeciesName={setTempSelectSpeciesName}
      />

      <RegionEditModal
        show={showRegion}
        onHide={toggleRegion}
        loading={loadingMain}
        regionData={regionData}
        setLoading={setLoadingMain}
        isEdit={isEdit}
        isViewAll={isViewAll}
        setIsViewAll={setIsViewAll}
        setIsEdit={setIsEdit}
        setRegionData={setRegionData}
        tempSelectRegion={tempSelectRegion}
        setTempSelectRegion={setTempSelectRegion}
        tempSelectRegionName={tempSelectRegionName}
        setTempSelectRegionName={setTempSelectRegionName}
      />

      <WhoToFollowEditModal
        show={showWhoToFollow}
        onHide={toggleWhoToFollow}
        loading={loadingMain}
        setLoading={setLoadingMain}
        envData={envData}
        userData={userData}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        isViewAll={isViewAll}
        setIsViewAll={setIsViewAll}
        isEnvMenu={isEnvMenu}
        setIsEnvMenu={setIsEnvMenu}
        isFriendMenu={isFriendMenu}
        setIsFriendMenu={setIsFriendMenu}
        togglerEnv={togglerEnv}
        togglerFriend={togglerFriend}
        setEnvData={setEnvData}
        setUserData={setUserData}
        tempSelectEnv={tempSelectEnv}
        tempSelectEnvName={tempSelectEnvName}
        setTempSelectEnv={setTempSelectEnv}
        setTempSelectEnvName={setTempSelectEnvName}
        tempSelectUser={tempSelectUser}
        tempSelectUserName={tempSelectUserName}
        setTempSelectUser={setTempSelectUser}
        setTempSelectUserName={setTempSelectUserName}
      />
      <ScienceAndEducationEditModal
        show={showScienceAndEducation}
        onHide={toggleScience}
        loading={loadingMain}
        scienceAndEducationData={scienceAndEducationData}
        setLoading={setLoadingMain}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        isViewAll={isViewAll}
        setIsViewAll={setIsViewAll}
        setScienceAndEducationData={setScienceAndEducationData}
        tempSelectScience={tempSelectScience}
        tempSelectScienceName={tempSelectScienceName}
        setTempSelectScience={setTempSelectScience}
        setTempSelectScienceName={setTempSelectScienceName}
      />
      <OrganizationEditModal
        show={showOrganizationAndZoo}
        onHide={toggleOrgAndZoo}
        loading={loadingMain}
        setLoading={setLoadingMain}
        orgData={orgData}
        zooData={zooData}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        isViewAll={isViewAll}
        setIsViewAll={setIsViewAll}
        isOrgMenu={isOrgMenu}
        setIsOrgMenu={setIsOrgMenu}
        isZooMenu={isZooMenu}
        setIsZooMenu={setIsZooMenu}
        togglerOrg={togglerOrg}
        togglerZoo={togglerZoo}
        setOrgData={setOrgData}
        setZooData={setZooData}
        tempSelectOrg={tempSelectOrg}
        tempSelectOrgName={tempSelectOrgName}
        setTempSelectOrg={setTempSelectOrg}
        setTempSelectOrgName={setTempSelectOrgName}
        tempSelectZoo={tempSelectZoo}
        tempSelectZooName={tempSelectZooName}
        setTempSelectZoo={setTempSelectZoo}
        setTempSelectZooName={setTempSelectZooName}
      />

      <WetMarketEditModal
        show={showWetMarket}
        onHide={toggleWetMarket}
        loading={loadingMain}
        setLoading={setLoadingMain}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        isViewAll={isViewAll}
        setIsViewAll={setIsViewAll}
        wetMarketData={wetMarketData}
        setWetMarketData={setWetMarketData}
        tempSelectWetMarket={tempSelectWetMarket}
        tempSelectWetMarketName={tempSelectWetMarketName}
        setTempSelectWetMarket={setTempSelectWetMarket}
        setTempSelectWetMarketName={setTempSelectWetMarketName}
      />
    </Accordion>
  );
};

// export default RightFeedSidebar;
const mapDispatchToProps = (dispatch) => ({
  getUsersPreferences: (params, callback) =>
    dispatch(getUsersPreferences(params, callback)),
});

const mapStateToProps = (state) => ({
  getUser: getUser(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(RightFeedSidebar));
