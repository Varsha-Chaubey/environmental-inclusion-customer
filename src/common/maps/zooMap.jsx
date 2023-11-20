import React from "react";
import {
  GoogleMap,
  InfoWindowF,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { useState } from "react";
import { ultraLightTheme } from "./ultraLightTheme";
import marker from "../../include/images/marker.svg";
import marker1 from "../../include/images/marker1.svg";
import { useEffect } from "react";

const NewMarker = (props) => {
  const [zoom, setZoom] = useState(props.zoom ? 2.32 : 1.62);
  const [center, setCenter] = useState({
    lat: 0.745,
    lng: 0.745,
  });
  const [showInfo, setShowInfo] = useState(false);
  const [hoveredCords, setHoveredCords] = useState({ lat: "", lng: "" });

  const mapContainerStyle = {
    marginTop: "21px",
    height: "773px",
    width: "100%",
  };

  const mapData =
    props.data &&
    props.data.map((item) => ({
      name: item.name,
      coordinates: item.coordinates,
    }));

  const mapData1 =
    (props.data1 &&
      props.data1?.map((item) => ({
        name: item.name,
        coordinates: item.coordinates,
      }))) ||
    [];

  const onLoad = (marker) => {};

  return (
    <LoadScript googleMapsApiKey="AIzaSyB0e6NXLm5QM6WrRb1whqfG0UdpY72bvMg">
      <GoogleMap
        id="marker-example"
        mapContainerStyle={mapContainerStyle}
        zoom={zoom}
        center={center}
        options={{ styles: ultraLightTheme }}
      >
        {props.isMultiMarker &&
          mapData1 &&
          mapData1.length > 0 &&
          mapData1.map((item, i) => (
            <>
              <Marker
                icon={{
                  url: marker1,
                }}
                onMouseOver={() => {
                  setHoveredCords({
                    lat: +item?.coordinates?.latitude,
                    lng: +item?.coordinates?.longitude,
                  });
                  setShowInfo(true);
                }}
                onMouseOut={() => {
                  setHoveredCords({ lat: "", lng: "" });
                  setShowInfo(false);
                }}
                onLoad={onLoad}
                onClick={() => {
                  if (zoom > 18 && center.lat == item?.coordinates?.latitude) {
                    setZoom(1.62);
                    setCenter({
                      lat: 0.745,
                      lng: 0.745,
                    });
                  } else {
                    setZoom(zoom + 2);
                    setCenter({
                      lat: +item?.coordinates?.latitude,
                      lng: +item?.coordinates?.longitude,
                    });
                  }
                }}
                position={{
                  lat: +item?.coordinates?.latitude,
                  lng: +item?.coordinates?.longitude,
                }}
              >
                {showInfo &&
                  hoveredCords.lat == item?.coordinates?.latitude && (
                    <InfoWindowF className="infoWindow">
                      {/* <div className="zoo-tooltip"> */}
                      <p>{item.name}</p>
                      {/* </div> */}
                    </InfoWindowF>
                  )}
              </Marker>
            </>
          ))}
        {mapData &&
          mapData.length > 0 &&
          mapData.map((item, i) => (
            <>
              <Marker
                icon={{
                  url: marker,
                }}
                onMouseOver={() => {
                  setHoveredCords({
                    lat: +item?.coordinates?.latitude,
                    lng: +item?.coordinates?.longitude,
                  });
                  setShowInfo(true);
                }}
                onMouseOut={() => {
                  setHoveredCords({ lat: "", lng: "" });
                  setShowInfo(false);
                }}
                onLoad={onLoad}
                onClick={() => {
                  if (zoom > 18 && center.lat == item?.coordinates?.latitude) {
                    setZoom(1.62);
                    setCenter({
                      lat: 0.745,
                      lng: 0.745,
                    });
                  } else {
                    setZoom(zoom + 2);
                    setCenter({
                      lat: +item?.coordinates?.latitude,
                      lng: +item?.coordinates?.longitude,
                    });
                  }
                }}
                position={{
                  lat: +item?.coordinates?.latitude,
                  lng: +item?.coordinates?.longitude,
                }}
              >
                {showInfo &&
                  hoveredCords.lat == item?.coordinates?.latitude && (
                    <InfoWindowF className="infoWindow">
                      {/* <div className="zoo-tooltip"> */}
                      <p>{item.name}</p>
                      {/* </div> */}
                    </InfoWindowF>
                  )}
              </Marker>
            </>
          ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default NewMarker;
