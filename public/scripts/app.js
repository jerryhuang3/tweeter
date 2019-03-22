$(document).ready(function() {
    
    // Toggles the compose tweet box
    $(".compose").click(function(){
        $(".new-tweet").slideToggle("fast");
        $("textarea").focus();
    });

    // Tweet submission validation
    $("form").submit(function(event) {
        event.preventDefault();
        
        let string = $(this[0]).val().trim();
        if ($(this[0]).val().length <= 140 && string !== "") {
            $.post("/tweets", $(this).serialize(), function () {
                loadTweets();
            });
            $("#tweets-container").load("index.html [data-id]");
            $(this[0]).val("");
            $(this[1]).next()[0].textContent = "140";
            $(".error").addClass("hidden");
            $("textarea").removeClass("textarea-error");
        } else {
            $(".error").removeClass("hidden");
            $("textarea").addClass("textarea-error");
            return;
        }
    });
    
    // Removes any error messages clicking on the form
    $("textarea").on("click", function() {
        $(".error").addClass("hidden");
        $("textarea").removeClass("textarea-error");
    });

    // Liking tweets function - unlimited likes
    $("section").on('click', '[data-heart]', function () {
        let tweetUser = $(this).parents("article.tweets").find(".handle").text();
        $.post("/likes", {text: tweetUser}, function () {
            loadTweets();
        });
        $("#tweets-container").load("index.html footer");
    });
    
    // Disable cross-site scripting
    function escape(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }
    
    // Render tweets from database and adds new tweet 
    function renderTweets(tweets) {
        for (let i = tweets.length -1; i >= 0; i--) {
            $tweet = createTweets(tweets[i]);
            $tweet.attr("data-id", i);
            $('#tweets-container').append($tweet);
        }
    }
    
    // Creates new tweet
    function createTweets(tweetData) {
        let $tweet = $("<article>").addClass("tweets");
        $tweet.append(
            `<header>
                <img src="${escape(tweetData.user.avatars.large)}">
                <h2>${escape(tweetData.user.name)}</h2>
                <span class="handle">${escape(tweetData.user.handle)}</span>
            </header>
            <p>${escape(tweetData.content.text)}</p>
            <footer>
                 <span class="time">${moment(tweetData.created_at).fromNow()}</span>
                 <span class="count">${tweetData.content.likes}</span>
                 <i data-heart class="fas fa-heart fa-lg"></i>
            </footer>`);
        return $tweet;
    }
    
    // Retrieves tweets from database
    function loadTweets() {
        $.get("/tweets", function(data) {
            renderTweets(data);
        });
    }
    loadTweets();
});