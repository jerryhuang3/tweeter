/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {
const tweetData = {
    "user": {
        "name": "Newton",
        "avatars": {
            "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
            "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
            "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
    },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
}


function createTweets(tweetData) {
    let date = tweetData.created_at;
    let $tweet = $("<article>").addClass("tweets");
    $tweet.append( 
        `<header>
            <h2 class="tweets">${tweetData.user.name}</h2>
            <span class="tweets">${tweetData.user.handle}</span>
        </header>
        <body>
            <p class="tweets">${tweetData.content.text}</body>
        <footer>${date}</footer>`);
    $('#tweets-container').append($tweet);
}

createTweets(tweetData);
// Test / driver code (temporary)
 // to see what it looks like
 // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});
