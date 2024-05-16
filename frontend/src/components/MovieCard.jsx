import React from 'react'

export default function MovieCard({idx, movietitle, poster, IMDBid, genres}) {
  return (
    <>
     <article key={idx} className="movie-card">
        <img src={poster} alt={movietitle} />
        <a href={`https://www.imdb.com/title/${IMDBid}/`}>{movietitle}</a>
    </article>
    
    </>
  )
}
