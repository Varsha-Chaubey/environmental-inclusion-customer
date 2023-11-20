import React from "react";
import Skeleton from "react-loading-skeleton";
import feedIcon from "../../../include/images/fav-icon.svg";
import editIcon from "../../../include/images/heart.svg";
import wIcon from "../../../include/images/w-icon-1.svg";
import wIcon2 from "../../../include/images/w-icon-2.svg";
import wIcon3 from "../../../include/images/w-icon-3.svg";
import wIcon4 from "../../../include/images/w-icon-4.svg";
import wIcon5 from "../../../include/images/w-icon-5.svg";
import moment from "moment";
import { Dropdown } from "react-bootstrap";
import useCheckMobileScreen from "../../../common/customHooks/useCheckMobileScreen";
const FeedCard = (props) => {
  const isMobile = useCheckMobileScreen();
  return (
    <>
      {props.loadingMain
        ? [1, 2, 3, 4, 5, 6, 7, 8, 8, 8].map((item) => (
            <div class="widget d-flex flex-wrap">
              <div class="widget-icon">
                <div class="w-icon d-flex align-items-center justify-content-center overflow-hidden">
                  <Skeleton height={"48px"} width={"48px"} />
                </div>
              </div>
              <div class="widget-content">
                <div class="widget-text-holder">
                  <div class="w-text-box">
                    <p>
                      <Skeleton height={isMobile ? "70px" : "80px"} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        : props.feedData &&
          props.feedData.length > 0 &&
          props.feedData.map((item) => {
            return (
              <div class="widget d-flex flex-wrap">
                <div class="widget-icon">
                  <div class="w-icon d-flex align-items-center justify-content-center overflow-hidden">
                    <img
                      src={
                        item?.createdBy?.profilePicture?.original
                          ? process.env.REACT_APP_MEDIA +
                            item?.createdBy?.profilePicture?.original
                          : feedIcon
                      }
                      alt="feed icon"
                    />
                  </div>
                </div>
                <div class="widget-content">
                  <div class="widget-text-holder">
                    <div class="w-heading-block position-relative">
                      <div class="w-heading-box d-flex align-items-center flex-wrap">
                        <div class="w-label-box fw-semibold caps-text">
                          {item?.createdBy && item?.createdBy.firstName}{" "}
                          {item?.createdBy && item?.createdBy.lastName}
                        </div>
                        <span class="w-dot-box"></span>
                        <div class="w-time-box d-flex align-items-center">
                          <span class="w-time-count">
                            {moment(item && item.createdAt).format("mm")}
                          </span>{" "}
                          min
                        </div>
                      </div>
                      {item?.createdBy &&
                      item?.createdBy?._id === props?.userProfile?._id ? (
                        <div class="w-h-button-box d-flex align-items-center justify-content-center">
                          <Dropdown className="btn-group heart-icon-box  d-flex align-items-center justify-content-center cursor-pointer">
                            <Dropdown.Toggle
                              as="span"
                              id="dropdown-basic"
                              className="dropdown-toggle "
                            >
                              <img src={editIcon} alt="" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="dropdown-menu dropdown-menu-end">
                              <Dropdown.Item className="dropdown-item">
                                Edit
                              </Dropdown.Item>

                              <Dropdown.Item
                                className="dropdown-item delete"
                                onClick={() => props.handleDeletePost(item)}
                              >
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div class="w-text-box">
                      <p>{item?.description}</p>
                    </div>
                    <div class="w-iconlist d-flex flex-wrap align-items-center justify-content-between">
                      <div class="w-iconlist-item">
                        <div class="w-iconlist-box w-100 h-100 d-flex flex-wrap align-items-center">
                          <div class="w-iconl-box">
                            <img src={wIcon} alt="w icon 1" />
                          </div>
                        </div>
                      </div>
                      <div class="w-iconlist-item">
                        <div class="w-iconlist-box w-100 h-100 d-flex flex-wrap align-items-center">
                          <div class="w-iconl-box">
                            <img src={wIcon2} alt="w icon 2" />
                          </div>
                          <div class="w-textl-box">3</div>
                        </div>
                      </div>
                      <div class="w-iconlist-item">
                        <div class="w-iconlist-box w-100 h-100 d-flex flex-wrap align-items-center">
                          <div class="w-iconl-box">
                            <img src={wIcon3} alt="w icon 3" />
                          </div>
                          <div class="w-textl-box">16</div>
                        </div>
                      </div>
                      <div class="w-iconlist-item">
                        <div class="w-iconlist-box w-100 h-100 d-flex flex-wrap align-items-center">
                          <div class="w-iconl-box">
                            <img src={wIcon4} alt="w icon 4" />
                          </div>
                          <div class="w-textl-box">3</div>
                        </div>
                      </div>
                      <div class="w-iconlist-item">
                        <div class="w-iconlist-box w-100 h-100 d-flex flex-wrap align-items-center">
                          <div class="w-iconl-box">
                            <img src={wIcon5} alt="w icon 5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
    </>
  );
};

export default FeedCard;
