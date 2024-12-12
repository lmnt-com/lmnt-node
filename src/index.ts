// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isRequestOptions } from './core';
import { type Agent } from './_shims/index';
import * as Core from './core';
import * as Errors from './error';
import * as Uploads from './uploads';
import * as TopLevelAPI from './resources/top-level';
import {
  AccountResponse,
  CreateVoiceParams,
  DeleteVoiceResponse,
  ListVoicesParams,
  ListVoicesResponse,
  SynthesizeParams,
  SynthesizeResponse,
  UpdateVoiceParams,
  UpdateVoiceResponse,
  Voice,
} from './resources/top-level';

export interface ClientOptions {
  /**
   * Defaults to process.env['LMNT_API_KEY'].
   */
  apiKey?: string | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['LMNT_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   */
  timeout?: number;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we use `node-fetch` on Node.js and otherwise expect that `fetch` is
   * defined globally.
   */
  fetch?: Core.Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery;
}

/**
 * API Client for interfacing with the Lmnt API.
 */
export class Lmnt extends Core.APIClient {
  apiKey: string;

  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Lmnt API.
   *
   * @param {string | undefined} [opts.apiKey=process.env['LMNT_API_KEY'] ?? undefined]
   * @param {string} [opts.baseURL=process.env['LMNT_BASE_URL'] ?? https://api.lmnt.com] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = Core.readEnv('LMNT_BASE_URL'),
    apiKey = Core.readEnv('LMNT_API_KEY'),
    ...opts
  }: ClientOptions = {}) {
    if (apiKey === undefined) {
      throw new Errors.LmntError(
        "The LMNT_API_KEY environment variable is missing or empty; either provide it, or instantiate the Lmnt client with an apiKey option, like new Lmnt({ apiKey: 'My API Key' }).",
      );
    }

    const options: ClientOptions = {
      apiKey,
      ...opts,
      baseURL: baseURL || `https://api.lmnt.com`,
    };

    super({
      baseURL: options.baseURL!,
      timeout: options.timeout ?? 60000 /* 1 minute */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });

    this._options = options;

    this.apiKey = apiKey;
  }

  /**
   * Returns details about your account.
   */
  account(options?: Core.RequestOptions): Core.APIPromise<TopLevelAPI.AccountResponse> {
    return this.get('/v1/account', options);
  }

  /**
   * Submits a request to create a voice with a supplied voice configuration and a
   * batch of input audio data.
   */
  createVoice(
    body: TopLevelAPI.CreateVoiceParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TopLevelAPI.Voice> {
    return this.post('/v1/ai/voice', Core.multipartFormRequestOptions({ body, ...options }));
  }

  /**
   * Deletes a voice and cancels any pending operations on it. Cannot be undone.
   */
  deleteVoice(id: string, options?: Core.RequestOptions): Core.APIPromise<unknown> {
    return this.delete(`/v1/ai/voice/${id}`, options);
  }

  /**
   * Returns a list of voices available to you.
   */
  listVoices(
    query?: TopLevelAPI.ListVoicesParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TopLevelAPI.ListVoicesResponse>;
  listVoices(options?: Core.RequestOptions): Core.APIPromise<TopLevelAPI.ListVoicesResponse>;
  listVoices(
    query: TopLevelAPI.ListVoicesParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<TopLevelAPI.ListVoicesResponse> {
    if (isRequestOptions(query)) {
      return this.listVoices({}, query);
    }
    return this.get('/v1/ai/voice/list', { query, ...options });
  }

  /**
   * Synthesizes speech from a text string and provides advanced information about
   * the synthesis. Returns a JSON object that contains a base64-encoded audio file,
   * the seed used in speech generation, and optionally an object detailing the
   * duration of each word spoken.
   */
  synthesize(
    body: TopLevelAPI.SynthesizeParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TopLevelAPI.SynthesizeResponse> {
    return this.post('/v1/ai/speech', Core.multipartFormRequestOptions({ body, ...options }));
  }

  /**
   * Updates metadata for a specific voice. Only provided fields will be changed.
   */
  updateVoice(
    id: string,
    body?: TopLevelAPI.UpdateVoiceParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TopLevelAPI.UpdateVoiceResponse>;
  updateVoice(id: string, options?: Core.RequestOptions): Core.APIPromise<TopLevelAPI.UpdateVoiceResponse>;
  updateVoice(
    id: string,
    body: TopLevelAPI.UpdateVoiceParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<TopLevelAPI.UpdateVoiceResponse> {
    if (isRequestOptions(body)) {
      return this.updateVoice(id, {}, body);
    }
    return this.put(`/v1/ai/voice/${id}`, { body, ...options });
  }

  /**
   * Returns details of a specific voice.
   */
  voiceInfo(id: string, options?: Core.RequestOptions): Core.APIPromise<TopLevelAPI.Voice> {
    return this.get(`/v1/ai/voice/${id}`, options);
  }

  protected override defaultQuery(): Core.DefaultQuery | undefined {
    return this._options.defaultQuery;
  }

  protected override defaultHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return {
      ...super.defaultHeaders(opts),
      ...this._options.defaultHeaders,
    };
  }

  protected override authHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return { 'X-API-Key': this.apiKey };
  }

  static Lmnt = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static LmntError = Errors.LmntError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;

  static toFile = Uploads.toFile;
  static fileFromPath = Uploads.fileFromPath;
}

export declare namespace Lmnt {
  export type RequestOptions = Core.RequestOptions;

  export {
    type Voice as Voice,
    type AccountResponse as AccountResponse,
    type DeleteVoiceResponse as DeleteVoiceResponse,
    type ListVoicesResponse as ListVoicesResponse,
    type SynthesizeResponse as SynthesizeResponse,
    type UpdateVoiceResponse as UpdateVoiceResponse,
    type CreateVoiceParams as CreateVoiceParams,
    type ListVoicesParams as ListVoicesParams,
    type SynthesizeParams as SynthesizeParams,
    type UpdateVoiceParams as UpdateVoiceParams,
  };
}

export { toFile, fileFromPath } from './uploads';
export {
  LmntError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} from './error';

export default Lmnt;
