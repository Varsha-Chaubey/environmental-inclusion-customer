import React, { useEffect } from "react";
import PageLayout from "../../layout/PageLayout/pageLayout";
import Cover from "../../layout/cover/cover";
import close from "../../include/images/close.svg";
import PageInfoSidebar from "../../components/common/pageInfoSidebar/pageInfoSidebar";
import NearToExtinct from "../../components/common/nearToExtinctCard/nearToExtinct";
import { regionListings } from "../../store/region";
import { getBlogs, blogsListings } from "../../store/blog";
import { newsListings, getNews } from "../../store/news";
import {
  sideBarApisListings,
  getBLogCategoryList,
  getNewsCategoryList,
  getRegionList,
  getSpeciesList,
  getZooList,
  getOrganizationList,
  getEnvironmentalistList,
  getWetMarketList,
  getSpeciesCategoryList,
  getScienceAndEducationCategory,
} from "../../store/sidebarApis";
import { zooListings, getZoo, getAllZoo } from "../../store/zoo";
import { connect } from "react-redux";
import { useState } from "react";
import {
  getSpeciesCategory,
  speciesListings,
  getSpecies,
} from "../../store/species";
import { getMisc, getSetting } from "../../store/misc";
import { Link } from "react-router-dom";
import ListBlogsOnRegion from "../../components/common/listingCard/listBlogsOnRegion";
import App from "../../common/maps/map";
import ListingNewsOnRegion from "../../components/common/listingCard/listNewsOnRegion";

import SpeciesListCard from "../../components/common/listingCard/speciesListCard";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const IndexRegion = (props) => {
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const [loadingMain, setLoadingMain] = useState(false);
  const [USRegion, setUSRegion] = useState([]);
  const [otherRegion, setOtherRegion] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState();
  const [filterRecordCount, setFilterRecordCount] = useState(0);
  const [order, setOrder] = useState("desc");
  const [sort, setSort] = useState("createdAt");
  const [speciesList, setSpeciesList] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);
  const [environmentalistList, setEnvironmentalistList] = useState([]);
  const [zooAndParksList, setZooAndParksList] = useState([]);
  const [wetmarketList, setWetMarketList] = useState([]);
  // for blog
  const [blogCategory, setBlogCategory] = useState([]);
  const [newsCategory, setNewsCategory] = useState([]);
  const [speciesCategories, setSpeciesCategories] = useState([]);
  const [scienceAndEducationCategory, setScienceAndEducationCategory] =
    useState([]);

  //map Data
  const [mapRegionData, setMapRegionData] = useState([]);
  const [mapZooData, setMapZooData] = useState([]);
  const [selectedMap, setSelectedMap] = useState("");

  const [selectSpeciesCategory, setSelectedSpeciesCategory] = useState();
  const [selectSpeciesCategoryName, setSelectedSpeciesCategoryName] =
    useState();

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

        setMapRegionData(res.data?.data);

        setUSRegion(usRegions);
        setOtherRegion(otherRegions);
      }
    });

    props.getSpeciesCategory({}, (res) => {
      if (res && res.status === 200) {
      }
    });

    props.getSetting((res) => {
      if (res && res.status === 200) {
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    props.getBLogCategoryList({}, (res) => {
      if (res && res.status === 200) {
        const blogCategories =
          res.data.data &&
          res.data.data.length > 0 &&
          res.data.data.filter((item) => item.name);
        setBlogCategory(blogCategories);
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    props.getNewsCategoryList({}, (res) => {
      if (res && res.status === 200) {
        const newsCategories =
          res.data.data &&
          res.data.data.length > 0 &&
          res.data.data.filter((item) => item.name);
        setNewsCategory(newsCategories);
      }
    });
  }, []);

  // for news
  useEffect(() => {
    setLoadingMain(true);
    window.scrollTo(0, 0);
    const payload = {
      sort,
      order,
    };
    props.getNews(payload, (res) => {
      if (res && res.status === 200) {
        setLoadingMain(false);
      }
    });
  }, [sort, order]);

  useEffect(() => {
    setLoadingMain(true);
    window.scrollTo(0, 0);
    const payload = {
      sort,
      order,
    };
    props.getBlogs(payload, (res) => {
      if (res && res.status === 200) {
        setLoadingMain(false);
      }
    });
  }, [sort, order]);

  useEffect(() => {
    setLoadingMain(true);
    window.scrollTo(0, 0);
    props.getAllZoo({}, (res) => {
      if (res && res.status === 200) {
        const a =
          res &&
          res.data &&
          res.data.data &&
          res.data.data?.length > 0 &&
          res.data.data.map((item) => ({
            name: item.name,
            coordinates: item.geoLocation,
          }));
        setMapZooData(a);
        setLoadingMain(false);
      }
    });
  }, []);

  useEffect(() => {
    setLoadingMain(true);
    window.scrollTo(0, 0);
    props.getZoo({}, (res) => {
      if (res && res.status === 200) {
        setLoadingMain(false);
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    props.getSpeciesList({}, (res) => {
      if (res && res.status === 200) {
        const species =
          res.data.data &&
          res.data.data.length > 0 &&
          res.data.data.filter((item) => item.name);
        setSpeciesList(species);
      }
    });
  }, []);

  useEffect(() => {
    setLoadingMain(true);
    // window.scrollTo(0, 0);
    const categories = selectSpeciesCategory;
    const payload = {
      sort,
      order,
    };
    if (categories) {
      payload.categories = categories;
    }
    props.getSpecies(payload, (res) => {
      if (res && res.status === 200) {
        setLoadingMain(false);
      }
    });
  }, [sort, order, selectSpeciesCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
    props.getZooList({}, (res) => {
      if (res && res.status === 200) {
        const blogCategories =
          res.data.data &&
          res.data.data.length > 0 &&
          res.data.data.filter((item) => item.name);
        setZooAndParksList(blogCategories);
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    props.getOrganizationList({}, (res) => {
      if (res && res.status === 200) {
        const blogCategories =
          res.data.data &&
          res.data.data.length > 0 &&
          res.data.data.filter((item) => item.name);
        setOrganizationList(blogCategories);
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    props.getEnvironmentalistList({}, (res) => {
      if (res && res.status === 200) {
        const blogCategories =
          res.data.data &&
          res.data.data.length > 0 &&
          res.data.data.filter((item) => item.name);
        setEnvironmentalistList(blogCategories);
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    props.getSpeciesCategoryList({}, (res) => {
      if (res && res.status === 200) {
        const blogCategories =
          res.data.data &&
          res.data.data.length > 0 &&
          res.data.data.filter((item) => item.name);
        setSpeciesCategories(blogCategories);
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    props.getWetMarketList({}, (res) => {
      if (res && res.status === 200) {
        const blogCategories =
          res.data.data &&
          res.data.data.length > 0 &&
          res.data.data.filter((item) => item.name);
        setWetMarketList(blogCategories);
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    props.getScienceAndEducationCategory({}, (res) => {
      if (res && res.status === 200) {
        const blogCategories =
          res.data.data &&
          res.data.data.length > 0 &&
          res.data.data.filter((item) => item.name);
        setScienceAndEducationCategory(blogCategories);
      }
    });
  }, []);

  useEffect(() => {
    if (showMenu) {
      document.body.classList.add("filter-open");
    } else {
      document.body.classList.remove("filter-open");
    }
  }, [showMenu]);

  const settings = {
    slidesToShow: 2,
    slidesToScroll: 2,
    dots: false,
    arrows: false,
    infinite: true,
    centerMode: false,
  };
  const newsList = props.newsListings?.news && props.newsListings?.news?.data;
  const zooList = props.zooListings?.zoo && props.zooListings?.zoo?.data;
  const blogList =
    props.blogsListings?.blogs && props.blogsListings?.blogs?.data;

  const speciesCategory =
    props.speciesList && props.speciesList.speciesCategory;

  const speciesItem = props.speciesList && props.speciesList.species;

  const setting =
    props.misc &&
    props.misc.setting &&
    props.misc.setting.data &&
    props.misc.setting.data.homePageText;

  return (
    <>
      <PageLayout>
        <main id="main">
          <Cover intro={setting} />
          <div class="content-container">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <div class="ei-category-container d-flex flex-wrap">
                    <div class="ei-category-left">
                      <div class="filter-header-mobile d-block d-lg-none">
                        <h6>Browse </h6>
                        <div class="close-btn">
                          <img
                            src={close}
                            alt=""
                            onClick={() => setShowMenu(false)}
                          />
                        </div>
                      </div>

                      <PageInfoSidebar
                        page={page}
                        totalCount={totalCount}
                        filterRecordCount={filterRecordCount}
                        setFilterRecordCount={setFilterRecordCount}
                        setPage={setPage}
                        USRegions={USRegion}
                        otherRegion={otherRegion}
                        blogCategories={blogCategory}
                        newsCategory={newsCategory}
                        setShowMenu={setShowMenu}
                        showMenu={showMenu}
                        speciesCategories={speciesCategories}
                        zooAndParksList={zooAndParksList}
                        organizationList={organizationList}
                        environmentalistList={environmentalistList}
                        wetmarketList={wetmarketList}
                        scienceAndEducationCategory={
                          scienceAndEducationCategory
                        }
                        selectSpeciesCategory={selectSpeciesCategory}
                        setSelectedSpeciesCategory={setSelectedSpeciesCategory}
                        setSelectedSpeciesCategoryName={
                          setSelectedSpeciesCategoryName
                        }
                        selectSpeciesCategoryName={selectSpeciesCategoryName}
                      />

                      <div class="filter-footer-mob-btn d-block d-lg-none">
                        {/* <Link
                        class="btn btn-dark-green btn-block"
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        Apply
                      </Link> */}
                      </div>
                    </div>
                    <div class="ei-category-right">
                      <div class="ei-category-details">
                        <div class="ei-heading">
                          <h4>Regions</h4>
                          <p
                            className="map-switch"
                            onClick={() => {
                              if (selectedMap === "US") {
                                setSelectedMap("loading");
                                setTimeout(() => setSelectedMap(""), 900);
                              } else {
                                setSelectedMap("loading");
                                setTimeout(() => setSelectedMap("US"), 900);
                              }
                            }}
                          >
                            Switch to {selectedMap === "US" ? "All " : "US"}{" "}
                            region map
                          </p>
                        </div>
                        <div
                          class={`ei-map-box ${
                            selectedMap === "loading"
                              ? "ei-map-box-skeleton"
                              : ""
                          }`}
                        >
                          <App
                            data={mapRegionData}
                            selectedMap={selectedMap}
                            setSelectedMap={setSelectedMap}
                          />
                        </div>

                        {selectSpeciesCategoryName &&
                        speciesItem?.data &&
                        speciesItem?.data?.length > 0 ? (
                          <>
                            {speciesItem &&
                              speciesItem.data &&
                              speciesItem.data.length > 0 && (
                                <>
                                  <div class="ei-heading mt-60">
                                    <h4>{selectSpeciesCategoryName}</h4>
                                  </div>
                                  <ul class="ei-grid-list d-flex flex-wrap">
                                    {loadingMain
                                      ? [1, 2, 3, 4].map((item) => (
                                          <SpeciesListCard
                                            img={item?.coverImage?.original}
                                            name={item.name}
                                            page={"species-listing-page"}
                                            id={item._id}
                                            loading={loadingMain}
                                            dangerImg={
                                              item?.dangerLevelImage?.small
                                            }
                                          />
                                        ))
                                      : speciesItem &&
                                        speciesItem.data &&
                                        speciesItem.data.length > 0 &&
                                        speciesItem.data.map(
                                          (item, idx) =>
                                            idx < 12 && (
                                              <SpeciesListCard
                                                img={item?.coverImage?.original}
                                                name={item.name}
                                                page={"species-listing-page"}
                                                id={item._id}
                                                loading={loadingMain}
                                                dangerImg={
                                                  item?.dangerLevelImage?.small
                                                }
                                              />
                                            )
                                        )}
                                  </ul>
                                  <Link
                                    class="btn btn-default btn-xl btn-block"
                                    to={{
                                      pathname: `/endangered-species`,
                                      id: selectSpeciesCategory,
                                      name: selectSpeciesCategoryName,
                                    }}
                                    // onClick={() => history.push("/species")}
                                  >
                                    View All
                                  </Link>
                                </>
                              )}
                          </>
                        ) : (
                          <>
                            {speciesCategory &&
                              speciesCategory.data &&
                              speciesCategory.data.length > 0 && (
                                <>
                                  <div class="ei-heading mt-60">
                                    <h4>Endangered Species</h4>
                                  </div>
                                  <ul class="ei-grid-list d-flex flex-wrap">
                                    {loadingMain
                                      ? [1, 2, 3, 4].map((item) => (
                                          <SpeciesListCard
                                            img={item?.coverImage?.original}
                                            name={item.name}
                                            // page={"species-listing-page"}
                                            id={item._id}
                                            loading={loadingMain}
                                          />
                                        ))
                                      : speciesCategory &&
                                        speciesCategory.data &&
                                        speciesCategory.data.length > 0 &&
                                        speciesCategory.data.map(
                                          (item, idx) =>
                                            idx < 12 && (
                                              <SpeciesListCard
                                                img={item?.coverImage?.original}
                                                name={item.name}
                                                // page={"species-listing-page"}
                                                id={item._id}
                                                loading={loadingMain}
                                              />
                                            )
                                        )}
                                  </ul>
                                </>
                              )}
                          </>
                        )}

                        <NearToExtinct speciesCategory={speciesCategory} />

                        {/* {newsList && newsList.length > 0 && (
                          <div class="news-grid-container mt-60">
                            <div class="ei-heading d-flex justify-content-between align-items-center">
                              <h4>Latest News</h4>{" "}
                              <Link to="/news" class="btn-link">
                                View All
                              </Link>
                            </div>
                            <ul class="news-list d-flex flex-wrap">
                              {loadingMain
                                ? [1, 2, 3].map((item) => (
                                    <ListingNewsOnRegion
                                      follow={"Follow"}
                                      name={item.name}
                                      description={item.description}
                                      createAt={item?.createAt}
                                      page={"news-listing-page"}
                                      id={item._id}
                                      category={item.newsCategoryName}
                                      loading={loadingMain}
                                    />
                                  ))
                                : newsList &&
                                  newsList.length > 0 &&
                                  newsList.map(
                                    (item, idx) =>
                                      idx < 3 && (
                                        <ListingNewsOnRegion
                                          follow={"Follow"}
                                          name={item.name}
                                          description={item.description}
                                          createdAt={item?.createdAt}
                                          page={"news-listing-page"}
                                          id={item._id}
                                          categories={item.categories}
                                          loading={loadingMain}
                                        />
                                      )
                                  )}
                            </ul>
                          </div>
                        )} */}

                        {zooList && zooList.length > 0 && (
                          <div class="zoo-report-container mt-60">
                            <div class="ei-heading">
                              <h4> Zoos and Wildlife Preserves Report</h4>
                            </div>
                            <div class="zoo-report-box d-flex flex-wrap">
                              <div class="zrb-left">
                                <ul class="zoo-map-list zml-slider">
                                  {zooList &&
                                    zooList.length > 0 &&
                                    zooList.map(
                                      (item, idx) =>
                                        idx < 10 && (
                                          <>
                                            <li
                                              class="zoo-map-item"
                                              aria-hidden="true"
                                              tabindex="0"
                                              role="tabpanel"
                                              id="slick-slide00"
                                              aria-describedby="slick-slide-control00"
                                            >
                                              <a
                                                href="#!"
                                                class="zoo-map-box"
                                                style={{
                                                  pointerEvents: "none",
                                                }}
                                                tabindex="-1"
                                              >
                                                <p>{item?.name} </p>
                                                <span>
                                                  {item &&
                                                  item?.location &&
                                                  item?.location
                                                    ?.countryName ===
                                                    "United States"
                                                    ? `${item?.location?.stateName}, ${item?.location?.countryName}`
                                                    : item?.location
                                                        ?.countryName}
                                                </span>
                                              </a>
                                            </li>
                                          </>
                                        )
                                    )}
                                </ul>
                                <div class="zoo-map-footer">
                                  <Link
                                    to="/zoos-and-wildlife-preserves"
                                    class="btn-link"
                                  >
                                    View All
                                  </Link>
                                </div>
                              </div>
                              <div class="zrb-right">
                                <div
                                  class="zoo-map-image"
                                  style={{ width: "100%" }}
                                >
                                  <App data={mapZooData} mapType="zoo" />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* {blogList && blogList.length > 0 && (
                          <div class="blog-list-container mt-60">
                            <div class="ei-heading d-flex justify-content-between align-items-center">
                              <h4>Blogs</h4>{" "}
                              <Link to="/blog" class="btn-link">
                                View All
                              </Link>
                            </div>

                            <ul class="blog-list d-flex flex-wrap">
                              {loadingMain
                                ? [1, 2, 3].map((item) => (
                                    <ListBlogsOnRegion
                                      img={item?.coverImage?.original}
                                      name={item.name}
                                      description={item?.description}
                                      page={"blog-listing-page"}
                                      id={item._id}
                                      createdAt={item?.createdAt}
                                      loading={loadingMain}
                                      blogCategoryName={
                                        item?.categories?.categories[0]
                                      }
                                    />
                                  ))
                                : blogList &&
                                  blogList.length > 0 &&
                                  blogList.map(
                                    (item, idx) =>
                                      idx < 3 && (
                                        <ListBlogsOnRegion
                                          img={item?.coverImage?.original}
                                          name={item.name}
                                          createdAt={item?.createdAt}
                                          description={item?.description}
                                          page={"blog-listing-page"}
                                          id={item._id}
                                          categories={item.categories}
                                        />
                                      )
                                  )}
                            </ul>
                          </div>
                        )} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </PageLayout>
      <div class="browse-category-mob d-block d-lg-none">
        <Link
          class="btn btn-block btn-dark-green"
          onClick={() => setShowMenu(!showMenu)}
        >
          Browse
        </Link>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getRegionList: (params, callback) =>
    dispatch(getRegionList(params, callback)),
  getBLogCategoryList: (params, callback) =>
    dispatch(getBLogCategoryList(params, callback)),
  getSpeciesCategory: (params, callback) =>
    dispatch(getSpeciesCategory(params, callback)),
  getSetting: (callback) => dispatch(getSetting(callback)),
  getNewsCategoryList: (params, callback) =>
    dispatch(getNewsCategoryList(params, callback)),
  getNews: (params, callback) => dispatch(getNews(params, callback)),
  getBlogs: (params, callback) => dispatch(getBlogs(params, callback)),
  getZoo: (params, callback) => dispatch(getZoo(params, callback)),
  // getAllZoo: (callback) => dispatch(getAllZoo(callback)),
  getSpeciesList: (params, callback) =>
    dispatch(getSpeciesList(params, callback)),
  getSpecies: (params, callback) => dispatch(getSpecies(params, callback)),
  getAllZoo: (params, callback) => dispatch(getAllZoo(params, callback)),
  getSpeciesCategoryList: (params, callback) =>
    dispatch(getSpeciesCategoryList(params, callback)),
  getZooList: (params, callback) => dispatch(getZooList(params, callback)),
  getOrganizationList: (params, callback) =>
    dispatch(getOrganizationList(params, callback)),
  getEnvironmentalistList: (params, callback) =>
    dispatch(getEnvironmentalistList(params, callback)),
  getWetMarketList: (params, callback) =>
    dispatch(getWetMarketList(params, callback)),
  getScienceAndEducationCategory: (params, callback) =>
    dispatch(getScienceAndEducationCategory(params, callback)),
});

const mapStateToProps = (state) => ({
  regionLists: regionListings(state),
  speciesList: speciesListings(state),
  blogsListings: blogsListings(state),
  newsListings: newsListings(state),
  zooListings: zooListings(state),
  sideBarApisListings: sideBarApisListings(state),
  misc: getMisc(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(IndexRegion));
