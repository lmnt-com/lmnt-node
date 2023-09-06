import 'dotenv/config'

import Speech from 'lmnt';

console.log(`Creating speech client [key=${process.env.LMNT_API_KEY}].`);
const speech = new Speech(process.env.LMNT_API_KEY);

// Fetch the list of available voices.
const voiceResponse = await speech.fetchVoices();
console.log(voiceResponse);

// Synthesize text to an audio WAV file.
const firstVoiceId = Object.keys(voiceResponse.voices)[0];
const audioResponse = await speech.synthesize('Hello World.', firstVoiceId);
console.log(audioResponse);
