import React, { useEffect, useState } from "react";
import PageLayout from "../../layout/PageLayout/pageLayout";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { getBlogDetails, blogsListings } from "../../store/blog";
import moment from "moment/moment";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import parse from "html-react-parser";
const BlogDetail = (props) => {
  const location = useLocation();
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location?.state?.id) {
      const id = location?.state?.id;
      setLoadingDetail(true);
      props.getBlogDetails(id, (res) => {
        if (res && res.status === 200) {
          setLoadingDetail(false);
        }
      });
    }
  }, [location?.state?.id]);

  const details = props.blogDetails && props.blogDetails.blogDetails;

  
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
                        <Link to="/blog">Blogs</Link>
                      </div>
                     
                    </div>
                    <div class="spd-head">
                      {!loadingDetail ? (
                        <>
                          <div class="spd-title text-green caps-text">
                            {details &&
                            details.categories &&
                            details.categories.length > 0
                              ? details.categories.map((i) =>i?.name)
                              .join(", ") 
                              : ""}
                          </div>

                          <div class="ei-heading">
                            <h1 className="caps-text">
                              {details && details.name}
                            </h1>
                          </div>
                        </>
                      ) : (
                        <>
                          <Skeleton width="100px" height="20px" />
                        </>
                      )}

                      <div class="publisher-footer d-flex">
                        {!loadingDetail ? (
                          <>
                            <div class="publisher-details">
                              <div class="pd-box">
                                {moment(details && details.createdAt).format(
                                  "MMM DD, YYYY"
                                )}
                              </div>
                              <div class="pd-box caps-text">
                                {details &&
                                  details.author &&
                                  `By ` + (details && details.author)}
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
                              details?.coverImage?.original
                                ? process.env.REACT_APP_MEDIA +
                                  details?.coverImage?.original
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
                        {details && details.description
                          ? parse(details.description)
                          : ""}
                      </div>
                    ) : (
                      <Skeleton width="600px" height="400px" />
                    )}
                  </div>
                  <div class="spd-image d-none d-lg-block">
                    {!loadingDetail ? (
                      <div class="spd-image-inner">
                        <img
                          src={
                            details?.coverImage?.original
                              ? process.env.REACT_APP_MEDIA +
                                details?.coverImage?.original
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
const mapDispatchToProps = (dispatch) => ({
  getBlogDetails: (params, callback) =>
    dispatch(getBlogDetails(params, callback)),
});

const mapStateToProps = (state) => ({
  blogDetails: blogsListings(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(BlogDetail));
