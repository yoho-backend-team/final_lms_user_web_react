import Client from "../../../../api/index"

export const getStaffSalaries = async () => {
    try {
    const response = await Client.Instructor.payment.get()
    return response?.data    
    } catch (error) {
     return error   
    }
}