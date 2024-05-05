import React, { useState } from "react";
import { BrowserRouter as Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";

function App() {
    const [logedIn, setLogedIn] = useState(localStorage.getItem("logedIn"));

    const users = [
        { username: "Odai" },
        { username: "Khalil" },
    ];

    console.log("Users:", users); 

    return (
            <Layout logedIn={logedIn} setLogedIn={setLogedIn} users={users}>
                <Routes>
                    <Route path="/">
                        <Login users={users} setLogedIn={setLogedIn} />
                    </Route>
                </Routes>
            </Layout>
        
    );
}

export default App;
