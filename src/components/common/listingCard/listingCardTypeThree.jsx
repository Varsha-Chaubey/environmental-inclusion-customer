import React from "react";
import Skeleton from "react-loading-skeleton";

const ListingCardTypeThree = (props) => {
  return (
    <li class="ei-grid-item">
      {props.loading ? (
        <div className="ei-grid-box">
          <Skeleton height="170px" />
        </div>
      ) : (
        <a class="ei-grid-box" style={{ cursor: "default" }}>
          <div class="ei-grid-box-image">
            <img src={props.img} alt="" />
          </div>
          <div class="ei-grid-box-overlay">
            <p>{props.description}</p>
          </div>
        </a>
      )}
    </li>
  );
};

export default ListingCardTypeThree;
