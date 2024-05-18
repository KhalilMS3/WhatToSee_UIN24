import React, { useEffect, useState } from 'react';
import { useUser } from '../hooks/UserContext'; // Importer useUser-hooken
import { Link } from 'react-router-dom';
import { FaSadTear } from "react-icons/fa";

import SameFavoredMovies from './ComparedMovies';
import ComparedGenres from './ComparedGenres';

export default function Dashboard() {
  const { loggedInUser, friend } = useUser();
  
  if (loggedInUser) {
    return (
      <>
        <main>
          <h2>Forslag for {loggedInUser} og {friend} </h2>
          {/* GENRE SECTION */}
          <ComparedGenres />

          {/* LISTS of movies */}
          <section className="movieLists-section">
            {/*TODO: Movies rendered here will be based on a comparison between users wish lists (favortie list comparison)*/}
              <section className="catchUp-list">
                  <h4>Catch Up!</h4>
                <SameFavoredMovies />
              </section>
            <span className='divider'></span>
            {/*TODO: Movies rendered here will be based on a comparison between users favorite lists */}
            
              <section className="GoSafe-list">
                  <h4>Go safe!</h4>
                  <SameFavoredMovies/>
              </section>
        </section>
        </main>
      </>
    );
  } else {
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
