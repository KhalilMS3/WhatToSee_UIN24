import React from 'react';
import { useUser } from '../hooks/UserContext'; // Importer useUser-hooken
import { Link } from 'react-router-dom';
import { FaSmileWink, FaStar, FaHeart, FaSadTear } from "react-icons/fa";
import WishlistSearchResult from './WishlistSearchResult';
import FavoriteListSearchResult from './FavoriteListSearchResult';


export default function Home() {
  // Bruk useUser-hooken for å få tilgang til den globale tilstanden
const { loggedInUser } = useUser();

  // Sjekk om brukeren er logget inn ved å se etter brukerinformasjon
  // Hvis brukeren er logget inn, vis Dashboard-innholdet
if (loggedInUser) {
   return (
      <>
      <main>
         <h2>Hei, {loggedInUser} <FaSmileWink /></h2>
         <section className="friends-section">
            <h3>Se sammen med: </h3>
            {/* TODO: make a component that gets all users except the one logged in
                  Solution: compare users with the loggedInUser  */}
               <Link to={"/dashboard"}>Odai</Link>
         </section>
         <section className="movieLists-section">
               <section className="favorite-list">
                  <h4> <FaStar /> Filmer jeg skal se</h4>
                  <section className="movie-cards-section">
                     <FavoriteListSearchResult />
                  </section>
               </section>
               <span className='divider'></span>
               <section className="wish-list">
                  <h4> <FaHeart /> Ditt ønskeliste</h4>
                  <section className="movie-cards-section">
                     <WishlistSearchResult/>
                  </section>
               </section>
         </section>
      </main>
      </>
   );
} else {

    // Hvis brukeren ikke er logget inn, vis feilmelding
   return (
      <>
         <main>
            <section className='login-err-msg'>
               <h2 className='oops'>Ooops ! <FaSadTear /></h2>
               <p className='error-msg'>403 - Du kan ikke få tilgang til denne siden fordi du ikke er logget inn.</p>
               <Link to={"/"}>Logg inn</Link>
            </section>

      </main>
      </>
   );
}
}


