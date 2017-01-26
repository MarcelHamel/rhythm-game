document.addEventListener('DOMContentLoaded', function(){

  // Storing query selections...
  const playButton = document.querySelector('#play');
  const stopButton = document.querySelector('#stop');
  const submitButton = document.querySelector('#submit');
  const inputField = document.querySelector('input');
  const keys = document.querySelectorAll('.key');
  const lights = document.querySelectorAll('.light');

  // Variables which check for game state and store user input
  var playbackSequence = [[1,2],[],[1,2],[2],[1],[2],[1,2],[2]];
  var userSequence = [[1],[],[1],[],[1],[],[1],[]];

  // Set tempo functionality
  var bpm = 312
  var newTempo = function(input) {
    var interval = inputField.value;
    bpm = 60000 / (input * 2);
  }

  // Halts animation class... SEE README
  function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('lit');
  };

  // Animation event listeners... SEE README
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));
  lights.forEach(light => light.addEventListener('transitionend', removeTransition));

  // Playback functionality...
  // MDN suggests this to clear timeout intervals from other functions. Not sure why. ASK.
  var intervalID;

  // Actual playback function
  var playSequence = function(rhythm) {
    var seqPos = 0;
      intervalID = setInterval(function(){
        rhythm[seqPos].forEach(function(i){
            var audio = document.querySelector(`audio[data-note='${i}']`);
            audio.currentTime = 0;
            audio.play();
          });
        var light = document.querySelector(`.light[data-index='${seqPos}']`);
        light.classList.add('lit');
        if (rhythm[seqPos].length > 0) {
          document.querySelector(`.key[data-index='${seqPos}']`)
                  .classList
                  .add('lit');
        }
        seqPos < 7 ? seqPos++ : seqPos = 0;
      }, bpm);
  };

  //Sequence Key event listener
  keys.forEach(function(key) {
    key.addEventListener('click', function(){
      this.classList.toggle('key-select');
      var i = parseInt(this.dataset.index);
      userSequence[i].includes(2) ? userSequence[i].pop()
                                  : userSequence[i].push(2);
      console.log(userSequence);
    });
  });

  // Play button event listener
  var loopPlaying = false;
  playButton.addEventListener('click', function() {
    if (loopPlaying) return;
    playSequence(playbackSequence);
    loopPlaying = true;
  });

  // Stop button event listener
  stopButton.addEventListener('click', function() {
    if (!loopPlaying) return;
    clearInterval(intervalID);
    loopPlaying = false;
  });

  // Submit button event listener
  submitButton.addEventListener('click', function() {
    if (loopPlaying) return;
    playSequence(userSequence);
    loopPlaying = true;
  })

  // Tempo event listener
  inputField.addEventListener('keypress', function(e) {
    if (e.which === 13) {
      if (inputField.value !== NaN) {
        newTempo(inputField.value);
        } else {
          document.querySelector('#bad-input').style.display = 'initial'
        }
    }});


});
