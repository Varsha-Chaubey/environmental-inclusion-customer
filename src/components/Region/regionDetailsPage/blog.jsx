import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { getBlog, regionListings } from "../../../store/region";
import noRecord from "../../../include/images/nrb-img.svg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getSlug, removeTags } from "../../../utils/helperFunctions";
import HTMLReactParser from "html-react-parser";
const Blog = (props) => {
  const [loading, setLoading] = useState(false);

  const blogDetails =
    props.regionDetails &&
    props.regionDetails.blog &&
    props.regionDetails.blog.data;

  const dotDesc = (description, limit) => {
    const dots = "...";
    if (description && description.length > limit) {
      description = description.substring(0, limit) + dots;
    }
    return description;
  };

  return (
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="tbc-body-inner">
            {blogDetails && blogDetails.length == 0 && (
              <ul class="blog-list d-flex flex-wrap justify-content-center">
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
            <ul class="blog-list d-flex flex-wrap">
              {blogDetails &&
                blogDetails.length > 0 &&
                blogDetails.map((item) => (
                  <li class="blog-item">
                    <Link
                      to={{
                        pathname: `/blog/${getSlug(item?.name)}`,
                        state: { id: item._id },
                      }}
                      class="blog-box blog-sm "
                    >
                      <div class="blog-box-image">
                        <img
                          src={
                            process.env.REACT_APP_MEDIA +
                            item?.coverImage?.original
                          }
                          alt=""
                          className="blog-img"
                        />
                      </div>
                      <div class="blog-box-content">
                        <div class="bbc-head caps-text">
                          {item?.blogCategoryName}
                        </div>
                        <div class="bbc-body">
                          <h6
                            className="blog-h title-hover"
                            style={{ minHeight: "70px", maxHeight: "70px" }}
                          >
                            {dotDesc(
                              HTMLReactParser(removeTags(item.name)),
                              70
                            )}
                          </h6>
                          <p>
                            {" "}
                            {dotDesc(
                              HTMLReactParser(removeTags(item.description)),
                              150
                            )}
                          </p>
                        </div>
                      </div>
                      <div class="bbc-footer">
                        <div class="bbc-footer-inner">
                          <p>
                            {moment(item && item.createdAt).format(
                              "MMM DD, YYYY"
                            )}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  getBlog: (params, data, callback) =>
    dispatch(getBlog(params, data, callback)),
});

const mapStateToProps = (state) => ({
  regionDetails: regionListings(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Blog));
