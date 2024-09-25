import { getErrorMessage } from "utils/common/error";
import Client from "../../../../api/index";

export const getAllCommunities = async (data) => {
  try {
    const response = await Client.Instructor.community.get(data);
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const getInstructorCommunityMessages = async (data) => {
  try {
    const response = await Client.Instructor.community.get_messages(data)
    return response?.data
  } catch (error) {
    const error_message = getErrorMessage(error)
    throw new Error(error_message)
  }
}
