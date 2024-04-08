let deckId = '';
let noOfCards = 52;
const dealOneCard = document.querySelector("#deal-one-card");
const dealTwoCards = document.querySelector("#deal-two-cards");
const dealThreeCards = document.querySelector("#deal-three-cards");
const startOver = document.querySelector("#start-over");
const drawnCards = document.querySelector("#drawn-cards");
const runOutWarning = document.querySelector("#run-out-warning");
const fewCardsWarning = document.querySelector("#few-cards-warning");

dealOneCard.addEventListener('click', function (event) {
    startDeal(1);
});
dealTwoCards.addEventListener('click', function (event) {
    startDeal(2);
});
dealThreeCards.addEventListener('click', function (event) {
    startDeal(3);
});



function startDeal (noOfCardsToDeal) {

    if (deckId == '') {

        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                deckId = data.deck_id;

                shuffled = true;
                startOver.toggleAttribute('disabled');

                drawCard(noOfCardsToDeal);
            })
            .catch(err => console.log(err))

    }
    else {
        drawCard(noOfCardsToDeal);
    }
}

function drawCard(noOfCardsToDeal) {
    fullUri = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${noOfCardsToDeal}`;

    fetch(fullUri)
        .then(res => res.json())
        .then(data => {

//            console.log(data);

            data.cards.forEach(element => {
                let div = document.createElement('div');
                div.className = "col d-flex align-items-stretch";
    
                let card = document.createElement('img');
                card.setAttribute('src', element.image);
                card.setAttribute('alt', `${element.value} OF ${element.suit}`);
                card.setAttribute('title', `${element.value} OF ${element.suit}`);
                card.className = "card-img-top pt-2";
    
                div.appendChild(card);
                drawnCards.appendChild(div);
            });


            noOfCards = data.remaining;
            // We are running low on cards in the deck
            if (noOfCards < 6) {
                fewCardsWarning.innerHTML = `The deck is running low, only ${noOfCards} cards left`;
                fewCardsWarning.classList.remove("collapse")
            }

            // We have run out of cards
            if (data.error != null) {
                runOutWarning.innerHTML = data.error;
                runOutWarning.classList.remove("collapse");
                fewCardsWarning.classList.add("collapse");
                dealOneCard.setAttribute('disabled', '');
                dealTwoCards.setAttribute('disabled', '');
                dealThreeCards.setAttribute('disabled', '');
            }


        })
        .catch(err => console.log(err))
}


startOver.addEventListener('click', function (event) {
    drawnCards.innerHTML = '';
    deckId = '';
    noOfCards = 52;
    startOver.toggleAttribute('disabled');
    runOutWarning.classList.add("collapse");
    runOutWarning.classList.add("collapse");
    dealOneCard.removeAttribute('disabled');
    dealTwoCards.removeAttribute('disabled');
    dealThreeCards.removeAttribute('disabled');
});
