$(document).ready(function () {
    // main code here 
    // global variables 

    // img array 
    var images = [
        "./assets/images/darth_vader.jpeg", "./assets/images/obiwan.png",
        "./assets/images/rey.jpg", "./assets/images/han_solo.png"
    ];

    // load all character boxes into their own containers 
    var darthVaderBox = $("#darthVader");
    var obiWanBox = $("#obiWan");
    var reyBox = $("#rey");
    var hanSoloBox = $("#han");

    // function for getting the boxes above 
    var getCharacterCard = function (charCode) {
        if (charCode == "darthVader") {
            return darthVaderBox;
        }
        else if (charCode == "obiWan") {
            return obiWanBox;
        }
        else if (charCode == "rey") {
            return reyBox;
        }
        else if (charCode == "han") {
            return hanSoloBox;
        }
    }

    // load attack button 
    var attackBtn = $("#attackBtn");

    // load the player and opponent images into their own containers 
    var playerImg = $(".playerIMG");
    var opponentImg = $(".opponentIMG");

    // load player and opponent labels 
    var playerLabel = $("#playerLabel h3");
    var opponentLabel = $("#opponentLabel h3");



    var rpgGame = {
        isGameStarted: false,
        isPlayerCharacterSelected: false,
        isOpponentSelected: false,
        opponentsRem: 3,
        playerCharacter: {
            codeName: "",
            displayName: "",
            healthPts: {
                base: 0,
                current: 0
            },
            attackPts: { 
                base: 0,
                current: 0
            },
            isDefeated: false,
            attack: function () {
                console.log("Running f:attack")

                // check if the attack will defeat the opponent 
                if (rpgGame.playerCharacter.attackPts.current >= rpgGame.opponentCharacter.healthPts.current) {
                    console.log("Running f:attack -->opponent will be defeated");
                    // set the opponent health to 0
                    rpgGame.opponentCharacter.healthPts.current = 0;
                    rpgGame.updateProgress();
                    console.log("Calling character defeated");
                    //invoke characterDefeated 
                    rpgGame.charDefeated("e", rpgGame.opponentCharacter.codeName);
                }
                else {
                    // reduce the opponent character object's health value
                    console.log("Running f:attack --> Normal Course Attack");
                    rpgGame.opponentCharacter.healthPts.current -= rpgGame.playerCharacter.attackPts.current;
                    // calculate progress bar value 
                    rpgGame.updateProgress();
                    // check whether the opponent's counterattack will defeat the player character 
                    if (rpgGame.opponentCharacter.counterAttackPts >= rpgGame.playerCharacter.healthPts.current) {
                        console.log("Running f: attack --> player will be defeated by counter")
                        // set player character health to 0 
                        rpgGame.playerCharacter.healthPts.current = 0;
                        // update the progress bar for the player character 
                        rpgGame.updateProgress();
                        // invoke charDefeated routine 
                        console.log("Calling f: charDefeated");
                        rpgGame.charDefeated("p", rpgGame.playerCharacter.codeName);
                    }
                    else {
                        console.log("running f: attack --> Counter attack WILL NOT defeat player character");
                        rpgGame.playerCharacter.healthPts.current -= rpgGame.opponentCharacter.counterAttackPts;
                        // display result of this counter attack 
                        // take the current attack value, increase by base value
                        rpgGame.playerCharacter.attackPts.current += rpgGame.playerCharacter.attackPts.base;
                        rpgGame.updateProgress();
                    }

                }
            }
        },
        opponentCharacter: {
            codeName: "",
            displayName: "",
            healthPts: {
                base: 0,
                current: 0
            },
            attackPts: 0,
            counterAttackPts: 0,
            isDefeated: false
        },
        characters: [
            {
                codeName: "darthVader",
                displayName: "Darth Vader",
                healthPts: 225,
                attackPts: 25,
                counterAttackPts: 75,
                isDefeated: false
            },
            {
                codeName: "obiWan",
                displayName: "Obi-Wan Kenobi",
                healthPts: 280,
                attackPts: 35,
                counterAttackPts: 50,
                isDefeated: false
            },
            {
                codeName: "rey",
                displayName: "Rey",
                healthPts: 220,
                attackPts: 30,
                counterAttackPts: 80,
                isDefeated: false
            },
            {
                codeName: "han",
                displayName: "Han Solo",
                healthPts: 325,
                attackPts: 40,
                counterAttackPts: 20,
                isDefeated: false
            }
        ],
        // select character function 
        selectCharacter: function (charCode) {
            var i = 0; // setting initial index of the character in rpgGame object 
            // determine the player selected, set index value 
            // cannot select same player and opponent 
            if (rpgGame.opponentCharacter.codeName == charCode) {
                return 0
            }
            else {
                if (charCode == "darthVader") {
                    i = 0;
                    playerImg.attr("src", images[i]);
                    darthVaderBox.addClass("border-success");
                    darthVaderBox.addClass("characterHolderSelected");
                    darthVaderBox.removeClass("characterHolder");
                    darthVaderBox.find(".card-stats p").text("Player 1");
                    $("#headerTitle").text("Let's Play:");
                    $("#headerMsg").text("Select your opponent!");
                    playerLabel.text("Darth Vader");

                }
                else if (charCode == "obiWan") {
                    i = 1;
                    playerImg.attr("src", images[i]);
                    obiWanBox.addClass("border-success");
                    obiWanBox.addClass("characterHolderSelected");
                    obiWanBox.removeClass("characterHolder");
                    obiWanBox.find(".card-stats p").text("Player 1")
                    $("#headerTitle").text("Let's Play:");
                    $("#headerMsg").text("Select your opponent!");
                    playerLabel.text("Obi Wan");
                }
                else if (charCode == "rey") {
                    i = 2;
                    playerImg.attr("src", images[i]);
                    reyBox.addClass("border-success");
                    reyBox.addClass("characterHolderSelected");
                    reyBox.removeClass("characterHolder");
                    reyBox.find(".card-stats p").text("Player 1");
                    $("#headerTitle").text("Let's Play:");
                    $("#headerMsg").text("Select your opponent!");
                    playerLabel.text("Rey");
                }
                else if (charCode == "han") {
                    i = 3;
                    playerImg.attr("src", images[i]);
                    hanSoloBox.addClass("border-success");
                    hanSoloBox.addClass("characterHolderSelected");
                    hanSoloBox.removeClass("characterHolder");
                    hanSoloBox.find(".card-stats p").text("Player 1");
                    $("#headerTitle").text("Let's Play:");
                    $("#headerMsg").text("Select your opponent!");
                    playerLabel.text("Han Solo");
                }
                this.playerCharacter.codeName = this.characters[i].codeName;
                this.playerCharacter.displayName = this.characters[i].displayName;
                this.playerCharacter.healthPts.base = this.characters[i].healthPts;
                this.playerCharacter.healthPts.current = this.characters[i].healthPts;
                this.playerCharacter.attackPts.base = this.characters[i].attackPts;
                this.playerCharacter.attackPts.current = this.characters[i].attackPts;
                this.playerCharacter.counterAttackPts = this.characters[i].counterAttackPts;

                console.log(this.playerCharacter);

                // set game object state to player character selected 
                this.isPlayerCharacterSelected = true;
            }


        },
        selectOpponent: function (charCode) {
            console.log("Running Select Opponent");
            // set indexes for the different characters 
            // cannot select opponent that is already player character
            if (rpgGame.playerCharacter.codeName == charCode) {
                return 0
            }
            else {
                if (charCode == "darthVader") {

                    i = 0;
                    opponentImg.attr("src", images[i]);
                    darthVaderBox.addClass("border-warning");
                    darthVaderBox.find(".card-stats p").text("Opponent 1");
                    opponentLabel.text("Darth Vader");
                }
                else if (charCode == "obiWan") {
                    i = 1;
                    opponentImg.attr("src", images[i]);
                    obiWanBox.addClass("border-warning");
                    obiWanBox.find(".card-stats p").text("Opponent 1");
                    opponentLabel.text("Obi Wan");
                }
                else if (charCode == "rey") {
                    i = 2;
                    opponentImg.attr("src", images[i]);
                    reyBox.addClass("border-warning");
                    reyBox.find(".card-stats p").text("Opponent 1");
                    opponentLabel.text("Rey");
                }
                else if (charCode == "han") {
                    i = 3;
                    opponentImg.attr("src", images[i]);
                    hanSoloBox.addClass("border-warning");
                    hanSoloBox.find(".card-stats p").text("Opponent 1");
                    opponentLabel.text("Han Solo");
                }
                // set the opponent character properties to selected opponent 
                this.opponentCharacter.codeName = this.characters[i].codeName;
                this.opponentCharacter.displayName = this.characters[i].displayName;
                this.opponentCharacter.healthPts.base = this.characters[i].healthPts;
                this.opponentCharacter.healthPts.current = this.characters[i].healthPts;
                this.opponentCharacter.attackPts = this.characters[i].attackPts;
                this.opponentCharacter.counterAttackPts = this.characters[i].counterAttackPts;


                // set game object state to player character selected 
                this.isOpponentSelected = true;
                rpgGame.startGame();

            }

        },
        charDefeated: function (defeatCode, charCode) {
            // check if the char being evaluated is a player or opponent character
            // defeatCode: string: p --> player, anything else, enemy
            // turn 'off' game 
            rpgGame.isGameStarted = false;
            if (defeatCode == "p") {
                // set isCharacterDefeated to true 
                this.isGameStarted = false;
                // hide the attack button 
                $("#attackBtn").addClass("d-none");
                // change the header content to reflect loss 
                $(".header span").text("The Dark Side has prevailed!");
                // unhide the reset button 
                $("#resetBtn").removeClass("d-none");


            }
            else {
                // update the character status with "defeated"
                var charCard = getCharacterCard(charCode);
                charCard.find(".card-stats p").text("Defeated!");
                charCard.addClass("characterHolderDefeated");
                charCard.removeClass("characterHolder");
                // set character with the appropriate index to isDefeated is true 
                if (charCode == "darthVader") {
                    rpgGame.characters[0].isDefeated = true;
                }
                else if (charCode == "obiWan") {
                    rpgGame.characters[1].isDefeated = true;
                }
                else if (charCode == "rey") {
                    rpgGame.characters[2].isDefeated = true;
                }
                else {
                    rpgGame.characters[3].isDefeated = true;
                }
                // check if there's more opponents to be played 
                if (this.opponentsRem > 1) {
                    // reduce opponents remaining by 1 
                    this.opponentsRem -= 1;
                    // place game in a state where the user can select another opponent 
                    // refresh the current player stats on the select screen
                    var refreshPlayerCard = getCharacterCard(rpgGame.playerCharacter.codeName);
                    refreshPlayerCard.find(".healthMetric").text(rpgGame.playerCharacter.healthPts.current);
                    refreshPlayerCard.find(".healthMetric").css("color", "red");
                    refreshPlayerCard.find(".healthMetric").css("font-weight", "bold");
                    refreshPlayerCard.find(".healthMetric").css("font-size", "12pt");
                    refreshPlayerCard.find(".attackMetric").text(rpgGame.playerCharacter.attackPts.current);
                    refreshPlayerCard.find(".attackMetric").css("color", "green");
                    refreshPlayerCard.find(".attackMetric").css("font-weight", "bold");
                    refreshPlayerCard.find(".attackMetric").css("font-size", "12pt");
                    this.isOpponentSelected = false;
                    rpgGame.updateProgress();
                    setTimeout(function () {
                        $("#charactersInit").removeClass("d-none");
                        $("#selectedCharactersSpace").addClass("d-none");
                        // invoke a message to the user that they've defeated the opponent 

                        $("#headerTitle").text("GO AGAIN!");
                        $("#headerMsg").text("Select Another Opponent")
                    }, 2000)

                }
                else {
                    // set isGameStarted to false 
                    this.isGameStarted = false;
                    // Change the header to show the game has been won!
                    $("#headerTitle").text("Well done, young Padawan!");
                    $("#headerMsg").text("You have mastered The Force!");
                    $("#resetFull").append(resetBtn);
                    $("#resetBtn").removeClass("d-none");

                    // hide selected characters space 
                    $("#selectedCharactersSpace").addClass("d-none");
                    // display the character init space for only the player character 
                    $("#charactersInit").removeClass("d-none");
                    var selectorTemp = getCharacterCard(rpgGame.playerCharacter.codeName);
                    $(selectorTemp).removeClass("d-none");
                    $(selectorTemp).removeClass("characterHolderSelected");
                    $(selectorTemp).addClass("winner");
                    // invoke a reset button for the user 
                }
            }
            // check if the character defeated is the last in contention 

        },
        updateProgress: function () {
            // set attack power values for user to see 
            $("#opponentAttackPwr").text(rpgGame.opponentCharacter.counterAttackPts);
            $("#playerAttackPwr").text(rpgGame.playerCharacter.attackPts.current);
            // calculate values for player & opponent health bars 
            var opponentProgress = Math.round((rpgGame.opponentCharacter.healthPts.current / rpgGame.opponentCharacter.healthPts.base) * 100);
            var playerProgress = Math.round((rpgGame.playerCharacter.healthPts.current / rpgGame.playerCharacter.healthPts.base) * 100);
            // set the opponent progress value to a string that can be passed to CSS 
            var opponentProgressPctStr = opponentProgress + "%";
            var playerProgressPctStr = playerProgress + "%";
            var playerProgressRatio = "(" + rpgGame.playerCharacter.healthPts.current + "/" + rpgGame.playerCharacter.healthPts.base + ")";
            var opponentProgressRatio = "(" + rpgGame.opponentCharacter.healthPts.current + "/" + rpgGame.opponentCharacter.healthPts.base + ")";
            $("#opponentHealthBar").text(opponentProgressRatio);
            $("#opponentHealthBar").css("width", opponentProgressPctStr);
            $("#playerHealthBar").text(playerProgressRatio);
            $("#playerHealthBar").css("width", playerProgressPctStr);


        },
        startGame: function () { //  
            // are both player and character selected? 
            if (rpgGame.isPlayerCharacterSelected && rpgGame.isOpponentSelected) {
                this.isGameStarted = true;

                $("#charactersInit").addClass("d-none");
                $("#selectedCharactersSpace").removeClass("d-none");
                $("#headerTitle").text("Ok...Battle!");
                $("#headerMsg").text("");
                rpgGame.updateProgress();
            }
            else {
                return 0;
            }

            // clear all appropriate screen areas 
        },
        resetGame: function () { // reset function??? 
            // just reload the page, way easier. 
            location.reload();



        }
    }

    // load page details 

    // load header message for page load 
    $("#headerTitle").text("Let's Play!");
    $("#headerMsg").text("Choose your character!");
    var alertMsg = $(".alert");


    // load character card stat metric text 
    // darth vader stats 
    $("#darthVaderHealthPts").text(rpgGame.characters[0].healthPts);
    $("#darthVaderAttackPts").text(rpgGame.characters[0].attackPts);
    $("#darthVaderCounterAttackPts").text(rpgGame.characters[0].counterAttackPts);

    // obi wan stats
    $("#obiWanHealthPts").text(rpgGame.characters[1].healthPts);
    $("#obiWanAttackPts").text(rpgGame.characters[1].attackPts);
    $("#obiWanCounterAttackPts").text(rpgGame.characters[1].counterAttackPts);

    // rey stats
    $("#reyHealthPts").text(rpgGame.characters[2].healthPts);
    $("#reyAttackPts").text(rpgGame.characters[2].attackPts);
    $("#reyCounterAttackPts").text(rpgGame.characters[2].counterAttackPts);

    // han solo stats 
    $("#hanHealthPts").text(rpgGame.characters[3].healthPts);
    $("#hanAttackPts").text(rpgGame.characters[3].attackPts);
    $("#hanCounterAttackPts").text(rpgGame.characters[3].counterAttackPts);

    // CHARACTER SELECTION BOX ON-CLICK EVENTS 
    // darthVader on click 
    darthVaderBox.on("click", function (event) {
        // if the game has started, clicking a character does nothing 
        if (rpgGame.isGameStarted || rpgGame.characters[0].isDefeated) {
            // return 0 
            return 0; 
        }
        else {
            // check if a playerCharacter and opponent are NOT selected 

            if ((rpgGame.isPlayerCharacterSelected == false) && (rpgGame.isOpponentSelected == false)) {
                // invoke select player for darth 
                rpgGame.selectCharacter("darthVader");
            }
            else if ((rpgGame.isPlayerCharacterSelected == true) && (rpgGame.isOpponentSelected == false)) {
                // invoke select opponent 
                rpgGame.selectOpponent("darthVader");
                // set the game ready to start 
                rpgGame.startGame();
            }
        }

    })

    // obiWan onclick 
    obiWanBox.on("click", function (event) {
        // if the game has started, clicking a character does nothing 
        if (rpgGame.isGameStarted || rpgGame.characters[1].isDefeated) {
            // do nothing 
        }
        else {
            // check if a playerCharacter and opponent are NOT selected 

            if ((rpgGame.isPlayerCharacterSelected == false) && (rpgGame.isOpponentSelected == false)) {
                // invoke select player for darth 
                rpgGame.selectCharacter("obiWan");
            }
            else if ((rpgGame.isPlayerCharacterSelected == true) && (rpgGame.isOpponentSelected == false)) {
                // invoke select opponent 
                rpgGame.selectOpponent("obiWan");
                // set the game ready to start 
                rpgGame.startGame();
            }
        }
    })

    // rey onclick 
    reyBox.on("click", function (event) {
        // if the game has started, clicking a character does nothing 
        if (rpgGame.isGameStarted || rpgGame.characters[2].isDefeated) {
            // do nothing 
        }
        else {
            // check if a playerCharacter and opponent are NOT selected 

            if ((rpgGame.isPlayerCharacterSelected == false) && (rpgGame.isOpponentSelected == false)) {
                // invoke select player for darth 
                rpgGame.selectCharacter("rey");
            }
            else if ((rpgGame.isPlayerCharacterSelected == true) && (rpgGame.isOpponentSelected == false)) {
                // invoke select opponent 
                rpgGame.selectOpponent("rey");
                // set the game ready to start 
                rpgGame.startGame();
            }
        }
    })

    // han onclick 

    hanSoloBox.on("click", function () {
        // if the game has started, clicking a character does nothing 
        if (rpgGame.isGameStarted || rpgGame.characters[3].isDefeated) {
            // do nothing 
        }
        else {
            // check if a playerCharacter and opponent are NOT selected 

            if ((rpgGame.isPlayerCharacterSelected == false) && (rpgGame.isOpponentSelected == false)) {
                // invoke select player for darth 
                rpgGame.selectCharacter("han");
            }
            else if ((rpgGame.isPlayerCharacterSelected == true) && (rpgGame.isOpponentSelected == false)) {
                // invoke select opponent 
                rpgGame.selectOpponent("han");
                // set the game ready to start 
                rpgGame.startGame();
            }
        }
    })

    // attack button onClick
    attackBtn.on("click", function () {

        if (rpgGame.isGameStarted) {

            rpgGame.playerCharacter.attack();
        }
        else {
            return 0;
        }
    })

    var resetBtn = $("#resetBtn");
    resetBtn.on("click", function () {
        location.reload();
    })

})
