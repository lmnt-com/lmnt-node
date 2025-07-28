// Text-to-speech streaming example.
// For a bidirectional stream, see speech_session.ts

import Lmnt from 'lmnt-node';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { join } from 'path';

const client = new Lmnt();

const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
} as const;

type ColorKey = keyof typeof colors;

function log(message: string, color: ColorKey = 'reset', newline: boolean = false): void {
  console.log(`${colors[color]}${message}${colors.reset}${newline ? '\n' : ''}`);
}

async function streamWithAsyncIterator(): Promise<void> {
  log('Streaming with async iteration...', 'blue', true);

  try {
    const response = await client.speech
      .generate({
        text: 'This example uses async iteration for streaming.',
        voice: 'leah',
      })
      .asResponse();

    let totalBytes: number = 0;

    for await (const chunk of response.body) {
      totalBytes += chunk.length;
      log(`Received ${chunk.length} bytes (total: ${totalBytes})`, 'cyan');
      // Process each chunk as it arrives!
    }

    log(`Async iteration complete: ${totalBytes} total bytes`, 'green', true);
  } catch (error) {
    console.error(
      `${colors.red}Error:${colors.reset}`,
      error instanceof Error ? error.message : String(error),
    );
  }
}

async function streamToFile(): Promise<void> {
  log('Streaming audio to file...', 'blue', true);

  try {
    const response = await client.speech
      .generate({
        text: 'Hello! This is a streaming example using the LMNT Node.js SDK.',
        voice: 'leah',
      })
      .asResponse();

    const outputPath: string = join(__dirname, 'streamed-audio.mp3');
    const writeStream = createWriteStream(outputPath);

    let totalBytes: number = 0;

    response.body.on('data', (chunk: Buffer) => {
      totalBytes += chunk.length;
      log(`Received ${chunk.length} bytes (total: ${totalBytes})`, 'cyan');
      // Process each chunk as it arrives!
    });

    await pipeline(response.body, writeStream);

    log(`Audio saved to: ${outputPath} (${totalBytes} bytes)`, 'green', true);
  } catch (error) {
    console.error(
      `${colors.red}Error:${colors.reset}`,
      error instanceof Error ? error.message : String(error),
    );
  }
}

async function main(): Promise<void> {
  await streamWithAsyncIterator();
  await streamToFile();
}

main();
