import React from 'react'

import { FaUserCircle } from "react-icons/fa";
import { FaDisplay } from "react-icons/fa6";

export default function Header() {
  return (
     <>
        {/* 
            TODO:
            - add Link tag to li-items in order to navigate to chosen
               component
            - change <a> tag with Link tag for the logo to navigate it to the 
            home page component
        */}
      <header>
         <nav>
            <h1><a href='#'>What To See?</a></h1>
            <ul>
               <li className="menuItems"> <FaDisplay /> Hva skal jeg se?</li>
               <li className="menuItems">Bla gjennom sjangere</li>
               <li className="menuItems"> <FaUserCircle/> Bruker</li>
            </ul>
           </nav>

           {/* Dashbord component goes here after login */}

      </header>
   </>
  )
}

/*
   TODO:
   - in order to view meny items add a className when if the user is logged in or not
   if loggedIn -> add custom className to navbar lists (ul) 
   */