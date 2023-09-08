import fetch from 'isomorphic-fetch';
import FormData from 'form-data';
import WebSocket from 'ws';

const DEBUG = false;
const logDebug = (...args) => {
  if (DEBUG) {
    console.debug(...args);
  }
};

const URL_STREAMING = 'wss://api.lmnt.com/speech/beta/synthesize_streaming';
const URL_VOICES = 'https://api.lmnt.com/speech/beta/voices';
const URL_SYNTHESIZE = 'https://api.lmnt.com/speech/beta/synthesize';

const MESSAGE_EOF = {"eof": "true"};

class MessageQueue {
  constructor() {
    this._messages = [];
    this._resolvers = [];
  }

  push(message) {
    if (this._resolvers.length) {
      const resolve = this._resolvers.shift();
      resolve(message);
    } else {
      this._messages.push(message);
    }
  }

  async next() {
    if (this._messages.length) {
      return this._messages.shift();
    } else {
      return new Promise(resolve => this._resolvers.push(resolve));
    }
  }
}

class StreamingSynthesisConnection {
  constructor(apiKey, voice) {
    this._socket = new WebSocket(URL_STREAMING);
    // TODO(shaper): Provide some way for users to handle/be informed of errors.
    this._socket.on('error', console.error);
    this._socket.on('message', this._onMessage.bind(this));
    this._outMessages = [];
    this._inMessages = new MessageQueue();

    this._sendMessage({
      'X-API-Key': apiKey,
      'voice': voice
    });
    this._socket.on('open', () => {
      logDebug(`Socket opened.`);
      this._flushMessages();
    });
    this._socket.on('close', () => {
      logDebug(`Socket closed.`);
      // TODO(shaper): Consider retrying on reconnect, or clearing queued messages.
    });
  }

  appendText(text) {
    this._sendMessage({"text": text});
  }

  finish() {
    this._sendMessage(MESSAGE_EOF);
  }

  _sendMessage(message) {
    logDebug(`Queuing message:`, message);
    this._outMessages.push(message);
    this._flushMessages();
  }

  _flushMessages() {
    if (this._socket.readyState === WebSocket.OPEN) {
      while (this._outMessages.length) {
        const message = this._outMessages.shift();
        logDebug(`Sending message:`, message);
        this._socket.send(JSON.stringify(message));
      }
    }
  }

  _onMessage(message) {
    logDebug(`Received message:`, message);
    this._inMessages.push(message);
  }

  async *[Symbol.asyncIterator]() {
    while (true) {
      const message = await this._inMessages.next();
      yield message;
    }
  }
};

class Speech {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('No API key set. Visit https://app.lmnt.com/account to get one.');
    }
    this.apiKey = apiKey;
  }

  async fetchVoices() {
    return fetch(URL_VOICES, {
      headers: this._getHeaders(),
      method: 'GET'
    }).then(response => response.json());
  }

  async synthesize(text, voice, options={}) {
    const formData = new FormData();
    formData.append('text', text);
    formData.append('voice', voice);
    const fields = ['seed', 'format', 'speed'];
    fields.forEach(field => {
      if (field in options) {
        formData.append(field, options[field]);
      }
    });

    return fetch(URL_SYNTHESIZE, {
      headers: this._getHeaders(),
      method: 'POST',
      body: formData
    }).then(response => response.arrayBuffer())
    .then(arrayBuffer => Buffer.from(arrayBuffer));
  }

  synthesizeStreaming(voice) {
    return new StreamingSynthesisConnection(this.apiKey, voice);
  }

  _getHeaders() {
    return {
      'X-API-Key': this.apiKey
    };
  }
};

export default Speech;
