// Spec-agnostic WebSocket session helpers shared by the generated SpeechSession.
// MessageQueue: simple async resolver/buffer pair so the generated session can
// expose an `AsyncIterator` while the underlying WebSocket pushes via callbacks.
// processBinaryFrame: normalises Blob/Buffer payloads to a uniform binary type.

import { Buffer } from 'buffer';
import { LmntError } from './error';

export const WEBSOCKET_OPEN_STATE = 1;
export const WEBSOCKET_NORMAL_CLOSE = 1000;

export class MessageQueue {
  private messages: any[] = [];
  private resolvers: ((value: any) => void)[] = [];
  private done = false;

  finish() {
    this.done = true;
    while (this.resolvers.length) {
      const resolve = this.resolvers.shift();
      resolve?.(null);
    }
  }

  push(message: any) {
    if (this.done) return;
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
    }
    if (this.done) {
      return null;
    }
    return new Promise((resolve) => this.resolvers.push(resolve));
  }
}

export async function processBinaryFrame(frame: Blob | Buffer): Promise<ArrayBuffer | Buffer> {
  if (frame instanceof Blob) {
    return await frame.arrayBuffer();
  } else if (frame instanceof Buffer) {
    return frame;
  } else {
    throw new LmntError(`Unexpected message type received from server: ${frame}`);
  }
}
