const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('round ', req.body)
    console.log('user_id', req.user.id)

    const query = `
    INSERT INTO "score" ("score", "game_id", "user_id")
    VALUES ($1, $2, $3)`

    params = [ req.body.round, req.body.game_id, req.user.id ]
  
    pool.query(query, params)
    .then(result => {
    }).catch(err => {
        res.sendStatus(500)
      })
});

module.exports = router;
router.post('/', (req, res) => {

    const insertMovieQuery = `
    INSERT INTO "movies" ("title", "poster", "description")
    VALUES ($1, $2, $3)
    RETURNING "id";`
  
    pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
    .then(result => {
    }).catch(err => {
        res.sendStatus(500)
      })
    })