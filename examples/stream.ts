import { createWriteStream } from 'fs';
import Lmnt from 'lmnt-node';

async function main() {
  // Gets API Key from environment variable LMNT_API_KEY
  const lmnt = new Lmnt();

  // Prepare an output file to which we write streamed audio. This
  // could alternatively be piped to a media player or another remote client.
  const audioFile = createWriteStream('stream-output.mp3');

  // Construct the streaming connection with our desired voice
  const speechSession = lmnt.speech.sessions.create({
    voice: 'morgan',
  });

  const writeTask = async () => {
    // Simulate a message stream w/ a 1 second delay between messages.
    for (let i = 0; i < 5; i++) {
      speechSession.appendText(`Hello, world!`);
      console.log(` ** Sent to LMNT -- Message ${i} ** `);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // After `finish` is called, the server will close the connection
    // when it has finished synthesizing.
    speechSession.finish();
  };

  const readTask = async () => {
    for await (const message of speechSession) {
      const audioBytes = Buffer.byteLength(message.audio);
      console.log(` ** Received from LMNT -- ${audioBytes} bytes ** `);
      audioFile.write(message.audio);
    }

    speechSession.close();
  };
  await Promise.all([writeTask(), readTask()]);
  audioFile.close();
}

main();
