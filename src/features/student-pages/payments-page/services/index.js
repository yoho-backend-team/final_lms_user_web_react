import Client from "../../../../api/index";

export const getStudentFees = async () => {
  try {
    const response = await Client.Student.payment.get();
    return response?.data;
  } catch (error) {
    return error;
  }
};
