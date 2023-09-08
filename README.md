# LMNT Node module

## Overview

A Node.js module to provide convenient access to the [LMNT](https://www.lmnt.com) API from applications written in Javascript.

For more on the LMNT API, see the [documentation](https://www.lmnt.com/docs/).

## Usage

Create a `Speech` instance passing your API key to the constructor, and call any of the available API methods.

To obtain an API key, visit the [LMNT Account page](https://app.lmnt.com/account).

Sample code:
```js
import Speech from 'lmnt-node';

const speech = new Speech('your-api-key-here');

// Fetch the list of available voices.
const voiceResponse = await speech.fetchVoices();
console.log(voiceResponse);

// Synthesize text to audio.
const firstVoiceId = Object.keys(voiceResponse.voices)[0];
const audioResponse = await speech.synthesize('Hello World.', firstVoiceId, { format: 'mp3' });
console.log(audioResponse);
```

See the simple [demo apps](./demo/node/README.md) under `./demo/node` for more examples.
## Release History

0.0.1 / Sep 6, 2023
- Initial release.
