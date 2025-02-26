// Function to save the current timestamp
function saveTimestamp() {
    localStorage.setItem('lastQuitTime', new Date().getTime());
}

// Function to calculate the time difference and refill charge accordingly
function handleGameEntry() {
    const lastQuitTime = localStorage.getItem('lastQuitTime');
    if (lastQuitTime) {
        const currentTime = new Date().getTime();
        const timeDifference = (currentTime - lastQuitTime) / 60000; // Convert milliseconds to minutes
        if (timeDifference >= 10) {
            // Refill the charge
            let power = localStorage.getItem('power');
            let total = localStorage.getItem('total');
            if (Number(total) > power) {
                localStorage.setItem('power', `${Number(total)}`);
            }
        }
    }
}

// Save the timestamp when the user quits the game
window.addEventListener('beforeunload', saveTimestamp);

// Handle game entry and refill charge if necessary
window.addEventListener('load', handleGameEntry);

// Remove or comment out the current setInterval function to stop auto-refill

