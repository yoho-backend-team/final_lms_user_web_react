import Client from "../../../../api/index";

export const getAllClasses = async (data) => {
  try {
    const response = await Client.Student.class.get(data);
    return response.data;
  } catch (error) {
    throw new Error(error?.message);
  }
};

export const getClassDetails = async (data) => {
  try {
    const response = await Client.Student.class.getWithId(data);
    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateClassDetails = async (data) => {
  try {
    const response = await Client.Student.class.update(data);
    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getClassAttendanceDetails = async (data) => {
  try {
    const response =
      await Client.Student.attendance.get_class_attendance(data);
    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateAttendanceDetails = async (data) => {
  try {
    const response = await Client.Student.attendance.update(data);
    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};
