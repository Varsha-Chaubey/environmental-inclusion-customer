import React, { useEffect, useState } from "react";
import PageLayout from "../../layout/PageLayout/pageLayout";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { getNewsDetails, newsListings } from "../../store/news";
import moment from "moment/moment";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import parse from "html-react-parser";
import NewsletterSubcriber from "../../components/common/listingCard/newsletterSubcriber";
import { getMisc, addSubscribe } from "../../store/misc";
import AlertError from "../../common/alerts/alertError";
import AlertSuccess from "../../common/alerts/alertSuccess";
import { toast } from "react-toastify";
const NewsDetail = (props) => {
  const location = useLocation();
  const [showSubscriber, setshowSubscriber] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState({});
  const [subscribeValues, setSubscribeValues] = useState();

  const toggleSubscriber = () => {
    setshowSubscriber(!showSubscriber);
    setSubscribeValues();
    setError("");
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (location?.state?.id) {
      const id = location?.state?.id;
      setLoadingDetail(true);
      props.getNewsDetails(id, (res) => {
        if (res && res.status === 200) {
          setLoadingDetail(false);
        }
      });
    }
  }, [location?.state?.id]);

  const validateHandler = () => {
    const errors = {};

    if (!subscribeValues) {
      errors.name = "Email is required";
    }

    const isEmpty = Object.values(errors).every((x) => x === null || x === "");

    if (!isEmpty) {
      setError(errors);
      return false;
    } else {
      setError(errors);
      return true;
    }
  };

  const details = props.newsListings && props.newsListings.newsDetails;

  const handleSubscribe = (e) => {
    if (validateHandler()) {
      e.preventDefault();
      setLoadingDetail(true);

      const payload = {
        email: subscribeValues ? subscribeValues : "",
        newsCategories: details?.newsCategory ? [details.newsCategory] : [],
        regions:
          details.regions && details.regions.length > 0
            ? details.regions.map((item) => item)
            : [],
        species:
          details.species && details.species.length > 0
            ? details.species.map((item) => item)
            : [],
        organizations:
          details.organizations && details.organizations.length > 0
            ? details.organizations.map((item) => item)
            : [],
        zoos:
          details.zoos && details.zoos.length > 0
            ? details.zoos.map((item) => item)
            : [],
      };
      props.addSubscribe(payload, (res) => {
        if (res.status === 200) {
          setLoadingDetail(false);
          toggleSubscriber();
          setSubscribeValues("");
          toast(<AlertSuccess message="Subscribed" />);
        } else {
          setLoadingDetail(false);
          setSubscribeValues("");
          toast(
            <AlertError
              message={
                res && res.data && res.data.message
                  ? res.data.message
                  : "Something Went Wrong"
              }
            />
          );
        }
      });
    }
  };
  return (
    <PageLayout>
      <main id="main">
        <div class="content-container pt-40">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="single-page-details">
                  <div class="breadcrumb-row d-flex flex-wrap">
                    <div class="breadcrumb-box">
                      {" "}
                      <Link to="/">Home</Link>
                    </div>
                    <div class="breadcrumb-box">
                      <Link to="/news">News</Link>
                    </div>
                  </div>

                  <div class="spd-head">
                    {!loadingDetail ? (
                      <>
                        <div class="spd-title text-green caps-text">
                          {details &&
                          details.categories &&
                          details.categories.length > 0
                            ? details.categories.map((i) => i?.name).join(", ")
                            : ""}
                        </div>
                        <div class="ei-heading caps-text">
                          <h1>{details?.name}</h1>
                        </div>
                      </>
                    ) : (
                      <>
                        <Skeleton width="100px" height="20px" />
                        <Skeleton width="300px" height="20px" />
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

                          <div
                            class="btn btn-dark-green"
                            onClick={() => toggleSubscriber()}
                          >
                            Subscribe to Newsletter
                          </div>
                        </>
                      ) : (
                        <>
                          <Skeleton width="100px" height="20px" />
                          <Skeleton width="300px" height="20px" />
                        </>
                      )}
                    </div>
                    <div class="spd-text-icon d-flex">
                      {" "}
                      {/* <a href="#!" style={{pointerEvents:"none"}}>
                        <img src={share} alt="" />
                      </a> */}
                      {/* <a href="#!">
                        <img src="include/images/edit.svg" alt="" />
                      </a> */}
                    </div>
                  </div>
                  <div class="spd-separator"></div>
                  {!loadingDetail ? (
                    <>
                      <div class="spd-body">
                        <p>
                          {" "}
                          {details && details.description
                            ? parse(details.description)
                            : ""}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div class="spd-body">
                      <Skeleton width="1000px" height="100px" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <NewsletterSubcriber
        show={showSubscriber}
        onHide={toggleSubscriber}
        subscribeValues={subscribeValues}
        setSubscribeValues={setSubscribeValues}
        heading="Subscribe to Newsletter"
        handleSubmit={handleSubscribe}
        error={error}
        loading={loadingDetail}
        setError={setError}
      />
    </PageLayout>
  );
};
const mapDispatchToProps = (dispatch) => ({
  getNewsDetails: (params, callback) =>
    dispatch(getNewsDetails(params, callback)),
  addSubscribe: (data, callback) => dispatch(addSubscribe(data, callback)),
});

const mapStateToProps = (state) => ({
  newsListings: newsListings(state),
  getMisc: getMisc(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(NewsDetail));
