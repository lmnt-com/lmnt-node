// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lmnt from 'lmnt-node';
import { Response } from 'node-fetch';

const client = new Lmnt({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource speech', () => {
  test('synthesize: only required params', async () => {
    const responsePromise = client.speech.synthesize({ text: 'hello world.', voice: 'ava' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('synthesize: required and optional params', async () => {
    const response = await client.speech.synthesize({
      text: 'hello world.',
      voice: 'ava',
      conversational: true,
      format: 'aac',
      language: 'de',
      length: 0,
      model: 'aurora',
      return_durations: true,
      sample_rate: 8000,
      seed: 0,
      speed: 0.25,
    });
  });
});
