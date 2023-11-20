import React, { useState } from "react";
import PageLayout from "../../layout/PageLayout/pageLayout";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment/moment";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import parse from "html-react-parser";
import { getSlug } from "../../utils/helperFunctions";
const ProgramDetailPage = (props) => {
  const location = useLocation();
  const state = location.state;
  const [loadingDetail, setLoadingDetail] = useState(false);

  return (
    <PageLayout>
      <main id="main">
        {/* <!-- content-container start --> */}
        <div class="content-container pt-40">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="single-page-details d-flex flex-wrap">
                  <div class="spd-content">
                    <div class="breadcrumb-row d-flex flex-wrap">
                      <div class="breadcrumb-box">
                        {" "}
                        <Link to="/">Home</Link>
                      </div>
                      <div class="breadcrumb-box">
                        <Link to="/organizations">Organization</Link>
                      </div>
                      <div class="breadcrumb-box">
                        <Link
                          to={{
                            pathname: `/organizations/${getSlug(state?.name)}`,
                            state: { id: state.id },
                          }}
                        >
                          {state && state?.name}
                        </Link>
                      </div>
                    </div>
                    <div class="spd-head">
                      {!loadingDetail ? (
                        <>
                          <div class="ei-heading">
                            <h1 className="caps-text">
                              {state && state?.item.name}
                            </h1>
                          </div>
                        </>
                      ) : (
                        <>
                          <Skeleton width="500px" height="20px" />
                        </>
                      )}

                      <div class="publisher-footer d-flex">
                        {!loadingDetail ? (
                          <>
                            <div class="publisher-details">
                              <div class="pd-box">
                                {moment(state && state?.item?.createdAt).format(
                                  "MMM DD, YYYY"
                                )}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            {" "}
                            <Skeleton width="100px" height="20px" />
                          </>
                        )}
                      </div>

                      <div class="spd-text-icon d-flex">
                        {" "}
                        {/* <a href="#!"  style={{pointerEvents:"none"}}>
                          <img src={share} alt="" />
                        </a> */}
                      </div>
                    </div>

                    <div class="spd-separator"></div>
                    <div class="spd-image-inner d-lg-none d-block">
                      {!loadingDetail ? (
                        <div class="spd-image-inner">
                          <img
                            src={
                              state?.item?.coverImage?.original
                                ? process.env.REACT_APP_MEDIA +
                                  state?.item?.coverImage?.original
                                : ""
                            }
                            alt=""
                          />
                        </div>
                      ) : (
                        <Skeleton width="600px" height="400px" />
                      )}
                    </div>

                    {!loadingDetail ? (
                      <div class="spd-body">
                        {state && state?.item?.description
                          ? parse(state?.item?.description)
                          : ""}
                      </div>
                    ) : (
                      <Skeleton width="600px" height="250px"/>
                    )}
                  </div>
                  <div class="spd-image d-none d-lg-block">
                    {!loadingDetail ? (
                      <div class="spd-image-inner">
                        <img
                          src={
                            state?.item?.coverImage?.original
                              ? process.env.REACT_APP_MEDIA +
                                state?.item?.coverImage?.original
                              : ""
                          }
                          alt=""
                        />
                      </div>
                    ) : (
                      <Skeleton width="600px" height="400px" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- content-container end --> */}
      </main>
    </PageLayout>
  );
};
const mapDispatchToProps = (dispatch) => ({});

const mapStateToProps = (state) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ProgramDetailPage));
