$(document).ready(function () {
    // main code here 
    // global variables 
    var rpgGame = {
        isGameStarted: false,
        playerCharacter: {
            codeName: "",
            displayName: "", 
            healthPts: 0, 
            attackPts: {
                base: 0, 
                current: 0
            },
            counterAttackPts: 0, 
            isDefeated: false, 
            attack: function () {
                
                // reduce the opponent character object's health value 
                // invoke a counter attack on the playerCharacter (reduce playerChar health)
                // invoke a "check" status function 
                // to check health of opponent and character post-interaction
                // take the current attack value, increase by base value
                rpgGame.playerCharacter.attackPts.current += rpgGame.playerCharacter.attackPts.base;


            }
        },
        opponentCharacter: "", 
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
            }
            else if (charCode == "obiWan") {
                i = 1; 
            }
            else if (charCode == "rey") {
                i = 2; 
            }
            else if (charCode == "han") {
                i = 3; 
            }
            this.playerCharacter.codeName = this.characters[i].codeName;
            this.playerCharacter.displayName = this.characters[i].displayName;
            this.playerCharacter.healthPts = this.characters[i].healthPts;
            this.playerCharacter.attackPts.base = this.characters[i].attackPts;
            this.playerCharacter.counterAttackPts = this.characters[i].counterAttackPts;
            
            

            
            
        },
        selectOpponent: function (charCode) {
            this.opponentCharacter = charCode; 
        },
        startGame: function () {
            this.isGameStarted = true; 
        },
        endGame: function () {
            this.isGameStarted = false; 
        }
    }
    // events 
        // click any character 
        //
    rpgGame.selectCharacter("darthVader");
    console.log("Game Object");
    console.log(rpgGame);
    rpgGame.playerCharacter.attack();
    rpgGame.playerCharacter.attack();
    console.log("Player Character Object");
    console.log(rpgGame.playerCharacter);
})
