import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import { useUser } from '../hooks/UserContext'; 
import { fetchFavoredMovies, fetchWishListedMovies } from '../../sanity/services/movieServices';

export function FavoriteListFetchResult() {
  const { loggedInUser } = useUser()
  const [movies, setMovies] = useState([])

  const getFavoredMovies = async (loggedInUser) => {
    const data = await fetchFavoredMovies(loggedInUser)
    setMovies(data)
  }

  useEffect(() => {
    getFavoredMovies(loggedInUser)
  }, [loggedInUser])

  return (
  <section className="movie-cards-section">
      {
        movies?.map(movie => (
          movie?.favoredMovies?.map((favMovie, idx) => (
            < MovieCard
            key={idx}
            movietitle={favMovie.movietitle}
            poster={favMovie.poster}
            IMDBid={favMovie.IMDBid}
            genres={favMovie.genres}
            />
          ))
        ))
      
    }
    </section>
  )
}


export function WishlistFetchResult() {
  const { loggedInUser } = useUser()
  const [movies, setMovies] = useState([])

  const getWishlistedMovies = async(loggedInUser) => {
    const data = await fetchWishListedMovies(loggedInUser)
    setMovies(data)
  }
  useEffect(() => {
    getWishlistedMovies(loggedInUser)
  }, [loggedInUser])
  
  return (
    
    <section className="movie-card-section">
      {
        movies?.map(movie => (
          movie?.wishlistedMovies?.map((wlMovie, idx) => (
            
            <MovieCard
              key={idx}
              movietitle={wlMovie.movietitle}
              poster={wlMovie.poster}
              IMDBid={wlMovie.IMDBid}
              genres={wlMovie.genres}
            />
          ))
        ))
      }
    </section>
  )
}
