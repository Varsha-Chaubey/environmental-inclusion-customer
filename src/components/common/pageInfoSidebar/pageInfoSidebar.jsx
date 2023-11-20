import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getSlug } from "../../../utils/helperFunctions";
import useCheckMobileScreen from "../../../common/customHooks/useCheckMobileScreen";

const PageInfoSidebar = (props) => {
  const otherData =
    props.otherRegion &&
    props.otherRegion.length &&
    props.otherRegion.map((item) => item);

  // news data
  const newsCatData =
    props.newsCategory &&
    props.newsCategory.length &&
    props.newsCategory.map((item) => item);

  // blog data

  const blogCatData =
    props.blogCategories &&
    props.blogCategories.length &&
    props.blogCategories.map((item) => item);

  // species data

  const speciesData =
    props.speciesCategories &&
    props.speciesCategories.length &&
    props.speciesCategories.map((item) => item);

  // organization Data

  const organizationData =
    props.organizationList &&
    props.organizationList.length &&
    props.organizationList.map((item) => item);

  //Environmentalist data

  const environmentalistData =
    props.environmentalistList &&
    props.environmentalistList.length &&
    props.environmentalistList.map((item) => item);

  // Zoo and wildlife reserves Data

  const zooAndWildLifeData =
    props.zooAndParksList &&
    props.zooAndParksList.length &&
    props.zooAndParksList.map((item) => item);

  // Science and education Data

  const scienceAndEducationData =
    props.scienceAndEducationCategory &&
    props.scienceAndEducationCategory.length &&
    props.scienceAndEducationCategory.map((item) => item);

  // Wet Market Data

  const wetMarketData =
    props.wetmarketList &&
    props.wetmarketList.length &&
    props.wetmarketList.map((item) => item);

  const [dividedData, setDividedData] = useState([]);
  const [poppedData, setPoppedData] = useState([]);
  const [handleViewAll, setHandleViewAll] = useState(false);
  const [handleViewLess, setHandleViewLess] = useState(false);

  const [dividedNewsData, setDividedNewsData] = useState([]);
  const [poppedNewsData, setPoppedNewsData] = useState([]);
  const [handleViewAllNews, setHandleViewAllNews] = useState(false);
  const [handleViewLessNews, setHandleViewLessNews] = useState(false);

  const [dividedBlogData, setDividedBlogData] = useState([]);
  const [poppedBlogData, setPoppedBlogData] = useState([]);
  const [handleViewAllBlog, setHandleViewAllBlog] = useState(false);
  const [handleViewLessBlog, setHandleViewLessBlog] = useState(false);

  const [dividedOrganizationData, setDividedOrganizationData] = useState([]);
  const [poppedOrganizationData, setPoppedOrganizationData] = useState([]);
  const [handleViewAllOrganization, setHandleViewAllOrganization] =
    useState(false);
  const [handleViewLessOrganization, setHandleViewLessOrganization] =
    useState(false);

  const [dividedEnvironmentalistData, setDividedEnvironmentalistData] =
    useState([]);
  const [poppedEnvironmentalistData, setPoppedEnvironmentalistData] = useState(
    []
  );
  const [handleViewAllEnvironmentalist, setHandleViewAllEnvironmentalist] =
    useState(false);
  const [handleViewLessEnvironmentalist, setHandleViewLessEnvironmentalist] =
    useState(false);

  const [dividedZooData, setDividedZooData] = useState([]);
  const [poppedZooData, setPoppedZooData] = useState([]);
  const [handleViewAllZoo, setHandleViewAllZoo] = useState(false);
  const [handleViewLessZoo, setHandleViewLessZoo] = useState(false);

  const [dividedWetMarketData, setDividedWetMarketData] = useState([]);
  const [poppedWetMarketData, setPoppedWetMarketData] = useState([]);
  const [handleViewAllWetMarket, setHandleViewAllWetMarket] = useState(false);
  const [handleViewLessWetMarket, setHandleViewLessWetMarket] = useState(false);

  const [dividedScienceData, setDividedScienceData] = useState([]);
  const [poppedScienceData, setPoppedScienceData] = useState([]);
  const [handleViewAllScience, setHandleViewAllScience] = useState(false);
  const [handleViewLessScience, setHandleViewLessScience] = useState(false);

  const [dividedSpeciesData, setDividedSpeciesData] = useState([]);
  const [poppedSpeciesData, setPoppedSpeciesData] = useState([]);
  const [handleViewAllSpecies, setHandleViewAllSpecies] = useState(false);
  const [handleViewLessSpecies, setHandleViewLessSpecies] = useState(false);

  const handleClick = () => {
    setHandleViewAll(!handleViewAll);
    setHandleViewLess(false);
    const divided = [];
    for (let i = 0; i < otherData.length; i += 15) {
      divided.push(otherData.slice(i, i + 15));
    }
    setDividedData(divided);
  };

  const handleClickLess = () => {
    setHandleViewAll(false);
    setHandleViewLess(!handleViewLess);
    const popped = otherData.splice(0, 14);
    setPoppedData(popped);
  };

  // for news category
  const handleClickNews = () => {
    setHandleViewAllNews(!handleViewAllNews);
    setHandleViewLessNews(false);
    const divided = [];

    for (let i = 0; i < newsCatData.length; i += 15) {
      divided.push(newsCatData.slice(i, i + 15));
    }
    setDividedNewsData(divided);
  };

  const handleClickLessNews = () => {
    setHandleViewAllNews(false);
    setHandleViewLessNews(!handleViewLessNews);
    const popped = newsCatData.splice(0, 14);
    setPoppedNewsData(popped);
  };

  // for Blog category
  const handleClickBlog = () => {
    setHandleViewAllBlog(!handleViewAllBlog);
    setHandleViewLessBlog(false);
    const divided = [];

    for (let i = 0; i < blogCatData.length; i += 15) {
      divided.push(blogCatData.slice(i, i + 15));
    }
    setDividedBlogData(divided);
  };

  const handleClickLessBlog = () => {
    setHandleViewAllBlog(false);
    setHandleViewLessBlog(!handleViewLessBlog);
    const popped = blogCatData.splice(0, 14);
    setPoppedBlogData(popped);
  };

  // for species
  const handleClickSpecies = () => {
    setHandleViewAllSpecies(!handleViewAllSpecies);
    setHandleViewLessSpecies(false);
    const divided = [];

    for (let i = 0; i < speciesData.length; i += 15) {
      divided.push(speciesData.slice(i, i + 15));
    }
    setDividedSpeciesData(divided);
  };

  const handleClickLessSpecies = () => {
    setHandleViewAllSpecies(false);
    setHandleViewLessSpecies(!handleViewLessSpecies);
    const popped = speciesData.splice(0, 14);
    setPoppedSpeciesData(popped);
  };

  // Organization

  const handleClickOrganization = () => {
    setHandleViewAllOrganization(!handleViewAllOrganization);
    setHandleViewLessOrganization(false);
    const divided = [];

    for (let i = 0; i < organizationData.length; i += 15) {
      divided.push(organizationData.slice(i, i + 15));
    }
    setDividedOrganizationData(divided);
  };

  const handleClickLessOrganization = () => {
    setHandleViewAllOrganization(false);
    setHandleViewLessOrganization(!handleViewLessOrganization);
    const popped = organizationData.splice(0, 14);
    setPoppedOrganizationData(popped);
  };

  // Environmentalist

  const handleClickEnvironmentalist = () => {
    setHandleViewAllEnvironmentalist(!handleViewAllEnvironmentalist);
    setHandleViewLessEnvironmentalist(false);
    const divided = [];

    for (let i = 0; i < environmentalistData.length; i += 15) {
      divided.push(environmentalistData.slice(i, i + 15));
    }
    setDividedEnvironmentalistData(divided);
  };

  const handleClickLessEnvironmentalist = () => {
    setHandleViewAllEnvironmentalist(false);
    setHandleViewLessEnvironmentalist(!handleViewLessEnvironmentalist);
    const popped = environmentalistData.splice(0, 14);
    setPoppedEnvironmentalistData(popped);
  };

  // Zoo

  const handleClickZoo = () => {
    setHandleViewAllZoo(!handleViewAllZoo);
    setHandleViewLessZoo(false);
    const divided = [];

    for (let i = 0; i < zooAndWildLifeData.length; i += 15) {
      divided.push(zooAndWildLifeData.slice(i, i + 15));
    }
    setDividedZooData(divided);
  };

  const handleClickLessZoo = () => {
    setHandleViewAllZoo(false);
    setHandleViewLessZoo(!handleViewLessZoo);
    const popped = zooAndWildLifeData.splice(0, 14);
    setPoppedZooData(popped);
  };

  // WetMarket

  const handleClickWet = () => {
    setHandleViewAllWetMarket(!handleViewAllWetMarket);
    setHandleViewLessWetMarket(false);
    const divided = [];

    for (let i = 0; i < wetMarketData.length; i += 15) {
      divided.push(wetMarketData.slice(i, i + 15));
    }
    setDividedWetMarketData(divided);
  };

  const handleClickLessWet = () => {
    setHandleViewAllWetMarket(false);
    setHandleViewLessWetMarket(!handleViewLessWetMarket);
    const popped = wetMarketData.splice(0, 14);
    setPoppedWetMarketData(popped);
  };

  // Science

  const handleClickScience = () => {
    setHandleViewAllScience(!handleViewAllScience);
    setHandleViewLessScience(false);
    const divided = [];

    for (let i = 0; i < scienceAndEducationData.length; i += 15) {
      divided.push(scienceAndEducationData.slice(i, i + 15));
    }
    setDividedScienceData(divided);
  };

  const handleClickLessScience = () => {
    setHandleViewAllScience(false);
    setHandleViewLessScience(!handleViewLessScience);
    const popped = scienceAndEducationData.splice(0, 14);
    setPoppedScienceData(popped);
  };

  const [isRegionMenu, setIsRegionMenu] = useState(false);
  const [isNewsMenu, setIsNewsMenu] = useState(false);
  const [isBlogMenu, setIsBlogMenu] = useState(false);
  const [isSpeciesMenu, setIsSpeciesMenu] = useState(true);
  const [isOrgMenu, setIsOrgMenu] = useState(false);
  const [isEnvirMenu, setIsEnvirMenu] = useState(false);
  const [isZooMenu, setIsZooMenu] = useState(false);
  const [isWetMenu, setIsWetMenu] = useState(false);
  const [isScienceMenu, setIsScienceMenu] = useState(false);

  const togglerRegion = () => {
    if (props.showMenu) {
      setIsRegionMenu(!isRegionMenu);
      if (isSpeciesMenu) {
        setIsSpeciesMenu(!isSpeciesMenu);
      }
      if (isNewsMenu) {
        setIsNewsMenu(!isNewsMenu);
      }
      if (isBlogMenu) {
        setIsBlogMenu(!isBlogMenu);
      }
      if (isOrgMenu) {
        setIsOrgMenu(!isOrgMenu);
      }
      if (isEnvirMenu) {
        setIsEnvirMenu(!isEnvirMenu);
      }
      if (isZooMenu) {
        setIsZooMenu(!isZooMenu);
      }
      if (isWetMenu) {
        setIsWetMenu(!isWetMenu);
      }
      if (isScienceMenu) {
        setIsScienceMenu(!isScienceMenu);
      }
      setIsRegionMenu(!isRegionMenu);
    }
  };
  const togglerNews = () => {
    if (props.showMenu) {
      if (isRegionMenu) {
        setIsRegionMenu(!isRegionMenu);
      }
      if (isSpeciesMenu) {
        setIsSpeciesMenu(!isSpeciesMenu);
      }

      if (isBlogMenu) {
        setIsBlogMenu(!isBlogMenu);
      }
      if (isOrgMenu) {
        setIsOrgMenu(!isOrgMenu);
      }
      if (isEnvirMenu) {
        setIsEnvirMenu(!isEnvirMenu);
      }
      if (isZooMenu) {
        setIsZooMenu(!isZooMenu);
      }
      if (isWetMenu) {
        setIsWetMenu(!isWetMenu);
      }
      if (isScienceMenu) {
        setIsScienceMenu(!isScienceMenu);
      }

      setIsNewsMenu(!isNewsMenu);
    }
  };
  const togglerBlog = () => {
    if (props.showMenu) {
      if (isRegionMenu) {
        setIsRegionMenu(!isRegionMenu);
      }
      if (isSpeciesMenu) {
        setIsSpeciesMenu(!isSpeciesMenu);
      }
      if (isNewsMenu) {
        setIsNewsMenu(!isNewsMenu);
      }
      if (isOrgMenu) {
        setIsOrgMenu(!isOrgMenu);
      }
      if (isEnvirMenu) {
        setIsEnvirMenu(!isEnvirMenu);
      }
      if (isZooMenu) {
        setIsZooMenu(!isZooMenu);
      }
      if (isWetMenu) {
        setIsWetMenu(!isWetMenu);
      }
      if (isScienceMenu) {
        setIsScienceMenu(!isScienceMenu);
      }
      setIsBlogMenu(!isBlogMenu);
    }
  };
  const togglerSpecies = () => {
    if (props.showMenu) {
      if (isRegionMenu) {
        setIsRegionMenu(!isRegionMenu);
      }

      if (isNewsMenu) {
        setIsNewsMenu(!isNewsMenu);
      }
      if (isBlogMenu) {
        setIsBlogMenu(!isBlogMenu);
      }
      if (isOrgMenu) {
        setIsOrgMenu(!isOrgMenu);
      }
      if (isEnvirMenu) {
        setIsEnvirMenu(!isEnvirMenu);
      }
      if (isZooMenu) {
        setIsZooMenu(!isZooMenu);
      }
      if (isWetMenu) {
        setIsWetMenu(!isWetMenu);
      }
      if (isScienceMenu) {
        setIsScienceMenu(!isScienceMenu);
      }
      setIsSpeciesMenu(!isSpeciesMenu);
    }
  };

  const togglerOrganization = () => {
    if (props.showMenu) {
      if (isRegionMenu) {
        setIsRegionMenu(!isRegionMenu);
      }

      if (isNewsMenu) {
        setIsNewsMenu(!isNewsMenu);
      }
      if (isBlogMenu) {
        setIsBlogMenu(!isBlogMenu);
      }
      if (isSpeciesMenu) {
        setIsSpeciesMenu(!isSpeciesMenu);
      }
      if (isEnvirMenu) {
        setIsEnvirMenu(!isEnvirMenu);
      }
      if (isZooMenu) {
        setIsZooMenu(!isZooMenu);
      }
      if (isWetMenu) {
        setIsWetMenu(!isWetMenu);
      }
      if (isScienceMenu) {
        setIsScienceMenu(!isScienceMenu);
      }
      setIsOrgMenu(!isOrgMenu);
    }
  };

  const togglerZoo = () => {
    if (props.showMenu) {
      if (isRegionMenu) {
        setIsRegionMenu(!isRegionMenu);
      }

      if (isNewsMenu) {
        setIsNewsMenu(!isNewsMenu);
      }
      if (isBlogMenu) {
        setIsBlogMenu(!isBlogMenu);
      }
      if (isSpeciesMenu) {
        setIsSpeciesMenu(!isSpeciesMenu);
      }
      if (isEnvirMenu) {
        setIsEnvirMenu(!isEnvirMenu);
      }
      if (isOrgMenu) {
        setIsOrgMenu(!isOrgMenu);
      }
      if (isWetMenu) {
        setIsWetMenu(!isWetMenu);
      }
      if (isScienceMenu) {
        setIsScienceMenu(!isScienceMenu);
      }
      setIsZooMenu(!isZooMenu);
    }
  };

  const togglerEnv = () => {
    if (props.showMenu) {
      if (isRegionMenu) {
        setIsRegionMenu(!isRegionMenu);
      }

      if (isNewsMenu) {
        setIsNewsMenu(!isNewsMenu);
      }
      if (isBlogMenu) {
        setIsBlogMenu(!isBlogMenu);
      }
      if (isSpeciesMenu) {
        setIsSpeciesMenu(!isSpeciesMenu);
      }
      if (isZooMenu) {
        setIsZooMenu(!isZooMenu);
      }
      if (isOrgMenu) {
        setIsOrgMenu(!isOrgMenu);
      }
      if (isWetMenu) {
        setIsWetMenu(!isWetMenu);
      }
      if (isScienceMenu) {
        setIsScienceMenu(!isScienceMenu);
      }
      setIsEnvirMenu(!isEnvirMenu);
    }
  };

  const togglerScience = () => {
    if (props.showMenu) {
      if (isRegionMenu) {
        setIsRegionMenu(!isRegionMenu);
      }

      if (isNewsMenu) {
        setIsNewsMenu(!isNewsMenu);
      }
      if (isBlogMenu) {
        setIsBlogMenu(!isBlogMenu);
      }
      if (isSpeciesMenu) {
        setIsSpeciesMenu(!isSpeciesMenu);
      }
      if (isZooMenu) {
        setIsZooMenu(!isZooMenu);
      }
      if (isOrgMenu) {
        setIsOrgMenu(!isOrgMenu);
      }
      if (isWetMenu) {
        setIsWetMenu(!isWetMenu);
      }
      if (isEnvirMenu) {
        setIsEnvirMenu(!isEnvirMenu);
      }
      setIsScienceMenu(!isScienceMenu);
    }
  };

  const togglerWet = () => {
    if (props.showMenu) {
      if (isRegionMenu) {
        setIsRegionMenu(!isRegionMenu);
      }

      if (isNewsMenu) {
        setIsNewsMenu(!isNewsMenu);
      }
      if (isBlogMenu) {
        setIsBlogMenu(!isBlogMenu);
      }
      if (isSpeciesMenu) {
        setIsSpeciesMenu(!isSpeciesMenu);
      }
      if (isZooMenu) {
        setIsZooMenu(!isZooMenu);
      }
      if (isOrgMenu) {
        setIsOrgMenu(!isOrgMenu);
      }
      if (isEnvirMenu) {
        setIsEnvirMenu(!isEnvirMenu);
      }
      if (isScienceMenu) {
        setIsScienceMenu(!isScienceMenu);
      }
      setIsWetMenu(!isWetMenu);
    }
  };

  const isMobile = useCheckMobileScreen();

  const selectData = (item) => {
    props.setSelectedSpeciesCategory(item?._id);
    props.setSelectedSpeciesCategoryName(item?.name);
  };

  const [selectedCategory, setSelectedCategory] = useState();


  return (
    <div class={`ei-category-accordion ${isMobile ? "accordion-height" : ""}`}>
      <div class="d-flex d-lg-block align-items-start">
        <ul
          class="nav nav-tabs ei-category-nav d-lg-none d-flex"
          id="myTab"
          role="tablist"
        >
          <li class="nav-item" role="presentation">
            <button
              onClick={togglerSpecies}
              className={
                isSpeciesMenu ? "nav-link active mobile-sub" : "nav-link active"
              }
              id="two-tab"
              data-bs-toggle="tab"
              data-bs-target="#two-tab-pane"
              type="button"
              role="tab"
              aria-controls="two-tab-pane"
              aria-selected="true"
            >
              Endangered Species
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              onClick={togglerRegion}
              className={
                isRegionMenu ? "nav-link active mobile-sub" : "nav-link active"
              }
              id="two-tab"
              data-bs-toggle="tab"
              data-bs-target="#two-tab-pane"
              type="button"
              role="tab"
              aria-controls="two-tab-pane"
              aria-selected="true"
            >
              Regions
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              onClick={togglerOrganization}
              className={
                isOrgMenu ? "nav-link active mobile-sub" : "nav-link active"
              }
              id="two-tab"
              data-bs-toggle="tab"
              data-bs-target="#two-tab-pane"
              type="button"
              role="tab"
              aria-controls="two-tab-pane"
              aria-selected="true"
            >
              Organizations
            </button>
          </li>

          <li class="nav-item" role="presentation">
            <button
              onClick={togglerEnv}
              className={
                isEnvirMenu ? "nav-link active mobile-sub" : "nav-link active"
              }
              id="two-tab"
              data-bs-toggle="tab"
              data-bs-target="#two-tab-pane"
              type="button"
              role="tab"
              aria-controls="two-tab-pane"
              aria-selected="true"
            >
              Environmentalists
            </button>
          </li>

          <li class="nav-item" role="presentation">
            <button
              onClick={togglerZoo}
              className={
                isZooMenu ? "nav-link active mobile-sub" : "nav-link active"
              }
              id="two-tab"
              data-bs-toggle="tab"
              data-bs-target="#two-tab-pane"
              type="button"
              role="tab"
              aria-controls="two-tab-pane"
              aria-selected="true"
            >
              Zoos & Wildlife Reserves
            </button>
          </li>

          <li class="nav-item" role="presentation">
            <button
              onClick={togglerScience}
              className={
                isScienceMenu ? "nav-link active mobile-sub" : "nav-link active"
              }
              id="two-tab"
              data-bs-toggle="tab"
              data-bs-target="#two-tab-pane"
              type="button"
              role="tab"
              aria-controls="two-tab-pane"
              aria-selected="true"
            >
              Science & Educations
            </button>
          </li>

          <li class="nav-item" role="presentation">
            <button
              onClick={togglerWet}
              className={
                isWetMenu ? "nav-link active mobile-sub" : "nav-link active"
              }
              id="two-tab"
              data-bs-toggle="tab"
              data-bs-target="#two-tab-pane"
              type="button"
              role="tab"
              aria-controls="two-tab-pane"
              aria-selected="true"
            >
              War on the Environment- Threats
            </button>
          </li>

          {/* <li class="nav-item" role="presentation">
            <button
              onClick={togglerNews}
              className={
                isNewsMenu ? "nav-link active mobile-sub" : "nav-link active"
              }
              id="eight-tab"
              data-bs-toggle="tab"
              data-bs-target="#eight-tab-pane"
              type="button"
              role="tab"
              aria-controls="eight-tab-pane"
              aria-selected="false"
            >
              News
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              onClick={togglerBlog}
              className={
                isBlogMenu ? "nav-link active mobile-sub" : "nav-link active"
              }
              id="nine-tab"
              data-bs-toggle="tab"
              data-bs-target="#nine-tab-pane"
              type="button"
              role="tab"
              aria-controls="nine-tab-pane"
              aria-selected="false"
            >
              Blogs
            </button>
          </li> */}
        </ul>
        <Accordion
          className="tab-content accordion ei-category-tab accordion-flush add-plus-minus-arrow"
          id="myTabContent"
          defaultActiveKey={["1"]}
        >
          {props?.showMenu === false && (
            <div class="tab-intro-wrapper">
              <p>
                Research all 16,000 endangered animals by Species, Regions,
                Organizations, Zoos & Wildlife, Science & Education, and Global
                Threats.
              </p>
            </div>
          )}
          {props.showMenu ? (
            <>
              {isSpeciesMenu && (
                <>
                  {props.speciesCategories &&
                    props.speciesCategories.length > 0 && (
                      <Accordion.Item
                        className="tab-pane fade accordion-item"
                        id="two-tab-pane"
                        eventKey="1"
                      >
                        <Accordion.Header
                          className="accordion-header d-lg-block d-none"
                          id="headingTwo"
                        >
                          Endangered Species
                        </Accordion.Header>

                        <Accordion.Body className="accordion-body">
                          <ul class="ei-category-list">
                            {handleViewAllSpecies ? (
                              <>
                                {dividedSpeciesData.map((group, i) => (
                                  <>
                                    {group.map((item, idx) => {
                                      
                                      return (
                                        <li class="ei-category-item " key={idx}>
                                          <Link
                                            style={{
                                              color:
                                                selectedCategory === item._id
                                                  ? "#47AD1D"
                                                  : "",
                                            }}
                                            class="ei-category-box cursor-pointer"
                                            onClick={() => {
                                              selectData(item);
                                              setSelectedCategory(item?._id);
                                            }}
                                          >
                                            {item.name}
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </>
                                ))}
                              </>
                            ) : (
                              <>
                                {handleViewLessSpecies ? (
                                  <>
                                    {poppedSpeciesData.map((item, i) => (
                                      <li class="ei-category-item" key={i}>
                                        <Link
                                          style={{
                                            color:
                                              selectedCategory === item._id
                                                ? "#47AD1D"
                                                : "",
                                          }}
                                          class="ei-category-box cursor-pointer"
                                          onClick={() => {
                                            selectData(item);
                                            setSelectedCategory(item?._id);
                                          }}
                                        >
                                          {item.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </>
                                ) : (
                                  <>
                                    {props.speciesCategories &&
                                      props.speciesCategories.length > 0 &&
                                      props.speciesCategories.map(
                                        (item, i) =>
                                          i < 15 && (
                                            <li class="ei-category-item">
                                              <Link
                                                style={{
                                                  color:
                                                    selectedCategory ===
                                                    item._id
                                                      ? "#47AD1D"
                                                      : "",
                                                }}
                                                class="ei-category-box cursor-pointer"
                                                onClick={() => {
                                                  selectData(item);
                                                  setSelectedCategory(
                                                    item?._id
                                                  );
                                                }}
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

                            {handleViewAllSpecies ? (
                              <li class="ei-category-item">
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
                                {props.speciesCategories &&
                                  props.speciesCategories.length > 15 && (
                                    <li class="ei-category-item">
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
                      </Accordion.Item>
                    )}
                </>
              )}
            </>
          ) : (
            <>
              {props.speciesCategories &&
                props.speciesCategories.length > 0 && (
                  <Accordion.Item
                    className="tab-pane fade accordion-item"
                    id="two-tab-pane"
                    eventKey="1"
                  >
                    <Accordion.Header
                      className="accordion-header d-lg-block d-none"
                      id="headingTwo"
                    >
                      Endangered Species
                    </Accordion.Header>

                    <Accordion.Body className="accordion-body">
                      <ul class="ei-category-list">
                        {handleViewAllSpecies ? (
                          <>
                            {dividedSpeciesData.map((group, i) => (
                              <>
                                {group.map((item, idx) => {
                                  return (
                                    <li class="ei-category-item " key={idx}>
                                      <Link
                                        style={{
                                          color:
                                            selectedCategory === item?._id
                                              ? "#47AD1D"
                                              : "",
                                        }}
                                        onClick={() => {
                                          selectData(item);
                                          setSelectedCategory(item?._id);
                                        }}
                                        class="ei-category-box cursor-pointer"
                                      >
                                        {item.name}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </>
                            ))}
                          </>
                        ) : (
                          <>
                            {handleViewLessSpecies ? (
                              <>
                                {poppedSpeciesData.map((item, i) => (
                                  <li class="ei-category-item " key={i}>
                                    <Link
                                      style={{
                                        color:
                                          selectedCategory === item?._id
                                            ? "#47AD1D"
                                            : "",
                                      }}
                                      onClick={() => {
                                        selectData(item);
                                        setSelectedCategory(item?._id);
                                      }}
                                      class="ei-category-box cursor-pointer"
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                ))}
                              </>
                            ) : (
                              <>
                                {props.speciesCategories &&
                                  props.speciesCategories.length > 0 &&
                                  props.speciesCategories.map((item, i) => {
                                    return (
                                      i < 15 && (
                                        <li class="ei-category-item">
                                          <Link
                                            style={{
                                              color:
                                                selectedCategory === item?._id
                                                  ? "#47AD1D"
                                                  : "",
                                            }}
                                            onClick={() => {
                                              selectData(item);
                                              setSelectedCategory(item?._id);
                                            }}
                                            class="ei-category-box cursor-pointer"
                                          >
                                            {item.name}
                                          </Link>
                                        </li>
                                      )
                                    );
                                  })}
                              </>
                            )}
                          </>
                        )}

                        {handleViewAllSpecies ? (
                          <li class="ei-category-item">
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
                            {props.speciesCategories &&
                              props.speciesCategories.length > 15 && (
                                <li class="ei-category-item">
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
                  </Accordion.Item>
                )}
            </>
          )}

          {props.showMenu ? (
            <>
              {isRegionMenu && (
                <>
                  {props.otherRegion && props.otherRegion.length > 0 && (
                    <Accordion.Item
                      className="tab-pane fade show active accordion-item"
                      id="two-tab-pane"
                      eventKey="2"
                    >
                      <Accordion.Header
                        className="accordion-header d-lg-block d-none"
                        id="headingTwo"
                      >
                        Regions
                      </Accordion.Header>
                      <Accordion.Body className="accordion-body">
                        {isRegionMenu && (
                          <span className="accor-font-us">United States</span>
                        )}
                        <ul class="ei-category-list">
                          <Accordion>
                            <Accordion.Item
                              eventKey="999"
                              className="ei-sideregion"
                            >
                              <Accordion.Header
                                bsPrefix="accor-font-us"
                                className="accordion-header d-lg-block d-none "
                              >
                                <span className="accor-font-us">
                                  United States
                                </span>
                              </Accordion.Header>
                              <Accordion.Body className="accordion-body padding-us-states">
                                {props.USRegions &&
                                  props.USRegions.length > 0 &&
                                  props.USRegions.map((item, i) => (
                                    <li class="ei-category-item">
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
                                <li class="ei-category-item"></li>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>

                          {handleViewAll ? (
                            <>
                              {dividedData.map((group, i) => (
                                <>
                                  {group.map((item, idx) => (
                                    <li class="ei-category-item" key={idx}>
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
                                  ))}
                                </>
                              ))}
                            </>
                          ) : (
                            <>
                              {handleViewLess ? (
                                <>
                                  {poppedData.map((item, i) => (
                                    <li class="ei-category-item" key={i}>
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
                                  ))}
                                </>
                              ) : (
                                <>
                                  {props.otherRegion &&
                                    props.otherRegion.length > 0 &&
                                    props.otherRegion.map(
                                      (item, i) =>
                                        i < 14 && (
                                          <li class="ei-category-item">
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
                            <li class="ei-category-item">
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
                              {props.otherRegion &&
                                props.otherRegion.length && (
                                  <li class="ei-category-item">
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
                    </Accordion.Item>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {props.otherRegion && props.otherRegion.length > 0 && (
                <Accordion.Item
                  className="tab-pane fade accordion-item"
                  id="two-tab-pane"
                  eventKey="2"
                >
                  <Accordion.Header
                    className="accordion-header d-lg-block d-none"
                    id="headingTwo"
                  >
                    Regions
                  </Accordion.Header>

                  <Accordion.Body className="accordion-body">
                    <ul class="ei-category-list">
                      <Accordion>
                        <Accordion.Item
                          eventKey="999"
                          className="ei-sideregion"
                        >
                          <Accordion.Header
                            bsPrefix="accor-font-us"
                            className="accordion-header d-lg-block d-none "
                          >
                            <span className="accor-font-us">
                              {" "}
                              United States
                            </span>
                          </Accordion.Header>
                          <Accordion.Body className="accordion-body padding-us-states">
                            {props.USRegions &&
                              props.USRegions.length > 0 &&
                              props.USRegions.map((item, i) => (
                                <li class="ei-category-item">
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
                            <li class="ei-category-item"></li>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>

                      {handleViewAll ? (
                        <>
                          {dividedData.map((group, i) => (
                            <>
                              {group.map((item, idx) => (
                                <li class="ei-category-item" key={idx}>
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
                              ))}
                            </>
                          ))}
                        </>
                      ) : (
                        <>
                          {handleViewLess ? (
                            <>
                              {poppedData.map((item, i) => (
                                <li class="ei-category-item" key={i}>
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
                              ))}
                            </>
                          ) : (
                            <>
                              {props.otherRegion &&
                                props.otherRegion.length > 0 &&
                                props.otherRegion.map(
                                  (item, i) =>
                                    i < 14 && (
                                      <li class="ei-category-item">
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
                        <li class="ei-category-item">
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
                          {props.otherRegion && props.otherRegion.length && (
                            <li class="ei-category-item">
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
                </Accordion.Item>
              )}
            </>
          )}

          {/* species */}

          {props.showMenu ? (
            <>
              {isOrgMenu && (
                <>
                  {props.organizationList &&
                    props.organizationList.length > 0 && (
                      <Accordion.Item
                        className="tab-pane fade accordion-item"
                        id="two-tab-pane"
                        eventKey="3"
                      >
                        <Accordion.Header
                          className="accordion-header d-lg-block d-none"
                          id="headingTwo"
                        >
                          Organizations
                        </Accordion.Header>

                        <Accordion.Body className="accordion-body">
                          <ul class="ei-category-list">
                            {handleViewAllOrganization ? (
                              <>
                                {dividedOrganizationData.map((group, i) => (
                                  <>
                                    {group.map((item, idx) => (
                                      <li class="ei-category-item" key={idx}>
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
                                {handleViewLessOrganization ? (
                                  <>
                                    {poppedOrganizationData.map((item, i) => (
                                      <li class="ei-category-item" key={i}>
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
                                    {props.organizationList &&
                                      props.organizationList.length > 0 &&
                                      props.organizationList.map(
                                        (item, i) =>
                                          i < 15 && (
                                            <li class="ei-category-item">
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

                            {handleViewAllOrganization ? (
                              <li class="ei-category-item">
                                <div
                                  style={{ color: "#47AD1D" }}
                                  id="viewLess"
                                  class="ei-category-box view-all cursor-pointer"
                                  onClick={handleClickLessOrganization}
                                >
                                  View Less
                                </div>
                              </li>
                            ) : (
                              <>
                                {props.organizationList &&
                                  props.organizationList.length > 15 && (
                                    <li class="ei-category-item">
                                      <div
                                        style={{ color: "#47AD1D" }}
                                        id="viewAll"
                                        class="ei-category-box view-all cursor-pointer"
                                        onClick={handleClickOrganization}
                                      >
                                        View All
                                      </div>
                                    </li>
                                  )}
                              </>
                            )}
                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>
                    )}
                </>
              )}
            </>
          ) : (
            <>
              {props.organizationList && props.organizationList.length > 0 && (
                <Accordion.Item
                  className="tab-pane fade accordion-item"
                  id="two-tab-pane"
                  eventKey="3"
                >
                  <Accordion.Header
                    className="accordion-header d-lg-block d-none"
                    id="headingTwo"
                  >
                    Organizations
                  </Accordion.Header>

                  <Accordion.Body className="accordion-body">
                    <ul class="ei-category-list">
                      {handleViewAllOrganization ? (
                        <>
                          {dividedOrganizationData.map((group, i) => (
                            <>
                              {group.map((item, idx) => (
                                <li class="ei-category-item" key={idx}>
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
                          {handleViewLessOrganization ? (
                            <>
                              {poppedOrganizationData.map((item, i) => (
                                <li class="ei-category-item" key={i}>
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
                              {props.organizationList &&
                                props.organizationList.length > 0 &&
                                props.organizationList.map(
                                  (item, i) =>
                                    i < 15 && (
                                      <li class="ei-category-item">
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

                      {handleViewAllOrganization ? (
                        <li class="ei-category-item">
                          <div
                            style={{ color: "#47AD1D" }}
                            id="viewLess"
                            class="ei-category-box view-all cursor-pointer"
                            onClick={handleClickLessOrganization}
                          >
                            View Less
                          </div>
                        </li>
                      ) : (
                        <>
                          {props.organizationList &&
                            props.organizationList.length > 15 && (
                              <li class="ei-category-item">
                                <div
                                  style={{ color: "#47AD1D" }}
                                  id="viewAll"
                                  class="ei-category-box view-all cursor-pointer"
                                  onClick={handleClickOrganization}
                                >
                                  View All
                                </div>
                              </li>
                            )}
                        </>
                      )}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              )}
            </>
          )}

          {props.showMenu ? (
            <>
              {isEnvirMenu && (
                <>
                  {props.environmentalistList &&
                    props.environmentalistList.length > 0 && (
                      <Accordion.Item
                        className="tab-pane fade accordion-item"
                        id="two-tab-pane"
                        eventKey="4"
                      >
                        <Accordion.Header
                          className="accordion-header d-lg-block d-none"
                          id="headingTwo"
                        >
                          Environmentalists
                        </Accordion.Header>

                        <Accordion.Body className="accordion-body">
                          <ul class="ei-category-list">
                            {handleViewAllEnvironmentalist ? (
                              <>
                                {dividedEnvironmentalistData.map((group, i) => (
                                  <>
                                    {group.map((item, idx) => (
                                      <li class="ei-category-item" key={idx}>
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
                                {handleViewLessEnvironmentalist ? (
                                  <>
                                    {poppedEnvironmentalistData.map(
                                      (item, i) => (
                                        <li class="ei-category-item" key={i}>
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
                                ) : (
                                  <>
                                    {props.environmentalistList &&
                                      props.environmentalistList.length > 0 &&
                                      props.environmentalistList.map(
                                        (item, i) =>
                                          i < 15 && (
                                            <li class="ei-category-item">
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

                            {handleViewAllEnvironmentalist ? (
                              <li class="ei-category-item">
                                <div
                                  style={{ color: "#47AD1D" }}
                                  id="viewLess"
                                  class="ei-category-box view-all cursor-pointer"
                                  onClick={handleClickLessEnvironmentalist}
                                >
                                  View Less
                                </div>
                              </li>
                            ) : (
                              <>
                                {props.environmentalistList &&
                                  props.environmentalistList.length > 15 && (
                                    <li class="ei-category-item">
                                      <div
                                        style={{ color: "#47AD1D" }}
                                        id="viewAll"
                                        class="ei-category-box view-all cursor-pointer"
                                        onClick={handleClickEnvironmentalist}
                                      >
                                        View All
                                      </div>
                                    </li>
                                  )}
                              </>
                            )}
                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>
                    )}
                </>
              )}
            </>
          ) : (
            <>
              {props.environmentalistList &&
                props.environmentalistList.length > 0 && (
                  <Accordion.Item
                    className="tab-pane fade accordion-item"
                    id="two-tab-pane"
                    eventKey="4"
                  >
                    <Accordion.Header
                      className="accordion-header d-lg-block d-none"
                      id="headingTwo"
                    >
                      Environmentalists
                    </Accordion.Header>

                    <Accordion.Body className="accordion-body">
                      <ul class="ei-category-list">
                        {handleViewAllEnvironmentalist ? (
                          <>
                            {dividedEnvironmentalistData.map((group, i) => (
                              <>
                                {group.map((item, idx) => (
                                  <li class="ei-category-item" key={idx}>
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
                            {handleViewLessEnvironmentalist ? (
                              <>
                                {poppedEnvironmentalistData.map((item, i) => (
                                  <li class="ei-category-item" key={i}>
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
                                {props.environmentalistList &&
                                  props.environmentalistList.length > 0 &&
                                  props.environmentalistList.map(
                                    (item, i) =>
                                      i < 15 && (
                                        <li class="ei-category-item">
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

                        {handleViewAllEnvironmentalist ? (
                          <li class="ei-category-item">
                            <div
                              style={{ color: "#47AD1D" }}
                              id="viewLess"
                              class="ei-category-box view-all cursor-pointer"
                              onClick={handleClickLessEnvironmentalist}
                            >
                              View Less
                            </div>
                          </li>
                        ) : (
                          <>
                            {props.environmentalistList &&
                              props.environmentalistList.length > 15 && (
                                <li class="ei-category-item">
                                  <div
                                    style={{ color: "#47AD1D" }}
                                    id="viewAll"
                                    class="ei-category-box view-all cursor-pointer"
                                    onClick={handleClickEnvironmentalist}
                                  >
                                    View All
                                  </div>
                                </li>
                              )}
                          </>
                        )}
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                )}
            </>
          )}

          {/* species */}

          {props.showMenu ? (
            <>
              {isZooMenu && (
                <>
                  {props.zooAndParksList &&
                    props.zooAndParksList.length > 0 && (
                      <Accordion.Item
                        className="tab-pane fade accordion-item"
                        id="two-tab-pane"
                        eventKey="5"
                      >
                        <Accordion.Header
                          className="accordion-header d-lg-block d-none"
                          id="headingTwo"
                        >
                          Zoos & Wildlife Reserves
                        </Accordion.Header>

                        <Accordion.Body className="accordion-body">
                          <ul class="ei-category-list">
                            {handleViewAllZoo ? (
                              <>
                                {dividedZooData.map((group, i) => (
                                  <>
                                    {group.map((item, idx) => (
                                      <li class="ei-category-item" key={idx}>
                                        <Link
                                          // to={{
                                          //   pathname: `/species`,
                                          //   id: item?._id,
                                          //   name: item.name,
                                          // }}
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
                                {handleViewLessZoo ? (
                                  <>
                                    {poppedZooData.map((item, i) => (
                                      <li class="ei-category-item" key={i}>
                                        <Link
                                          // to={{
                                          //   pathname: `/species`,
                                          //   id: item?._id,
                                          //   name: item.name,
                                          // }}
                                          class="ei-category-box"
                                        >
                                          {item.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </>
                                ) : (
                                  <>
                                    {props.zooAndParksList &&
                                      props.zooAndParksList.length > 0 &&
                                      props.zooAndParksList.map(
                                        (item, i) =>
                                          i < 15 && (
                                            <li class="ei-category-item">
                                              <Link
                                                // to={{
                                                //   pathname: `/species`,
                                                //   id: item?._id,
                                                //   name: item.name,
                                                // }}
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

                            {handleViewAllZoo ? (
                              <li class="ei-category-item">
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
                                {props.zooAndParksList &&
                                  props.zooAndParksList.length > 15 && (
                                    <li class="ei-category-item">
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
                      </Accordion.Item>
                    )}
                </>
              )}
            </>
          ) : (
            <>
              {props.zooAndParksList && props.zooAndParksList.length > 0 && (
                <Accordion.Item
                  className="tab-pane fade accordion-item"
                  id="two-tab-pane"
                  eventKey="5"
                >
                  <Accordion.Header
                    className="accordion-header d-lg-block d-none"
                    id="headingTwo"
                  >
                    Zoos & Wildlife Reserves
                  </Accordion.Header>

                  <Accordion.Body className="accordion-body">
                    <ul class="ei-category-list">
                      {handleViewAllZoo ? (
                        <>
                          {dividedZooData.map((group, i) => (
                            <>
                              {group.map((item, idx) => (
                                <li class="ei-category-item" key={idx}>
                                  <Link
                                    // to={{
                                    //   pathname: `/species`,
                                    //   id: item?._id,
                                    //   name: item.name,
                                    // }}
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
                          {handleViewLessZoo ? (
                            <>
                              {poppedZooData.map((item, i) => (
                                <li class="ei-category-item" key={i}>
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
                              {props.zooAndParksList &&
                                props.zooAndParksList.length > 0 &&
                                props.zooAndParksList.map(
                                  (item, i) =>
                                    i < 15 && (
                                      <li class="ei-category-item">
                                        <Link
                                          // to={{
                                          //   pathname: `/species`,
                                          //   id: item?._id,
                                          //   name: item.name,
                                          // }}
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

                      {handleViewAllZoo ? (
                        <li class="ei-category-item">
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
                          {props.zooAndParksList &&
                            props.zooAndParksList.length > 15 && (
                              <li class="ei-category-item">
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
                </Accordion.Item>
              )}
            </>
          )}

          {/* species */}

          {props.showMenu ? (
            <>
              {isScienceMenu && (
                <>
                  {props.scienceAndEducationCategory &&
                    props.scienceAndEducationCategory.length > 0 && (
                      <Accordion.Item
                        className="tab-pane fade accordion-item"
                        id="two-tab-pane"
                        eventKey="6"
                      >
                        <Accordion.Header
                          className="accordion-header d-lg-block d-none"
                          id="headingTwo"
                        >
                          Science & Educations
                        </Accordion.Header>

                        <Accordion.Body className="accordion-body">
                          <ul class="ei-category-list">
                            {handleViewAllScience ? (
                              <>
                                {dividedScienceData.map((group, i) => (
                                  <>
                                    {group.map((item, idx) => (
                                      <li class="ei-category-item" key={idx}>
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
                                {handleViewLessScience ? (
                                  <>
                                    {poppedScienceData.map((item, i) => (
                                      <li class="ei-category-item" key={i}>
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
                                    {props.scienceAndEducationCategory &&
                                      props.scienceAndEducationCategory.length >
                                        0 &&
                                      props.scienceAndEducationCategory.map(
                                        (item, i) =>
                                          i < 15 && (
                                            <li class="ei-category-item">
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

                            {handleViewAllScience ? (
                              <li class="ei-category-item">
                                <div
                                  style={{ color: "#47AD1D" }}
                                  id="viewLess"
                                  class="ei-category-box view-all cursor-pointer"
                                  onClick={handleClickLessScience}
                                >
                                  View Less
                                </div>
                              </li>
                            ) : (
                              <>
                                {props.scienceAndEducationCategory &&
                                  props.scienceAndEducationCategory.length >
                                    15 && (
                                    <li class="ei-category-item">
                                      <div
                                        style={{ color: "#47AD1D" }}
                                        id="viewAll"
                                        class="ei-category-box view-all cursor-pointer"
                                        onClick={handleClickScience}
                                      >
                                        View All
                                      </div>
                                    </li>
                                  )}
                              </>
                            )}
                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>
                    )}
                </>
              )}
            </>
          ) : (
            <>
              {props.scienceAndEducationCategory &&
                props.scienceAndEducationCategory.length > 0 && (
                  <Accordion.Item
                    className="tab-pane fade accordion-item"
                    id="two-tab-pane"
                    eventKey="6"
                  >
                    <Accordion.Header
                      className="accordion-header d-lg-block d-none"
                      id="headingTwo"
                    >
                      Science & Educations
                    </Accordion.Header>

                    <Accordion.Body className="accordion-body">
                      <ul class="ei-category-list">
                        {handleViewAllScience ? (
                          <>
                            {dividedScienceData.map((group, i) => (
                              <>
                                {group.map((item, idx) => (
                                  <li class="ei-category-item" key={idx}>
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
                            {handleViewLessScience ? (
                              <>
                                {poppedScienceData.map((item, i) => (
                                  <li class="ei-category-item" key={i}>
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
                                {props.scienceAndEducationCategory &&
                                  props.scienceAndEducationCategory.length >
                                    0 &&
                                  props.scienceAndEducationCategory.map(
                                    (item, i) =>
                                      i < 15 && (
                                        <li class="ei-category-item">
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

                        {handleViewAllScience ? (
                          <li class="ei-category-item">
                            <div
                              style={{ color: "#47AD1D" }}
                              id="viewLess"
                              class="ei-category-box view-all cursor-pointer"
                              onClick={handleClickLessScience}
                            >
                              View Less
                            </div>
                          </li>
                        ) : (
                          <>
                            {props.scienceAndEducationCategory &&
                              props.scienceAndEducationCategory.length > 15 && (
                                <li class="ei-category-item">
                                  <div
                                    style={{ color: "#47AD1D" }}
                                    id="viewAll"
                                    class="ei-category-box view-all cursor-pointer"
                                    onClick={handleClickScience}
                                  >
                                    View All
                                  </div>
                                </li>
                              )}
                          </>
                        )}
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                )}
            </>
          )}

          {/* species */}

          {props.showMenu ? (
            <>
              {isWetMenu && (
                <>
                  {props.wetmarketList && props.wetmarketList.length > 0 && (
                    <Accordion.Item
                      className="tab-pane fade accordion-item"
                      id="two-tab-pane"
                      eventKey="7"
                    >
                      <Accordion.Header
                        className="accordion-header d-lg-block d-none"
                        id="headingTwo"
                      >
                        War on the Environment- Threats
                      </Accordion.Header>

                      <Accordion.Body className="accordion-body">
                        <ul class="ei-category-list">
                          {handleViewAllWetMarket ? (
                            <>
                              {dividedWetMarketData.map((group, i) => (
                                <>
                                  {group.map((item, idx) => (
                                    <li class="ei-category-item" key={idx}>
                                      <Link
                                        // to={{
                                        //   pathname: `/species`,
                                        //   id: item?._id,
                                        //   name: item.name,
                                        // }}
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
                              {handleViewLessWetMarket ? (
                                <>
                                  {poppedWetMarketData.map((item, i) => (
                                    <li class="ei-category-item" key={i}>
                                      <Link
                                        // to={{
                                        //   pathname: `/species`,
                                        //   id: item?._id,
                                        //   name: item.name,
                                        // }}
                                        class="ei-category-box"
                                      >
                                        {item.name}
                                      </Link>
                                    </li>
                                  ))}
                                </>
                              ) : (
                                <>
                                  {props.wetmarketList &&
                                    props.wetmarketList.length > 0 &&
                                    props.wetmarketList.map(
                                      (item, i) =>
                                        i < 15 && (
                                          <li class="ei-category-item">
                                            <Link
                                              // to={{
                                              //   pathname: `/species`,
                                              //   id: item?._id,
                                              //   name: item.name,
                                              // }}
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

                          {handleViewAllWetMarket ? (
                            <li class="ei-category-item">
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
                              {props.wetmarketList &&
                                props.wetmarketList.length > 15 && (
                                  <li class="ei-category-item">
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
                    </Accordion.Item>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {props.wetmarketList && props.wetmarketList.length > 0 && (
                <Accordion.Item
                  className="tab-pane fade accordion-item"
                  id="two-tab-pane"
                  eventKey="7"
                >
                  <Accordion.Header
                    className="accordion-header d-lg-block d-none"
                    id="headingTwo"
                  >
                    War on the Environment- Threats
                  </Accordion.Header>

                  <Accordion.Body className="accordion-body">
                    <ul class="ei-category-list">
                      {handleViewAllWetMarket ? (
                        <>
                          {dividedWetMarketData.map((group, i) => (
                            <>
                              {group.map((item, idx) => (
                                <li class="ei-category-item" key={idx}>
                                  <Link
                                    // to={{
                                    //   pathname: `/species`,
                                    //   id: item?._id,
                                    //   name: item.name,
                                    // }}
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
                          {handleViewLessWetMarket ? (
                            <>
                              {poppedWetMarketData.map((item, i) => (
                                <li class="ei-category-item" key={i}>
                                  <Link
                                    // to={{
                                    //   pathname: `/species`,
                                    //   id: item?._id,
                                    //   name: item.name,
                                    // }}
                                    class="ei-category-box"
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </>
                          ) : (
                            <>
                              {props.wetmarketList &&
                                props.wetmarketList.length > 0 &&
                                props.wetmarketList.map(
                                  (item, i) =>
                                    i < 15 && (
                                      <li class="ei-category-item">
                                        <Link
                                          // to={{
                                          //   pathname: `/species`,
                                          //   id: item?._id,
                                          //   name: item.name,
                                          // }}
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

                      {handleViewAllWetMarket ? (
                        <li class="ei-category-item">
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
                          {props.wetmarketList &&
                            props.wetmarketList.length > 15 && (
                              <li class="ei-category-item">
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
                </Accordion.Item>
              )}
            </>
          )}

          {/* species-end */}
          {/* {props.showMenu ? (
            <>
              {isNewsMenu && (
                <>
                  {props.newsCategory && props.newsCategory.length > 0 && (
                    <Accordion.Item
                      className="tab-pane fade accordion-item"
                      id="two-tab-pane"
                      eventKey="11"
                    >
                      <Accordion.Header
                        className="accordion-header d-lg-block d-none"
                        id="headingTwo"
                      >
                        News
                      </Accordion.Header>

                      <Accordion.Body className="accordion-body">
                        <ul class="ei-category-list">
                          {handleViewAllNews ? (
                            <>
                              {dividedNewsData.map((group, i) => (
                                <>
                                  {group.map((item, idx) => (
                                    <li class="ei-category-item" key={idx}>
                                      <Link
                                        to={{
                                          pathname: `/news`,
                                          id: item._id,
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
                              {handleViewLessNews ? (
                                <>
                                  {poppedNewsData.map((item, i) => (
                                    <li class="ei-category-item" key={i}>
                                      <Link
                                        to={{
                                          pathname: `/news`,
                                          id: item._id,
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
                                  {props.newsCategory &&
                                    props.newsCategory.length > 0 &&
                                    props.newsCategory.map(
                                      (item, i) =>
                                        i < 15 && (
                                          <li class="ei-category-item">
                                            <Link
                                              to={{
                                                pathname: `/news`,
                                                id: item._id,
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

                          {handleViewAllNews ? (
                            <li class="ei-category-item">
                              <div
                                style={{ color: "#47AD1D" }}
                                id="viewLess"
                                class="ei-category-box view-all cursor-pointer"
                                onClick={handleClickLessNews}
                              >
                                View Less
                              </div>
                            </li>
                          ) : (
                            <>
                              {props.newsCategory &&
                                props.newsCategory.length > 15 && (
                                  <li class="ei-category-item">
                                    <div
                                      style={{ color: "#47AD1D" }}
                                      id="viewAll"
                                      class="ei-category-box view-all cursor-pointer"
                                      onClick={handleClickNews}
                                    >
                                      View All
                                    </div>
                                  </li>
                                )}
                            </>
                          )}
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {props.newsCategory && props.newsCategory.length > 0 && (
                <Accordion.Item
                  className="tab-pane fade accordion-item"
                  id="two-tab-pane"
                  eventKey="11"
                >
                  <Accordion.Header
                    className="accordion-header d-lg-block d-none"
                    id="headingTwo"
                  >
                    News
                  </Accordion.Header>

                  <Accordion.Body className="accordion-body">
                    <ul class="ei-category-list">
                      {handleViewAllNews ? (
                        <>
                          {dividedNewsData.map((group, i) => (
                            <>
                              {group.map((item, idx) => (
                                <li class="ei-category-item" key={idx}>
                                  <Link
                                    to={{
                                      pathname: `/news`,
                                      id: item._id,
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
                          {handleViewLessNews ? (
                            <>
                              {poppedNewsData.map((item, i) => (
                                <li class="ei-category-item" key={i}>
                                  <Link
                                    to={{
                                      pathname: `/news`,
                                      id: item._id,
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
                              {props.newsCategory &&
                                props.newsCategory.length > 0 &&
                                props.newsCategory.map(
                                  (item, i) =>
                                    i < 15 && (
                                      <li class="ei-category-item">
                                        <Link
                                          to={{
                                            pathname: `/news`,
                                            id: item._id,
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

                      {handleViewAllNews ? (
                        <li class="ei-category-item">
                          <div
                            style={{ color: "#47AD1D" }}
                            id="viewLess"
                            class="ei-category-box view-all cursor-pointer"
                            onClick={handleClickLessNews}
                          >
                            View Less
                          </div>
                        </li>
                      ) : (
                        <>
                          {props.newsCategory &&
                            props.newsCategory.length > 15 && (
                              <li class="ei-category-item">
                                <div
                                  style={{ color: "#47AD1D" }}
                                  id="viewAll"
                                  class="ei-category-box view-all cursor-pointer"
                                  onClick={handleClickNews}
                                >
                                  View All
                                </div>
                              </li>
                            )}
                        </>
                      )}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              )}
            </>
          )} */}

          {/* {props.showMenu ? (
            <>
              {isBlogMenu && (
                <>
                  {props.blogCategories && props.blogCategories.length > 0 && (
                    <Accordion.Item
                      className="tab-pane fade accordion-item"
                      id="two-tab-pane"
                      eventKey="12"
                    >
                      <Accordion.Header
                        className="accordion-header d-lg-block d-none"
                        id="headingTwo"
                      >
                        Blogs
                      </Accordion.Header>

                      <Accordion.Body className="accordion-body">
                        <ul class="ei-category-list">
                          {handleViewAllBlog ? (
                            <>
                              {dividedBlogData.map((group, i) => (
                                <>
                                  {group.map((item, idx) => (
                                    <li class="ei-category-item" key={idx}>
                                      <Link
                                        to={{
                                          pathname: `/blog`,
                                          _id: item._id,
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
                              {handleViewLessBlog ? (
                                <>
                                  {poppedBlogData.map((item, i) => (
                                    <li class="ei-category-item" key={i}>
                                      <Link
                                        to={{
                                          pathname: `/blog`,
                                          _id: item._id,
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
                                  {props.blogCategories &&
                                    props.blogCategories.length > 0 &&
                                    props.blogCategories.map(
                                      (item, i) =>
                                        i < 15 && (
                                          <li class="ei-category-item">
                                            <Link
                                              to={{
                                                pathname: `/blog`,
                                                _id: item._id,
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

                          {handleViewAllBlog ? (
                            <li class="ei-category-item">
                              <div
                                style={{ color: "#47AD1D" }}
                                id="viewLess"
                                class="ei-category-box view-all cursor-pointer"
                                onClick={handleClickLessBlog}
                              >
                                View Less
                              </div>
                            </li>
                          ) : (
                            <>
                              {props.blogCategories &&
                                props.blogCategories.length > 15 && (
                                  <li class="ei-category-item">
                                    <div
                                      id="viewAll"
                                      class="ei-category-box view-all cursor-pointer"
                                      style={{ color: "#47AD1D" }}
                                      onClick={handleClickBlog}
                                    >
                                      View All
                                    </div>
                                  </li>
                                )}
                            </>
                          )}
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {props.blogCategories && props.blogCategories.length > 0 && (
                <Accordion.Item
                  className="tab-pane fade accordion-item"
                  id="two-tab-pane"
                  eventKey="12"
                >
                  <Accordion.Header
                    className="accordion-header d-lg-block d-none"
                    id="headingTwo"
                  >
                    Blogs
                  </Accordion.Header>

                  <Accordion.Body className="accordion-body">
                    <ul class="ei-category-list">
                      {handleViewAllBlog ? (
                        <>
                          {dividedBlogData.map((group, i) => (
                            <>
                              {group.map((item, idx) => (
                                <li class="ei-category-item" key={idx}>
                                  <Link
                                    to={{
                                      pathname: `/blog`,
                                      _id: item._id,
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
                          {handleViewLessBlog ? (
                            <>
                              {poppedBlogData.map((item, i) => (
                                <li class="ei-category-item" key={i}>
                                  <Link
                                    to={{
                                      pathname: `/blog`,
                                      _id: item._id,
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
                              {props.blogCategories &&
                                props.blogCategories.length > 0 &&
                                props.blogCategories.map(
                                  (item, i) =>
                                    i < 15 && (
                                      <li class="ei-category-item">
                                        <Link
                                          to={{
                                            pathname: `/blog`,
                                            _id: item._id,
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

                      {handleViewAllBlog ? (
                        <li class="ei-category-item">
                          <div
                            style={{ color: "#47AD1D" }}
                            id="viewLess"
                            class="ei-category-box view-all cursor-pointer"
                            onClick={handleClickLessBlog}
                          >
                            View Less
                          </div>
                        </li>
                      ) : (
                        <>
                          {props.blogCategories &&
                            props.blogCategories.length > 15 && (
                              <li class="ei-category-item">
                                <div
                                  id="viewAll"
                                  class="ei-category-box view-all cursor-pointer"
                                  style={{ color: "#47AD1D" }}
                                  onClick={handleClickBlog}
                                >
                                  View All
                                </div>
                              </li>
                            )}
                        </>
                      )}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              )}
            </>
          )} */}
        </Accordion>
      </div>
    </div>
  );
};

export default PageInfoSidebar;
