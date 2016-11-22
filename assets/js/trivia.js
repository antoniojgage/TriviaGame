// Start Game initiates timer
// Asks question
// user selects answer, method checks answer, provides correct answer




// $(document).ready(function(){
var questions = {
    0: {
        question: "Does Batman Wear a Cape?",
        choices: ["yes", "no", "maybe"],
        correctAnswer: "yes"
    },
    1: {
        question: "What is superman's real name?",
        choices: ["Clark", "Bruce", "Benton"],
        correctAnswer: "Clark"
    }
};

window.onload = function() {

    trivia.askQuestions();
    // trivia.count();
    $("#start").on("click", trivia.start);

    $(".choices").on("click", trivia.checkAnswer);
    console.log("Checking Answer!");
};

var counter;

var trivia = {
    time: 10,

    askQuestions: function() {
        i = 0;
        $("#questions").html("<h1>" + questions[i].question + "</h2>");
        for (c = 0; c < questions[i].choices.length; c++) {
            $("#questions").append("<h1 class='choices' data-value=" + questions[i].choices[c] + ">" + questions[i].choices[c] + "</h2>");
        }
        trivia.start();
    },
    checkAnswer: function() {
        console.log("current i = " + i);
        clearInterval(counter);
        if ($(this).data('value') === questions[i].correctAnswer) {
            console.log("YOU'RE RIGHT! I =" + i);
            i++
            trivia.reset();
            // setTimeout(function() { trivia.nextQuestion(i) }, 5000);
        } else {
            console.log("YOU'RE WRONG! I = " + i);
            i++
            trivia.reset();
            // setTimeout(function() { trivia.nextQuestion(i) }, 5000);
        }

    },


    nextQuestion: function(i) {
        $("#questions").html("<h1>" + questions[i].question + "</h2>");
        console.log(questions[i].question);
        for (c = 0; c < questions[i].choices.length; c++) {
            $("#questions").append("<h1 class='choices' data-value=" + questions[i].choices[c] + ">" + questions[i].choices[c] + "</h2>");
        }
        trivia.start();
    },
    reset: function() {
        trivia.time += 30;
        setTimeout(function() { trivia.nextQuestion(i) }, 5000);
    },
    start: function() {
        // DONE: Use setInterval to start the count here.
        // trivia.time +=30;
        counter = setInterval(trivia.count, 1000);
    },
    stop: function() {
        // DONE: Use clearInterval to stop the count here.
        clearInterval(counter);
    },

    count: function() {
        // DONE: increment time by 1, remember we cant use "this" here.
        trivia.time--;
        var converted = trivia.timeConverter(trivia.time);
        $("#display").html(converted);
        if (trivia.time === 0) {
            alert("Time is up! You lose!");
            trivia.stop();
        } else {
            // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
            //       and save the result in a variable.
            console.log(converted);
            // DONE: Use the variable we just created to show the converted time in the "display" div.
        }
    },
    timeConverter: function(t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes === 0) {
            minutes = "00";
        } else if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return minutes + ":" + seconds;
    }
};
// });
