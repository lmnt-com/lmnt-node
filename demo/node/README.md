# LMNT Demo Node App

## Installation

Steps to set up and run:
- Run `yarn install` to install dependencies.
- Visit https://app.lmnt.com, sign in, and create an API key. This is free and only takes a moment.
- Copy the API key and paste it into the top-level `.env` file here as `LMNT_API_KEY=<your key here>`.

### Playing audio

Install an audio player, e.g. `play`, via for example:

```
% sudo apt install sox
```

### Streaming

If you'd like to run the streaming demo, you'll also need to visit https://platform.openai.com/, create an API key, and paste it into the top-level `.env` file as `OPENAI_API_KEY=<your key here>`.

Note that the streaming demo code allows playing audio within seconds. In order to make the demo apps simpler, we write each audio chunk to disk and below we show playing the final audio file. The `stdout` demo app logging will show as speech audio data arrives mid-stream.

For typical use cases you'll likely write the audio data incrementally as it becomes available to another client and/or a media playing device.

## Running

Run the basic speech synthesis demo:

```
% node synthesize.js
% play /tmp/output.mp3
```

Run the streaming speech synthesis demo:

```
% node stream.js
% play /tmp/output.mp3
```

Try a few more fun streaming demos:
```
% node stream.js -p "Sing me a song about a beluga whale."
% play /tmp/output.mp3
% node stream.js -p "Read me the opening script for The Big Lebowski."
% play /tmp/output.mp3
```

For more, see the [LMNT API Documentation](https://www.lmnt.com/docs).
