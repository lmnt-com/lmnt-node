// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LmntCom from 'lmnt-com';
import { Response } from 'node-fetch';

const client = new LmntCom({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource speech', () => {
  test('create: only required params', async () => {
    const responsePromise = client.ai.speech.create({
      text: 'This is a test of LMNT, hello world!',
      voice: 'daniel',
      'X-API-Key': '{{X-API-Key}}',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.ai.speech.create({
      text: 'This is a test of LMNT, hello world!',
      voice: 'daniel',
      'X-API-Key': '{{X-API-Key}}',
      conversational: true,
      format: 'mp3',
      language: 'en',
      length: 5,
      model: 'aurora',
      return_durations: 'true',
      sample_rate: 24000,
      seed: 0,
      speed: 1,
    });
  });

  test('retrieve: required and optional params', async () => {
    const response = await client.ai.speech.retrieve({
      text: 'text',
      voice: 'voice',
      'X-API-Key': 'X-API-Key',
      conversational: true,
      format: 'format',
      language: 'language',
      length: 0,
      model: 'model',
      sample_rate: 0,
      seed: 0,
      speed: 0,
    });
  });
});
