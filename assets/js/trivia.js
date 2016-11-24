$(document).ready(function() {


    var trivia = {
        time: 10,
        correct: 0,
        incorrect: 0,
        counter: 0,
        i: 0,
        heroQuestions: {
            0: {
                question: "Does Batman Wear a Cape?",
                choices: ["yes", "no", "maybe"],
                correctAnswer: 0
            },
            1: {
                question: "What is superman's real name?",
                choices: ["Clark", "Bruce", "Benton"],
                correctAnswer: 0
            },
            2: {
                question: "What is Superman's only weakness?",
                choices: ["Samsonite", "Kryptonite", "plutonite", "Steel", "Lois Lane"],
                correctAnswer: 1
            },
            3: {
                question: "Just as Superman has been known by other names, so has Batman. For this question, can you find the one name that has NOT been traditionally associated with Batman?",
                choices: ["World's Greatest Vigilante", "The Dark Knight", "The Caped Crusader", "World's Greatest Detective"],
                correctAnswer: 0
            },
            4: {
                question: "Batman protects what city?",
                choices: ["Chicago", "Metropolis", "Gotham City", "New York City"],
                correctAnswer: 2
            }
        },

        askQuestions: function() {
            console.log("Current I: " + this.i);
            $("#questions").html("<h1>" + trivia.heroQuestions[this.i].question + "</h2>");
            for (c = 0; c < trivia.heroQuestions[this.i].choices.length; c++) {
                $("#choices").append("<button class='choices' data-value=" + (trivia.heroQuestions[this.i].choices.indexOf(trivia.heroQuestions[this.i].choices[c])) + ">" + trivia.heroQuestions[this.i].choices[c] + "</button>");
                console.log("Creating button: " + trivia.heroQuestions[this.i].choices[c]);
            }
            trivia.start();
        },
        checkAnswer: function(selectedAnswer) {
            console.log("Correct answer is: " + trivia.heroQuestions[this.i].correctAnswer);
            var correctAnswerIndex = trivia.heroQuestions[this.i].correctAnswer; //new code
            var userChoice = selectedAnswer.data("value");
            clearInterval(counter);
            console.log("correct answer Index " + correctAnswerIndex + " and userChoice = " + userChoice);

            if (correctAnswerIndex === userChoice) {
                // if (selectedAnswer.data("value") === trivia.heroQuestions[this.i].correctAnswer) { //working if statement
                // $(selectedAnswer).addClass("correctAnswer"); //old code
                $(".choices[data-value='" + correctAnswerIndex + "']").addClass("correctAnswer"); //new code
                console.log("YOU'RE RIGHT! I =" + this.i);
                trivia.correct++;
                trivia.time += 15;
            } else if (correctAnswerIndex !== userChoice) { //new code
                // } else if (selectedAnswer.data("value") !== trivia.heroQuestions[this.i].correctAnswer) { //working else statement
                // $(".choices[data-value='" + (trivia.heroQuestions[this.i].correctAnswer) + "']").addClass("correctAnswer"); //working
                $(".choices[data-value='" + correctAnswerIndex + "']").addClass("correctAnswer");
                $(".choices")
                $(selectedAnswer).addClass("wrongCSS");
                trivia.incorrect++;
            }
            this.i++;
            // trivia.nextQuestion();
            trivia.reset();
            console.log("This.i = " + this.i);
            trivia.writeStats();
        },

        nextQuestion: function() {
            if (trivia.heroQuestions[this.i] !== undefined) {
                $("#questions").html("");
                $("#choices").html("");
                $("#questions").html("<h1>" + trivia.heroQuestions[this.i].question + "</h2>");
                console.log(trivia.heroQuestions[this.i].question);
                for (c = 0; c < trivia.heroQuestions[this.i].choices.length; c++) {
                    $("#choices").append("<button class='choices' data-value=" + (trivia.heroQuestions[this.i].choices.indexOf(trivia.heroQuestions[this.i].choices[c])) + ">" + trivia.heroQuestions[this.i].choices[c] + "</button>");
                    console.log("Creating button: " + trivia.heroQuestions[this.i].choices[c]);
                }
            } else {
                alert("no more questions");
            }
            trivia.start();
            trivia.writeStats();
        },
        reset: function() {
            setTimeout(function() { trivia.nextQuestion() }, 5000);
        },
        start: function() {
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
        },

        writeStats: function() {
            $("#score").html("<div>Correct Answers: " + trivia.correct + "</div>" + "<div> Incorrect Answers: " + trivia.incorrect + "</div>");
        }

    };

    $("#start").on("click", function() {
        trivia.askQuestions();
    });

    $(document).on("click", "button", function() {
        if ($(this).hasClass("choices")) {
            console.log($(this));
            trivia.checkAnswer($(this));

        }
    });
});
