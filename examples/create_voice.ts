import fs from 'fs';
import path from 'path';
import Lmnt from 'lmnt-node';

async function main() {
  // gets API Key from environment variable LMNT_API_KEY
  const lmnt = new Lmnt();

  // Create a demo voice. Once completed, it will be available in your lsit of voices.
  const metadata = {
    name: 'demo-voice',
    enhance: false,
    type: 'instant',
    gender: 'female',
    description: 'This is a demo voice.',
  };
  const createVoiceResponse = await lmnt.voices.create({
    files: [fs.createReadStream(path.join(__dirname, 'sample-audio.mp3'))],
    metadata: JSON.stringify(metadata),
  });
  console.log('Results from `createVoice`:', createVoiceResponse);
}

main();
