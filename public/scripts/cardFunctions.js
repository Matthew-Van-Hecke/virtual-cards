function rnd(s) {
    var t = 0,a = 0x83,b = 0x6A,w=0xFFFF;
    var k0=s>>24&0xFF, k1=(s>>16)&0xFF, k2=(s>>8)&0xFF, k3=s&0xFF;
    for (var i=0;i<32;i++) {
      t += 0x9E3779B9;
      t = t&0xFFFFFFFF;
      a = (a+(((b<<4)+k0) ^ (b+t) ^ ((b>>5)+k1)))&w;
      b = (b+(((a<<4)+k2) ^ (a+t) ^ ((a>>5)+k3)))&w;
    }
  return (a<<8)+b;
}
var i, ii, s = "CDHS",
  v = "234567890JQKA",
  c, l = 52,
  r;

function rst() {
  c = [];
  for (i in s.split("")) {
      for (ii in v.split("")) c.push(v[ii] + s[i]);
  }
  l = c.length;
}
rst();


function shuffle(p) {
  rst();
  var h = p;
  for (i in c) {
      ii = c[i];
      h = rnd(h);
      c[i] = c[h % l];
      c[h % l] = ii;
  }
}

// m: player number
// t: number of players
function dealHand(m, t, lim) {
  if (lim == undefined) lim = l;
  r = [];
  for (i = 0; i < lim; i++) {
      if (i % t == m) {
          r.push(c.shift());
      } else {
          c.shift();
      }
  }
  // Sort the cards in the hand, and return result
  return r.sort(function(a, b) {
      function gv(p) {
          return s.indexOf(p[1]) * 13 + v.indexOf(p[0]);
      }
      return (gv(a) - gv(b));
  });;
}

function dealCard() {
  l--;
  return c.shift();
}

function dealTexas(m, t) {
  return dealHand(m, t, t * 2);
}

/* GUI functions */

function getImageElement(card) {
var img_element = document.createElement("img");
img_element.setAttribute("class", "card-img");
img_element.setAttribute("src", 'https://deckofcardsapi.com/static/img/'+card+'.png');
img_element.id = card;
img_element.addEventListener("click", function () {
 console.clear();
 console.log(card);
 document.getElementById(card).style.display = 'none';
});
return img_element;
}

function runShuffle() {
  let shuffleInput = document.getElementById("shuffle-number").value;
  shuffle(shuffleInput);
}
function displayHand() {
let playerNumber = document.getElementById("player-number").value;
let playerCount = document.getElementById("number-of-players").value;
let cardsPerPerson = document.getElementById("cards-per-person").value;
let hand = dealHand(playerNumber, playerCount, cardsPerPerson*playerCount);
//let handImages = hand.map(c => "<img class='card-img' src='https://deckofcardsapi.com/static/img/"+c+".png' id=/""+c+"\">");
let handImages = hand.map(c => getImageElement(c));
document.getElementById("mycards").innerHTML = "";
for (var i = 0; i < handImages.length; i++) {
  document.getElementById("mycards").appendChild(handImages[i]);
}
//document.getElementById("mycards").innerHTML = handImages.join(" ");
}

function displayNextCard() {
let nextCard = getImageElement(dealCard());
document.getElementById("common-cards").appendChild(nextCard);
}