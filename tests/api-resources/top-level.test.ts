// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lmnt from 'lmnt-node';
import { Response } from 'node-fetch';

const client = new Lmnt({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('top level methods', () => {
  test('account', async () => {
    const responsePromise = client.account();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('account: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.account({ path: '/_stainless_unknown_path' })).rejects.toThrow(Lmnt.NotFoundError);
  });

  test('createVoice: only required params', async () => {
    const responsePromise = client.createVoice({
      files: '@/Users/user/filename.wav',
      metadata: '{"name": "new-voice", "type": "instant", "enhance": false}; type=application/json',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createVoice: required and optional params', async () => {
    const response = await client.createVoice({
      files: '@/Users/user/filename.wav',
      metadata: '{"name": "new-voice", "type": "instant", "enhance": false}; type=application/json',
    });
  });

  test('deleteVoice', async () => {
    const responsePromise = client.deleteVoice('');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('deleteVoice: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.deleteVoice('', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lmnt.NotFoundError,
    );
  });

  test('fetchVoices', async () => {
    const responsePromise = client.fetchVoices();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('fetchVoices: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.fetchVoices({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lmnt.NotFoundError,
    );
  });

  test('fetchVoices: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.fetchVoices({ owner: 'owner', starred: 'starred' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lmnt.NotFoundError);
  });

  test('synthesize: only required params', async () => {
    const responsePromise = client.synthesize({ text: 'text', voice: 'voice' });
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
      text: 'text',
      voice: 'voice',
      conversational: true,
      format: 'aac',
      language: 'de',
      length: 0,
      model: 'aurora',
      sample_rate: 8000,
      seed: 0,
      speed: 0.25,
    });
  });

  test('updateVoice', async () => {
    const responsePromise = client.updateVoice('');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('updateVoice: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.updateVoice('', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lmnt.NotFoundError,
    );
  });

  test('updateVoice: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.updateVoice(
        '',
        { description: 'description', gender: 'gender', name: 'name', starred: true, unfreeze: true },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lmnt.NotFoundError);
  });

  test('voiceInfo', async () => {
    const responsePromise = client.voiceInfo('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('voiceInfo: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.voiceInfo('id', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lmnt.NotFoundError,
    );
  });
});
