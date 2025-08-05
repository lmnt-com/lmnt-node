import { Buffer } from 'buffer';
import { LmntError } from '../error';
import { SpeechSessionParams } from '../resources/sessions';
import { WebSocket } from '../_shims/index';

const URL_STREAMING = 'wss://api.lmnt.com/v1/ai/speech/stream';
const WEBSOCKET_OPEN_STATE = 1;
const WEBSOCKET_NORMAL_CLOSE = 1000;

class MessageQueue {
  private messages: any[] = [];
  private resolvers: ((value: any) => void)[] = [];

  finish() {
    while (this.resolvers.length) {
      const resolve = this.resolvers.shift();
      resolve?.(null);
    }
  }

  push(message: any) {
    if (this.resolvers.length) {
      const resolve = this.resolvers.shift();
      resolve?.(message);
    } else {
      this.messages.push(message);
    }
  }

  async next() {
    if (this.messages.length) {
      return this.messages.shift();
    } else {
      return new Promise((resolve) => this.resolvers.push(resolve));
    }
  }
}

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

export type SpeechStreamMessage = AudioMessage | ExtrasMessage | ErrorMessage | CompleteMessage;

/**
 * Audio message containing synthesized speech data
 */
export interface AudioMessage {
  type: 'audio';
  audio: ArrayBuffer | Buffer;
}

/**
 * Extras message containing metadata about the synthesis
 */
export interface ExtrasMessage {
  type: 'extras';
  durations?: Duration[];
  warning?: string;
  buffer_empty?: boolean;
}

/**
 * Error message containing error information
 */
export interface ErrorMessage {
  type: 'error';
  error: string;
}

/**
 * Complete message for commands (reset/flush)
 */
export interface CompleteMessage {
  type: 'complete';
  complete: 'reset' | 'flush';
  nonce: number;
}

export class SpeechSession {
  private socket: WebSocket;
  private outMessages: any[] = [];
  private inMessages: MessageQueue;
  private returnExtras: boolean;
  private nextNonce: number = 1;

  /**
   * Creates a new streaming speech connection.
   * @param apiKey The API key to use for the connection. Obtain a key
   *     from the [LMNT account page](https://app.lmnt.com/account).
   * @param options Configuration options including voice, format, language,
   *     sample rate, and other synthesis parameters.
   */
  constructor(apiKey: string, options: SpeechSessionParams) {
    this.outMessages = [];
    this.inMessages = new MessageQueue();
    this.returnExtras = options.return_extras || false;

    this.socket = new WebSocket(URL_STREAMING);
    this.setupWebSocket();

    this.sendMessage({
      'X-API-Key': apiKey,
      voice: options.voice,
      format: options.format,
      language: options.language,
      sample_rate: options.sample_rate,
      send_extras: options.return_extras,
      speed: options.speed,
      protocol_version: 2,
    });
  }

  private setupWebSocket() {
    this.socket.onerror = this.onError.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onclose = this.onClose.bind(this);
  }

  private onError(event: any) {
    console.error('WebSocket error:', event);
    this.inMessages.finish();
  }

  private onOpen() {
    this.flushMessages();
  }

  private onClose(event: any) {
    if (event.code !== WEBSOCKET_NORMAL_CLOSE) {
      console.warn(`WebSocket closed unexpectedly with code: ${event.code}, reason: ${event.reason}`);
    }
    this.socket = null as any;
    this.inMessages.finish();
  }

  private onMessage(event: MessageEvent) {
    const isText = typeof event.data === 'string';
    this.inMessages.push({
      type: isText ? 'text' : 'binary',
      data: event.data,
    });
  }

  /**
   * Appends text to the overall text to be synthesized.
   * @param text The additional text to synthesize.
   */
  appendText(text: string) {
    this.sendMessage({ text: text });
  }

  /**
   * Releases resources associated with this instance and closes the WebSocket connection.
   */
  close() {
    if (this.socket) {
      this.socket.close();
      this.socket = null as any;
    }
  }

  /**
   * Triggers the server to synthesize all currently queued text and return the audio data.
   * Use sparingly as it may affect the natural flow of speech synthesis.
   *
   * @returns The nonce used for this flush command
   */
  flush(): number {
    const nonce = this.nextNonce++;
    this.sendMessage({ command: 'flush', nonce });
    return nonce;
  }

  /**
   * Resets the speech session, discarding all queued text and stopping current synthesis.
   *
   * @returns The nonce used for this reset command
   */
  reset(): number {
    const nonce = this.nextNonce++;
    this.sendMessage({ command: 'reset', nonce });
    return nonce;
  }

  /**
   * Finishes the streaming session after writing all text. This will flush remaining data
   * and close the connection after all audio has been received.
   */
  finish() {
    this.sendMessage({ command: 'eof' });
  }

  /**
   * Iterate over messages from the server.
   *
   * @returns AsyncIterator<SpeechStreamMessage>
   */
  async *[Symbol.asyncIterator](): AsyncIterator<SpeechStreamMessage> {
    while (true) {
      const message = await this.inMessages.next();
      if (message === null) {
        return;
      }

      if (message.type === 'text') {
        yield this.parseTextMessage(message.data);
      } else {
        try {
          const audio = await this.processAudioData(message.data);
          yield { type: 'audio', audio };
        } catch (error) {
          yield { type: 'error', error: error instanceof Error ? error.message : String(error) };
        }
      }
    }
  }

  private parseTextMessage(textData: string): SpeechStreamMessage {
    const messageJson = JSON.parse(textData);

    if ('error' in messageJson) {
      return { type: 'error', ...messageJson };
    }

    if ('complete' in messageJson) {
      return { type: 'complete', ...messageJson };
    }

    if (
      this.returnExtras &&
      (messageJson.durations || messageJson.warning || messageJson.buffer_empty !== undefined)
    ) {
      return { type: 'extras', ...messageJson };
    }

    return { type: 'error', ...messageJson };
  }

  private sendMessage(message: any) {
    this.outMessages.push(message);
    this.flushMessages();
  }

  private flushMessages() {
    if (this.socket?.readyState === WEBSOCKET_OPEN_STATE) {
      while (this.outMessages.length) {
        const message = this.outMessages.shift();
        this.socket.send(JSON.stringify(message));
      }
    }
  }

  private async processAudioData(audioData: Blob | Buffer): Promise<ArrayBuffer | Buffer> {
    if (audioData instanceof Blob) {
      return await audioData.arrayBuffer();
    } else if (audioData instanceof Buffer) {
      return audioData;
    } else {
      throw new LmntError(`Unexpected message type received from server: ${audioData}`);
    }
  }
}
