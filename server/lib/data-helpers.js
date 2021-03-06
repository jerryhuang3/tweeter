"use strict";
let like = false;

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, callback);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback); 
    },
    
    // Saves a like to `db`
    saveLike: function(saveLike, callback) {
        db.collection("tweets").update(
            {"user.handle": saveLike},
            {$inc: {"content.likes": 1}}, callback);
    },

    // Get all likes in `db`
    getLike: function(callback) {
      db.collection("tweets").find().toArray(callback);
    }
  
  };
};
