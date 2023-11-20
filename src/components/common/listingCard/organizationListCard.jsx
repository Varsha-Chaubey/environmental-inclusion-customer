import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { getSlug } from "../../../utils/helperFunctions";
const OrganizationListCard = (props) => {
  const slug = getSlug(props.name);
  const donationUrl = props?.donationUrl?.split("//").pop();
  return (
    <li class="organisation-item">
      {props.loading ? (
        <div className="ei-grid-box">
          <div class="organisation-logo">
            <Skeleton />
          </div>
          <div class="organisation-text">
            <Skeleton />
          </div>
        </div>
      ) : (
        <div
          className="organisation-box d-flex flex-wrap"
          style={{ height: "160px" }}
        >
          <div class="organisation-logo ">
            <Link
              to={{
                pathname: `/organizations/${slug}`,
                state: { id: props.id },
              }}
            >
              <img
                src={process.env.REACT_APP_MEDIA + props.img}
                alt=""
                className="org-img"
              />
            </Link>
          </div>
          <div class="organisation-text">
            <h6>
              {" "}
              <Link
                to={{
                  pathname: `/organizations/${slug}`,
                  state: { id: props.id },
                }}
              >
                {props?.name}
              </Link>
            </h6>
            <div class="organisation-text-footer">
              {props?.city ? (
                <>
                  <small>Address :</small>
                  <p className="caps-text">
                    {props?.city}
                    {", "} {props?.state}
                    {"- "}
                    {props?.country}`
                  </p>
                </>
              ) : (
                ""
              )}
              {props?.isAddedToDonation === true ? (
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
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default OrganizationListCard;
