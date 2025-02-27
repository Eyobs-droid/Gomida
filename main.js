const body = document.body;
const image = body.querySelector('#coin');
const h1 = body.querySelector('h1');

let coins = localStorage.getItem('coins');
let total = localStorage.getItem('total');
let power = localStorage.getItem('power');
let count = localStorage.getItem('count');

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
    body.querySelector('#total').textContent = `/${total}`;
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

image.addEventListener('click', (e) => {
    let x = e.offsetX;
    let y = e.offsetY;

    navigator.vibrate(5);

    coins = localStorage.getItem('coins');
    power = localStorage.getItem('power');

    if (Number(power) > 0) {
        localStorage.setItem('coins', `${Number(coins) + 1}`);
        h1.textContent = `${(Number(coins) + 1).toLocaleString()}`;

        localStorage.setItem('power', `${Number(power) - 1}`);
        body.querySelector('#power').textContent = `${Number(power) - 1}`;

        // Add animation code here
        for (let i = 0; i < 5; i++) {
            let coin = document.createElement('div');
            coin.className = 'tiny-coin';
            coin.style.left = `${x}px`;
            coin.style.top = `${y}px`;
            body.appendChild(coin);
            setTimeout(() => {
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

    setTimeout(() => {
        image.style.transform = 'translate(0px, 0px)';
    }, 100);

    body.querySelector('.progress').style.width = `${(100 * power) / total}%`;
});

// Timer functionality
let timer = 60;
let timerInterval;

function startTimer() {
    timerInterval = setInterval(() => {
        if (timer > 0) {
            timer--;
            body.querySelector('#timer').textContent = timer;
        } else {
            clearInterval(timerInterval);
            image.removeEventListener('click', handleCoinClick);
            alert('Time is up! Please wait for the timer to refill.');
        }
    }, 1000);
}

function resetTimer() {
    timer = 60;
    body.querySelector('#timer').textContent = timer;
    image.addEventListener('click', handleCoinClick);
}

function handleCoinClick(e) {
    // existing code...
}

// Start timer on page load
startTimer();

// Reset timer after user quits the game for a while (this is just a simulation)
setTimeout(resetTimer, 60000); // 1 minute
