// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import { type Response } from '../../_shims/index';

export class Speech extends APIResource {
  /**
   * Synthesizes speech from a text string and provides advanced information about
   * the synthesis. Returns a JSON object that contains a base64-encoded audio file,
   * the seed used in speech generation, and optionally an object detailing the
   * duration of each word spoken.
   */
  create(params: SpeechCreateParams, options?: Core.RequestOptions): Core.APIPromise<SpeechCreateResponse> {
    const { 'X-API-Key': xAPIKey, ...body } = params;
    return this._client.post(
      '/v1/ai/speech',
      Core.multipartFormRequestOptions({
        body,
        ...options,
        headers: { 'X-API-Key': xAPIKey, ...options?.headers },
      }),
    );
  }

  /**
   * Synthesizes speech from a text string. Returns binary audio data in one of many
   * supported audio formats (for more detailed output, use the POST request). This
   * simplified version of synthesis can be directly used in HTML5 audio tags.
   */
  retrieve(query: SpeechRetrieveParams, options?: Core.RequestOptions): Core.APIPromise<Response> {
    return this._client.get('/v1/ai/speech', { query, ...options, __binaryResponse: true });
  }
}

export interface SpeechCreateResponse {
  /**
   * The base64-encoded audio file; the format is determined by the `format`
   * parameter.
   */
  audio: string;

  /**
   * The seed used to generate this speech; can be used to replicate this output take
   * (assuming the same text is resynthsized with this seed number,
   * [see here](http://docs.lmnt.com/speech/seed) for more details).
   */
  seed: number;

  /**
   * A JSON object outlining the spoken duration of each synthesized input element
   * (words and non-words like spaces, punctuation, etc.). See an
   * [example of this object](https://imgur.com/Uw6qNzY.png) for the input string
   * "Hello world!"
   */
  durations?: Array<SpeechCreateResponse.Duration>;
}

export namespace SpeechCreateResponse {
  export interface Duration {
    /**
     * The spoken duration of each synthesized input element, in seconds.
     */
    duration?: number;

    /**
     * The start time of each synthsized input element, in seconds.
     */
    start?: number;

    /**
     * The synthesized input elements; beginning and ending with a short silence.
     */
    text?: string;
  }
}

export interface SpeechCreateParams {
  /**
   * Body param: The text to synthesize; max 5000 characters per request (including
   * spaces).
   */
  text: string;

  /**
   * Body param: The voice id of the voice to use for synthesis; voice ids can be
   * retrieved by calls to `List voices` or `Voice info`
   */
  voice: string;

  /**
   * Header param: Your API key; get it from your
   * [LMNT account page](https://app.lmnt.com/account).
   */
  'X-API-Key': string;

  /**
   * Body param: Set this to `true` to generate conversational-style speech rather
   * than reading-style speech. Does not work with the `blizzard` model.
   */
  conversational?: boolean;

  /**
   * Body param: The file format of the synthesized audio output, either `aac`,
   * `mp3`, `mulaw`, `raw`, `wav`.
   */
  format?: string;

  /**
   * Body param: The desired language of the synthesized speech. Two letter ISO 639-1
   * code. One of `de`, `en`, `es`, `fr`, `pt`, `zh`, `ko`, `hi`. Does not work with
   * professional clones and the `blizzard` model.
   */
  language?: string;

  /**
   * Body param: Produce speech of this length in seconds; maximum `300.0` (5
   * minutes). Does not work with the `blizzard` model.
   */
  length?: number;

  /**
   * Body param: The model to use for synthesis. One of `aurora` (default) or
   * `blizzard`. Learn more about models [here](https://docs.lmnt.com/guides/models).
   */
  model?: string;

  /**
   * Body param: If set as `true`, response will contain a durations object; see
   * definition in the response section below.
   */
  return_durations?: string;

  /**
   * Body param: The desired output sample rate in Hz, one of: `8000`, `16000`,
   * `24000`; defaults to `24000` for all formats except `mulaw` which defaults to
   * `8000`.
   */
  sample_rate?: number;

  /**
   * Body param: Seed used to specify a different take; defaults to random
   * ([see here](http://docs.lmnt.com/speech/seed) for more details).
   */
  seed?: number;

  /**
   * Body param: The talking speed of the generated speech, a floating point value
   * between `0.25` (slow) and `2.0` (fast).
   */
  speed?: number;
}

export interface SpeechRetrieveParams {
  /**
   * The text to synthesize; max 5000 characters per request (including spaces).
   */
  text: string;

  /**
   * The voice id of the voice to use for synthesis; voice ids can be retrieved by
   * calls to `List voices` or `Voice info`.
   */
  voice: string;

  /**
   * Your API key; get it from your
   * [LMNT account page](https://app.lmnt.com/account).
   */
  'X-API-Key': string;

  /**
   * Set this to `true` to generate conversational-style speech rather than
   * reading-style speech. Does not work with the `blizzard` model.
   */
  conversational?: boolean;

  /**
   * The file format of the synthesized audio output, either `aac`, `mp3`, `mulaw`,
   * `raw`, `wav`.
   */
  format?: string;

  /**
   * The desired language of the synthesized speech. Two letter ISO 639-1 code. One
   * of `de`, `en`, `es`, `fr`, `pt`, `zh`, `ko`, `hi`. Does not work with
   * professional clones and the `blizzard` model.
   */
  language?: string;

  /**
   * Produce speech of this length in seconds; maximum 300.0 (5 minutes). Does not
   * work with the `blizzard` model.
   */
  length?: number;

  /**
   * The model to use for synthesis. One of `aurora` (default) or `blizzard`. Learn
   * more about models [here](https://docs.lmnt.com/guides/models).
   */
  model?: string;

  /**
   * The desired output sample rate in Hz, one of: `8000`, `16000`, `24000`; defaults
   * to `24000` for all formats except `mulaw` which defaults to `8000`.
   */
  sample_rate?: number;

  /**
   * Seed used to specify a different take; defaults to random
   * ([see here](http://docs.lmnt.com/speech/seed) for more details).
   */
  seed?: number;

  /**
   * The talking speed of the generated speech, a floating point value between `0.25`
   * (slow) and `2.0` (fast).
   */
  speed?: number;
}

export declare namespace Speech {
  export {
    type SpeechCreateResponse as SpeechCreateResponse,
    type SpeechCreateParams as SpeechCreateParams,
    type SpeechRetrieveParams as SpeechRetrieveParams,
  };
}
