import React from "react";
import { connect } from "react-redux";
import {
  getOrganizationDetails,
  getMediaDetails,
  organizationListing,
} from "../../store/organization";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import USMap from "../../common/maps/regionDetail/usMap";
import WorldMap from "../../common/maps/regionDetail/worldMap";
import { getRegionList, sideBarApisListings } from "../../store/sidebarApis";
import { useEffect } from "react";
import LargeImageGalleryModal from "../common/imageGallery/largeImageGallery";

const Media = (props) => {
  const [loading, setLoading] = useState(false);
  const details =
    props.organizationListing && props.organizationListing.mediaDetail;

  useEffect(() => {
    props.getRegionList({}, (res) => {
      if (res && res.status === 200) {
      }
    });
  }, []);
  const detail =
    props.organizationListing && props.organizationListing.organizationDetail;
  const allRegionDetails = props?.sideBarApisListings?.regionList?.data;
  const usRegions =
    allRegionDetails &&
    allRegionDetails.length > 0 &&
    allRegionDetails.filter((item) => item.country === "US");

  const regionsName =
    detail?.data &&
    detail?.data?.regions &&
    detail?.data?.regions.length &&
    detail?.data?.regions.map((item) => item);

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
      details &&
      details.data &&
      details.data.length &&
      details.data.map((item) => {
        const mediaType = item.file.mediaType;
        const original = process.env.REACT_APP_MEDIA + item.file.original;
        const ext = item?.file?.original.split(".").pop();
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

    setGalleryItems(mediaItems && mediaItems.filter(Boolean));
  }, [details]);
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="tbc-body-inner">
              <ul class="media-list d-flex flex-wrap">
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
                    <ul class="media-list d-flex flex-wrap">
                      {details && details.data && details.data.length
                        ? details?.data.map((item, idx) => {
                            const ext = item?.file?.original.split(".").pop();
                            return (
                              <li class="media-item">
                                <div class="media-box">
                                  <div
                                    class="media-box-inner"
                                    onClick={() => openModal(idx)}
                                  >
                                    {item &&
                                    item?.file?.mediaType === "image" ? (
                                      <img
                                        class=""
                                        src={
                                          process.env.REACT_APP_MEDIA +
                                          item.file.original
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
                                            item.file.original
                                          }
                                        />
                                      </video>
                                    )}
                                  </div>
                                </div>
                              </li>
                            );
                          })
                        : ""}
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
      <div class="country-cta-container bg-green" style={{ marginTop: "68px" }}>
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="country-cta-box d-flex flex-row justify-content-center region-list">
                {regionsName && regionsName.length
                  ? regionsName.map((item, index) => {
                      return (
                        <p
                          style={{ marginRight: "5px", marginBottom: "0px" }}
                          key={index}
                        >
                          {item && item?.countryName === "United States"
                            ? `${item?.state}, ${item?.countryName}`
                            : item?.countryName}
                          {index !== regionsName.length - 1 ? " ." : ""}
                        </p>
                      );
                    })
                  : ""}
              </div>
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
  getMediaDetails: (params, callback) =>
    dispatch(getMediaDetails(params, callback)),
  getRegionList: (params, callback) =>
    dispatch(getRegionList(params, callback)),
  getOrganizationDetails: (params, callback) =>
    dispatch(getOrganizationDetails(params, callback)),
});

const mapStateToProps = (state) => ({
  organizationListing: organizationListing(state),
  sideBarApisListings: sideBarApisListings(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Media));
