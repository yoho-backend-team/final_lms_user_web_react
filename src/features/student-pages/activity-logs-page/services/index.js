import Client from "../../../../api/index";

export const getAllStudentActivity = async (data) => {
  try {
    const response = await Client.Student.activity.get(data);
    return response.data;
  } catch (error) {
    throw new Error(error?.message);
  }
};