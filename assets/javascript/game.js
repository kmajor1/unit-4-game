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
    var obiWanBox = $("#obiwan");
    var reyBox = $("#rey");
    var hanSoloBox = $("#han");

    // load attack button 
    var attackBtn = $("#attackBtn");

    // load the player and opponent images into their own containers 
    var playerImg = $(".playerIMG"); 
    var opponentImg = $(".opponentIMG");
    console.log(playerImg);

    // load player and opponent labels 
    var playerLabel = $("#playerLabel");
    var opponentLabel = $("#opponentLabel");



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
                    console.log("running defeat opponent block");
                    // set the opponent health to 0
                    rpgGame.opponentCharacter.healthPts.current = 0;
                    rpgGame.updateProgress();
                    //invoke characterDefeated 
                    rpgGame.charDefeated("e"); 
                }
                else {
                    // reduce the opponent character object's health value
                    console.log("Running normal attack");
                    console.log("current opp  health b4 attack");
                    console.log("player char health pts");
                    console.log(rpgGame.playerCharacter.healthPts.current);
                    console.log(rpgGame.opponentCharacter.healthPts.current);
                    console.log("player har attack pts right now");
                    console.log(rpgGame.playerCharacter.attackPts.current);
                    rpgGame.opponentCharacter.healthPts.current -= rpgGame.playerCharacter.attackPts.current;
                    console.log("after attack");
                    console.log(rpgGame.opponentCharacter.healthPts.current);
                    // calculate progress bar value 
                    rpgGame.updateProgress();
                    // var opponentProgress = (rpgGame.opponentCharacter.healthPts.current/rpgGame.opponentCharacter.healthPts.base)*100;
                    // var playerProgress = (rpgGame.playerCharacter.healthPts.current/rpgGame.playerCharacter.healthPts.base)*100;
                    console.log("opp progress");
                    // console.log(opponentProgress);
                    // $("#opponentHealthBar").text(opponentProgress);
                    
                    // invoke a counter attack on the playerCharacter (reduce playerChar health)
                    
                    // check whether this will defeat the player 
                        if (rpgGame.opponentCharacter.counterAttackPts >= rpgGame.playerCharacter.healthPts.current) {
                            // set player character health to 0 
                            console.log("running defeat player block");
                            rpgGame.playerCharacter.healthPts.current = 0;
                            // update the progress bar for the player character 
                            // invoke charDefeated routine 
                            rpgGame.charDefeated("p"); 
                        }
                        else {
                            console.log("running player keeps going after counterattack");
                            rpgGame.playerCharacter.healthPts.current -= rpgGame.opponentCharacter.counterAttackPts;
                            // display result of this counter attack 
                            // var playerProgress = (rpgGame.playerCharacter.healthPts.current/rpgGame.playerCharacter.healthPts.base)*100;
                            // $("#playerHealthBar").text(playerProgress);
                            rpgGame.updateProgress();
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
            attackPts: 0, 
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
            console.log("this for select char")
            console.log(this);
            var i = 0; // setting initial index of the character in rpgGame object 
            // determine the player selected, set index value 
            // cannot select same player and opponent 
            if (rpgGame.opponentCharacter.codeName == charCode) {
                return 0 
            }
            else {
                if (charCode == "darthVader") {
                    i = 0; 
                    playerImg.attr("src",images[i]);
                    darthVaderBox.addClass("d-none");
                    playerLabel.text("Darth Vader");
                    
                }
                else if (charCode == "obiWan") {
                    i = 1; 
                    playerImg.attr("src",images[i]);
                    obiWanBox.addClass("d-none");
                    playerLabel.text("Obi Wan");
                }
                else if (charCode == "rey") {
                    i = 2; 
                    playerImg.attr("src",images[i]);
                    reyBox.addClass("d-none");
                    playerLabel.text("Rey");
                }
                else if (charCode == "han") {
                    i = 3; 
                    playerImg.attr("src",images[i]);
                    hanSoloBox.addClass("d-none");
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
                console.log("isPlayerCharacterSelected");
                console.log(this.isPlayerCharacterSelected);
            }
            

        },
        selectOpponent: function (charCode) {
            // set indexes for the different characters 
            // cannot select opponent that is already player character
            if (rpgGame.playerCharacter.codeName == charCode) {
                return 0 
            }
            else {
                if (charCode == "darthVader") {
                
                    i = 0; 
                    opponentImg.attr("src", images[i]);
                    darthVaderBox.addClass("d-none");
                    opponentLabel.text("Darth Vader");
                }
                else if (charCode == "obiWan") {
                    i = 1; 
                    opponentImg.attr("src", images[i]);
                    obiWanBox.addClass("d-none");
                    opponentLabel.text("Obi Wan");
                }
                else if (charCode == "rey") {
                    i = 2; 
                    opponentImg.attr("src", images[i]);
                    reyBox.addClass("d-none");
                    opponentLabel.text("Rey");
                }
                else if (charCode == "han") {
                    i = 3; 
                    opponentImg.attr("src", images[i]);
                    hanSoloBox.addClass("d-none");
                    opponentLabel.text("Han Solo");
                } 
                // set the opponent character properties to selected opponent 
                console.log("this object");
                console.log(this);
                this.opponentCharacter.codeName = this.characters[i].codeName;
                this.opponentCharacter.displayName = this.characters[i].displayName;
                this.opponentCharacter.healthPts.base = this.characters[i].healthPts;
                this.opponentCharacter.healthPts.current = this.characters[i].healthPts; 
                this.opponentCharacter.attackPts = this.characters[i].attackPts;
                this.opponentCharacter.counterAttackPts = this.characters[i].counterAttackPts;
                
                console.log(this.opponentCharacter);
                
                // set game object state to player character selected 
                this.isOpponentSelected = true; 
    
            }
            
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
                    console.log("running CharDefeated, opp rem > 1")
                    // remove the opponent from the defender area 
                    $(".opponentIMG").attr("src", "https://via.placeholder.com/150X150/");
                    // place game in a state where the user can select another opponent 
                    console.log(this);
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
        updateProgress: function () {
            var opponentProgress = (rpgGame.opponentCharacter.healthPts.current/rpgGame.opponentCharacter.healthPts.base)*100;
            var playerProgress = (rpgGame.playerCharacter.healthPts.current/rpgGame.playerCharacter.healthPts.base)*100;
            $("#opponentHealthBar").text(opponentProgress);
            $("#playerHealthBar").text(playerProgress);

        },
        startGame: function () { //  
            // are both player and character selected? 
            if (rpgGame.isPlayerCharacterSelected && rpgGame.isOpponentSelected) {
                this.isGameStarted = true; 
                this.opponentsRem = 2; 
                $("#charactersInit").addClass("d-none");
                // TODO: Fix this if there's time 
                // $("#charactersInit").fadeOut("slow", function () {
                //     var battleLabelDiv = $("<div>");
                //     console.log(battleLabelDiv);
                //     battleLabelDiv.html("<h1>Battle Time</h1>");
                //     console.log(battleLabelDiv);
                //     $("#charactersInit").append(battleLabelDiv); 
                //     console.log($("#charactersInit"));

                // });
                // $("#charactersInit").css("display", "block");
                // $("#charactersInit").addClass("d-none");

                
                
                
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

    // load page details 
    // load character card stat metric text 
    console.log(rpgGame.characters[0].healthPts);
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
    console.log("attackptsHna");
    console.log(rpgGame.characters[3].counterAttackPts);

    // CHARACTER SELECTION BOX ON-CLICK EVENTS 
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
                rpgGame.startGame();
            }
        }
        
        

        
    })

    // obiWan onclick 
    obiWanBox.on("click", function (event) {
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
                rpgGame.startGame(); 
            }
        }
    })

    // rey onclick 
    reyBox.on("click", function (event) {
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
                rpgGame.startGame(); 
            }
        }
    })

    // han onclick 

    hanSoloBox.on("click", function () {
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
            
        }
    })

})
