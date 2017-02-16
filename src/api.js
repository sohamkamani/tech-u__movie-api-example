const axios = require('axios')
const Promise = require('bluebird')
const {getMoviesWithStudiosAndActors} = require('./data-service')
const {insertMovieData, getMovieData} = require('./db')

const getMovies = {
  paramount : axios.get('https://movie-api-lyalzcwvbg.now.sh/paramount'),
  dreamworks :axios.get('https://movie-api-lyalzcwvbg.now.sh/dreamworks')
}

const getActors = [
  axios.get('https://movie-api-lyalzcwvbg.now.sh/actors')
]

const refreshDb = (req, res) => {

  Promise.props({
    movies : Promise.props(getMovies),
    actors : Promise.all(getActors)
  })
  .then(({movies, actors}) => {
    const moviesWithStudiosAndActors = getMoviesWithStudiosAndActors(movies, actors)
    return insertMovieData(moviesWithStudiosAndActors)
  })
  .then(()=>{
    res.end('done')
  })
  .catch(err => {
    res.status(500).send('Error')
    console.error(err)})
}

const getMovie = (req, res) => {
  const movieName=  req.params.moviename || ''
  getMovieData(movieName)
  .then(movie => {
    res.json(movie[0][0] || {})})
  .catch(err => {
    res.status(500).send('Error')
    console.error(err)})
}

module.exports = {
  getMovie,
  refreshDb
}