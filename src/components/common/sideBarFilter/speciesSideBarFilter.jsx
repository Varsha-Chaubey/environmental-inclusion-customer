import React from "react";
import close from "../../../include/images/close.svg";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
const SpeciesSideBarFilter = (props) => {
  const [isSpeciesMenu, setIsSpeciesMenu] = useState(false);
  const [isSpeciesCateMenu, setIsSpeciesCateMenu] = useState(true);
  const [isRegionMenu, setIsRegionMenu] = useState(false);
  const [isOrganizationMenu, setIsOrganizationMenu] = useState(false);
  const [isZooMenu, setIsZooMenu] = useState(false);
  const [isWetMarketMenu, setIsWetMarketMenu] = useState(false);
  const [isEnvironmentalistMenu, setIsEnvironmentalistMenu] = useState(false);

  const togglerRegion = () => {
    if (props.showMenu) {
      if (isSpeciesMenu) {
        setIsSpeciesMenu(!isSpeciesMenu);
      }
      if (isSpeciesCateMenu) {
        setIsSpeciesCateMenu(!isSpeciesCateMenu);
      }
      if (isOrganizationMenu) {
        setIsOrganizationMenu(!isOrganizationMenu);
      }
      if (isZooMenu) {
        setIsZooMenu(!isZooMenu);
      }
      if (isWetMarketMenu) {
        setIsWetMarketMenu(!isWetMarketMenu);
      }
      if (isEnvironmentalistMenu) {
        setIsEnvironmentalistMenu(!isEnvironmentalistMenu);
      }
      setIsRegionMenu(!isRegionMenu);
    }
  };

  const togglerSpeciesCat = () => {
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
      if (isZooMenu) {
        setIsZooMenu(!isZooMenu);
      }
      if (isWetMarketMenu) {
        setIsWetMarketMenu(!isWetMarketMenu);
      }
      if (isEnvironmentalistMenu) {
        setIsEnvironmentalistMenu(!isEnvironmentalistMenu);
      }
      setIsSpeciesCateMenu(!isSpeciesCateMenu);
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
      if (isSpeciesCateMenu) {
        setIsSpeciesCateMenu(!isSpeciesCateMenu);
      }
      if (isZooMenu) {
        setIsZooMenu(!isZooMenu);
      }
      if (isWetMarketMenu) {
        setIsWetMarketMenu(!isWetMarketMenu);
      }
      if (isEnvironmentalistMenu) {
        setIsEnvironmentalistMenu(!isEnvironmentalistMenu);
      }
      setIsOrganizationMenu(!isOrganizationMenu);
    }
  };

  const togglerZoo = () => {
    if (props.showMenu) {
      if (isSpeciesMenu) {
        setIsSpeciesMenu(!isSpeciesMenu);
      }
      if (isRegionMenu) {
        setIsRegionMenu(!isRegionMenu);
      }
      if (isSpeciesCateMenu) {
        setIsSpeciesCateMenu(!isSpeciesCateMenu);
      }
      if (isOrganizationMenu) {
        setIsOrganizationMenu(!isOrganizationMenu);
      }
      if (isWetMarketMenu) {
        setIsWetMarketMenu(!isWetMarketMenu);
      }
      if (isEnvironmentalistMenu) {
        setIsEnvironmentalistMenu(!isEnvironmentalistMenu);
      }
      setIsZooMenu(!isZooMenu);
    }
  };

  const togglerWetMarket = () => {
    if (props.showMenu) {
      if (isSpeciesMenu) {
        setIsSpeciesMenu(!isSpeciesMenu);
      }
      if (isRegionMenu) {
        setIsRegionMenu(!isRegionMenu);
      }
      if (isSpeciesCateMenu) {
        setIsSpeciesCateMenu(!isSpeciesCateMenu);
      }
      if (isZooMenu) {
        setIsZooMenu(!isZooMenu);
      }
      if (isOrganizationMenu) {
        setIsOrganizationMenu(!isOrganizationMenu);
      }
      if (isEnvironmentalistMenu) {
        setIsEnvironmentalistMenu(!isEnvironmentalistMenu);
      }
      setIsWetMarketMenu(!isWetMarketMenu);
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
      if (isSpeciesCateMenu) {
        setIsSpeciesCateMenu(!isSpeciesCateMenu);
      }
      if (isZooMenu) {
        setIsZooMenu(!isZooMenu);
      }
      if (isWetMarketMenu) {
        setIsWetMarketMenu(!isWetMarketMenu);
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
      if (isSpeciesCateMenu) {
        setIsSpeciesCateMenu(!isSpeciesCateMenu);
      }
      if (isZooMenu) {
        setIsZooMenu(!isZooMenu);
      }
      if (isWetMarketMenu) {
        setIsWetMarketMenu(!isWetMarketMenu);
      }
      if (isOrganizationMenu) {
        setIsOrganizationMenu(!isOrganizationMenu);
      }
      setIsSpeciesMenu(!isSpeciesMenu);
    }
  };
  return (
    <div class="filter-sidebar-accordion">
      <div class="filter-sidebar-head d-flex justify-content-between">
        {props.selectedSpeciesName.length >= 1 ||
        props.selectSpeciesCategoryName.length >= 1 ||
        props.selectedOrganizationName.length >= 1 ||
        props.selectedZooName.length >= 1 ||
        props.selectedWetMarketName.length >= 1 ||
        props.selectedEnvironmentalistName.length >= 1 ||
        props.selectRegionName.length >= 1 ? (
          <>
            <h6>Filters</h6>
            <Link
              class="link-green "
              onClick={() => {
                if (props.selectedSpeciesName.length > 0) {
                  const data = [];
                  props.setSelectedSpeciesName(data);
                  props.setSelectedSpecies(data);
                }
                if (props.selectSpeciesCategoryName.length > 0) {
                  const data = [];
                  props.setSelectedSpeciesCategoryName(data);
                  props.setSelectedSpeciesCategory(data);
                }

                if (props.selectRegionName.length > 0) {
                  const data = [];
                  props.setSelectedRegionName(data);
                  props.setSelectedRegion(data);
                }

                if (props.selectedOrganizationName.length > 0) {
                  const data = [];
                  props.setSelectedOrganizationName(data);
                  props.setSelectedOrganization(data);
                }

                if (props.selectedZooName.length > 0) {
                  const data = [];
                  props.setSelectedZooName(data);
                  props.setSelectedZoo(data);
                }

                if (props.selectedWetMarketName.length > 0) {
                  const data = [];
                  props.setSelectedWetMarketName(data);
                  props.setSelectedWetMarket(data);
                }

                if (props.selectedEnvironmentalistName.length > 0) {
                  const data = [];
                  props.setSelectedEnvironmentalistName(data);
                  props.setSelectedEnvironmentalist(data);
                }
              }}
            >
              Clear filters
            </Link>
          </>
        ) : (
          <h6>Filters</h6>
        )}
      </div>
      <div class="filter-sidebar-tag d-flex flex-wrap">
        {props.selectedSpeciesName.length > 0 &&
          props.selectedSpeciesName.map((item) => (
            <div class="fst-box d-flex">
              <p>{item.name}</p>
              <img
                src={close}
                class="fst-box-icon cursor-pointer"
                alt=""
                onClick={() => {
                  const data = [...props.selectedSpeciesName];
                  const data1 = [...props.selectSpecies];
                  const a = data.filter((item1) => item1._id != item._id);
                  const a1 = data1.filter((item1) => item1 != item._id);
                  props.setSelectedSpecies(a1);
                  props.setSelectedSpeciesName(a);
                }}
              />
            </div>
          ))}
        {props.selectRegionName.length > 0 &&
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
                  const a = data.filter((item1) => item1._id != item._id);
                  const a1 = data1.filter((item1) => item1 != item._id);
                  props.setSelectedRegion(a1);
                  props.setSelectedRegionName(a);
                }}
              />
            </div>
          ))}
        {props.selectSpeciesCategoryName.length > 0 &&
          props.selectSpeciesCategoryName.map((item) => (
            <div class="fst-box d-flex">
              <p>{item.name}</p>
              <img
                src={close}
                class="fst-box-icon cursor-pointer"
                alt=""
                onClick={() => {
                  const data = [...props.selectSpeciesCategoryName];
                  const data1 = [...props.selectSpeciesCategory];
                  const a = data.filter((item1) => item1._id != item._id);
                  const a1 = data1.filter((item1) => item1 != item._id);
                  props.setSelectedSpeciesCategory(a1);
                  props.setSelectedSpeciesCategoryName(a);
                }}
              />
            </div>
          ))}
        {props.selectedOrganizationName.length > 0 &&
          props.selectedOrganizationName.map((item) => (
            <div class="fst-box d-flex">
              <p>{item.name}</p>
              <img
                src={close}
                class="fst-box-icon cursor-pointer"
                alt=""
                onClick={() => {
                  const data = [...props.selectedOrganizationName];
                  const data1 = [...props.selectOrganization];
                  const a = data.filter((item1) => item1._id != item._id);
                  const a1 = data1.filter((item1) => item1 != item._id);
                  props.setSelectedOrganization(a1);
                  props.setSelectedOrganizationName(a);
                }}
              />
            </div>
          ))}

        {props.selectedZooName.length > 0 &&
          props.selectedZooName.map((item) => (
            <div class="fst-box d-flex">
              <p>{item.name}</p>
              <img
                src={close}
                class="fst-box-icon cursor-pointer"
                alt=""
                onClick={() => {
                  const data = [...props.selectedZooName];
                  const data1 = [...props.selectZoo];
                  const a = data.filter((item1) => item1._id != item._id);
                  const a1 = data1.filter((item1) => item1 != item._id);
                  props.setSelectedZooName(a1);
                  props.setSelectedZoo(a);
                }}
              />
            </div>
          ))}

        {props.selectedWetMarketName.length > 0 &&
          props.selectedWetMarketName.map((item) => (
            <div class="fst-box d-flex">
              <p>{item.name}</p>
              <img
                src={close}
                class="fst-box-icon cursor-pointer"
                alt=""
                onClick={() => {
                  const data = [...props.selectedWetMarketName];
                  const data1 = [...props.selectWetMarket];
                  const a = data.filter((item1) => item1._id != item._id);
                  const a1 = data1.filter((item1) => item1 != item._id);
                  props.setSelectedWetMarketName(a1);
                  props.setSelectedWetMarket(a);
                }}
              />
            </div>
          ))}

        {props.selectedEnvironmentalistName.length > 0 &&
          props.selectedEnvironmentalistName.map((item) => (
            <div class="fst-box d-flex">
              <p>{item.name}</p>
              <img
                src={close}
                class="fst-box-icon cursor-pointer"
                alt=""
                onClick={() => {
                  const data = [...props.selectedEnvironmentalistName];
                  const data1 = [...props.selectEnvironmentalist];
                  const a = data.filter((item1) => item1._id != item._id);
                  const a1 = data1.filter((item1) => item1 != item._id);
                  props.setSelectedEnvironmentalistName(a1);
                  props.setSelectedEnvironmentalist(a);
                }}
              />
            </div>
          ))}
      </div>
      <div class="d-flex d-lg-block align-items-start">
        <ul
          class="nav nav-tabs filter-nav d-lg-none d-flex"
          id="myTab"
          role="tablist"
        >
          <li class="nav-item" role="presentation">
            <button
              onClick={togglerSpeciesCat}
              className={
                isSpeciesCateMenu
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
                isSpeciesMenu ? "nav-link mobile-sub active" : "nav-link active"
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
                isRegionMenu ? "nav-link mobile-sub active" : "nav-link active"
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
              onClick={togglerZoo}
              className={
                isZooMenu ? "nav-link mobile-sub active" : "nav-link active"
              }
              id="one-tab"
              data-bs-toggle="tab"
              data-bs-target="#one-tab-pane"
              type="button"
              role="tab"
              aria-controls="one-tab-pane"
              aria-selected="true"
            >
             Zoos & Wildlife Reserves
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

          <li class="nav-item" role="presentation">
            <button
              onClick={togglerWetMarket}
              className={
                isWetMarketMenu
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
              War on the Environment- Threats
            </button>
          </li>
        </ul>

        <Accordion
          className="tab-content accordion filter-tab"
          id="myTabContent"
          defaultActiveKey={["0"]}
          alwaysOpen
        >
          {props.showMenu ? (
            <>
              {isSpeciesCateMenu && (
                <>
                  <Accordion.Item
                    className="tab-pane fade show active accordion-item"
                    id="one-tab-pane"
                    eventKey="0"
                  >
                    <Accordion.Header
                      className="accordion-header d-lg-block d-none"
                      id="headingOne"
                    >
                      Category
                    </Accordion.Header>
                    Category
                    <Accordion.Body className="accordion-body">
                      {props.selectSpeciesCategory.length > 0 && (
                        <div
                          class="link-green cursor-pointer"
                          style={{ marginBottom: "10px" }}
                          onClick={() => {
                            const data = [];
                            props.setSelectedSpeciesCategoryName(data);
                            props.setSelectedSpeciesCategory(data);
                          }}
                        >
                          Clear all
                        </div>
                      )}
                      <ul class="filter-content-list">
                        {props.speciesCategory &&
                          props.speciesCategory.data &&
                          props.speciesCategory.data.length > 0 &&
                          props.speciesCategory.data.map(
                            (item, idx) =>
                              idx < 10 && (
                                <li class="filter-content-item">
                                  <label class="filter-content-box">
                                    {item.name}
                                    <input
                                      type="checkbox"
                                      checked={props.selectSpeciesCategory.includes(
                                        item._id
                                      )}
                                      onChange={() => {
                                        const data = [
                                          ...props.selectSpeciesCategory,
                                        ];
                                        const data1 = [
                                          ...props.selectSpeciesCategoryName,
                                        ];
                                        if (data.includes(item._id)) {
                                          const a = data.filter(
                                            (item1) => item1 != item._id
                                          );
                                          const b = data1.filter(
                                            (item1) => item1._id != item._id
                                          );
                                          props.setSelectedSpeciesCategoryName(
                                            b
                                          );
                                          props.setSelectedSpeciesCategory(a);
                                        } else {
                                          data.push(item._id);
                                          data1.push(item);
                                          props.setSelectedSpeciesCategoryName(
                                            data1
                                          );
                                          props.setSelectedSpeciesCategory(
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
                      {props.speciesCategory &&
                        props.speciesCategory.data &&
                        props.speciesCategory.data.length > 10 && (
                          <Link
                            class="link-green "
                            onClick={() => {
                              props.toggleSpeciesCategoryViewAll();
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
                eventKey="0"
              >
                <Accordion.Header
                  className="accordion-header d-lg-block d-none"
                  id="headingOne"
                >
                  Category
                </Accordion.Header>

                <Accordion.Body className="accordion-body">
                  {props.selectSpeciesCategoryName.length > 0 && (
                    <div
                      class="link-green cursor-pointer"
                      style={{ marginBottom: "10px" }}
                      onClick={() => {
                        const data = [];
                        props.setSelectedSpeciesCategoryName(data);
                        props.setSelectedSpeciesCategory(data);
                      }}
                    >
                      Clear all
                    </div>
                  )}
                  <ul class="filter-content-list">
                    {props.speciesCategory &&
                      props.speciesCategory.data &&
                      props.speciesCategory.data.length > 0 &&
                      props.speciesCategory.data.map(
                        (item, idx) =>
                          idx < 10 && (
                            <li class="filter-content-item">
                              <label class="filter-content-box">
                                {item.name}
                                <input
                                  type="checkbox"
                                  checked={props.selectSpeciesCategory.includes(
                                    item._id
                                  )}
                                  onChange={() => {
                                    const data = [
                                      ...props.selectSpeciesCategory,
                                    ];
                                    const data1 = [
                                      ...props.selectSpeciesCategoryName,
                                    ];
                                    if (data.includes(item._id)) {
                                      const a = data.filter(
                                        (item1) => item1 != item._id
                                      );
                                      const b = data1.filter(
                                        (item1) => item1._id != item._id
                                      );
                                      props.setSelectedSpeciesCategoryName(b);
                                      props.setSelectedSpeciesCategory(a);
                                    } else {
                                      data.push(item._id);
                                      data1.push(item);
                                      props.setSelectedSpeciesCategoryName(
                                        data1
                                      );
                                      props.setSelectedSpeciesCategory(data);
                                    }
                                  }}
                                />
                                <span class="checkmark"></span>
                              </label>
                            </li>
                          )
                      )}
                  </ul>
                  {props.speciesCategory &&
                    props.speciesCategory.data &&
                    props.speciesCategory.data.length > 10 && (
                      <Link
                        class="link-green "
                        onClick={() => {
                          props.toggleSpeciesCategoryViewAll();
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
                      {props.selectedSpeciesName &&
                        props.selectedSpeciesName.length > 0 && (
                          <div
                            class="link-green cursor-pointer"
                            style={{ marginBottom: "10px" }}
                            onClick={() => {
                              const data = [];
                              props.setSelectedSpeciesName(data);
                              props.setSelectedSpecies(data);
                            }}
                          >
                            Clear all
                          </div>
                        )}
                      <ul class="filter-content-list">
                        {props.speciesName &&
                          props.speciesName.data &&
                          props.speciesName.data.length > 0 &&
                          props.speciesName.data.map(
                            (item, idx) =>
                              idx < 10 && (
                                <li class="filter-content-item">
                                  <label class="filter-content-box">
                                    {item.name}
                                    <input
                                      type="checkbox"
                                      checked={
                                        props.selectSpecies &&
                                        props.selectSpecies.includes(item._id)
                                      }
                                      onChange={() => {
                                        const data = [...props.selectSpecies];
                                        const data1 = [
                                          ...props.selectedSpeciesName,
                                        ];
                                        if (data.includes(item._id)) {
                                          const a = data.filter(
                                            (item1) => item1 != item._id
                                          );
                                          const b = data1.filter(
                                            (item1) => item1._id != item._id
                                          );
                                          props.setSelectedSpeciesName(b);
                                          props.setSelectedSpecies(a);
                                        } else {
                                          data.push(item._id);
                                          data1.push(item);
                                          props.setSelectedSpeciesName(data1);
                                          props.setSelectedSpecies(data);
                                        }
                                      }}
                                    />
                                    <span class="checkmark"></span>
                                  </label>
                                </li>
                              )
                          )}
                      </ul>
                      {props.speciesName &&
                        props.speciesName.data &&
                        props.speciesName.data.length > 10 && (
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
                  {props.selectedSpeciesName.length > 0 && (
                    <div
                      class="link-green cursor-pointer"
                      style={{ marginBottom: "10px" }}
                      onClick={() => {
                        const data = [];
                        props.setSelectedSpeciesName(data);
                        props.setSelectedSpecies(data);
                      }}
                    >
                      Clear all
                    </div>
                  )}
                  <ul class="filter-content-list">
                    {props.speciesName &&
                      props.speciesName.data &&
                      props.speciesName.data.length > 0 &&
                      props.speciesName.data.map(
                        (item, idx) =>
                          idx < 10 && (
                            <li class="filter-content-item">
                              <label class="filter-content-box">
                                {item.name}
                                <input
                                  type="checkbox"
                                  checked={props.selectSpecies.includes(
                                    item._id
                                  )}
                                  onChange={() => {
                                    const data = [...props.selectSpecies];
                                    const data1 = [
                                      ...props.selectedSpeciesName,
                                    ];
                                    if (data.includes(item._id)) {
                                      const a = data.filter(
                                        (item1) => item1 != item._id
                                      );
                                      const b = data1.filter(
                                        (item1) => item1._id != item._id
                                      );
                                      props.setSelectedSpeciesName(b);
                                      props.setSelectedSpecies(a);
                                    } else {
                                      data.push(item._id);
                                      data1.push(item);
                                      props.setSelectedSpeciesName(data1);
                                      props.setSelectedSpecies(data);
                                    }
                                  }}
                                />
                                <span class="checkmark"></span>
                              </label>
                            </li>
                          )
                      )}
                  </ul>
                  {props.speciesName &&
                    props.speciesName.data &&
                    props.speciesName.data.length > 10 && (
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
                    className="tab-pane fade show active accordion-item news-region-sidebar"
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
                      {props.selectRegion.length > 0 && (
                        <Link
                          class="link-green "
                          style={{ marginBottom: "10px" }}
                          onClick={() => {
                            const data = [];
                            props.setSelectedRegionName(data);
                            props.setSelectedRegion(data);
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
                          {isRegionMenu && (
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
                                      checked={props.selectRegion.includes(
                                        item._id
                                      )}
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
                                          props.setSelectedRegionName(b);
                                          props.setSelectedRegion(a);
                                        } else {
                                          data.push(item._id);
                                          data1.push(item);
                                          props.setSelectedRegionName(data1);
                                          props.setSelectedRegion(data);
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
                                      checked={props.selectRegion.includes(
                                        item._id
                                      )}
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
                                          props.setSelectedRegionName(b);
                                          props.setSelectedRegion(a);
                                        } else {
                                          data.push(item._id);
                                          data1.push(item);
                                          props.setSelectedRegionName(data1);
                                          props.setSelectedRegion(data);
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
                        props.setSelectedRegionName(data);
                        props.setSelectedRegion(data);
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
                        <span className="accor-font-us"> United States</span>
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
                                  checked={props.selectRegion.includes(
                                    item._id
                                  )}
                                  onChange={() => {
                                    const data = [...props.selectRegion];
                                    const data1 = [...props.selectRegionName];
                                    if (data.includes(item._id)) {
                                      const a = data.filter(
                                        (item1) => item1 != item._id
                                      );
                                      const b = data1.filter(
                                        (item1) => item1._id != item._id
                                      );
                                      props.setSelectedRegionName(b);
                                      props.setSelectedRegion(a);
                                    } else {
                                      data.push(item._id);
                                      data1.push(item);
                                      props.setSelectedRegionName(data1);
                                      props.setSelectedRegion(data);
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
                                  checked={props.selectRegion.includes(
                                    item._id
                                  )}
                                  onChange={() => {
                                    const data = [...props.selectRegion];
                                    const data1 = [...props.selectRegionName];
                                    if (data.includes(item._id)) {
                                      const a = data.filter(
                                        (item1) => item1 != item._id
                                      );
                                      const b = data1.filter(
                                        (item1) => item1._id != item._id
                                      );
                                      props.setSelectedRegionName(b);
                                      props.setSelectedRegion(a);
                                    } else {
                                      data.push(item._id);
                                      data1.push(item);
                                      props.setSelectedRegionName(data1);
                                      props.setSelectedRegion(data);
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
              {isZooMenu && (
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
                     Zoos & Wildlife Reserves
                    </Accordion.Header>
                   Zoos & Wildlife Reserves
                    <Accordion.Body className="accordion-body">
                      {props.selectZoo && props.selectZoo.length > 0 && (
                        <div
                          class="link-green cursor-pointer"
                          style={{ marginBottom: "10px" }}
                          onClick={() => {
                            const data = [];
                            props.setSelectedZooName(data);
                            props.setSelectedZoo(data);
                          }}
                        >
                          Clear all
                        </div>
                      )}
                      <ul class="filter-content-list">
                        {props.zooAndParks &&
                          props.zooAndParks.data &&
                          props.zooAndParks.data.length > 0 &&
                          props.zooAndParks.data.map(
                            (item, idx) =>
                              idx < 10 && (
                                <li class="filter-content-item">
                                  <label class="filter-content-box">
                                    {item.name}
                                    <input
                                      type="checkbox"
                                      checked={
                                        props.selectZoo &&
                                        props.selectZoo.includes(item._id)
                                      }
                                      onChange={() => {
                                        const data = [...props.selectZoo];
                                        const data1 = [
                                          ...props.selectedZooName,
                                        ];
                                        if (data.includes(item._id)) {
                                          const a = data.filter(
                                            (item1) => item1 != item._id
                                          );
                                          const b = data1.filter(
                                            (item1) => item1._id != item._id
                                          );
                                          props.setSelectedZooName(b);
                                          props.setSelectedZoo(a);
                                        } else {
                                          data.push(item._id);
                                          data1.push(item);
                                          props.setSelectedZooName(data1);
                                          props.setSelectedZoo(data);
                                        }
                                      }}
                                    />
                                    <span class="checkmark"></span>
                                  </label>
                                </li>
                              )
                          )}
                      </ul>
                      {props.zooAndParks &&
                        props.zooAndParks.data &&
                        props.zooAndParks.data.length > 10 && (
                          <Link
                            class="link-green "
                            onClick={() => {
                              props.toggleZooViewAll();
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
                 Zoos & Wildlife Reserves
                </Accordion.Header>

                <Accordion.Body className="accordion-body">
                  {props.selectedZooName &&
                    props.selectedZooName.length > 0 && (
                      <div
                        class="link-green cursor-pointer"
                        style={{ marginBottom: "10px" }}
                        onClick={() => {
                          const data = [];
                          props.setSelectedZooName(data);
                          props.setSelectedZoo(data);
                        }}
                      >
                        Clear all
                      </div>
                    )}
                  <ul class="filter-content-list">
                    {props.zooAndParks &&
                      props.zooAndParks.data &&
                      props.zooAndParks.data.length > 0 &&
                      props.zooAndParks.data.map(
                        (item, idx) =>
                          idx < 10 && (
                            <li class="filter-content-item">
                              <label class="filter-content-box">
                                {item.name}
                                <input
                                  type="checkbox"
                                  checked={
                                    props.selectZoo &&
                                    props.selectZoo.includes(item._id)
                                  }
                                  onChange={() => {
                                    const data = [...props.selectZoo];
                                    const data1 = [
                                      ...props.selectedOrganizationName,
                                    ];
                                    if (data.includes(item._id)) {
                                      const a = data.filter(
                                        (item1) => item1 != item._id
                                      );
                                      const b = data1.filter(
                                        (item1) => item1._id != item._id
                                      );
                                      props.setSelectedZooName(b);
                                      props.setSelectedZoo(a);
                                    } else {
                                      data.push(item._id);
                                      data1.push(item);
                                      props.setSelectedZooName(data1);
                                      props.setSelectedZoo(data);
                                    }
                                  }}
                                />
                                <span class="checkmark"></span>
                              </label>
                            </li>
                          )
                      )}
                  </ul>
                  {props.zooAndParks &&
                    props.zooAndParks.data &&
                    props.zooAndParks.data.length > 10 && (
                      <Link
                        class="link-green "
                        onClick={() => {
                          props.toggleZooViewAll();
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
                          <div
                            class="link-green cursor-pointer"
                            style={{ marginBottom: "10px" }}
                            onClick={() => {
                              const data = [];
                              props.setSelectedOrganizationName(data);
                              props.setSelectedOrganization(data);
                            }}
                          >
                            Clear all
                          </div>
                        )}
                      <ul class="filter-content-list">
                        {props.organization &&
                          props.organization.data &&
                          props.organization.data.length > 0 &&
                          props.organization.data.map(
                            (item, idx) =>
                              idx < 10 && (
                                <li class="filter-content-item">
                                  <label class="filter-content-box">
                                    {item.name}
                                    <input
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
                                          ...props.selectedOrganizationName,
                                        ];
                                        if (data.includes(item._id)) {
                                          const a = data.filter(
                                            (item1) => item1 != item._id
                                          );
                                          const b = data1.filter(
                                            (item1) => item1._id != item._id
                                          );
                                          props.setSelectedOrganizationName(b);
                                          props.setSelectedOrganization(a);
                                        } else {
                                          data.push(item._id);
                                          data1.push(item);
                                          props.setSelectedOrganizationName(
                                            data1
                                          );
                                          props.setSelectedOrganization(data);
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
                              props.toggleOrganizationsViewAll();
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
                  {props.selectedOrganizationName &&
                    props.selectedOrganizationName.length > 0 && (
                      <div
                        class="link-green cursor-pointer"
                        style={{ marginBottom: "10px" }}
                        onClick={() => {
                          const data = [];
                          props.setSelectedOrganizationName(data);
                          props.setSelectedOrganization(data);
                        }}
                      >
                        Clear all
                      </div>
                    )}
                  <ul class="filter-content-list">
                    {props.organization &&
                      props.organization.data &&
                      props.organization.data.length > 0 &&
                      props.organization.data.map(
                        (item, idx) =>
                          idx < 10 && (
                            <li class="filter-content-item">
                              <label class="filter-content-box">
                                {item.name}
                                <input
                                  type="checkbox"
                                  checked={
                                    props.selectOrganization &&
                                    props.selectOrganization.includes(item._id)
                                  }
                                  onChange={() => {
                                    const data = [...props.selectOrganization];
                                    const data1 = [
                                      ...props.selectedOrganizationName,
                                    ];
                                    if (data.includes(item._id)) {
                                      const a = data.filter(
                                        (item1) => item1 != item._id
                                      );
                                      const b = data1.filter(
                                        (item1) => item1._id != item._id
                                      );
                                      props.setSelectedOrganizationName(b);
                                      props.setSelectedOrganization(a);
                                    } else {
                                      data.push(item._id);
                                      data1.push(item);
                                      props.setSelectedOrganizationName(data1);
                                      props.setSelectedOrganization(data);
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
                          props.toggleOrganizationsViewAll();
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
                    eventKey="5"
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
                          <div
                            class="link-green cursor-pointer"
                            style={{ marginBottom: "10px" }}
                            onClick={() => {
                              const data = [];
                              props.setSelectedEnvironmentalistName(data);
                              props.setSelectedEnvironmentalist(data);
                            }}
                          >
                            Clear all
                          </div>
                        )}
                      <ul class="filter-content-list">
                        {props.environmentalist &&
                          props.environmentalist.data &&
                          props.environmentalist.data.length > 0 &&
                          props.environmentalist.data.map(
                            (item, idx) =>
                              idx < 10 && (
                                <li class="filter-content-item">
                                  <label class="filter-content-box">
                                    {item.name}
                                    <input
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
                                          ...props.selectedEnvironmentalistName,
                                        ];
                                        if (data.includes(item._id)) {
                                          const a = data.filter(
                                            (item1) => item1 != item._id
                                          );
                                          const b = data1.filter(
                                            (item1) => item1._id != item._id
                                          );
                                          props.setSelectedEnvironmentalistName(
                                            b
                                          );
                                          props.setSelectedEnvironmentalist(a);
                                        } else {
                                          data.push(item._id);
                                          data1.push(item);
                                          props.setSelectedEnvironmentalistName(
                                            data1
                                          );
                                          props.setSelectedEnvironmentalist(
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
                eventKey="5"
              >
                <Accordion.Header
                  className="accordion-header d-lg-block d-none"
                  id="headingOne"
                >
                  Environmentalists
                </Accordion.Header>

                <Accordion.Body className="accordion-body">
                  {props.selectedEnvironmentalistName &&
                    props.selectedEnvironmentalistName.length > 0 && (
                      <div
                        class="link-green cursor-pointer"
                        style={{ marginBottom: "10px" }}
                        onClick={() => {
                          const data = [];
                          props.setSelectedEnvironmentalistName(data);
                          props.setSelectedEnvironmentalist(data);
                        }}
                      >
                        Clear all
                      </div>
                    )}
                  <ul class="filter-content-list">
                    {props.environmentalist &&
                      props.environmentalist.data &&
                      props.environmentalist.data.length > 0 &&
                      props.environmentalist.data.map(
                        (item, idx) =>
                          idx < 10 && (
                            <li class="filter-content-item">
                              <label class="filter-content-box">
                                {item.name}
                                <input
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
                                      ...props.selectedEnvironmentalistName,
                                    ];
                                    if (data.includes(item._id)) {
                                      const a = data.filter(
                                        (item1) => item1 != item._id
                                      );
                                      const b = data1.filter(
                                        (item1) => item1._id != item._id
                                      );
                                      props.setSelectedEnvironmentalistName(b);
                                      props.setSelectedEnvironmentalist(a);
                                    } else {
                                      data.push(item._id);
                                      data1.push(item);
                                      props.setSelectedEnvironmentalistName(
                                        data1
                                      );
                                      props.setSelectedEnvironmentalist(data);
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

          {props.showMenu ? (
            <>
              {isWetMarketMenu && (
                <>
                  <Accordion.Item
                    className="tab-pane fade show active accordion-item"
                    id="one-tab-pane"
                    eventKey="6"
                  >
                    <Accordion.Header
                      className="accordion-header d-lg-block d-none"
                      id="headingOne"
                    >
                      War on the Environment- Threats
                    </Accordion.Header>
                    War on the Environment- Threats
                    <Accordion.Body className="accordion-body">
                      {props.selectWetMarket &&
                        props.selectWetMarket.length > 0 && (
                          <div
                            class="link-green cursor-pointer"
                            style={{ marginBottom: "10px" }}
                            onClick={() => {
                              const data = [];
                              props.setSelectedWetMarketName(data);
                              props.setSelectedWetMarket(data);
                            }}
                          >
                            Clear all
                          </div>
                        )}
                      <ul class="filter-content-list">
                        {props.wetMarketData &&
                          props.wetMarketData.data &&
                          props.wetMarketData.data.length > 0 &&
                          props.wetMarketData.data.map(
                            (item, idx) =>
                              idx < 10 && (
                                <li class="filter-content-item">
                                  <label class="filter-content-box">
                                    {item.name}
                                    <input
                                      type="checkbox"
                                      checked={
                                        props.selectWetMarket &&
                                        props.selectWetMarket.includes(item._id)
                                      }
                                      onChange={() => {
                                        const data = [...props.selectWetMarket];
                                        const data1 = [
                                          ...props.selectedWetMarketName,
                                        ];
                                        if (data.includes(item._id)) {
                                          const a = data.filter(
                                            (item1) => item1 != item._id
                                          );
                                          const b = data1.filter(
                                            (item1) => item1._id != item._id
                                          );
                                          props.setSelectedWetMarketName(b);
                                          props.setSelectedWetMarket(a);
                                        } else {
                                          data.push(item._id);
                                          data1.push(item);
                                          props.setSelectedWetMarketName(data1);
                                          props.setSelectedWetMarket(data);
                                        }
                                      }}
                                    />
                                    <span class="checkmark"></span>
                                  </label>
                                </li>
                              )
                          )}
                      </ul>
                      {props.wetMarketData &&
                        props.wetMarketData.data &&
                        props.wetMarketData.data.length > 10 && (
                          <Link
                            class="link-green "
                            onClick={() => {
                              props.toggleWetMarketViewAll();
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
                eventKey="6"
              >
                <Accordion.Header
                  className="accordion-header d-lg-block d-none"
                  id="headingOne"
                >
                 War on the Environment- Threats
                </Accordion.Header>

                <Accordion.Body className="accordion-body">
                  {props.selectedWetMarketName &&
                    props.selectedWetMarketName.length > 0 && (
                      <div
                        class="link-green cursor-pointer"
                        style={{ marginBottom: "10px" }}
                        onClick={() => {
                          const data = [];
                          props.setSelectedWetMarketName(data);
                          props.setSelectedWetMarket(data);
                        }}
                      >
                        Clear all
                      </div>
                    )}
                  <ul class="filter-content-list">
                    {props.wetMarketData &&
                      props.wetMarketData.data &&
                      props.wetMarketData.data.length > 0 &&
                      props.wetMarketData.data.map(
                        (item, idx) =>
                          idx < 10 && (
                            <li class="filter-content-item">
                              <label class="filter-content-box">
                                {item.name}
                                <input
                                  type="checkbox"
                                  checked={
                                    props.selectWetMarket &&
                                    props.selectWetMarket.includes(item._id)
                                  }
                                  onChange={() => {
                                    const data = [...props.selectWetMarket];
                                    const data1 = [
                                      ...props.selectedWetMarketName,
                                    ];
                                    if (data.includes(item._id)) {
                                      const a = data.filter(
                                        (item1) => item1 != item._id
                                      );
                                      const b = data1.filter(
                                        (item1) => item1._id != item._id
                                      );
                                      props.setSelectedWetMarketName(b);
                                      props.setSelectedWetMarket(a);
                                    } else {
                                      data.push(item._id);
                                      data1.push(item);
                                      props.setSelectedWetMarketName(data1);
                                      props.setSelectedWetMarket(data);
                                    }
                                  }}
                                />
                                <span class="checkmark"></span>
                              </label>
                            </li>
                          )
                      )}
                  </ul>
                  {props.wetMarketData &&
                    props.wetMarketData.data &&
                    props.wetMarketData.data.length > 10 && (
                      <Link
                        class="link-green "
                        onClick={() => {
                          props.toggleWetMarketViewAll();
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
        </Accordion>
      </div>
    </div>
  );
};

export default SpeciesSideBarFilter;
