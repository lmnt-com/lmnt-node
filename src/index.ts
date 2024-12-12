// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type Agent } from './_shims/index';
import * as Core from './core';
import * as Errors from './error';
import * as Uploads from './uploads';
import * as TopLevelAPI from './resources/top-level';
import {
  AccountParams,
  AccountResponse,
  DeleteVoiceParams,
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
  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Lmnt API.
   *
   * @param {string} [opts.baseURL=process.env['LMNT_BASE_URL'] ?? https://api.lmnt.com] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({ baseURL = Core.readEnv('LMNT_BASE_URL'), ...opts }: ClientOptions = {}) {
    const options: ClientOptions = {
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
  }

  /**
   * Returns details about your account.
   */
  account(
    params: TopLevelAPI.AccountParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TopLevelAPI.AccountResponse> {
    const { 'X-API-Key': xAPIKey } = params;
    return this.get('/v1/account', { ...options, headers: { 'X-API-Key': xAPIKey, ...options?.headers } });
  }

  /**
   * Deletes a voice and cancels any pending operations on it. Cannot be undone.
   */
  deleteVoice(
    id: string,
    params: TopLevelAPI.DeleteVoiceParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<unknown> {
    const { 'X-API-Key': xAPIKey } = params;
    return this.delete(`/v1/ai/voice/${id}`, {
      ...options,
      headers: { 'X-API-Key': xAPIKey, ...options?.headers },
    });
  }

  /**
   * Returns a list of voices available to you.
   */
  listVoices(
    params: TopLevelAPI.ListVoicesParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TopLevelAPI.ListVoicesResponse> {
    const { 'X-API-Key': xAPIKey, ...query } = params;
    return this.get('/v1/ai/voice/list', {
      query,
      ...options,
      headers: { 'X-API-Key': xAPIKey, ...options?.headers },
    });
  }

  /**
   * Synthesizes speech from a text string and provides advanced information about
   * the synthesis. Returns a JSON object that contains a base64-encoded audio file,
   * the seed used in speech generation, and optionally an object detailing the
   * duration of each word spoken.
   */
  synthesize(
    params: TopLevelAPI.SynthesizeParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TopLevelAPI.SynthesizeResponse> {
    const { 'X-API-Key': xAPIKey, ...body } = params;
    return this.post(
      '/v1/ai/speech',
      Core.multipartFormRequestOptions({
        body,
        ...options,
        headers: { 'X-API-Key': xAPIKey, ...options?.headers },
      }),
    );
  }

  /**
   * Updates metadata for a specific voice. Only provided fields will be changed.
   */
  updateVoice(
    id: string,
    params: TopLevelAPI.UpdateVoiceParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TopLevelAPI.UpdateVoiceResponse> {
    const { 'X-API-Key': xAPIKey, ...body } = params;
    return this.put(`/v1/ai/voice/${id}`, {
      body,
      ...options,
      headers: { 'X-API-Key': xAPIKey, ...options?.headers },
    });
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
    type AccountParams as AccountParams,
    type DeleteVoiceParams as DeleteVoiceParams,
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
