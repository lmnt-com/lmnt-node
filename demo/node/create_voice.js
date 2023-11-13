import 'dotenv/config';
import yargs from 'yargs';

import Speech from 'lmnt-node';

const args = yargs(process.argv)
    .option('input-file', {
        alias: 'i',
        type: 'string',
        describe: 'The path to the file containing the audio to clone.',
        default: 'sample-audio.mp3'
    })
    .parse();

// Construct the LMNT speech client instance.
const speech = new Speech(process.env.LMNT_API_KEY);

// Create a demo voice. Once completed, it will be available in your lsit of voices.
const createVoiceResponse = await speech.createVoice('demo-voice', true, [args.inputFile]);
console.log("Results from `createVoice`:", createVoiceResponse);