// Pseudo Code
// Create Options
// Select playerOption
// Move remaining characters to defenderOptions
// Select defender 

// Establish Condition for playerOption vs defender
// writestats()

// If playerOption.health < 0 {
//  kill player
//  Tell user why they lost, offer restart button.
// } else if (defender.health <0) {
//  kill defender
//  inform player they have won, inform player to select new defender
// }

//Array's of options and their elements
var options = ["Death Pact Angel", "Baneslayer Angel", "Reaper from the Abyss", "Angel of Sernity", "Grand Abolisher"];
var characterImages = ["<img src='assets/images/deathpact-angel.jpg'>", "<img src='assets/images/baneslayer-angel.jpg'>", "<img src='assets/images/reaper-from-the-abyss.jpg'>", "<img src='assets/images/angelofsernity.jpg'>", "<img src='assets/images/grandabolisher.jpg'>"];
var healthPower = [30, 100, 50, 50, 35];
var attackPower = [2, 1, 10, 7, 12];
var playerHealth = [30, 100, 50, 50, 35];



// var options = ["Thor", "Batman", "Superman", "Green Arrow", "Wolverine"];
// var characterImages = ["<img src='assets/images/thor.gif'>", "<img src='assets/images/batman.gif'>", "<img src='assets/images/superman.gif'>", "<img src='assets/images/greenarrow.gif'>", "<img src='assets/images/wolverine.gif'>"];
// var healthPower = [300, 200, 500, 50, 350];
// var attackPower = [25, 15, 100, 15, 12];
// var playerHealth = [300, 200, 500, 50, 350];
//Empty array to push objects of character stats to.
var allToons = [];
//Global variables used for game attack logic.
var attackerHealth;
var defenderHealth;
var attackerAP;
var defenderAP;
var currentHealth = 0;
var plusAP;
//Filter through the options and push each object with full stats and keys
createAllToons();

function createAllToons() {
    for (i = 0; i < options.length; i++) {
        allToons.push({ name: options[i], images: characterImages[i], health: healthPower[i], attack: attackPower[i], pH: playerHealth[i] });
    }
}


$(document).ready(function() {

    createOptions();

    // write options and stats to the page
    function createOptions() {
        for (i = 0; i < options.length; i++) {
            var optionsBtn = $("<button>");
            optionsBtn.html("<h1 class='name'>" + options[i] + "</h1>")
            optionsBtn.addClass("heros");
            optionsBtn.attr("heroName", options[i]);
            optionsBtn.append(characterImages[i]);
            optionsBtn.append("<h3 class='health'> Health = " + healthPower[i] + "</h3>");
            optionsBtn.append("<h3 class='attackPower'> Attack Power = " + attackPower[i] + "</h3>");
            $("#options").append(optionsBtn);

        }
    }


    //Once a button is clicked, toggle necessary classes and move the non clicked items to defender options.
    $(document).on("click", "button", function() {
        if ($(this).hasClass("heros")) {
            //checks the selection of "this", prints the health power of selected object.
            console.log("Current Selection " + $(this).text());
            console.log(this.healthPower);
            $(this).toggleClass("heros");
            $(this).toggleClass("playerOption");
            $(this).prependTo("#playerOptions");
            $(".heros").not(this).appendTo("#defenderOptions");
            $(".heros").not(this).addClass("defenderOptions");
            $(".heros").removeClass("heros");
        };
        //logic below takes clicks only delcared as defender options, moves the the clicked choice to defenders Choice div and sets all others to waiting class
        if ($(this).hasClass("defenderOptions")) {
            console.log("Clicking " + $(this).text());
            $(this).removeClass("waiting");
            // $(this).prependTo("#defenderChoice");
            $(".defenderOptions").not(this).addClass("waiting");
            $(".defenderOptions").removeClass("defenderOptions");
            $(this).addClass("defenderChoice");
            $(this).prependTo("#defenderChoice");

        };
    });

    $("#reset").on("click", function() {
        $("#options").html("");
        $("#playerOptions").html("");
        $("#defenderOptions").html("");
        $("#defenderChoice").html("");
        $(".defeated").html("");
        createOptions();
    });
    // Logic for attack button. Take values from "this" in the object
    $("#attack").on("click", function() {
        console.log("attacking bro jeez");
        //Take the attribute of hero name (hard coded in the buttons in HTML) and assign that as the attacker and defender.
        var defenderName = $(".defenderChoice").attr("heroname");
        var attacker = $(".playerOption").attr("heroname");
        //The lines below have the math functions for this. Taking the allToons array and searching for the index of the attacked (identified above).
        currentHealth = allToons[options.indexOf(attacker)].pH - allToons[options.indexOf(defenderName)].attack;
        defenderHealth = allToons[options.indexOf(defenderName)].pH - allToons[options.indexOf(attacker)].attack;
        //Once the calculations above are done, we push this value to the pH (playerHealth) of the original object 
        allToons[options.indexOf(attacker)].pH = currentHealth;
        allToons[options.indexOf(defenderName)].pH = defenderHealth;
        //after an object is attacked we re-write they're health to the page by replacing it here.
        $("#defenderChoice .health ").html("<h3 class='health'> Health = " + defenderHealth + "</h3>");
        $(".playerOption .health ").html("<h3 class='health'> Health = " + currentHealth + "</h3>");
        //Debugging purposes below will list current events in logic.
        console.log(allToons[options.indexOf(defenderName)]);
        console.log("current player health is " + currentHealth);
        console.log("current defender health is " + defenderHealth);
        console.log("defender health is " + allToons[options.indexOf(defenderName)].pH);
        console.log(allToons[options.indexOf(attacker)].pH);
        console.log("player health is " + allToons[options.indexOf(attacker)].pH);
        console.log($(".health"));
        allToons[options.indexOf(attacker)].attack += allToons[options.indexOf(attacker)].attack;
        console.log("Attack AP increased to: " + allToons[options.indexOf(attacker)].attack);
        $(".playerOption .attackPower ").html("<h3 class='attackPower'> Attack Power = " + allToons[options.indexOf(attacker)].attack + "</h3>");

        //Logic to check if the user wins or losses, alert user of loss, or alert user to select new opponent
        if (defenderHealth < 0) {
            console.log("you win!");
            $(".defenderChoice").appendTo(".defeated");
            //set potential defenders back to defender options so they can be selected
            $(".waiting").addClass("defenderOptions");
            alert("Select new Opponent!");
        } else if (currentHealth < 0) {
            console.log("you lose...");
            $(".playerOption").appendTo(".defeated");
            $(".playerOption").removeClass("playerOption");
            alert("you lost, resetting the game");
        }




    });
});
