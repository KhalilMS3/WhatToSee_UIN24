import React from "react";
import Header from "./Header";

export default function Layout({ logedIn, setLogedIn }) {
    const handleLogout = () => {
        localStorage.removeItem("logedIn");
        setLogedIn(null);
    };

    return (
        <>
            <Header/>
                <div>
                    {logedIn ? (
                        <>
                            <span>{logedIn}</span>
                            <button onClick={handleLogout}>Logg ut</button>
                        </>
                    ) : null}
                </div>
            
        </>
    );
}
