import React, { useState } from "react";
import RegionMap from "./regionMap";
import NewMarker from "./zooMap";

const App = (props) => {
  const [content, setContent] = useState("");
  return (
    <div>
      {props.mapType == "zoo" ? (
        <NewMarker
          data={props.data}
          zoom={props.zoom}
          isMultiMarker={props.isMultiMarker ? props.isMultiMarker : false}
          data1={props?.data1 ? props?.data1 : []}
        />
      ) : (
        <RegionMap
          setTooltipContent={setContent}
          data={props.data}
          mapType={props.mapType}
          selectedMap={props.selectedMap}
          setSelectedMap={props.setSelectedMap}
        />
      )}
    </div>
  );
};

export default App;
