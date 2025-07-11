// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lmnt, { toFile } from 'lmnt-node';

const client = new Lmnt({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource speech', () => {
  test('convert: required and optional params', async () => {
    const response = await client.speech.convert({
      audio: await toFile(Buffer.from('# my file contents'), 'README.md'),
      voice: 'ava',
      format: 'aac',
      language: 'auto',
      sample_rate: 8000,
    });
  });

  test('generate: required and optional params', async () => {
    const response = await client.speech.generate({
      text: 'hello world.',
      voice: 'ava',
      format: 'aac',
      language: 'auto',
      model: 'blizzard',
      sample_rate: 8000,
      seed: 0,
      temperature: 0,
      top_p: 0,
    });
  });
});
