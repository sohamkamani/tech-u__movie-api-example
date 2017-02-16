const {assert} = require('chai')
const {transformMovie, mapActors, getMoviesWithStudiosAndActors} = require('./data-service')

const movieData = {
  movieName: "Movie 1",
  releaseDate: "Oct-01-2015"
}

const actors = [
  {
    actorName: "Actor 1",
    movies: [
      "Movie 1",
      "Movie 2",
      "Movie 5"
    ]
  },
  {
    actorName: "Actor 2",
    movies: [
      "Movie 1",
      "Movie 3"
    ]
  },
  {
    actorName: "Actor 3",
    movies: [
      "Movie 12",
      "Movie 3"
    ]
  }
]

describe('Data service - movie transformation', () => {
  it('Maps movies and adds their studio', () => {
    const transformedMovie = transformMovie('paramount')(movieData)
    assert.equal(transformedMovie.studio, 'paramount')
  })

  it('Maps actors to their movies', () => {
    const transformedMovie = mapActors(movieData, actors)
    assert.deepEqual(transformedMovie.actors, ['Actor 1', 'Actor 2'])
  })
  it('Maps the final data structure from the original data', () => {
    const finalData = getMoviesWithStudiosAndActors({ abc: { data: [movieData] } }, [{ data: actors }])
    assert.deepEqual(finalData, [{
      actors: ['Actor 1', 'Actor 2'],
      movieName: 'Movie 1',
      releaseDate: 'Oct-01-2015',
      studio: 'abc'
    }])
  })
})