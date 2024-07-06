import Client from "../../../api/index";

export const fileUpload = async (data) => {
  try {
    const response = await Client.common.file.upload(data);
    return response?.data;
  } catch (error) {
    throw new error();
  }
};

export const getFile = async (url) => {
  try {
    const response = await Client.common.file.get(url);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};
