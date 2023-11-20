import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import useCheckMobileScreen from "../../../common/customHooks/useCheckMobileScreen";
import {
  sideBarApisListings,
  getRegionList,
  getZooList,
  getOrganizationList,
  getEnvironmentalistList,
  getWetMarketList,
  getSpeciesCategoryList,
  getScienceAndEducationCategory,
} from "../../../store/sidebarApis";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getSlug } from "../../../utils/helperFunctions";

const LeftFeedSidebar = (props) => {
  const [loading, setLoading] = useState(false);
  const [usRegion, setUSRegion] = useState(null);
  const [otherRegion, setOtherRegion] = useState(null);
  const [speciesCategory, setSpeciesCategory] = useState(null);
  const [organizationData, setOrganizationData] = useState(null);
  const [environmantalistData, setEnvironmantalistData] = useState(null);
  const [zooData, setZooData] = useState(null);
  const [wetMarketData, setWetMarketData] = useState(null);
  const [scienceCategory, setScienceCategory] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    props.getRegionList({}, (res) => {
      if (res && res.status === 200) {
        const usRegions =
          res.data.data &&
          res.data.data.length > 0 &&
          res.data.data.filter((item) => item.country === "US");
        const otherRegions =
          res.data.data &&
          res.data.data.length > 0 &&
          res.data.data.filter((item) => item.country !== "US");

        setUSRegion(usRegions);
        setOtherRegion(otherRegions);
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    props.getSpeciesCategoryList({}, (res) => {
      if (res && res.status === 200) {
        setSpeciesCategory(res?.data?.data);
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    props.getOrganizationList({}, (res) => {
      if (res && res.status === 200) {
        setOrganizationData(res?.data?.data);
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    props.getEnvironmentalistList({}, (res) => {
      if (res && res.status === 200) {
        setEnvironmantalistData(res?.data?.data);
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    props.getZooList({}, (res) => {
      if (res && res.status === 200) {
        setZooData(res?.data?.data);
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    props.getScienceAndEducationCategory({}, (res) => {
      if (res && res.status === 200) {
        setScienceCategory(res?.data?.data);
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    props.getWetMarketList({}, (res) => {
      if (res && res.status === 200) {
        setWetMarketData(res?.data?.data);
      }
    });
  }, []);

  //   for region view all nd less
  const otherRegionData =
    otherRegion && otherRegion.length && otherRegion.map((item) => item);

  const [dividedRegionData, setDividedRegionData] = useState([]);
  const [poppedRegionData, setPoppedRegionData] = useState([]);
  const [handleViewAll, setHandleViewAll] = useState(false);
  const [handleViewLess, setHandleViewLess] = useState(false);

  const handleClick = () => {
    setHandleViewAll(!handleViewAll);
    setHandleViewLess(false);
    const divided = [];
    for (let i = 0; i < otherRegionData.length; i += 15) {
      divided.push(otherRegionData.slice(i, i + 15));
    }
    setDividedRegionData(divided);
  };

  const handleClickLess = () => {
    setHandleViewAll(false);
    setHandleViewLess(!handleViewLess);
    const popped = otherRegionData.splice(0, 14);
    setPoppedRegionData(popped);
  };

  //   for Species category view all nd less
  const speciesCat =
    speciesCategory &&
    speciesCategory.length &&
    speciesCategory.map((item) => item);

  const [dividedSpeciesCat, setDividedSpeciesCat] = useState([]);
  const [poppedSpeciesCat, setPoppedSpeciesCat] = useState([]);
  const [handleViewAllSpeciesCat, setHandleViewAllSpeciesCat] = useState(false);
  const [handleViewLessSpeciesCat, setHandleViewLessSpeciesCat] =
    useState(false);

  const handleClickSpecies = () => {
    setHandleViewAllSpeciesCat(!handleViewAllSpeciesCat);
    setHandleViewLessSpeciesCat(false);
    const divided = [];
    for (let i = 0; i < speciesCat.length; i += 15) {
      divided.push(speciesCat.slice(i, i + 15));
    }
    setDividedSpeciesCat(divided);
  };

  const handleClickLessSpecies = () => {
    setHandleViewAllSpeciesCat(false);
    setHandleViewLessSpeciesCat(!handleViewLessSpeciesCat);
    const popped = speciesCat.splice(0, 14);
    setPoppedSpeciesCat(popped);
  };

  //   for wet  view all nd less
  const WetData =
    wetMarketData && wetMarketData.length && wetMarketData.map((item) => item);

  const [dividedWet, setDividedWet] = useState([]);
  const [poppedWet, setPoppedWet] = useState([]);
  const [handleViewAllWet, setHandleViewAllWet] = useState(false);
  const [handleViewLessWet, setHandleViewLessWet] = useState(false);

  const handleClickWet = () => {
    setHandleViewAllWet(!handleViewAllWet);
    setHandleViewLessWet(false);
    const divided = [];
    for (let i = 0; i < WetData.length; i += 15) {
      divided.push(WetData.slice(i, i + 15));
    }
    setDividedWet(divided);
  };

  const handleClickLessWet = () => {
    setHandleViewAllWet(false);
    setHandleViewLessWet(!handleViewLessWet);
    const popped = WetData.splice(0, 14);
    setPoppedWet(popped);
  };

  //   for env  view all nd less
  const EnvData =
    environmantalistData &&
    environmantalistData.length &&
    environmantalistData.map((item) => item);

  const [dividedEnv, setDividedEnv] = useState([]);
  const [poppedEnv, setPoppedEnv] = useState([]);
  const [handleViewAllEnv, setHandleViewAllEnv] = useState(false);
  const [handleViewLessEnv, setHandleViewLessEnv] = useState(false);

  const handleClickEnv = () => {
    setHandleViewAllEnv(!handleViewAllEnv);
    setHandleViewLessEnv(false);
    const divided = [];
    for (let i = 0; i < EnvData.length; i += 15) {
      divided.push(EnvData.slice(i, i + 15));
    }
    setDividedEnv(divided);
  };

  const handleClickLessEnv = () => {
    setHandleViewAllEnv(false);
    setHandleViewLessEnv(!handleViewLessEnv);
    const popped = EnvData.splice(0, 14);
    setPoppedEnv(popped);
  };

  //   for Zoo  view all nd less
  const ZooData = zooData && zooData.length && zooData.map((item) => item);

  const [dividedZoo, setDividedZoo] = useState([]);
  const [poppedZoo, setPoppedZoo] = useState([]);
  const [handleViewAllZoo, setHandleViewAllZoo] = useState(false);
  const [handleViewLessZoo, setHandleViewLessZoo] = useState(false);

  const handleClickZoo = () => {
    setHandleViewAllZoo(!handleViewAllZoo);
    setHandleViewLessZoo(false);
    const divided = [];
    for (let i = 0; i < ZooData.length; i += 15) {
      divided.push(ZooData.slice(i, i + 15));
    }
    setDividedZoo(divided);
  };

  const handleClickLessZoo = () => {
    setHandleViewAllZoo(false);
    setHandleViewLessZoo(!handleViewLessZoo);
    const popped = ZooData.splice(0, 14);
    setPoppedZoo(popped);
  };

  //   for organization market view all nd less
  const orgData =
    organizationData &&
    organizationData.length &&
    organizationData.map((item) => item);

  const [dividedOrg, setDividedOrg] = useState([]);
  const [poppedOrg, setPoppedOrg] = useState([]);
  const [handleViewAllOrg, setHandleViewAllOrg] = useState(false);
  const [handleViewLessOrg, setHandleViewLessOrg] = useState(false);

  const handleClickOrg = () => {
    setHandleViewAllOrg(!handleViewAllOrg);
    setHandleViewLessOrg(false);
    const divided = [];
    for (let i = 0; i < orgData.length; i += 15) {
      divided.push(orgData.slice(i, i + 15));
    }
    setDividedOrg(divided);
  };

  const handleClickLessOrg = () => {
    setHandleViewAllOrg(false);
    setHandleViewLessOrg(!handleViewLessOrg);
    const popped = orgData.splice(0, 14);
    setPoppedOrg(popped);
  };

  //   for science category view all nd less
  const ScienceCatData =
    scienceCategory &&
    scienceCategory.length &&
    scienceCategory.map((item) => item);

  const [dividedScienceCat, setDividedScienceCat] = useState([]);
  const [poppedScienceCat, setPoppedScienceCat] = useState([]);
  const [handleViewAllScienceCat, setHandleViewAllScienceCat] = useState(false);
  const [handleViewLessScienceCat, setHandleViewLessScienceCat] =
    useState(false);

  const handleClickScienceCat = () => {
    setHandleViewAllScienceCat(!handleViewAllScienceCat);
    setHandleViewLessScienceCat(false);
    const divided = [];
    for (let i = 0; i < ScienceCatData.length; i += 15) {
      divided.push(ScienceCatData.slice(i, i + 15));
    }
    setDividedScienceCat(divided);
  };

  const handleClickLessScienceCat = () => {
    setHandleViewAllScienceCat(false);
    setHandleViewLessScienceCat(!handleViewLessScienceCat);
    const popped = ScienceCatData.splice(0, 14);
    setPoppedScienceCat(popped);
  };

  return (
    <Accordion
      className="accordion accordion-flush add-plus-minus-arrow"
      id="accordionCategory"
      defaultActiveKey={["1"]}
    >
      <div class="tab-intro-wrapper">
        <p>
          Research all 16,000 endangered animals by Species, Regions,
          Organizations, Zoos & Wildlife, Science & Education, and Globa
          Threats.
        </p>
      </div>
      {zooData && zooData.length > 0 && (
        <Accordion.Item
          className="accordion-item"
          id="two-tab-pane"
          eventKey="1"
        >
          <Accordion.Button
            className="accordion-button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseWidgetOne"
            aria-expanded="true"
          >
            Endangered Species
          </Accordion.Button>
          <div
            id="collapseWidgetOne"
            className="accordion-collapse collapse show"
          >
            <Accordion.Body className="accordion-body">
              <ul className="accordion-menu-list">
                {handleViewAllSpeciesCat ? (
                  <>
                    {dividedSpeciesCat.map((group, i) => (
                      <>
                        {group.map((item, idx) => (
                          <li key={idx}>
                            <Link
                              to={{
                                pathname: `/endangered-species`,
                                id: item?._id,
                                name: item.name,
                              }}
                              class="ei-category-box"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </>
                    ))}
                  </>
                ) : (
                  <>
                    {handleViewLessSpeciesCat ? (
                      <>
                        {poppedSpeciesCat.map((item, i) => (
                          <li key={i}>
                            <Link
                              to={{
                                pathname: `/endangered-species`,
                                id: item?._id,
                                name: item.name,
                              }}
                              class="ei-category-box"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </>
                    ) : (
                      <>
                        {speciesCategory &&
                          speciesCategory.length > 0 &&
                          speciesCategory.map(
                            (item, i) =>
                              i < 14 && (
                                <li>
                                  <Link
                                    to={{
                                      pathname: `/endangered-species`,
                                      id: item?._id,
                                      name: item.name,
                                    }}
                                    class="ei-category-box"
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              )
                          )}
                      </>
                    )}
                  </>
                )}

                {handleViewAllSpeciesCat ? (
                  <li>
                    <div
                      style={{ color: "#47AD1D" }}
                      id="viewLess"
                      class="ei-category-box view-all cursor-pointer"
                      onClick={handleClickLessSpecies}
                    >
                      View Less
                    </div>
                  </li>
                ) : (
                  <>
                    {speciesCategory && speciesCategory.length>15 && (
                      <li>
                        <div
                          style={{ color: "#47AD1D" }}
                          id="viewAll"
                          class="ei-category-box view-all cursor-pointer"
                          onClick={handleClickSpecies}
                        >
                          View All
                        </div>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </Accordion.Body>
          </div>
        </Accordion.Item>
      )}

      {otherRegion && otherRegion.length > 0 && (
        <Accordion.Item
          className="accordion-item"
          id="two-tab-pane"
          eventKey="2"
        >
          <Accordion.Button
            className="accordion-button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseWidgetOne"
            aria-expanded="true"
          >
            Regions
          </Accordion.Button>
          <div
            id="collapseWidgetOne"
            className="accordion-collapse collapse show"
          >
            <Accordion.Body className="accordion-body">
              <ul className="accordion-menu-list">
                <Accordion>
                  <Accordion.Item eventKey="999" className="accordion-item">
                    <Accordion.Button
                      className="accordion-button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseWidgetOne"
                      aria-expanded="true"
                    >
                      <span className="accor-font-us">United States</span>
                    </Accordion.Button>
                    <div
                      id="collapseWidgetOne"
                      className="accordion-collapse collapse show"
                    >
                      <Accordion.Body className="accordion-body padding-us-states">
                        {usRegion &&
                          usRegion.length > 0 &&
                          usRegion.map((item, i) => (
                            <li>
                              <Link
                                to={{
                                  pathname: `/regions/united-states/${getSlug(
                                    item?.name
                                  )}`,
                                  state: { id: item?._id },
                                }}
                                class="ei-category-box"
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        <li></li>
                      </Accordion.Body>
                    </div>
                  </Accordion.Item>
                </Accordion>

                {handleViewAll ? (
                  <>
                    {dividedRegionData.map((group, i) => (
                      <>
                        {group.map((item, idx) => (
                          <li key={idx}>
                            <Link
                              to={{
                                pathname: `/regions/${getSlug(item?.name)}`,
                                state: { id: item?._id },
                              }}
                              class="ei-category-box"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </>
                    ))}
                  </>
                ) : (
                  <>
                    {handleViewLess ? (
                      <>
                        {poppedRegionData.map((item, i) => (
                          <li key={i}>
                            <Link
                              to={{
                                pathname: `/regions/${getSlug(item?.name)}`,
                                state: { id: item?._id },
                              }}
                              class="ei-category-box"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </>
                    ) : (
                      <>
                        {otherRegion &&
                          otherRegion.length > 0 &&
                          otherRegion.map(
                            (item, i) =>
                              i < 14 && (
                                <li>
                                  <Link
                                    to={{
                                      pathname: `/regions/${getSlug(
                                        item?.name
                                      )}`,
                                      state: { id: item?._id },
                                    }}
                                    class="ei-category-box"
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              )
                          )}
                      </>
                    )}
                  </>
                )}

                {handleViewAll ? (
                  <li>
                    <div
                      style={{ color: "#47AD1D" }}
                      id="viewLess"
                      class="ei-category-box view-all cursor-pointer"
                      onClick={handleClickLess}
                    >
                      View Less
                    </div>
                  </li>
                ) : (
                  <>
                    {otherRegion && otherRegion.length> 15 && (
                      <li>
                        <div
                          style={{ color: "#47AD1D" }}
                          id="viewAll"
                          class="ei-category-box view-all cursor-pointer"
                          onClick={handleClick}
                        >
                          View All
                        </div>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </Accordion.Body>
          </div>
        </Accordion.Item>
      )}

      {organizationData && organizationData.length > 0 && (
        <Accordion.Item
          className="accordion-item"
          id="two-tab-pane"
          eventKey="3"
        >
          <Accordion.Button
            className="accordion-button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseWidgetOne"
            aria-expanded="true"
          >
            Organizations
          </Accordion.Button>
          <div
            id="collapseWidgetOne"
            className="accordion-collapse collapse show"
          >
            <Accordion.Body className="accordion-body">
              <ul className="accordion-menu-list">
                {handleViewAllOrg ? (
                  <>
                    {dividedOrg.map((group, i) => (
                      <>
                        {group.map((item, idx) => (
                          <li key={idx}>
                            <Link
                              to={{
                                pathname: `/organizations/${getSlug(
                                  item?.name
                                )}`,
                                state: { id: item?._id },
                              }}
                              class="ei-category-box"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </>
                    ))}
                  </>
                ) : (
                  <>
                    {handleViewLessOrg ? (
                      <>
                        {poppedOrg.map((item, i) => (
                          <li key={i}>
                            <Link
                              to={{
                                pathname: `/organizations/${getSlug(
                                  item?.name
                                )}`,
                                state: { id: item?._id },
                              }}
                              class="ei-category-box"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </>
                    ) : (
                      <>
                        {organizationData &&
                          organizationData.length > 0 &&
                          organizationData.map(
                            (item, i) =>
                              i < 14 && (
                                <li>
                                  <Link
                                    to={{
                                      pathname: `/organizations/${getSlug(
                                        item?.name
                                      )}`,
                                      state: { id: item?._id },
                                    }}
                                    class="ei-category-box"
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              )
                          )}
                      </>
                    )}
                  </>
                )}

                {handleViewAllOrg ? (
                  <li>
                    <div
                      style={{ color: "#47AD1D" }}
                      id="viewLess"
                      class="ei-category-box view-all cursor-pointer"
                      onClick={handleClickLessOrg}
                    >
                      View Less
                    </div>
                  </li>
                ) : (
                  <>
                    {organizationData && organizationData.length> 15 && (
                      <li>
                        <div
                          style={{ color: "#47AD1D" }}
                          id="viewAll"
                          class="ei-category-box view-all cursor-pointer"
                          onClick={handleClickOrg}
                        >
                          View All
                        </div>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </Accordion.Body>
          </div>
        </Accordion.Item>
      )}

      {environmantalistData && environmantalistData.length > 0 && (
        <Accordion.Item
          className="accordion-item"
          id="two-tab-pane"
          eventKey="4"
        >
          <Accordion.Button
            className="accordion-button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseWidgetOne"
            aria-expanded="true"
          >
            Environmentalists
          </Accordion.Button>
          <div
            id="collapseWidgetOne"
            className="accordion-collapse collapse show"
          >
            <Accordion.Body className="accordion-body">
              <ul className="accordion-menu-list">
                {handleViewAllEnv ? (
                  <>
                    {dividedEnv.map((group, i) => (
                      <>
                        {group.map((item, idx) => (
                          <li key={idx}>
                            <Link
                              to={{
                                pathname: `/environmentalists/${getSlug(
                                  item?.name
                                )}`,
                                state: { id: item?._id },
                              }}
                              class="ei-category-box"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </>
                    ))}
                  </>
                ) : (
                  <>
                    {handleViewLessEnv ? (
                      <>
                        {poppedEnv.map((item, i) => (
                          <li key={i}>
                            <Link
                              to={{
                                pathname: `/environmentalists/${getSlug(
                                  item?.name
                                )}`,
                                state: { id: item?._id },
                              }}
                              class="ei-category-box"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </>
                    ) : (
                      <>
                        {environmantalistData &&
                          environmantalistData.length > 0 &&
                          environmantalistData.map(
                            (item, i) =>
                              i < 14 && (
                                <li>
                                  <Link
                                    to={{
                                      pathname: `/environmentalists/${getSlug(
                                        item?.name
                                      )}`,
                                      state: { id: item?._id },
                                    }}
                                    class="ei-category-box"
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              )
                          )}
                      </>
                    )}
                  </>
                )}

                {handleViewAllEnv ? (
                  <li>
                    <div
                      style={{ color: "#47AD1D" }}
                      id="viewLess"
                      class="ei-category-box view-all cursor-pointer"
                      onClick={handleClickLessEnv}
                    >
                      View Less
                    </div>
                  </li>
                ) : (
                  <>
                    {environmantalistData && environmantalistData.length>15 && (
                      <li>
                        <div
                          style={{ color: "#47AD1D" }}
                          id="viewAll"
                          class="ei-category-box view-all cursor-pointer"
                          onClick={handleClickEnv}
                        >
                          View All
                        </div>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </Accordion.Body>
          </div>
        </Accordion.Item>
      )}

      {zooData && zooData.length > 0 && (
        <Accordion.Item
          className="accordion-item"
          id="two-tab-pane"
          eventKey="5"
        >
          <Accordion.Button
            className="accordion-button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseWidgetOne"
            aria-expanded="true"
          >
           Zoos & Wildlife Reserves
          </Accordion.Button>
          <div
            id="collapseWidgetOne"
            className="accordion-collapse collapse show"
          >
            <Accordion.Body className="accordion-body">
              <ul className="accordion-menu-list">
                {handleViewAllZoo ? (
                  <>
                    {dividedZoo.map((group, i) => (
                      <>
                        {group.map((item, idx) => (
                          <li key={idx}>
                            <a>{item.name}</a>
                          </li>
                        ))}
                      </>
                    ))}
                  </>
                ) : (
                  <>
                    {handleViewLessZoo ? (
                      <>
                        {poppedZoo.map((item, i) => (
                          <li key={i}>
                            <a>{item.name}</a>
                          </li>
                        ))}
                      </>
                    ) : (
                      <>
                        {zooData &&
                          zooData.length > 0 &&
                          zooData.map(
                            (item, i) =>
                              i < 14 && (
                                <li>
                                  <a>{item.name}</a>
                                </li>
                              )
                          )}
                      </>
                    )}
                  </>
                )}

                {handleViewAllZoo ? (
                  <li>
                    <div
                      style={{ color: "#47AD1D" }}
                      id="viewLess"
                      class="ei-category-box view-all cursor-pointer"
                      onClick={handleClickLessZoo}
                    >
                      View Less
                    </div>
                  </li>
                ) : (
                  <>
                    {zooData && zooData.length>15 && (
                      <li>
                        <div
                          style={{ color: "#47AD1D" }}
                          id="viewAll"
                          class="ei-category-box view-all cursor-pointer"
                          onClick={handleClickZoo}
                        >
                          View All
                        </div>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </Accordion.Body>
          </div>
        </Accordion.Item>
      )}

      {scienceCategory && scienceCategory.length > 0 && (
        <Accordion.Item
          className="accordion-item"
          id="two-tab-pane"
          eventKey="6"
        >
          <Accordion.Button
            className="accordion-button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseWidgetOne"
            aria-expanded="true"
          >
            Science & Education
          </Accordion.Button>
          <div
            id="collapseWidgetOne"
            className="accordion-collapse collapse show"
          >
            <Accordion.Body className="accordion-body">
              <ul className="accordion-menu-list">
                {handleViewAllScienceCat ? (
                  <>
                    {dividedScienceCat.map((group, i) => (
                      <>
                        {group.map((item, idx) => (
                          <li key={idx}>
                            <Link
                              to={{
                                pathname: `/science-education`,
                                id: item?._id,
                                name: item.name,
                              }}
                              class="ei-category-box"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </>
                    ))}
                  </>
                ) : (
                  <>
                    {handleViewLessScienceCat ? (
                      <>
                        {poppedScienceCat.map((item, i) => (
                          <li key={i}>
                            <Link
                              to={{
                                pathname: `/science-education`,
                                id: item?._id,
                                name: item.name,
                              }}
                              class="ei-category-box"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </>
                    ) : (
                      <>
                        {scienceCategory &&
                          scienceCategory.length > 0 &&
                          scienceCategory.map(
                            (item, i) =>
                              i < 14 && (
                                <li>
                                  <Link
                                    to={{
                                      pathname: `/science-education`,
                                      id: item?._id,
                                      name: item.name,
                                    }}
                                    class="ei-category-box"
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              )
                          )}
                      </>
                    )}
                  </>
                )}

                {handleViewAllScienceCat ? (
                  <li>
                    <div
                      style={{ color: "#47AD1D" }}
                      id="viewLess"
                      class="ei-category-box view-all cursor-pointer"
                      onClick={handleClickLessScienceCat}
                    >
                      View Less
                    </div>
                  </li>
                ) : (
                  <>
                    {scienceCategory && scienceCategory.length >15&& (
                      <li>
                        <div
                          style={{ color: "#47AD1D" }}
                          id="viewAll"
                          class="ei-category-box view-all cursor-pointer"
                          onClick={handleClickScienceCat}
                        >
                          View All
                        </div>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </Accordion.Body>
          </div>
        </Accordion.Item>
      )}

      {wetMarketData && wetMarketData.length > 0 && (
        <Accordion.Item
          className="accordion-item"
          id="two-tab-pane"
          eventKey="7"
        >
          <Accordion.Button
            className="accordion-button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseWidgetOne"
            aria-expanded="true"
          >
            War and Threats on the Environment
          </Accordion.Button>
          <div
            id="collapseWidgetOne"
            className="accordion-collapse collapse show"
          >
            <Accordion.Body className="accordion-body">
              <ul className="accordion-menu-list">
                {handleViewAllWet ? (
                  <>
                    {dividedWet.map((group, i) => (
                      <>
                        {group.map((item, idx) => (
                          <li key={idx}>
                            <a>{item.name}</a>
                          </li>
                        ))}
                      </>
                    ))}
                  </>
                ) : (
                  <>
                    {handleViewLessWet ? (
                      <>
                        {poppedWet.map((item, i) => (
                          <li key={i}>
                            <a>{item.name}</a>
                          </li>
                        ))}
                      </>
                    ) : (
                      <>
                        {wetMarketData &&
                          wetMarketData.length > 0 &&
                          wetMarketData.map(
                            (item, i) =>
                              i < 14 && (
                                <li>
                                  <a>{item.name}</a>
                                </li>
                              )
                          )}
                      </>
                    )}
                  </>
                )}

                {handleViewAllWet ? (
                  <li>
                    <div
                      style={{ color: "#47AD1D" }}
                      id="viewLess"
                      class="ei-category-box view-all cursor-pointer"
                      onClick={handleClickLessWet}
                    >
                      View Less
                    </div>
                  </li>
                ) : (
                  <>
                    {wetMarketData && wetMarketData.length >15&& (
                      <li>
                        <div
                          style={{ color: "#47AD1D" }}
                          id="viewAll"
                          class="ei-category-box view-all cursor-pointer"
                          onClick={handleClickWet}
                        >
                          View All
                        </div>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </Accordion.Body>
          </div>
        </Accordion.Item>
      )}
    </Accordion>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getSpeciesCategoryList: (params, callback) =>
    dispatch(getSpeciesCategoryList(params, callback)),
  getRegionList: (params, callback) =>
    dispatch(getRegionList(params, callback)),
  getWetMarketList: (params, callback) =>
    dispatch(getWetMarketList(params, callback)),
  getZooList: (params, callback) => dispatch(getZooList(params, callback)),
  getOrganizationList: (params, callback) =>
    dispatch(getOrganizationList(params, callback)),
  getEnvironmentalistList: (params, callback) =>
    dispatch(getEnvironmentalistList(params, callback)),
  getScienceAndEducationCategory: (params, callback) =>
    dispatch(getScienceAndEducationCategory(params, callback)),
});
const mapStateToProps = (state) => ({
  sideBarApisListings: sideBarApisListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(LeftFeedSidebar));
