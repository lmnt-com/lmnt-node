// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Lmnt, { toFile } from 'lmnt-node';
import { Response } from 'node-fetch';

const client = new Lmnt({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource voices', () => {
  test('create: only required params', async () => {
    const responsePromise = client.voices.create({
      files: [
        await toFile(Buffer.from('# my file contents'), 'README.md'),
        await toFile(Buffer.from('# my file contents'), 'README.md'),
      ],
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

  test('create: required and optional params', async () => {
    const response = await client.voices.create({
      files: [
        await toFile(Buffer.from('# my file contents'), 'README.md'),
        await toFile(Buffer.from('# my file contents'), 'README.md'),
      ],
      metadata: '{"name": "new-voice", "type": "instant", "enhance": false}; type=application/json',
    });
  });

  test('update', async () => {
    const responsePromise = client.voices.update('123');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.voices.update('123', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lmnt.NotFoundError,
    );
  });

  test('update: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.voices.update(
        '123',
        { description: 'description', gender: 'gender', name: 'name', starred: true, unfreeze: true },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Lmnt.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.voices.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.voices.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lmnt.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.voices.list({ owner: 'owner', starred: 'starred' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Lmnt.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.voices.delete('123');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.voices.delete('123', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lmnt.NotFoundError,
    );
  });

  test('get', async () => {
    const responsePromise = client.voices.get('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('get: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.voices.get('id', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Lmnt.NotFoundError,
    );
  });
});
