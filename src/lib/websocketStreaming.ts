import { Buffer } from 'buffer';
import { LmntError } from '../error';
import { SpeechSessionParams } from '../resources/sessions';
import { WebSocket } from '../_shims/index';

const URL_STREAMING = 'wss://api.lmnt.com/v1/ai/speech/stream';
const WEBSOCKET_OPEN_STATE = 1;
const WEBSOCKET_NORMAL_CLOSE = 1000;

const MESSAGE_EOF = { eof: true };
const MESSAGE_FLUSH = { flush: true };

class MessageQueue {
  private messages: any[] = [];
  private resolvers: ((value: any) => void)[] = [];

  finish() {
    while (this.resolvers.length) {
      const resolve = this.resolvers.shift();
      resolve?.(MESSAGE_EOF);
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

export interface SpeechStreamResponse {
  /**
   * The synthesized speech audio data
   */
  audio: ArrayBuffer | Buffer;

  /**
   * The durations of the generated speech
   */
  durations?: Duration[];

  /**
   * A warning message
   */
  warning?: string;

  /**
   * Whether the buffer on the server is empty
   */
  buffer_empty?: boolean;
}

export class SpeechSession {
  private socket: WebSocket;
  private outMessages: any[] = [];
  private inMessages: MessageQueue;
  private returnExtras: boolean;

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

  private onMessage(message: any) {
    this.inMessages.push(message);
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
   */
  flush() {
    this.sendMessage(MESSAGE_FLUSH);
  }

  /**
   * Finishes the streaming session after writing all text. This will flush remaining data
   * and close the connection after all audio has been received.
   */
  finish() {
    this.sendMessage(MESSAGE_EOF);
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

  /**
   * Returns an async iterator that yields objects containing synthesized speech audio data
   * and optional metadata like durations and warnings when return_extras is enabled.
   * @returns AsyncIterator<SpeechStreamResponse>
   */
  async *[Symbol.asyncIterator](): AsyncIterator<SpeechStreamResponse> {
    while (true) {
      const message = await this.inMessages.next();
      if (message === MESSAGE_EOF) {
        return;
      }

      let data: SpeechStreamResponse;
      if (this.returnExtras) {
        const msg1Json = this.parseAndCheckForError(message.data, false);
        const msg2 = await this.inMessages.next();
        const audio = await this.processAudioData(msg2.data);
        data = {
          audio,
          durations: msg1Json['durations'],
        };
        if ('warning' in msg1Json) {
          data.warning = msg1Json['warning'];
        }
        if ('buffer_empty' in msg1Json) {
          data.buffer_empty = msg1Json['buffer_empty'];
        }
      } else {
        const audio = await this.processAudioData(message.data);
        data = { audio };
      }
      yield data;
    }
  }

  private async processAudioData(audioData: any): Promise<ArrayBuffer | Buffer> {
    if (audioData instanceof Blob) {
      return await audioData.arrayBuffer();
    } else if (audioData instanceof Buffer) {
      return audioData;
    } else {
      this.parseAndCheckForError(audioData);
    }
    return new ArrayBuffer(0);
  }

  private parseAndCheckForError(message: any, requireError = true) {
    let messageJson;
    try {
      messageJson = JSON.parse(message);
    } catch {
      throw new Error(`Unexpected message type received from server: ${message}`);
    }
    if ('error' in messageJson) {
      throw new LmntError(messageJson['error']);
    }
    if (requireError) {
      throw new Error(`Unexpected message type received from server: ${message}`);
    }
    return messageJson;
  }
}
