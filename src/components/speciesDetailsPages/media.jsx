import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getSpeciesDetails,
  getMedia,
  speciesListings,
} from "../../store/species";
import Skeleton from "react-loading-skeleton";
import { getRegionList, sideBarApisListings } from "../../store/sidebarApis";
import USMap from "../../common/maps/regionDetail/usMap";
import WorldMap from "../../common/maps/regionDetail/worldMap";
import LargeImageGalleryModal from "../common/imageGallery/largeImageGallery";

const Media = (props) => {
  const [loading, setLoadingDetail] = useState();
  const media = props.speciesListings && props.speciesListings.media?.data;

  const details = props.speciesListings && props.speciesListings.speciesDetail;
  const allRegionDetails = props?.sideBarApisListings?.regionList?.data;
  useEffect(() => {
    props.getRegionList({}, (res) => {
      if (res && res.status === 200) {
      }
    });
  }, []);

  const usRegions =
    allRegionDetails &&
    allRegionDetails.length > 0 &&
    allRegionDetails.filter((item) => item.country === "US");

  const regionsName =
    details?.data &&
    details?.data?.regions &&
    details?.data?.regions.length &&
    details?.data?.regions.map((item) => item);

  const usState =
    regionsName &&
    regionsName.length &&
    regionsName.filter((item) => item.countryName === "United States");

  // for image gallery
  const [showModal, setShowModal] = useState(false);
  const [galleryItems, setGalleryItems] = useState();
  const [startIndex, setStartIndex] = useState(0);

  const openModal = (startIndex) => {
    setStartIndex(startIndex);
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const mediaItems =
      media &&
      media.length &&
      media.map((item) => {
        const mediaType = item?.media?.mediaType;
        const original = process.env.REACT_APP_MEDIA + item.media.original;
        const ext = item?.media?.original.split(".").pop();
        if (mediaType === "image") {
          return {
            original: original,
            renderItem: () => <img src={original} alt="Image" />,
          };
        } else if (mediaType === "video") {
          return {
            original: original,
            renderItem: () => (
              <video controls>
                <source src={original} type={`${mediaType}/${ext}`} />
                Your browser does not support the video tag.
              </video>
            ),
          };
        }
        return null;
      });

    setGalleryItems(mediaItems&& mediaItems.filter(Boolean));
  }, [details]);
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="tbc-body-inner">
              <ul
                class="media-list d-flex flex-wrap"
                style={{ marginTop: "0px" }}
              >
                {loading ? (
                  [1, 2, 3, 4, 5].map((item) => (
                    <li class="media-item">
                    <div class="media-box">
                      <div class="media-box-inner">
                        <Skeleton width="215px" height={"215px"} />
                      </div>
                    </div>
                  </li>
                  ))
                ) : (
                  <>
                  <ul
                    class="media-list d-flex flex-wrap"
                    style={{ marginTop: "0px" }}
                  >
                    {media &&
                      media.length > 0 &&
                      media.map((item, idx) => {
                        const ext = item?.media?.original.split(".").pop();
                        return (
                          <li className="media-item">
                            <div class="media-box">
                              <div class="media-box-inner" onClick={() => openModal(idx)}>
                                {item && item?.media?.mediaType === "image" ? (
                                  <img
                                    class=""
                                    src={
                                      process.env.REACT_APP_MEDIA +
                                      item.media.original
                                    }
                                    alt=""
                                  />
                                ) : (
                                  <video
                                    className=""
                                    type={`${item.mediaType}/${ext}`}
                                    controls
                                  >
                                    <source
                                      src={
                                        process.env.REACT_APP_MEDIA +
                                        item.media.original
                                      }
                                    />
                                  </video>
                                )}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                   {showModal && (
                    <LargeImageGalleryModal
                      show={showModal}
                      handleClose={closeModal}
                      items={galleryItems}
                      startIndex={startIndex}
                    />
                  )}
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="tbc-map-full">
        <div class="map-hero-image">
          {regionsName &&
          regionsName.length === 1 &&
          regionsName[0]?.countryName === "United States" ? (
            <USMap
              name={
                regionsName &&
                regionsName.length === 1 &&
                regionsName[0]?.countryName === "United States"
                  ? usState?.map((item) => item?.state)
                  : usState?.map((item) => item?.countryName)
              }
              data={usRegions}
              setSelectedId={props?.setSelectedId}
              page="species"
            />
          ) : (
            <WorldMap
              name={
                regionsName &&
                regionsName.length &&
                regionsName?.map((item) => item?.countryName)
              }
              data={allRegionDetails}
              setSelectedId={props?.setSelectedId}
              page="species"
            />
          )}
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getMedia: (params, callback) => dispatch(getMedia(params, callback)),
  getSpeciesDetails: (params, callback) =>
    dispatch(getSpeciesDetails(params, callback)),
  getRegionList: (params, callback) =>
    dispatch(getRegionList(params, callback)),
});

const mapStateToProps = (state) => ({
  speciesListings: speciesListings(state),
  sideBarApisListings: sideBarApisListings(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Media));
