export const handleHttpError = (error) => {
  if (error?.response) {
    return {
      message: error?.response?.data?.message,
      code: error?.response.status,
      detail: error?.response?.data?.errors,
    };
  }
  return {
    message: "",
    code: "",
    detail: "",
  };
};
