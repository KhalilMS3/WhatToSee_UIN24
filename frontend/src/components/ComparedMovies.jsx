import React, { useEffect, useState }from 'react'
import { fetchMovieListsOfUsers } from '../../sanity/services/movieServices';
import { useUser } from '../hooks/UserContext';
import MovieCard from './MovieCard';

export  function SameFavoredMovies() {
   const { loggedInUser, friend } = useUser();
   
   const [loggedInUserFavMovies, setLoggedInUserFavMovies] = useState([]);
   const [friendFavMovies, setFriendFavMovies] = useState([]);
   const [sameMoviesComparison, setSameMoviesComparison] = useState([]);

   const getSameFavoredMovies = async (loggedInUser, friend) => {

   const data = await fetchMovieListsOfUsers(loggedInUser, friend)

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

export function SameWishlistedMovies() {
   const { loggedInUser, friend } = useUser();
   
   const [loggedInUserWLMovies, setLoggedInUserWLMovies] = useState([]);
   const [friendWLMovies, setFriendWLMovies] = useState([]);
   const [sameMoviesComparison, setSameMoviesComparison] = useState([]);

   const getSameWishlistedMovies = async (loggedInUser, friend) => {

   const data = await fetchMovieListsOfUsers(loggedInUser, friend)
   
   const loggedInUserWLMovies = data[loggedInUser][0]?.wishlistedMovies || []
   const friendWLMovies = data[friend][0]?.wishlistedMovies || []
      
   setLoggedInUserWLMovies(loggedInUserWLMovies)
   setFriendWLMovies(friendWLMovies)
      
   const SameMoviesComparison = loggedInUserWLMovies.filter(
      movie1 => friendWLMovies.some(movie2 => movie2.movietitle === movie1.movietitle))
   setSameMoviesComparison(SameMoviesComparison)
   }
      
   useEffect(() => {
      getSameWishlistedMovies(loggedInUser, friend)
   },[loggedInUser])

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
