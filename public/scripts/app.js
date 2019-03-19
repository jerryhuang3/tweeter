$(document).ready(function() {
    function renderTweets(tweets) {
        for (let i = tweets.length - 1; i >= 0; i--) {
            let $tweet = createTweets(tweets[i]);
            $('#tweets-container').append($tweet);
        }
    }

    function createTweets(tweetData) {
        let date = tweetData.created_at;
        let $tweet = $("<article>").addClass("tweets");
        $tweet.append(
            `<header>
                <h2>${tweetData.user.name}</h2>
                <span>${tweetData.user.handle}</span>
            </header>
                <p>${tweetData.content.text}</p>
            <footer>${date}</footer>`);
        return $tweet;
    }
    
    function loadTweets() {
        $.get("/tweets", function(data) {
            renderTweets(data);
        });
    }
    loadTweets();
});