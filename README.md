# I've Got Rhythm...

This is a simple variation on "Simon" written using HTML, CSS and vanilla JS.

The basic idea of this game is that the computer will play you a single note over a sequence of eight steps. The player is meant to input the rhythm on a series of buttons on a sequencer representing each step. Both the sequence to be matched and the one the user creates are stored in arrays. Each step itself is a sub-array containing all of the audio samples to be triggered on that step. When the "Play" or "Submit" buttons are clicked (triggering computer or user sequences, respectively), a setInterval function loops through the sequencer array one step at a time and triggers audio playback of every sample within each sub-array.

#APPROACH

I used HTML global data attributes fairly extensively here. Each sequencer key has a "data-index" attribute which corresponds to the index it represents in the audio sequencer arrays. Each audio sample also has its own "data-note" attribute. When any of the sequencer keys are toggled in the user controls, they perform two actions. First, they toggle a CSS class on that key to indicate that whether its "active" or not. Second, a function takes the "data-index" value of the sequencer key and looks for the corresponding step in the user's sequencer array. Then, depending on whether that key is "active", it either pushes or pops an audio sample's "data" value to/from the array at that index.

# CITATIONS

The genesis of this idea came from a Wes Bos tutorial on binding audio playback to keypress events. Whenever a key would be pressed, a corresponding drum would play and a div with the key and drum name would become animated briefly, by changing some color, box-shadow and sizing properties over a <10ms transition and then reverting to its original state once the transition ended.

Since I can't play a 'qwerty' keyboard with any degree of rhythm, I decided to see if I could build drum sequencing functionality into the project. It was successful and a lot of the concepts (but less code than expected) were borrowed to create this game.

The one place where I directly copied the original tutorial's code was in the 'transitioned' events that end animations. I wasn't entirely familiar with that method of animating div elements, and it seems to have worked perfectly fine.

# HOW TO USE

The goal of the game is to correctly enter a rhythm into a sequencer which matches the one that the game provides for you.

Players should begin by clicking the "play" button in order to hear the rhythm they need to match. They can halt playback by clicking on the "stop" button.

Once the player is ready, they can begin entering their sequence on the row of eight sequencer keys, and then click "submit" to check their answer. This will cue the user's sequence to play and then display a message telling them whether they were correct or not.

If a player succeeds in matching the computer's sequence, an overlay screen appears offering the chance to play again, at which point both sequencers are reset- the computer to a new value, and the user to a blank row of keys.

# CHALLENGES

The only real challenge here was the tempo control. I had it set up through an input tag to take a text field, which resulted in strings of non-digit characters being accepted as values and turning up the speed to an unlistenable, blistering pace. Conversations with peers revealed that the best approach would be to use a regular expression to check for this input, but since its best to limit the range of tempos for the sake of usability (just like every metronome ever made), it was easier to reject anything that didn't evaluate to something between 40BPM and 400BPM.

#USER STORIES

Huh?
