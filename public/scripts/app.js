$(document).ready(function() {

    function escape(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }
    
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
                <h2>${escape(tweetData.user.name)}</h2>
                <span>${escape(tweetData.user.handle)}</span>
            </header>
                <p>${escape(tweetData.content.text)}</p>
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