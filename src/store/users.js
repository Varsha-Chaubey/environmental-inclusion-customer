import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "user",
  initialState: {
    checkProfileCompletion: {},
    userData: {},
    userDropdownData: {},
    userPreferences: {},
    myFeeds: {},
    loading: false,
    profile: null,
    myPost: {}
  },
  reducers: {
    checkProfileCompletionRequested: (misc, action) => {
      misc.loading = true;
    },
    checkProfileCompletionReceived: (misc, action) => {
      misc.checkProfileCompletion = action.payload;
      misc.loading = false;
    },
    checkProfileCompletionFailed: (misc, action) => {
      misc.loading = false;
    },
    setProfile : (state, action)=>{
      state.profile= action.payload
    },
    userRequested: (misc, action) => {
      misc.loading = true;
    },
    userReceived: (misc, action) => {
      misc.userData = action.payload;
      misc.loading = false;
    },
    userFailed: (misc, action) => {
      misc.loading = false;
    },
    userPreferencesRequested: (misc, action) => {
      misc.loading = true;
    },
    userPreferencesReceived: (misc, action) => {
      misc.userPreferences = action.payload;
      misc.loading = false;
    },
    userPreferencesFailed: (misc, action) => {
      misc.loading = false;
    },
    userDropdownRequested: (misc, action) => {
      misc.loading = true;
    },
    userDropdownReceived: (misc, action) => {
      misc.userDropdownData = action.payload;
      misc.loading = false;
    },
    userDropdownFailed: (misc, action) => {
      misc.loading = false;
    },

    feedRequested: (misc, action) => {
      misc.loading = true;
    },
    feedReceived: (misc, action) => {
      misc.myFeeds = action.payload;
      misc.loading = false;
    },
    feedFailed: (misc, action) => {
      misc.loading = false;
    },

    postRequested: (misc, action) => {
      misc.loading = true;
    },
    postReceived: (misc, action) => {
      misc.myPost = action.payload;
      misc.loading = false;
    },
    postFailed: (misc, action) => {
      misc.loading = false;
    },
  },

});
 
export const {
  checkProfileCompletionRequested,
  checkProfileCompletionReceived,
  checkProfileCompletionFailed,
  setProfile,
  userRequested,
  userReceived,
  userFailed,
  userDropdownRequested,
  userDropdownReceived,
  userDropdownFailed,
  userPreferencesRequested,
  userPreferencesReceived,
  userPreferencesFailed,
  feedRequested,
  feedReceived,
  feedFailed,
  postRequested,
  postReceived,
  postFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators
const baseUrl = "user";


// for step 1
export const sendOtpForSignup = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/sendOtpForSignup`,
      method: "POST",
      callback,
      data,
    })
  );
};

//   for step 2
export const verifyOtpAndSignup = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/verifyOtpAndSignup`,
      method: "POST",
      callback,
      data,
    })
  );
};

// step 3
export const updateYourProfile = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/profile`,
      method: "PUT",
      callback,
      data,
    })
  );
};

// step 4
export const getCheckProfileCompletion = (callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/profile/profileCompletion`,
      method: "get",
      callback,
      onStart: checkProfileCompletionRequested.type,
      onSuccess: checkProfileCompletionReceived.type,
      onError: checkProfileCompletionFailed.type,
    })
  );
};

export const userLogin = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `auth/${baseUrl}/login`,
      method: "POST",
      callback,
      data,
    })
  );
};

export const userRefreshToken = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `auth/${baseUrl}/refreshToken`,
      method: "POST",
      callback,
      data,
    })
  );
};


export const userLogout = ( callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `auth/${baseUrl}/logout`,
      method: "POST",
      callback,
      
    })
  );
};

export const userForgotPassword = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `auth/${baseUrl}/forgotPassword`,
      method: "POST",
      callback,
      data,
    })
  );
};
export const followUnfollowFriends = (data, callback)=> (dispatch)=>{
  return dispatch (
    apiCallBegan({
      url: `${baseUrl}/following/${data}`,
      method:"POST",
      callback,
    })
  )
}

export const followUnfollowMultipleFriends = (data, callback)=> (dispatch)=>{
  return dispatch (
    apiCallBegan({
      url: `${baseUrl}/following/`,
      method:"POST",
      data,
      callback,
    })
  )
}

export const getUsersData = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `/user`,
      method: "get",
      params,
      callback,
      onStart: userRequested.type,
      onSuccess: userReceived.type,
      onError: userFailed.type,
    })
  );
};

export const getUsersDropdownData = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `/user/dropdown`,
      method: "get",
      params,
      callback,
      onStart: userDropdownRequested.type,
      onSuccess: userDropdownReceived.type,
      onError: userDropdownFailed.type,
    })
  );
};


export const getUsersPreferences = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/profile/preference/${params}`,
      method: "get",
      callback,
      onStart: userPreferencesRequested.type,
      onSuccess: userPreferencesReceived.type,
      onError: userPreferencesFailed.type,
    })
  );
};


export const getMyFeedData = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `/user/profile/feeds`,
      method: "get",
      params,
      callback,
      onStart: feedRequested.type,
      onSuccess: feedReceived.type,
      onError: feedFailed.type,
    })
  );
};

export const getMyPostData = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `/post`,
      method: "get",
      params,
      callback,
      onStart: postRequested.type,
      onSuccess: postReceived.type,
      onError: postFailed.type,
    })
  );
};

export const updateMyPost = (params, data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `/post${params}`,
      method: "PUT",
      callback,
      data,
    })
  );
};
export const deleteMyPost = (params, callback)=> (dispatch)=>{
  return dispatch (
    apiCallBegan({
      url: `/post/${params}`,
      method:"Delete",
      callback,
    })
  )
}

export const getUser = createSelector(
  (state) => state.entities.user,
  (user) => user
);
