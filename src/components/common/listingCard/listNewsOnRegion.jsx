import React from "react";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getSlug, removeTags } from "../../../utils/helperFunctions";
import HTMLReactParser from "html-react-parser";
import useCheckMobileScreen from "../../../common/customHooks/useCheckMobileScreen";
import { Dropdown } from "react-bootstrap";
const ListingNewsOnRegion = (props) => {
  const dotDesc = (description, limit) => {
    const dots = "...";

    if (description && description.length > limit) {
      if (description.includes("strong")) {
        description = description.substring(0, limit + 120) + dots;
      } else description = description.substring(0, limit) + dots;
      if (description.includes("h1")) {
        description = description.substring(0, limit) + dots;
      }
    }

    return description;
  };

  const isMobile = useCheckMobileScreen();

  return (
    <li class="news-item">
      {props.loading ? (
        <div className="news-box">
          <div class="nb-head-left">
            <Skeleton />
          </div>
          <div class="nb-body">
            <Skeleton />
          </div>
        </div>
      ) : (
        <div className="news-box card-box-shadow">
          <div class="nb-head d-flex">
            <div class="nb-head-left caps-text">
              <p>
                <div class="td-img-group d-flex align-items-center">
                  {props?.categories &&
                    props?.categories.length &&
                    props?.categories[0] &&
                    props?.categories[0]?.name}

                  <div
                    class="td-link-text d-flex align-items-center justify-content-center fw-semibold"
                    style={{ marginLeft: "10px" }}
                  >
                    <Dropdown bsPrefix="header-name-box fw-medium dropdown cursor-pointer">
                      <Dropdown.Toggle
                        as="span"
                        id="dropdown-basic"
                        className="dropdown-toggle"
                      >
                        <a
                          class="td-a-icon "
                          data-bs-toggle="dropdown"
                          aria-expanded={false}
                        >
                          <u>
                            {props?.categories && props?.categories.length >= 2
                              ? `+ ${props?.categories.length - 1}`
                              : ""}
                          </u>
                        </a>
                      </Dropdown.Toggle>

                      <Dropdown.Menu bsPrefix="dropdown-menu dropdown-menu-end">
                        <Dropdown.Item>
                          {props?.categories &&
                            props?.categories?.length &&
                            props?.categories.map((item) => {
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
                </div>
                {/* <span
                  class="badge badge-green"
                  style={{ pointerEvents: "none" }}
                >
                  {props?.follow}
                </span> */}
              </p>
            </div>
            <div class="nb-head-date">
              {moment(props && props.createdAt).format("MMM DD, YYYY")}
            </div>
          </div>
          <Link
            to={{
              pathname: `/news/${getSlug(props?.name)}`,
              state: { id: props?.id },
            }}
          >
            <div
              class="nb-body  "
              style={{ height: !isMobile ? "165px" : "auto" }}
            >
              <h6
                class={isMobile ? "" : `region-news-card`}
                style={{ minHeight: !isMobile ? "80px" : "20px" }}
              >
                {dotDesc(HTMLReactParser(removeTags(props.name)), 70)}
              </h6>
              <p className="des">
                {props.description
                  ? dotDesc(HTMLReactParser(removeTags(props.description)), 120)
                  : ""}
              </p>
            </div>
          </Link>
        </div>
      )}
    </li>
  );
};

export default ListingNewsOnRegion;
