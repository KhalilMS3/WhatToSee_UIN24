import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { FaUser } from "react-icons/fa";
import { fetchAllUsers } from "../../sanity/services/userServices";

export default function Login() {

    const [user, setUser] = useState(null)

    const getAllUsers = async () => {
        const data = await fetchAllUsers()
        setUser(data)
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    console.log(user)
    return (
        <>
            <h2>Hei, hvem ser på?</h2>
            <section className="users">
                {user?.map((item, idx) => {
                    return (
                        <Link key={idx} >
                            <FaUser /> {item.username}
                        </Link>
                    );
                })}
            </section>
        </>
    );
}
