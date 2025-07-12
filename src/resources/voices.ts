// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';

export class Voices extends APIResource {
  /**
   * Submits a request to create a voice with a supplied voice configuration and a
   * batch of input audio data.
   *
   * @example
   * ```ts
   * const voice = await client.voices.create({
   *   enhance: false,
   *   files: [fs.createReadStream('path/to/file')],
   *   name: 'new-voice',
   * });
   * ```
   */
  create(body: VoiceCreateParams, options?: Core.RequestOptions): Core.APIPromise<Voice> {
    return this._client.post('/v1/ai/voice', Core.multipartFormRequestOptions({ body, ...options }));
  }

  /**
   * Returns details of a specific voice.
   *
   * @example
   * ```ts
   * const voice = await client.voices.retrieve('123');
   * ```
   */
  retrieve(id: string, options?: Core.RequestOptions): Core.APIPromise<Voice> {
    return this._client.get(`/v1/ai/voice/${id}`, options);
  }

  /**
   * Updates metadata for a specific voice. Only provided fields will be changed.
   *
   * @example
   * ```ts
   * const voice = await client.voices.update('123');
   * ```
   */
  update(
    id: string,
    body?: VoiceUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VoiceUpdateResponse>;
  update(id: string, options?: Core.RequestOptions): Core.APIPromise<VoiceUpdateResponse>;
  update(
    id: string,
    body: VoiceUpdateParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<VoiceUpdateResponse> {
    if (isRequestOptions(body)) {
      return this.update(id, {}, body);
    }
    return this._client.put(`/v1/ai/voice/${id}`, { body, ...options });
  }

  /**
   * Returns a list of voices available to you.
   *
   * @example
   * ```ts
   * const voices = await client.voices.list();
   * ```
   */
  list(query?: VoiceListParams, options?: Core.RequestOptions): Core.APIPromise<VoiceListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<VoiceListResponse>;
  list(
    query: VoiceListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<VoiceListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/v1/ai/voice/list', { query, ...options });
  }

  /**
   * Deletes a voice and cancels any pending operations on it. Cannot be undone.
   *
   * @example
   * ```ts
   * const voice = await client.voices.delete('123');
   * ```
   */
  delete(id: string, options?: Core.RequestOptions): Core.APIPromise<VoiceDeleteResponse> {
    return this._client.delete(`/v1/ai/voice/${id}`, options);
  }
}

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
   * A URL that returns a preview speech sample of this voice. The file can be played
   * directly in a browser or audio player.
   */
  preview_url?: string;

  /**
   * Whether this voice has been starred by you or not.
   */
  starred?: boolean;

  /**
   * The method by which this voice was created: `instant` or `professional`.
   */
  type?: 'instant' | 'professional';
}

export interface VoiceUpdateResponse {
  /**
   * Voice details
   */
  voice: Voice;
}

export type VoiceListResponse = Array<Voice>;

export interface VoiceDeleteResponse {
  success: boolean;
}

export interface VoiceCreateParams {
  /**
   * For unclean audio with background noise, applies processing to attempt to
   * improve quality. Default is `false` as this can also degrade quality in some
   * circumstances.
   */
  enhance: boolean;

  /**
   * One or more input audio files to train the voice in the form of binary `wav`,
   * `mp3`, `mp4`, `m4a`, or `webm` attachments.
   *
   * - Max attached files: 20.
   * - Max total file size: 250 MB.
   */
  files: Array<Core.Uploadable>;

  /**
   * The display name for this voice
   */
  name: string;

  /**
   * A text description of this voice.
   */
  description?: string;

  /**
   * A tag describing the gender of this voice. Has no effect on voice creation.
   */
  gender?: string;
}

export interface VoiceUpdateParams {
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
}

export interface VoiceListParams {
  /**
   * Which owner's voices to return. Choose from `system`, `me`, or `all`.
   */
  owner?: string;

  /**
   * If true, only returns voices that you have starred.
   */
  starred?: string;
}

export declare namespace Voices {
  export {
    type Voice as Voice,
    type VoiceUpdateResponse as VoiceUpdateResponse,
    type VoiceListResponse as VoiceListResponse,
    type VoiceDeleteResponse as VoiceDeleteResponse,
    type VoiceCreateParams as VoiceCreateParams,
    type VoiceUpdateParams as VoiceUpdateParams,
    type VoiceListParams as VoiceListParams,
  };
}
