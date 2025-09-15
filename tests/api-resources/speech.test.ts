// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lmnt, { toFile } from 'lmnt-node';
import { Response } from 'node-fetch';

const client = new Lmnt({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource speech', () => {
  test('convert: required and optional params', async () => {
    const response = await client.speech.convert({
      audio: await toFile(Buffer.from('# my file contents'), 'README.md'),
      voice: 'leah',
      format: 'aac',
      language: 'auto',
      sample_rate: 8000,
    });
  });

  test('generate: required and optional params', async () => {
    const response = await client.speech.generate({
      text: 'hello world.',
      voice: 'leah',
      debug: true,
      format: 'aac',
      language: 'auto',
      model: 'blizzard',
      sample_rate: 8000,
      seed: 0,
      temperature: 0,
      top_p: 0,
    });
  });

  test('generateDetailed: only required params', async () => {
    const responsePromise = client.speech.generateDetailed({ text: 'hello world.', voice: 'leah' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('generateDetailed: required and optional params', async () => {
    const response = await client.speech.generateDetailed({
      text: 'hello world.',
      voice: 'leah',
      debug: true,
      format: 'aac',
      language: 'auto',
      model: 'blizzard',
      return_durations: true,
      sample_rate: 8000,
      seed: 0,
      temperature: 0,
      top_p: 0,
    });
  });
});
