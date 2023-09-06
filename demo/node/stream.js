import 'dotenv/config';
import { createWriteStream } from 'fs';

import Speech from 'lmnt';

const speech = new Speech(process.env.LMNT_API_KEY);
const audioFile = createWriteStream('/tmp/output.mp3');
const conn = await speech.synthesizeStreaming(
    'mara-wilson', (audioData) => audioFile.write(audioData));
conn.appendText(
    "I've seen things you people wouldn't believe... "
    + "Attack ships on fire off the shoulder of Orion... I watched "
    + "C-beams glitter in the dark near the Tannhäuser Gate. All "
    + "those moments will be lost in time, like tears in rain... Time to die.");
conn.finish();
audioFile.end();
