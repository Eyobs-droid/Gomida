var timeEngine = {
    progressTimer: '',
    timeLeft: 0,
    levelTime: 0,
    progressValue: 100,
    endingSound: false,
    start: function(time) { // play time in seconds
      timeEngine.timeLeft = time;
      // Every 0.1 of a second
      timeEngine.progressTimer = setInterval(function(){timeEngine.updateTimeProgress(time)}, 100);
    },
    stop: function() {
      clearInterval(timeEngine.progressTimer);
      gmStatsTimeProgress.classList.remove('switchColors-animation'); // remove the animation red/blue on the bar
      if (timeEngine.endingSound) {
        timeEngine.endingSound = false;
        audioPool.stopSound(timeAlmostUp); // stop playing the ending sound
      }
    },
    resume: function() { // continue from where it stopped
      timeEngine.start(timeEngine.timeLeft);
    },
    reset: function() {
      timeEngine.stop();
      timeEngine.timeLeft = 0;
      timeEngine.progressValue = 100;
      timeEngine.progressValue = timeEngine.progressValue; // Progress bar value
      gmStatsTimeProgress.style.width = timeEngine.progressValue + "%";
    },
    updateTimeProgress: function(time) {
      // Subtract (100 / total game play time / 10)
      // 10 to make it smaller, and the time is 0.1 of a second (100ms)
      // 100ms is the time in the Start function
      timeEngine.timeLeft = timeEngine.timeLeft - (1/10); // update time left
    }
  }