// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import { type Response } from '../_shims/index';
import { Sessions, SpeechSessionParams } from './sessions';

export class Speech extends APIResource {
  /**
   * Converts speech from one voice to another.
   *
   * @example
   * ```ts
   * const response = await client.speech.convert({
   *   audio: fs.createReadStream('path/to/file'),
   *   voice: 'ava',
   * });
   *
   * const content = await response.blob();
   * console.log(content);
   * ```
   */
  convert(body: SpeechConvertParams, options?: Core.RequestOptions): Core.APIPromise<Response> {
    return this._client.post(
      '/v1/ai/speech/convert',
      Core.multipartFormRequestOptions({
        body,
        ...options,
        headers: { Accept: 'application/octet-stream', ...options?.headers },
        __binaryResponse: true,
      }),
    );
  }

  /**
   * Synthesizes speech from a text string and returns the audio data as a binary
   * stream.
   *
   * @example
   * ```ts
   * const response = await client.speech.generate({
   *   text: 'hello world.',
   *   voice: 'ava',
   * });
   *
   * const content = await response.blob();
   * console.log(content);
   * ```
   */
  generate(body: SpeechGenerateParams, options?: Core.RequestOptions): Core.APIPromise<Response> {
    return this._client.post('/v1/ai/speech/bytes', {
      body,
      ...options,
      headers: { Accept: 'application/octet-stream', ...options?.headers },
      __binaryResponse: true,
    });
  }

  sessions: Sessions = new Sessions(this._client);
}

export interface SpeechConvertParams {
  /**
   * The audio file to be converted into a new voice. Specify source language using
   * the `language` parameter. Max file size: 1 MB.
   */
  audio: Core.Uploadable;

  /**
   * The voice id to convert the speech into. Voice ids can be retrieved by calls to
   * `List voices` or `Voice info`.
   */
  voice: string;

  /**
   * The file format of the audio output
   */
  format?: 'aac' | 'mp3' | 'mulaw' | 'raw' | 'wav';

  /**
   * The language of the source audio. Two letter ISO 639-1 code.
   */
  language?: 'en' | 'es' | 'pt' | 'fr' | 'de' | 'zh' | 'ko' | 'hi' | 'ja' | 'ru' | 'it' | 'tr';

  /**
   * The desired output sample rate in Hz
   */
  sample_rate?: 8000 | 16000 | 24000;
}

export interface SpeechGenerateParams {
  /**
   * The text to synthesize; max 5000 characters per request (including spaces)
   */
  text: string;

  /**
   * The voice id of the voice to use; voice ids can be retrieved by calls to
   * `List voices` or `Voice info`.
   */
  voice: string;

  /**
   * Set this to `true` to generate conversational-style speech rather than
   * reading-style speech. Does not work with the `blizzard` model.
   */
  conversational?: boolean;

  /**
   * The file format of the audio output
   */
  format?: 'aac' | 'mp3' | 'mulaw' | 'raw' | 'wav';

  /**
   * The desired language. Two letter ISO 639-1 code. Does not work with professional
   * clones. Not all languages work with all models.
   */
  language?: 'en' | 'es' | 'pt' | 'fr' | 'de' | 'zh' | 'ko' | 'hi' | 'ja' | 'ru' | 'it' | 'tr';

  /**
   * Produce speech of this length in seconds; maximum 300.0 (5 minutes). Does not
   * work with the `blizzard` model.
   */
  length?: number;

  /**
   * The model to use for synthesis. One of `aurora` (default) or `blizzard`. Learn
   * more about models [here](https://docs.lmnt.com/guides/models).
   */
  model?: 'aurora' | 'blizzard';

  /**
   * The desired output sample rate in Hz
   */
  sample_rate?: 8000 | 16000 | 24000;

  /**
   * Seed used to specify a different take; defaults to random
   */
  seed?: number;

  /**
   * The talking speed of the generated speech, a floating point value between `0.25`
   * (slow) and `2.0` (fast).
   */
  speed?: number;

  /**
   * Influences how expressive and emotionally varied the speech becomes. Lower
   * values (like 0.3) create more neutral, consistent speaking styles. Higher values
   * (like 1.0) allow for more dynamic emotional range and speaking styles.
   */
  temperature?: number;

  /**
   * Controls the stability of the generated speech. A lower value (like 0.3)
   * produces more consistent, reliable speech. A higher value (like 0.9) gives more
   * flexibility in how words are spoken, but might occasionally produce unusual
   * intonations or speech patterns.
   */
  top_p?: number;
}

export declare namespace Speech {
  export {
    type SpeechConvertParams as SpeechConvertParams,
    type SpeechGenerateParams as SpeechGenerateParams,
  };
  export { Sessions as Sessions, type SpeechSessionParams as SpeechSessionParams };
}
