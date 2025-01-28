// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lmnt from 'lmnt-node';

const client = new Lmnt({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource speech', () => {
  test('generate: required and optional params', async () => {
    const response = await client.speech.generate({
      text: 'hello world.',
      voice: 'ava',
      conversational: true,
      format: 'aac',
      language: 'de',
      length: 300,
      model: 'aurora',
      sample_rate: 8000,
      seed: 0,
      speed: 0.25,
    });
  });
});
