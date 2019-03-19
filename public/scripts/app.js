$(document).ready(function() {
    function fetchTweets() {
        $("form").submit(function(event) {
            event.preventDefault();
            let string = this.children[0].value.replace(/ /g, "");
            if (this.children[0].value.length <= 140 && this.children[0].value.length > 0 && string !== "") {
                $.post("/tweets", $(this).serialize(), function() {
                    loadTweets();
                });
                $("#tweets-container").load("index.html .tweets");
                
            } else {
                return alert("Error! Your tweet is either too long or empty!");
            }
        });
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