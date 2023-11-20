import React, { useState } from "react";
import close from "../../../include/images/close.svg";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const BlogSideBarFilter = (props) => {
  const [isRegionMenu, setIsRegionMenu] = useState(false);
  const [isSpeciesMenu, setIsSpeciesMenu] = useState(false);
  const [isBlogMenu, setIsBlogMenu] = useState(true);
  const [isOrganizationMenu, setIsOrganizationMenu] = useState(false);
  const [isScienceMenu, setIsScienceMenu] = useState(true);

  const togglerRegion = () => {
    if (props.showMenu) {
      setIsRegionMenu(!isRegionMenu);
      if (isSpeciesMenu) {
        setIsSpeciesMenu(!isSpeciesMenu);
      }
      if (isBlogMenu) {
        setIsBlogMenu(!isBlogMenu);
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

      if (isBlogMenu) {
        setIsBlogMenu(!isBlogMenu);
      }
      if (isOrganizationMenu) {
        setIsOrganizationMenu(!isOrganizationMenu);
      }
    }
  };
  const togglerBlog = () => {
    if (props.showMenu) {
      if (isRegionMenu) {
        setIsRegionMenu(!isRegionMenu);
      }
      if (isSpeciesMenu) {
        setIsSpeciesMenu(!isSpeciesMenu);
      }

      setIsBlogMenu(!isBlogMenu);

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
      if (isBlogMenu) {
        setIsBlogMenu(!isBlogMenu);
      }
      setIsOrganizationMenu(!isOrganizationMenu);
    }
  };

  const togglerScience = () => {
    if (props.showMenu) {
      if (isRegionMenu) {
        setIsRegionMenu(!isRegionMenu);
      }
      if (isSpeciesMenu) {
        setIsSpeciesMenu(!isSpeciesMenu);
      }

      setIsScienceMenu(!isScienceMenu);

      if (isOrganizationMenu) {
        setIsOrganizationMenu(!isOrganizationMenu);
      }
    }
  };
  return (
    <div class="filter-sidebar-accordion">
      <div class="filter-sidebar-head d-flex justify-content-between">
        {(props.page === "Blog Category" &&
          props.selectedBlogCategoryName.length >= 1) ||
        (props.page === "Science And Education" &&
          props.selectedScienceCategoryName.length >= 1) ||
        props.selectedSpeciesName.length >= 1 ||
        props.selectedOrganizationName.length >= 1 ||
        props.selectRegionName.length >= 1 ? (
          <>
            <h6>Filters</h6>
            <Link
              class="link-green "
              onClick={() => {
                if (
                  props.page === "Blog Category" &&
                  props.selectedBlogCategoryName.length > 0
                ) {
                  const data = [];
                  props.setSelectedBlogCategoryName(data);
                  props.setSelectedBlogCategory(data);
                }

                if (props.selectedSpeciesName.length > 0) {
                  const data = [];
                  props.setSelectedSpeciesName(data);
                  props.setSelectedSpecies(data);
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

                if (
                  props.page === "Science And Education" &&
                  props.selectedScienceCategoryName.length > 0
                ) {
                  const data = [];
                  props.setSelectedScienceCategoryName(data);
                  props.setSelectedScienceCategory(data);
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

        {props.page === "Blog Category" &&
          props.selectedBlogCategoryName.length > 0 &&
          props.selectedBlogCategoryName.map(
            (item) =>
              item.name !== undefined && (
                <div class="fst-box d-flex">
                  <p>{item.name}</p>
                  <img
                    src={close}
                    class="fst-box-icon cursor-pointer"
                    alt=""
                    onClick={() => {
                      const data = [...props.selectedBlogCategoryName];
                      const data1 = [...props.selectBlogCategory];
                      const a = data.filter((item1) => item1?._id != item?._id);
                      const a1 = data1.filter((item1) => item1 != item?._id);
                      props.setSelectedBlogCategory(a1);
                      props.setSelectedBlogCategoryName(a);
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

        {props.page === "Science And Education" &&
          props.selectedScienceCategoryName.length > 0 &&
          props.selectedScienceCategoryName.map(
            (item) =>
              item.name !== undefined && (
                <div class="fst-box d-flex">
                  <p>{item.name}</p>
                  <img
                    src={close}
                    class="fst-box-icon cursor-pointer"
                    alt=""
                    onClick={() => {
                      const data = [...props.selectedScienceCategoryName];
                      const data1 = [...props.selectScienceCategory];
                      const a = data.filter((item1) => item1?._id != item?._id);
                      const a1 = data1.filter((item1) => item1 != item?._id);
                      props.setSelectedScienceCategory(a1);
                      props.setSelectedScienceCategoryName(a);
                    }}
                  />
                </div>
              )
          )}
      </div>
      <div class="d-flex d-lg-block align-items-start">
        <ul
          class="nav nav-tabs filter-nav d-lg-none d-flex"
          id="myTab"
          role="tablist"
        >
          {props.page === "Blog Category" ? (
            <li class="nav-item" role="presentation">
              <button
                onClick={togglerBlog}
                className={
                  isBlogMenu ? "nav-link mobile-sub active" : "nav-link active"
                }
                id="one-tab"
                data-bs-toggle="tab"
                data-bs-target="#one-tab-pane"
                type="button"
                role="tab"
                aria-controls="one-tab-pane"
                aria-selected="true"
              >
                Blog Category
              </button>
            </li>
          ):""}

          {props.page === "Science And Education" ? (
            <li class="nav-item" role="presentation">
              <button
                onClick={togglerScience}
                className={
                  isScienceMenu
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
                Science & Education Category
              </button>
            </li>
          ):""}

          <li class="nav-item" role="presentation">
            <button
              onClick={togglerSpecies}
              className={
                isSpeciesMenu ? "nav-link active mobile-sub" : "nav-link active"
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
          {props.page === "Science And Education" && props.showMenu ? (
            <>
              {isScienceMenu && (
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
                      Science & Education Category
                    </Accordion.Header>
                    Science & Education Category
                    <Accordion.Body className="accordion-body">
                      {props.selectScienceCategory &&
                        props.selectScienceCategory.length > 0 && (
                          <Link
                            class="link-green"
                            style={{ marginBottom: "10px" }}
                            onClick={() => {
                              const data = [];
                              props.setSelectedScienceCategoryName(data);
                              props.setSelectedScienceCategory(data);
                            }}
                          >
                            Clear all
                          </Link>
                        )}

                      <ul class="filter-content-list">
                        {props.ScienceCategory &&
                          props.ScienceCategory.data &&
                          props.ScienceCategory.data.length > 0 &&
                          props.ScienceCategory.data.map(
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
                                        props.selectScienceCategory &&
                                        props.selectScienceCategory.includes(
                                          item._id
                                        )
                                      }
                                      onChange={() => {
                                        const data = [
                                          ...props.selectScienceCategory,
                                        ];

                                        const data1 = [
                                          ...props.selectedScienceCategoryName,
                                        ];
                                        if (data.includes(item._id)) {
                                          const a = data.filter(
                                            (item1) => item1 != item._id
                                          );
                                          const b = data1.filter(
                                            (item1) => item1._id != item._id
                                          );
                                          props.setSelectedScienceCategoryName(
                                            b
                                          );
                                          props.setSelectedScienceCategory(a);
                                        } else {
                                          data.push(item._id);
                                          data1.push(item);
                                          props.setSelectedScienceCategoryName(
                                            data1
                                          );
                                          props.setSelectedScienceCategory(
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
                      {props.ScienceCategory &&
                        props.ScienceCategory.data &&
                        props.ScienceCategory.data.length > 10 && (
                          <Link
                            class="link-green "
                            onClick={() => {
                              props.toggleScienceCategoryViewAll();
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
            {props.page==="Science And Education" &&(
              <Accordion.Item
                className="tab-pane fade show active accordion-item"
                id="one-tab-pane"
                eventKey="1"
              >
                <Accordion.Header
                  className="accordion-header d-lg-block d-none"
                  id="headingOne"
                >
                  Science & Education Category
                </Accordion.Header>

                <Accordion.Body className="accordion-body">
                  {props.selectScienceCategory &&
                    props.selectScienceCategory.length > 0 && (
                      <Link
                        class="link-green"
                        style={{ marginBottom: "10px" }}
                        onClick={() => {
                          const data = [];
                          props.setSelectedScienceCategoryName(data);
                          props.setSelectedScienceCategory(data);
                        }}
                      >
                        Clear all
                      </Link>
                    )}

                  <ul class="filter-content-list">
                    {props.ScienceCategory &&
                      props.ScienceCategory.data &&
                      props.ScienceCategory.data.length > 0 &&
                      props.ScienceCategory.data.map(
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
                                    props.selectScienceCategory &&
                                    props.selectScienceCategory.includes(
                                      item._id
                                    )
                                  }
                                  onChange={() => {
                                    const data = [
                                      ...props.selectScienceCategory,
                                    ];

                                    const data1 = [
                                      ...props.selectedScienceCategoryName,
                                    ];
                                    if (data.includes(item._id)) {
                                      const a = data.filter(
                                        (item1) => item1 != item._id
                                      );
                                      const b = data1.filter(
                                        (item1) => item1._id != item._id
                                      );
                                      props.setSelectedScienceCategoryName(b);
                                      props.setSelectedScienceCategory(a);
                                    } else {
                                      data.push(item._id);
                                      data1.push(item);
                                      props.setSelectedScienceCategoryName(
                                        data1
                                      );
                                      props.setSelectedScienceCategory(data);
                                    }
                                  }}
                                />
                                <span class="checkmark"></span>
                              </label>
                            </li>
                          )
                      )}
                  </ul>
                  {props.ScienceCategory &&
                    props.ScienceCategory.data &&
                    props.ScienceCategory.data.length > 10 && (
                      <Link
                        class="link-green "
                        onClick={() => {
                          props.toggleScienceCategoryViewAll();
                          props.setShowMenu(false);
                        }}
                      >
                        View All
                      </Link>
                    )}
                </Accordion.Body>
              </Accordion.Item>
            )}
              
            </>
          )}

          {props.page === "Blog Category" && props.showMenu ? (
            <>
              {isBlogMenu && (
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
                      Blog Category
                    </Accordion.Header>
                    Blog Category
                    <Accordion.Body className="accordion-body">
                      {props.selectBlogCategory &&
                        props.selectBlogCategory.length > 0 && (
                          <Link
                            class="link-green"
                            style={{ marginBottom: "10px" }}
                            onClick={() => {
                              const data = [];
                              props.setSelectedBlogCategoryName(data);
                              props.setSelectedBlogCategory(data);
                            }}
                          >
                            Clear all
                          </Link>
                        )}

                      <ul class="filter-content-list">
                        {props.blogCategory &&
                          props.blogCategory.data &&
                          props.blogCategory.data.length > 0 &&
                          props.blogCategory.data.map(
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
                                        props.selectBlogCategory &&
                                        props.selectBlogCategory.includes(
                                          item._id
                                        )
                                      }
                                      onChange={() => {
                                        const data = [
                                          ...props.selectBlogCategory,
                                        ];

                                        const data1 = [
                                          ...props.selectedBlogCategoryName,
                                        ];
                                        if (data.includes(item._id)) {
                                          const a = data.filter(
                                            (item1) => item1 != item._id
                                          );
                                          const b = data1.filter(
                                            (item1) => item1._id != item._id
                                          );
                                          props.setSelectedBlogCategoryName(b);
                                          props.setSelectedBlogCategory(a);
                                        } else {
                                          data.push(item._id);
                                          data1.push(item);
                                          props.setSelectedBlogCategoryName(
                                            data1
                                          );
                                          props.setSelectedBlogCategory(data);
                                        }
                                      }}
                                    />
                                    <span class="checkmark"></span>
                                  </label>
                                </li>
                              )
                          )}
                      </ul>
                      {props.blogCategory &&
                        props.blogCategory.data &&
                        props.blogCategory.data.length > 10 && (
                          <Link
                            class="link-green "
                            onClick={() => {
                              props.toggleBlogCategoryViewAll();
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
              {props.page==="Blog Category"&&(
                <Accordion.Item
                className="tab-pane fade show active accordion-item"
                id="one-tab-pane"
                eventKey="1"
              >
                <Accordion.Header
                  className="accordion-header d-lg-block d-none"
                  id="headingOne"
                >
                  Blog Category
                </Accordion.Header>

                <Accordion.Body className="accordion-body">
                  {props.selectBlogCategory &&
                    props.selectBlogCategory.length > 0 && (
                      <Link
                        class="link-green"
                        style={{ marginBottom: "10px" }}
                        onClick={() => {
                          const data = [];
                          props.setSelectedBlogCategoryName(data);
                          props.setSelectedBlogCategory(data);
                        }}
                      >
                        Clear all
                      </Link>
                    )}

                  <ul class="filter-content-list">
                    {props.blogCategory &&
                      props.blogCategory.data &&
                      props.blogCategory.data.length > 0 &&
                      props.blogCategory.data.map(
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
                                    props.selectBlogCategory &&
                                    props.selectBlogCategory.includes(item._id)
                                  }
                                  onChange={() => {
                                    const data = [...props.selectBlogCategory];

                                    const data1 = [
                                      ...props.selectedBlogCategoryName,
                                    ];
                                    if (data.includes(item._id)) {
                                      const a = data.filter(
                                        (item1) => item1 != item._id
                                      );
                                      const b = data1.filter(
                                        (item1) => item1._id != item._id
                                      );
                                      props.setSelectedBlogCategoryName(b);
                                      props.setSelectedBlogCategory(a);
                                    } else {
                                      data.push(item._id);
                                      data1.push(item);
                                      props.setSelectedBlogCategoryName(data1);
                                      props.setSelectedBlogCategory(data);
                                    }
                                  }}
                                />
                                <span class="checkmark"></span>
                              </label>
                            </li>
                          )
                      )}
                  </ul>
                  {props.blogCategory &&
                    props.blogCategory.data &&
                    props.blogCategory.data.length > 10 && (
                      <Link
                        class="link-green "
                        onClick={() => {
                          props.toggleBlogCategoryViewAll();
                          props.setShowMenu(false);
                        }}
                      >
                        View All
                      </Link>
                    )}
                </Accordion.Body>
              </Accordion.Item>
              )}
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
                          className="tab-pane fade show active accordion-item"
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
                className="tab-pane fade show active accordion-item "
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
                      className="tab-pane fade show active accordion-item "
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

export default BlogSideBarFilter;
