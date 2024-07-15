import Client from "../../../../api/index";

export const getCourseDetails = async (data) => {
  try {
    const response = await Client.Student.course.get(data);
    return response?.data;
  } catch (error) {
    return error?.message;
  }
};

// export const getClassDetails = async (data) => {
//   try {
//     const response = await Client.Student.course.getwithClass(data);
//     return response?.data;
//   } catch (error) {
//     return error?.message;
//   }
// };
