import React from "react";
import { Link } from "react-router-dom"
import { FaUser } from "react-icons/fa";

export default function Login() {
    // const handleLogin = (username) => {
    //     setLogedIn(username);
    //     localStorage.setItem("logedIn", username);
    // };
    const users = [
    {
        username: "Khalil"
    },
    {
        username: "Odai"
    }   
    ]
    return (
        <>
            <h2>Hei, hvem ser på?</h2>
            <section className="users">
                {users?.map(user => {
                    return (
                        <Link key={user.username} >
                            <FaUser /> {user.username}
                        </Link>
                    );
                })}
            </section>
        </>
    );
}
