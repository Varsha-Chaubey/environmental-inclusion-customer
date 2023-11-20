import React, { useState } from "react";
import PageLayout from "../../layout/PageLayout/pageLayout";
import { connect } from "react-redux";
import { getSpecies, speciesListings } from "../../store/species";
import { useEffect } from "react";
import ListingCard from "../../components/common/listingCard/listingCard";
import leftArrow from "../../include/images/pagination-left-arrow.svg";
import rightArrow from "../../include/images/pagination-right-arrow.svg";
import leftArrowGreen from "../../include/images/pagination-left-arrow-green.svg";
import rightArrowGreen from "../../include/images/pagination-right-arrow-green.svg";
import closeIcon from "../../include/images/close.svg";
import { Link } from "react-router-dom";
import {
  sideBarApisListings,
  getSpeciesList,
  getRegionList,
  getSpeciesCategoryList,
  getOrganizationList,
  getZooList,
  getWetMarketList,
  getEnvironmentalistList,
} from "../../store/sidebarApis";
import noRecord from "../../include/images/nrb-img.svg";
import SpeciesSideBarFilter from "../../components/common/sideBarFilter/speciesSideBarFilter";
import ShowMoreRegionsModal from "../../components/common/showMoreModal/showMoreRegionsModal";
import SpeciesListCard from "../../components/common/listingCard/speciesListCard";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

import ShowMoreModal from "../../components/common/showMoreModal/showMoreModal";
const SpeciesListing = (props) => {
  const location = useLocation();
  const _id = location && location.id;
  const name = location && location.name;
  const [showMenu, setShowMenu] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState("1");
  const [order, setOrder] = useState("asc");
  const [sort, setSort] = useState("name");
  const [loadingMain, setLoadingMain] = useState(false);

  const [selectSpecies, setSelectedSpecies] = useState([]);
  const [selectedSpeciesName, setSelectedSpeciesName] = useState([]);
  const [selectZoo, setSelectedZoo] = useState([]);
  const [selectedZooName, setSelectedZooName] = useState([]);
  const [selectWetMarket, setSelectedWetMarket] = useState([]);
  const [selectedWetMarketName, setSelectedWetMarketName] = useState([]);
  const [selectEnvironmentalist, setSelectedEnvironmentalist] = useState([]);
  const [selectedEnvironmentalistName, setSelectedEnvironmentalistName] =
    useState([]);
  const [selectOrganization, setSelectedOrganization] = useState([]);
  const [selectedOrganizationName, setSelectedOrganizationName] = useState([]);
  const [selectRegion, setSelectedRegion] = useState([]);
  const [selectRegionName, setSelectedRegionName] = useState([]);
  const [selectSpeciesCategory, setSelectedSpeciesCategory] = useState(
    _id ? [_id] : []
  );
  const [selectSpeciesCategoryName, setSelectedSpeciesCategoryName] = useState(
    _id && name ? [{ _id, name }] : ""
  );

  const [USRegion, setUSRegion] = useState([]);
  const [otherRegion, setOtherRegion] = useState([]);
  //Modal

  const [showSpeciesViewAll, setShowSpeciesViewAll] = useState(false);
  const [showRegionsViewAll, setShowRegionsViewAll] = useState(false);
  const [showSpeciesCategoryViewAll, setShowSpeciesCategoryViewAll] =
    useState(false);
  const [showOrganizationsViewAll, setShowOrganizationsViewAll] =
    useState(false);
  const [showZooViewAll, setShowZooViewAll] = useState(false);
  const [showWetMarketViewAll, setShowWetMarketViewAll] = useState(false);
  const [showEnvironmentalistViewAll, setShowEnvironmentalistViewAll] =
    useState(false);

  const toggleOrganizationsViewAll = () => {
    setShowOrganizationsViewAll(!showOrganizationsViewAll);
  };

  const toggleSpeciesViewAll = () => {
    setShowSpeciesViewAll(!showSpeciesViewAll);
  };

  const toggleRegionsViewAll = () => {
    setShowRegionsViewAll(!showRegionsViewAll);
  };

  const toggleSpeciesCategoryViewAll = () => {
    setShowSpeciesCategoryViewAll(!showSpeciesCategoryViewAll);
  };

  const toggleZooViewAll = () => {
    setShowZooViewAll(!showZooViewAll);
  };
  const toggleWetMarketViewAll = () => {
    setShowWetMarketViewAll(!showWetMarketViewAll);
  };

  const toggleEnvironmentalistViewAll = () => {
    setShowEnvironmentalistViewAll(!showEnvironmentalistViewAll);
  };

  const speciesName =
    props.sideBarApisListings && props.sideBarApisListings.speciesList;
  const organization =
    props.sideBarApisListings && props.sideBarApisListings.organizationList;
  const zooAndParks =
    props.sideBarApisListings && props.sideBarApisListings.zoo;
  const wetMarketData =
    props.sideBarApisListings && props.sideBarApisListings.wetMarket;
  const environmentalist =
    props.sideBarApisListings && props.sideBarApisListings.environmentalist;

  useEffect(() => {
    setLoadingMain(true);
    window.scrollTo(0, 0);
    const species = selectSpecies.map((item) => item).join(",");
    const organizations = selectOrganization.map((item) => item).join(",");
    const zoos = selectZoo.map((item) => item).join(",");
    const wetMarkets = selectWetMarket.map((item) => item).join(",");
    const environmentalists = selectEnvironmentalist
      .map((item) => item)
      .join(",");
    const regions = selectRegion.map((item) => item).join(",");
    const categories = selectSpeciesCategory.map((item) => item).join(",");
    const payload = {
      keyword,
      page: page,
      sort,
      order,
    };

    if (species) {
      payload.species = species;
    }
    if (organizations) {
      payload.organizations = organizations;
    }
    if (regions) {
      payload.regions = regions;
    }
    if (categories) {
      payload.categories = categories;
    }
    if (zoos) {
      payload.zoos = zoos;
    }
    if (wetMarkets) {
      payload.wetMarkets = wetMarkets;
    }
    if (environmentalists) {
      payload.environmentalists = environmentalists;
    }
    props.getSpecies(payload, (res) => {
      if (res && res.status === 200) {
        setLoadingMain(false);
      }
    });
  }, [page]);

  useEffect(() => {
    setLoadingMain(true);
    window.scrollTo(0, 0);
    const species = selectSpecies.map((item) => item).join(",");
    const regions = selectRegion.map((item) => item).join(",");
    const organizations = selectOrganization.map((item) => item).join(",");
    const categories = selectSpeciesCategory.map((item) => item).join(",");
    const zoos = selectZoo.map((item) => item).join(",");
    const wetMarkets = selectWetMarket.map((item) => item).join(",");
    const environmentalists = selectEnvironmentalist
      .map((item) => item)
      .join(",");
    const payload = {
      keyword,
      page: 1,
      sort,
      order,
    };
    if (species) {
      payload.species = species;
    }

    if (organizations) {
      payload.organizations = organizations;
    }
    if (regions) {
      payload.regions = regions;
    }
    if (categories) {
      payload.categories = categories;
    }
    if (zoos) {
      payload.zoos = zoos;
    }
    if (wetMarkets) {
      payload.wetMarkets = wetMarkets;
    }
    if (environmentalists) {
      payload.environmentalists = environmentalists;
    }

    props.getSpecies(payload, (res) => {
      if (res && res.status === 200) {
        setLoadingMain(false);
      }
    });
  }, [sort, order, keyword]);

  useEffect(() => {
    setLoadingMain(true);
    window.scrollTo(0, 0);
    const species = selectSpecies.map((item) => item).join(",");
    const regions = selectRegion.map((item) => item).join(",");
    const organizations = selectOrganization.map((item) => item).join(",");
    const categories = selectSpeciesCategory.map((item) => item).join(",");
    const zoos = selectZoo.map((item) => item).join(",");
    const wetMarkets = selectWetMarket.map((item) => item).join(",");
    const environmentalists = selectEnvironmentalist
      .map((item) => item)
      .join(",");
    const payload = {
      keyword,
      page: 1,
      sort,
      order,
    };

    if (species) {
      payload.species = species;
    }
    if (organizations) {
      payload.organizations = organizations;
    }
    if (regions) {
      payload.regions = regions;
    }
    if (categories) {
      payload.categories = categories;
    }
    if (zoos) {
      payload.zoos = zoos;
    }
    if (wetMarkets) {
      payload.wetMarkets = wetMarkets;
    }
    if (environmentalists) {
      payload.environmentalists = environmentalists;
    }
    props.getSpecies(payload, (res) => {
      if (res && res.status === 200) {
        setPage("1");
        setLoadingMain(false);
      }
    });
  }, [
    selectRegion,
    selectSpeciesCategory,
    selectOrganization,
    selectEnvironmentalist,
    selectWetMarket,
    selectZoo,
    selectSpecies,
  ]);

  useEffect(() => {
    if (organization && !organization.data) {
      props.getOrganizationList({}, (res) => {
        if (res && res.status === 200) {
        }
      });
    }

    if (zooAndParks && !zooAndParks.data) {
      props.getZooList({}, (res) => {
        if (res && res.status === 200) {
        }
      });
    }

    if (wetMarketData && !wetMarketData.data) {
      props.getWetMarketList({}, (res) => {
        if (res && res.status === 200) {
        }
      });
    }

    if (environmentalist && !environmentalist.data) {
      props.getEnvironmentalistList({}, (res) => {
        if (res && res.status === 200) {
        }
      });
    }

    if (speciesName && !speciesName.data) {
      props.getSpeciesList({}, (res) => {
        if (res && res.status === 200) {
        }
      });
    }
  }, [organization, zooAndParks, wetMarketData, environmentalist, speciesName]);

  useEffect(() => {
    setLoadingMain(true);
    window.scrollTo(0, 0);
    props.getSpeciesCategoryList({}, (res) => {
      if (res && res.status === 200) {
      }
    });
  }, [sort, order]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoadingMain(true);
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
  }, [sort, order]);

  const speciesCategory =
    props.sideBarApisListings && props.sideBarApisListings.speciesCategory;

  const speciesList =
    props.speciesLists.species && props.speciesLists.species.data;

  const totalPages =
    (props.speciesLists.species && props.speciesLists.species.totalCount) || 0;

  const dataPerPage =
    (props.speciesLists.species && props.speciesLists.species.recordsPerPage) ||
    0;

  const noOfPage = Math.ceil(totalPages / dataPerPage) || 0;

  useEffect(() => {
    if (showMenu) {
      document.body.classList.add("filter-open");
    } else {
      document.body.classList.remove("filter-open");
    }
  }, [showMenu]);

  return (
    <>
      <PageLayout>
        <main id="main">
          <div class="listing-container">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <div class="listing-container-inner d-flex flex-wrap">
                    <div class="filter-sidebar">
                      <div class="filter-header-mobile d-block d-lg-none">
                        <h6>Filters</h6>
                        <div class="close-btn">
                          <img
                            src={closeIcon}
                            alt=""
                            onClick={() => setShowMenu(false)}
                          />
                        </div>
                      </div>

                      <SpeciesSideBarFilter
                        showMenu={showMenu}
                        setShowMenu={setShowMenu}
                        speciesCategory={speciesCategory}
                        USRegion={USRegion}
                        otherRegion={otherRegion}
                        selectRegion={selectRegion}
                        setSelectedRegion={setSelectedRegion}
                        setSelectedRegionName={setSelectedRegionName}
                        selectRegionName={selectRegionName}
                        selectSpeciesCategory={selectSpeciesCategory}
                        setSelectedSpeciesCategory={setSelectedSpeciesCategory}
                        selectSpeciesCategoryName={selectSpeciesCategoryName}
                        setSelectedSpeciesCategoryName={
                          setSelectedSpeciesCategoryName
                        }
                        toggleRegionsViewAll={toggleRegionsViewAll}
                        toggleSpeciesCategoryViewAll={
                          toggleSpeciesCategoryViewAll
                        }
                        organization={organization}
                        setSelectedOrganization={setSelectedOrganization}
                        selectOrganization={selectOrganization}
                        selectedOrganizationName={selectedOrganizationName}
                        setSelectedOrganizationName={
                          setSelectedOrganizationName
                        }
                        toggleOrganizationsViewAll={toggleOrganizationsViewAll}
                        zooAndParks={zooAndParks}
                        selectZoo={selectZoo}
                        setSelectedZoo={setSelectedZoo}
                        selectedZooName={selectedZooName}
                        setSelectedZooName={setSelectedZooName}
                        toggleZooViewAll={toggleZooViewAll}
                        wetMarketData={wetMarketData}
                        selectWetMarket={selectWetMarket}
                        setSelectedWetMarket={setSelectedWetMarket}
                        selectedWetMarketName={selectedWetMarketName}
                        setSelectedWetMarketName={setSelectedWetMarketName}
                        toggleWetMarketViewAll={toggleWetMarketViewAll}
                        environmentalist={environmentalist}
                        selectEnvironmentalist={selectEnvironmentalist}
                        setSelectedEnvironmentalist={
                          setSelectedEnvironmentalist
                        }
                        selectedEnvironmentalistName={
                          selectedEnvironmentalistName
                        }
                        setSelectedEnvironmentalistName={
                          setSelectedEnvironmentalistName
                        }
                        toggleEnvironmentalistViewAll={
                          toggleEnvironmentalistViewAll
                        }
                        speciesName={speciesName}
                        selectSpecies={selectSpecies}
                        selectedSpeciesName={selectedSpeciesName}
                        setSelectedSpecies={setSelectedSpecies}
                        setSelectedSpeciesName={setSelectedSpeciesName}
                        toggleSpeciesViewAll={toggleSpeciesViewAll}
                      />
                      <div class="filter-footer-mob-btn d-flex d-lg-none">
                        <Link
                          class="btn btn-grey"
                          onClick={() => {
                            if (
                              selectedSpeciesName &&
                              selectedSpeciesName.length > 0
                            ) {
                              const data = [];
                              setSelectedSpecies(data);
                              setSelectedSpeciesName(data);
                            }
                            if (
                              selectRegionName &&
                              selectRegionName.length > 0
                            ) {
                              const data = [];
                              setSelectedRegionName(data);
                              setSelectedRegion(data);
                            }
                            if (
                              selectSpeciesCategoryName &&
                              selectSpeciesCategoryName.length > 0
                            ) {
                              const data = [];
                              setSelectedSpeciesCategoryName(data);
                              setSelectedSpeciesCategory(data);
                            }
                            if (
                              selectedOrganizationName &&
                              selectedOrganizationName.length > 0
                            ) {
                              const data = [];
                              setSelectedOrganizationName(data);
                              setSelectedOrganization(data);
                            }

                            if (selectedZooName && selectedZooName.length > 0) {
                              const data = [];
                              setSelectedZooName(data);
                              setSelectedZoo(data);
                            }

                            if (
                              selectedWetMarketName &&
                              selectedWetMarketName.length > 0
                            ) {
                              const data = [];
                              setSelectedWetMarketName(data);
                              setSelectedWetMarket(data);
                            }

                            if (
                              selectedEnvironmentalistName &&
                              selectedEnvironmentalistName.length > 0
                            ) {
                              const data = [];
                              setSelectedEnvironmentalistName(data);
                              setSelectedEnvironmentalist(data);
                            }
                          }}
                        >
                          Clear All Filters
                        </Link>
                        <Link
                          class="btn btn-dark-green"
                          onClick={() => setShowMenu(!showMenu)}
                        >
                          Apply
                        </Link>
                      </div>
                    </div>
                    <div class="listing-content-box">
                      <div class="breadcrumb-row d-flex flex-wrap">
                        <div class="breadcrumb-box">
                          <Link to="/">Home</Link>
                        </div>
                        <div class="breadcrumb-box">
                          <Link to="/endangered-species">
                            Endangered Species
                          </Link>
                        </div>
                      </div>

                      <div class="ei-heading listing-content-heading-mob">
                        <h4>Endangered Species</h4>
                        <div class="ei-sort-filter d-lg-none d-flex">
                          <a href="#!">Sort By</a>

                          <ul
                            class="sorting-list d-flex flex-wrap"
                            style={{ marginLeft: "15px" }}
                          >
                            <li class="sorting-item ">
                              <div
                                class="sorting-box active cursor-pointer"
                                onClick={() => {
                                  if (order === "asc") {
                                    setOrder("desc");
                                  } else {
                                    setOrder("asc");
                                  }
                                }}
                              >
                                A to Z
                                <svg
                                  className={order === "desc" && "down-arrow "}
                                  width="14"
                                  height="14"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g>
                                    <path
                                      d="M7 11.0827V2.91602"
                                      stroke="black"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M2.9165 6.99935L6.99984 2.91602L11.0832 6.99935"
                                      stroke="black"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </g>
                                </svg>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div
                        className="d-lg-flex flex-wrap d-none space-between border-bottom-1"
                        style={{ marginBottom: "10px", paddingBottom: "10px" }}
                      >
                        <div class="sorting-row d-lg-flex flex-wrap d-none border-0 sort-region-listing ">
                          <p>Sort By :</p>
                          <ul class="sorting-list d-flex flex-wrap">
                            <li class="sorting-item ">
                              <div
                                class="sorting-box active cursor-pointer"
                                onClick={() => {
                                  if (order === "asc") {
                                    setOrder("desc");
                                  } else {
                                    setOrder("asc");
                                  }
                                }}
                              >
                                A to Z
                                <svg
                                  className={order === "desc" && "down-arrow "}
                                  width="14"
                                  height="14"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g>
                                    <path
                                      d="M7 11.0827V2.91602"
                                      stroke="black"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M2.9165 6.99935L6.99984 2.91602L11.0832 6.99935"
                                      stroke="black"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </g>
                                </svg>
                              </div>
                            </li>
                          </ul>
                        </div>

                        <input
                          type="text"
                          className="form-control region-search"
                          placeholder="Search"
                          value={keyword}
                          onChange={(e) => setKeyword(e.target.value)}
                        />
                        {/* <img
                          src={close}
                          className="search-region-close"
                          alt=""
                        /> */}
                      </div>
                      <ul class="ei-grid-list d-flex flex-wrap">
                        {loadingMain
                          ? [1, 2, 3, 4, 5, 6, 7, 8, 8, 8].map((item) => (
                              <SpeciesListCard
                                img={item?.coverImage?.original}
                                name={item.name}
                                page={"species-listing-page"}
                                id={item._id}
                                dangerImg={item?.dangerLevelImage?.small}
                                loading={loadingMain}
                              />
                            ))
                          : speciesList &&
                            speciesList.length > 0 &&
                            speciesList.map((item) => (
                              <SpeciesListCard
                                img={item?.coverImage?.original}
                                name={item.name}
                                dangerImg={item?.dangerLevelImage?.small}
                                page={"species-listing-page"}
                                id={item._id}
                              />
                            ))}
                      </ul>
                      <div class="pagination-row d-flex justify-content-between">
                        {speciesList && speciesList.length === 0 ? (
                          <ul class="blog-list d-flex flex-wrap justify-content-center">
                            <div class="no-records-container d-flex align-items-center justify-content-center">
                              <div class="no-records-box text-center">
                                <div class="nrb-image">
                                  <img src={noRecord} alt="" />
                                </div>
                                <h6>No Records Found</h6>
                              </div>
                            </div>
                          </ul>
                        ) : (
                          <>
                            <div class="pagination-arrow">
                              <Link
                                class={`pagination-arrow-box d-flex align-items-center  ${
                                  page == "1" && "no-pointer"
                                }`}
                                onClick={() => setPage(+page - 1)}
                              >
                                <img
                                  src={page == "1" ? leftArrow : leftArrowGreen}
                                  alt=""
                                />
                                <span className="hover-link">Previous</span>
                              </Link>
                            </div>
                            <div class="pagination-count d-flex flex-wrap">
                              {+page - 2 > 0 && (
                                <Link
                                  class={`pagination-count-box`}
                                  onClick={() => setPage(+page - 2)}
                                >
                                  <h6>{+page - 2}</h6>
                                </Link>
                              )}
                              {+page - 1 > 0 && (
                                <Link
                                  class={`pagination-count-box`}
                                  onClick={() => setPage(+page - 1)}
                                >
                                  <h6>{+page - 1}</h6>
                                </Link>
                              )}
                              <Link
                                class={`pagination-count-box active`}
                                // onClick={() => setPage(i + 1)}
                              >
                                <h6>{page}</h6>
                              </Link>
                              {+page + 1 <= noOfPage && (
                                <Link
                                  class={`pagination-count-box `}
                                  onClick={() => setPage(+page + 1)}
                                >
                                  <h6>{+page + 1}</h6>
                                </Link>
                              )}
                              {+page + 2 <= noOfPage && (
                                <Link
                                  class={`pagination-count-box `}
                                  onClick={() => setPage(+page + 2)}
                                >
                                  <h6>{+page + 2}</h6>
                                </Link>
                              )}
                            </div>
                            <div class="pagination-arrow">
                              <Link
                                class={`pagination-arrow-box d-flex align-items-center ${
                                  page == noOfPage && "no-pointer"
                                }`}
                                onClick={() => setPage(+page + 1)}
                              >
                                <span className="hover-link">Next</span>
                                <img
                                  src={
                                    page == noOfPage
                                      ? rightArrow
                                      : rightArrowGreen
                                  }
                                  alt=""
                                />
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <ShowMoreModal
          show={showSpeciesViewAll}
          onHide={toggleSpeciesViewAll}
          heading="Species Name"
          listData={speciesName && speciesName.data}
          selectedData={selectSpecies}
          selectedDataName={selectedSpeciesName}
          setSelectedData={setSelectedSpecies}
          setSelectedDataName={setSelectedSpeciesName}
        />
        <ShowMoreModal
          show={showSpeciesCategoryViewAll}
          onHide={toggleSpeciesCategoryViewAll}
          heading="Categories"
          listData={speciesCategory && speciesCategory.data}
          selectedData={selectSpeciesCategory}
          selectedDataName={selectSpeciesCategoryName}
          setSelectedData={setSelectedSpeciesCategory}
          setSelectedDataName={setSelectedSpeciesCategoryName}
        />
        <ShowMoreRegionsModal
          show={showRegionsViewAll}
          onHide={toggleRegionsViewAll}
          otherRegion={otherRegion}
          setSelectedRegion={setSelectedRegion}
          selectRegion={selectRegion}
          heading="Regions"
          selectRegionName={selectRegionName}
          setSelectedRegionName={setSelectedRegionName}
        />
        <ShowMoreModal
          show={showOrganizationsViewAll}
          onHide={toggleOrganizationsViewAll}
          listData={organization && organization.data}
          setSelectedData={setSelectedOrganization}
          selectedData={selectOrganization}
          heading="Organizations"
          selectedDataName={selectedOrganizationName}
          setSelectedDataName={setSelectedOrganizationName}
        />
        <ShowMoreModal
          show={showZooViewAll}
          onHide={toggleZooViewAll}
          heading="Zoo And National Parks"
          listData={zooAndParks && zooAndParks.data}
          selectedData={selectZoo}
          selectedDataName={selectedZooName}
          setSelectedData={setSelectedZoo}
          setSelectedDataName={setSelectedZooName}
        />
        <ShowMoreModal
          show={showEnvironmentalistViewAll}
          onHide={toggleEnvironmentalistViewAll}
          heading="Environmentalists"
          listData={environmentalist && environmentalist.data}
          selectedData={selectEnvironmentalist}
          selectedDataName={selectedEnvironmentalistName}
          setSelectedData={setSelectedEnvironmentalist}
          setSelectedDataName={setSelectedEnvironmentalistName}
        />
        <ShowMoreModal
          show={showWetMarketViewAll}
          onHide={toggleWetMarketViewAll}
          heading="Wet Markets"
          listData={wetMarketData && wetMarketData.data}
          selectedData={selectWetMarket}
          selectedDataName={selectedWetMarketName}
          setSelectedData={setSelectedWetMarket}
          setSelectedDataName={setSelectedWetMarketName}
        />
      </PageLayout>
      <div class="filter-sort-btn d-block d-lg-none">
        <Link
          class="btn btn-block btn-dark-green"
          onClick={() => setShowMenu(!showMenu)}
        >
          Filters
        </Link>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getSpecies: (params, callback) => dispatch(getSpecies(params, callback)),
  getSpeciesList: (params, callback) =>
    dispatch(getSpeciesList(params, callback)),

  getSpeciesCategoryList: (params, callback) =>
    dispatch(getSpeciesCategoryList(params, callback)),

  getRegionList: (params, callback) =>
    dispatch(getRegionList(params, callback)),

  getOrganizationList: (params, callback) =>
    dispatch(getOrganizationList(params, callback)),
  getZooList: (params, callback) => dispatch(getZooList(params, callback)),
  getWetMarketList: (params, callback) =>
    dispatch(getWetMarketList(params, callback)),
  getEnvironmentalistList: (params, callback) =>
    dispatch(getEnvironmentalistList(params, callback)),
});

const mapStateToProps = (state) => ({
  speciesLists: speciesListings(state),
  sideBarApisListings: sideBarApisListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(SpeciesListing));
