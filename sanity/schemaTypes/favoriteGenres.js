
export const favoriteGenres = {
    title: 'Favorite Genres',
    name: 'favoriteGenres',
    type: 'object',
  fields: [
    // user field must be deleted, remain with only the name of genre
      {
        title: 'User',
        name: 'user',
        type: 'reference',
        to: [{ type: 'users' }], 
      },
      {
        title: 'Genre',
        name: 'genre',
        type: 'string',
      }
    ]
  }
  