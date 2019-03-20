$(document).ready(function() {
    
    $(".compose").click(function(){
        $(".new-tweet").slideToggle("fast");
        $("textarea").focus();
    });

    $("form").submit(function(event) {
        event.preventDefault();
        let string = $(this[0]).val().trim();
        if ($(this[0]).val().length <= 140 && string !== "") {
            $.post("/tweets", $(this).serialize(), function() {
                loadTweets();
            });
            $("#tweets-container").load("index.html .tweets");
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
    
    
    
    function escape(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }
    
    function renderTweets(tweets) {
        for (let i = tweets.length -1; i >= 0; i--) {
            $tweet = createTweets(tweets[i]);
            $('#tweets-container').append($tweet);
        }
    }

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
                 <i class="fas fa-heart"></i>
            </footer>`);
        return $tweet;
    }
    
    function loadTweets() {
        $.get("/tweets", function(data) {
            renderTweets(data);
        });
    }
    loadTweets();
});