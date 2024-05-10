import React, { useEffect } from 'react'

export default function Genre() {

const getGenre = async()=>{

    const url = 'https://moviesdatabase.p.rapidapi.com/titles/utils/genres?limit=10';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd2ca980ddcmsh43b9d3e642be0a8p1d08c1jsne846de12bbc5',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}
useEffect(()=>{getGenre()},[])
    return (
        <div>genre</div>
    )
}
