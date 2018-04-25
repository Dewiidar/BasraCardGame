(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function () {

    var model = {
        player1: {
            score: 0,
            cards: [{ name: "1_of_clubs", value: 1 }]
        },
        player2: {
            score: 0,
            cards: []
        },
        tableCards: [],
        turn: "player1",
        round: 1,
        playedCard: null,
        randomCard: null,
        deck: [{ name: "1_of_clubs", value: 1 }, { name: "2_of_clubs", value: 2 }, { name: "3_of_clubs", value: 3 }, { name: "4_of_clubs", value: 4 }, { name: "5_of_clubs", value: 5 }, { name: "6_of_clubs", value: 6 }, { name: "7_of_clubs", value: 7 }, { name: "8_of_clubs", value: 8 }, { name: "9_of_clubs", value: 9 }, { name: "10_of_clubs", value: 10 }, { name: "jack_of_clubs", value: "J" }, { name: "king_of_clubs", value: "K" }, { name: "queen_of_clubs", value: "Q" }, { name: "1_of_diamonds", value: 1 }, { name: "2_of_diamonds", value: 2 }, { name: "3_of_diamonds", value: 3 }, { name: "4_of_diamonds", value: 4 }, { name: "5_of_diamonds", value: 5 }, { name: "6_of_diamonds", value: 6 }, { name: "7_of_diamonds", value: 7 }, { name: "8_of_diamonds", value: 8 }, { name: "9_of_diamonds", value: 9 }, { name: "10_of_diamonds", value: 10 }, { name: "jack_of_diamonds", value: "J" }, { name: "king_of_diamonds", value: "K" }, { name: "queen_of_diamonds", value: "Q" }, { name: "1_of_hearts", value: 1 }, { name: "2_of_hearts", value: 2 }, { name: "3_of_hearts", value: 3 }, { name: "4_of_hearts", value: 4 }, { name: "5_of_hearts", value: 5 }, { name: "6_of_hearts", value: 6 }, { name: "7_of_hearts", value: 7 }, { name: "8_of_hearts", value: 8 }, { name: "9_of_hearts", value: 9 }, { name: "10_of_hearts", value: 10 }, { name: "jack_of_hearts", value: "J" }, { name: "king_of_hearts", value: "K" }, { name: "queen_of_hearts", value: "Q" }, { name: "1_of_spades", value: 1 }, { name: "2_of_spades", value: 2 }, { name: "3_of_spades", value: 3 }, { name: "4_of_spades", value: 4 }, { name: "5_of_spades", value: 5 }, { name: "6_of_spades", value: 6 }, { name: "7_of_spades", value: 7 }, { name: "8_of_spades", value: 8 }, { name: "9_of_spades", value: 9 }, { name: "10_of_spades", value: 10 }, { name: "jack_of_spades", value: "J" }, { name: "king_of_spades", value: "K" }, { name: "queen_of_spades", value: "Q" }]
    };

    var controller = {
        init: function () {
            // set start values of the model & trigger the init function of the view

            view.init();
        },
        createNewDeck: function () {
            // instead of hard coding the deck
        },
        getPlayerCards: function (num) {
            return `model.player${num}.cards`; //Enter 1 or 2
        },
        getRandomCard: function (array) {
            var randomIndex = Math.floor(Math.random() * array.length); //4
            var randomCard = array[randomIndex];
            model.randomCard = randomCard;
        },
        // getRandomCardWithoutJack: function () {

        //     controller.getRandomCard(model.deck);
        //     if (model.randomCard.name.includes("jack")) {
        //         //get us another card
        //         controller.getRandomCardWithoutJack();
        //     } else {
        //         controller.pushCardsToArray(model.randomCard, model.tableCards);
        //     }
        // },
        getRandomCardWithoutJack: function (array) {
            while (model.randomCard.name.includes("jack")) {
                controller.getRandomCard(array);
                console.log(model.randomCard);
            }
            console.log(model.randomCard);
        },
        pushCardsToArray: function (card, array) {
            array.push(model.randomCard);
            model.randomCard = null;
        },
        spliceCardFromArray: function (card, array) {
            var cardIndex = array.indexOf(card);
            array.splice(cardIndex, 1);
            console.log(cardIndex); // testing
        }

    };

    var view = {
        init: function () {
            //get dom elements

            //render the view
            this.render();
        },
        render: function () {
            var jacksArray = [{ name: "jack_of_spades", value: "J" }, { name: "jack_of_hearts", value: "J" }, { name: "5_of_spades", value: 5 }, { name: "6_of_spades", value: 6 }];
            var gettingFirstRandomCard = controller.getRandomCard(jacksArray);
            var gettingRandomCard = controller.getRandomCardWithoutJack(jacksArray);
            // console.log(gettingRandomCard);
        }
    };

    controller.init();
})();

},{}]},{},[1]);
