import React from "react";
import { connect } from "react-redux";
import {
  getEnvironmentalist,
  getBlog,
  speciesListings,
} from "../../store/species";
import noRecord from "../../include/images/nrb-img.svg";
import { useState } from "react";
import ListBlogsOnRegion from "../common/listingCard/listBlogsOnRegion";
import PeopleListCard from "../common/listingCard/peopleListCard";

const People = (props) => {
  const [loading, setLoadingDetail] = useState();
  const peopleDetails =
    props.speciesListings &&
    props.speciesListings.environmentalist &&
    props.speciesListings.environmentalist.data;

  const blog =
    props.speciesListings &&
    props.speciesListings.blog &&
    props.speciesListings.blog.data;

  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="tbc-body-inner">
              {peopleDetails && peopleDetails?.length === 0 && (
                <ul class="ei-grid-list d-flex flex-wrap justify-content-center">
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

              <div class="ei-heading d-flex flex-wrap justify-content-between align-items-center">
                <h4>Biologists</h4>{" "}
                {/* <a href="#!" class="btn btn-default">
                  Join
                </a> */}
              </div>
              <ul class="ei-grid-list d-flex flex-wrap ei-grid-5">
                {loading
                  ? [1, 2, 3, 4, 5].map((item) => (
                      <PeopleListCard
                        img={item?.coverImage?.original}
                        name={item.name}
                        page={"species-people-card"}
                        id={item._id}
                        loading={loading}
                      />
                    ))
                  : peopleDetails &&
                    peopleDetails.length > 0 &&
                    peopleDetails.map(
                      (item, idx) =>
                        idx < 5 && (
                          <PeopleListCard
                            img={item?.coverImage?.original}
                            name={item.name}
                            page={"species-people-card"}
                            id={item._id}
                            loading={loading}
                          />
                        )
                    )}
                
              </ul>
              {/* {blog && blog.length > 0 && (
                <>
                  <div class="ei-heading d-flex flex-wrap justify-content-between align-items-center">
                    <h4>Blogs</h4>{" "}
                    <a href="#!" class="btn btn-default">
                      Join
                    </a> 
                  </div>
                   <ul class="blog-list d-flex flex-wrap">
                    {loading
                      ? [1, 2, 3].map((item) => (
                          <ListBlogsOnRegion
                            img={item?.coverImage?.original}
                            name={item.name}
                            description={item?.description}
                            page={"blog-listing-page-species"}
                            id={item._id}
                            createdAt={item?.createdAt}
                            loading={loading}
                            blogCategoryName={item?.blogCategoryName}
                          />
                        ))
                      : blog &&
                        blog.length > 0 &&
                        blog.map(
                          (item, idx) =>
                            idx < 3 && (
                              <ListBlogsOnRegion
                                img={item?.coverImage?.original}
                                name={item.name}
                                createdAt={item?.createdAt}
                                description={item?.description}
                                page={"blog-listing-page-species"}
                                id={item._id}
                                blogCategoryName={item?.blogCategoryName}
                              />
                            )
                        )}
                  </ul> 
                </>
              )} */}
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getEnvironmentalist: (params, callback) =>
    dispatch(getEnvironmentalist(params, callback)),
  getBlog: (params, callback) => dispatch(getBlog(params, callback)),
});

const mapStateToProps = (state) => ({
  speciesListings: speciesListings(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(People));
