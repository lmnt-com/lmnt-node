// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import { Sessions, SpeechSessionParams } from './sessions';

export class Speech extends APIResource {
  /**
   * Synthesizes speech from a text string and provides advanced information about
   * the synthesis. Returns a JSON object that contains a base64-encoded audio file,
   * the seed used in speech generation, and optionally an object detailing the
   * duration of each word spoken.
   */
  generate(
    body: SpeechGenerateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SpeechGenerateResponse> {
    return this._client.post('/v1/ai/speech', Core.multipartFormRequestOptions({ body, ...options }));
  }

  sessions: Sessions = new Sessions(this._client);
}

export interface SpeechGenerateResponse {
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
  durations?: Array<SpeechGenerateResponse.Duration>;
}

export namespace SpeechGenerateResponse {
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
   * reading-style speech.
   */
  conversational?: boolean;

  /**
   * The file format of the synthesized audio output
   */
  format?: 'aac' | 'mp3' | 'mulaw' | 'raw' | 'wav';

  /**
   * The desired language of the synthesized speech. Two letter ISO 639-1 code.
   */
  language?: 'de' | 'en' | 'es' | 'fr' | 'pt' | 'zh' | 'ko' | 'hi';

  /**
   * Produce speech of this length in seconds; maximum 300.0 (5 minutes).
   */
  length?: number;

  /**
   * The model to use for synthesis. One of `aurora` (default) or `blizzard`. Learn
   * more about models [here](https://docs.lmnt.com/guides/models).
   */
  model?: 'aurora' | 'blizzard';

  /**
   * If set as `true`, response will contain a durations object; see definition in
   * the response section below.
   */
  return_durations?: boolean;

  /**
   * The desired output sample rate in Hz
   */
  sample_rate?: 8000 | 16000 | 24000;

  /**
   * Seed used to specify a different take; defaults to random
   */
  seed?: number;

  /**
   * The talking speed of the generated speech
   */
  speed?: number;
}

export declare namespace Speech {
  export {
    type SpeechGenerateResponse as SpeechGenerateResponse,
    type SpeechGenerateParams as SpeechGenerateParams,
  };
  export { Sessions as Sessions, type SpeechSessionParams as SpeechSessionParams };
}
