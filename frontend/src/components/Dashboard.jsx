import React from 'react';
import { useUser } from '../hooks/UserContext'; // Importer useUser-hooken

function Dashboard() {
  // Bruk useUser-hooken for å få tilgang til den globale tilstanden
  const { loggedInUser } = useUser();

  // Sjekk om brukeren er logget inn ved å se etter brukerinformasjon
  // Hvis brukeren er logget inn, vis Dashboard-innholdet
  if (loggedInUser) {
    return (
      <>
        <div>Dashboard</div>
      </>
    );
  } else {
    // Hvis brukeren ikke er logget inn, vis feilmelding
    return (
      <>
        <div>Du kan ikke få tilgang til denne siden fordi du ikke er logget inn.</div>
      </>
    );
  }
}

export default Dashboard;
