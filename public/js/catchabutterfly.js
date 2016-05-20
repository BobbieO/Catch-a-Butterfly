(function(){
$(document).ready(function() {
"use strict";
 
    // var for later grabbing all elements by class
    var butterfly = $(".butterfly");

    // variables for game count and score
    var score = 0;
    var highScore = 0;

    // variable to use in game function to vanish butterfly
    var disappear;

    // to play music
    function playMusic() {
        $("#music")[0].play();
    };

    // if "highScore" from localStorage exists assign highScore the value from localStorage, show it on screen.
    if (localStorage.highScore) {
        highScore = localStorage.getItem("highScore");
        $(".high-score").html("High Score: " + highScore);
    };

    // click listener and game start
    $("#start").click(function(event) {
        playMusic();

        // removes listeners of start click event
        $(".butterfly").off("click");

        // reset and display score
        score = 0;
        $(".status").html("Score: " + score);

        // to set timer and butterfly interval
        var currentScore = score;
        var timer = 30;
        var timerInterval = setInterval(function(){
            $(".end").html(timer + " secs");
            timer--;

            // stops interval so butterflies don't repeat infinity
            if (timer==0) {
                clearInterval(timerInterval);
                endGame();
            };
        }, 1000);

        // run game core
        flashButterfly();

        // click listener for butterfly, to vanish on click, add to score
            // write to score on screen
        $(".butterfly").click(function(){     
            butterfly.addClass("invisible");
            score++;
            $(".status").html("Score: " + score);
        });
    });
    
    // to make butterfly appear
    var flashButterfly = function() {

        // randomize a numerical value from 0-7 for cages
        var random = Math.floor(Math.random()*8);
        butterfly.eq(random).removeClass("invisible");

        // to vanish butterfly
        disappear = setTimeout(function(){
            butterfly.eq(random).addClass("invisible");

            // repeats flashButterfly function again
            flashButterfly();
        }, 1000);
    };

    // var for endgame stuff: remove listeners, show user a failure notice
    var endGame = function(){
        $(".butterfly").off("click");
        $(".end").html("Game Over");
        clearTimeout(disappear);
        $(".butterfly").addClass("invisible");

        // if current score is greater than the stored high score, change high score
            // storage to new value, show on screen
        var currentScore = score;
        if (currentScore > highScore) {
            $(".high-score").html("High Score: " + currentScore);
            localStorage.setItem("highScore", currentScore);
        };
    };
});
})();
