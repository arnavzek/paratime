const getLocationQuery = () => {
  return new URLSearchParams(window.location.search);
};

export default getLocationQuery;
