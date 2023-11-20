export const getSlug = (Text) => {
  return Text?.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

export const removeTags = (str) => {
  if (str === null || str === "") {
    return false;
  } else str = str.toString();
  return str.replace(/(<([^>]+)>)/gi, "");
};
