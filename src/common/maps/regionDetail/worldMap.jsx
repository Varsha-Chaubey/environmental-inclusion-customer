import React, { memo } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AlertError from "../../alerts/alertError";
import { getSlug } from "../../../utils/helperFunctions";

const WorldMap = ({ setTooltipContent, ...props }) => {
  const history = useHistory();

  return (
    <>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          // rotate: [0, 0],
          center: [0, 40],
          // parallels: [0, 0],
          scale: 150,
        }}
      >
        <Geographies geography="/feature.json">
          {({ geographies }) =>
            geographies.map((geo) => {
              const fillColor =
                props.page === "species"
                  ? props?.name && props?.name?.includes(geo?.properties.name)
                    ? "#47ad1d"
                    : "#fff"
                  : props.name == geo?.properties?.name
                  ? "#47ad1d"
                  : "#fff";
              return (
                <>
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    zoomAndPan="true"
                    onClick={(e) => {
                      if (props.mapType !== "zoo") {
                        const c =
                          props.data &&
                          props.data.filter(
                            (item) =>
                              item.countryName == `${geo.properties.name}`
                          );
                        if (c && c.length > 0) {
                          props.setSelectedId(c[0]);
                          if (c[0].country === "US") {
                            history.push(
                              `/regions/united-states/${getSlug(c[0]?.name)}`,
                              {
                                id: c[0]?._id,
                              }
                            );
                          } else {
                            history.push(`/regions/${getSlug(c[0]?.name)}`, {
                              id: c[0]?._id,
                            });
                          }
                        } else {
                          toast(<AlertError message="Region not available" />);
                        }
                      }
                    }}
                    style={{
                      default: {
                        fill: fillColor,
                        outline: "#000",
                        stroke: "#000",
                        strokeWidth: 0.75,
                      },
                      hover: {
                        fill: props.mapType == "zoo" ? "#D6D6DA" : "#47ad1d",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#47ad1d",
                        outline: "none",
                      },
                    }}
                    fill={
                      geo?.properties?.name.includes(props.name)
                        ? "#47ad1d"
                        : "#fff"
                    }
                  />
                </>
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </>
  );
};

export default memo(WorldMap);
