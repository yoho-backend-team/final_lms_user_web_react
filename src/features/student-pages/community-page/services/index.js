import { getErrorMessage } from "utils/common/error";
import Client from "../../../../api/index";

export const getCommunities = async (data) => {
  try {
    const response = await Client.Student.community.get(data);
    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCommunityMessages = async (data) => {
   try {
    const response = await Client.Student.community.get_messages(data)
    return response?.data
   } catch (error) {
    const error_message = getErrorMessage(error)
     throw new Error(error_message)
   }
}
