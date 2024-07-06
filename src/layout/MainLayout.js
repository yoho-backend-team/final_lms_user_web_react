import NavBar from "features/common/Navbar";
import Footer from "features/common/footer/footer";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="App">
      <header className="header">
        <NavBar />
      </header>
      <main className="main" style={{ overflow: "auto" }}>
        <Outlet />
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
