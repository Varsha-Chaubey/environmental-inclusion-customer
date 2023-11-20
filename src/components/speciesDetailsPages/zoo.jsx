import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { getZoo, speciesListings } from "../../store/species";
import App from "../../common/maps/map";
import Skeleton from "react-loading-skeleton";
import { removeTags } from "../../utils/helperFunctions";
import HTMLReactParser from "html-react-parser";
const ZooAndWildLife = (props) => {
  const [loadingMain, setLoadingMain] = useState(false);
  const [mapZooData, setMapZooData] = useState([]);
  useEffect(() => {
    setLoadingMain(true);
    props.getZoo(props.id, (res) => {
      if (res && res.status === 200) {
        const a =
          res &&
          res.data &&
          res.data.data &&
          res.data.data?.length > 0 &&
          res.data.data.map((item) => ({
            name: item.name,
            coordinates: item.geoLocation,
          }));
        setMapZooData(a);
        setLoadingMain(false);
      }
    });
  }, []);
  const zooData =
    props.speciesListings &&
    props.speciesListings.zoo &&
    props.speciesListings.zoo.data;

  const dotDesc = (description, limit) => {
    const dots = "...";
    if (description && description.length > limit) {
      if (description.includes("strong")) {
        description = description.substring(0, limit + 100) + dots;
      } else description = description.substring(0, limit) + dots;
    }
    return description;
  };
  return (
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="tbc-body-inner" style={{ paddingTop: "20px" }}>
            {loadingMain ? (
              [1, 2, 3].map((item) => (
                <li
                  class="tbc-zoo-details d-flex flex-wrap"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    class="tbc-zoo-details-img"
                    style={{ paddingBottom: "0px" }}
                  >
                    <Skeleton width="400px" height="200px" />
                  </div>
                  <div class="tbc-zoo-details-text">
                    <h4>
                      <Skeleton />
                    </h4>
                    <p>
                      <Skeleton height="150px" />
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <ul className="ei-grid-list">
                {zooData &&
                  zooData.length > 0 &&
                  zooData.map((item) => (
                    <li
                      class="tbc-zoo-details d-flex flex-wrap"
                      style={{ textDecoration: "none" }}
                    >
                      <div class="tbc-zoo-details-img">
                        <img
                          src={
                            item?.coverImage?.original
                              ? process.env.REACT_APP_MEDIA +
                                item?.coverImage?.original
                              : ""
                          }
                          alt=""
                        />
                      </div>
                      <div class="tbc-zoo-details-text">
                        <h4>{item?.name}</h4>
                        <p>
                          {item.description
                            ? dotDesc(
                                HTMLReactParser(removeTags(item.description)),
                                120
                              )
                            : ""}
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <App data={mapZooData} mapType="zoo" zoom="zoom" />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getZoo: (params, callback) => dispatch(getZoo(params, callback)),
});

const mapStateToProps = (state) => ({
  speciesListings: speciesListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ZooAndWildLife));
