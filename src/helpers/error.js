export const handleHttpError = (error) => {
  if (error?.response) {
    const errors = error?.response?.data?.errors;
    const messageDetail = Object.keys(errors)
      .map((x) => errors[x])
      .join("\n");
    const detail = {
      message: error?.response?.data?.message,
      code: error?.response.status,
      detail: error?.response?.data?.errors,
      messageDetail,
    };
    return detail;
  }
  return {
    message: "",
    code: "",
    detail: "",
  };
};
