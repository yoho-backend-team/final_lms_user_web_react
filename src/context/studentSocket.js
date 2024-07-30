import { Student } from "lib/constants";
import { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { checkUserLoggedIn } from "store/atoms/authorized-atom";

const SocketContext = createContext()

export function useStudentSocket(){
    return useContext(SocketContext)
}

export const StudentSocketProvider = ({children}) => {
    const [socket,setSocket] = useState(null)

    useEffect(() => {
      const isLoggedIn = checkUserLoggedIn(Student)
      const url = process.env.REACT_APP_URL
      if(isLoggedIn){
         const socketIO = io(url)
         setSocket(socketIO)

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