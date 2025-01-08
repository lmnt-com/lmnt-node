// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';

export class Voices extends APIResource {
  /**
   * Submits a request to create a voice with a supplied voice configuration and a
   * batch of input audio data.
   */
  create(body: VoiceCreateParams, options?: Core.RequestOptions): Core.APIPromise<Voice> {
    return this._client.post('/v1/ai/voice', Core.multipartFormRequestOptions({ body, ...options }));
  }

  /**
   * Updates metadata for a specific voice. Only provided fields will be changed.
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
   */
  delete(id: string, options?: Core.RequestOptions): Core.APIPromise<unknown> {
    return this._client.delete(`/v1/ai/voice/${id}`, options);
  }

  /**
   * Returns details of a specific voice.
   */
  get(id: string, options?: Core.RequestOptions): Core.APIPromise<Voice> {
    return this._client.get(`/v1/ai/voice/${id}`, options);
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

export type VoiceDeleteResponse = unknown;

export interface VoiceCreateParams {
  /**
   * One or more input audio files in wav, mp3, mp4, m4a, or webm format. Max total
   * file size: 250 MB. Professional voices require at least 5 minutes of source
   * audio.
   */
  files: Array<Core.Uploadable>;

  /**
   * Information about the voice you are creating
   */
  metadata: string;
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

  /**
   * If true, unfreezes this voice and upgrades it to the latest model.
   */
  unfreeze?: boolean;
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
