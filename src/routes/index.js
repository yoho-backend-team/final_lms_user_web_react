import { Routes, Route } from "react-router-dom";
import React from 'react'
import HomePage from "views/home-page";

const ApplicationRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
        </Routes>
    )
}

export default ApplicationRoutes
