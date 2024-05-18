export const users = {
  title: 'Brukere',
  name: 'users',
  type: 'document',
  fields: [
    {
      title: 'Brukernavn',
      name: 'username',
      type: 'string',
    },
    {
      title: 'Favoritt filmer',
      name: 'favoredFilms',
      type: 'array',
      of: [{type: 'films'}],
    },
    {
      title: 'Favoritt sjangere',
      name: 'favoredGenres',
      type: 'array',
      of: [{type: 'string'}],
    },
  ],
}
