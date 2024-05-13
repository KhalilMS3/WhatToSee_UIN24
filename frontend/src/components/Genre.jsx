import React, { useEffect, useState, useContext } from 'react';
import { useUser } from '../hooks/UserContext'; 
import { writeClient } from '../../sanity/client';
import '../Styles/GenreList.css'
//apikey: d2ca980ddcmsh43b9d3e642be0a8p1d08c1jsne846de12bbc5

export default function Genre({user}) {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { loggedInUser, userId } = useUser();
    

    
    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
        setLoading(true);
        const url = 'https://moviesdatabase.p.rapidapi.com/titles/utils/genres';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'd2ca980ddcmsh43b9d3e642be0a8p1d08c1jsne846de12bbc5', // Bruker miljøvariabel her
                'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
            }
        };
    
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            // Henter favorittsjangere fra Sanity
            const favoriteGenresQuery = `*[_type == "favoriteGenres" && user._ref == $userId]`;
            const favoriteGenresParams = { userId: userId };
            const favoriteGenres = await writeClient.fetch(favoriteGenresQuery, favoriteGenresParams);
    
            // Oppretter et Set for raskere sjekk
            const favoriteGenresSet = new Set(favoriteGenres.map(fav => fav.genre));
    
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
            // Hvis sjangeren skal legges til i favoritter
            const doc = {
                _type: 'favoriteGenres',
                user: {_type: 'reference', _ref: userId },
                genre: genreName
            };
            try {
                await writeClient.create(doc);
                console.log('Genre added to favorites:', genreName);
            } catch (error) {
                console.error('Error adding genre to favorites:', error);
            }
        } else {
            // Hvis sjangeren skal fjernes fra favoritter
            const query = `*[_type == "favoriteGenres" && user._ref == $userId && genre == $genreName]`;
            const params = { userId, genreName };
            try {
                const results = await writeClient.fetch(query, params);
                if (results.length > 0) {
                    for (const doc of results) {
                        await writeClient.delete(doc._id);
                    }
                    console.log('Genre removed from favorites:', genreName);
                } else {
                    console.log('No favorite genre found to remove');
                }
            } catch (error) {
                console.error('Error removing genre from favorites:', error);
            }
        }
    };
    

    return (
        <section>
            <ul className="genre-list">
                {genres.map((genre, idx) => (
                    <li key={idx} className="genre-item">
                        {genre.name}
                        <button onClick={() => toggleFavorite(genre.name)}>
                            {genre.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}
