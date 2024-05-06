import React from 'react'
import Header from './Header'
import Login from './Login'
import { useState, useEffect } from 'react'
import { fetchAllUsers } from "../../sanity/services/userServices";

export default function Layout() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

    const getAllUsers = async () => {
        const data = await fetchAllUsers()
        setUser(data)
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    return (
      <>
        {/* IF NOT logged in -> render Login component 
            ELSE logged in -> render Header component*/}
        {
          loggedIn == false
            ?
            <Login user={user} setUser={setUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            :
            <Header/>
        }
      </>
  )
}
