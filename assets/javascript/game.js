$(document).ready(function () {
    // main code here 
    // global variables 
    var rpgGame = {
        isGameStarted: false,
        isPlayerCharacterSelected: false, 
        isOpponentSelected: false, 
        opponentsRem: 0,
        playerCharacter: {
            codeName: "",
            displayName: "", 
            healthPts: {
                base: 0, 
                current: 0
            },
            attackPts: { // 
                base: 0, 
                current: 0
            },
            isDefeated: false, 
            attack: function () {
                // check if the attack will defeat the opponent 
                if (rpgGame.playerCharacter.attackPts.current >= rpgGame.opponentCharacter.healthPts.current) {
                    // set the opponent health to 0
                    rpgGame.opponentCharacter.healthPts.current = 0;
                    //invoke characterDefeated 
                    rpgGame.charDefeated("e"); 
                }
                else {
                    // reduce the opponent character object's health value
                    rpgGame.opponentCharacter.healthPts -= rpgGame.playerCharacter.attackPts.current;
                    // invoke a counter attack on the playerCharacter (reduce playerChar health)
                    // check whether this will defeat the player 
                    if (rpgGame.opponentCharacter.counterAttackPts >= rpgGame.playerCharacter.healthPts.current) {
                        // set player character health to 0 
                        rpgGame.playerCharacter.healthPts.current = 0;
                        // invoke charDefeated routine 
                        rpgGame.charDefeated("p"); 
                    }
                    else {
                        rpgGame.playerCharacter.healthPts.current -= rpgGame.opponentCharacter.counterAttackPts;
                        // take the current attack value, increase by base value
                        rpgGame.playerCharacter.attackPts.current += rpgGame.playerCharacter.attackPts.base;
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
            counterAttackPts: 0, 
            isDefeated: false
            },
        characters: [
            {
                codeName: "darthVader",
                displayName: "Darth Vader", 
                healthPts: 125,
                attackPts: 25,
                counterAttackPts: 25,
                isDefeated: false 
            },
            {
                codeName: "obiWan",
                displayName: "Obi-Wan Kenobi", 
                healthPts: 200,
                attackPts: 25,
                counterAttackPts: 35,
                isDefeated: false
            },
            {
                codeName: "rey",
                displayName: "Rey",
                healthPts: 100,
                attackPts: 35, 
                counterAttackPts: 30, 
                isDefeated: false 
            },
            {
                codeName: "han",
                displayName: "Han Solo",
                healthPts: 130, 
                attackPts: 15, 
                counterAttackPts: 25,  
                isDefeated: false 
            }
        ],
        // select character function 
        selectCharacter: function (charCode) {
            var i = 0; // setting initial index of the character in rpgGame object 
            // determine the player selected, set index value 
            if (charCode == "darthVader") {
                i = 0; 
                darthVaderBox.appendTo("#yourCharacterSpace");
            }
            else if (charCode == "obiWan") {
                i = 1; 
                obiWanBox.appendTo("#yourCharacterSpace");
            }
            else if (charCode == "rey") {
                i = 2; 
                reyBox.appendTo("#yourCharacterSpace");
            }
            else if (charCode == "han") {
                i = 3; 
                hanSoloBox.appendTo("#yourCharacterSpace")
            }
            this.playerCharacter.codeName = this.characters[i].codeName;
            this.playerCharacter.displayName = this.characters[i].displayName;
            this.playerCharacter.healthPts.base = this.characters[i].healthPts;
            this.playerCharacter.healthPts.current = this.playerCharacter.healthPts; 
            this.playerCharacter.attackPts.base = this.characters[i].attackPts;
            this.playerCharacter.counterAttackPts = this.characters[i].counterAttackPts;

            console.log(this.playerCharacter);

            // set game object state to player character selected 
            this.isPlayerCharacterSelected = true; 

            // can I start a round/game? 
            this.startGame()
        },
        selectOpponent: function (charCode) {
            // set indexes for the different characters 
            if (charCode == "darthVader") {
                i = 0; 
                darthVaderBox.appendTo("#currentOpponentBox");
            }
            else if (charCode == "obiWan") {
                i = 1; 
                obiWanBox.appendTo("#currentOpponentBox");
            }
            else if (charCode == "rey") {
                i = 2; 
                reyBox.appendTo("#currentOpponentBox");
            }
            else if (charCode == "han") {
                i = 3; 
                hanSoloBox.appendTo("#currentOpponentBox");
            } 
            // set the opponent character properties to selected opponent 
            this.opponentCharacter.codeName = this.characters[i].codeName; 
            this.opponentCharacter.displayName = this.characters[i].displayName;
            this.opponentCharacter.healthPts.base = this.characters[i].healthPts
            this.opponentCharacter.healthPts.current = this.characters[i].healthPts;
            this.opponentCharacter.counterAttackPts = this.characters[i].counterAttackPts;
            console.log(this.opponentCharacter);
            
            // set game object state to player character selected 
            this.isOpponentSelected = true; 

        },
        charDefeated: function (defeatCode) {
            // check if the char being evaluated is a player or opponent character
            // defeatCode: string: p --> player, anything else, enemy
            if (defeatCode == "p") {
                // set isCharacterDefeated to true 
                this.isGameStarted = false; 
                // give user a reset button 
                
            }
            else {
                // check if there's more opponents to be played 
                if (this.opponentsRem > 1) {
                    // remove the opponent from the defender area 
                    // place game in a state where the user can select another opponent 
                    this.isOpponentSelected = false; 
                    // invoke a message to the user that they've defeated the opponent 
                    // remove the opponent from the screen 
                    
                }
                else {
                    // set isGameStarted to false 
                    this.isGameStarted = false; 
                    // invoke a message to the user that they've beaten the specific opponent
                    // invoke a message that the user that they've beaten the game 
                    // invoke a reset button for the user 
                }
            }
            // check if the character defeated is the last in contention 
            
        },
        updateScreenArea: function () {

        },
        startGame: function () { //  
            // are both player and character selected? 
            if (rpgGame.isPlayerCharacterSelected && rpgGame.isOpponentSelected) {
                this.isGameStarted = true; 
            }
            
            // clear all appropriate screen areas 
        },
        resetGame: function () { // reset function??? 
            this.isGameStarted = false; 
        }
    }

    // debug stuff
    console.log("Game Object");
    console.log(rpgGame);
    

    // load all character boxes into their own containers 
    var darthVaderBox = $("#darthVader");
    var obiWanBox = $("#obiwan");
    var reyBox = $("#rey");
    var hanSoloBox = $("#han");
    
    // log those containers 
    

    // assign click events to each 
    // darthVader on click 
    darthVaderBox.on("click", function (event) {
        // if the game has started, clicking a character does nothing 
        if (rpgGame.isGameStarted == true) {
            // does nothing, maybe show something on screen? 
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
                rpgGame.isGameStarted = true; 
            }
        }
        
        

        
    })

    // obiWan onclick 
    obiWanBox.on("click", function (event) {
        alert("click");
        // if the game has started, clicking a character does nothing 
        if (rpgGame.isGameStarted == true) {
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
                rpgGame.isGameStarted = true; 
            }
        }
    })

    // rey onclick 
    reyBox.on("click", function (event) {
        alert("click");
        // if the game has started, clicking a character does nothing 
        if (rpgGame.isGameStarted == true) {
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
                rpgGame.isGameStarted = true; 
            }
        }
    })

    // han onclick 

    hanSoloBox.on("click", function () {
        alert("click");
        // if the game has started, clicking a character does nothing 
        if (rpgGame.isGameStarted == true) {
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
                rpgGame.isGameStarted = true; 
            }
        }
    })

})
