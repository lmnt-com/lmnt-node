import 'dotenv/config'
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { writeFileSync } from 'fs';

import Speech from 'lmnt-node';

const args = yargs(hideBin(process.argv))
  .option('prompt', {
    alias: 'p',
    type: 'string',
    describe: 'The text to synthesize.',
    default: 'Hello, world! This is a test of the LMNT speech synthesis API.',
  })
  .option('output-file', {
    alias: 'o',
    type: 'string',
    describe: 'The path to the file to which to write the synthesized audio.',
    default: '/tmp/output.mp3'
  })
  .option('voice', {
    alias: 'v',
    type: 'string',
    describe: 'The voice id to use when synthesizing speech.',
    default: 'morgan'
  })
  .parse();

const speech = new Speech(process.env.LMNT_API_KEY);

// Fetch the list of available voices.
const voiceResponse = await speech.fetchVoices();
console.log("Sample results from `fetchVoices`:", voiceResponse);

// Fetch your account information.
const accountResponse = await speech.fetchAccount();
console.log("Sample results from `fetchAccount`:", accountResponse);

// Synthesize text to an audio file.
console.log(`Synthesizing speech [voice=${args.voice}, prompt=${args.prompt}, output-file=${args.outputFile}].`);
const synthesis = await speech.synthesize(args.prompt, args.voice, { format: 'mp3' });
const audioBuffer = synthesis.audio;
writeFileSync(args.outputFile, audioBuffer);
console.log(`Done.`);
