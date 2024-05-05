import React from "react";

export default function Login({ setLogedIn, users }) {
    const handleLogin = (username) => {
        setLogedIn(username);
        localStorage.setItem("logedIn", username);
    };

    return (
        <>
            <h1>Velg bruker:</h1>
            <div className="user-buttons">
                {users.map((user) => {
                    return (
                        <button key={user.username} onClick={() => handleLogin(user.username)}>
                            {user.username}
                        </button>
                    );
                })}
            </div>
        </>
    );
}
