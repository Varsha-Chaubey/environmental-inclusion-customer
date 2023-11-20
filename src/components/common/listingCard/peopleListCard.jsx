import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { getSlug } from "../../../utils/helperFunctions";
const PeopleListCard = (props) => {
  const slug = getSlug(props.name);
  return (
    <li class="ei-grid-item">
      {props.loading ? (
        <div className="ei-grid-box">
          <Skeleton height={"270px"} />
        </div>
      ) : props.page == "species-people-card" ? (
        <Link
          className="ei-grid-box "
          to={{
            pathname: `/environmentalists/${getSlug(props?.name)}`,
            state: { id: props.id },
          }}
        >
          <div class="ei-grid-box-image">
            <img src={process.env.REACT_APP_MEDIA + props.img} alt="" />
          </div>
          <div class="ei-grid-box-overlay">
            <p>{props.name}</p>
          </div>
        </Link>
      ) : (
        <Link
          className="ei-grid-box pointer-event-none"
          style={{ cursor: "default" }}
        >
          <div class="ei-grid-box-image">
            <img src={process.env.REACT_APP_MEDIA + props.img} alt="" />
          </div>
          <div class="ei-grid-box-overlay">
            <p>{props.name}</p>
          </div>
        </Link>
      )}
    </li>
  );
};

export default PeopleListCard;
