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

  test('listVoices', async () => {
    const responsePromise = client.listVoices();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listVoices: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.listVoices({ path: '/_stainless_unknown_path' })).rejects.toThrow(Lmnt.NotFoundError);
  });

  test('listVoices: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.listVoices({ owner: 'owner', starred: 'starred' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lmnt.NotFoundError);
  });

  test('synthesize: only required params', async () => {
    const responsePromise = client.synthesize({
      text: 'This is a test of LMNT, hello world!',
      voice: 'daniel',
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
});