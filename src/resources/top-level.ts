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

export interface CreateVoiceParams {
  /**
   * One or more input audio files to train the voice in the form of binary `wav`,
   * `mp3`, `mp4`, `m4a`, or `webm` attachments.
   *
   * - Max attached files: 20.
   * - Max total file size: 250 MB.
   * - Professional voices require at least 5 minutes of source audio to train from.
   */
  files: string;

  /**
   * Information about the voice you are creating; a stringified JSON object
   * containing the following fields:
   *
   * - `name` **_required_**: string; The display name for this voice
   * - `enhance` **_required_**: bool; For unclean audio with background noise,
   *   applies processing to attempt to improve quality. Default is `false` as this
   *   can also degrade quality in some circumstances.
   * - `type` _optional_: string; The type of voice to create. Defaults to instant.
   * - `gender` _optional_: string; A tag describing the gender of this voice. Has no
   *   effect on voice creation.
   * - `description` _optional_: string; A text description of this voice.
   */
  metadata: string;
}

export interface ListVoicesParams {
  /**
   * Which owner's voices to return. Choose from `system`, `me`, or `all`.
   */
  owner?: string;

  /**
   * If true, only returns voices that you have starred.
   */
  starred?: string;
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

export interface UpdateVoiceParams {
  /**
   * A description of this voice.
   */
  description?: string;

  /**
   * A tag describing the gender of this voice, e.g. `male`, `female`, `nonbinary`.
   */
  gender?: string;

  /**
   * The display name for this voice.
   */
  name?: string;

  /**
   * If `true`, adds this voice to your starred list.
   */
  starred?: boolean;

  /**
   * If true, unfreezes this voice and upgrades it to the latest model.
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
    type CreateVoiceParams as CreateVoiceParams,
    type ListVoicesParams as ListVoicesParams,
    type SynthesizeParams as SynthesizeParams,
    type UpdateVoiceParams as UpdateVoiceParams,
  };
}
