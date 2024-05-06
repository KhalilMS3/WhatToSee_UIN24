import React from 'react';
import { useUser } from '../hooks/UserContext'; // Importer useUser-hooken
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { FaDisplay } from "react-icons/fa6";

export default function Header() {
   const { loggedIn, loggedInUser, setLoggedIn, setLoggedInUser } = useUser(); // Bruk hooken for å få tilgang til den globale tilstanden

   const navigate = useNavigate();

   const handleLogOut = () => {
      localStorage.removeItem('loggedInUser');
      setLoggedInUser(null);
      setLoggedIn(false);
      navigate("/");
   };

   return (
      <header>
         <nav>
            <h1>
               <Link to={"/"}>
                  What To See?
               </Link>
            </h1>

            {loggedIn && (
               <ul>
                  <li className="menuItems">
                     <Link to={"/watch"}>
                        <FaDisplay /> Hva skal jeg se?
                     </Link>
                  </li>
                  <li className="menuItems">
                     <Link to={"/genre"}>
                        Bla gjennom sjangere
                     </Link>
                  </li>
                  <li className="menuItems">
                     <FaUserCircle /> {loggedInUser} <button onClick={handleLogOut}>Logg ut</button>
                  </li>
               </ul>
            )}
         </nav>
      </header>
   );
}
