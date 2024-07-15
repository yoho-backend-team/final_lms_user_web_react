import Client from "../../../../api/index";

export const getCommunities = async (data) => {
  try {
    const response = await Client.Student.community.get(data);
    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};
