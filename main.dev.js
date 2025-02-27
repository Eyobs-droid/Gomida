"use strict";

var body = document.body;
var image = body.querySelector('#coin');
var h1 = body.querySelector('h1');
var coins = localStorage.getItem('coins');
var total = localStorage.getItem('total');
var power = localStorage.getItem('power');
var count = localStorage.getItem('count');

if (coins == null) {
  localStorage.setItem('coins', '0');
  h1.textContent = '0';
} else {
  h1.textContent = Number(coins).toLocaleString();
}

if (total == null) {
  localStorage.setItem('total', '500');
  body.querySelector('#total').textContent = '/500';
} else {
  body.querySelector('#total').textContent = "/".concat(total);
}

if (power == null) {
  localStorage.setItem('power', '500');
  body.querySelector('#power').textContent = '500';
} else {
  body.querySelector('#power').textContent = power;
}

if (count == null) {
  localStorage.setItem('count', '1');
}

image.addEventListener('click', function (e) {
  var x = e.offsetX;
  var y = e.offsetY;
  navigator.vibrate(5);
  coins = localStorage.getItem('coins');
  power = localStorage.getItem('power');

  if (Number(power) > 0) {
    localStorage.setItem('coins', "".concat(Number(coins) + 1));
    h1.textContent = "".concat((Number(coins) + 1).toLocaleString());
    localStorage.setItem('power', "".concat(Number(power) - 1));
    body.querySelector('#power').textContent = "".concat(Number(power) - 1);

    // Add animation code here
    for (var i = 0; i < 5; i++) {
      var coin = document.createElement('div');
      coin.className = 'tiny-coin';
      coin.style.left = "".concat(x, "px");
      coin.style.top = "".concat(y, "px");
      body.appendChild(coin);
      setTimeout(function () {
        coin.remove();
      }, 1000);
    }
  }

  if (x < 150 & y < 150) {
    image.style.transform = 'translate(-0.25rem, -0.25rem) skewY(-10deg) skewX(5deg)';
  } else if (x < 150 & y > 150) {
    image.style.transform = 'translate(-0.25rem, 0.25rem) skewY(-10deg) skewX(5deg)';
  } else if (x > 150 & y > 150) {
    image.style.transform = 'translate(0.25rem, 0.25rem) skewY(10deg) skewX(-5deg)';
  } else if (x > 150 & y < 150) {
    image.style.transform = 'translate(0.25rem, -0.25rem) skewY(10deg) skewX(-5deg)';
  }

  setTimeout(function () {
    image.style.transform = 'translate(0px, 0px)';
  }, 100);
  body.querySelector('.progress').style.width = "".concat(100 * power / total, "%");
});

// Timer functionality
var timer = 60;
var timerInterval;

function startTimer() {
  timerInterval = setInterval(function () {
    if (timer > 0) {
      timer--;
      body.querySelector('#timer').textContent = timer;
    } else {
      clearInterval(timerInterval);
      image.removeEvent
