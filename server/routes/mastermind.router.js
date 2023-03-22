const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// gets top 5 scores based on game_id
router.get('/:game_id', (req, res) => {
    let query

    if(req.params.game_id === '1') {
        query = `
            SELECT "score".id, "user".username, "user".pfp, "game".game, "score".score, "score".time FROM "score" 
            JOIN "user" ON "user".id = "score".user_id
            JOIN "game" ON "game".id = "score".game_id
            WHERE "game".id = 1
            ORDER BY "score".score ASC, "score".time
            LIMIT 5;`
    } 
    if(req.params.game_id === '2') {
        query = `
            SELECT "score".id, "user".username, "user".pfp, "game".game, "score".score, "score".time FROM "score" 
            JOIN "user" ON "user".id = "score".user_id
            JOIN "game" ON "game".id = "score".game_id
            WHERE "game".id = 2
            ORDER BY "score".score DESC, "score".time ASC
            LIMIT 5;`
    }
  
    pool.query(query)
    .then(result => {
        res.send(result.rows)
    }).catch(err => {
        res.sendStatus(500)
      })
});

// posts score on game completion
router.post('/', (req, res) => {
    const query = `
    INSERT INTO "score" ("score", "time", "game_id", "user_id")
    VALUES ($1, $2, $3, $4)`

    params = [ req.body.round, req.body.timer, req.body.game_id, req.user.id ]
  
    pool.query(query, params)
    .then(result => {
        res.sendStatus(200)
    }).catch(err => {
        res.sendStatus(500)
      })
});

// admin can delete scores from leaderboard
router.delete('/:id', (req, res) => {

    const query = `
    DELETE FROM "score"
    WHERE "score".id = $1;`

    params = [ req.params.id ]
  
    pool.query(query, params)
    .then(result => {
        res.sendStatus(200)
    }).catch(err => {
        res.sendStatus(500)
      })
});

module.exports = router;
