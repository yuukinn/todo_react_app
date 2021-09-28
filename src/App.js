import React from "react";
import {  AuthProvider } from "./providers/Auth.Provider";
import './App.css';
import './service/firebase'
import Header from "./compornent/Header";
import Footer from "./compornent/Footer";
import DashBoard from "./compornent/Dashboard";

function App() {
    return (
        <AuthProvider>
            <Header/>
            <DashBoard/>
            <Footer/>
        </AuthProvider>
    )
}

export default App
