export const getParamUrl = (key) => {
  try {
    const url = window.location.href;
    const objectUrl = new URL(url);
    return objectUrl.searchParams.get(key);
  }catch (err){}
  return '';
};
