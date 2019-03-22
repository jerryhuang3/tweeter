$(document).ready(function() {
    
    let maxInput = parseInt($("span.counter")[0].textContent);
    
    // Character counting & adding error message if tweet goes past 140 characters
    $("textarea").keyup(function() {
        let tweetChar = $(this).val().length;
        let remaining = maxInput - tweetChar;
        $(".counter")[0].textContent = remaining;
        
        if ($(".counter")[0].textContent < 0) {
            $(".counter").addClass("error");
            $(".error").removeClass("hidden");
            $("textarea").addClass("textarea-error");
        } else {
            $(".counter").removeClass("error");
            $(".error").addClass("hidden");
            $("textarea").removeClass("textarea-error");
        }
    });

    // Removes error messages clicking on an empty form
    $("textarea").on("click", function() {
        let tweetChar = $(this).val().length;
        
        if (tweetChar === 0) {
            $(".error").addClass("hidden");
            $("textarea").removeClass("textarea-error");
        }
    });
        
});
