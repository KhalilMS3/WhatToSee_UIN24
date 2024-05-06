import React from 'react';
import { useUser } from '../hooks/UserContext'; // Importer useUser-hooken
import { FaSmileWink } from "react-icons/fa";

function Dashboard() {
  // Bruk useUser-hooken for å få tilgang til den globale tilstanden
  const { loggedInUser } = useUser();

  // Sjekk om brukeren er logget inn ved å se etter brukerinformasjon
  // Hvis brukeren er logget inn, vis Dashboard-innholdet
  if (loggedInUser) {
    return (
      <>
        <h2>Hei, {loggedInUser} <FaSmileWink /> </h2>
      </>
    );
  } else {
    // Hvis brukeren ikke er logget inn, vis feilmelding
    return (
      <>
        <h2>Du kan ikke få tilgang til denne siden fordi du ikke er logget inn.</h2>
      </>
    );
  }
}

export default Dashboard;
