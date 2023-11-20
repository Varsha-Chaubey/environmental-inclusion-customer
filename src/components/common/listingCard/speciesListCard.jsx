import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { getSlug } from "../../../utils/helperFunctions";
const SpeciesListCard = (props) => {
  const slug = getSlug(props.name);
  return (
    <li class="ei-grid-item">
      {props.loading ? (
        <div className="ei-grid-box">
          <div class="ei-grid-box-image list-card-image">
            <Skeleton />
          </div>
          <div class="ei-grid-box-overlay">
            <Skeleton />
          </div>
        </div>
      ) : (
        <Link
          to={
            props.page === "species-listing-page"
              ? { pathname: `/endangered-species/${slug}`, state: { id: props.id } }
              : ""
          }
          className="ei-grid-box"
        >
          <div class="ei-grid-box-image list-card-image">
            <img src={process.env.REACT_APP_MEDIA + props.img} alt="" />
          </div>

          <div
            class={
              props.page === "species-listing-page"
                ? "ei-grid-box-overlay"
                : " ei-grid-box-overlay default-c"
            }
          >
            <p>{props.name}</p>

            {props.dangerImg && (
              <img
                src={process.env.REACT_APP_MEDIA + props.dangerImg}
                class="ei-grid-box-icon"
                alt=""
              />
            )}
          </div>
        </Link>
      )}
    </li>
  );
};

export default SpeciesListCard;
