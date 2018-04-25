(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
        turn: "player1",
        round: 1,
        chosenCard: {
            name: null,
            value: null
        },
        randomCard: null,
        deck: [{ name: "1_of_clubs", value: 1 }, { name: "2_of_clubs", value: 2 }, { name: "3_of_clubs", value: 3 }, { name: "4_of_clubs", value: 4 }, { name: "5_of_clubs", value: 5 }, { name: "6_of_clubs", value: 6 }, { name: "7_of_clubs", value: 7 }, { name: "8_of_clubs", value: 8 }, { name: "9_of_clubs", value: 9 }, { name: "10_of_clubs", value: 10 }, { name: "jack_of_clubs", value: "J" }, { name: "king_of_clubs", value: "K" }, { name: "queen_of_clubs", value: "Q" }, { name: "1_of_diamonds", value: 1 }, { name: "2_of_diamonds", value: 2 }, { name: "3_of_diamonds", value: 3 }, { name: "4_of_diamonds", value: 4 }, { name: "5_of_diamonds", value: 5 }, { name: "6_of_diamonds", value: 6 }, { name: "7_of_diamonds", value: 7 }, { name: "8_of_diamonds", value: 8 }, { name: "9_of_diamonds", value: 9 }, { name: "10_of_diamonds", value: 10 }, { name: "jack_of_diamonds", value: "J" }, { name: "king_of_diamonds", value: "K" }, { name: "queen_of_diamonds", value: "Q" }, { name: "1_of_hearts", value: 1 }, { name: "2_of_hearts", value: 2 }, { name: "3_of_hearts", value: 3 }, { name: "4_of_hearts", value: 4 }, { name: "5_of_hearts", value: 5 }, { name: "6_of_hearts", value: 6 }, { name: "7_of_hearts", value: 7 }, { name: "8_of_hearts", value: 8 }, { name: "9_of_hearts", value: 9 }, { name: "10_of_hearts", value: 10 }, { name: "jack_of_hearts", value: "J" }, { name: "king_of_hearts", value: "K" }, { name: "queen_of_hearts", value: "Q" }, { name: "1_of_spades", value: 1 }, { name: "2_of_spades", value: 2 }, { name: "3_of_spades", value: 3 }, { name: "4_of_spades", value: 4 }, { name: "5_of_spades", value: 5 }, { name: "6_of_spades", value: 6 }, { name: "7_of_spades", value: 7 }, { name: "8_of_spades", value: 8 }, { name: "9_of_spades", value: 9 }, { name: "10_of_spades", value: 10 }, { name: "jack_of_spades", value: "J" }, { name: "king_of_spades", value: "K" }, { name: "queen_of_spades", value: "Q" }]
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
            var cardIndex = array.map(function (e) {
                return e.name;
            }).indexOf(card.name);
            console.log(cardIndex); //testing
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
                } else {
                    newtag.id = "playerCardInput";
                }
                newtag.type = "image";
                newtag.src = "images/" + array[i].name + ".png";
                newtag.dataset.name = array[i].name;
                newtag.dataset.value = array[i].value;
                newtag.alt = "Card" + (i + 1);
                containerDiv.appendChild(newtag);
                console.log(containerDiv); //testing
                playedCardsContainer.appendChild(containerDiv);
            }
        },
        setChosenCard: function () {},
        putCardOntable: function (card) {
            // pushCardsToArray(card, model.tableCards);
            console.dir(card);

            // //convert data attributes to an object properties and assign them to chosenCard in model
            model.chosenCard.name = card.dataset.name;
            model.chosenCard.value = card.dataset.value;

            console.log(model.chosenCard);
            controller.pushCardsToArray(model.chosenCard, model.tableCards);

            console.table(model.tableCards);
            controller.spliceCardFromArray(model.chosenCard, model.player1.cards);

            console.table(model.player1.cards);
            view.render();
        }

    };

    var view = {
        init: function () {

            //get card container divs from the DOM
            this.player1CardsContainerDiv = document.querySelector('#player1Cards');
            this.player2CardsContainerDiv = document.querySelector('#player2Cards');
            this.tableCardsContainerDiv = document.querySelector('#tableCards');

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

            //get all players' input cards
            this.playerInputCards = document.querySelectorAll('#playerCardInput');
            console.log(this.playerInputCards); //testing

            // EventListeners
            this.playerInputCards.forEach(function (element) {
                element.addEventListener('click', function () {
                    controller.putCardOntable(element);
                });
            });
        }
    };

    controller.init();
})();

},{}]},{},[1]);
