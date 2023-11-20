import React, { useState } from "react";
import PageLayout from "../../layout/PageLayout/pageLayout";
import { connect } from "react-redux";
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
  getRegionList,
  getSpeciesList,
  getOrganizationList,
} from "../../store/sidebarApis";
import ShowMoreModal from "../../components/common/showMoreModal/showMoreModal";
import noRecord from "../../include/images/nrb-img.svg";
import {
  getEnvironmentalist,
  environmentalistListings,
} from "../../store/environmentalist";
import SideBarFilterList from "../../components/common/sideBarFilter/sideBarFilterList";
import ShowMoreRegionsModal from "../../components/common/showMoreModal/showMoreRegionsModal";
const EnvironmentalistListing = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState("1");
  const [order, setOrder] = useState("asc");
  const [sort, setSort] = useState("name");
  const [loadingMain, setLoadingMain] = useState(false);

  const [selectedSpecies, setSelectedSpecies] = useState([]);
  const [selectedSpeciesName, setSelectedSpeciesName] = useState([]);
  const [selectOrganization, setSelectedOrganization] = useState([]);
  const [selectedOrganizationName, setSelectedOrganizationName] = useState([]);
  const [selectRegion, setSelectedRegion] = useState([]);
  const [selectRegionName, setSelectedRegionName] = useState([]);

  const [USRegion, setUSRegion] = useState([]);
  const [otherRegion, setOtherRegion] = useState([]);

  //Modal
  const [showViewAll, setShowViewAll] = useState(false);
  const [showRegionsViewAll, setShowRegionsViewAll] = useState(false);
  const [showOrganizationsViewAll, setShowOrganizationsViewAll] =
    useState(false);

  const toggleViewAll = () => {
    setShowViewAll(!showViewAll);
  };

  const toggleRegionsViewAll = () => {
    setShowRegionsViewAll(!showRegionsViewAll);
  };

  const toggleOrganizationsViewAll = () => {
    setShowOrganizationsViewAll(!showOrganizationsViewAll);
  };

  const sideBarSpecies =
    props.sideBarApisListings && props.sideBarApisListings.speciesList;
  const organization =
    props.sideBarApisListings && props.sideBarApisListings.organizationList;

  useEffect(() => {
    setLoadingMain(true);
    window.scrollTo(0, 0);
    const species = selectedSpecies.map((item) => item).join(",");
    const organizations = selectOrganization.map((item) => item).join(",");
    const regions = selectRegion.map((item) => item).join(",");
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
    props.getAllEnvironmentalist(payload, (res) => {
      if (res && res.status === 200) {
        setLoadingMain(false);
      }
    });
  }, [page]);

  useEffect(() => {
    setLoadingMain(true);
    window.scrollTo(0, 0);
    const species = selectedSpecies.map((item) => item).join(",");
    const organizations = selectOrganization.map((item) => item).join(",");
    const regions = selectRegion.map((item) => item).join(",");
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
    props.getAllEnvironmentalist(payload, (res) => {
      if (res && res.status === 200) {
        setPage("1");
        setLoadingMain(false);
      }
    });
  }, [sort, order, keyword]);

  useEffect(() => {
    setLoadingMain(true);
    window.scrollTo(0, 0);
    const species = selectedSpecies.map((item) => item).join(",");
    const organizations = selectOrganization.map((item) => item).join(",");
    const regions = selectRegion.map((item) => item).join(",");
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
    props.getAllEnvironmentalist(payload, (res) => {
      if (res && res.status === 200) {
        setPage("1");
        setLoadingMain(false);
      }
    });
  }, [selectedSpecies, selectRegion, selectOrganization]);

  useEffect(() => {
    if (sideBarSpecies && !sideBarSpecies.data) {
      props.getSpeciesList({}, (res) => {
        if (res && res.status === 200) {
        }
      });
    }

    if (organization && !organization.data) {
      props.getOrganizationList({}, (res) => {
        if (res && res.status === 200) {
        }
      });
    }
  }, [sideBarSpecies, organization]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoadingMain(true);
    props.getRegionList({}, (res) => {
      if (res && res.status === 200) {
        const usRegions =
          res.data.data &&
          res.data.data.length > 0 &&
          res.data.data.filter((item) => item.country == "US");
        const otherRegions =
          res.data.data &&
          res.data.data.length > 0 &&
          res.data.data.filter((item) => item.country != "US");
        setUSRegion(usRegions);
        setOtherRegion(otherRegions);
      }
    });
  }, [sort, order]);

  const environmentalistList =
    props.environmentalistListings?.environmentalist &&
    props.environmentalistListings?.environmentalist?.data;

  const totalPages =
    (props.environmentalistListings?.environmentalist &&
      props.environmentalistListings?.environmentalist?.totalCount) ||
    0;

  const dataPerPage =
    (props.environmentalistListings?.environmentalist &&
      props.environmentalistListings?.environmentalist?.recordsPerPage) ||
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
                      <SideBarFilterList
                        page="Environmentalist"
                        species={sideBarSpecies}
                        toggleSpeciesViewAll={toggleViewAll}
                        setSelectSpecies={setSelectedSpecies}
                        selectSpecies={selectedSpecies}
                        setSelectSpeciesName={setSelectedSpeciesName}
                        selectSpeciesName={selectedSpeciesName}
                        organization={organization}
                        setSelectOrganization={setSelectedOrganization}
                        selectOrganization={selectOrganization}
                        selectOrganizationName={selectedOrganizationName}
                        setSelectOrganizationName={setSelectedOrganizationName}
                        toggleOrganizationViewAll={toggleOrganizationsViewAll}
                        otherRegion={otherRegion}
                        USRegion={USRegion}
                        setSelectRegion={setSelectedRegion}
                        selectRegion={selectRegion}
                        selectRegionName={selectRegionName}
                        setSelectRegionName={setSelectedRegionName}
                        toggleRegionsViewAll={toggleRegionsViewAll}
                        setShowMenu={setShowMenu}
                        showMenu={showMenu}
                      />
                      <div class="filter-footer-mob-btn d-flex d-lg-none">
                        <Link
                          class="btn btn-grey"
                          onClick={() => {
                            if (selectedSpeciesName.length > 0) {
                              const data = [];
                              setSelectedSpeciesName(data);
                              setSelectedSpecies(data);
                            }

                            if (selectedOrganizationName.length > 0) {
                              const data = [];
                              setSelectedOrganizationName(data);
                              setSelectedOrganization(data);
                            }

                            if (selectRegionName.length > 0) {
                              const data = [];
                              setSelectedRegionName(data);
                              setSelectedRegion(data);
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
                          <Link to="/environmentalists">
                            Environmentalists
                          </Link>
                        </div>
                      </div>
                      <div class="ei-heading listing-content-heading-mob">
                        <h4>All Environmentalists</h4>
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
                              <ListingCard
                                img={item?.coverImage?.original}
                                name={item.name}
                                page={"environmentalist"}
                                id={item._id}
                                loading={loadingMain}
                              />
                            ))
                          : environmentalistList &&
                            environmentalistList.length > 0 &&
                            environmentalistList.map((item) => (
                              <ListingCard
                                img={item?.coverImage?.original}
                                name={item.name}
                                page={"environmentalist"}
                                id={item._id}
                              />
                            ))}
                      </ul>
                      <div class="pagination-row d-flex justify-content-between">
                        {environmentalistList &&
                        environmentalistList.length === 0 ? (
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
          show={showViewAll}
          onHide={toggleViewAll}
          listData={sideBarSpecies && sideBarSpecies.data}
          setSelectedData={setSelectedSpecies}
          selectedData={selectedSpecies}
          heading="Species"
          selectedDataName={selectedSpeciesName}
          setSelectedDataName={setSelectedSpeciesName}
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
          heading="Organization"
          selectedDataName={selectedOrganizationName}
          setSelectedDataName={setSelectedOrganizationName}
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
  getAllEnvironmentalist: (params, callback) =>
    dispatch(getEnvironmentalist(params, callback)),
  getRegionList: (params, callback) =>
    dispatch(getRegionList(params, callback)),
  getSpeciesList: (params, callback) =>
    dispatch(getSpeciesList(params, callback)),
  getOrganizationList: (params, callback) =>
    dispatch(getOrganizationList(params, callback)),
});

const mapStateToProps = (state) => ({
  environmentalistListings: environmentalistListings(state),
  sideBarApisListings: sideBarApisListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(EnvironmentalistListing));
