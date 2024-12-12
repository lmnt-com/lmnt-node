// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as SpeechAPI from './speech';
import { Speech, SpeechCreateParams, SpeechCreateResponse, SpeechRetrieveParams } from './speech';
import * as VoicesAPI from './voices';
import {
  Voice,
  VoiceCreateParams,
  VoiceDeleteParams,
  VoiceDeleteResponse,
  VoiceListParams,
  VoiceListResponse,
  VoiceRetrieveParams,
  VoiceUpdateParams,
  VoiceUpdateResponse,
  Voices,
} from './voices';

export class AI extends APIResource {
  speech: SpeechAPI.Speech = new SpeechAPI.Speech(this._client);
  voices: VoicesAPI.Voices = new VoicesAPI.Voices(this._client);
}

AI.Speech = Speech;
AI.Voices = Voices;

export declare namespace AI {
  export {
    Speech as Speech,
    type SpeechCreateResponse as SpeechCreateResponse,
    type SpeechCreateParams as SpeechCreateParams,
    type SpeechRetrieveParams as SpeechRetrieveParams,
  };

  export {
    Voices as Voices,
    type Voice as Voice,
    type VoiceUpdateResponse as VoiceUpdateResponse,
    type VoiceListResponse as VoiceListResponse,
    type VoiceDeleteResponse as VoiceDeleteResponse,
    type VoiceCreateParams as VoiceCreateParams,
    type VoiceRetrieveParams as VoiceRetrieveParams,
    type VoiceUpdateParams as VoiceUpdateParams,
    type VoiceListParams as VoiceListParams,
    type VoiceDeleteParams as VoiceDeleteParams,
  };
}
