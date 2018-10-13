$(document).ready(function () {
    // main code here 
    // global variables 
    var rpgGame = {
        endState: true,
        playerCharacter: {
            codeName: "",
            displayName: "", 
            healthPts: 0, 
            attackPts: 0, 
            counterAttackPts: 0, 
            isDefeated: false 
        },
        opponentCharacter: "", 
        characters: [
            {
                codeName: "darthVader",
                displayName: "Darth Vader", 
                healthPts: 500,
                attackPts: 200,
                counterAttackPts: 200,
                isDefeated: false 
            },
            {
                codeName: "obiWan",
                displayName: "Obi-Wan Kenobi", 
                healthPts: 500,
                attackPts: 200,
                counterAttackPts: 200,
                isDefeated: false
            },
            {
                codeName: "rey",
                displayName: "Rey",
                healthPts: 500,
                attackPts: 200, 
                counterAttackPts: 200, 
                isDefeated: false 
            },
            {
                codeName: "han",
                displayName: "Han Solo",
                healthPts: 500, 
                attackPts: 200, 
                counterAttackPts: 200,  
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
            this.playerCharacter.attackPts = this.characters[i].attackPts;
            this.playerCharacter.counterAttackPts = this.characters[i].counterAttackPts;
            console.log("Player Character Object");
            console.log(this.playerCharacter);

            
            
        },
        selectOpponent: function (charCode) {
            this.opponentCharacter = charCode; 
        },
        startGame: function () {
            this.endState = false; 
        },
        attack: function () {

        }
    }
    // events 
        // click any character 
        //
    rpgGame.selectCharacter("darthVader");
    console.log("Game Object");
    console.log(rpgGame);
})
