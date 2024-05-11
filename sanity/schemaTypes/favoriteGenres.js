
export const favoriteGenres = {
    title: 'Favorite Genres',
    name: 'favoriteGenres',
    type: 'document',
    fields: [
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
  