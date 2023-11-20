import React from "react";
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "react-simple-maps";

import allStates from "./allStates.json";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { toast } from "react-toastify";
import AlertError from "../../alerts/alertError";
import { getSlug } from "../../../utils/helperFunctions";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
};

const USMap = (props) => {
  const history = useHistory();

  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                stroke="#FFF"
                geography={geo}
                onClick={(e) => {
                  if (props.mapType !== "zoo") {
                    const c =
                      props.data &&
                      props.data.filter(
                        (item) => item.state == `${geo.properties.name}`
                      );
                    if (c && c.length > 0) {
                      props.setSelectedId(c[0]);
                      history.push(
                        `/regions/united-states/${getSlug(c[0]?.name)}`,
                        {
                          id: c[0]?._id,
                        }
                      );
                    } else {
                      toast(<AlertError message="Region not available" />);
                    }
                  }
                }}
                style={{
                  default: {
                    fill:
                      props.name == geo?.properties?.name ? "#47ad1d" : "#fff",
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
              />
            ))}
            {geographies.map((geo) => {
              const centroid = geoCentroid(geo);
              const cur = allStates.find((s) => s.val === geo.id);
              return (
                <g key={geo.rsmKey + "-name"}>
                  {cur &&
                    centroid[0] > -160 &&
                    centroid[0] < -67 &&
                    (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                      <Marker coordinates={centroid}>
                        <text y="2" fontSize={14} textAnchor="middle">
                          {cur.id}
                        </text>
                      </Marker>
                    ) : (
                      <Annotation
                        subject={centroid}
                        dx={offsets[cur.id][0]}
                        dy={offsets[cur.id][1]}
                      >
                        <text x={4} fontSize={14} alignmentBaseline="middle">
                          {cur.id}
                        </text>
                      </Annotation>
                    ))}
                </g>
              );
            })}
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
};

export default USMap;
