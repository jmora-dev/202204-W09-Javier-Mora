export const getUrlParams = (): URLSearchParams => {
  return new URLSearchParams(window.location.search);
};
