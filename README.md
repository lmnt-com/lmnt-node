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

const speech = new Speech('your-api-key-here');

// Fetch the list of available voices.
const voices = await speech.fetchVoices();
console.log(voices);

// Synthesize text to audio.
const firstVoiceId = voices[0].id;
const synthesis = await speech.synthesize('Hello World.', firstVoiceId, { format: 'mp3' });
console.log(synthesis.audio);
```

See the simple [demo apps](https://github.com/lmnt-com/lmnt-node/tree/master/demo/node) for more examples.

## Release History

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

## Publish Process

Publishing a new release of the `lmnt-node` module:

```
# TODO(shaper): Use a GitHub Workflow and set up secrets as needed to auto-publish
# to npmjs whenever we tag a new release.

% cd lmnt-node
% git fetch && git checkout origin/master
% git tag -a v1.0.0 -m "Version 1.0.0 release."

# Make sure you're authed as your signed-in NPM user.
% npm adduser

# Make sure you don't have any modified files sitting around.
% git status

# Will show you what publish *will* do, to let you sanity check before publishing live.
% npm publish --dry-run

# Below may prompt you to authenticate again via a browser, do so again despite
# the 'adduser' above. You can viewe who you're logged in as currently with
# 'npm whoami'. Command reference is here: https://docs.npmjs.com/cli/v9/commands
% npm publish
```
