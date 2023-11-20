import React from "react";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getSlug, removeTags } from "../../../utils/helperFunctions";
import HTMLReactParser from "html-react-parser";
import { Dropdown } from "react-bootstrap";
const ListingBlogCard = (props) => {
  const dotDesc = (description, limit) => {
    const dots = "...";
    if (description && description.length > limit) {
      description = description.substring(0, limit) + dots;
    }
    return description;
  };
  return (
    <li class="blog-item">
      {props.loading ? (
        <div className="blog-box">
          <div class="blog-box-image list-card-image">
            <Skeleton />
          </div>
          <div class="blog-box-content">
            <Skeleton />
          </div>
        </div>
      ) : (
        <div class="blog-box blog-sm card-box-shadow">
          <div class="blog-box-image">
            <img
              src={process.env.REACT_APP_MEDIA + props.img}
              alt=""
              className="blog-img"
            />
            {/* <img src="include/images/blog1.jpg" alt="" /> */}
          </div>
          <div class="blog-box-content">
            <div class="bbc-head caps-text">
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
            </div>
            <Link
              to={{
                pathname: `/blog/${getSlug(props?.name)}`,
                state: { id: props?.id },
              }}
            >
              <div class="bbc-body mt-2">
                <h6
                  className="blog-h title-hover"
                  style={{ minHeight: "70px" }}
                >
                  {dotDesc(HTMLReactParser(removeTags(props.name)), 70)}
                </h6>

                <p>
                  {" "}
                  {dotDesc(HTMLReactParser(removeTags(props.description)), 150)}
                </p>
              </div>
            </Link>
          </div>
          <div class="bbc-footer">
            <div class="bbc-footer-inner">
              <p>{moment(props && props.createdAt).format("MMM DD, YYYY")}</p>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default ListingBlogCard;
