import { instructorDetails, isAuthenticatedInstructor } from "lib/constants";
import { useState, useEffect, createContext, useContext } from "react";
import { io } from "socket.io-client";
import { checkUserLoggedIn } from "store/atoms/authorized-atom";

const SocketContext = createContext()

export function useSocket(){
    return useContext(SocketContext)
} 

export const InstructorSocketProvider = ({children}) => {
    const [socket,setSocket] = useState(null)

    useEffect(() => {
     const isLoggedIn = checkUserLoggedIn(isAuthenticatedInstructor)
     const url = process.env.REACT_APP_URL
     if(isLoggedIn){

       const socketIO = io(url)
       setSocket(socketIO)
   
       return () => {
           socketIO.disconnect()
       }
      }
    },[])

    return(
        <SocketContext.Provider value={socket} >
          {children}
        </SocketContext.Provider>
    )
}