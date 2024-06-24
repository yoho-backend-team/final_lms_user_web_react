import React from "react";
import { Outlet } from "react-router-dom";
import InstructorFooter from "features/common/footer/instructorFooter";
import InstructorNavBar from "features/common/Navbar/InstructorNavBar";


const InstructorLayout = () => {
    return(
      <div className="App" >
        <header className="header" >
          <InstructorNavBar />
        </header>
        <main className="main" style={{ overflow: "auto"}} >
          <Outlet />
        </main>
        <footer className="footer" >
          <InstructorFooter />
        </footer>
      </div>
    )
}

export default InstructorLayout