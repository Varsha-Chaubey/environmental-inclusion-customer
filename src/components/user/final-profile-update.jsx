import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
import Header from "./header";
import { getUser, updateYourProfile } from "../../store/users";
import AlertError from "../../common/alerts/alertError";
import AlertSuccess from "../../common/alerts/alertSuccess";
import { toast } from "react-toastify";
import { Dropdown } from "react-bootstrap";
import useCheckMobileScreen from "../../common/customHooks/useCheckMobileScreen";
import { useRef } from "react";
import NextButton from "../../common/form/nextButton";
import LoadingBar from "react-top-loading-bar";

const FinalProfileUpdate = (props) => {
  var ref = useRef();
  const isMobile = useCheckMobileScreen();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    ref && ref.current && ref.current.continuousStart();
    setLoading(true);
    const payload = {
      preferredRegions:
        props?.steps?.data?.RegionData &&
        props.steps?.data?.RegionData.length > 0
          ? props.steps?.data?.RegionData.map((item) => item?._id)
          : [],
      preferredSpecies:
        props?.steps?.data?.SpeciesData &&
        props.steps.data?.SpeciesData.length > 0
          ? props.steps?.data?.SpeciesData.map((item) => item._id)
          : [],
      preferredSpeciesCategories:
        props.steps?.data?.SpeciesCategoryData &&
        props.steps.data.SpeciesCategoryData.length > 0
          ? props.steps.data.SpeciesCategoryData.map((item) => item)
          : [],
      preferredOrganizations:
        props?.steps?.data?.OrgData && props?.steps?.data?.OrgData.length > 0
          ? props.steps?.data.OrgData.map((item) => item._id)
          : [],
      preferredWetMarkets:
        props?.steps?.data?.WetMarketData &&
        props?.steps?.data?.WetMarketData.length > 0
          ? props?.steps?.data?.WetMarketData.map((item) => item._id)
          : [],

      preferredEnvironmentalists:
        props?.steps?.data?.EnvData && props?.steps?.data?.EnvData.length > 0
          ? props.steps?.data?.EnvData.map((item) => item._id)
          : [],
      preferredScienceAndEducations:
        props?.steps?.data?.ScienceAndEducationData &&
        props?.steps?.data?.ScienceAndEducationData.length > 0
          ? props?.steps?.data?.ScienceAndEducationData.map((item) => item._id)
          : [],
      preferredZoos:
        props?.steps?.data?.ZooData && props?.steps?.data?.ZooData.length > 0
          ? props?.steps?.data?.ZooData.map((item) => item._id)
          : [],
    };
    props.updateYourProfile(payload, (res) => {
      if (res && res.status === 200) {
        ref && ref.current && ref.current.complete();
        setLoading(false);
        toast(<AlertSuccess message="Information Saved" />);
        history.push("/feed");
      } else {
        ref && ref.current && ref.current.complete();
        setLoading(false);
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
  };

  return (
    <>
      <LoadingBar height={5} color="#47AD1D" ref={ref} />
      <div class="page-outer-wrapper font-family-poppins grey-bg min-vh-100">
        <Header step={"step-3"} />
        <div class="registration-flow-container fw-medium">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="rfc-content-holder mx-auto">
                  <div class="rf-head-row">
                    <div class="rf-step-count d-flex align-items-center">
                      Step <span class="rf-current">03</span>{" "}
                      <span class="rf-total">/ 03</span>
                    </div>
                  </div>
                  <div class="rf-form-row-group">
                    <div class="form-floating custom-form-floating has-select-button d-flex">
                      <input
                        type="text"
                        class="form-control text-capitalize"
                        id="regions"
                        placeholder="Regions"
                        value={
                          isMobile
                            ? `${
                                props.steps?.data &&
                                props.steps?.data.RegionData &&
                                props.steps?.data.RegionData[0]?.country ===
                                  "US"
                                  ? `${props.steps?.data.RegionData[0]?.state}-${props.steps?.data.RegionData[0]?.countryName}`
                                  : props.steps?.data.RegionData[0]?.state
                              }`
                            : props.steps?.data &&
                              props.steps?.data?.RegionData &&
                              props.steps?.data?.RegionData.slice(0, 2)
                                .map((item) =>
                                  item && item.country === "US"
                                    ? `${item?.state}-${item?.countryName}`
                                    : item?.state
                                )
                                .join(", ")
                        }
                      />
                      <div
                        class="td-link-text d-flex align-items-center justify-content-center fw-semibold "
                        style={{ marginLeft: "-90px", marginBottom: "-18px" }}
                      >
                        <Dropdown bsPrefix="header-name-box fw-medium dropdown cursor-pointer">
                          <Dropdown.Toggle
                            as="span"
                            id="dropdown-basic"
                            className="dropdown-toggle"
                          >
                            <a
                              class="td-a-icon"
                              style={{ color: "#47AD1D" }}
                              data-bs-toggle="dropdown"
                              aria-expanded={false}
                            >
                              <u>
                                {isMobile
                                  ? props.steps?.data &&
                                    props.steps?.data.RegionData &&
                                    props.steps?.data.RegionData.length >= 2
                                    ? `+ ${
                                        props.steps?.data.RegionData.length - 1
                                      }`
                                    : ""
                                  : props.steps?.data &&
                                    props.steps?.data.RegionData &&
                                    props.steps?.data.RegionData.length >= 3
                                  ? `+ ${
                                      props.steps?.data.RegionData.length - 2
                                    }`
                                  : ""}
                              </u>
                            </a>
                          </Dropdown.Toggle>

                          <Dropdown.Menu
                            bsPrefix="dropdown-menu dropdown-menu-end"
                            style={{ background: "#fff" }}
                          >
                            <Dropdown.Item>
                              {props.steps?.data &&
                                props.steps?.data.RegionData &&
                                props.steps?.data.RegionData.length &&
                                props.steps?.data.RegionData.map((item) => {
                                  return (
                                    <>
                                      <tr>
                                        <td>
                                          {item && item.country === "US"
                                            ? `${item?.state}-${item?.countryName}`
                                            : item?.state}
                                        </td>
                                      </tr>
                                    </>
                                  );
                                })}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>

                      <label for="regions">
                        Regions <sup>*</sup>
                      </label>

                      <button
                        type="button"
                        class="select-button-box fw-medium text-green "
                        onClick={() => {
                          props.setSteps({ ...props.steps, step: 3 });
                        }}
                      >
                        Select
                      </button>
                    </div>
                    <div class="form-floating custom-form-floating has-select-button d-flex">
                      <input
                        type="text"
                        class="form-control text-capitalize"
                        id="warEnvironment"
                        placeholder="War on the environment"
                        value={
                          isMobile
                            ? `${
                                props.steps?.data &&
                                props.steps?.data.WetMarketData &&
                                props.steps?.data.WetMarketData[0]?.name
                              }`
                            : props.steps?.data &&
                              props.steps?.data?.WetMarketData &&
                              props.steps?.data?.WetMarketData.slice(0, 3)
                                .map((item) => item?.name)
                                .join(", ")
                        }
                      />
                      <div
                        class="td-link-text d-flex align-items-center justify-content-center fw-semibold "
                        style={{ marginLeft: "-90px", marginBottom: "-18px" }}
                      >
                        <Dropdown bsPrefix="header-name-box fw-medium dropdown cursor-pointer">
                          <Dropdown.Toggle
                            as="span"
                            id="dropdown-basic"
                            className="dropdown-toggle"
                          >
                            <a
                              class="td-a-icon "
                              style={{ color: "#47AD1D" }}
                              data-bs-toggle="dropdown"
                              aria-expanded={false}
                            >
                              <u>
                                {isMobile
                                  ? props.steps?.data &&
                                    props.steps?.data.WetMarketData &&
                                    props.steps?.data.WetMarketData.length >= 2
                                    ? `+ ${
                                        props.steps?.data.WetMarketData.length -
                                        1
                                      }`
                                    : ""
                                  : props.steps?.data &&
                                    props.steps?.data.WetMarketData &&
                                    props.steps?.data.WetMarketData.length >= 4
                                  ? `+ ${
                                      props.steps?.data.WetMarketData.length - 3
                                    }`
                                  : ""}
                              </u>
                            </a>
                          </Dropdown.Toggle>

                          <Dropdown.Menu
                            bsPrefix="dropdown-menu dropdown-menu-end"
                            style={{ background: "#fff" }}
                          >
                            <Dropdown.Item>
                              {props.steps?.data &&
                                props.steps?.data.WetMarketData &&
                                props.steps?.data.WetMarketData.length &&
                                props.steps?.data.WetMarketData.map((item) => {
                                  return (
                                    <>
                                      <tr>
                                        <td>{item && item.name}</td>
                                      </tr>
                                    </>
                                  );
                                })}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <label for="warEnvironment">
                        War on the environment <sup>*</sup>
                      </label>
                      <button
                        type="button"
                        class="select-button-box fw-medium text-green"
                        onClick={() => {
                          props.setSteps({ ...props.steps, step: 4 });
                        }}
                      >
                        Select
                      </button>
                    </div>

                    <div class="form-floating custom-form-floating has-select-button d-flex">
                      <input
                        type="text"
                        class="form-control text-capitalize"
                        id="species"
                        placeholder="Species"
                        value={
                          isMobile
                            ? `${
                                props.steps?.data &&
                                props.steps?.data.SpeciesData &&
                                props.steps?.data.SpeciesData[0]?.name
                              }`
                            : props.steps?.data &&
                              props.steps?.data?.SpeciesData &&
                              props.steps?.data?.SpeciesData.slice(0, 3)
                                .map((item) => item?.name)
                                .join(", ")
                        }
                      />
                      <div
                        class="td-link-text d-flex align-items-center justify-content-center fw-semibold "
                        style={{ marginLeft: "-90px", marginBottom: "-18px" }}
                      >
                        <Dropdown bsPrefix="header-name-box fw-medium dropdown cursor-pointer">
                          <Dropdown.Toggle
                            as="span"
                            id="dropdown-basic"
                            className="dropdown-toggle"
                          >
                            <a
                              class="td-a-icon "
                              style={{ color: "#47AD1D" }}
                              data-bs-toggle="dropdown"
                              aria-expanded={false}
                            >
                              <u>
                                {isMobile
                                  ? props.steps?.data &&
                                    props.steps?.data.SpeciesData &&
                                    props.steps?.data.SpeciesData.length >= 2
                                    ? `+ ${
                                        props.steps?.data.SpeciesData.length - 1
                                      }`
                                    : ""
                                  : props.steps?.data &&
                                    props.steps?.data.SpeciesData &&
                                    props.steps?.data.SpeciesData.length >= 4
                                  ? `+ ${
                                      props.steps?.data.SpeciesData.length - 3
                                    }`
                                  : ""}
                              </u>
                            </a>
                          </Dropdown.Toggle>

                          <Dropdown.Menu
                            bsPrefix="dropdown-menu dropdown-menu-end"
                            style={{ background: "#fff" }}
                          >
                            <Dropdown.Item>
                              {props.steps?.data &&
                                props.steps?.data.SpeciesData &&
                                props.steps?.data.SpeciesData.length &&
                                props.steps?.data.SpeciesData.map((item) => {
                                  return (
                                    <>
                                      <tr>
                                        <td>{item && item.name}</td>
                                      </tr>
                                    </>
                                  );
                                })}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <label for="species">
                        Species and categories <sup>*</sup>
                      </label>
                      <button
                        type="button"
                        class="select-button-box fw-medium text-green"
                        onClick={() => {
                          props.setSteps({ ...props.steps, step: 5 });
                        }}
                      >
                        Select
                      </button>
                    </div>
                    <div class="form-floating custom-form-floating has-select-button d-flex">
                      <input
                        type="text"
                        class="form-control text-capitalize "
                        id="environmentalist"
                        placeholder="Environmentalist"
                        value={
                          isMobile
                            ? (() => {
                                const envData =
                                  props.steps?.data?.EnvData || [];
                                const friendData =
                                  props.steps?.data?.FriendData || [];

                                // Combine both envData and friendData
                                const combinedData = [
                                  ...envData,
                                  ...friendData,
                                ];

                                if (combinedData.length > 0) {
                                  return (
                                    combinedData[0]?.name ||
                                    `${combinedData[0]?.firstName} ${combinedData[0]?.lastName}`
                                  );
                                }
                                return "";
                              })()
                            : (() => {
                                const envData =
                                  props.steps?.data?.EnvData || [];
                                const friendData =
                                  props.steps?.data?.FriendData || [];

                                // if either orgData or zooData is available
                                if (
                                  envData.length > 0 ||
                                  friendData.length > 0
                                ) {
                                  //  if both envData and friendData are available
                                  if (
                                    envData.length > 0 &&
                                    friendData.length > 0
                                  ) {
                                    //  conditions for displaying data are met
                                    if (
                                      (envData.length >= 3 &&
                                        friendData.length > 0) ||
                                      (envData.length <= 3 &&
                                        friendData.length > 0)
                                    ) {
                                      const combinedData = [
                                        ...envData,
                                        ...friendData,
                                      ].slice(0, 3);
                                      return combinedData
                                        .map(
                                          (item) =>
                                            item.name ||
                                            `${item.firstName} ${item.lastName}`
                                        )
                                        .join(", ");
                                    }
                                  }
                                  // If only one dataset is available, return its data
                                  return envData.length > 0
                                    ? envData
                                        .slice(0, 3)
                                        .map((item) => item.name)
                                        .join(", ")
                                    : friendData.length > 0
                                    ? friendData
                                        .slice(0, 3)
                                        .map(
                                          (item) =>
                                            `${item.firstName} ${item.lastName}`
                                        )
                                        .join(", ")
                                    : "";
                                }
                                return "";
                              })()
                        }
                      />

                      <div
                        class="td-link-text d-flex align-items-center justify-content-center fw-semibold "
                        style={{ marginLeft: "-90px", marginBottom: "-18px" }}
                      >
                        <Dropdown bsPrefix="header-name-box fw-medium dropdown cursor-pointer">
                          <Dropdown.Toggle
                            as="span"
                            id="dropdown-basic"
                            className="dropdown-toggle"
                          >
                            <a
                              class="td-a-icon "
                              style={{ color: "#47AD1D" }}
                              data-bs-toggle="dropdown"
                              aria-expanded={false}
                            >
                              <u>
                                {isMobile
                                  ? (() => {
                                      const envDataCount =
                                        props.steps?.data?.EnvData?.length || 0;
                                      const friendDataCount =
                                        props.steps?.data?.FriendData?.length ||
                                        0;

                                      if (envDataCount + friendDataCount >= 2) {
                                        return `+ ${
                                          envDataCount + friendDataCount - 1
                                        }`;
                                      }

                                      return "";
                                    })()
                                  : (() => {
                                      const envDataCount =
                                        props.steps?.data?.EnvData?.length || 0;
                                      const friendDataCount =
                                        props.steps?.data?.FriendData?.length ||
                                        0;

                                      // Calculate the combined count
                                      const combinedCount =
                                        envDataCount + friendDataCount;

                                      //  if the combined count is greater than 3 and not zero
                                      if (combinedCount > 3) {
                                        return `+ ${combinedCount - 3}`;
                                      }

                                      return "";
                                    })()}
                              </u>
                            </a>
                          </Dropdown.Toggle>

                          <Dropdown.Menu
                            bsPrefix="dropdown-menu dropdown-menu-end"
                            style={{ background: "#fff" }}
                          >
                            <Dropdown.Item>
                              {props.steps?.data && (
                                <>
                                  {props.steps?.data.EnvData &&
                                    props.steps?.data.EnvData.length > 0 && (
                                      <div>
                                        <h6 className="mb-2">
                                          {" "}
                                          Biologists Data:
                                        </h6>
                                        <table className="mb-2">
                                          <tbody>
                                            {props.steps.data.EnvData.map(
                                              (item) => (
                                                <tr key={item.id}>
                                                  <td className="caps-text">
                                                    {item.name}
                                                  </td>
                                                </tr>
                                              )
                                            )}
                                          </tbody>
                                        </table>
                                      </div>
                                    )}

                                  {props.steps?.data.FriendData &&
                                    props.steps?.data.FriendData.length > 0 && (
                                      <div>
                                        <h6 className="mb-2">Friends Data:</h6>
                                        <table>
                                          <tbody>
                                            {props.steps.data.FriendData.map(
                                              (item) => (
                                                <tr key={item.id}>
                                                  <td className="caps-text">
                                                    {item.firstName}{" "}
                                                    {item.lastName}
                                                  </td>
                                                </tr>
                                              )
                                            )}
                                          </tbody>
                                        </table>
                                      </div>
                                    )}
                                </>
                              )}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <label for="environmentalist">
                        Biologists and Friends to Follow<sup>*</sup>
                      </label>
                      <button
                        type="button"
                        class="select-button-box fw-medium text-green"
                        onClick={() => {
                          props.setSteps({ ...props.steps, step: 6 });
                        }}
                      >
                        Select
                      </button>
                    </div>
                    <div class="form-floating custom-form-floating has-select-button d-flex">
                      <input
                        type="text"
                        class="form-control text-capitalize"
                        id="zoom"
                        placeholder="zoom"
                        value={
                          isMobile
                            ? (() => {
                                const orgData =
                                  props.steps?.data?.OrgData || [];
                                const zooData =
                                  props.steps?.data?.ZooData || [];

                                const combinedData = [...orgData, ...zooData];

                                if (combinedData.length > 0) {
                                  return (
                                    combinedData[0]?.name ||
                                    `${combinedData[0]?.firstName} ${combinedData[0]?.lastName}`
                                  );
                                }
                                return "";
                              })()
                            : (() => {
                                const orgData =
                                  props.steps?.data?.OrgData || [];
                                const zooData =
                                  props.steps?.data?.ZooData || [];

                                if (orgData.length > 0 || zooData.length > 0) {
                                  if (
                                    orgData.length > 0 &&
                                    zooData.length > 0
                                  ) {
                                    if (
                                      (orgData.length >= 3 &&
                                        zooData.length > 0) ||
                                      (orgData.length <= 3 &&
                                        zooData.length > 0)
                                    ) {
                                      const combinedData = [
                                        ...orgData,
                                        ...zooData,
                                      ].slice(0, 3);
                                      return combinedData
                                        .map((item) => item.name)
                                        .join(", ");
                                    }
                                  }

                                  return orgData.length > 0
                                    ? orgData
                                        .slice(0, 3)
                                        .map((item) => item.name)
                                        .join(", ")
                                    : zooData.length > 0
                                    ? zooData
                                        .slice(0, 3)
                                        .map((item) => item.name)
                                        .join(", ")
                                    : "";
                                }
                                return "";
                              })()
                        }
                      />

                      <div
                        class="td-link-text d-flex align-items-center justify-content-center fw-semibold "
                        style={{ marginLeft: "-90px", marginBottom: "-18px" }}
                      >
                        <Dropdown bsPrefix="header-name-box fw-medium dropdown cursor-pointer">
                          <Dropdown.Toggle
                            as="span"
                            id="dropdown-basic"
                            className="dropdown-toggle"
                          >
                            <a
                              class="td-a-icon "
                              style={{ color: "#47AD1D" }}
                              data-bs-toggle="dropdown"
                              aria-expanded={false}
                            >
                              <u>
                                {isMobile
                                  ? (() => {
                                      const orgDataCount =
                                        props.steps?.data?.OrgData?.length || 0;
                                      const zooDataCount =
                                        props.steps?.data?.ZooData?.length || 0;

                                      if (orgDataCount + zooDataCount >= 2) {
                                        return `+ ${
                                          orgDataCount + zooDataCount - 1
                                        }`;
                                      }

                                      return "";
                                    })()
                                  : (() => {
                                      const orgDataCount =
                                        props.steps?.data?.OrgData?.length || 0;
                                      const zooDataCount =
                                        props.steps?.data?.ZooData?.length || 0;

                                      const combinedCount =
                                        orgDataCount + zooDataCount;

                                      if (combinedCount > 3) {
                                        return `+ ${combinedCount - 3}`;
                                      }

                                      return "";
                                    })()}
                              </u>
                            </a>
                          </Dropdown.Toggle>

                          <Dropdown.Menu
                            bsPrefix="dropdown-menu dropdown-menu-end "
                            style={{ background: "#fff" }}
                          >
                            <Dropdown.Item>
                              {props.steps?.data && (
                                <>
                                  {props.steps?.data.OrgData &&
                                    props.steps?.data.OrgData.length > 0 && (
                                      <div>
                                        <h6 className="mb-2">
                                          {" "}
                                          Organizations Data:
                                        </h6>
                                        <table className="mb-2">
                                          <tbody>
                                            {props.steps.data.OrgData.map(
                                              (item) => (
                                                <tr key={item.id}>
                                                  <td className="caps-text">
                                                    {item.name}
                                                  </td>
                                                </tr>
                                              )
                                            )}
                                          </tbody>
                                        </table>
                                      </div>
                                    )}

                                  {props.steps?.data.ZooData &&
                                    props.steps?.data.ZooData.length > 0 && (
                                      <div>
                                        <h6 className="mb-2">
                                          Zoos and Wildlife reserves Data:
                                        </h6>
                                        <table>
                                          <tbody>
                                            {props.steps.data.ZooData.map(
                                              (item) => (
                                                <tr key={item.id}>
                                                  <td className="caps-text">
                                                    {item.name}
                                                  </td>
                                                </tr>
                                              )
                                            )}
                                          </tbody>
                                        </table>
                                      </div>
                                    )}
                                </>
                              )}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <label for="zoom">
                        Organizations, Zoos and Wildlife reserves <sup>*</sup>
                      </label>
                      <button
                        type="button"
                        class="select-button-box fw-medium text-green"
                        onClick={() => {
                          props.setSteps({ ...props.steps, step: 7 });
                        }}
                      >
                        Select
                      </button>
                    </div>

                    <div class="form-floating custom-form-floating has-select-button d-flex">
                      <input
                        type="text"
                        class="form-control text-capitalize"
                        id="education"
                        placeholder="education"
                        value={
                          isMobile
                            ? `${
                                props.steps?.data &&
                                props.steps?.data.ScienceAndEducationData &&
                                props.steps?.data.ScienceAndEducationData[0]
                                  ?.name
                              }`
                            : props.steps?.data &&
                              props.steps?.data?.ScienceAndEducationData.slice(
                                0,
                                2
                              )
                                .map((item) => item?.name)
                                .join(", ")
                        }
                      />
                      <div
                        class="td-link-text d-flex align-items-center justify-content-center fw-semibold "
                        style={{ marginLeft: "-90px", marginBottom: "-18px" }}
                      >
                        <Dropdown bsPrefix="header-name-box fw-medium dropdown cursor-pointer">
                          <Dropdown.Toggle
                            as="span"
                            id="dropdown-basic"
                            className="dropdown-toggle"
                          >
                            <a
                              class="td-a-icon "
                              style={{ color: "#47AD1D" }}
                              data-bs-toggle="dropdown"
                              aria-expanded={false}
                            >
                              <u>
                                {isMobile
                                  ? props.steps?.data &&
                                    props.steps?.data.ScienceAndEducationData &&
                                    props.steps?.data.ScienceAndEducationData
                                      .length >= 2
                                    ? `+ ${
                                        props.steps?.data
                                          .ScienceAndEducationData.length - 1
                                      }`
                                    : ""
                                  : props.steps?.data &&
                                    props.steps?.data.ScienceAndEducationData &&
                                    props.steps?.data.ScienceAndEducationData
                                      .length >= 3
                                  ? `+ ${
                                      props.steps?.data.ScienceAndEducationData
                                        .length - 2
                                    }`
                                  : ""}
                              </u>
                            </a>
                          </Dropdown.Toggle>

                          <Dropdown.Menu
                            bsPrefix="dropdown-menu dropdown-menu-end"
                            style={{ background: "#fff" }}
                          >
                            <Dropdown.Item>
                              {props.steps?.data &&
                                props.steps?.data.ScienceAndEducationData &&
                                props.steps?.data.ScienceAndEducationData
                                  .length &&
                                props.steps?.data.ScienceAndEducationData.map(
                                  (item) => {
                                    return (
                                      <>
                                        <tr>
                                          <td>{item && item.name}</td>
                                        </tr>
                                      </>
                                    );
                                  }
                                )}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <label for="education">
                        Science and Education <sup>*</sup>
                      </label>
                      <button
                        type="button"
                        class="select-button-box fw-medium text-green"
                        onClick={() => {
                          props.setSteps({ ...props.steps, step: 8 });
                        }}
                      >
                        Select
                      </button>
                    </div>
                    <div class="rf-form-btn d-flex align-items-center justify-content-end">              
                      <NextButton
                        handleSubmit={handleSubmit}
                        loading={loading}
                        classData={"btn btn-default btn-lg"}
                        label="Finish"
                        page={"signup"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateYourProfile: (data, callback) => {
    dispatch(updateYourProfile(data, callback));
  },
});

const mapStateToProps = (state) => ({
  getUser: getUser(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(FinalProfileUpdate));
