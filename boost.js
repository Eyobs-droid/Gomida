charge.addEventListener('click', () => {
  if (canClaimReward()) {
    coins += 3; 
    localStorage.setItem('coins', coins); 
    body.querySelector('#balance').textContent = coins.toLocaleString(); 
    localStorage.setItem('lastClaimDate', today); 

    // Remove energy bar related code
    // let total = localStorage.getItem('total') || 0;
    // localStorage.setItem('power', total); 
  } else {
    alert('You can only claim this reward once a day.');
  }
});
