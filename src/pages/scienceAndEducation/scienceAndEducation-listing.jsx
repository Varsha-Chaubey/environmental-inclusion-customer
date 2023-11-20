import React, { useState } from "react";
import PageLayout from "../../layout/PageLayout/pageLayout";
import { connect } from "react-redux";
import { getScienceAndEducation, scienceAndEducationListing } from "../../store/scienceAndEducation";
import { useEffect } from "react";
import noRecord from "../../include/images/nrb-img.svg";
import leftArrow from "../../include/images/pagination-left-arrow.svg";
import rightArrow from "../../include/images/pagination-right-arrow.svg";
import closeIcon from "../../include/images/close.svg";
import leftArrowGreen from "../../include/images/pagination-left-arrow-green.svg";
import rightArrowGreen from "../../include/images/pagination-right-arrow-green.svg";
import { Link, useLocation } from "react-router-dom";
import {
  sideBarApisListings,
  getSpeciesList,
  getRegionList,
  getScienceAndEducationCategory,
  getOrganizationList,
} from "../../store/sidebarApis";
import ShowMoreModal from "../../components/common/showMoreModal/showMoreModal";
import ShowMoreRegionsModal from "../../components/common/showMoreModal/showMoreRegionsModal";
import ListingCard from "../../components/common/listingCard/listingCard";
import SideBarFilterList from "../../components/common/sideBarFilter/sideBarFilterList";

const ScienceAndEducationListing = (props) => {
  const loaction = useLocation();
  const _id = loaction && loaction.id;
  const name = loaction && loaction.name;
  const [showMenu, setShowMenu] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState("1");
  const [order, setOrder] = useState("desc");
  const [sort, setSort] = useState("createdAt");
  const [loadingMain, setLoadingMain] = useState(false);
  const [selectScienceCategory, setSelectedScienceCategory] = useState(
    _id ? [_id] : []
  );
  const [selectedScienceCategoryName, setSelectedScienceCategoryName] = useState(
    _id && name ? [{ _id, name }] : ""
  );
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
  const [showScienceCategoryViewAll, setShowScienceCategoryViewAll] = useState(false);

  const toggleViewAll = () => {
    setShowViewAll(!showViewAll);
  };

  const toggleRegionsViewAll = () => {
    setShowRegionsViewAll(!showRegionsViewAll);
  };

  const toggleOrganizationsViewAll = () => {
    setShowOrganizationsViewAll(!showOrganizationsViewAll);
  };

  const toggleScienceCategoryViewAll = () => {
    setShowScienceCategoryViewAll(!showScienceCategoryViewAll);
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
    const categories = selectScienceCategory.map((item) => item).join(",");
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

    props.getScienceAndEducation(payload, (res) => {
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
    const categories = selectScienceCategory.map((item) => item).join(",");
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
    props.getScienceAndEducation(payload, (res) => {
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
    const categories = selectScienceCategory.map((item) => item).join(",");
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
    props.getScienceAndEducation(payload, (res) => {
      if (res && res.status === 200) {
        setPage("1");
        setLoadingMain(false);
      }
    });
  }, [selectedSpecies, selectScienceCategory, selectOrganization, selectRegion]);

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
    setLoadingMain(true);
    window.scrollTo(0, 0);
    props.getScienceAndEducationCategory({}, (res) => {
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

  const ScienceCategory =
    props.sideBarApisListings && props.sideBarApisListings.scienceAndEducationCategory;

  const ScienceAndEducationList = props.scienceAndEducationListing.scienceAndEducation && props.scienceAndEducationListing.scienceAndEducation.data;

  const totalPages =
    (props.scienceAndEducationListing.scienceAndEducation && props.scienceAndEducationListing.scienceAndEducation.totalCount) || 0;

  const dataPerPage =
    (props.scienceAndEducationListing.scienceAndEducation && props.scienceAndEducationListing.scienceAndEducation.recordsPerPage) ||
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
                      page="Science And Education"
                        species={sideBarSpecies}
                        toggleSpeciesViewAll={toggleViewAll}
                        setSelectSpecies={setSelectedSpecies}
                        selectSpecies={selectedSpecies}
                        setSelectSpeciesName={setSelectedSpeciesName}
                        selectSpeciesName={selectedSpeciesName}

                        scienceCategory={ScienceCategory}
                        setSelectScienceCat={setSelectedScienceCategory}
                        selectScienceCat={selectScienceCategory}
                        selectScienceCatName={selectedScienceCategoryName}
                        setSelectScienceCatName={
                          setSelectedScienceCategoryName
                        }
                        toggleScienceCatViewAll={toggleScienceCategoryViewAll}

                        organization={organization}
                        setSelectOrganization={setSelectedOrganization}
                        selectOrganization={selectOrganization}
                        selectOrganizationName={selectedOrganizationName}
                        setSelectOrganizationName={
                          setSelectedOrganizationName
                        }
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
                            if (selectedScienceCategoryName.length > 0) {
                              const data = [];
                              setSelectedScienceCategoryName(data);
                              setSelectedScienceCategory(data);
                            }
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
                          <Link to="/science-education">Science & Educations</Link>
                        </div>
                      </div>
                      <div class="ei-heading listing-content-heading-mob">
                        <h4>All Science & Educations</h4>
                        <div class="ei-sort-filter d-lg-none d-flex">
                          {/* <a href="#!">Sort by</a> */}
                        </div>
                      </div>
                      <div
                        className="d-lg-flex flex-wrap d-none space-between border-bottom-1"
                        style={{ marginBottom: "10px", paddingBottom: "10px" }}
                      >
                        <div class="sorting-row d-lg-flex flex-wrap d-none border-0 sort-region-listing "></div>
                        <input
                          type="text"
                          className="form-control region-search"
                          placeholder="Search"
                          value={keyword}
                          onChange={(e) => setKeyword(e.target.value)}
                        />
                      </div>
                      <ul class="blog-list d-flex flex-wrap">
                        {loadingMain
                          ? [1, 2, 3, 4, 5, 6, 7, 8, 8, 8].map((item) => (
                              <ListingCard
                              img={item?.coverImage?.original}
                              name={item.name}
                              page={"Science And Education"}
                              id={item._id}
                              loading={loadingMain}
                              />
                            ))
                          : ScienceAndEducationList &&
                            ScienceAndEducationList.length > 0 &&
                            ScienceAndEducationList.map((item) => (
                              <ListingCard
                                img={item?.coverImage?.original}
                                name={item.name}
                                page={"Science And Education"}
                                id={item._id}
                                loading={loadingMain}
                              />
                            ))}
                      </ul>
                      <div class="pagination-row d-flex justify-content-between">
                        {ScienceAndEducationList && ScienceAndEducationList.length === 0 ? (
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
                              <Link class={`pagination-count-box active`}>
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
          heading="Organizations"
          selectedDataName={selectedOrganizationName}
          setSelectedDataName={setSelectedOrganizationName}
        />

        <ShowMoreModal
          show={showScienceCategoryViewAll}
          onHide={toggleScienceCategoryViewAll}
          listData={ScienceCategory && ScienceCategory.data}
          setSelectedData={setSelectedScienceCategory}
          selectedData={selectScienceCategory}
          heading="Science And Education Categories"
          selectedDataName={selectedScienceCategoryName}
          setSelectedDataName={setSelectedScienceCategoryName}
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
  getScienceAndEducation: (params, callback) => dispatch(getScienceAndEducation(params, callback)),
  getRegionList: (params, callback) =>
    dispatch(getRegionList(params, callback)),
  getSpeciesList: (params, callback) =>
    dispatch(getSpeciesList(params, callback)),
  getScienceAndEducationCategory: (params, callback) =>
    dispatch(getScienceAndEducationCategory(params, callback)),
  getOrganizationList: (params, callback) =>
    dispatch(getOrganizationList(params, callback)),
});

const mapStateToProps = (state) => ({
  scienceAndEducationListing: scienceAndEducationListing(state),
  sideBarApisListings: sideBarApisListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ScienceAndEducationListing));
