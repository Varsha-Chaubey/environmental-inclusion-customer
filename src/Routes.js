import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import IndexRegion from "./pages/region/index-region";
import RegionListing from "./pages/region/region-listing";
import RegionDetail from "./pages/region/region-detail";
// import BlogListing from "./pages/blog/blog-listing";
// import BlogDetail from "./pages/blog/blog-detail";
// import NewsListing from "./pages/news/news-listing";
// import NewsDetail from "./pages/news/news-detail";
import SpeciesListing from "./pages/species/species-listing";
import Organizations from "./pages/organizations/organizations";
import TermsAndCondition from "./pages/termsAndCondition";
import PrivacyPolicy from "./pages/privacyPolicy";
import ZooListing from "./pages/zoo/zooListing";
import WetMarket from "./pages/wetMarket/wetMarket";
import SpeciesDetail from "./pages/species/species-detail";
import DonorsListing from "./pages/species/donors-listing";
import ScienceAndEducationListing from "./pages/scienceAndEducation/scienceAndEducation-listing";
import ScienceAndEducation from "./pages/scienceAndEducation/scienceAndEducation-detail.jsx";
import EnvironmentalistList from "./pages/environmentalist/environmentalist-list";
import EnvironmentalistDetail from "./pages/environmentalist/environmentalist-detail";
import PageNotFound from "./components/error/pageNotFound";
import OrganizationDetail from "./pages/organizations/organization-detail";
import ProgramDetailPage from "./components/organizationDetail/programDetailPage";
import Login from "./components/user/login";
import UpdateProfile from "./components/user/update-profile.jsx";
import IndexFeed from "./pages/feed/feed.jsx";
import UserProfile from "./pages/feed/user-profile";
import EditUserProfile from "./pages/feed/edit-profile";
import AddPost from "./components/common/post/add-post";

// import WetMarketDetail from "./pages/wetMarket/wetMarket-detail";
// import ZooDetail from "./pages/zoo/zoo-detail";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <IndexRegion />
        </Route>
        <Route exact path="/regions">
          <RegionListing />
        </Route>
        <Route exact path={`/regions/:name`}>
          <RegionDetail />
        </Route>
        <Route exact path={`/regions/united-states/:name`}>
          <RegionDetail />
        </Route>
        {/* <Route exact path="/blog">
          <BlogListing />
        </Route>
        <Route exact path="/blog/:title">
          <BlogDetail />
        </Route> */}
        {/* <Route exact path="/news">
          <NewsListing />
        </Route>
        <Route exact path="/news/:title">
          <NewsDetail />
        </Route> */}
        <Route exact path="/endangered-species">
          <SpeciesListing />
        </Route>
        <Route exact path={`/endangered-species/:name`}>
          <SpeciesDetail />
        </Route>
        <Route exact path="/organizations">
          <Organizations />
        </Route>
        <Route exact path="/organizations/:name">
          <OrganizationDetail />
        </Route>
        <Route exact path="/zoos-and-wildlife-preserves">
          <ZooListing />
        </Route>
        {/* <Route exact path="/zoos-and-wildlife-preserves/:name">
          <ZooDetail />
        </Route> */}
        <Route exact path="/war-on-the-environment-threats">
          <WetMarket />
        </Route>
        {/* <Route exact path="/war-on-the-environment-threats/:name">
          <WetMarketDetail />
        </Route> */}
        <Route exact path="/terms-and-conditions">
          <TermsAndCondition />
        </Route>
        <Route exact path="/privacy-policy">
          <PrivacyPolicy />
        </Route>
        <Route exact path="/endangered-species/:name/donors-list">
          <DonorsListing />
        </Route>
        <Route exact path="/science-education">
          <ScienceAndEducationListing />
        </Route>
        <Route exact path="/science-education/:title">
          <ScienceAndEducation />
        </Route>
        <Route exact path="/environmentalists">
          <EnvironmentalistList />
        </Route>
        <Route exact path="/environmentalists/:name/">
          <EnvironmentalistDetail />
        </Route>
        <Route exact path="/organizations/:name/program">
          <ProgramDetailPage />
        </Route>
        <Route exact path="/signup">
          <UpdateProfile />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path ="/feed">
          <IndexFeed/>
        </Route>
        <Route exact path ="/view-profile">
          <UserProfile/>
        </Route>
        <Route exact path ="/edit-profile">
          <EditUserProfile/>
        </Route>
        <Route exact path ="/add-post">
          <AddPost/>
        </Route>
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
