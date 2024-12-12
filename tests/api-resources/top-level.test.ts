// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lmnt from 'lmnt-node';
import { Response } from 'node-fetch';

const client = new Lmnt({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('top level methods', () => {
  test('account: only required params', async () => {
    const responsePromise = client.account({ 'X-API-Key': 'X-API-Key' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('account: required and optional params', async () => {
    const response = await client.account({ 'X-API-Key': 'X-API-Key' });
  });

  test('deleteVoice: only required params', async () => {
    const responsePromise = client.deleteVoice('', { 'X-API-Key': 'X-API-Key' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('deleteVoice: required and optional params', async () => {
    const response = await client.deleteVoice('', { 'X-API-Key': 'X-API-Key' });
  });

  test('listVoices: only required params', async () => {
    const responsePromise = client.listVoices({ 'X-API-Key': 'X-API-Key' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listVoices: required and optional params', async () => {
    const response = await client.listVoices({
      'X-API-Key': 'X-API-Key',
      owner: 'owner',
      starred: 'starred',
    });
  });

  test('synthesize: only required params', async () => {
    const responsePromise = client.synthesize({
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

  test('synthesize: required and optional params', async () => {
    const response = await client.synthesize({
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

  test('updateVoice: only required params', async () => {
    const responsePromise = client.updateVoice('', { 'X-API-Key': 'X-API-Key' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('updateVoice: required and optional params', async () => {
    const response = await client.updateVoice('', {
      'X-API-Key': 'X-API-Key',
      description: 'description',
      gender: 'gender',
      name: 'name',
      starred: true,
      unfreeze: true,
    });
  });
});
