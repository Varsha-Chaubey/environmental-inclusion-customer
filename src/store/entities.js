import { combineReducers } from "redux";
import regionReducer from "./region";
import speciesReducer from "./species";
import blogReducer from "./blog";
import miscReducer from "./misc";
import organizationReducer from "./organization";
import newsReducer from "./news";
import zooReducer from "./zoo";
import sideBarApisReducer from "./sidebarApis";
import wetMarketReducer from "./wetMarket";
import scienceAndEducationReducer from "./scienceAndEducation";
import environmentalistReducer from "./environmentalist";
import userReducer from "./users";

export default combineReducers({
  user: userReducer,
  region: regionReducer,
  species: speciesReducer,
  blogs: blogReducer,
  misc: miscReducer,
  organization: organizationReducer,
  news: newsReducer,
  zoo: zooReducer,
  wetMarket: wetMarketReducer,
  sideBarApis: sideBarApisReducer,
  scienceAndEducation: scienceAndEducationReducer,
  environmentalist: environmentalistReducer,
});
