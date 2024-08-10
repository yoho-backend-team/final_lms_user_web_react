import Client from "../../../../../api/index";

export const getCourseDetails = async (data) => {
  try {
    const response = await Client.Instructor.course.get(data);
    return response?.data;
  } catch (error) {
    return error?.message;
  }
};
