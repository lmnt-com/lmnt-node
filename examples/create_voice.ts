import fs from 'fs';
import Lmnt from 'lmnt-node';
import path from 'path';

async function main() {
  // gets API Key from environment variable LMNT_API_KEY
  const lmnt = new Lmnt();

  // Create a demo voice. Once completed, it will be available in your lsit of voices.
  const createVoiceResponse = await lmnt.voices.create({
    files: [fs.createReadStream(path.join(__dirname, 'sample-audio.mp3'))],
    name: 'demo-voice',
    enhance: false,
    gender: 'female',
    description: 'This is a demo voice.',
  });
  console.log('Results from `createVoice`:', createVoiceResponse);
}

main();
