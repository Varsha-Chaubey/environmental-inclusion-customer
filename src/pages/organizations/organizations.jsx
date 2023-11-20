import React, { useState } from "react";
import PageLayout from "../../layout/PageLayout/pageLayout";
import { connect } from "react-redux";
import { useEffect } from "react";
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
  getEnvironmentalistList,
} from "../../store/sidebarApis";
import ShowMoreModal from "../../components/common/showMoreModal/showMoreModal";
import noRecord from "../../include/images/nrb-img.svg";
import { getOrganization, organizationListing } from "../../store/organization";
import OrganizationListCard from "../../components/common/listingCard/organizationListCard";
import ShowMoreRegionsModal from "../../components/common/showMoreModal/showMoreRegionsModal";
import SideBarFilterList from "../../components/common/sideBarFilter/sideBarFilterList";
import AlertError from "../../common/alerts/alertError";
import AlertSuccess from "../../common/alerts/alertSuccess";
import { toast } from "react-toastify";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import DonationViaEI from "../../components/speciesDetailsPages/donationViaEI";
import { Amplify, Storage, Auth } from "aws-amplify";
import { addDonationDetails, speciesListings } from "../../store/species";

Amplify.configure({
  Auth: {
    identityPoolId: "us-east-2:fa1d4017-2701-482a-9559-34a69f57d192",
    region: "us-east-2",
  },
  Storage: {
    bucket: "dev-salvex-ei",
    region: "us-east-2",
  },
});
Auth.configure({
  Auth: {
    identityPoolId: "us-east-2:fa1d4017-2701-482a-9559-34a69f57d192", //REQUIRED - Amazon Cognito Identity Pool ID
    region: "us-east-2", // REQUIRED - Amazon Cognito Region
  },
  Storage: {
    bucket: "dev-salvex-ei", //REQUIRED -  Amazon S3 bucket
    region: "us-east-2",
  },
});

const OrganizationsListing = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState("1");
  const [order, setOrder] = useState("asc");
  const [sort, setSort] = useState("name");
  const [loadingMain, setLoadingMain] = useState(false);

  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedRegionsName, setSelectedRegionsName] = useState([]);
  const [selectEnvironmentalist, setSelectedEnvironmentalist] = useState([]);
  const [selectedEnvironmentalistName, setSelectedEnvironmentalistName] =
    useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState([]);
  const [selectedSpeciesName, setSelectedSpeciesName] = useState([]);

  const [USRegion, setUSRegion] = useState([]);
  const [otherRegion, setOtherRegion] = useState([]);
  //Modal
  const [showViewAll, setShowViewAll] = useState(false);
  const [showSpeciesAll, setShowSpeciesAll] = useState(false);
  const [showEnvironmentalistViewAll, setShowEnvironmentalistViewAll] =
    useState(false);

  // for donation
  const [showDonate, setshowDonate] = useState(false);
  const [showDirectDonate, setshowDirectDonate] = useState(false);
  const [error, setError] = useState({});
  const [speciesDropdown, setspeciesDropdown] = useState(null);
  const [selectDonation, setSelectDonation] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isCheck, setIsCheck] = useState(false);

  const toggleViewAll = () => {
    setShowViewAll(!showViewAll);
  };

  const toggleViewAllSpecies = () => {
    setShowSpeciesAll(!showSpeciesAll);
  };

  const toggleViewAllEnvironmentalist = () => {
    setShowEnvironmentalistViewAll(!showEnvironmentalistViewAll);
  };

  const sideBarSpecies =
    props.sideBarApisListings && props.sideBarApisListings.speciesList;

  const environmentalist =
    props.sideBarApisListings && props.sideBarApisListings.environmentalist;

  useEffect(() => {
    setLoadingMain(true);
    window.scrollTo(0, 0);
    const species = selectedSpecies.map((item) => item).join(",");
    const environmentalists = selectEnvironmentalist
      .map((item) => item)
      .join(",");
    const regions = selectedRegions.map((item) => item).join(",");
    const payload = {
      keyword,
      page: page,
      sort,
      order,
    };
    if (regions) {
      payload.regions = regions;
    }
    if (species) {
      payload.species = species;
    }
    if (environmentalists) {
      payload.environmentalists = environmentalists;
    }
    props.getOrganization(payload, (res) => {
      if (res && res.status === 200) {
        setLoadingMain(false);
      }
    });
  }, [page]);

  useEffect(() => {
    setLoadingMain(true);
    window.scrollTo(0, 0);
    const species = selectedSpecies.map((item) => item).join(",");
    const environmentalists = selectEnvironmentalist
      .map((item) => item)
      .join(",");
    const regions = selectedRegions.map((item) => item).join(",");
    const payload = {
      keyword,
      page: 1,
      sort,
      order,
    };
    if (regions) {
      payload.regions = regions;
    }
    if (species) {
      payload.species = species;
    }
    if (environmentalists) {
      payload.environmentalists = environmentalists;
    }
    props.getOrganization(payload, (res) => {
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
    const environmentalists = selectEnvironmentalist
      .map((item) => item)
      .join(",");
    const regions = selectedRegions.map((item) => item).join(",");
    const payload = {
      keyword,
      page: 1,
      sort,
      order,
    };
    if (regions) {
      payload.regions = regions;
    }
    if (species) {
      payload.species = species;
    }
    if (environmentalists) {
      payload.environmentalists = environmentalists;
    }
    props.getOrganization(payload, (res) => {
      if (res && res.status === 200) {
        setPage("1");
        setLoadingMain(false);
      }
    });
  }, [selectEnvironmentalist, selectedRegions, selectedSpecies]);

  useEffect(() => {
    if (sideBarSpecies && !sideBarSpecies.data) {
      props.getSpeciesList({}, (res) => {
        if (res && res.status === 200) {
        }
      });
    }

    if (environmentalist && !environmentalist.data) {
      props.getSpeciesList({}, (res) => {
        if (res && res.status === 200) {
        }
      });
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoadingMain(true);
    const payload = {};
    props.getRegionList(payload, (res) => {
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

  const OrganizationList =
    props.organizationListing.organization &&
    props.organizationListing.organization.data;

  const totalPages =
    (props.organizationListing.organization &&
      props.organizationListing.organization.totalCount) ||
    0;

  const dataPerPage =
    (props.organizationListing.organization &&
      props.organizationListing.organization.recordsPerPage) ||
    0;

  const noOfPage = Math.ceil(totalPages / dataPerPage) || 0;

  useEffect(() => {
    if (showMenu) {
      document.body.classList.add("filter-open");
    } else {
      document.body.classList.remove("filter-open");
    }
  }, [showMenu]);

  // for donation

  const toggleDonate = () => {
    setshowDonate(!showDonate);
    setError({});
    setSelectDonation("");
    setSelectedImage(null);
  };

  const toggleDirectDonation = () => {
    setshowDirectDonate(!showDirectDonate);
    setError({});
    setSelectDonation("");
    setSelectedImage(null);
  };

  useEffect(() => {
    const Data = sideBarSpecies && sideBarSpecies.data;
    setspeciesDropdown(Data);
  }, [showDonate, sideBarSpecies]);

  const validateHandler = () => {
    const errors = {};

    if (!selectDonation || !selectDonation.companyName) {
      errors.companyName = "Company Name is required";
    }

    if (!selectDonation || !selectDonation.personName) {
      errors.personName = "Person Name is required";
    }

    if (!selectDonation || !selectDonation.amount) {
      errors.amount = "Amount is required";
    }

    if (
      !selectDonation ||
      (!selectDonation &&
        _.isEmpty(!selectDonation.coverImage) &&
        _.isNull(selectedImage))
    ) {
      errors.image = "Company logo is required";
    }

    const isEmpty = Object.values(errors).every((x) => x === null || x === "");

    if (!isEmpty) {
      setError(errors);
      return false;
    } else {
      setError(errors);
      return true;
    }
  };

  const addDonationHandler = (e) => {
    if (validateHandler()) {
      if (selectDonation?.newImage && selectedImage) {
        const value = { ...selectDonation };
        setError({});
        e.preventDefault();
        setLoadingMain(true);
        const file = selectedImage;
        const fSize = Math.round(file.size / 1048576);
        const fType = file.type;
        const ext = file.name.split(".").pop();
        if (fSize > 25) {
          toast(
            <AlertError message="Size exceeds maximum allowable size. Maximum allowable size is 25MB." />
          );
          return setLoadingMain(false);
        } else if (
          !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            fType
          )
        ) {
          return (
            toast(
              <AlertError message="Image is not of correct format and hence cannot be uploaded. Valid image formats are jpg, jpeg, png and webp." />
            ),
            setLoadingMain(false)
          );
        } else {
          const fileName = uuidv4() + "." + ext;
          Storage.put(fileName, file, {
            completeCallback: (event) => {},
            progressCallback: (progress) => {},
            errorCallback: (err) => {
              return (
                setLoadingMain(false),
                toast(<AlertError message={"Something Went Wrong"} />)
              );
            },
          }).then((result) => {
            const payload = {
              coverImage: "public/" + result.key,
              companyName: value.companyName ? value.companyName : "",
              personName: value.personName ? value.personName : "",
              amount: value.amount ? value.amount : "",
              isNameDisplayed: isCheck ? isCheck : false,
              species: value?.species?.length
                ? value?.species.map((item) => item._id)
                : "",
            };
            props.addDonationDetails(payload, (res) => {
              if (res && res.status === 200) {
                setSelectedImage(null);
                setSelectDonation("");
                setIsCheck(false);
                setLoadingMain(false);

                toast(<AlertSuccess message="Information Saved" />);
                if (showDirectDonate) {
                  toggleDirectDonation();
                } else {
                  toggleDonate();
                }
              } else {
                setLoadingMain(false);
                if (showDirectDonate) {
                  toggleDirectDonation();
                } else {
                  toggleDonate();
                }
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
          });
        }
      }
    }
  };

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
                        page={"Organization"}
                        USRegion={USRegion}
                        otherRegion={otherRegion}
                        selectRegion={selectedRegions}
                        setSelectRegion={setSelectedRegions}
                        setSelectRegionName={setSelectedRegionsName}
                        selectRegionName={selectedRegionsName}
                        toggleRegionsViewAll={toggleViewAll}
                        environmentalist={environmentalist}
                        selectEnvironmentalist={selectEnvironmentalist}
                        setSelectEnvironmentalist={setSelectedEnvironmentalist}
                        selectEnvironmentalistName={
                          selectedEnvironmentalistName
                        }
                        setSelectEnvironmentalistName={
                          setSelectedEnvironmentalistName
                        }
                        toggleEnvironmentalistViewAll={
                          toggleViewAllEnvironmentalist
                        }
                        species={sideBarSpecies}
                        selectSpecies={selectedSpecies}
                        setSelectSpecies={setSelectedSpecies}
                        setSelectSpeciesName={setSelectedSpeciesName}
                        selectSpeciesName={selectedSpeciesName}
                        toggleSpeciesViewAll={toggleViewAllSpecies}
                        setShowMenu={setShowMenu}
                        showMenu={showMenu}
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
                              setSelectedSpeciesName(data);
                              setSelectedSpecies(data);
                            }

                            if (
                              selectedRegionsName &&
                              selectedRegionsName.length > 0
                            ) {
                              const data = [];
                              setSelectedRegions(data);
                              setSelectedRegionsName(data);
                            }

                            if (
                              selectedEnvironmentalistName &&
                              selectedEnvironmentalistName.length > 0
                            ) {
                              const data = [];
                              setSelectedEnvironmentalist(data);
                              setSelectedEnvironmentalistName(data);
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
                      <div class="listing-content-head d-flex justify-content-between">
                        <div class="breadcrumb-row d-flex flex-wrap">
                          <div class="breadcrumb-box">
                            <Link to="/">Home</Link>
                          </div>
                          <div class="breadcrumb-box">
                            <Link to="/organizations">Organizations</Link>
                          </div>
                        </div>
                        <div class="listing-head-btn-group d-flex">
                          <div
                            class="btn btn-default"
                            onClick={() => toggleDonate()}
                          >
                            Donate and be recognised
                          </div>
                        </div>
                      </div>
                      <div class="ei-heading listing-content-heading-mob">
                        <h4>All Organizations</h4>
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
                      <ul class="organisation-list d-flex flex-wrap">
                        {loadingMain
                          ? [1, 2, 3, 4, 5, 6, 7, 8, 8, 8].map((item) => (
                              <OrganizationListCard
                                img={item?.coverImage?.original}
                                name={item.name}
                                page={"organizations"}
                                id={item._id}
                                loading={loadingMain}
                              />
                            ))
                          : OrganizationList &&
                            OrganizationList.length > 0 &&
                            OrganizationList.map((item) => (
                              <OrganizationListCard
                                img={item?.coverImage?.original}
                                name={item.name}
                                page={"organizations"}
                                id={item._id}
                                city={item?.headQuarter?.cityName}
                                state={item?.headQuarter?.stateName}
                                country={item?.headQuarter?.countryName}
                                isAddedToDonation={item?.isAddedToDonation}
                                donationUrl={item?.donationUrl}
                                websiteUrl={item?.websiteUrl}
                              />
                            ))}
                      </ul>
                      <div class="pagination-row d-flex justify-content-between">
                        {OrganizationList && OrganizationList.length === 0 ? (
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
        <ShowMoreRegionsModal
          show={showViewAll}
          onHide={toggleViewAll}
          otherRegion={otherRegion}
          setSelectedRegion={setSelectedRegions}
          selectRegion={selectedRegions}
          heading="Regions"
          selectRegionName={selectedRegionsName}
          setSelectedRegionName={setSelectedRegionsName}
        />
        <ShowMoreModal
          show={showSpeciesAll}
          onHide={toggleViewAllSpecies}
          heading="Endangered Species"
          listData={sideBarSpecies && sideBarSpecies.data}
          selectedData={selectedSpecies}
          selectedDataName={selectedSpeciesName}
          setSelectedData={setSelectedSpecies}
          setSelectedDataName={setSelectedSpeciesName}
        />

        <ShowMoreModal
          show={showEnvironmentalistViewAll}
          onHide={toggleViewAllEnvironmentalist}
          heading="Environmentalists"
          listData={environmentalist && environmentalist.data}
          selectedData={selectEnvironmentalist}
          selectedDataName={selectedEnvironmentalistName}
          setSelectedData={setSelectedEnvironmentalist}
          setSelectedDataName={setSelectedEnvironmentalistName}
        />

        <DonationViaEI
          show={showDonate}
          onHide={toggleDonate}
          isCheck={isCheck}
          setIsCheck={setIsCheck}
          setSelectDonation={setSelectDonation}
          selectDonation={selectDonation}
          setSelectedImage={setSelectedImage}
          speciesDropdown={speciesDropdown}
          selectedImage={selectedImage}
          heading="Donation Details"
          handleSubmit={addDonationHandler}
          error={error}
          loading={loadingMain}
          setError={setError}
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
  getOrganization: (params, callback) =>
    dispatch(getOrganization(params, callback)),
  getRegionList: (params, callback) =>
    dispatch(getRegionList(params, callback)),
  getSpeciesList: (params, callback) =>
    dispatch(getSpeciesList(params, callback)),
  getEnvironmentalistList: (params, callback) =>
    dispatch(getEnvironmentalistList(params, callback)),
  addDonationDetails: (data, callback) =>
    dispatch(addDonationDetails(data, callback)),
});

const mapStateToProps = (state) => ({
  organizationListing: organizationListing(state),
  sideBarApisListings: sideBarApisListings(state),
  speciesListings: speciesListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(OrganizationsListing));
