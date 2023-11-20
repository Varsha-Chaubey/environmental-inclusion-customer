import React from "react";
import close from "../../../include/images/close.svg";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";

const NewsSidebarFilter = (props) => {
  const [isRegionMenu, setIsRegionMenu] = useState(false);
  const [isSpeciesMenu, setIsSpeciesMenu] = useState(false);
  const [isNewsMenu, setIsNewsMenu] = useState(true);
  const [isOrganizationMenu, setIsOrganizationMenu] = useState(false);

  const togglerRegion = () => {
    if (props.showMenu) {
      setIsRegionMenu(!isRegionMenu);
      if (isSpeciesMenu) {
        setIsSpeciesMenu(!isSpeciesMenu);
      }
      if (isNewsMenu) {
        setIsNewsMenu(!isNewsMenu);
      }
      if (isOrganizationMenu) {
        setIsOrganizationMenu(!isOrganizationMenu);
      }
    }
  };
  const togglerSpecies = () => {
    if (props.showMenu) {
      if (isRegionMenu) {
        setIsRegionMenu(!isRegionMenu);
      }

      setIsSpeciesMenu(!isSpeciesMenu);

      if (isNewsMenu) {
        setIsNewsMenu(!isNewsMenu);
      }
      if (isOrganizationMenu) {
        setIsOrganizationMenu(!isOrganizationMenu);
      }
    }
  };
  const togglerNews = () => {
    if (props.showMenu) {
      if (isRegionMenu) {
        setIsRegionMenu(!isRegionMenu);
      }
      if (isSpeciesMenu) {
        setIsSpeciesMenu(!isSpeciesMenu);
      }

      setIsNewsMenu(!isNewsMenu);

      if (isOrganizationMenu) {
        setIsOrganizationMenu(!isOrganizationMenu);
      }
    }
  };
  const togglerOrganization = () => {
    if (props.showMenu) {
      if (isRegionMenu) {
        setIsRegionMenu(!isRegionMenu);
      }
      if (isSpeciesMenu) {
        setIsSpeciesMenu(!isSpeciesMenu);
      }
      if (isNewsMenu) {
        setIsNewsMenu(!isNewsMenu);
      }
      setIsOrganizationMenu(!isOrganizationMenu);
    }
  };
  return (
    <div class="filter-sidebar-accordion">
      <div class="filter-sidebar-head d-flex justify-content-between">
        {props.selectedNewsCategoryName.length >= 1 ||
        props.selectedSpeciesName.length >= 1 ||
        props.selectedOrganizationName.length >= 1 ||
        props.selectRegionName.length >= 1 ? (
          <>
            <h6>Filters</h6>
            <Link
              class="link-green"
              onClick={() => {
                if (props.selectedSpeciesName.length > 0) {
                  const data = [];
                  props.setSelectedSpeciesName(data);
                  props.setSelectedSpecies(data);
                }
                if (props.selectedNewsCategoryName.length > 0) {
                  const data = [];
                  props.setSelectedNewsCategoryName(data);
                  props.setSelectedNewsCategory(data);
                }

                if (props.selectedOrganizationName.length > 0) {
                  const data = [];
                  props.setSelectedOrganizationName(data);
                  props.setSelectedOrganization(data);
                }

                if (props.selectRegionName.length > 0) {
                  const data = [];
                  props.setSelectedRegionName(data);
                  props.setSelectedRegion(data);
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
                  const data1 = [...props.selectedSpecies];
                  const a = data.filter((item1) => item1._id != item._id);
                  const a1 = data1.filter((item1) => item1 != item._id);
                  props.setSelectedSpecies(a1);
                  props.setSelectedSpeciesName(a);
                }}
              />
            </div>
          ))}

        {props.selectedNewsCategoryName.length > 0 &&
          props.selectedNewsCategoryName.map(
            (item) =>
              item.name !== undefined && (
                <div class="fst-box d-flex">
                  <p>{item.name}</p>
                  <img
                    src={close}
                    class="fst-box-icon cursor-pointer"
                    alt=""
                    onClick={() => {
                      const data = [...props.selectedNewsCategoryName];
                      const data1 = [...props.selectNewsCategory];
                      const a = data.filter((item1) => item1?._id != item?._id);
                      const a1 = data1.filter((item1) => item1 != item?._id);
                      props.setSelectedNewsCategory(a1);
                      props.setSelectedNewsCategoryName(a);
                    }}
                  />
                </div>
              )
          )}
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
      </div>
      <div class="d-flex d-lg-block align-items-start">
        <ul
          class="nav nav-tabs filter-nav d-lg-none d-flex"
          id="myTab"
          role="tablist"
        >
          <li class="nav-item" role="presentation">
            <button
              onClick={togglerNews}
              className={
                isNewsMenu ? "nav-link mobile-sub active" : "nav-link active"
              }
              id="one-tab"
              data-bs-toggle="tab"
              data-bs-target="#one-tab-pane"
              type="button"
              role="tab"
              aria-controls="one-tab-pane"
              aria-selected="true"
            >
              News Category
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
        </ul>

        <Accordion
          className="tab-content accordion filter-tab"
          id="myTabContent"
          defaultActiveKey={["1"]}
          alwaysOpen
        >
          {props.showMenu ? (
            <>
              {isNewsMenu && (
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
                      News Category
                    </Accordion.Header>
                    News Category
                    <Accordion.Body className="accordion-body">
                      {props.selectNewsCategory.length > 0 && (
                        <Link
                          class="link-green cursor-pointer"
                          style={{ marginBottom: "10px" }}
                          onClick={() => {
                            const data = [];
                            props.setSelectedNewsCategoryName(data);
                            props.setSelectedNewsCategory(data);
                          }}
                        >
                          Clear all
                        </Link>
                      )}

                      <ul class="filter-content-list">
                        {props.newsCategory &&
                          props.newsCategory.data &&
                          props.newsCategory.data.length > 0 &&
                          props.newsCategory.data.map(
                            (item, i) =>
                              i < 10 && (
                                <li class="filter-content-item">
                                  <label class="filter-content-box">
                                    {item.name}
                                    <input
                                      value={item._id}
                                      name={item.name}
                                      type="checkbox"
                                      checked={props.selectNewsCategory.includes(
                                        item._id
                                      )}
                                      onChange={() => {
                                        const data = [
                                          ...props.selectNewsCategory,
                                        ];
                                        const data1 = [
                                          ...props.selectedNewsCategoryName,
                                        ];
                                        if (data.includes(item._id)) {
                                          const a = data.filter(
                                            (item1) => item1 != item._id
                                          );
                                          const b = data1.filter(
                                            (item1) => item1._id != item._id
                                          );
                                          props.setSelectedNewsCategoryName(b);
                                          props.setSelectedNewsCategory(a);
                                        } else {
                                          data.push(item._id);
                                          data1.push(item);
                                          props.setSelectedNewsCategoryName(
                                            data1
                                          );
                                          props.setSelectedNewsCategory(data);
                                        }
                                      }}
                                    />
                                    <span class="checkmark"></span>
                                  </label>
                                </li>
                              )
                          )}
                      </ul>
                      {props.newsCategory &&
                        props.newsCategory.data &&
                        props.newsCategory.data.length > 10 && (
                          <Link
                            class="link-green "
                            onClick={() => {
                              props.toggleNewsCategoryViewAll();
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
                  News Category
                </Accordion.Header>

                <Accordion.Body className="accordion-body">
                  {props.selectNewsCategory.length > 0 && (
                    <Link
                      class="link-green cursor-pointer"
                      style={{ marginBottom: "10px" }}
                      onClick={() => {
                        const data = [];
                        props.setSelectedNewsCategoryName(data);
                        props.setSelectedNewsCategory(data);
                      }}
                    >
                      Clear all
                    </Link>
                  )}

                  <ul class="filter-content-list">
                    {props.newsCategory &&
                      props.newsCategory.data &&
                      props.newsCategory.data.length > 0 &&
                      props.newsCategory.data.map(
                        (item, i) =>
                          i < 10 && (
                            <li class="filter-content-item">
                              <label class="filter-content-box">
                                {item.name}
                                <input
                                  value={item._id}
                                  name={item.name}
                                  type="checkbox"
                                  checked={props.selectNewsCategory.includes(
                                    item._id
                                  )}
                                  onChange={() => {
                                    const data = [...props.selectNewsCategory];
                                    const data1 = [
                                      ...props.selectedNewsCategoryName,
                                    ];
                                    if (data.includes(item._id)) {
                                      const a = data.filter(
                                        (item1) => item1 != item._id
                                      );
                                      const b = data1.filter(
                                        (item1) => item1._id != item._id
                                      );
                                      props.setSelectedNewsCategoryName(b);
                                      props.setSelectedNewsCategory(a);
                                    } else {
                                      data.push(item._id);
                                      data1.push(item);
                                      props.setSelectedNewsCategoryName(data1);
                                      props.setSelectedNewsCategory(data);
                                    }
                                  }}
                                />
                                <span class="checkmark"></span>
                              </label>
                            </li>
                          )
                      )}
                  </ul>
                  {props.newsCategory &&
                    props.newsCategory.data &&
                    props.newsCategory.data.length > 10 && (
                      <Link
                        class="link-green "
                        onClick={() => {
                          props.toggleNewsCategoryViewAll();
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
                    eventKey="0"
                  >
                    <Accordion.Header
                      className="accordion-header d-lg-block d-none"
                      id="headingOne"
                    >
                      Endangered Species
                    </Accordion.Header>
                    Endangered Species
                    <Accordion.Body className="accordion-body">
                      {props.selectedSpecies.length > 0 && (
                        <Link
                          class="link-green "
                          style={{ marginBottom: "10px" }}
                          onClick={() => {
                            const data = [];
                            props.setSelectedSpeciesName(data);
                            props.setSelectedSpecies(data);
                          }}
                        >
                          Clear all
                        </Link>
                      )}
                      <ul class="filter-content-list">
                        {props.sideBarSpecies &&
                          props.sideBarSpecies.data &&
                          props.sideBarSpecies.data.length > 0 &&
                          props.sideBarSpecies.data.map(
                            (item, i) =>
                              i < 10 && (
                                <li class="filter-content-item">
                                  <label class="filter-content-box">
                                    {item.name}
                                    <input
                                      type="checkbox"
                                      checked={props.selectedSpecies.includes(
                                        item._id
                                      )}
                                      onChange={() => {
                                        const data = [...props.selectedSpecies];
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
                      {props.sideBarSpecies &&
                        props.sideBarSpecies.data &&
                        props.sideBarSpecies.data.length > 10 && (
                          <Link
                            class="link-green "
                            onClick={() => {
                              props.toggleViewAll();
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
                  Endangered Species
                </Accordion.Header>

                <Accordion.Body className="accordion-body">
                  {props.selectedSpecies.length > 0 && (
                    <Link
                      class="link-green "
                      style={{ marginBottom: "10px" }}
                      onClick={() => {
                        const data = [];
                        props.setSelectedSpeciesName(data);
                        props.setSelectedSpecies(data);
                      }}
                    >
                      Clear all
                    </Link>
                  )}
                  <ul class="filter-content-list">
                    {props.sideBarSpecies &&
                      props.sideBarSpecies.data &&
                      props.sideBarSpecies.data.length > 0 &&
                      props.sideBarSpecies.data.map(
                        (item, i) =>
                          i < 10 && (
                            <li class="filter-content-item">
                              <label class="filter-content-box">
                                {item.name}
                                <input
                                  type="checkbox"
                                  checked={props.selectedSpecies.includes(
                                    item._id
                                  )}
                                  onChange={() => {
                                    const data = [...props.selectedSpecies];
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
                  {props.sideBarSpecies &&
                    props.sideBarSpecies.data &&
                    props.sideBarSpecies.data.length > 10 && (
                      <Link
                        class="link-green "
                        onClick={() => {
                          props.toggleViewAll();
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
                    eventKey="2"
                  >
                    <Accordion.Header
                      className="accordion-header d-lg-block d-none"
                      id="headingOne"
                    >
                      Organizations
                    </Accordion.Header>
                    Organizations
                    <Accordion.Body className="accordion-body">
                      {props.selectOrganization.length > 0 && (
                        <Link
                          class="link-green "
                          style={{ marginBottom: "10px" }}
                          onClick={() => {
                            const data = [];
                            props.setSelectedOrganizationName(data);
                            props.setSelectedOrganization(data);
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
                                      type="checkbox"
                                      checked={props.selectOrganization.includes(
                                        item._id
                                      )}
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
                eventKey="2"
              >
                <Accordion.Header
                  className="accordion-header d-lg-block d-none"
                  id="headingOne"
                >
                  Organizations
                </Accordion.Header>

                <Accordion.Body className="accordion-body">
                  {props.selectOrganization.length > 0 && (
                    <Link
                      class="link-green "
                      style={{ marginBottom: "10px" }}
                      onClick={() => {
                        const data = [];
                        props.setSelectedOrganizationName(data);
                        props.setSelectedOrganization(data);
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
                                  type="checkbox"
                                  checked={props.selectOrganization.includes(
                                    item._id
                                  )}
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
        </Accordion>
      </div>
    </div>
  );
};

export default NewsSidebarFilter;
