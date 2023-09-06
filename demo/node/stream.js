import 'dotenv/config';
import { createWriteStream } from 'fs';
import OpenAI from 'openai';

import Speech from 'lmnt';

// Construct the LMNT speech client instance.
const speech = new Speech(process.env.LMNT_API_KEY);
// Prepare an output file to which we write streamed audio. This
// could alternatively be piped to a media player or another remote client.
const audioFile = createWriteStream('/tmp/output.mp3');
// Construct the streaming connection with our desired voice
// and the callback to process incoming audio data.
const speechConnection = await speech.synthesizeStreaming(
    'mara-wilson', (audioData) => audioFile.write(audioData));

// Construct the OpenAI client instance.
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KE});

// Send a message to the OpenAI chatbot and stream the response.
const chatConnection = await openai.chat.completions.create({
  model: 'gpt-3.5-turbo',
  // messages: [{ role: 'user', content: 'Read me the text of the Blade Runner "Tears in the rain" monologue.' }],
  messages: [{ role: 'user', content: 'Read me the text a short sci-fi story in the public domain.' }],
  stream: true,
});

for await (const part of chatConnection) {
  const message = part.choices[0]?.delta?.content || '';
  console.log(`ChatGPT: ${message}`);
  speechConnection.appendText(message);
}

speechConnection.finish();
audioFile.end();
