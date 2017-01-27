# rhythm-game

Approach:

Began by designing basic page layout for core game functions. Player should be able to
both hear and replay audio sample with a single button click, submit their answer with
another button click, cue in their answers on a grid, and receive a message saying
whether or not they'd written the correct sequence.

An early overreach includes a tempo selector, but if it works... great.

The first working model of


# CITATIONS

The genesis of this idea came from a Wes Bos tutorial on binding audio playback to
keypress events. Whenever a key would be pressed, a corresponding drum would play
and a div with the key and drum name would become animated briefly, by changing some
color, box-shadow and sizing properties over a <10ms transition and then reverting
to its original state once the transition ended.

Since I can't play a 'qwerty' keyboard with any degree of rhythm, I decided to see if
I could build drum sequencing functionality into the project. It was successful and a
lot of the concepts (but less code than expected) were borrowed to create this game.

The one place where I directly copied the original tutorial's code was in the 'transitioned'
events that end animations. It was simply written better than I could manage on my own...

# I GOT PROBLEMS

In the tempo event listener, I couldn't figure out how to get it to stop accepting strings
and glitching out. Rather than do it the right way, I just limited the upper range of acceptable
tempos to something very boring human could pull off.
