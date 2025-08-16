// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type Agent } from './_shims/index';
import * as Core from './core';
import * as Errors from './error';
import * as Uploads from './uploads';
import * as API from './resources/index';
import { AccountRetrieveResponse, Accounts } from './resources/accounts';
import {
  Speech,
  SpeechConvertParams,
  SpeechGenerateDetailedParams,
  SpeechGenerateDetailedResponse,
  SpeechGenerateParams,
} from './resources/speech';
import { Sessions, SpeechSessionParams } from './resources/sessions';
import {
  Voice,
  VoiceCreateParams,
  VoiceDeleteResponse,
  VoiceListParams,
  VoiceListResponse,
  VoiceUpdateParams,
  VoiceUpdateResponse,
  Voices,
} from './resources/voices';

export interface ClientOptions {
  /**
   * Your API key; get it from your [LMNT account page](https://app.lmnt.com/account).
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
   *
   * @unit milliseconds
   */
  timeout?: number | undefined;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent | undefined;

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
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery | undefined;
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
      baseURLOverridden: baseURL ? baseURL !== 'https://api.lmnt.com' : false,
      timeout: options.timeout ?? 60000 /* 1 minute */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });

    this._options = options;

    this.apiKey = apiKey;
  }

  speech: API.Speech = new API.Speech(this);
  accounts: API.Accounts = new API.Accounts(this);
  voices: API.Voices = new API.Voices(this);

  /**
   * Check whether the base URL is set to its default.
   */
  #baseURLOverridden(): boolean {
    return this.baseURL !== 'https://api.lmnt.com';
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

Lmnt.Speech = Speech;
Lmnt.Accounts = Accounts;
Lmnt.Voices = Voices;

export declare namespace Lmnt {
  export type RequestOptions = Core.RequestOptions;

  export {
    Speech as Speech,
    type SpeechGenerateDetailedResponse as SpeechGenerateDetailedResponse,
    type SpeechConvertParams as SpeechConvertParams,
    type SpeechGenerateParams as SpeechGenerateParams,
    type SpeechGenerateDetailedParams as SpeechGenerateDetailedParams,
  };

  export { Sessions as Sessions, type SpeechSessionParams as SpeechSessionParams };

  export { Accounts as Accounts, type AccountRetrieveResponse as AccountRetrieveResponse };

  export {
    Voices as Voices,
    type Voice as Voice,
    type VoiceUpdateResponse as VoiceUpdateResponse,
    type VoiceListResponse as VoiceListResponse,
    type VoiceDeleteResponse as VoiceDeleteResponse,
    type VoiceCreateParams as VoiceCreateParams,
    type VoiceUpdateParams as VoiceUpdateParams,
    type VoiceListParams as VoiceListParams,
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
