import React, { useEffect, useState } from 'react'

export default function Genre() {
    const [genres, setGenres] = useState([])
    
const getGenre = async()=>{

    const url = 'https://moviesdatabase.p.rapidapi.com/titles/utils/genres';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd2ca980ddcmsh43b9d3e642be0a8p1d08c1jsne846de12bbc5',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        setGenres(data.results)
    } catch (error) {
        console.error(error);
    }
    }
    useEffect(() => {
        getGenre()
    }, [])
    
    console.log("Genre", genres)
    return (
        <section>
            <ul>

            {genres?.map((item, idx) => {
              return item !== null ?  <li key={idx}>{item}</li> : null
            })}
            </ul>
        </section>
    )
}