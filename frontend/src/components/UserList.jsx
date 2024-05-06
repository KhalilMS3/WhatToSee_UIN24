import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

export default function UserList({ user, handleLogIn }) {
  return (
    <>
      <h2>Hei, hvem ser på?</h2>
      <section className="users">
        {user?.map((item, idx) => {
          return (
            <Link to={"/dashboard"} key={idx} onClick={() => handleLogIn(item.username)}>
              <FaUser /> {item.username}
            </Link>
          );
        })}
      </section>
    </>
  );
}
