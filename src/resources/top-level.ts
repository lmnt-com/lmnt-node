// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export interface AccountResponse {
  plan: AccountResponse.Plan;

  usage: AccountResponse.Usage;
}

export namespace AccountResponse {
  export interface Plan {
    /**
     * The number of characters you are allowed to synthesize in this billing period.
     */
    character_limit: number;

    commercial_use_allowed: boolean;

    /**
     * The number of professional voices you are allowed to create.
     */
    professional_voice_limit: number | null;

    /**
     * The type of plan you are subscribed to.
     */
    type: string;

    /**
     * The number of instant voices you are allowed to create.
     */
    instant_voice_limit?: number;
  }

  export interface Usage {
    /**
     * The number of characters you have synthesized in this billing period.
     */
    characters: number;

    /**
     * The number of professional voices you have created.
     */
    professional_voices: number;

    /**
     * The number of instant voices you have created.
     */
    instant_voices?: number;
  }
}

export interface SynthesizeResponse {
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
  durations?: Array<SynthesizeResponse.Duration>;
}

export namespace SynthesizeResponse {
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

export interface SynthesizeParams {
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

export declare namespace TopLevel {
  export {
    type AccountResponse as AccountResponse,
    type SynthesizeResponse as SynthesizeResponse,
    type SynthesizeParams as SynthesizeParams,
  };
}
