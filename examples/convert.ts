import { writeFileSync, createReadStream } from 'fs';
import Lmnt from 'lmnt-node';
import path from 'path';

async function main() {
  // gets API Key from environment variable LMNT_API_KEY
  const lmnt = new Lmnt();

  const response = await lmnt.speech.convert({
    audio: createReadStream(path.join(__dirname, 'sample-audio.mp3')),
    voice: 'dalton',
    format: 'mp3',
  });

  const audioBuffer = Buffer.from(await response.arrayBuffer());
  writeFileSync('output.mp3', audioBuffer);
  console.log(`Done.`);
}

main();
