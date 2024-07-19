import Client from "../../../../api/index";

export const getprofilewithId = async (data) => {
    try {
      const response = await Client.Student.profile.get(data);
      return response.data;
    } catch (error) {
      throw new Error(error?.message);
    }
  };

  export const UpdateprofilewithId = async (data) => {
    try {
      const response = await Client.Student.profile.update(data);
      return response.data;
    } catch (error) {
      throw new Error(error?.message);
    }
  };

  
  