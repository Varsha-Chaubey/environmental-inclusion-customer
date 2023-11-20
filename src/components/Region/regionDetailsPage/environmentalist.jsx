import React, { useState } from "react";
import ListingCard from "../../common/listingCard/listingCard";
import noRecord from "../../../include/images/nrb-img.svg";
const Environmentalist = (props) => {
  const [loading, setLoading] = useState(false);

  const environmentalistData = props.environmentalist;

  console.log("environmentalistData", environmentalistData);

  return (
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="tbc-body-inner">
            {environmentalistData && environmentalistData.length == 0 && (
              <ul class="ei-grid-list d-flex flex-wrap justify-content-center">
                <div class="no-records-container d-flex align-items-center justify-content-center">
                  <div class="no-records-box text-center">
                    <div class="nrb-image">
                      <img src={noRecord} alt="" />
                    </div>
                    <h6>No Records Found</h6>
                  </div>
                </div>
              </ul>
            )}
            <ul class="ei-grid-list region-species-list d-flex flex-wrap ei-grid-5">
              {environmentalistData &&
                environmentalistData.length > 0 &&
                environmentalistData.map((item) => (
                  <ListingCard
                    name={item.name}
                    loading={loading}
                    img={item?.coverImage?.original}
                    id={item?._id}
                    page={"environmentalist"}
                  />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Environmentalist);
