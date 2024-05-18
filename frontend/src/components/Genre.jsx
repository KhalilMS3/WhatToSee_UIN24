import React, { useEffect, useState } from 'react';
import { useUser } from '../hooks/UserContext'; 
import { writeClient } from '../../sanity/client';
import { FaStar } from "react-icons/fa";

//apikey: d2ca980ddcmsh43b9d3e642be0a8p1d08c1jsne846de12bbc5

export default function Genre() {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { userId } = useUser();
    

    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
        setLoading(true);
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
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            // Henter brukerdokumentet fra Sanity
            const userDoc = await writeClient.fetch(`*[_type == "users" && _id == $userId]{favoredGenres}`, { userId });

            const favoriteGenresSet = new Set(userDoc[0]?.favoredGenres || []);
    
            // Setter sjangerlisten med favorittstatus
            const genresWithFavorites = data.results.map(genre => ({
                name: genre,
                isFavorite: favoriteGenresSet.has(genre)
            }));
    
            setGenres(genresWithFavorites);
            setError(null);
        } catch (error) {
            console.error('Failed to fetch genres:', error);
            setError('Failed to fetch genres');
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = async (genreName) => {
        const updatedGenres = genres.map(genre => {
            if (genre.name === genreName) {
                return { ...genre, isFavorite: !genre.isFavorite };
            }
            return genre;
        });
        setGenres(updatedGenres);

        const userDoc = await writeClient.fetch(`*[_type == "users" && _id == $userId]{favoredGenres}`, { userId });
        const favoredGenres = new Set(userDoc[0]?.favoredGenres || []);

        if (favoredGenres.has(genreName)) {
            favoredGenres.delete(genreName);
        } else {
            favoredGenres.add(genreName);
        }

        try {
            await writeClient.patch(userId)
                .set({ favoredGenres: Array.from(favoredGenres) })
                .commit();
            console.log('Genre favorite status updated:', genreName);
        } catch (error) {
            console.error('Error updating favorite genres:', error);
        }
    };

    return (
        <>
            <h2>Sjangere</h2>
            {loading ? (
                <p>Laster...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <section>
                    <ul className="genre-list">
                        {genres?.map((genre, idx) => (
                            genre.name !== null ? (
                                <li key={idx} className="genre-item">
                                    {genre.name}
                                    <button
                                        className={genre.isFavorite ? 'remove-btn' : 'add-btn'}
                                        onClick={() => toggleFavorite(genre.name)}
                                    >
                                        <FaStar /> {genre.isFavorite ? 'Remove from favorite' : 'Add to favorite'}
                                    </button>
                                </li>
                            ) : null
                        ))}
                    </ul>
                </section>
            )}
        </>
    );
}
