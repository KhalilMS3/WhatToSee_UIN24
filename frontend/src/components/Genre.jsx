import React, { useEffect, useState } from 'react';

export default function Genre() {
    const [genres, setGenres] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getGenre = async () => {
        const url = 'https://moviesdatabase.p.rapidapi.com/titles/utils/genres';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'd2ca980ddcmsh43b9d3e642be0a8p1d08c1jsne846de12bbc5',
                'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
            }
        };

        setLoading(true);
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            const genresWithFavorites = data.results.map(genre => ({
                name: genre,
                isFavorite: false
            }));
            setGenres(genresWithFavorites);
            setError(null);
        } catch (error) {
            console.error(error);
            setError('Failed to fetch genres');
        }
        setLoading(false);
    };

    const toggleFavorite = genreName => {
        const updatedGenres = genres.map(genre => {
            if (genre.name === genreName) {
                return { ...genre, isFavorite: !genre.isFavorite };
            }
            return genre;
        });
        setGenres(updatedGenres);
    };

    useEffect(() => {
        getGenre();
    }, []);

    return (
        <section>
            {loading ? <p>Loading genres...</p> : error ? <p>Error: {error}</p> :
            <ul>
                {genres.map((genre, idx) => (
                    genre.name !== null ? (
                        <li key={idx}>
                            {genre.name}
                            <button onClick={() => toggleFavorite(genre.name)}
                                    className={genre.isFavorite ? 'favorite' : ''}>
                                {genre.isFavorite ? 'Favorittsjanger' : 'Legg til Favoritt Sjanger'}
                            </button>
                        </li>
                    ) : null
                ))}
            </ul>}
        </section>
    );
    
}


