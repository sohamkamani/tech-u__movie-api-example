const {chain} = require('lodash')

const transformMovie = studio => movie => Object.assign({}, movie, { studio })

const mapActors = (movie, actors) => {
  const actorNames = actors
    .filter(actor => actor.movies.indexOf(movie.movieName) >= 0)
    .map(actor => actor.actorName)

  return Object.assign({}, movie, { actors: actorNames })
}

const getMoviesWithStudiosAndActors = (movies, actors) => {
  const actorsData = chain(actors)
    .map(actors => actors.data)
    .flatten()
    .value()

  const studioNames = Object.keys(movies)

  const moviesWithStudiosAndActors = chain(studioNames)
    .map(studioName => movies[studioName].data.map(transformMovie(studioName)))
    .flatten()
    .map(movie => mapActors(movie, actorsData))
    .value()

  return moviesWithStudiosAndActors
}

module.exports = {
  transformMovie,
  mapActors,
  getMoviesWithStudiosAndActors
}