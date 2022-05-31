/*document.addEventListener('DOMContentLoaded', ()=> {
    const button = document.createElement('button');
    
    let count = 0;

    function increment(){
        button.textContent = count++;
    }

    increment();
    button.addEventListener('click', increment);

    document.body.append(button);
});*/

/*(()=>{
    const WAIT_TIME_MS = 300;

    const textInput = document.createElement('input');
    const display = document.createElement('div');

    let timeout;

    textInput.addEventListener('input', ()=>{
        clearTimeout(timeout);

        timeout = setTimeout(()=>{
            display.textContent = textInput.value
        }, WAIT_TIME_MS);
    })

    document.addEventListener('DOMContentLoaded', ()=>{
        document.body.append(textInput);
        document.body.append(display);   
    });
})();*/

const myCards = document.getElementById("container");
let resultsArray = [];
const images = ["1", "2", "3", "4", "5", "6", "7", "8"];

var clone = images.slice(0);
var cards = images.concat(clone);
const newGame = function () {
  let counter = 00;
  myCards.innerHTML = "";
  function shuffle(o) {
    for (
      var j, x, i = o.length;
      i;
      j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    );
    return o;
  }
  shuffle(cards);

  for (var i = 0; i < cards.length; i++) {
    card = document.createElement("div");
    card.dataset.item = cards[i];
    card.dataset.view = "card";
    myCards.appendChild(card);

    card.onclick = function () {
      if (this.className != "flipped" && this.className != "correct") {
        this.className = "flipped";
        var result = this.dataset.item;
        resultsArray.push(result);
      }
      if (resultsArray.length > 1) {
        if (resultsArray[0] === resultsArray[1]) {
          check("correct");
          counter++;
          win();
          resultsArray = [];
        } else {
          check("reverse");
          resultsArray = [];
        }
      }
    };
  }

  window.onload = function () {
    document.body.onclick = function (e) {
      e = e || event;
      var target = e.target || e.srcElement;
      if (target.className != "flipped") return;
    };
  };

  const check = function (className) {
    var x = document.getElementsByClassName("flipped");

    setTimeout(function () {
      for (var i = x.length - 1; i >= 0; i--) {
        x[i].className = className;
      }
    }, 500);
  };

  const win = function () {
    if (counter === images.length) {
      setTimeout(function () {
        let NButton = document.createElement("button");
        NButton.innerText = "Новая игра";
        myCards.append(NButton);

        NButton.onclick = function () {
          newGame();
        };
      }, 1000);
    }
  };
};

newGame();
