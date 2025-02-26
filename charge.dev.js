"use strict";

// Function to save the current timestamp
function saveTimestamp() {
  localStorage.setItem('lastQuitTime', new Date().getTime());
} // Function to calculate the time difference and refill charge accordingly


function handleGameEntry() {
  var lastQuitTime = localStorage.getItem('lastQuitTime');

  if (lastQuitTime) {
    var currentTime = new Date().getTime();
    var timeDifference = (currentTime - lastQuitTime) / 60000; // Convert milliseconds to minutes

    if (timeDifference >= 10) {
      // Refill the charge
      var power = localStorage.getItem('power');
      var total = localStorage.getItem('total');

      if (Number(total) > power) {
        localStorage.setItem('power', "".concat(Number(total)));
      }
    }
  }
} // Save the timestamp when the user quits the game


window.addEventListener('beforeunload', saveTimestamp); // Handle game entry and refill charge if necessary

window.addEventListener('load', handleGameEntry); // Remove or comment out the current setInterval function to stop auto-refill