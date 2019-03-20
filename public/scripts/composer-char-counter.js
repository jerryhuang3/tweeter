$(document).ready(function() {
    let maxInput = parseInt($("span.counter")[0].textContent);
        $("textarea").keyup(function() {
            let tweetChar = $(this).val().length;
            let remaining = maxInput - tweetChar;
            $(".counter")[0].textContent = remaining;
            if ($(".counter")[0].textContent < 0) {
                $(".counter").addClass("error");
            } else if ( $(".counter")[0].textContent >= 0) {
                $(".counter").removeClass("error");
            }
        });
});
