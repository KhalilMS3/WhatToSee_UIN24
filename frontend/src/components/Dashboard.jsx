import React, { useEffect, useState } from 'react';
import { useUser } from '../hooks/UserContext';
import React, { useEffect, useState } from 'react';
import { useUser } from '../hooks/UserContext'; // Importer useUser-hooken
import { Link } from 'react-router-dom';
import { FaSadTear } from "react-icons/fa";
import { writeClient } from '../../sanity/client';
import {FavoriteListSearchResult, WishlistSearchResult} from './MoviesSearchResult';

import MovieCard from './MovieCard';
import SameFavoredMovies from './ComparedMovies';

export default function Dashboard() {
  const { loggedInUser, userId } = useUser();
  const [commonGenres, setCommonGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchCommonGenres();
    }
  }, [userId]);

  const fetchCommonGenres = async () => {
    setLoading(true);
    try {
      const userDoc = await writeClient.fetch(`*[_type == "users" && _id == $userId]{favoredGenres}`, { userId });
      const otherUserDoc = await writeClient.fetch(`*[_type == "users" && _id == "e5396d55-0493-4ab5-ad9f-04fb421b382d"]{favoredGenres}`);

      if (userDoc.length > 0 && otherUserDoc.length > 0) {
        const userGenres = new Set(userDoc[0].favoredGenres || []);
        const otherUserGenres = new Set(otherUserDoc[0].favoredGenres || []);

        const common = [...userGenres].filter(genre => otherUserGenres.has(genre));
        setCommonGenres(common);
      } else {
        setCommonGenres([]);
      }

      setError(null);
    } catch (error) {
      console.error('Failed to fetch common genres:', error);
      setError('Failed to fetch common genres');
    } finally {
      setLoading(false);
    }
  };

  if (loggedInUser) {
    return (
      <>
        <main>
          <h2>Forslag for {loggedInUser} og {friend} </h2>
          {/* GENRE SECTION */}
          <section className="genre-section">
            <h3>Utforsk: </h3>
            <p>Sjekk hvilke filmer som er tilgjengelige innenfor sjangrene du og "bruker2" begge liker.</p>
            {loading ? (
              <p>Laster...</p>
            ) : error ? (
              <p>{error}</p>
            ) : commonGenres.length > 0 ? (
              commonGenres.map((genre, idx) => (
                <Link key={idx} to={`/movies_based_on_genre?genre=${genre}`}>{genre}</Link>
              ))
            ) : (
              <p>Ingen felles sjangere funnet</p>
            )}
          </section>

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
