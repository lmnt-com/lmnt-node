import { APIResource } from '../resource';
import { SpeechSession } from '../lib/websocketStreaming';

export class Sessions extends APIResource {
  /**
   * Create a new websocket connection for full-duplex streaming speech synthesis.
   */
  create(body: SpeechSessionParams) {
    return new SpeechSession(this._client.apiKey, body);
  }
}

export interface SpeechSessionParams {
  /**
   * The voice id of the voice to use for synthesis
   */
  voice: string;

  /**
   * The file format of the synthesized audio output
   */
  format?: 'mp3' | 'raw' | 'ulaw';

  /**
   * The desired language of the synthesized speech. Two letter ISO 639-1 code.
   */
  language?: 'de' | 'en' | 'es' | 'fr' | 'pt' | 'zh' | 'ko' | 'hi';

  /**
   * The desired output sample rate in Hz
   */
  sample_rate?: 8000 | 16000 | 24000;

  /**
   * The talking speed of the generated speech
   */
  speed?: number;

  /**
   * If set as `true`, response will contain a durations object.
   */
  return_extras?: boolean;
}

export declare namespace Sessions {
  export { type SpeechSessionParams as SpeechSessionParams };
  export { SpeechSession as SpeechSession };
}
