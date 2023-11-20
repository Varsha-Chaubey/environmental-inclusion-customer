import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getSlug } from "../../../utils/helperFunctions";
const ListingCardType = (props) => {
  return props.loading ? (
    [1, 2].map(() => (
      <>
        <li class="ei-grid-item">
          <Skeleton height="250px" />
        </li>
      </>
    ))
  ) : props.page == "Science And Education" ? (
    <li class="ei-grid-item">
      <Link
        class="ei-grid-box"
        to={{
          pathname: `/science-education/${getSlug(props?.name)}`,
          state: { id: props?.id },
        }}
      >
        <div class="ei-grid-box-image">
          <img src={props.img} alt="" />
        </div>
        <div class="ei-grid-box-overlay">
          <p>{props.name}</p>
        </div>
      </Link>
    </li>
  ) : (
    <li class="ei-grid-item">
      <Link
          className="ei-grid-box pointer-event-none"
          style={{ cursor: "default" }}
        >
      
        <div class="ei-grid-box-image">
          <img src={props.img} alt="" />
        </div>
        <div class="ei-grid-box-overlay">
          <p>{props.name}</p>
        </div>
      </Link>
    </li>
  );
};

export default ListingCardType;
