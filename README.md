# LMNT Node module

## Overview

A Node.js module to provide convenient access to the [LMNT](https://www.lmnt.com) API from applications written in Javascript.

For more on the LMNT API, see the [documentation](https://www.lmnt.com/docs/node).

## Usage

Create a `Speech` instance passing your API key to the constructor, and call any of the available API methods.

To obtain an API key, visit the [LMNT Account page](https://app.lmnt.com/account).

Sample code:
```js
import Speech from 'lmnt-node';

// You can set the `LMNT_API_KEY` environment variable instead of passing in a string below.
const speech = new Speech('your-api-key-here');

// Fetch the list of available voices.
const voices = await speech.fetchVoices();
console.log(voices);

// Synthesize text to audio.
const synthesis = await speech.synthesize('Hello World.', 'lily', { format: 'mp3' });
console.log(synthesis.audio);
```

See the simple [demo apps](https://github.com/lmnt-com/lmnt-node/tree/master/demo/node) for more examples.


## Next.js and Edge Runtime
 This SDK is compatible with Next.js and the Edge Runtime. To use it in a Next.js project, you will need to add the following to your `next.config.js` file:
 ```javascript
 webpack: (config, { isServer }) => {
     // Only run this on the server
     if (isServer) {
       config.resolve.fallback = config.resolve.fallback || {};
       config.resolve.fallback.fs = false;
     }

     return config;
   },
 ```
 The `createVoice()` method uses the `fs` module, which is not available in the Edge Runtime. While the SDK automatically disables this method in non-Node.js environments,
 this code snippet will prevent the build from failing when the `fs` module is not available.

 Learn more about custom webpack configuration in Next.js [here](https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config).

 
## Release History
1.3.0 / Dec 7, 2024
- add `model` option to `synthesize` following release of new experimental model `blizzard`

1.2.3 / Aug 1, 2024
- add `conversational` option to streaming and non-streaming synthesis

1.2.1 / July 16, 2024
- add `language` option to streaming synthesis

1.2.0 / May 15, 2024
- add optional `sample_rate` and `language` parameters in `synthesize`
- add optional `baseUrl` parameter to `Speech` constructor
- fix incorrect type definitions for synthesis response

1.1.2 / Feb 15, 2024
- enable client-specified `format` and `sample_rate` in streaming connection
- read `LMNT_API_KEY` from environment if not explicitly specified

1.1.1 / Feb 14, 2024
- support CommonJS modules in addition to ES modules
- expose more types to TypeScript for better tooling support

1.1.0 / Jan 5, 2024
- `synthesizeStreaming` will now return a `buffer_empty` boolean when extras are requested. This can be used to determine when the server has no more audio to send after the client has sent a `flush` message.

1.0.0 / Nov 16, 2023
- Breaking changes - Please update your code to use the new behavior or pin to a previous version if preferred:
  - Default audio encoding format in `synthesize` is now `mp3` (previously `wav`). Format can be specified by adding the `format='wav'` or `format='mp3'` option to the `synthesize` call.
  - `fetchVoices` now returns a list of voice dictionaries for simplicity of return values and ease of use. Previously it returned a dictionary with key `voices` which contained a dictionary of voice dictionaries keyed by their voice id.
  - `synthesize` no longer returns just the binary audio data. It instead always returns a dictionary with keys `audio`, `durations` (optional), and `seed` (optional).
- Features:
  - Add ability to filter by `starred` and `owner` in `fetchVoices`.
  - Add ability to return `durations` and `seed` from `synthesize`.
  - Add `fetchVoice` method to fetch a single voice.
  - Add `createVoice` method to create a new voice.
  - Add `updateVoice` method to update an existing voice, including starring voices.
  - Add `deleteVoice` method to delete an existing voice.
  - Add `synthesizeStreaming` method to support full-duplex synthesis streaming.
  - Add `fetchAccount` method to fetch account information.

0.0.2 / Sep 20, 2023
- Features:
  - Add optional `length` parameter specifying target speech duration.
  - Make streaming work with the [Edge runtime](https://vercel.com/docs/functions/edge-functions/edge-runtime).
  - Add TypeScript type definitions.
  - Add `close` method to `StreamingSynthesisConnection` class allowing explicit cleanup if desired.
- Bug fixes:
  - End the streaming async iterator when the synthesis is finished.
  - Fix demo link in README.

0.0.1 / Sep 6, 2023
- Initial release.
