import React from "react";
import { connect } from "react-redux";
import {
  getDonation,
  getOrganizations,
  getSpeciesDetails,
  speciesListings,
  addDonationDetails,
} from "../../store/species";
import {
  getOrganizationList,
  sideBarApisListings,
} from "../../store/sidebarApis";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";
import AlertError from "../../common/alerts/alertError";
import AlertSuccess from "../../common/alerts/alertSuccess";
import { toast } from "react-toastify";
import { useEffect } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import DonationViaEI from "./donationViaEI";
import { Amplify, Storage, Auth } from "aws-amplify";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getSlug } from "../../utils/helperFunctions";
import App from "../../common/maps/map";
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

const Contribute = (props) => {
  const slug = getSlug(props.name);
  const history = useHistory();
  const [loading, setLoading] = useState();
  const [showDonate, setshowDonate] = useState(false);
  const [showDirectDonate, setshowDirectDonate] = useState(false);
  const [error, setError] = useState({});
  const [speciesDropdown, setspeciesDropdown] = useState(null);
  const [selectDonation, setSelectDonation] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isCheck, setIsCheck] = useState(false);
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

  const donation = props.speciesListings && props.speciesListings.donation;
  const organization =
    props.speciesListings && props.speciesListings.organization;

  useEffect(() => {
    const Data = {
      name: props.name,
      _id: props.id,
    };
    setspeciesDropdown([Data]);
    setSelectDonation({ species: [Data] });
  }, [showDonate, props.id, props.name]);

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
        setLoading(true);
        const file = selectedImage;
        const fSize = Math.round(file.size / 1048576);
        const fType = file.type;
        const ext = file.name.split(".").pop();
        if (fSize > 25) {
          toast(
            <AlertError message="Size exceeds maximum allowable size. Maximum allowable size is 25MB." />
          );
          return setLoading(false);
        } else if (
          !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            fType
          )
        ) {
          return (
            toast(
              <AlertError message="Image is not of correct format and hence cannot be uploaded. Valid image formats are jpg, jpeg, png and webp." />
            ),
            setLoading(false)
          );
        } else {
          const fileName = uuidv4() + "." + ext;

          Storage.put(fileName, file, {
            completeCallback: (event) => {},
            progressCallback: (progress) => {},
            errorCallback: (err) => {
              return (
                setLoading(false),
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
                props.getDonation(props.id, (res) => {
                  if (res.status === 200) {
                    setSelectedImage(null);
                    setSelectDonation("");
                    setIsCheck(false);
                    setLoading(false);

                    toast(<AlertSuccess message="Information Saved" />);
                    if (showDirectDonate) {
                      toggleDirectDonation();
                    } else {
                      toggleDonate();
                    }
                  }
                });
              } else {
                setLoading(false);
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

  const [mapDonorsData, setDonorsData] = useState([]);
  useEffect(() => {
    setLoading(true);
    props.getDonation(props.id, (res) => {
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
        setDonorsData(a);
        setLoading(false);
      }
    });
  }, []);

  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="tbc-body-inner">
              <div class="tbc-contributor">
                <div class="d-flex justify-content-end">
                  <div class="btn btn-default" onClick={() => toggleDonate()}>
                    Donate and be recognised
                  </div>
                  {/* <div
                    class="btn btn-default btn-dark-green"
                    onClick={() => toggleDirectDonation()}
                  >
                    Post a Listing
                  </div> */}
                </div>

                <ul class="contributor-list d-flex flex-wrap">
                  {loading ? (
                    [1, 2, 3].map((item) => (
                      <li class="contributor-item">
                        <div class="contributor-box d-flex flex-wrap">
                          <div class="cb-logo">
                            <Skeleton />
                          </div>
                          <div class="cb-text">
                            <h6>
                              <Skeleton />
                            </h6>
                            <p className="caps-text">
                              <Skeleton />
                            </p>
                            <a class="btn ">
                              <Skeleton />
                            </a>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <ul class="contributor-list d-flex flex-wrap">
                      {organization &&
                        organization.data &&
                        organization.data.length > 0 &&
                        organization.data.map((item) => {
                          const websiteUrl = item?.websiteUrl
                            ?.split("//")
                            .pop();
                          const donationUrl = item?.donationUrl
                            ?.split("//")
                            .pop();
                          return (
                            <>
                              {item?.isAddedToDonation === true && (
                                <li class="contributor-item">
                                  <div class="contributor-box d-flex flex-wrap">
                                    <div class="cb-logo">
                                      <Link
                                        to={{
                                          pathname: `/organizations/${getSlug(
                                            item?.name
                                          )}`,
                                          state: { id: item._id },
                                        }}
                                      >
                                        <img
                                          style={{ height: "100%" }}
                                          src={
                                            item?.coverImage?.original
                                              ? process.env.REACT_APP_MEDIA +
                                                item?.coverImage?.original
                                              : ""
                                          }
                                          alt=""
                                          className="org-img"
                                        />
                                      </Link>
                                    </div>
                                    <div class="cb-text">
                                      <h6>
                                        <Link
                                          to={{
                                            pathname: `/organizations/${getSlug(
                                              item?.name
                                            )}`,
                                            state: { id: item._id },
                                          }}
                                        >
                                          {item?.name}
                                        </Link>
                                      </h6>
                                      <p className="caps-text">
                                        <span>Headquarters :</span>{" "}
                                        {item?.headQuarter?.cityName}
                                        {", "}
                                        {item?.headQuarter?.stateName}
                                        {"- "}
                                        {item?.headQuarter?.countryName}
                                      </p>

                                      <a
                                        href={`https://${donationUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="btn btn-default"
                                        style={{
                                          minWidth: "100px",
                                          lineHeight: "12px",
                                        }}
                                      >
                                        Donate
                                      </a>
                                    </div>
                                  </div>
                                </li>
                              )}
                            </>
                          );
                        })}
                    </ul>
                  )}
                </ul>

                <div class="ei-heading d-flex justify-content-between align-items-center">
                  <h4>List of Donors</h4>
                  <Link
                    to={{
                      pathname: `/endangered-species/${slug}/donors-list`,
                      state: { id: props.id },
                    }}
                    class="btn-link"
                  >
                    View All
                  </Link>
                </div>
                <ul class="doner-list d-flex flex-wrap">
                  {loading ? (
                    [1, 2, 3, 4].map((item) => (
                      <li class="doner-item">
                        <div class="doner-box">
                          <div class="doner-logo "> 
                            <Skeleton  height={"40px"} width={"40px"}/>
                            <h6>
                              <Skeleton />
                            </h6>
                          </div>
                          <div class="doner-details">
                            <small>
                              <Skeleton />
                            </small>
                            <p>
                              <Skeleton />
                            </p>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <ul class="doner-list d-flex flex-wrap">
                      {donation &&
                        donation.data &&
                        donation.data.length > 0 &&
                        donation.data.map((item, i) => (
                          <>
                            {item?.isNameDisplayed === true && i <= 8 && (
                              <li class="doner-item">
                                <div class="doner-box">
                                  <div class="doner-logo ">
                                    <img
                                      src={
                                        item?.coverImage?.original
                                          ? process.env.REACT_APP_MEDIA +
                                            item?.coverImage?.original
                                          : ""
                                      }
                                      alt=""
                                      className="img-h"
                                    />
                                    <h6>{item?.companyName}</h6>
                                  </div>
                                  <div class="doner-details">
                                    <small>{item?.personName}</small>
                                    <p>${item?.amount}</p>
                                  </div>
                                </div>
                              </li>
                            )}
                          </>
                        ))}
                    </ul>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

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
          loading={loading}
          setError={setError}
        />

        <DonationViaEI
          show={showDirectDonate}
          onHide={toggleDirectDonation}
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
          loading={loading}
          setError={setError}
        />

        <App data={mapDonorsData} mapType="zoo" zoom={"zoom"} />
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getSpeciesDetails: (params, callback) =>
    dispatch(getSpeciesDetails(params, callback)),
  getDonation: (params, callback) => dispatch(getDonation(params, callback)),
  getOrganizations: (params, callback) =>
    dispatch(getOrganizations(params, callback)),
  getOrganizationList: (params, callback) =>
    dispatch(getOrganizationList(params, callback)),
  addDonationDetails: (data, callback) =>
    dispatch(addDonationDetails(data, callback)),
});

const mapStateToProps = (state) => ({
  speciesListings: speciesListings(state),
  sideBarApisListings: sideBarApisListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Contribute));
