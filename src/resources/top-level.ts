// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

/**
 * Voice details
 */
export interface Voice {
  /**
   * The unique identifier of this voice.
   */
  id: string;

  /**
   * The display name of this voice.
   */
  name: string;

  /**
   * The owner of this voice.
   */
  owner: 'system' | 'me' | 'other';

  /**
   * The state of this voice in the training pipeline (e.g., `ready`, `training`).
   */
  state: string;

  /**
   * A text description of this voice.
   */
  description?: string | null;

  /**
   * A tag describing the gender of this voice, e.g. `male`, `female`, `nonbinary`.
   */
  gender?: string;

  /**
   * Whether this voice has been starred by you or not.
   */
  starred?: boolean;

  /**
   * The method by which this voice was created: `instant` or `professional`.
   */
  type?: 'instant' | 'professional';
}

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

export type DeleteVoiceResponse = unknown;

export type ListVoicesResponse = Array<Voice>;

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

export interface UpdateVoiceResponse {
  /**
   * Voice details
   */
  voice: Voice;
}

export interface AccountParams {
  /**
   * Your API key; get it from your
   * [LMNT account page](https://app.lmnt.com/account).
   */
  'X-API-Key': string;
}

export interface DeleteVoiceParams {
  /**
   * Your API key; get it from your
   * [LMNT account page](https://app.lmnt.com/account).
   */
  'X-API-Key': string;
}

export interface ListVoicesParams {
  /**
   * Header param: Your API key; get it from your
   * [LMNT account page](https://app.lmnt.com/account).
   */
  'X-API-Key': string;

  /**
   * Query param: Which owner's voices to return. Choose from `system`, `me`, or
   * `all`.
   */
  owner?: string;

  /**
   * Query param: If true, only returns voices that you have starred.
   */
  starred?: string;
}

export interface SynthesizeParams {
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

export interface UpdateVoiceParams {
  /**
   * Header param: Your API key; get it from your
   * [LMNT account page](https://app.lmnt.com/account).
   */
  'X-API-Key': string;

  /**
   * Body param: A description of this voice.
   */
  description?: string;

  /**
   * Body param: A tag describing the gender of this voice, e.g. `male`, `female`,
   * `nonbinary`.
   */
  gender?: string;

  /**
   * Body param: The display name for this voice.
   */
  name?: string;

  /**
   * Body param: If `true`, adds this voice to your starred list.
   */
  starred?: boolean;

  /**
   * Body param: If true, unfreezes this voice and upgrades it to the latest model.
   */
  unfreeze?: boolean;
}

export declare namespace TopLevel {
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
