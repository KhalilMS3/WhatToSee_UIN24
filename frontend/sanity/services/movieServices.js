import { client } from "../client";

export async function fetchFavoredMovies(loggedInUser) {

   try {
      const data = await client.fetch(
      `*[_type == "users" && username == $loggedInUser]{
         "favoredMovies": favoredMovies[]->{
         "movietitle": movietitle,
         "poster": poster,
         "IMDBid": IMDBid,
         "genres": genres[].genre
}
}`,{loggedInUser});
      return data
   } catch(error) {
      console.error("Error fetching favored films")
   }
}

export async function fetchWishListedMovies(loggedInUser) {
  try {
    const data = await client.fetch(
      `*[_type == "users" && username == $loggedInUser]{
         "wishlistedMovies": wishlistedMovies[]->{
         "movietitle": movietitle,
         "poster": poster,
         "IMDBid": IMDBid,
         "genres": genres[].genre
}
}`,
      { loggedInUser }
    );
    return data;
  } catch (error) {
    console.error("Error fetching favored films");
  }
}
