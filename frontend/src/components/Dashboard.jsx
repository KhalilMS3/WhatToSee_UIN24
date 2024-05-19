import React, { useEffect, useState } from 'react';
import { useUser } from '../hooks/UserContext'; // Importer useUser-hooken
import { Link } from 'react-router-dom';
import { FaSadTear } from "react-icons/fa";

import {SameFavoredMovies, SameWishlistedMovies} from './ComparedMovies';
import ComparedGenres from './ComparedGenres';
import FavoritesWishlistComparison from './FavoritesWishlistComparison';

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
            <SameWishlistedMovies />
            <span className='divider'></span>
            <SameFavoredMovies/>
          </section>
            <FavoritesWishlistComparison/>
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
