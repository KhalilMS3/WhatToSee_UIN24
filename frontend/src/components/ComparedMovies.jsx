import React, { useEffect, useState }from 'react'
import { fetchSameFavoredMovies } from '../../sanity/services/movieServices';
import { useUser } from '../hooks/UserContext';
import MovieCard from './MovieCard';

export default function SameFavoredMovies() {
   const { loggedInUser, friend} = useUser();
   const [loggedInUserFavMovies, setLoggedInUserFavMovies] = useState([]);
   const [friendFavMovies, setFriendFavMovies] = useState([]);
   const [sameMoviesComparison, setSameMoviesComparison] = useState([]);

   const getSameFavoredMovies = async (loggedInUser, friend) => {

   const data = await fetchSameFavoredMovies(loggedInUser, friend)

   const loggedInUserFavMovies = data[loggedInUser][0]?.favoredMovies || []
   const friendFavMovies = data[friend][0]?.favoredMovies || []
   
   setLoggedInUserFavMovies(loggedInUserFavMovies)
   setFriendFavMovies(friendFavMovies)
   
   const sameMoviesComparison = loggedInUserFavMovies.filter(
      movie1 => friendFavMovies.some(movie2 => movie2.movietitle === movie1.movietitle))
   
   setSameMoviesComparison(sameMoviesComparison)
   }
   
   
   useEffect(() => {
      getSameFavoredMovies(loggedInUser, friend)
   }, [loggedInUser])
   
   console.log(sameMoviesComparison)

   return (
      <section className="movie-cards-section">
         
      {
         sameMoviesComparison?.map((movie, idx) => (
            < MovieCard
            key={idx}
            movietitle={movie.movietitle}
            poster={movie.poster}
            IMDBid={movie.IMDBid}
            genres={movie.genres}
            />
         ))
}
      </section>
  )
}

import React from 'react'

export default function SameWishlistedMovies() {
  return (
   <h1>2</h1>
  )
}

