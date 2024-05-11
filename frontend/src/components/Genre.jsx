import React, { useEffect, useState, useContext } from 'react';
import { useUser } from '../hooks/UserContext'; 
import { writeClient } from '../../sanity/client';

export default function Genre() {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { loggedInUser } = useUser(); 

    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
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
            setGenres(data.results.map(genre => ({ name: genre, isFavorite: false })));
            setError(null);
        } catch (error) {
            console.error('Failed to fetch genres:', error);
            setError('Failed to fetch genres');
        }
        setLoading(false);
    };

    const toggleFavorite = async (genreName) => {
        const isFavorite = genres.find(genre => genre.name === genreName).isFavorite;
        const updatedGenres = genres.map(genre => {
            if (genre.name === genreName) {
                return { ...genre, isFavorite: !genre.isFavorite };
            }
            return genre;
        });
        setGenres(updatedGenres);
        await updateFavoriteStatus(genreName, !isFavorite);
    };

    const updateFavoriteStatus = async (genreName, isFavorite) => {
        if (isFavorite) {
            const doc = {
                _type: 'favoriteGenres',
                user: {_type: 'reference', _ref: loggedInUser._id},
                genre: genreName
            };
            try {
                await writeClient.create(doc);
                console.log('Genre added to favorites:', genreName);
            } catch (error) {
                console.error('Error adding genre to favorites:', error);
            }
        } else {
            const query = `*[_type == "favoriteGenres" && user._ref == $userId && genre == $genreName]`;
            const params = { userId: loggedInUser._id, genreName };
            try {
                const results = await writeClient.fetch(query, params);
                results.forEach(async doc => {
                    await writeClient.delete(doc._id);
                });
                console.log('Genre removed from favorites:', genreName);
            } catch (error) {
                console.error('Error removing genre from favorites:', error);
            }
        }
    };

    return (
        <section>
            {loading ? <p>Loading genres...</p> : error ? <p>{error}</p> :
            <ul>
                {genres.map((genre, idx) => (
                    <li key={idx}>
                        {genre.name}
                        <button onClick={() => toggleFavorite(genre.name)}>
                            {genre.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                    </li>
                ))}
            </ul>}
        </section>
    );
}
