import React from "react";
import close from "../../../include/images/close.svg";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";

const SideBarFilterList = (props) => {
  const [isSpeciesMenu, setIsSpeciesMenu] = useState(true);
  const [isRegionMenu, setIsRegionMenu] = useState(false);
  const [isOrganizationMenu, setIsOrganizationMenu] = useState(false);
  const [isEnvironmentalistMenu, setIsEnvironmentalistMenu] = useState(false);
  const [isScienceCatMenu, setIsScienceCatMenu] = useState(false);

  const togglerRegion = () => {
    if (props.showMenu) {
      if (isSpeciesMenu) {
        setIsSpeciesMenu(!isSpeciesMenu);
      }
      if (isOrganizationMenu) {
        setIsOrganizationMenu(!isOrganizationMenu);
      }

      if (isEnvironmentalistMenu) {
        setIsEnvironmentalistMenu(!isEnvironmentalistMenu);
      }

      if (isScienceCatMenu) {
        setIsScienceCatMenu(!isScienceCatMenu);
      }
      setIsRegionMenu(!isRegionMenu);
    }
  };

  const togglerOrganization = () => {
    if (props.showMenu) {
      if (isSpeciesMenu) {
        setIsSpeciesMenu(!isSpeciesMenu);
      }
      if (isRegionMenu) {
        setIsRegionMenu(!isRegionMenu);
      }

      if (isEnvironmentalistMenu) {
        setIsEnvironmentalistMenu(!isEnvironmentalistMenu);
      }
      if (isScienceCatMenu) {
        setIsScienceCatMenu(!isScienceCatMenu);
      }
      setIsOrganizationMenu(!isOrganizationMenu);
    }
  };

  const togglerEnvironmentalist = () => {
    if (props.showMenu) {
      if (isSpeciesMenu) {
        setIsSpeciesMenu(!isSpeciesMenu);
      }
      if (isRegionMenu) {
        setIsRegionMenu(!isRegionMenu);
      }

      if (isOrganizationMenu) {
        setIsOrganizationMenu(!isOrganizationMenu);
      }
      setIsEnvironmentalistMenu(!isEnvironmentalistMenu);
    }
  };

  const togglerSpecies = () => {
    if (props.showMenu) {
      if (isEnvironmentalistMenu) {
        setIsEnvironmentalistMenu(!isEnvironmentalistMenu);
      }
      if (isRegionMenu) {
        setIsRegionMenu(!isRegionMenu);
      }

      if (isOrganizationMenu) {
        setIsOrganizationMenu(!isOrganizationMenu);
      }
      if (isScienceCatMenu) {
        setIsScienceCatMenu(!isScienceCatMenu);
      }
      setIsSpeciesMenu(!isSpeciesMenu);
    }
  };

  const togglerScienceCat = () => {
    if (props.showMenu) {
      if (isRegionMenu) {
        setIsRegionMenu(!isRegionMenu);
      }
      if (isOrganizationMenu) {
        setIsOrganizationMenu(!isOrganizationMenu);
      }
      if (isScienceCatMenu) {
        setIsScienceCatMenu(!isScienceCatMenu);
      }
      setIsScienceCatMenu(!isScienceCatMenu);
    }
  };
  return (
    <div class="filter-sidebar-accordion">
      {props.page === "Region" ? (
        <div class="filter-sidebar-head d-flex justify-content-between">
          {props.selectSpeciesName && props.selectSpeciesName.length >= 1 ? (
            <>
              <h6>Filters</h6>
              <Link
                class="link-green"
                onClick={() => {
                  if (
                    props.selectSpeciesName &&
                    props.selectSpeciesName.length > 0
                  ) {
                    const data = [];
                    props.setSelectSpeciesName(data);
                    props.setSelectSpecies(data);
                  }
                }}
              >
                Clear filters
              </Link>
            </>
          ) : (
            <>
              <h6>Filters</h6>
            </>
          )}
        </div>
      ) : (
        ""
      )}

      {props.page === "Zoo" ||
      props.page === "WetMarket" ||
      props.page === "Environmentalist" ? (
        <div class="filter-sidebar-head d-flex justify-content-between">
          {(props.selectSpeciesName && props.selectSpeciesName.length >= 1) ||
          (props.selectRegionName && props.selectRegionName.length >= 1) ||
          (props.selectOrganizationName &&
            props.selectOrganizationName.length >= 1) ? (
            <>
              <h6>Filters</h6>
              <Link
                class="link-green"
                onClick={() => {
                  if (
                    props.selectSpeciesName &&
                    props.selectSpeciesName.length > 0
                  ) {
                    const data = [];
                    props.setSelectSpeciesName(data);
                    props.setSelectSpecies(data);
                  }
                  if (
                    props.selectRegionName &&
                    props.selectRegionName.length > 0
                  ) {
                    const data = [];
                    props.setSelectRegionName(data);
                    props.setSelectRegion(data);
                  }

                  if (
                    props.selectOrganizationName &&
                    props.selectOrganizationName.length > 0
                  ) {
                    const data = [];
                    props.setSelectOrganizationName(data);
                    props.setSelectOrganization(data);
                  }
                }}
              >
                Clear filters
              </Link>
            </>
          ) : (
            <>
              <h6>Filters</h6>
            </>
          )}
        </div>
      ) : (
        ""
      )}

      {props.page === "Organization" ? (
        <div class="filter-sidebar-head d-flex justify-content-between">
          {(props.selectSpeciesName && props.selectSpeciesName.length >= 1) ||
          (props.selectRegionName && props.selectRegionName.length >= 1) ||
          (props.selectEnvironmentalistName &&
            props.selectEnvironmentalistName.length >= 1) ? (
            <>
              <h6>Filters</h6>
              <Link
                class="link-green"
                onClick={() => {
                  if (
                    props.selectSpeciesName &&
                    props.selectSpeciesName.length > 0
                  ) {
                    const data = [];
                    props.setSelectSpeciesName(data);
                    props.setSelectSpecies(data);
                  }
                  if (
                    props.selectRegionName &&
                    props.selectRegionName.length > 0
                  ) {
                    const data = [];
                    props.setSelectRegionName(data);
                    props.setSelectRegion(data);
                  }

                  if (
                    props.selectEnvironmentalistName &&
                    props.selectEnvironmentalistName.length > 0
                  ) {
                    const data = [];
                    props.setSelectEnvironmentalistName(data);
                    props.setSelectEnvironmentalist(data);
                  }
                }}
              >
                Clear filters
              </Link>
            </>
          ) : (
            <>
              <h6>Filters</h6>
            </>
          )}
        </div>
      ) : (
        ""
      )}

      {props.page === "Science And Education" ? (
        <div class="filter-sidebar-head d-flex justify-content-between">
          {(props.selectSpeciesName && props.selectSpeciesName.length >= 1) ||
          (props.selectRegionName && props.selectRegionName.length >= 1) ||
          (props.selectScienceCatName &&
            props.selectScienceCatName.length >= 1) ||
          (props.selectOrganizationName &&
            props.selectOrganizationName.length >= 1) ? (
            <>
              <h6>Filters</h6>
              <Link
                class="link-green"
                onClick={() => {
                  if (
                    props.selectSpeciesName &&
                    props.selectSpeciesName.length > 0
                  ) {
                    const data = [];
                    props.setSelectSpeciesName(data);
                    props.setSelectSpecies(data);
                  }
                  if (
                    props.selectRegionName &&
                    props.selectRegionName.length > 0
                  ) {
                    const data = [];
                    props.setSelectRegionName(data);
                    props.setSelectRegion(data);
                  }

                  if (
                    props.selectOrganizationName &&
                    props.selectOrganizationName.length > 0
                  ) {
                    const data = [];
                    props.setSelectOrganizationName(data);
                    props.setSelectOrganization(data);
                  }

                  if (
                    props.selectScienceCatName &&
                    props.selectScienceCatName.length > 0
                  ) {
                    const data = [];
                    props.setSelectScienceCatName(data);
                    props.setSelectScienceCat(data);
                  }
                }}
              >
                Clear filters
              </Link>
            </>
          ) : (
            <>
              <h6>Filters</h6>
            </>
          )}
        </div>
      ) : (
        ""
      )}

      <div class="filter-sidebar-tag d-flex flex-wrap">
        {props.page === "Zoo" ||
        props.page === "WetMarket" ||
        props.page === "Environmentalist" ? (
          <>
            {props.selectSpeciesName &&
              props.selectSpeciesName.length > 0 &&
              props.selectSpeciesName.map((item) => (
                <div class="fst-box d-flex">
                  <p>{item.name}</p>
                  <img
                    src={close}
                    class="fst-box-icon cursor-pointer"
                    alt=""
                    onClick={() => {
                      const data = [...props.selectSpeciesName];
                      const data1 = [...props.selectSpecies];
                      const a = data.filter((item1) => item1._id !== item._id);
                      const a1 = data1.filter((item1) => item1 !== item._id);
                      props.setSelectSpecies(a1);
                      props.setSelectSpeciesName(a);
                    }}
                  />
                </div>
              ))}

            {props.selectRegionName &&
              props.selectRegionName.length > 0 &&
              props.selectRegionName.map((item) => (
                <div class="fst-box d-flex">
                  <p>{item.name}</p>
                  <img
                    src={close}
                    class="fst-box-icon cursor-pointer"
                    alt=""
                    onClick={() => {
                      const data = [...props.selectRegionName];
                      const data1 = [...props.selectRegion];
                      const a = data.filter((item1) => item1._id !== item._id);
                      const a1 = data1.filter((item1) => item1 !== item._id);
                      props.setSelectRegion(a1);
                      props.setSelectRegionName(a);
                    }}
                  />
                </div>
              ))}

            {props.selectOrganizationName &&
              props.selectOrganizationName.length > 0 &&
              props.selectOrganizationName.map((item) => (
                <div class="fst-box d-flex">
                  <p>{item.name}</p>
                  <img
                    src={close}
                    class="fst-box-icon cursor-pointer"
                    alt=""
                    onClick={() => {
                      const data = [...props.selectOrganizationName];
                      const data1 = [...props.selectOrganization];
                      const a = data.filter((item1) => item1._id !== item._id);
                      const a1 = data1.filter((item1) => item1 !== item._id);
                      props.setSelectOrganization(a1);
                      props.setSelectOrganizationName(a);
                    }}
                  />
                </div>
              ))}
          </>
        ) : props.page === "Organization" ? (
          <>
            {props.selectSpeciesName &&
              props.selectSpeciesName.length > 0 &&
              props.selectSpeciesName.map((item) => (
                <div class="fst-box d-flex">
                  <p>{item.name}</p>
                  <img
                    src={close}
                    class="fst-box-icon cursor-pointer"
                    alt=""
                    onClick={() => {
                      const data = [...props.selectSpeciesName];
                      const data1 = [...props.selectSpecies];
                      const a = data.filter((item1) => item1._id !== item._id);
                      const a1 = data1.filter((item1) => item1 !== item._id);
                      props.setSelectSpecies(a1);
                      props.setSelectSpeciesName(a);
                    }}
                  />
                </div>
              ))}

            {props.selectRegionName &&
              props.selectRegionName.length > 0 &&
              props.selectRegionName.map((item) => (
                <div class="fst-box d-flex">
                  <p>{item.name}</p>
                  <img
                    src={close}
                    class="fst-box-icon cursor-pointer"
                    alt=""
                    onClick={() => {
                      const data = [...props.selectRegionName];
                      const data1 = [...props.selectRegion];
                      const a = data.filter((item1) => item1._id !== item._id);
                      const a1 = data1.filter((item1) => item1 !== item._id);
                      props.setSelectRegion(a1);
                      props.setSelectRegionName(a);
                    }}
                  />
                </div>
              ))}

            {props.selectEnvironmentalistName &&
              props.selectEnvironmentalistName.length > 0 &&
              props.selectEnvironmentalistName.map((item) => (
                <div class="fst-box d-flex">
                  <p>{item.name}</p>
                  <img
                    src={close}
                    class="fst-box-icon cursor-pointer"
                    alt=""
                    onClick={() => {
                      const data = [...props.selectEnvironmentalistName];
                      const data1 = [...props.selectEnvironmentalist];
                      const a = data.filter((item1) => item1._id !== item._id);
                      const a1 = data1.filter((item1) => item1 !== item._id);
                      props.setSelectEnvironmentalist(a1);
                      props.setSelectEnvironmentalistName(a);
                    }}
                  />
                </div>
              ))}
          </>
        ) : props.page === "Region" ? (
          <>
            {props.selectSpeciesName &&
              props.selectSpeciesName.length > 0 &&
              props.selectSpeciesName.map((item) => (
                <div class="fst-box d-flex">
                  <p>{item.name}</p>
                  <img
                    src={close}
                    class="fst-box-icon cursor-pointer"
                    alt=""
                    onClick={() => {
                      const data = [...props.selectSpeciesName];
                      const data1 = [...props.selectSpecies];
                      const a = data.filter((item1) => item1._id !== item._id);
                      const a1 = data1.filter((item1) => item1 !== item._id);
                      props.setSelectSpecies(a1);
                      props.setSelectSpeciesName(a);
                    }}
                  />
                </div>
              ))}
          </>
        ) : (
          props.page === "Science And Education" && (
            <>
              {props.selectSpeciesName &&
                props.selectSpeciesName.length > 0 &&
                props.selectSpeciesName.map((item) => (
                  <div class="fst-box d-flex">
                    <p>{item.name}</p>
                    <img
                      src={close}
                      class="fst-box-icon cursor-pointer"
                      alt=""
                      onClick={() => {
                        const data = [...props.selectSpeciesName];
                        const data1 = [...props.selectSpecies];
                        const a = data.filter(
                          (item1) => item1._id !== item._id
                        );
                        const a1 = data1.filter((item1) => item1 !== item._id);
                        props.setSelectSpecies(a1);
                        props.setSelectSpeciesName(a);
                      }}
                    />
                  </div>
                ))}

              {props.selectRegionName &&
                props.selectRegionName.length > 0 &&
                props.selectRegionName.map((item) => (
                  <div class="fst-box d-flex">
                    <p>{item.name}</p>
                    <img
                      src={close}
                      class="fst-box-icon cursor-pointer"
                      alt=""
                      onClick={() => {
                        const data = [...props.selectRegionName];
                        const data1 = [...props.selectRegion];
                        const a = data.filter(
                          (item1) => item1._id !== item._id
                        );
                        const a1 = data1.filter((item1) => item1 !== item._id);
                        props.setSelectRegion(a1);
                        props.setSelectRegionName(a);
                      }}
                    />
                  </div>
                ))}

              {props.selectOrganizationName &&
                props.selectOrganizationName.length > 0 &&
                props.selectOrganizationName.map((item) => (
                  <div class="fst-box d-flex">
                    <p>{item.name}</p>
                    <img
                      src={close}
                      class="fst-box-icon cursor-pointer"
                      alt=""
                      onClick={() => {
                        const data = [...props.selectOrganizationName];
                        const data1 = [...props.selectOrganization];
                        const a = data.filter(
                          (item1) => item1._id !== item._id
                        );
                        const a1 = data1.filter((item1) => item1 !== item._id);
                        props.setSelectOrganization(a1);
                        props.setSelectOrganizationName(a);
                      }}
                    />
                  </div>
                ))}

              {props.selectScienceCatName &&
                props.selectScienceCatName.length > 0 &&
                props.selectScienceCatName.map((item) => (
                  <div class="fst-box d-flex">
                    <p>{item.name}</p>
                    <img
                      src={close}
                      class="fst-box-icon cursor-pointer"
                      alt=""
                      onClick={() => {
                        const data = [...props.selectScienceCatName];
                        const data1 = [...props.selectScienceCat];
                        const a = data.filter(
                          (item1) => item1._id !== item._id
                        );
                        const a1 = data1.filter((item1) => item1 !== item._id);
                        props.setSelectScienceCat(a1);
                        props.setSelectScienceCatName(a);
                      }}
                    />
                  </div>
                ))}
            </>
          )
        )}
      </div>
      <div class="d-flex d-lg-block align-items-start">
        <ul
          class="nav nav-tabs filter-nav d-lg-none d-flex"
          id="myTab"
          role="tablist"
        >
          {props.page === "Zoo" ||
          props.page === "WetMarket" ||
          props.page === "Environmentalist" ? (
            <>
              <li class="nav-item" role="presentation">
                <button
                  onClick={togglerSpecies}
                  className={
                    isSpeciesMenu
                      ? "nav-link mobile-sub active"
                      : "nav-link active"
                  }
                  id="one-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#one-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="one-tab-pane"
                  aria-selected="true"
                >
                  Endangered Species
                </button>
              </li>

              <li class="nav-item" role="presentation">
                <button
                  onClick={togglerRegion}
                  className={
                    isRegionMenu
                      ? "nav-link mobile-sub active"
                      : "nav-link active"
                  }
                  id="one-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#one-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="one-tab-pane"
                  aria-selected="true"
                >
                  Regions
                </button>
              </li>

              <li class="nav-item" role="presentation">
                <button
                  onClick={togglerOrganization}
                  className={
                    isOrganizationMenu
                      ? "nav-link mobile-sub active"
                      : "nav-link active"
                  }
                  id="one-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#one-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="one-tab-pane"
                  aria-selected="true"
                >
                  Organizations
                </button>
              </li>
            </>
          ) : (
            ""
          )}

          {props.page === "Region" ? (
            <>
              <li class="nav-item" role="presentation">
                <button
                  onClick={togglerSpecies}
                  className={
                    isSpeciesMenu
                      ? "nav-link mobile-sub active"
                      : "nav-link active"
                  }
                  id="one-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#one-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="one-tab-pane"
                  aria-selected="true"
                >
                  Endangered Species
                </button>
              </li>
            </>
          ) : (
            ""
          )}

          {props.page === "Organization" ? (
            <>
              <li class="nav-item" role="presentation">
                <button
                  onClick={togglerSpecies}
                  className={
                    isSpeciesMenu
                      ? "nav-link mobile-sub active"
                      : "nav-link active"
                  }
                  id="one-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#one-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="one-tab-pane"
                  aria-selected="true"
                >
                  Endangered Species
                </button>
              </li>

              <li class="nav-item" role="presentation">
                <button
                  onClick={togglerRegion}
                  className={
                    isRegionMenu
                      ? "nav-link mobile-sub active"
                      : "nav-link active"
                  }
                  id="one-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#one-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="one-tab-pane"
                  aria-selected="true"
                >
                  Regions
                </button>
              </li>

              <li class="nav-item" role="presentation">
                <button
                  onClick={togglerEnvironmentalist}
                  className={
                    isEnvironmentalistMenu
                      ? "nav-link mobile-sub active"
                      : "nav-link active"
                  }
                  id="one-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#one-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="one-tab-pane"
                  aria-selected="true"
                >
                  Environmentalists
                </button>
              </li>
            </>
          ) : (
            ""
          )}
          {props.page === "Science And Education" ? (
            <>
              <li class="nav-item" role="presentation">
                <button
                  onClick={togglerScienceCat}
                  className={
                    isScienceCatMenu
                      ? "nav-link mobile-sub active"
                      : "nav-link active"
                  }
                  id="one-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#one-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="one-tab-pane"
                  aria-selected="true"
                >
                  Category
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  onClick={togglerSpecies}
                  className={
                    isSpeciesMenu
                      ? "nav-link mobile-sub active"
                      : "nav-link active"
                  }
                  id="one-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#one-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="one-tab-pane"
                  aria-selected="true"
                >
                  Endangered Species
                </button>
              </li>

              <li class="nav-item" role="presentation">
                <button
                  onClick={togglerRegion}
                  className={
                    isRegionMenu
                      ? "nav-link mobile-sub active"
                      : "nav-link active"
                  }
                  id="one-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#one-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="one-tab-pane"
                  aria-selected="true"
                >
                  Regions
                </button>
              </li>

              <li class="nav-item" role="presentation">
                <button
                  onClick={togglerOrganization}
                  className={
                    isOrganizationMenu
                      ? "nav-link mobile-sub active"
                      : "nav-link active"
                  }
                  id="one-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#one-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="one-tab-pane"
                  aria-selected="true"
                >
                  Organizations
                </button>
              </li>
            </>
          ) : (
            ""
          )}
        </ul>

        <Accordion
          className="tab-content accordion filter-tab"
          id="myTabContent"
          defaultActiveKey={["1"]}
          alwaysOpen
        >
          {props.page === "Zoo" ||
          props.page === "WetMarket" ||
          props.page === "Environmentalist" ? (
            <>
              {props.showMenu ? (
                <>
                  {isSpeciesMenu && (
                    <>
                      <Accordion.Item
                        className="tab-pane fade show active accordion-item"
                        id="one-tab-pane"
                        eventKey="1"
                      >
                        <Accordion.Header
                          className="accordion-header d-lg-block d-none"
                          id="headingOne"
                        >
                          Endangered Species
                        </Accordion.Header>
                        Endangered Species
                        <Accordion.Body className="accordion-body">
                          {props.selectSpecies &&
                            props.selectSpecies.length > 0 && (
                              <Link
                                class="link-green cursor-pointer"
                                style={{ marginBottom: "10px" }}
                                onClick={() => {
                                  const data = [];
                                  props.setSelectSpecies(data);
                                  props.setSelectSpeciesName(data);
                                }}
                              >
                                Clear all
                              </Link>
                            )}

                          <ul class="filter-content-list">
                            {props.species &&
                              props.species.data &&
                              props.species.data.length > 0 &&
                              props.species.data.map(
                                (item, i) =>
                                  i < 10 && (
                                    <li class="filter-content-item">
                                      <label class="filter-content-box">
                                        {item.name}
                                        <input
                                          value={item._id}
                                          name={item.name}
                                          type="checkbox"
                                          checked={
                                            props.selectSpecies &&
                                            props.selectSpecies.includes(
                                              item._id
                                            )
                                          }
                                          onChange={() => {
                                            const data = [
                                              ...props.selectSpecies,
                                            ];
                                            const data1 = [
                                              ...props.selectSpeciesName,
                                            ];
                                            if (data.includes(item._id)) {
                                              const a = data.filter(
                                                (item1) => item1 !== item._id
                                              );
                                              const b = data1.filter(
                                                (item1) =>
                                                  item1._id !== item._id
                                              );
                                              props.setSelectSpeciesName(b);
                                              props.setSelectSpecies(a);
                                            } else {
                                              data.push(item._id);
                                              data1.push(item);
                                              props.setSelectSpeciesName(data1);
                                              props.setSelectSpecies(data);
                                            }
                                          }}
                                        />
                                        <span class="checkmark"></span>
                                      </label>
                                    </li>
                                  )
                              )}
                          </ul>
                          {props.species &&
                            props.species.data &&
                            props.species.data.length > 10 && (
                              <Link
                                class="link-green "
                                onClick={() => {
                                  props.toggleSpeciesViewAll();
                                  props.setShowMenu(false);
                                }}
                              >
                                View All
                              </Link>
                            )}
                        </Accordion.Body>
                      </Accordion.Item>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Accordion.Item
                    className="tab-pane fade show active accordion-item"
                    id="one-tab-pane"
                    eventKey="1"
                  >
                    <Accordion.Header
                      className="accordion-header d-lg-block d-none"
                      id="headingOne"
                    >
                      Endangered Species
                    </Accordion.Header>

                    <Accordion.Body className="accordion-body">
                      {props.selectSpecies &&
                        props.selectSpecies.length > 0 && (
                          <Link
                            class="link-green cursor-pointer"
                            style={{ marginBottom: "10px" }}
                            onClick={() => {
                              const data = [];
                              props.setSelectSpeciesName(data);
                              props.setSelectSpecies(data);
                            }}
                          >
                            Clear all
                          </Link>
                        )}

                      <ul class="filter-content-list">
                        {props.species &&
                          props.species.data &&
                          props.species.data.length > 0 &&
                          props.species.data.map(
                            (item, i) =>
                              i < 10 && (
                                <li class="filter-content-item">
                                  <label class="filter-content-box">
                                    {item.name}
                                    <input
                                      value={item._id}
                                      name={item.name}
                                      type="checkbox"
                                      checked={
                                        props.selectSpecies &&
                                        props.selectSpecies.includes(item._id)
                                      }
                                      onChange={() => {
                                        const data = [...props.selectSpecies];
                                        const data1 = [
                                          ...props.selectSpeciesName,
                                        ];
                                        if (data.includes(item._id)) {
                                          const a = data.filter(
                                            (item1) => item1 !== item._id
                                          );
                                          const b = data1.filter(
                                            (item1) => item1._id !== item._id
                                          );
                                          props.setSelectSpeciesName(b);
                                          props.setSelectSpecies(a);
                                        } else {
                                          data.push(item._id);
                                          data1.push(item);
                                          props.setSelectSpeciesName(data1);
                                          props.setSelectSpecies(data);
                                        }
                                      }}
                                    />
                                    <span class="checkmark"></span>
                                  </label>
                                </li>
                              )
                          )}
                      </ul>
                      {props.species &&
                        props.species.data &&
                        props.species.data.length > 10 && (
                          <Link
                            class="link-green "
                            onClick={() => {
                              props.toggleSpeciesViewAll();
                              props.setShowMenu(false);
                            }}
                          >
                            View All
                          </Link>
                        )}
                    </Accordion.Body>
                  </Accordion.Item>
                </>
              )}

              {props.showMenu ? (
                <>
                  {isRegionMenu && (
                    <>
                      <Accordion.Item
                        className="tab-pane fade show active accordion-item news-region-sidebar "
                        id="one-tab-pane"
                        eventKey="2"
                      >
                        <Accordion.Header
                          className="accordion-header d-lg-block d-none"
                          id="headingOne"
                        >
                          Regions
                        </Accordion.Header>
                        Regions
                        <Accordion.Body className="accordion-body">
                          {props.selectRegion &&
                            props.selectRegion.length > 0 && (
                              <Link
                                class="link-green "
                                style={{ marginBottom: "10px" }}
                                onClick={() => {
                                  const data = [];
                                  props.setSelectRegionName(data);
                                  props.setSelectRegion(data);
                                }}
                              >
                                Clear all
                              </Link>
                            )}
                          <ul class="filter-content-list">
                            <Accordion.Item
                              eventKey="999"
                              className="tab-pane fade show active accordion-item news-region-sidebar"
                            >
                              {isRegionMenu && props.showMenu && (
                                <span className="accor-font-us">
                                  {" "}
                                  United States
                                </span>
                              )}
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
                                {props.USRegion &&
                                  props.USRegion.length > 0 &&
                                  props.USRegion.map((item) => (
                                    <li class="filter-content-item">
                                      <label class="filter-content-box">
                                        {item.name}
                                        <input
                                          type="checkbox"
                                          checked={
                                            props.selectRegion &&
                                            props.selectRegion.includes(
                                              item._id
                                            )
                                          }
                                          onChange={() => {
                                            const data = [
                                              ...props.selectRegion,
                                            ];
                                            const data1 = [
                                              ...props.selectRegionName,
                                            ];
                                            if (data.includes(item._id)) {
                                              const a = data.filter(
                                                (item1) => item1 != item._id
                                              );
                                              const b = data1.filter(
                                                (item1) => item1._id != item._id
                                              );
                                              props.setSelectRegionName(b);
                                              props.setSelectRegion(a);
                                            } else {
                                              data.push(item._id);
                                              data1.push(item);
                                              props.setSelectRegionName(data1);
                                              props.setSelectRegion(data);
                                            }
                                          }}
                                        />
                                        <span class="checkmark"></span>
                                      </label>
                                    </li>
                                  ))}
                                <li class="ei-category-item"></li>
                              </Accordion.Body>
                            </Accordion.Item>

                            {props.otherRegion &&
                              props.otherRegion.length > 0 &&
                              props.otherRegion.map(
                                (item, i) =>
                                  i < 10 && (
                                    <li class="filter-content-item">
                                      <label class="filter-content-box">
                                        {item.name}
                                        <input
                                          type="checkbox"
                                          checked={
                                            props.selectRegion &&
                                            props.selectRegion.includes(
                                              item._id
                                            )
                                          }
                                          onChange={() => {
                                            const data = [
                                              ...props.selectRegion,
                                            ];
                                            const data1 = [
                                              ...props.selectRegionName,
                                            ];
                                            if (data.includes(item._id)) {
                                              const a = data.filter(
                                                (item1) => item1 !== item._id
                                              );
                                              const b = data1.filter(
                                                (item1) =>
                                                  item1._id !== item._id
                                              );
                                              props.setSelectRegionName(b);
                                              props.setSelectRegion(a);
                                            } else {
                                              data.push(item._id);
                                              data1.push(item);
                                              props.setSelectRegionName(data1);
                                              props.setSelectRegion(data);
                                            }
                                          }}
                                        />
                                        <span class="checkmark"></span>
                                      </label>
                                    </li>
                                  )
                              )}
                          </ul>
                          {props.otherRegion &&
                            props.otherRegion.length > 10 && (
                              <Link
                                class="link-green "
                                onClick={() => {
                                  props.toggleRegionsViewAll();
                                  props.setShowMenu(false);
                                }}
                              >
                                View All
                              </Link>
                            )}
                        </Accordion.Body>
                      </Accordion.Item>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Accordion.Item
                    className="tab-pane fade show active accordion-item"
                    id="one-tab-pane"
                    eventKey="2"
                  >
                    <Accordion.Header
                      className="accordion-header d-lg-block d-none"
                      id="headingOne"
                    >
                      Regions
                    </Accordion.Header>

                    <Accordion.Body className="accordion-body">
                      {props.selectRegion.length > 0 && (
                        <Link
                          class="link-green "
                          style={{ marginBottom: "10px" }}
                          onClick={() => {
                            const data = [];
                            props.setSelectRegionName(data);
                            props.setSelectRegion(data);
                          }}
                        >
                          Clear all
                        </Link>
                      )}
                      <ul class="filter-content-list">
                        <Accordion.Item
                          eventKey="999"
                          className="tab-pane fade show active accordion-item news-region-sidebar"
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
                            {props.USRegion &&
                              props.USRegion.length > 0 &&
                              props.USRegion.map((item) => (
                                <li class="filter-content-item">
                                  <label class="filter-content-box">
                                    {item.name}
                                    <input
                                      type="checkbox"
                                      checked={
                                        props.selectRegion &&
                                        props.selectRegion.includes(item._id)
                                      }
                                      onChange={() => {
                                        const data = [...props.selectRegion];
                                        const data1 = [
                                          ...props.selectRegionName,
                                        ];
                                        if (data.includes(item._id)) {
                                          const a = data.filter(
                                            (item1) => item1 !== item._id
                                          );
                                          const b = data1.filter(
                                            (item1) => item1._id !== item._id
                                          );
                                          props.setSelectRegionName(b);
                                          props.setSelectRegion(a);
                                        } else {
                                          data.push(item._id);
                                          data1.push(item);
                                          props.setSelectRegionName(data1);
                                          props.setSelectRegion(data);
                                        }
                                      }}
                                    />
                                    <span class="checkmark"></span>
                                  </label>
                                </li>
                              ))}
                            <li class="ei-category-item"></li>
                          </Accordion.Body>
                        </Accordion.Item>

                        {props.otherRegion &&
                          props.otherRegion.length > 0 &&
                          props.otherRegion.map(
                            (item, i) =>
                              i < 10 && (
                                <li class="filter-content-item">
                                  <label class="filter-content-box">
                                    {item.name}
                                    <input
                                      type="checkbox"
                                      checked={
                                        props.selectRegion &&
                                        props.selectRegion.includes(item._id)
                                      }
                                      onChange={() => {
                                        const data = [...props.selectRegion];
                                        const data1 = [
                                          ...props.selectRegionName,
                                        ];
                                        if (data.includes(item._id)) {
                                          const a = data.filter(
                                            (item1) => item1 != item._id
                                          );
                                          const b = data1.filter(
                                            (item1) => item1._id != item._id
                                          );
                                          props.setSelectRegionName(b);
                                          props.setSelectRegion(a);
                                        } else {
                                          data.push(item._id);
                                          data1.push(item);
                                          props.setSelectRegionName(data1);
                                          props.setSelectRegion(data);
                                        }
                                      }}
                                    />
                                    <span class="checkmark"></span>
                                  </label>
                                </li>
                              )
                          )}
                      </ul>
                      {props.otherRegion && props.otherRegion.length > 10 && (
                        <Link
                          class="link-green "
                          onClick={() => {
                            props.toggleRegionsViewAll();
                            props.setShowMenu(false);
                          }}
                        >
                          View All
                        </Link>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </>
              )}

              {props.showMenu ? (
                <>
                  {isOrganizationMenu && (
                    <>
                      <Accordion.Item
                        className="tab-pane fade show active accordion-item"
                        id="one-tab-pane"
                        eventKey="3"
                      >
                        <Accordion.Header
                          className="accordion-header d-lg-block d-none"
                          id="headingOne"
                        >
                          Organizations
                        </Accordion.Header>
                        Organizations
                        <Accordion.Body className="accordion-body">
                          {props.selectOrganization &&
                            props.selectOrganization.length > 0 && (
                              <Link
                                class="link-green cursor-pointer"
                                style={{ marginBottom: "10px" }}
                                onClick={() => {
                                  const data = [];
                                  props.setSelectOrganization(data);
                                  props.setSelectOrganizationName(data);
                                }}
                              >
                                Clear all
                              </Link>
                            )}

                          <ul class="filter-content-list">
                            {props.organization &&
                              props.organization.data &&
                              props.organization.data.length > 0 &&
                              props.organization.data.map(
                                (item, i) =>
                                  i < 10 && (
                                    <li class="filter-content-item">
                                      <label class="filter-content-box">
                                        {item.name}
                                        <input
                                          value={item._id}
                                          name={item.name}
                                          type="checkbox"
                                          checked={
                                            props.selectOrganization &&
                                            props.selectOrganization.includes(
                                              item._id
                                            )
                                          }
                                          onChange={() => {
                                            const data = [
                                              ...props.selectOrganization,
                                            ];
                                            const data1 = [
                                              ...props.selectOrganizationName,
                                            ];
                                            if (data.includes(item._id)) {
                                              const a = data.filter(
                                                (item1) => item1 !== item._id
                                              );
                                              const b = data1.filter(
                                                (item1) =>
                                                  item1._id !== item._id
                                              );
                                              props.setSelectOrganizationName(
                                                b
                                              );
                                              props.setSelectOrganization(a);
                                            } else {
                                              data.push(item._id);
                                              data1.push(item);
                                              props.setSelectOrganizationName(
                                                data1
                                              );
                                              props.setSelectOrganization(data);
                                            }
                                          }}
                                        />
                                        <span class="checkmark"></span>
                                      </label>
                                    </li>
                                  )
                              )}
                          </ul>
                          {props.organization &&
                            props.organization.data &&
                            props.organization.data.length > 10 && (
                              <Link
                                class="link-green "
                                onClick={() => {
                                  props.toggleOrganizationViewAll();
                                  props.setShowMenu(false);
                                }}
                              >
                                View All
                              </Link>
                            )}
                        </Accordion.Body>
                      </Accordion.Item>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Accordion.Item
                    className="tab-pane fade show active accordion-item"
                    id="one-tab-pane"
                    eventKey="3"
                  >
                    <Accordion.Header
                      className="accordion-header d-lg-block d-none"
                      id="headingOne"
                    >
                      Organizations
                    </Accordion.Header>

                    <Accordion.Body className="accordion-body">
                      {props.selectOrganization &&
                        props.selectOrganization.length > 0 && (
                          <Link
                            class="link-green cursor-pointer"
                            style={{ marginBottom: "10px" }}
                            onClick={() => {
                              const data = [];
                              props.setSelectOrganizationName(data);
                              props.setSelectOrganization(data);
                            }}
                          >
                            Clear all
                          </Link>
                        )}

                      <ul class="filter-content-list">
                        {props.organization &&
                          props.organization.data &&
                          props.organization.data.length > 0 &&
                          props.organization.data.map(
                            (item, i) =>
                              i < 10 && (
                                <li class="filter-content-item">
                                  <label class="filter-content-box">
                                    {item.name}
                                    <input
                                      value={item._id}
                                      name={item.name}
                                      type="checkbox"
                                      checked={
                                        props.selectOrganization &&
                                        props.selectOrganization.includes(
                                          item._id
                                        )
                                      }
                                      onChange={() => {
                                        const data = [
                                          ...props.selectOrganization,
                                        ];
                                        const data1 = [
                                          ...props.selectOrganizationName,
                                        ];
                                        if (data.includes(item._id)) {
                                          const a = data.filter(
                                            (item1) => item1 !== item._id
                                          );
                                          const b = data1.filter(
                                            (item1) => item1._id !== item._id
                                          );
                                          props.setSelectOrganizationName(b);
                                          props.setSelectOrganization(a);
                                        } else {
                                          data.push(item._id);
                                          data1.push(item);
                                          props.setSelectOrganizationName(
                                            data1
                                          );
                                          props.setSelectOrganization(data);
                                        }
                                      }}
                                    />
                                    <span class="checkmark"></span>
                                  </label>
                                </li>
                              )
                          )}
                      </ul>
                      {props.organization &&
                        props.organization.data &&
                        props.organization.data.length > 10 && (
                          <Link
                            class="link-green "
                            onClick={() => {
                              props.toggleOrganizationViewAll();
                              props.setShowMenu(false);
                            }}
                          >
                            View All
                          </Link>
                        )}
                    </Accordion.Body>
                  </Accordion.Item>
                </>
              )}
            </>
          ) : (
            ""
          )}
          {props.page === "Region" ? (
            <>
              {props.showMenu ? (
                <>
                  {isSpeciesMenu && (
                    <>
                      <Accordion.Item
                        className="tab-pane fade show active accordion-item"
                        id="one-tab-pane"
                        eventKey="1"
                      >
                        <Accordion.Header
                          className="accordion-header d-lg-block d-none"
                          id="headingOne"
                        >
                          Endangered Species
                        </Accordion.Header>
                        Endangered Species
                        <Accordion.Body className="accordion-body">
                          {props.selectSpecies &&
                            props.selectSpecies.length > 0 && (
                              <Link
                                class="link-green cursor-pointer"
                                style={{ marginBottom: "10px" }}
                                onClick={() => {
                                  const data = [];
                                  props.setSelectSpecies(data);
                                  props.setSelectSpeciesName(data);
                                }}
                              >
                                Clear all
                              </Link>
                            )}

                          <ul class="filter-content-list">
                            {props.species &&
                              props.species.data &&
                              props.species.data.length > 0 &&
                              props.species.data.map(
                                (item, i) =>
                                  i < 10 && (
                                    <li class="filter-content-item">
                                      <label class="filter-content-box">
                                        {item.name}
                                        <input
                                          value={item._id}
                                          name={item.name}
                                          type="checkbox"
                                          checked={
                                            props.selectSpecies &&
                                            props.selectSpecies.includes(
                                              item._id
                                            )
                                          }
                                          onChange={() => {
                                            const data = [
                                              ...props.selectSpecies,
                                            ];
                                            const data1 = [
                                              ...props.selectSpeciesName,
                                            ];
                                            if (data.includes(item._id)) {
                                              const a = data.filter(
                                                (item1) => item1 !== item._id
                                              );
                                              const b = data1.filter(
                                                (item1) =>
                                                  item1._id !== item._id
                                              );
                                              props.setSelectSpeciesName(b);
                                              props.setSelectSpecies(a);
                                            } else {
                                              data.push(item._id);
                                              data1.push(item);
                                              props.setSelectSpeciesName(data1);
                                              props.setSelectSpecies(data);
                                            }
                                          }}
                                        />
                                        <span class="checkmark"></span>
                                      </label>
                                    </li>
                                  )
                              )}
                          </ul>
                          {props.species &&
                            props.species.data &&
                            props.species.data.length > 10 && (
                              <Link
                                class="link-green "
                                onClick={() => {
                                  props.toggleSpeciesViewAll();
                                  props.setShowMenu(false);
                                }}
                              >
                                View All
                              </Link>
                            )}
                        </Accordion.Body>
                      </Accordion.Item>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Accordion.Item
                    className="tab-pane fade show active accordion-item"
                    id="one-tab-pane"
                    eventKey="1"
                  >
                    <Accordion.Header
                      className="accordion-header d-lg-block d-none"
                      id="headingOne"
                    >
                      Endangered Species
                    </Accordion.Header>

                    <Accordion.Body className="accordion-body">
                      {props.selectSpecies &&
                        props.selectSpecies.length > 0 && (
                          <Link
                            class="link-green cursor-pointer"
                            style={{ marginBottom: "10px" }}
                            onClick={() => {
                              const data = [];
                              props.setSelectSpeciesName(data);
                              props.setSelectSpecies(data);
                            }}
                          >
                            Clear all
                          </Link>
                        )}

                      <ul class="filter-content-list">
                        {props.species &&
                          props.species.data &&
                          props.species.data.length > 0 &&
                          props.species.data.map(
                            (item, i) =>
                              i < 10 && (
                                <li class="filter-content-item">
                                  <label class="filter-content-box">
                                    {item.name}
                                    <input
                                      value={item._id}
                                      name={item.name}
                                      type="checkbox"
                                      checked={
                                        props.selectSpecies &&
                                        props.selectSpecies.includes(item._id)
                                      }
                                      onChange={() => {
                                        const data = [...props.selectSpecies];
                                        const data1 = [
                                          ...props.selectSpeciesName,
                                        ];
                                        if (data.includes(item._id)) {
                                          const a = data.filter(
                                            (item1) => item1 !== item._id
                                          );
                                          const b = data1.filter(
                                            (item1) => item1._id !== item._id
                                          );
                                          props.setSelectSpeciesName(b);
                                          props.setSelectSpecies(a);
                                        } else {
                                          data.push(item._id);
                                          data1.push(item);
                                          props.setSelectSpeciesName(data1);
                                          props.setSelectSpecies(data);
                                        }
                                      }}
                                    />
                                    <span class="checkmark"></span>
                                  </label>
                                </li>
                              )
                          )}
                      </ul>
                      {props.species &&
                        props.species.data &&
                        props.species.data.length > 10 && (
                          <Link
                            class="link-green "
                            onClick={() => {
                              props.toggleSpeciesViewAll();
                              props.setShowMenu(false);
                            }}
                          >
                            View All
                          </Link>
                        )}
                    </Accordion.Body>
                  </Accordion.Item>
                </>
              )}
            </>
          ) : (
            ""
          )}
          {props.page === "Organization" ? (
            <>
              {props.showMenu ? (
                <>
                  {isSpeciesMenu && (
                    <>
                      <Accordion.Item
                        className="tab-pane fade show active accordion-item"
                        id="one-tab-pane"
                        eventKey="1"
                      >
                        <Accordion.Header
                          className="accordion-header d-lg-block d-none"
                          id="headingOne"
                        >
                          Endangered Species
                        </Accordion.Header>
                        Endangered Species
                        <Accordion.Body className="accordion-body">
                          {props.selectSpecies &&
                            props.selectSpecies.length > 0 && (
                              <Link
                                class="link-green cursor-pointer"
                                style={{ marginBottom: "10px" }}
                                onClick={() => {
                                  const data = [];
                                  props.setSelectSpecies(data);
                                  props.setSelectSpeciesName(data);
                                }}
                              >
                                Clear all
                              </Link>
                            )}

                          <ul class="filter-content-list">
                            {props.species &&
                              props.species.data &&
                              props.species.data.length > 0 &&
                              props.species.data.map(
                                (item, i) =>
                                  i < 10 && (
                                    <li class="filter-content-item">
                                      <label class="filter-content-box">
                                        {item.name}
                                        <input
                                          value={item._id}
                                          name={item.name}
                                          type="checkbox"
                                          checked={
                                            props.selectSpecies &&
                                            props.selectSpecies.includes(
                                              item._id
                                            )
                                          }
                                          onChange={() => {
                                            const data = [
                                              ...props.selectSpecies,
                                            ];
                                            const data1 = [
                                              ...props.selectSpeciesName,
                                            ];
                                            if (data.includes(item._id)) {
                                              const a = data.filter(
                                                (item1) => item1 !== item._id
                                              );
                                              const b = data1.filter(
                                                (item1) =>
                                                  item1._id !== item._id
                                              );
                                              props.setSelectSpeciesName(b);
                                              props.setSelectSpecies(a);
                                            } else {
                                              data.push(item._id);
                                              data1.push(item);
                                              props.setSelectSpeciesName(data1);
                                              props.setSelectSpecies(data);
                                            }
                                          }}
                                        />
                                        <span class="checkmark"></span>
                                      </label>
                                    </li>
                                  )
                              )}
                          </ul>
                          {props.species &&
                            props.species.data &&
                            props.species.data.length > 10 && (
                              <Link
                                class="link-green "
                                onClick={() => {
                                  props.toggleSpeciesViewAll();
                                  props.setShowMenu(false);
                                }}
                              >
                                View All
                              </Link>
                            )}
                        </Accordion.Body>
                      </Accordion.Item>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Accordion.Item
                    className="tab-pane fade show active accordion-item"
                    id="one-tab-pane"
                    eventKey="1"
                  >
                    <Accordion.Header
                      className="accordion-header d-lg-block d-none"
                      id="headingOne"
                    >
                      Endangered Species
                    </Accordion.Header>

                    <Accordion.Body className="accordion-body">
                      {props.selectSpecies &&
                        props.selectSpecies.length > 0 && (
                          <Link
                            class="link-green cursor-pointer"
                            style={{ marginBottom: "10px" }}
                            onClick={() => {
                              const data = [];
                              props.setSelectSpeciesName(data);
                              props.setSelectSpecies(data);
                            }}
                          >
                            Clear all
                          </Link>
                        )}

                      <ul class="filter-content-list">
                        {props.species &&
                          props.species.data &&
                          props.species.data.length > 0 &&
                          props.species.data.map(
                            (item, i) =>
                              i < 10 && (
                                <li class="filter-content-item">
                                  <label class="filter-content-box">
                                    {item.name}
                                    <input
                                      value={item._id}
                                      name={item.name}
                                      type="checkbox"
                                      checked={
                                        props.selectSpecies &&
                                        props.selectSpecies.includes(item._id)
                                      }
                                      onChange={() => {
                                        const data = [...props.selectSpecies];
                                        const data1 = [
                                          ...props.selectSpeciesName,
                                        ];
                                        if (data.includes(item._id)) {
                                          const a = data.filter(
                                            (item1) => item1 !== item._id
                                          );
                                          const b = data1.filter(
                                            (item1) => item1._id !== item._id
                                          );
                                          props.setSelectSpeciesName(b);
                                          props.setSelectSpecies(a);
                                        } else {
                                          data.push(item._id);
                                          data1.push(item);
                                          props.setSelectSpeciesName(data1);
                                          props.setSelectSpecies(data);
                                        }
                                      }}
                                    />
                                    <span class="checkmark"></span>
                                  </label>
                                </li>
                              )
                          )}
                      </ul>
                      {props.species &&
                        props.species.data &&
                        props.species.data.length > 10 && (
                          <Link
                            class="link-green "
                            onClick={() => {
                              props.toggleSpeciesViewAll();
                              props.setShowMenu(false);
                            }}
                          >
                            View All
                          </Link>
                        )}
                    </Accordion.Body>
                  </Accordion.Item>
                </>
              )}

              {props.showMenu ? (
                <>
                  {isRegionMenu && (
                    <>
                      <Accordion.Item
                        className="tab-pane fade show active accordion-item news-region-sidebar "
                        id="one-tab-pane"
                        eventKey="2"
                      >
                        <Accordion.Header
                          className="accordion-header d-lg-block d-none"
                          id="headingOne"
                        >
                          Regions
                        </Accordion.Header>
                        Regions
                        <Accordion.Body className="accordion-body">
                          {props.selectRegion &&
                            props.selectRegion.length > 0 && (
                              <Link
                                class="link-green "
                                style={{ marginBottom: "10px" }}
                                onClick={() => {
                                  const data = [];
                                  props.setSelectRegionName(data);
                                  props.setSelectRegion(data);
                                }}
                              >
                                Clear all
                              </Link>
                            )}
                          <ul class="filter-content-list">
                            <Accordion.Item
                              eventKey="999"
                              className="tab-pane fade show active accordion-item news-region-sidebar"
                            >
                              {isRegionMenu && props.showMenu && (
                                <span className="accor-font-us">
                                  {" "}
                                  United States
                                </span>
                              )}
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
                                {props.USRegion &&
                                  props.USRegion.length > 0 &&
                                  props.USRegion.map((item) => (
                                    <li class="filter-content-item">
                                      <label class="filter-content-box">
                                        {item.name}
                                        <input
                                          type="checkbox"
                                          checked={
                                            props.selectRegion &&
                                            props.selectRegion.includes(
                                              item._id
                                            )
                                          }
                                          onChange={() => {
                                            const data = [
                                              ...props.selectRegion,
                                            ];
                                            const data1 = [
                                              ...props.selectRegionName,
                                            ];
                                            if (data.includes(item._id)) {
                                              const a = data.filter(
                                                (item1) => item1 != item._id
                                              );
                                              const b = data1.filter(
                                                (item1) => item1._id != item._id
                                              );
                                              props.setSelectRegionName(b);
                                              props.setSelectRegion(a);
                                            } else {
                                              data.push(item._id);
                                              data1.push(item);
                                              props.setSelectRegionName(data1);
                                              props.setSelectRegion(data);
                                            }
                                          }}
                                        />
                                        <span class="checkmark"></span>
                                      </label>
                                    </li>
                                  ))}
                                <li class="ei-category-item"></li>
                              </Accordion.Body>
                            </Accordion.Item>

                            {props.otherRegion &&
                              props.otherRegion.length > 0 &&
                              props.otherRegion.map(
                                (item, i) =>
                                  i < 10 && (
                                    <li class="filter-content-item">
                                      <label class="filter-content-box">
                                        {item.name}
                                        <input
                                          type="checkbox"
                                          checked={
                                            props.selectRegion &&
                                            props.selectRegion.includes(
                                              item._id
                                            )
                                          }
                                          onChange={() => {
                                            const data = [
                                              ...props.selectRegion,
                                            ];
                                            const data1 = [
                                              ...props.selectRegionName,
                                            ];
                                            if (data.includes(item._id)) {
                                              const a = data.filter(
                                                (item1) => item1 !== item._id
                                              );
                                              const b = data1.filter(
                                                (item1) =>
                                                  item1._id !== item._id
                                              );
                                              props.setSelectRegionName(b);
                                              props.setSelectRegion(a);
                                            } else {
                                              data.push(item._id);
                                              data1.push(item);
                                              props.setSelectRegionName(data1);
                                              props.setSelectRegion(data);
                                            }
                                          }}
                                        />
                                        <span class="checkmark"></span>
                                      </label>
                                    </li>
                                  )
                              )}
                          </ul>
                          {props.otherRegion &&
                            props.otherRegion.length > 10 && (
                              <Link
                                class="link-green "
                                onClick={() => {
                                  props.toggleRegionsViewAll();
                                  props.setShowMenu(false);
                                }}
                              >
                                View All
                              </Link>
                            )}
                        </Accordion.Body>
                      </Accordion.Item>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Accordion.Item
                    className="tab-pane fade show active accordion-item"
                    id="one-tab-pane"
                    eventKey="2"
                  >
                    <Accordion.Header
                      className="accordion-header d-lg-block d-none"
                      id="headingOne"
                    >
                      Regions
                    </Accordion.Header>

                    <Accordion.Body className="accordion-body">
                      {props.selectRegion.length > 0 && (
                        <Link
                          class="link-green "
                          style={{ marginBottom: "10px" }}
                          onClick={() => {
                            const data = [];
                            props.setSelectRegionName(data);
                            props.setSelectRegion(data);
                          }}
                        >
                          Clear all
                        </Link>
                      )}
                      <ul class="filter-content-list">
                        <Accordion.Item
                          eventKey="999"
                          className="tab-pane fade show active accordion-item news-region-sidebar"
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
                            {props.USRegion &&
                              props.USRegion.length > 0 &&
                              props.USRegion.map((item) => (
                                <li class="filter-content-item">
                                  <label class="filter-content-box">
                                    {item.name}
                                    <input
                                      type="checkbox"
                                      checked={
                                        props.selectRegion &&
                                        props.selectRegion.includes(item._id)
                                      }
                                      onChange={() => {
                                        const data = [...props.selectRegion];
                                        const data1 = [
                                          ...props.selectRegionName,
                                        ];
                                        if (data.includes(item._id)) {
                                          const a = data.filter(
                                            (item1) => item1 !== item._id
                                          );
                                          const b = data1.filter(
                                            (item1) => item1._id !== item._id
                                          );
                                          props.setSelectRegionName(b);
                                          props.setSelectRegion(a);
                                        } else {
                                          data.push(item._id);
                                          data1.push(item);
                                          props.setSelectRegionName(data1);
                                          props.setSelectRegion(data);
                                        }
                                      }}
                                    />
                                    <span class="checkmark"></span>
                                  </label>
                                </li>
                              ))}
                            <li class="ei-category-item"></li>
                          </Accordion.Body>
                        </Accordion.Item>

                        {props.otherRegion &&
                          props.otherRegion.length > 0 &&
                          props.otherRegion.map(
                            (item, i) =>
                              i < 10 && (
                                <li class="filter-content-item">
                                  <label class="filter-content-box">
                                    {item.name}
                                    <input
                                      type="checkbox"
                                      checked={
                                        props.selectRegion &&
                                        props.selectRegion.includes(item._id)
                                      }
                                      onChange={() => {
                                        const data = [...props.selectRegion];
                                        const data1 = [
                                          ...props.selectRegionName,
                                        ];
                                        if (data.includes(item._id)) {
                                          const a = data.filter(
                                            (item1) => item1 != item._id
                                          );
                                          const b = data1.filter(
                                            (item1) => item1._id != item._id
                                          );
                                          props.setSelectRegionName(b);
                                          props.setSelectRegion(a);
                                        } else {
                                          data.push(item._id);
                                          data1.push(item);
                                          props.setSelectRegionName(data1);
                                          props.setSelectRegion(data);
                                        }
                                      }}
                                    />
                                    <span class="checkmark"></span>
                                  </label>
                                </li>
                              )
                          )}
                      </ul>
                      {props.otherRegion && props.otherRegion.length > 10 && (
                        <Link
                          class="link-green "
                          onClick={() => {
                            props.toggleRegionsViewAll();
                            props.setShowMenu(false);
                          }}
                        >
                          View All
                        </Link>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </>
              )}

              {props.showMenu ? (
                <>
                  {isEnvironmentalistMenu && (
                    <>
                      <Accordion.Item
                        className="tab-pane fade show active accordion-item"
                        id="one-tab-pane"
                        eventKey="3"
                      >
                        <Accordion.Header
                          className="accordion-header d-lg-block d-none"
                          id="headingOne"
                        >
                          Environmentalists
                        </Accordion.Header>
                        Environmentalists
                        <Accordion.Body className="accordion-body">
                          {props.selectEnvironmentalist &&
                            props.selectEnvironmentalist.length > 0 && (
                              <Link
                                class="link-green cursor-pointer"
                                style={{ marginBottom: "10px" }}
                                onClick={() => {
                                  const data = [];
                                  props.setSelectEnvironmentalist(data);
                                  props.setSelectEnvironmentalistName(data);
                                }}
                              >
                                Clear all
                              </Link>
                            )}

                          <ul class="filter-content-list">
                            {props.environmentalist &&
                              props.environmentalist.data &&
                              props.environmentalist.data.length > 0 &&
                              props.environmentalist.data.map(
                                (item, i) =>
                                  i < 10 && (
                                    <li class="filter-content-item">
                                      <label class="filter-content-box">
                                        {item.name}
                                        <input
                                          value={item._id}
                                          name={item.name}
                                          type="checkbox"
                                          checked={
                                            props.selectEnvironmentalist &&
                                            props.selectEnvironmentalist.includes(
                                              item._id
                                            )
                                          }
                                          onChange={() => {
                                            const data = [
                                              ...props.selectEnvironmentalist,
                                            ];
                                            const data1 = [
                                              ...props.selectEnvironmentalistName,
                                            ];
                                            if (data.includes(item._id)) {
                                              const a = data.filter(
                                                (item1) => item1 !== item._id
                                              );
                                              const b = data1.filter(
                                                (item1) =>
                                                  item1._id !== item._id
                                              );
                                              props.setSelectEnvironmentalistName(
                                                b
                                              );
                                              props.setSelectEnvironmentalist(
                                                a
                                              );
                                            } else {
                                              data.push(item._id);
                                              data1.push(item);
                                              props.setSelectEnvironmentalistName(
                                                data1
                                              );
                                              props.setSelectEnvironmentalist(
                                                data
                                              );
                                            }
                                          }}
                                        />
                                        <span class="checkmark"></span>
                                      </label>
                                    </li>
                                  )
                              )}
                          </ul>
                          {props.environmentalist &&
                            props.environmentalist.data &&
                            props.environmentalist.data.length > 10 && (
                              <Link
                                class="link-green "
                                onClick={() => {
                                  props.toggleEnvironmentalistViewAll();
                                  props.setShowMenu(false);
                                }}
                              >
                                View All
                              </Link>
                            )}
                        </Accordion.Body>
                      </Accordion.Item>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Accordion.Item
                    className="tab-pane fade show active accordion-item"
                    id="one-tab-pane"
                    eventKey="3"
                  >
                    <Accordion.Header
                      className="accordion-header d-lg-block d-none"
                      id="headingOne"
                    >
                      Environmentalists
                    </Accordion.Header>

                    <Accordion.Body className="accordion-body">
                      {props.selectEnvironmentalist &&
                        props.selectEnvironmentalist.length > 0 && (
                          <Link
                            class="link-green cursor-pointer"
                            style={{ marginBottom: "10px" }}
                            onClick={() => {
                              const data = [];
                              props.setSelectEnvironmentalistName(data);
                              props.setSelectEnvironmentalist(data);
                            }}
                          >
                            Clear all
                          </Link>
                        )}

                      <ul class="filter-content-list">
                        {props.environmentalist &&
                          props.environmentalist.data &&
                          props.environmentalist.data.length > 0 &&
                          props.environmentalist.data.map(
                            (item, i) =>
                              i < 10 && (
                                <li class="filter-content-item">
                                  <label class="filter-content-box">
                                    {item.name}
                                    <input
                                      value={item._id}
                                      name={item.name}
                                      type="checkbox"
                                      checked={
                                        props.selectaEnvironmentalist &&
                                        props.selectEnvironmentalist.includes(
                                          item._id
                                        )
                                      }
                                      onChange={() => {
                                        const data = [
                                          ...props.selectEnvironmentalist,
                                        ];
                                        const data1 = [
                                          ...props.selectEnvironmentalistName,
                                        ];
                                        if (data.includes(item._id)) {
                                          const a = data.filter(
                                            (item1) => item1 !== item._id
                                          );
                                          const b = data1.filter(
                                            (item1) => item1._id !== item._id
                                          );
                                          props.setSelectEnvironmentalistName(
                                            b
                                          );
                                          props.setSelectEnvironmentalist(a);
                                        } else {
                                          data.push(item._id);
                                          data1.push(item);
                                          props.setSelectEnvironmentalistName(
                                            data1
                                          );
                                          props.setSelectEnvironmentalist(data);
                                        }
                                      }}
                                    />
                                    <span class="checkmark"></span>
                                  </label>
                                </li>
                              )
                          )}
                      </ul>
                      {props.environmentalist &&
                        props.environmentalist.data &&
                        props.environmentalist.data.length > 10 && (
                          <Link
                            class="link-green "
                            onClick={() => {
                              props.toggleEnvironmentalistViewAll();
                              props.setShowMenu(false);
                            }}
                          >
                            View All
                          </Link>
                        )}
                    </Accordion.Body>
                  </Accordion.Item>
                </>
              )}
            </>
          ) : (
            ""
          )}
          {props.page === "Science And Education" ? (
            <>
              {props.showMenu ? (
                <>
                  {isScienceCatMenu && (
                    <>
                      <Accordion.Item
                        className="tab-pane fade show active accordion-item"
                        id="one-tab-pane"
                        eventKey="1"
                      >
                        <Accordion.Header
                          className="accordion-header d-lg-block d-none"
                          id="headingOne"
                        >
                          Category
                        </Accordion.Header>
                        Category
                        <Accordion.Body className="accordion-body">
                          {props.selectScienceCat &&
                            props.selectScienceCat.length > 0 && (
                              <Link
                                class="link-green cursor-pointer"
                                style={{ marginBottom: "10px" }}
                                onClick={() => {
                                  const data = [];
                                  props.setSelectScienceCat(data);
                                  props.setSelectScienceCatName(data);
                                }}
                              >
                                Clear all
                              </Link>
                            )}

                          <ul class="filter-content-list">
                            {props.scienceCategory &&
                              props.scienceCategory.data &&
                              props.scienceCategory.data.length > 0 &&
                              props.scienceCategory.data.map(
                                (item, i) =>
                                  i < 10 && (
                                    <li class="filter-content-item">
                                      <label class="filter-content-box">
                                        {item.name}
                                        <input
                                          value={item._id}
                                          name={item.name}
                                          type="checkbox"
                                          checked={
                                            props.selectScienceCat &&
                                            props.selectScienceCat.includes(
                                              item._id
                                            )
                                          }
                                          onChange={() => {
                                            const data = [
                                              ...props.selectScienceCat,
                                            ];
                                            const data1 = [
                                              ...props.selectScienceCatName,
                                            ];
                                            if (data.includes(item._id)) {
                                              const a = data.filter(
                                                (item1) => item1 !== item._id
                                              );
                                              const b = data1.filter(
                                                (item1) =>
                                                  item1._id !== item._id
                                              );
                                              props.setSelectScienceCatName(b);
                                              props.setSelectScienceCat(a);
                                            } else {
                                              data.push(item._id);
                                              data1.push(item);
                                              props.setSelectScienceCatName(
                                                data1
                                              );
                                              props.setSelectScienceCat(data);
                                            }
                                          }}
                                        />
                                        <span class="checkmark"></span>
                                      </label>
                                    </li>
                                  )
                              )}
                          </ul>
                          {props.scienceCategory &&
                            props.scienceCategory.data &&
                            props.scienceCategory.data.length > 10 && (
                              <Link
                                class="link-green "
                                onClick={() => {
                                  props.toggleScienceCatViewAll();
                                  props.setShowMenu(false);
                                }}
                              >
                                View All
                              </Link>
                            )}
                        </Accordion.Body>
                      </Accordion.Item>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Accordion.Item
                    className="tab-pane fade show active accordion-item"
                    id="one-tab-pane"
                    eventKey="1"
                  >
                    <Accordion.Header
                      className="accordion-header d-lg-block d-none"
                      id="headingOne"
                    >
                      Category
                    </Accordion.Header>

                    <Accordion.Body className="accordion-body">
                      {props.selectScienceCat &&
                        props.selectScienceCat.length > 0 && (
                          <Link
                            class="link-green cursor-pointer"
                            style={{ marginBottom: "10px" }}
                            onClick={() => {
                              const data = [];
                              props.setSelectScienceCatName(data);
                              props.setSelectScienceCat(data);
                            }}
                          >
                            Clear all
                          </Link>
                        )}

                      <ul class="filter-content-list">
                        {props.scienceCategory &&
                          props.scienceCategory.data &&
                          props.scienceCategory.data.length > 0 &&
                          props.scienceCategory.data.map(
                            (item, i) =>
                              i < 10 && (
                                <li class="filter-content-item">
                                  <label class="filter-content-box">
                                    {item.name}
                                    <input
                                      value={item._id}
                                      name={item.name}
                                      type="checkbox"
                                      checked={
                                        props.selectScienceCat &&
                                        props.selectScienceCat.includes(
                                          item._id
                                        )
                                      }
                                      onChange={() => {
                                        const data = [
                                          ...props.selectScienceCat,
                                        ];
                                        const data1 = [
                                          ...props.selectScienceCatName,
                                        ];
                                        if (data.includes(item._id)) {
                                          const a = data.filter(
                                            (item1) => item1 !== item._id
                                          );
                                          const b = data1.filter(
                                            (item1) => item1._id !== item._id
                                          );
                                          props.setSelectScienceCatName(b);
                                          props.setSelectScienceCat(a);
                                        } else {
                                          data.push(item._id);
                                          data1.push(item);
                                          props.setSelectScienceCatName(data1);
                                          props.setSelectScienceCat(data);
                                        }
                                      }}
                                    />
                                    <span class="checkmark"></span>
                                  </label>
                                </li>
                              )
                          )}
                      </ul>
                      {props.scienceCategory &&
                        props.scienceCategory.data &&
                        props.scienceCategory.data.length > 10 && (
                          <Link
                            class="link-green "
                            onClick={() => {
                              props.toggleScienceCatViewAll();
                              props.setShowMenu(false);
                            }}
                          >
                            View All
                          </Link>
                        )}
                    </Accordion.Body>
                  </Accordion.Item>
                </>
              )}
              {props.showMenu ? (
                <>
                  {isSpeciesMenu && (
                    <>
                      <Accordion.Item
                        className="tab-pane fade show active accordion-item"
                        id="one-tab-pane"
                        eventKey="2"
                      >
                        <Accordion.Header
                          className="accordion-header d-lg-block d-none"
                          id="headingOne"
                        >
                          Endangered Species
                        </Accordion.Header>
                        Endangered Species
                        <Accordion.Body className="accordion-body">
                          {props.selectSpecies &&
                            props.selectSpecies.length > 0 && (
                              <Link
                                class="link-green cursor-pointer"
                                style={{ marginBottom: "10px" }}
                                onClick={() => {
                                  const data = [];
                                  props.setSelectSpecies(data);
                                  props.setSelectSpeciesName(data);
                                }}
                              >
                                Clear all
                              </Link>
                            )}

                          <ul class="filter-content-list">
                            {props.species &&
                              props.species.data &&
                              props.species.data.length > 0 &&
                              props.species.data.map(
                                (item, i) =>
                                  i < 10 && (
                                    <li class="filter-content-item">
                                      <label class="filter-content-box">
                                        {item.name}
                                        <input
                                          value={item._id}
                                          name={item.name}
                                          type="checkbox"
                                          checked={
                                            props.selectSpecies &&
                                            props.selectSpecies.includes(
                                              item._id
                                            )
                                          }
                                          onChange={() => {
                                            const data = [
                                              ...props.selectSpecies,
                                            ];
                                            const data1 = [
                                              ...props.selectSpeciesName,
                                            ];
                                            if (data.includes(item._id)) {
                                              const a = data.filter(
                                                (item1) => item1 !== item._id
                                              );
                                              const b = data1.filter(
                                                (item1) =>
                                                  item1._id !== item._id
                                              );
                                              props.setSelectSpeciesName(b);
                                              props.setSelectSpecies(a);
                                            } else {
                                              data.push(item._id);
                                              data1.push(item);
                                              props.setSelectSpeciesName(data1);
                                              props.setSelectSpecies(data);
                                            }
                                          }}
                                        />
                                        <span class="checkmark"></span>
                                      </label>
                                    </li>
                                  )
                              )}
                          </ul>
                          {props.species &&
                            props.species.data &&
                            props.species.data.length > 10 && (
                              <Link
                                class="link-green "
                                onClick={() => {
                                  props.toggleSpeciesViewAll();
                                  props.setShowMenu(false);
                                }}
                              >
                                View All
                              </Link>
                            )}
                        </Accordion.Body>
                      </Accordion.Item>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Accordion.Item
                    className="tab-pane fade show active accordion-item"
                    id="one-tab-pane"
                    eventKey="2"
                  >
                    <Accordion.Header
                      className="accordion-header d-lg-block d-none"
                      id="headingOne"
                    >
                      Endangered Species
                    </Accordion.Header>

                    <Accordion.Body className="accordion-body">
                      {props.selectSpecies &&
                        props.selectSpecies.length > 0 && (
                          <Link
                            class="link-green cursor-pointer"
                            style={{ marginBottom: "10px" }}
                            onClick={() => {
                              const data = [];
                              props.setSelectSpeciesName(data);
                              props.setSelectSpecies(data);
                            }}
                          >
                            Clear all
                          </Link>
                        )}

                      <ul class="filter-content-list">
                        {props.species &&
                          props.species.data &&
                          props.species.data.length > 0 &&
                          props.species.data.map(
                            (item, i) =>
                              i < 10 && (
                                <li class="filter-content-item">
                                  <label class="filter-content-box">
                                    {item.name}
                                    <input
                                      value={item._id}
                                      name={item.name}
                                      type="checkbox"
                                      checked={
                                        props.selectSpecies &&
                                        props.selectSpecies.includes(item._id)
                                      }
                                      onChange={() => {
                                        const data = [...props.selectSpecies];
                                        const data1 = [
                                          ...props.selectSpeciesName,
                                        ];
                                        if (data.includes(item._id)) {
                                          const a = data.filter(
                                            (item1) => item1 !== item._id
                                          );
                                          const b = data1.filter(
                                            (item1) => item1._id !== item._id
                                          );
                                          props.setSelectSpeciesName(b);
                                          props.setSelectSpecies(a);
                                        } else {
                                          data.push(item._id);
                                          data1.push(item);
                                          props.setSelectSpeciesName(data1);
                                          props.setSelectSpecies(data);
                                        }
                                      }}
                                    />
                                    <span class="checkmark"></span>
                                  </label>
                                </li>
                              )
                          )}
                      </ul>
                      {props.species &&
                        props.species.data &&
                        props.species.data.length > 10 && (
                          <Link
                            class="link-green "
                            onClick={() => {
                              props.toggleSpeciesViewAll();
                              props.setShowMenu(false);
                            }}
                          >
                            View All
                          </Link>
                        )}
                    </Accordion.Body>
                  </Accordion.Item>
                </>
              )}

              {props.showMenu ? (
                <>
                  {isRegionMenu && (
                    <>
                      <Accordion.Item
                        className="tab-pane fade show active accordion-item news-region-sidebar "
                        id="one-tab-pane"
                        eventKey="3"
                      >
                        <Accordion.Header
                          className="accordion-header d-lg-block d-none"
                          id="headingOne"
                        >
                          Regions
                        </Accordion.Header>
                        Regions
                        <Accordion.Body className="accordion-body">
                          {props.selectRegion &&
                            props.selectRegion.length > 0 && (
                              <Link
                                class="link-green "
                                style={{ marginBottom: "10px" }}
                                onClick={() => {
                                  const data = [];
                                  props.setSelectRegionName(data);
                                  props.setSelectRegion(data);
                                }}
                              >
                                Clear all
                              </Link>
                            )}
                          <ul class="filter-content-list">
                            <Accordion.Item
                              eventKey="999"
                              className="tab-pane fade show active accordion-item news-region-sidebar"
                            >
                              {isRegionMenu && props.showMenu && (
                                <span className="accor-font-us">
                                  {" "}
                                  United States
                                </span>
                              )}
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
                                {props.USRegion &&
                                  props.USRegion.length > 0 &&
                                  props.USRegion.map((item) => (
                                    <li class="filter-content-item">
                                      <label class="filter-content-box">
                                        {item.name}
                                        <input
                                          type="checkbox"
                                          checked={
                                            props.selectRegion &&
                                            props.selectRegion.includes(
                                              item._id
                                            )
                                          }
                                          onChange={() => {
                                            const data = [
                                              ...props.selectRegion,
                                            ];
                                            const data1 = [
                                              ...props.selectRegionName,
                                            ];
                                            if (data.includes(item._id)) {
                                              const a = data.filter(
                                                (item1) => item1 != item._id
                                              );
                                              const b = data1.filter(
                                                (item1) => item1._id != item._id
                                              );
                                              props.setSelectRegionName(b);
                                              props.setSelectRegion(a);
                                            } else {
                                              data.push(item._id);
                                              data1.push(item);
                                              props.setSelectRegionName(data1);
                                              props.setSelectRegion(data);
                                            }
                                          }}
                                        />
                                        <span class="checkmark"></span>
                                      </label>
                                    </li>
                                  ))}
                                <li class="ei-category-item"></li>
                              </Accordion.Body>
                            </Accordion.Item>

                            {props.otherRegion &&
                              props.otherRegion.length > 0 &&
                              props.otherRegion.map(
                                (item, i) =>
                                  i < 10 && (
                                    <li class="filter-content-item">
                                      <label class="filter-content-box">
                                        {item.name}
                                        <input
                                          type="checkbox"
                                          checked={
                                            props.selectRegion &&
                                            props.selectRegion.includes(
                                              item._id
                                            )
                                          }
                                          onChange={() => {
                                            const data = [
                                              ...props.selectRegion,
                                            ];
                                            const data1 = [
                                              ...props.selectRegionName,
                                            ];
                                            if (data.includes(item._id)) {
                                              const a = data.filter(
                                                (item1) => item1 !== item._id
                                              );
                                              const b = data1.filter(
                                                (item1) =>
                                                  item1._id !== item._id
                                              );
                                              props.setSelectRegionName(b);
                                              props.setSelectRegion(a);
                                            } else {
                                              data.push(item._id);
                                              data1.push(item);
                                              props.setSelectRegionName(data1);
                                              props.setSelectRegion(data);
                                            }
                                          }}
                                        />
                                        <span class="checkmark"></span>
                                      </label>
                                    </li>
                                  )
                              )}
                          </ul>
                          {props.otherRegion &&
                            props.otherRegion.length > 10 && (
                              <Link
                                class="link-green "
                                onClick={() => {
                                  props.toggleRegionsViewAll();
                                  props.setShowMenu(false);
                                }}
                              >
                                View All
                              </Link>
                            )}
                        </Accordion.Body>
                      </Accordion.Item>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Accordion.Item
                    className="tab-pane fade show active accordion-item"
                    id="one-tab-pane"
                    eventKey="3"
                  >
                    <Accordion.Header
                      className="accordion-header d-lg-block d-none"
                      id="headingOne"
                    >
                      Regions
                    </Accordion.Header>

                    <Accordion.Body className="accordion-body">
                      {props.selectRegion.length > 0 && (
                        <Link
                          class="link-green "
                          style={{ marginBottom: "10px" }}
                          onClick={() => {
                            const data = [];
                            props.setSelectRegionName(data);
                            props.setSelectRegion(data);
                          }}
                        >
                          Clear all
                        </Link>
                      )}
                      <ul class="filter-content-list">
                        <Accordion.Item
                          eventKey="999"
                          className="tab-pane fade show active accordion-item news-region-sidebar"
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
                            {props.USRegion &&
                              props.USRegion.length > 0 &&
                              props.USRegion.map((item) => (
                                <li class="filter-content-item">
                                  <label class="filter-content-box">
                                    {item.name}
                                    <input
                                      type="checkbox"
                                      checked={
                                        props.selectRegion &&
                                        props.selectRegion.includes(item._id)
                                      }
                                      onChange={() => {
                                        const data = [...props.selectRegion];
                                        const data1 = [
                                          ...props.selectRegionName,
                                        ];
                                        if (data.includes(item._id)) {
                                          const a = data.filter(
                                            (item1) => item1 !== item._id
                                          );
                                          const b = data1.filter(
                                            (item1) => item1._id !== item._id
                                          );
                                          props.setSelectRegionName(b);
                                          props.setSelectRegion(a);
                                        } else {
                                          data.push(item._id);
                                          data1.push(item);
                                          props.setSelectRegionName(data1);
                                          props.setSelectRegion(data);
                                        }
                                      }}
                                    />
                                    <span class="checkmark"></span>
                                  </label>
                                </li>
                              ))}
                            <li class="ei-category-item"></li>
                          </Accordion.Body>
                        </Accordion.Item>

                        {props.otherRegion &&
                          props.otherRegion.length > 0 &&
                          props.otherRegion.map(
                            (item, i) =>
                              i < 10 && (
                                <li class="filter-content-item">
                                  <label class="filter-content-box">
                                    {item.name}
                                    <input
                                      type="checkbox"
                                      checked={
                                        props.selectRegion &&
                                        props.selectRegion.includes(item._id)
                                      }
                                      onChange={() => {
                                        const data = [...props.selectRegion];
                                        const data1 = [
                                          ...props.selectRegionName,
                                        ];
                                        if (data.includes(item._id)) {
                                          const a = data.filter(
                                            (item1) => item1 != item._id
                                          );
                                          const b = data1.filter(
                                            (item1) => item1._id != item._id
                                          );
                                          props.setSelectRegionName(b);
                                          props.setSelectRegion(a);
                                        } else {
                                          data.push(item._id);
                                          data1.push(item);
                                          props.setSelectRegionName(data1);
                                          props.setSelectRegion(data);
                                        }
                                      }}
                                    />
                                    <span class="checkmark"></span>
                                  </label>
                                </li>
                              )
                          )}
                      </ul>
                      {props.otherRegion && props.otherRegion.length > 10 && (
                        <Link
                          class="link-green "
                          onClick={() => {
                            props.toggleRegionsViewAll();
                            props.setShowMenu(false);
                          }}
                        >
                          View All
                        </Link>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </>
              )}

              {props.showMenu ? (
                <>
                  {isOrganizationMenu && (
                    <>
                      <Accordion.Item
                        className="tab-pane fade show active accordion-item"
                        id="one-tab-pane"
                        eventKey="4"
                      >
                        <Accordion.Header
                          className="accordion-header d-lg-block d-none"
                          id="headingOne"
                        >
                          Organizations
                        </Accordion.Header>
                        Organizations
                        <Accordion.Body className="accordion-body">
                          {props.selectOrganization &&
                            props.selectOrganization.length > 0 && (
                              <Link
                                class="link-green cursor-pointer"
                                style={{ marginBottom: "10px" }}
                                onClick={() => {
                                  const data = [];
                                  props.setSelectOrganization(data);
                                  props.setSelectOrganizationName(data);
                                }}
                              >
                                Clear all
                              </Link>
                            )}

                          <ul class="filter-content-list">
                            {props.organization &&
                              props.organization.data &&
                              props.organization.data.length > 0 &&
                              props.organization.data.map(
                                (item, i) =>
                                  i < 10 && (
                                    <li class="filter-content-item">
                                      <label class="filter-content-box">
                                        {item.name}
                                        <input
                                          value={item._id}
                                          name={item.name}
                                          type="checkbox"
                                          checked={
                                            props.selectOrganization &&
                                            props.selectOrganization.includes(
                                              item._id
                                            )
                                          }
                                          onChange={() => {
                                            const data = [
                                              ...props.selectOrganization,
                                            ];
                                            const data1 = [
                                              ...props.selectOrganizationName,
                                            ];
                                            if (data.includes(item._id)) {
                                              const a = data.filter(
                                                (item1) => item1 !== item._id
                                              );
                                              const b = data1.filter(
                                                (item1) =>
                                                  item1._id !== item._id
                                              );
                                              props.setSelectOrganizationName(
                                                b
                                              );
                                              props.setSelectOrganization(a);
                                            } else {
                                              data.push(item._id);
                                              data1.push(item);
                                              props.setSelectOrganizationName(
                                                data1
                                              );
                                              props.setSelectOrganization(data);
                                            }
                                          }}
                                        />
                                        <span class="checkmark"></span>
                                      </label>
                                    </li>
                                  )
                              )}
                          </ul>
                          {props.organization &&
                            props.organization.data &&
                            props.organization.data.length > 10 && (
                              <Link
                                class="link-green "
                                onClick={() => {
                                  props.toggleOrganizationViewAll();
                                  props.setShowMenu(false);
                                }}
                              >
                                View All
                              </Link>
                            )}
                        </Accordion.Body>
                      </Accordion.Item>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Accordion.Item
                    className="tab-pane fade show active accordion-item"
                    id="one-tab-pane"
                    eventKey="4"
                  >
                    <Accordion.Header
                      className="accordion-header d-lg-block d-none"
                      id="headingOne"
                    >
                      Organizations
                    </Accordion.Header>

                    <Accordion.Body className="accordion-body">
                      {props.selectOrganization &&
                        props.selectOrganization.length > 0 && (
                          <Link
                            class="link-green cursor-pointer"
                            style={{ marginBottom: "10px" }}
                            onClick={() => {
                              const data = [];
                              props.setSelectOrganizationName(data);
                              props.setSelectOrganization(data);
                            }}
                          >
                            Clear all
                          </Link>
                        )}

                      <ul class="filter-content-list">
                        {props.organization &&
                          props.organization.data &&
                          props.organization.data.length > 0 &&
                          props.organization.data.map(
                            (item, i) =>
                              i < 10 && (
                                <li class="filter-content-item">
                                  <label class="filter-content-box">
                                    {item.name}
                                    <input
                                      value={item._id}
                                      name={item.name}
                                      type="checkbox"
                                      checked={
                                        props.selectOrganization &&
                                        props.selectOrganization.includes(
                                          item._id
                                        )
                                      }
                                      onChange={() => {
                                        const data = [
                                          ...props.selectOrganization,
                                        ];
                                        const data1 = [
                                          ...props.selectOrganizationName,
                                        ];
                                        if (data.includes(item._id)) {
                                          const a = data.filter(
                                            (item1) => item1 !== item._id
                                          );
                                          const b = data1.filter(
                                            (item1) => item1._id !== item._id
                                          );
                                          props.setSelectOrganizationName(b);
                                          props.setSelectOrganization(a);
                                        } else {
                                          data.push(item._id);
                                          data1.push(item);
                                          props.setSelectOrganizationName(
                                            data1
                                          );
                                          props.setSelectOrganization(data);
                                        }
                                      }}
                                    />
                                    <span class="checkmark"></span>
                                  </label>
                                </li>
                              )
                          )}
                      </ul>
                      {props.organization &&
                        props.organization.data &&
                        props.organization.data.length > 10 && (
                          <Link
                            class="link-green "
                            onClick={() => {
                              props.toggleOrganizationViewAll();
                              props.setShowMenu(false);
                            }}
                          >
                            View All
                          </Link>
                        )}
                    </Accordion.Body>
                  </Accordion.Item>
                </>
              )}
            </>
          ) : (
            ""
          )}
        </Accordion>
      </div>
    </div>
  );
};

export default SideBarFilterList;
