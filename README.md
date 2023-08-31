# `lmnt-speech` Node module

## Overview

A simple Node.js module to provide AI speech synthesis services via [LMNT](https://www.lmnt.com).

For more on the LMNT API, see the [documentation](https://www.lmnt.com/docs/).

## Usage

Create a `Speech` instance passing your API key to the constructor, and call any of the available API methods.

To obtain an API key, visit the [LMNT Account page](https://app.lmnt.com/account).

Sample code:
```js
import Speech from 'lmnt-speech';

const speech = new Speech('your-api-key-here');

// Fetch the list of available voices.
const voiceResponse = await speech.fetchVoices();
console.log(voiceResponse);

// Synthesize text to an audio WAV file.
const firstVoiceId = Object.keys(voiceResponse.voices)[0];
const audioResponse = await speech.synthesize('Hello World.', firstVoiceId);
console.log(audioResponse);
```

## Release History

0.0.1 / July 15, 2023 / Initial release.
