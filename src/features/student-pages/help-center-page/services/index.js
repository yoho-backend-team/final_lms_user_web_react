import Client from "../../../../api/index";

export const getFaqCategories = async (data) => {
  try {
    const response = await Client.Student.faq.get(data);
    return response?.data;
  } catch (error) {
    return error?.message;
  }
};