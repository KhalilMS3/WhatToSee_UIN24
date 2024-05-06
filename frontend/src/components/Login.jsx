import UserList from '../components/UserList';
import React from 'react';
import { useUser } from '../hooks/UserContext'; // Importer useUser-hooken

export default function Login() {
  const { loggedIn, setLoggedInUser, user, setLoggedIn } = useUser();

  const handleLogIn = (username) => {
    localStorage.setItem('loggedInUser', username);
    setLoggedInUser(username);
    setLoggedIn(true);
  };

  return (
    <>
        <UserList user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} handleLogIn={handleLogIn} />
    </>
  );
}
