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
}`,{ loggedInUser });
    return data

  } catch (error) {
    console.error("Error fetching favored movies");
  }
}

// Use this in "Go Safe!" section i dashboard

export async function fetchSameFavoredMovies(loggedInUser, friend) {
  try {
    const data = await client.fetch(
      // fetching the favored lists of both users in order to compare them and find same movies
      `{
  $loggedInUser: *[_type == "users" && username == $loggedInUser]{
    "favoredMovies": favoredMovies[]->{
      "movietitle": movietitle,
      "poster": poster,
      "IMDBid": IMDBid
    }
  },
  $friend: *[_type == "users" && username == $friend]{
    "favoredMovies": favoredMovies[]->{
      "movietitle": movietitle,
      "poster": poster,
      "IMDBid": IMDBid
    }
  }
}`,{loggedInUser, friend});
    return data
  } catch (error) {
    console.error("Error fetching same favored movies");
  }
}

