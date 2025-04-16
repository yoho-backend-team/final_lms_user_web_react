import Client from '../../../../api/index'

export const getAttendence = async (data) => {
  try {

    const response = await Client.Student.attendance.get(data);
    if (response) return response.data;
  } catch (error) {
    console.log(error.message);
    // throw new Error(error?.message);
  }
};
