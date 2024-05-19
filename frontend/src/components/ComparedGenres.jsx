import React, { useState, useEffect } from 'react'
import { fetchSameGenres } from '../../sanity/services/genreServices'
import { useUser } from '../hooks/UserContext';
import { Link } from 'react-router-dom';

export default function ComparedGenres() {
   const { loggedInUser, friend} = useUser();
   
   const [loggedInUserFavGenres, setLoggedInUserFavGenres] = useState([])
   const [friendFavGenres, setFriendFavGenres] = useState([])
   const [sameGenresComparison, setSameGenresComparison] = useState([])

   const getSameGenres = async (loggedInUser, friend) => {
      
      const data = await fetchSameGenres(loggedInUser, friend)

      const loggedInUserFavGenres = data[loggedInUser][0]?.favoredGenres || []
      const friendFavGenres = data[friend][0]?.favoredGenres || []

      setLoggedInUserFavGenres(loggedInUserFavGenres)
      setFriendFavGenres(friendFavGenres)

      //sammen ligne sjangere som er tilfelles
      const sameGenresComparison = loggedInUserFavGenres.filter(genre =>
         friendFavGenres.includes(genre)
      );
      setSameGenresComparison(sameGenresComparison)
   
   }

   useEffect(() => {
      if (loggedInUser && friend) {
         
         getSameGenres(loggedInUser, friend)
      }
   }, [loggedInUser])

  return (
      <section className="genre-section">
            <h3>Utforsk: </h3>
            <p>Sjekk hvilke filmer som er tilgjengelige innenfor sjangrene du og {friend} begge liker.</p>
            
        {sameGenresComparison?.map((genre, idx) => (
              
               <Link key={idx} to={`/movies_based_on_genre?genre=${genre}`}>{genre}</Link>
            )
            )}
         </section>
  )
}
