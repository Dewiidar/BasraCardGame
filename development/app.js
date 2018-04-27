(function () {

    var model = {
        player1: {
            score: 0,
            cards: []
        },
        player2: {
            score: 0,
            cards: []
        },
        tableCards: [],
        turn: 1,
        round: 1,
        chosenCard: null,
        chosenCardScore: 0,
        winningtableCards: [],
        winningChosenCard: [],
        randomCard: null,
        deck: [
            { name: "1_of_clubs", value: 1 },
            { name: "2_of_clubs", value: 2 },
            { name: "3_of_clubs", value: 3 },
            { name: "4_of_clubs", value: 4 },
            { name: "5_of_clubs", value: 5 },
            { name: "6_of_clubs", value: 6 },
            { name: "7_of_clubs", value: 7 },
            { name: "8_of_clubs", value: 8 },
            { name: "9_of_clubs", value: 9 },
            { name: "10_of_clubs", value: 10 },
            { name: "jack_of_clubs", value: "J" },
            { name: "king_of_clubs", value: "K" },
            { name: "queen_of_clubs", value: "Q" },

            { name: "1_of_diamonds", value: 1 },
            { name: "2_of_diamonds", value: 2 },
            { name: "3_of_diamonds", value: 3 },
            { name: "4_of_diamonds", value: 4 },
            { name: "5_of_diamonds", value: 5 },
            { name: "6_of_diamonds", value: 6 },
            { name: "7_of_diamonds", value: 7 },
            { name: "8_of_diamonds", value: 8 },
            { name: "9_of_diamonds", value: 9 },
            { name: "10_of_diamonds", value: 10 },
            { name: "jack_of_diamonds", value: "J" },
            { name: "king_of_diamonds", value: "K" },
            { name: "queen_of_diamonds", value: "Q" },

            { name: "1_of_hearts", value: 1 },
            { name: "2_of_hearts", value: 2 },
            { name: "3_of_hearts", value: 3 },
            { name: "4_of_hearts", value: 4 },
            { name: "5_of_hearts", value: 5 },
            { name: "6_of_hearts", value: 6 },
            { name: "7_of_hearts", value: 7 },
            { name: "8_of_hearts", value: 8 },
            { name: "9_of_hearts", value: 9 },
            { name: "10_of_hearts", value: 10 },
            { name: "jack_of_hearts", value: "J" },
            { name: "king_of_hearts", value: "K" },
            { name: "queen_of_hearts", value: "Q" },

            { name: "1_of_spades", value: 1 },
            { name: "2_of_spades", value: 2 },
            { name: "3_of_spades", value: 3 },
            { name: "4_of_spades", value: 4 },
            { name: "5_of_spades", value: 5 },
            { name: "6_of_spades", value: 6 },
            { name: "7_of_spades", value: 7 },
            { name: "8_of_spades", value: 8 },
            { name: "9_of_spades", value: 9 },
            { name: "10_of_spades", value: 10 },
            { name: "jack_of_spades", value: "J" },
            { name: "king_of_spades", value: "K" },
            { name: "queen_of_spades", value: "Q" }
        ]
    };

    var controller = {
        init: function () {
            // set start values of the model & trigger the init function of the view

            // Adding four random cards to player1,2 

            for (var j = 1; j < 3; j++) {
                // adding 4 cards per player
                for (var i = 0; i < 4; i++) {
                    controller.getRandomCard(model.deck);
                    controller.pushCardsToArray(model.randomCard, model[`player${j}`].cards);
                    controller.spliceCardFromArray(model.randomCard, model.deck);
                }
            }

            // adding cards to table
            for (var i = 0; i < 4; i++) {
                controller.getRandomCardWithoutJack(model.deck);
                controller.pushCardsToArray(model.randomCard, model.tableCards);
                controller.spliceCardFromArray(model.randomCard, model.deck);
            }


            view.init();
        },
        createNewDeck: function () {
            // instead of hard coding the deck
        },
        getPlayerCards: function (num) {
            return model[`player${num}`].cards; //Enter 1 or 2
        },
        getTableCards: function () {
            return model.tableCards; // table cards
        },
        getRandomCard: function (array) {
            var randomIndex = Math.floor(Math.random() * array.length);
            var randomCard = array[randomIndex];
            model.randomCard = randomCard;
        },
        getRandomCardWithoutJack: function (array) {
            controller.getRandomCard(array);
            while (model.randomCard.name.includes("jack")) {
                controller.getRandomCardWithoutJack(array);
            }
        },
        pushCardsToArray: function (card, array) {
            array.push(card);
        },
        spliceCardFromArray: function (card, array) {
            // var cardIndex = array.indexOf(card);
            var cardIndex = array.map(function (e) { return e.name; }).indexOf(card.name);
            array.splice(cardIndex, 1);
        },
        createHtmlCard: function (playerNum, containerDivSelector, array) {
            var playedCardsContainer = containerDivSelector;
            playedCardsContainer.innerHTML = '';
            for (var i = 0; i < array.length; i++) {
                var containerDiv = document.createElement('div');
                containerDiv.id = `playerCardContainer${i + 1}`;
                containerDiv.className = "cardStyle";

                var newtag = document.createElement('input');
                if (playerNum === "table") {
                    newtag.id = "tableCardInput";
                } else if (playerNum === 1) {
                    newtag.id = "player1CardInput";
                } else {
                    newtag.id = "player2CardInput";
                }
                newtag.type = "image";
                newtag.src = "images/" + array[i].name + ".png";
                newtag.dataset.name = array[i].name;
                newtag.dataset.value = array[i].value;
                newtag.alt = "Card" + (i + 1);
                containerDiv.appendChild(newtag);
                playedCardsContainer.appendChild(containerDiv);
            }
        },
        convertToANumber: function (numberString) {
            var parsed = parseFloat(numberString);
            if (isNaN(parsed)) {
                return numberString;
            } else {
                return parsed;
            }
        },
        setChosenCardOnClick: function (card) {
            // //convert data attributes to an object properties and assign them to chosenCard in model
            var chosenCardName = card.dataset.name;
            var chosenCardValue = controller.convertToANumber(card.dataset.value);
            var chosenCard = {
                name: chosenCardName,
                value: chosenCardValue
            };
            model.chosenCard = chosenCard;
        },
        putCardOntable: function (card) {
            controller.pushCardsToArray(model.chosenCard, model.tableCards);
            controller.spliceCardFromArray(model.chosenCard, model[`player${model.turn}`].cards);
        },
        alternateTurn: function () {
            if (model.turn === 1) {
                model.turn = 2;
            } else {
                model.turn = 1;
            }
        },
        addEventListenerOnTheCardsOfTurn: function () {
            view[`player${model.turn}InputCards`].forEach(function (element) {
                element.addEventListener('click', function (e) {
                    //assigning clicked card on model 
                    controller.setChosenCardOnClick(e.target);

                    //calc score 
                    controller.calcScore();

                    // Add card to table
                    controller.putCardOntable();

                    //change turn
                    controller.alternateTurn();
                    controller.incrementRound();

                    view.render();
                });
            });
        },
        findPossiblePairs: function (chosenCard, array, i) {
            var firstPair;
            let result = null;
            var subset = function subset_sum(numbers, target, partial) {
                let s, n, remaining;

                partial = partial || [];
                s = partial.reduce((a, b) => a + b, 0);

                if (s > target || partial.length > 4) return null;

                // check if the partial sum is equals to target
                if (s === target && partial.length == i) {
                    if (!result) result = [];
                    result.push(partial);
                    // console.log("%s=%s", partial.join("+"), target);
                }

                for (let i = 0; i < numbers.length; i++) {
                    n = numbers[i];
                    remaining = numbers.slice(i + 1);
                    subset_sum(remaining, target, partial.concat([n]));
                }
                return result;
            }
            return subset(array, chosenCard);
        },
        calcScore: function () {

            var score = model[`player${model.turn}`].score;
            var tableArray = model.tableCards;
            var chosenCard = model.chosenCard;

            //====================================================

            var chosenCardValue = chosenCard.value; //chosen card value
            var chosenCardName = chosenCard.name; // chosen card name

            var valuesArray = tableArray.map(function (elem) { return elem.value; }); // array of values of table array
            // Separating numbers from strings
            var numbersArray = [];
            var stringsArray = [];
            //numbers
            numbersArray = valuesArray.filter(function (elem) { return !isNaN(elem); });
            // strings
            stringsArray = valuesArray.filter(function (elem) { return isNaN(elem); });

            // calculate sum of numbers array
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            var sumOfNumbersArray = numbersArray.reduce(reducer);


            //===============Check possible pairs=================

            var PossiblePairs4 = controller.findPossiblePairs(chosenCardValue, numbersArray, 4); //sum of 4 cards
            var PossiblePairs3 = controller.findPossiblePairs(chosenCardValue, numbersArray, 3); //sum of 3 cards
            var PossiblePairs2 = controller.findPossiblePairs(chosenCardValue, numbersArray, 2); //sum of 2 cards
            var PossiblePairs1 = controller.findPossiblePairs(chosenCardValue, numbersArray, 1); //sum of 1 cards

            //====================================================

            //case card = sum of the table array & table array doesn't contain a NAN value  --> score = 10 + table.length
            if (!isNaN(chosenCard.value) && chosenCardValue === sumOfNumbersArray && stringsArray.length === 0) {
                score = score + 10 + numbersArray.length;
                console.log("case 1");
                console.log({ score });
            }
            // Case card = 7_of_diamonds or card is Jack it will collect all --> score = 1 + table.length
            else if (chosenCardName === "7_of_diamonds" || chosenCardName.includes("jack")) {
                score = score + 1 + tableArray.length;
                console.log({ score });
                console.log("case 2");
            }
            // if card equals sum of four cards on the table
            else if (!isNaN(chosenCard.value) && PossiblePairs4 !== null) {
                score = score + 4 + 1;
                console.log("case 3");
                console.log({ score });
                if (PossiblePairs1 !== null) {
                    score = score + 1;
                    console.log("case 4");
                }
            }
            // if card equals sum of 3 cards on the table
            else if (!isNaN(chosenCard.value) && PossiblePairs3 !== null) {
                score = score + 3 + 1;
                console.log("case 5");
                console.log({ score });
                if (PossiblePairs1 !== null) {
                    score = score + 1;
                    console.log("case 6");
                }
            }
            // if card equals sum of 2 cards on the table
            else if (!isNaN(chosenCard.value) && PossiblePairs2 !== null) {
                score = score + 2 + 1;
                console.log({ score });
                console.log("case 7");
                if (PossiblePairs1 !== null) {
                    score = score + 1;
                    console.log('hamada');
                    console.log({ score });
                    console.log("case 8");
                }
            }
            // if card equals sum of 1 card on the table
            else if (!isNaN(chosenCard.value) && PossiblePairs1 !== null) {
                score = score + 1 + 1;
                console.log({ score });
                console.log("case 9");
            }
            // if card is a string and exist on table
            else if (isNaN(chosenCard.value) && stringsArray.indexOf(chosenCardValue) !== -1) {
                score = score + 1 + 1;
                console.log({ score });
                console.log("case 10");
            }
            else {
                score = score;
                console.log("case 11");
            }

            model[`player${model.turn}`].score = score;
        },
        convertWinningCardsToObjects: function (winningPairs, tableArray) {
            var table = [
                { name: "8_of_spades", value: 8 },
                { name: "9_of_spades", value: 9 },
                { name: "10_of_spades", value: 10 },
                { name: "jack_of_spades", value: "J" }
            ];

            var winningPairs = [10, 9, "J"];

            var winningPairsObjArray = winningPairs.map(function (item) {
                var cardObj =  table.filter(function (elem) { return elem.value === item });
                return cardObj[0];
            });
            console.log(winningPairsObjArray);
            model.winningCards = [...winningPairsObjArray];
            console.log(model.winningCards);
        },
        displayTurn: function (turnContainer) {
            var turnContainerDiv = turnContainer;
            turnContainerDiv.innerHTML = "Turn: Player" + model.turn;
        },
        displayRound: function (roundContainer) {
            var roundContainerDiv = roundContainer;
            roundContainerDiv.innerHTML = "Round: " + model.round;
        },
        displayScore: function () {
            var previousTurn;
            if (model.turn === 2) {
                previousTurn = 1;
            } else {
                previousTurn = 2;
            }
            var scoreContainerDiv = view[`scoreContainerDivPlayer${previousTurn}`];

            scoreContainerDiv.innerHTML = "Score: " + model[`player${previousTurn}`].score;
        },
        incrementRound: function () {
            model.round++;
        }

    };

    var view = {
        init: function () {

            //get card container divs from the DOM
            this.player1CardsContainerDiv = document.querySelector('#player1Cards');
            this.player2CardsContainerDiv = document.querySelector('#player2Cards');
            this.tableCardsContainerDiv = document.querySelector('#tableCards');

            //get turn & round
            this.turnContainerDiv = document.querySelector('#turn');
            this.roundContainerDiv = document.querySelector('#round');
            this.scoreContainerDivPlayer1 = document.querySelector('#scorePlayer1');
            this.scoreContainerDivPlayer2 = document.querySelector('#scorePlayer2');

            //render the view
            this.render();
        },
        render: function () {
            //get cards array from model
            this.player1Cards = controller.getPlayerCards(1);
            this.player2Cards = controller.getPlayerCards(2);
            this.tableCards = controller.getTableCards();

            //create node elements from the above arrays
            controller.createHtmlCard(1, this.player1CardsContainerDiv, view.player1Cards);
            controller.createHtmlCard(2, this.player2CardsContainerDiv, view.player2Cards);
            controller.createHtmlCard('table', this.tableCardsContainerDiv, view.tableCards);

            //===================For Event Listening====================================
            //get all players' input cards
            this.player1InputCards = document.querySelectorAll('#player1CardInput');
            this.player2InputCards = document.querySelectorAll('#player2CardInput');

            // EventListeners
            controller.addEventListenerOnTheCardsOfTurn();

            // Display turn & round
            controller.displayTurn(this.turnContainerDiv);
            controller.displayRound(this.roundContainerDiv);
            controller.displayScore();
        }
    };

    controller.init();
}());