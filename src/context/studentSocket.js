import { isAuthenticatedStudent, Student } from "lib/constants";
import { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { checkUserLoggedIn, getStudentDetails } from "store/atoms/authorized-atom";

const SocketContext = createContext()

export function useStudentSocket(){
    return useContext(SocketContext)
}

export const StudentSocketProvider = ({children}) => {
    const [socket,setSocket] = useState(null)
    const user = getStudentDetails()
    useEffect(() => {
      const isLoggedIn = checkUserLoggedIn(isAuthenticatedStudent)
      const url = process.env.REACT_APP_URL
      if(isLoggedIn){
         const socketIO = io(url)
         setSocket(socketIO)

         
         socketIO.emit("registeronline",{userId:user?._id})

         return(
            () => socketIO.disconnect()
         )
      }
    },[])

    return(
        <SocketContext.Provider value={socket} >
            {children}
        </SocketContext.Provider>
    )
}