import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { getSlug } from "../../../utils/helperFunctions";
const ListingCard = (props) => {
  const RegionSlug = getSlug(props.name);
  const ScienceSlug = getSlug(props.name);
  const EnvironmentalistSlug = getSlug(props.name);
  const SpeciesSlug = getSlug(props.name);
  const threatsSlug = getSlug(props.name);
  const zooSlug = getSlug(props.name);
  return (
    <li class="ei-grid-item">
      {props.loading ? (
        <div className="ei-grid-box">
          <Skeleton height={"270px"} />
        </div>
      ) : props.page === "region-listing-page" ||
        props.page === "Science And Education" ||
        props.page === "environmentalist" ||
        // props.page === "threats" ||
        // props.page === "zoo" ||
        props.page === "region-species" ? (
        <Link
          to={
            props.page === "region-listing-page"
              ? {
                  pathname:
                    props.country === "US"
                      ? `/regions/united-states/${RegionSlug}`
                      : `/regions/${RegionSlug}`,
                  state: { id: props.id },
                }
              : props.page === "Science And Education"
              ? {
                  pathname: `/science-education/${ScienceSlug}`,
                  state: { id: props?.id },
                }
              : props.page === "environmentalist"
              ? {
                  pathname: `/environmentalists/${EnvironmentalistSlug}`,
                  state: { id: props?.id },
                }
              : props.page === "region-species"
              ? {
                  pathname: `/endangered-species/${SpeciesSlug}`,
                  state: { id: props?.id },
                }
              // : props.page === "threats"
              // ? {
              //     pathname: `/war-on-the-environment-threats/${threatsSlug}`,
              //     state: { id: props?.id },
              //   }
              // : props.page === "zoo"
              // ? {
              //     pathname: `/zoos-and-wildlife-preserves/${zooSlug}`,
              //     state: { id: props?.id },
              //   }
              : ""
          }
          className="ei-grid-box"
        >
          <div class="ei-grid-box-image list-card-image">
            <img src={process.env.REACT_APP_MEDIA + props.img} alt="" />
          </div>
          <div
            class={
              props.page === "region-listing-page"
                ? "ei-grid-box-overlay"
                : props.page === "Science And Education"
                ? "ei-grid-box-overlay"
                : props.page === "environmentalist"
                ? "ei-grid-box-overlay"
                : props.page === "region-species"
                ? "ei-grid-box-overlay"
                // : props.page === "threats"
                // ? "ei-grid-box-overlay"
                // : props.page === "zoo"
                // ? "ei-grid-box-overlay"
                : " ei-grid-box-overlay default-c"
            }
          >
            <p>{props.name}</p>
            {props.pawRed && props.pawRedImage && (
              <img
                src={process.env.REACT_APP_MEDIA + props.pawRedImage}
                class="ei-grid-box-icon"
                alt=""
              />
            )}
          </div>
        </Link>
      ) : (
        <a href="#!" className="ei-grid-box no-cursor">
          <div class="ei-grid-box-image list-card-image">
            <img src={process.env.REACT_APP_MEDIA + props.img} alt="" />
          </div>
          <div
            class={
              props.page === "organizations" ||
              props.page === "species" ||
              props.page === "environmentalist" ||
              props.page === "region-species" 
              // props.page === "threats" ||
              // props.page === "zoo"
                ? "ei-grid-box-overlay"
                : " ei-grid-box-overlay default-c"
            }
          >
            <p>{props.name}</p>
            {props.pawRed && props.pawRedImage && (
              <img
                src={process.env.REACT_APP_MEDIA + props.pawRedImage}
                class="ei-grid-box-icon"
                alt=""
              />
            )}
          </div>
        </a>
      )}
    </li>
  );
};

export default ListingCard;
