"use strict";

const express       = require('express');
const likeRoutes  = express.Router();

module.exports = function(DataHelpers) {
    
    likeRoutes.get("/", function(req, res) {
        DataHelpers.getLike((err, tweets) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json(tweets);
            }
        });
    });

    likeRoutes.post("/", function(req, res) {
        if (!req.body.text) {
            res.status(400).json({ error: 'invalid request: no data in POST body'});
            return;
        }
        const likeUser = req.body.text;
        
        DataHelpers.saveLike(likeUser, (err) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(201).send();
            }
        });
    });
    
    return likeRoutes;

};