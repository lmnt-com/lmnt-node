import { writeFileSync } from 'fs';
import Lmnt from 'lmnt-node';

async function main() {
  // gets API Key from environment variable LMNT_API_KEY
  const lmnt = new Lmnt();

  // Synthesize text to an audio file.
  const synthesis = await lmnt.speech.generate({
    text: 'Hello, world! This is a test of the LMNT speech synthesis API.',
    voice: 'morgan',
    format: 'mp3',
  });
  const audioBuffer = Buffer.from(await synthesis.arrayBuffer());
  writeFileSync('output.mp3', audioBuffer);
  console.log(`Done.`);
}

main();
