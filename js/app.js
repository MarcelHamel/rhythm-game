document.addEventListener('DOMContentLoaded', function(){

  // Variables which check for game state and store user input
  var playbackSequence = [[1,2],[],[1,2],[2],[1],[2],[1,2],[2]];
  var userSequence = [[],[],[],[],[],[],[],[]];

  // Set tempo functionality
  var bpm = 312
  var newTempo = function(input) {
    var interval = document.querySelector('input').value;
    bpm = 60000 / (input * 2);
  }

  // Halts animation class... SEE README
  function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('lit');
  }
  // Animation event listeners... SEE README
  const keys = document.querySelectorAll('.key');
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));

  // Playback functionality
  var playSequence = function(rhythm) {
    var seqPos = 0;
      setInterval(function(){
        rhythm[seqPos].forEach(function(i){
            var audio = document.querySelector(`audio.dataset.note='${i}'`);
            audio.currentTime = 0;
            audio.play();
          });
        var light = document.querySelector(`.light #${seqPos}`);
        light.classList.add('lit');
        if (rhythm[seqPos].length > 0) {
          document.querySelector(`.key.id = ${seqPos}`)
                  .classList
                  .add('lit');
        }
      }, bpm);
  };

  //Sequence Key event listener
  document.querySelectorAll('.key').forEach(function(key) {
    key.addEventListener('click', function(){
      this.classList.toggle('key-select');
      var i = parseInt(this.id);
      userSequence[i].includes(2) ? userSequence[i].pop()
                                  : userSequence[i].push(2);
      console.log(userSequence);
    });
  });




});
