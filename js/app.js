document.addEventListener('DOMContentLoaded', function(){

  // Storing query selections...
  const playButton = document.querySelector('#play');
  const stopButton = document.querySelector('#stop');
  const submitButton = document.querySelector('#submit');
  const inputField = document.querySelector('input');
  const keys = document.querySelectorAll('.key');
  const lights = document.querySelectorAll('.light');
  const lose = document.querySelector('#lose');
  const badInput = document.querySelector('#badinput');

  // Variables which check for game state and store user input
  var rhythmBank = [
    [[2],[],[2],[2],[],[2],[2],[2]],
    [[2],[2],[2],[],[2],[2],[2],[]],
    [[2],[],[2],[],[2],[2],[2],[]],
    [[2],[],[],[2],[2],[],[],[2]],
    [[2],[2],[2],[],[2],[],[2],[2]],
    [[2],[],[],[],[2],[2],[2],[2]]
  ];
  var playbackSequence;
  function setRhythm() {
    var selection = Math.floor(Math.random() * rhythmBank.length);
    playbackSequence = rhythmBank[selection];
  };
  setRhythm();
  var userSequence = [[],[],[],[],[],[],[],[]];

  // Check for victory conditions
  var checkWin = function() {
    for(i = 0; i < userSequence.length; i++) {
      if(userSequence[i].length !== playbackSequence[i].length) {
        lose.style.display = 'initial';
        setTimeout(function(){
          lose.style.display = 'none';
        }, 1000);
        return;
      }
    }
    document.querySelector('#win')
    .classList
    .add('inst-overlay');
    clearInterval(intervalID);
    loopPlaying = false;
  };

  // "Play Again" button events
  document.querySelector('#replay').addEventListener('click', function(){
    // Select new "problem" rhythm
    setRhythm();
    // Remove victory overlay
    document.querySelector('.inst-overlay')
    .classList
    .remove('inst-overlay');
    // Reset sequencer
    document.querySelectorAll('.key-select')
    .forEach(function(i) {
      i.classList.remove('key-select');
      userSequence[i.dataset.index].pop();
    })
  })


  // Set tempo functionality
  var bpm = 312
  var newTempo = function(input) {
    // var interval = inputField.value;
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


  // Actual playback function
  var intervalID;
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

  // Display 'Instructions' overlay
  document.querySelector('#instbutton')
  .addEventListener('click', function() {
    document.querySelector('#instructions')
    .classList
    .add('inst-overlay');
    document.querySelector('.inst-overlay')
    .addEventListener('click', function() {
      // document.querySelector('.overlay')
      this
      .classList
      .remove('inst-overlay');
    });
  });


  // //Sequence Key event listener w/ event delegation
  document.querySelector('#sequencer').addEventListener('click', function(e) {
    if (e.target && e.target.matches('div.key')) {
      e.target.classList.toggle('key-select');
          var i = parseInt(e.target.dataset.index);
          userSequence[i].includes(2) ? userSequence[i].pop()
                                      : userSequence[i].push(2);
          console.log(userSequence);
    }
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
  submitButton.addEventListener('click', checkWin);

  // Tempo event listener
  inputField.addEventListener('keypress', function(e) {
    if (e.which === 13 && parseInt(inputField.value) < 401 && parseInt(inputField.value) > 39)  {
      newTempo(inputField.value);
   }
   if (parseInt(inputField.value) > 399) {
     badInput.style.display = 'initial';
     setTimeout(function(){
       badInput.style.display = 'none';
     }, 1000);
   }
    });





});
