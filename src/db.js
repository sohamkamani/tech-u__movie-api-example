const Sequelize = require('sequelize')
const sinon = require('sinon')

const db = process.env.NODE_ENV === 'test' ? {query : sinon.spy()} 
: new Sequelize('postgres://soham:abc123@localhost:5432/tpop')

const insertMovieData = movieData => Promise.all(movieData.map(movie => {
  return db.query(`INSERT INTO movies (moviename, releasedate, actors, studio) 
  VALUES (:moviename, :releasedate, :actors, :studio)
  ON conflict (moviename) DO UPDATE
  SET releasedate = excluded.releasedate,
    actors = excluded.actors,
    studio = excluded.studio;`, {
    replacements : {
      moviename : movie.movieName,
      releasedate : movie.releaseDate,
      actors : `{${movie.actors.join(',')}}`,
      studio : movie.studio
    }
  })
}))

const getMovieData = movieName => db.query('SELECT "moviename","releasedate", "actors", "studio" from movies where moviename = :moviename', {
  replacements : {
    moviename : movieName
  }
})

module.exports = {
  insertMovieData,
  getMovieData,
  db
}