import React, { useState } from "react";
import PageLayout from "../../layout/PageLayout/pageLayout";
import { connect } from "react-redux";
import { getBlogs, blogsListings } from "../../store/blog";
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
  getBLogCategoryList,
  getOrganizationList,
} from "../../store/sidebarApis";
import ShowMoreModal from "../../components/common/showMoreModal/showMoreModal";
import BlogSideBarFilter from "../../components/common/sideBarFilter/blogSideBarFilter";
import ShowMoreRegionsModal from "../../components/common/showMoreModal/showMoreRegionsModal";
import ListingBlogCard from "../../components/common/listingCard/listingBlogCard";

const BlogListing = (props) => {
  const loaction = useLocation();
  const _id = loaction && loaction._id;
  const name = loaction && loaction.name;
  const [showMenu, setShowMenu] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState("1");
  const [order, setOrder] = useState("desc");
  const [sort, setSort] = useState("createdAt");
  const [loadingMain, setLoadingMain] = useState(false);
  const [selectBlogCategory, setSelectedBlogCategory] = useState(
    _id ? [_id] : []
  );
  const [selectedBlogCategoryName, setSelectedBlogCategoryName] = useState(
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
  const [showBlogCategoryViewAll, setShowBlogCategoryViewAll] = useState(false);

  const toggleViewAll = () => {
    setShowViewAll(!showViewAll);
  };

  const toggleRegionsViewAll = () => {
    setShowRegionsViewAll(!showRegionsViewAll);
  };

  const toggleOrganizationsViewAll = () => {
    setShowOrganizationsViewAll(!showOrganizationsViewAll);
  };

  const toggleBlogCategoryViewAll = () => {
    setShowBlogCategoryViewAll(!showBlogCategoryViewAll);
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
    const categories = selectBlogCategory.map((item) => item).join(",");
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

    props.getBlogs(payload, (res) => {
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
    const categories = selectBlogCategory.map((item) => item).join(",");
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
    props.getBlogs(payload, (res) => {
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
    const categories = selectBlogCategory.map((item) => item).join(",");
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
    props.getBlogs(payload, (res) => {
      if (res && res.status === 200) {
        setPage("1");
        setLoadingMain(false);
      }
    });
  }, [selectedSpecies, selectBlogCategory, selectOrganization, selectRegion]);

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
    props.getBLogCategoryList({}, (res) => {
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

  const blogCategory =
    props.sideBarApisListings && props.sideBarApisListings.blogCategoryList;

  const blogList = props.blogsListings.blogs && props.blogsListings.blogs.data;

  const totalPages =
    (props.blogsListings.blogs && props.blogsListings.blogs.totalCount) || 0;

  const dataPerPage =
    (props.blogsListings.blogs && props.blogsListings.blogs.recordsPerPage) ||
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
                      <BlogSideBarFilter
                      page="Blog Category"
                        sideBarSpecies={sideBarSpecies}
                        toggleViewAll={toggleViewAll}
                        setSelectedSpecies={setSelectedSpecies}
                        selectedSpecies={selectedSpecies}
                        setSelectedSpeciesName={setSelectedSpeciesName}
                        selectedSpeciesName={selectedSpeciesName}
                        blogCategory={blogCategory}
                        setSelectedBlogCategory={setSelectedBlogCategory}
                        selectBlogCategory={selectBlogCategory}
                        selectedBlogCategoryName={selectedBlogCategoryName}
                        setSelectedBlogCategoryName={
                          setSelectedBlogCategoryName
                        }
                        organization={organization}
                        setSelectedOrganization={setSelectedOrganization}
                        selectOrganization={selectOrganization}
                        selectedOrganizationName={selectedOrganizationName}
                        setSelectedOrganizationName={
                          setSelectedOrganizationName
                        }
                        otherRegion={otherRegion}
                        USRegion={USRegion}
                        setSelectedRegion={setSelectedRegion}
                        selectRegion={selectRegion}
                        selectRegionName={selectRegionName}
                        setSelectedRegionName={setSelectedRegionName}
                        toggleRegionsViewAll={toggleRegionsViewAll}
                        toggleOrganizationsViewAll={toggleOrganizationsViewAll}
                        toggleBlogCategoryViewAll={toggleBlogCategoryViewAll}
                        setShowMenu={setShowMenu}
                        showMenu={showMenu}
                      />
                      <div class="filter-footer-mob-btn d-flex d-lg-none">
                        <Link
                          class="btn btn-grey"
                          onClick={() => {
                            if (selectedBlogCategoryName.length > 0) {
                              const data = [];
                              setSelectedBlogCategoryName(data);
                              setSelectedBlogCategory(data);
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
                          <Link to="/blog">Blogs</Link>
                        </div>
                      </div>
                      <div class="ei-heading listing-content-heading-mob">
                        <h4>All Blogs</h4>
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
                              <ListingBlogCard
                                img={item?.coverImage?.original}
                                name={item?.name}
                                page={"blog-listing-page"}
                                id={item._id}
                                loading={loadingMain}
                              />
                            ))
                          : blogList &&
                            blogList.length > 0 &&
                            blogList.map((item) => (
                              <ListingBlogCard
                                img={item?.coverImage?.original}
                                name={item?.name}
                                categories={item.categories}
                                createdAt={item?.createdAt}
                                description={item?.description}
                                page={"blog-listing-page"}
                                id={item?._id}
                              />
                            ))}
                      </ul>
                      <div class="pagination-row d-flex justify-content-between">
                        {blogList && blogList.length === 0 ? (
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
          show={showBlogCategoryViewAll}
          onHide={toggleBlogCategoryViewAll}
          listData={blogCategory && blogCategory.data}
          setSelectedData={setSelectedBlogCategory}
          selectedData={selectBlogCategory}
          heading="Blog Categories"
          selectedDataName={selectedBlogCategoryName}
          setSelectedDataName={setSelectedBlogCategoryName}
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
  getBlogs: (params, callback) => dispatch(getBlogs(params, callback)),
  getRegionList: (params, callback) =>
    dispatch(getRegionList(params, callback)),
  getSpeciesList: (params, callback) =>
    dispatch(getSpeciesList(params, callback)),
  getBLogCategoryList: (params, callback) =>
    dispatch(getBLogCategoryList(params, callback)),
  getOrganizationList: (params, callback) =>
    dispatch(getOrganizationList(params, callback)),
});

const mapStateToProps = (state) => ({
  blogsListings: blogsListings(state),
  sideBarApisListings: sideBarApisListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(BlogListing));
