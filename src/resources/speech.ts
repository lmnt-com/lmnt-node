// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import { type Response } from '../_shims/index';
import { Sessions, SpeechSessionParams } from './sessions';

export class Speech extends APIResource {
  /**
   * Synthesizes speech from a text string and returns the audio data as a binary
   * stream.
   */
  generate(body: SpeechGenerateParams, options?: Core.RequestOptions): Core.APIPromise<Response> {
    return this._client.post('/v1/ai/speech/bytes', {
      body,
      ...options,
      headers: { Accept: 'application/octet-stream', ...options?.headers },
      __binaryResponse: true,
    });

  sessions: Sessions = new Sessions(this._client);
  }
}

export interface SpeechGenerateParams {
  /**
   * The text to synthesize; max 5000 characters per request (including spaces)
   */
  text: string;

  /**
   * The voice id of the voice to use for synthesis; voice ids can be retrieved by
   * calls to `List voices` or `Voice info`
   */
  voice: string;

  /**
   * Set this to `true` to generate conversational-style speech rather than
   * reading-style speech. Does not work with the `blizzard` model.
   */
  conversational?: boolean;

  /**
   * The file format of the synthesized audio output
   */
  format?: 'aac' | 'mp3' | 'mulaw' | 'raw' | 'wav';

  /**
   * The desired language of the synthesized speech. Two letter ISO 639-1 code. Does
   * not work with professional clones and the `blizzard` model.
   */
  language?: 'de' | 'en' | 'es' | 'fr' | 'pt' | 'zh' | 'ko' | 'hi';

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
}

export declare namespace Speech {
  export { type SpeechGenerateParams as SpeechGenerateParams };
  export { Sessions as Sessions, type SpeechSessionParams as SpeechSessionParams };
}
