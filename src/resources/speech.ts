// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import { type Response } from '../_shims/index';

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
   * Generates speech from text and streams the audio as binary data chunks in
   * real-time as they are generated.
   *
   * This is the recommended endpoint for most text-to-speech use cases. You can
   * either stream the chunks for low-latency playback or collect all chunks to get
   * the complete audio file.
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

  /**
   * Generates speech from text and returns a JSON object that contains a
   * **base64-encoded audio string** and optionally word-level durations
   * (timestamps). This endpoint waits for the entire synthesis before responding, so
   * it is not ideal for latency-sensitive applications.
   *
   * @example
   * ```ts
   * const response = await client.speech.generateDetailed({
   *   text: 'hello world.',
   *   voice: 'ava',
   * });
   * ```
   */
  generateDetailed(
    body: SpeechGenerateDetailedParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SpeechGenerateDetailedResponse> {
    return this._client.post('/v1/ai/speech', { body, ...options });
  }
}

export interface SpeechGenerateDetailedResponse {
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
  durations?: Array<SpeechGenerateDetailedResponse.Duration>;
}

export namespace SpeechGenerateDetailedResponse {
  export interface Duration {
    /**
     * The spoken duration of each synthesized input element, in seconds.
     */
    duration: number;

    /**
     * The start time of each synthsized input element, in seconds.
     */
    start: number;

    /**
     * The synthesized input elements; beginning and ending with a short silence.
     */
    text: string;
  }
}

export interface SpeechConvertParams {
  /**
   * The audio file to be converted into a new voice. Specify source language using
   * the `language` parameter. Acceptable formats: `wav`, `mp3`. Max file size: 1 MB.
   */
  audio: Core.Uploadable;

  /**
   * The voice id to convert the speech into. Voice ids can be retrieved by calls to
   * `List voices` or `Voice info`.
   */
  voice: string;

  /**
   * The desired output format of the audio. If you are using a streaming endpoint,
   * you'll generate audio faster by selecting a streamable format since chunks are
   * encoded and returned as they're generated. For non-streamable formats, the
   * entire audio will be synthesized before encoding.
   *
   * Streamable formats:
   *
   * - `mp3`: 96kbps MP3 audio.
   * - `raw`: 32-bit floating point raw audio.
   * - `ulaw`: 8-bit G711 µ-law audio with a WAV header.
   * - `webm`: WebM format with Opus audio codec.
   *
   * Non-streamable formats:
   *
   * - `aac`: AAC audio codec.
   * - `wav`: 16-bit PCM audio in WAV container.
   */
  format?: 'aac' | 'mp3' | 'raw' | 'ulaw' | 'wav' | 'webm';

  /**
   * The language of the source audio. Two letter ISO 639-1 code.
   */
  language?:
    | 'auto'
    | 'ar'
    | 'de'
    | 'en'
    | 'es'
    | 'fr'
    | 'hi'
    | 'id'
    | 'it'
    | 'ja'
    | 'ko'
    | 'nl'
    | 'pl'
    | 'pt'
    | 'ru'
    | 'sv'
    | 'th'
    | 'tr'
    | 'uk'
    | 'ur'
    | 'vi'
    | 'zh';

  /**
   * The desired output sample rate in Hz. Defaults to `24000` for all formats except
   * `mulaw` which defaults to `8000`.
   */
  sample_rate?: 8000 | 16000 | 24000;
}

export interface SpeechGenerateParams {
  /**
   * The text to synthesize; max 5000 characters per request (including spaces).
   */
  text: string;

  /**
   * The voice id of the voice to use; voice ids can be retrieved by calls to
   * `List voices` or `Voice info`.
   */
  voice: string;

  /**
   * The desired output format of the audio. If you are using a streaming endpoint,
   * you'll generate audio faster by selecting a streamable format since chunks are
   * encoded and returned as they're generated. For non-streamable formats, the
   * entire audio will be synthesized before encoding.
   *
   * Streamable formats:
   *
   * - `mp3`: 96kbps MP3 audio.
   * - `raw`: 32-bit floating point raw audio.
   * - `ulaw`: 8-bit G711 µ-law audio with a WAV header.
   * - `webm`: WebM format with Opus audio codec.
   *
   * Non-streamable formats:
   *
   * - `aac`: AAC audio codec.
   * - `wav`: 16-bit PCM audio in WAV container.
   */
  format?: 'aac' | 'mp3' | 'raw' | 'ulaw' | 'wav' | 'webm';

  /**
   * The desired language. Two letter ISO 639-1 code. Defaults to auto language
   * detection.
   */
  language?:
    | 'auto'
    | 'ar'
    | 'de'
    | 'en'
    | 'es'
    | 'fr'
    | 'hi'
    | 'id'
    | 'it'
    | 'ja'
    | 'ko'
    | 'nl'
    | 'pl'
    | 'pt'
    | 'ru'
    | 'sv'
    | 'th'
    | 'tr'
    | 'uk'
    | 'ur'
    | 'vi'
    | 'zh';

  /**
   * The model to use for synthesis. Learn more about models
   * [here](https://docs.lmnt.com/guides/models).
   */
  model?: 'blizzard';

  /**
   * The desired output sample rate in Hz. Defaults to `24000` for all formats except
   * `mulaw` which defaults to `8000`.
   */
  sample_rate?: 8000 | 16000 | 24000;

  /**
   * Seed used to specify a different take; defaults to random
   */
  seed?: number;

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

export interface SpeechGenerateDetailedParams {
  /**
   * The text to synthesize; max 5000 characters per request (including spaces).
   */
  text: string;

  /**
   * The voice id of the voice to use; voice ids can be retrieved by calls to
   * `List voices` or `Voice info`.
   */
  voice: string;

  /**
   * The desired output format of the audio. If you are using a streaming endpoint,
   * you'll generate audio faster by selecting a streamable format since chunks are
   * encoded and returned as they're generated. For non-streamable formats, the
   * entire audio will be synthesized before encoding.
   *
   * Streamable formats:
   *
   * - `mp3`: 96kbps MP3 audio.
   * - `raw`: 32-bit floating point raw audio.
   * - `ulaw`: 8-bit G711 µ-law audio with a WAV header.
   * - `webm`: WebM format with Opus audio codec.
   *
   * Non-streamable formats:
   *
   * - `aac`: AAC audio codec.
   * - `wav`: 16-bit PCM audio in WAV container.
   */
  format?: 'aac' | 'mp3' | 'raw' | 'ulaw' | 'wav' | 'webm';

  /**
   * The desired language. Two letter ISO 639-1 code. Defaults to auto language
   * detection.
   */
  language?:
    | 'auto'
    | 'ar'
    | 'de'
    | 'en'
    | 'es'
    | 'fr'
    | 'hi'
    | 'id'
    | 'it'
    | 'ja'
    | 'ko'
    | 'nl'
    | 'pl'
    | 'pt'
    | 'ru'
    | 'sv'
    | 'th'
    | 'tr'
    | 'uk'
    | 'ur'
    | 'vi'
    | 'zh';

  /**
   * The model to use for synthesis. Learn more about models
   * [here](https://docs.lmnt.com/guides/models).
   */
  model?: 'blizzard';

  /**
   * If set as `true`, response will contain a durations object.
   */
  return_durations?: boolean;

  /**
   * The desired output sample rate in Hz. Defaults to `24000` for all formats except
   * `mulaw` which defaults to `8000`.
   */
  sample_rate?: 8000 | 16000 | 24000;

  /**
   * Seed used to specify a different take; defaults to random
   */
  seed?: number;

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
    type SpeechGenerateDetailedResponse as SpeechGenerateDetailedResponse,
    type SpeechConvertParams as SpeechConvertParams,
    type SpeechGenerateParams as SpeechGenerateParams,
    type SpeechGenerateDetailedParams as SpeechGenerateDetailedParams,
  };
}
