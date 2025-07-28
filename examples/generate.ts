// Basic text-to-speech example.
// To see how to stream outputs, see generate_stream.ts and speech_session.ts

import { writeFileSync } from 'fs';
import Lmnt from 'lmnt-node';

async function main() {
  // gets API Key from environment variable LMNT_API_KEY
  const lmnt = new Lmnt();

  const synthesis = await lmnt.speech.generate({
    text: 'Hello, world! This is a test of the LMNT speech synthesis API.',
    voice: 'leah',
    format: 'mp3',
    model: 'blizzard',
  });
  const audioBuffer = Buffer.from(await synthesis.arrayBuffer());
  writeFileSync('output.mp3', audioBuffer);
  console.log(`Done.`);
}

main();
