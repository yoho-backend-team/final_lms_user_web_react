import axios from 'axios';

const Class_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}api/institutes/class/offline`;

export const getOnlineClass = async (data) => {
  try {
    const response = await axios.get(`${Class_API_END_POINT}/read-by-branch-id?page=${data?.page}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      params: data
    });

    console.log(response);

    // Check if the response status is successful
    if (response.data.status) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch TeachingStaffs. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllTeachingStaffs:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};