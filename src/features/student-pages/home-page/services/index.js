import Client from "../../../../api/index"



export const getReports = async (data) => {
    try {
    const response = await Client.Student.reports.get(data)
    return response?.data  
    } catch (error) {
     throw new Error(error?.response?.data?.message)   
    }
}