import 'dotenv/config';
import { createWriteStream } from 'fs';
import OpenAI from 'openai';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import Speech from 'lmnt-node';

const args = yargs(hideBin(process.argv))
  .option('prompt', {
    alias: 'p',
    type: 'string',
    describe: 'The prompt text to send to the chatbot.',
    default: 'Read me the text of a short sci-fi story in the public domain.',
  })
  .option('output-file', {
    alias: 'o',
    type: 'string',
    describe: 'The path to the file to which to write the synthesized audio.',
    default: '/tmp/output.mp3'
  })
  .parse();

// Construct the LMNT speech client instance.
const speech = new Speech(process.env.LMNT_API_KEY);

// Prepare an output file to which we write streamed audio. This
// could alternatively be piped to a media player or another remote client.
const audioFile = createWriteStream(args.outputFile);

// Construct the streaming connection with our desired voice
// and the callback to process incoming audio data.
const speechConnection = speech.synthesizeStreaming('mara-wilson');

// Construct the OpenAI client instance.
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

// Send a message to the OpenAI chatbot and stream the response.
const chatConnection = await openai.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: args.prompt }],
  stream: true,
});

const writeTask = async () => {
  for await (const part of chatConnection) {
    const message = part.choices[0]?.delta?.content || '';
    process.stdout.write(message);
    speechConnection.appendText(message);
  }

  // After `finish` is called, the server will close the connection
  // when it has finished synthesizing.
  speechConnection.finish();
};

const readTask = async () => {
  for await (const message of speechConnection) {
    const audioBytes = Buffer.byteLength(message);
    process.stdout.write(` ** LMNT -- ${audioBytes} bytes ** `);
    audioFile.write(message);
  }
};

await Promise.all([writeTask(), readTask()]);
