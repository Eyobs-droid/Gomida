const body = document.body;
const image = body.querySelector('#coin');
const h1 = body.querySelector('h1');

let coins = localStorage.getItem('coins');
let total = localStorage.getItem('total');
let power = localStorage.getItem('power');
let count = localStorage.getItem('count')

if(coins == null){
    localStorage.setItem('coins' , '0');
    h1.textContent = '0';
}else{
    h1.textContent = Number(coins).toLocaleString();
}

if(total == null){
    localStorage.setItem('total' , '500')
    body.querySelector('#total').textContent = '/500';
}else {
    body.querySelector('#total').textContent = `/${total}`;
}

if(power == null){
    localStorage.setItem('power' , '500');
    body.querySelector('#power').textContent = '500';
}else{
    body.querySelector('#power').textContent = power;
}

if(count == null){
    localStorage.setItem('count' , '1')
}

image.addEventListener('click' , (e)=> {
    let x = e.offsetX;
    let y = e.offsetY;

    navigator.vibrate(5);

    coins = localStorage.getItem('coins');
    power = localStorage.getItem('power');
    
    if(Number(power) > 0){
        localStorage.setItem('coins' , `${Number(coins) + 1}`);
        h1.textContent = `${(Number(coins) + 1).toLocaleString()}`;
    
        localStorage.setItem('power' , `${Number(power) - 1}`);
        body.querySelector('#power').textContent = `${Number(power) - 1}`;
    } 

    if(x < 150 & y < 150){
        image.style.transform = 'translate(-0.25rem, -0.25rem) skewY(-10deg) skewX(5deg)';
    }
    else if (x < 150 & y > 150){
        image.style.transform = 'translate(-0.25rem, 0.25rem) skewY(-10deg) skewX(5deg)';
    }
    else if (x > 150 & y > 150){
        image.style.transform = 'translate(0.25rem, 0.25rem) skewY(10deg) skewX(-5deg)';
    }
    else if (x > 150 & y < 150){
        image.style.transform = 'translate(0.25rem, -0.25rem) skewY(10deg) skewX(-5deg)';
    }

    setTimeout(()=>{
        image.style.transform = 'translate(0px, 0px)';
    }, 100);

    body.querySelector('.progress').style.width = `${(100 * power) / total}%`;
});

// Sample user data
let users = [
    { name: 'User1', coins: 1000 },
    { name: 'User2', coins: 1500 },
    { name: 'User3', coins: 1200 }
];

// Function to sort users by coins
function getLeaderboard(users) {
    return users.sort((a, b) => b.coins - a.coins);
}

// Function to display leaderboard
function displayLeaderboard(users) {
    const leaderboardContainer = document.querySelector('.leaderboard-container');
    leaderboardContainer.innerHTML = ''; // Clear existing content

    users.forEach((user, index) => {
        const userElement = document.createElement('div');
        userElement.className = 'leaderboard-item';
        userElement.innerHTML = `<span>${index + 1}. ${user.name} - ${user.coins} coins</span>`;
        leaderboardContainer.appendChild(userElement);
    });
}

// Initial display
const sortedUsers = getLeaderboard(users);
displayLeaderboard(sortedUsers);
