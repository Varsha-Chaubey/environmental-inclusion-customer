export const setToken = (refresh, auth) => {
  if (refresh) localStorage.setItem("x-refresh-token", refresh);
  localStorage.setItem("x-auth-token", auth);
};

export const getToken = (type) => {
  if (type === "refresh") return localStorage.getItem("x-refresh-token");
  if (type === "auth") return localStorage.getItem("x-auth-token");
  return false;
};

export const clearAllToken = () => {
  localStorage.removeItem("x-refresh-token");
  localStorage.removeItem("x-auth-token");
  localStorage.removeItem("data");
};

export const setProfile = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
};
export const getProfile = () => {
  if (localStorage.getItem("data")) {
    return JSON.parse(localStorage.getItem("data"));
  } else {
    clearAllToken();
    setRedirectUrl(window.location.href);
    window.location.href = "/login";
  }
};

export const setRedirectUrl = (data) => {
  localStorage.setItem("redirectUrl", data);
};

export const getRedirectUrl = () => {
  return localStorage.getItem("redirectUrl");
};

export const checkToken = () => {
  const token = localStorage.getItem("x-auth-token");
  if (token) {
    return true;
  } else {
    return false;
  }
};

// Function to clear user session and perform logout
export const logout = () => {
  // Clear user data from local storage
  localStorage.removeItem("data");
  localStorage.removeItem("x-auth-token");
  localStorage.removeItem("x-refresh-token");

  // Redirect to the logout URL
  const logoutUrl = getLogoutUrl();
  window.location.href = logoutUrl;
};

export const getLogoutUrl = () => {
  // logout URL
  return "/login";
};

export const removeKey = (keyName) => {
  localStorage.removeItem(keyName);
};
