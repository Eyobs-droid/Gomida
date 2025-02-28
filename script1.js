let balance = 0; 

function updateBalance() {
    document.getElementById('balance').textContent = balance;
}

function handleTurboClick() {
    balance += 60;
    updateBalance();
}

function handleFullEnergyClick() {
    balance += 100;
    updateBalance();
}

document.getElementById('turbo').addEventListener('click', handleTurboClick);
document.getElementById('charge').addEventListener('click', handleFullEnergyClick);

document.getElementById('joinTelegramLink').addEventListener('click', function() {
    fetch('/process_form.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: 'join_telegram',
            user_id: /* user ID */
        })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Handle success
        balance += 2500;
        updateBalance();
    })
    .catch(error => console.error('Error:', error));
});

updateBalance();
