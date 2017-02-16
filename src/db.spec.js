const {
  insertMovieData,
  getMovieData,
  db
} = require('./db')
const {assert} = require('chai')

describe('db - insert', () => {
  it('should run an insert query', done => {
    insertMovieData([{
      movieName: 'movie4',
      releaseDate: 'Jan-01-2015',
      actors: ['Actor1', 'Actor2'],
      studio: 'Dreamworks'
    }])
      .then(() => {
        assert.deepEqual(db.query.args[0][1], {
          'replacements': {
            'actors': '{Actor1,Actor2}',
            'moviename': 'movie4',
            'releasedate': 'Jan-01-2015',
            'studio': 'Dreamworks',
          }
        })
      })
      .then(done, done)
  })

  it('should run a select query', () => {
    getMovieData('abc')
    assert.deepEqual(db.query.args[1][1], {
      'replacements': {
        moviename: 'abc'
      }
    })
  })
})