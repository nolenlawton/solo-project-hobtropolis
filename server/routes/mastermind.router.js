const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const query = `
        SELECT "user".username, "game".game, "score".score FROM "score" 
        JOIN "user" ON "user".id = "score".user_id
        JOIN "game" ON "game".id = "score".game_id
        ORDER BY "score" ASC
        LIMIT 5;`
  
    pool.query(query)
    .then(result => {
        res.send(result.rows)
    }).catch(err => {
        res.sendStatus(500)
      })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('round ', req.body)
    console.log('POST')

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
