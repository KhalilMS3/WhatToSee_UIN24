import React from 'react';
import { useUser } from '../hooks/UserContext'; // Importer useUser-hooken
import WishlistSearchResult from './WishlistSearchResult';
import FavoriteListSearchResult from './FavoriteListSearchResult';
import { Link } from 'react-router-dom';


export default function Dashboard() {
  // Bruk useUser-hooken for å få tilgang til den globale tilstanden
  const { loggedInUser } = useUser();

  // Sjekk om brukeren er logget inn ved å se etter brukerinformasjon
  // Hvis brukeren er logget inn, vis Dashboard-innholdet
  if (loggedInUser) {
    return (
      <>
        <main>
          <h2>Forslag for {loggedInUser} og bruker2</h2>
          {/* GENRE SECTION */}
          <section className="genre-section">
            <h3>Utforsk: </h3>
            <p>Sjekk hvilke filmer som er tilgjengelige innenfor sjangene du og "bruker2" begge liker.</p>
            {/* TODO: make a component that gets all users except the one logged in
                  Solution: compare users with the loggedInUser  */}
              <Link to={"/movies_based_on_genre"}>genre 1</Link>
              <Link to={"/movies_based_on_genre"}>genre 2</Link>
          </section>

          {/* LISTS of movies */}
          <section className="movieLists-section">
            {/*TODO: Movies rendered here will be based on a comparison between users wish lists (favortie list comparison)*/}
              <section className="catchUp-list">
                  <h4>Catch Up!</h4>
              <section className="movie-cards-section">
                {/* TODO: use another component for this fetch */}
                    <FavoriteListSearchResult /> {/* <- Used this component just to render movie cards */}
                  </section>
              </section>
            <span className='divider'></span>
            {/*TODO: Movies rendered here will be based on a comparison between users favorite lists */}
            
              <section className="GoSafe-list">
                  <h4>Go safe!</h4>
              <section className="movie-cards-section">
                {/* TODO: use another component for this type of fetch (favorite list comparison) */}
                    <WishlistSearchResult/> {/* <- Used this component just to render movie cards */}
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
          <p>Du kan ikke få tilgang til denne siden fordi du ikke er logget inn.</p>
        </main>
      </>
    );
  }
}

