// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LmntCom from 'lmnt-com';
import { Response } from 'node-fetch';

const client = new LmntCom({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource voices', () => {
  test('create: only required params', async () => {
    const responsePromise = client.ai.voices.create({
      files: '@/Users/user/filename.wav',
      metadata: '{"name": "new-voice", "type": "instant", "enhance": false}; type=application/json',
      'X-API-Key': 'X-API-Key',
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
    const response = await client.ai.voices.create({
      files: '@/Users/user/filename.wav',
      metadata: '{"name": "new-voice", "type": "instant", "enhance": false}; type=application/json',
      'X-API-Key': 'X-API-Key',
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = client.ai.voices.retrieve('id', { 'X-API-Key': 'X-API-Key' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: required and optional params', async () => {
    const response = await client.ai.voices.retrieve('id', { 'X-API-Key': 'X-API-Key' });
  });

  test('update: only required params', async () => {
    const responsePromise = client.ai.voices.update('', { 'X-API-Key': 'X-API-Key' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.ai.voices.update('', {
      'X-API-Key': 'X-API-Key',
      description: 'description',
      gender: 'gender',
      name: 'name',
      starred: true,
      unfreeze: true,
    });
  });

  test('list: only required params', async () => {
    const responsePromise = client.ai.voices.list({ 'X-API-Key': 'X-API-Key' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: required and optional params', async () => {
    const response = await client.ai.voices.list({
      'X-API-Key': 'X-API-Key',
      owner: 'owner',
      starred: 'starred',
    });
  });

  test('delete: only required params', async () => {
    const responsePromise = client.ai.voices.delete('', { 'X-API-Key': 'X-API-Key' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.ai.voices.delete('', { 'X-API-Key': 'X-API-Key' });
  });
});
