import React, { useState } from "react";
import { connect } from "react-redux";
import { getNews, regionListings } from "../../../store/region";
import Skeleton from "react-loading-skeleton";
import noRecord from "../../../include/images/nrb-img.svg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import NewsletterSubcriber from "../../common/listingCard/newsletterSubcriber";
import { getMisc, addSubscribe } from "../../../store/misc";
import AlertError from "../../../common/alerts/alertError";
import AlertSuccess from "../../../common/alerts/alertSuccess";
import { toast } from "react-toastify";
import moment from "moment";
import { getSlug, removeTags } from "../../../utils/helperFunctions";
import HTMLReactParser from "html-react-parser";

const News = (props) => {
  const [loading, setLoading] = useState(false);
  const [showSubscriber, setshowSubscriber] = useState(false);
  const [subscribeValues, setSubscribeValues] = useState();
  const [error, setError] = useState({});

  const toggleSubscriber = () => {
    setshowSubscriber(!showSubscriber);
    setSubscribeValues();
    setError("");
  };

  const newsDetails =
    props.regionDetails &&
    props.regionDetails.news &&
    props.regionDetails.news.data;

  const dotDesc = (description, limit) => {
    const dots = "...";
    if (description && description.length > limit) {
      if (description.includes("strong")) {
        description = description.substring(0, limit + 100) + dots;
      } else description = description.substring(0, limit) + dots;
    }
    return description;
  };

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


  const handleSubscribe = (e) => {
    if (validateHandler()) {
      e.preventDefault();
      setLoading(true);

      const payload = {
        email: subscribeValues ? subscribeValues : "",
        newsCategories: [],
        regions: props.id ? [props.id] : [],
        species: [],
        organizations: [],
        zoos: [],
      };
      props.addSubscribe(payload, (res) => {
        if (res.status === 200) {
          setLoading(false);
          toggleSubscriber();
          toast(<AlertSuccess message="Subscribed" />);
        } else {
          setLoading(false);
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

  const slug = "scj";

  return (
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="tbc-body-inner">
            {newsDetails && newsDetails.length >= 1 && (
              <div class="justify-content-end d-flex">
                <div
                  class="btn btn-default btn-dark-green"
                  onClick={() => toggleSubscriber()}
                >
                  Subscribe to Newsletter
                </div>
              </div>
            )}
            {newsDetails && newsDetails.length == 0 && (
              <ul class="news-list d-flex flex-wrap justify-content-center">
                <div class="no-records-container d-flex align-items-center justify-content-center">
                  <div class="no-records-box text-center">
                    <div class="nrb-image">
                      <img src={noRecord} alt="" />
                    </div>
                    <h6>No Records Found</h6>
                  </div>
                </div>
              </ul>
            )}
            <ul class="news-list d-flex flex-wrap">
              {loading
                ? [1, 2].map((item) => (
                    <li class="news-item r-news">
                      <Skeleton height="350px" />
                    </li>
                  ))
                : newsDetails &&
                  newsDetails.length > 0 &&
                  newsDetails.map((item) => (
                    <li class="news-item r-news">
                      <Link
                        to={{
                          pathname: `/news/${getSlug(item?.name)}`,
                          state: { id: item._id },
                        }}
                        class="news-box cursor-pointer"
                      >
                        <div class="nb-head d-flex">
                          <div class="nb-head-left cat-m">
                            <p>
                              {item.newsCategoryName
                                ? dotDesc(
                                    HTMLReactParser(
                                      removeTags(
                                        item?.newsCategoryName[0].toUpperCase() +
                                          item?.newsCategoryName
                                            .slice(1)
                                            .toLowerCase()
                                      )
                                    ),
                                    70
                                  )
                                : ""}
                            </p>
                          </div>
                          <div class="nb-head-date">
                            {" "}
                            {moment(item && item.createdAt).format(
                              "MMM DD, YYYY"
                            )}
                          </div>
                        </div>
                        <div class="nb-body" style={{ height: "150px" }}>
                          <h6 style={{ minHeight: "70px", maxHeight: "70px" }}>
                            {dotDesc(
                              HTMLReactParser(removeTags(item.name)),
                              70
                            )}
                          </h6>
                          <p>
                            {item.description
                              ? dotDesc(
                                  HTMLReactParser(removeTags(item.description)),
                                  150
                                )
                              : ""}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
      <NewsletterSubcriber
        show={showSubscriber}
        onHide={toggleSubscriber}
        setSubscribeValues={setSubscribeValues}
        heading="Subscribe to Newsletter"
        handleSubmit={handleSubscribe}
        error={error}
        loading={loading}
        setError={setError}
      />
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  getNews: (params, callback) => dispatch(getNews(params, callback)),
  addSubscribe: (data, callback) => dispatch(addSubscribe(data, callback)),
});

const mapStateToProps = (state) => ({
  regionDetails: regionListings(state),
  getMisc: getMisc(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(News));
