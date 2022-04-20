export const handleHttpError = (error) => {
  if (error?.response) {
    return {
      message: error?.response?.data?.message,
      code: error?.response.status,
      detail: "",
    };
  }
};
