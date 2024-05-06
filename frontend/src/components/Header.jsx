import React from 'react'

import { FaUserCircle } from "react-icons/fa";
import { FaDisplay } from "react-icons/fa6";

export default function Nav() {
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
            <a href='#'>What To See?</a>
            <ul>
               <li className="menuItems"> <FaDisplay /> Hva skal jeg se?</li>
               <li className="menuItems">Bla gjennom sjangere</li>
               <li className="menuItems"> <FaUserCircle/> Bruker</li>
            </ul>
         </nav>
      </header>
   </>
  )
}
