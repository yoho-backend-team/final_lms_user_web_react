import Client from "../../../../api/index";

export const StudentCreateTickets = async (data) => {
  try {
    const response = await Client.Student.ticket.create(data);
    return response?.data;
  } catch (error) {
    throw new Error(error?.message);
  }
};

export const StudentgetTickets = async (query) => {
  try {
    const response = await Client.Student.ticket.get(query);
    return response?.data;
  } catch (error) {
    throw new Error(error?.message);
  }
};
