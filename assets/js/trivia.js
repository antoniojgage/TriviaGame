$(document).ready(function() {

    //Start to the Trivia game object. This object contains all methods and questions for the game
    var trivia = {

        time: 30, //starting game time at 30 seconds
        correct: 0,
        incorrect: 0,
        counter: 0, //this is the initial time interval object
        i: 0, //i = index of heroQuestions object
        heroQuestions: {
            //Index: {question,choices[],index of correct answer choice}
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

        //initial ask questions method initiated at begining of the game.
        askQuestions: function() {
            var currentQuestion = trivia.heroQuestions[this.i].question;
            var choicesLength = trivia.heroQuestions[this.i].choices.length;
            var thisQuestion = trivia.heroQuestions[this.i];

            $("#questions").html("<h3>" + currentQuestion + "</h3>");
            for (c = 0; c < choicesLength; c++) {
                //this loop will create the buttons for each question and apply the correct answer's index in the data value 
                $("#choices").append("<button class='choices btn-default' data-value=" + (thisQuestion.choices.indexOf(thisQuestion.choices[c])) + ">" + thisQuestion.choices[c] + "</button>");
                console.log("Creating button: " + thisQuestion.choices[c]);
            }
            //after question and buttons have been created, start the timer
            trivia.start();
            $("#start").hide();
        },
        //this method will pass this as selectedAnswer and check if the index of the data-value is = to the data value of the selected answer
        checkAnswer: function(selectedAnswer) {
            var thisQuestion = trivia.heroQuestions[this.i];
            console.log("Correct answer is: " + thisQuestion.correctAnswer);
            //store the index of the correct answer
            var correctAnswerIndex = thisQuestion.correctAnswer;
            //store the index of what the user selected.
            var userChoice = selectedAnswer.data("value");
            clearInterval(counter); //stop the timer
            console.log("correct answer Index " + correctAnswerIndex + " and userChoice = " + userChoice);

            if (correctAnswerIndex === userChoice) {
                $(".choices[data-value='" + correctAnswerIndex + "']").addClass("correctAnswer"); //mark correct answer green
                console.log("YOU'RE RIGHT! I =" + this.i);
                trivia.correct++;
                trivia.time += 15;
            } else if (correctAnswerIndex !== userChoice) {
                $(".choices[data-value='" + correctAnswerIndex + "']").addClass("correctAnswer"); //mark correct answer green
                $(selectedAnswer).toggleClass("btn-default");
                $(selectedAnswer).addClass("wrongCSS"); //mark wrong answer red
                trivia.incorrect++;
            }
            this.i++; //change the index of the current question
            trivia.reset();
            trivia.writeStats();
        },

        nextQuestion: function() {
            //check if trivia game is out of questions, if its undefined its out 
            if (trivia.heroQuestions[this.i] !== undefined) {
                $("#questions").html("");
                $("#choices").html("");
                $("#questions").html("<h3>" + trivia.heroQuestions[this.i].question + "</h3>");
                console.log(trivia.heroQuestions[this.i].question);
                for (c = 0; c < trivia.heroQuestions[this.i].choices.length; c++) {
                    $("#choices").append("<button class='choices btn-default' data-value=" + (trivia.heroQuestions[this.i].choices.indexOf(trivia.heroQuestions[this.i].choices[c])) + ">" + trivia.heroQuestions[this.i].choices[c] + "</button>");
                    console.log("Creating button: " + trivia.heroQuestions[this.i].choices[c]);
                }
            } else {
                $("#start").show();
                alert("no more questions");
            }
            trivia.start();
            trivia.writeStats();
        },
        reset: function() {
            //after 5 seconds, initiate next question method.
            setTimeout(function() { trivia.nextQuestion() }, 5000);
        },
        start: function() {
            //begin game, count down 
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
    //start the game, begin asking questions once user hits start
    $("#start").on("click", function() {
        trivia.askQuestions();
    });
    //if user clicks on one of the choices, pass 'this' into the checkAnswers method
    $(document).on("click", "button", function() {
        if ($(this).hasClass("choices")) {
            console.log($(this));
            trivia.checkAnswer($(this));

        }
    });
});
