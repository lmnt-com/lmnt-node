import fetch from 'isomorphic-fetch';
import FormData from 'form-data';
import WebSocket from 'isomorphic-ws';
import fs from 'fs';

const DEBUG = false;
const logDebug = (...args) => {
  if (DEBUG) {
    console.debug(...args);
  }
};

const URL_STREAMING = 'wss://api.lmnt.com/v1/ai/speech/stream';
const _BASE_URL = 'https://api.lmnt.com'
const _LIST_VOICES_ENDPOINT = '/v1/ai/voice/list'
const _VOICE_ENDPOINT = '/v1/ai/voice/{id}'
const _CREATE_VOICE_ENDPOINT = '/v1/ai/voice'
const _SPEECH_ENDPOINT = '/v1/ai/speech'
const _ACCOUNT_ENDPOINT = '/v1/account'

const MESSAGE_EOF = {"eof": true};
const MESSAGE_FLUSH = {"flush": true};

class SpeechError extends Error {
  constructor(status, error) {
      super();
      this.status = status;
      if ('error' in error) {
          this.message = error['error'];
      } else if ('message' in error) {
          this.message = error['message'];
      } else {
          this.message = 'Unknown error; see status code for hints on what went wrong.';
      }
  }

  toString() {
      return `SpeechError [status=${this.status}] ${this.message}`;
  }
}

class MessageQueue {
  constructor() {
    this._messages = [];
    this._resolvers = [];
  }

  finish() {
    while (this._resolvers.length) {
      const resolve = this._resolvers.shift();
      resolve(MESSAGE_EOF);
    }
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
  constructor(apiKey, voice, options={}) {
    this._socket = new WebSocket(URL_STREAMING);
    this._socket.onerror = (event) => {
      console.error("WebSocket error:", event);
      this._inMessages.finish();
    };
    this._socket.onmessage = this._onMessage.bind(this);
    this._outMessages = [];
    this._inMessages = new MessageQueue();
    this._return_extras = options.return_extras || false;
    this._sendMessage({
      'X-API-Key': apiKey,
      'voice': voice,
      'send_extras': options.return_extras || undefined,
      'speed': options.speed || undefined,
      'expressive': options.expressive || undefined,
    });
    this._socket.onopen = () => {
      logDebug(`Socket opened.`);
      this._flushMessages();
    };
    this._socket.onclose = (event) => {
      logDebug(`Socket closed.`);
      if (event.code !== 1000) {
        // 1000 is normal closure
        console.warn(
          `WebSocket closed unexpectedly with code: ${event.code}, reason: ${event.reason}`
        );
      }
      // TODO(shaper): Consider retrying on reconnect, or clearing queued messages.
      this._socket = null;
      this._inMessages.finish();
    };
  }

  appendText(text) {
    this._sendMessage({"text": text});
  }

  close() {
    if (this._socket) {
      this._socket.close();
      this._socket = null;
    }
  }

  flush() {
    this._sendMessage(MESSAGE_FLUSH);
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
    if (this._socket?.readyState === WebSocket.OPEN) {
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
      // When the socket is closed for whatever reason, we push a
      // special message on the incoming message queue to signal
      // that the stream is complete.
      if (message === MESSAGE_EOF) {
        return;
      }
      let data = {};
      if (this._return_extras) {
        const message2 = await this._inMessages.next();
        if (!(message2.data instanceof Buffer)) {
          throw new Error(`Unexpected message type: ${message2}`);
        }
        const audio = message2.data;
        const msg1_json = JSON.parse(message.data);
        data = {'audio': audio, 'durations': msg1_json['durations']};
        if ('warning' in msg1_json) {
          data['warning'] = msg1_json['warning'];
        }
      } else {
        if (!(message.data instanceof Buffer)) {
          throw new Error(`Unexpected message type: ${message}`);
        }
        data = {'audio': message.data};
      }
      yield data;
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

  async _fetchAndHandleResponse(method, url, caller, body = undefined, headers = this._getHeaders()) {
    try {
      const response = await fetch(url, {
        headers,
        method,
        body,
      })
      await this._handle_response_errors(response);
      return response.json();
    } catch (error) {
      throw new Error(`[${caller}] ${error.message}`);
    }
  }
    
  async fetchVoices(options = {}) {
    const starred = options.starred || false;
    const owner = options.owner || 'all';
    let url = `${_BASE_URL}${_LIST_VOICES_ENDPOINT}?starred=${starred}&owner=${owner}`;
    return this._fetchAndHandleResponse('GET', url, 'fetchVoices'); 
  }

  async fetchVoice(voice) {
    const url = `${_BASE_URL}${_VOICE_ENDPOINT.replace('{id}', voice)}`;
    return this._fetchAndHandleResponse('GET', url, 'fetchVoice');
  }

  async createVoice(name, enhance, filenames, type = 'instant', gender = null, description = null) {
    if (name.length === 0) {
      throw new Error('[Speech.createVoice] Name must be non-empty.');
    }
    if (filenames.length === 0) {
      throw new Error('[Speech.createVoice] Filenames must be non-empty.');
    }

    const metadata = JSON.stringify({
      name,
      enhance,
      type,
      gender,
      description,
    });

    const formData = new FormData();
    formData.append('metadata', metadata, {
      contentType: 'application/json',
    });
    filenames.forEach((filename) => {
      formData.append('file_field', fs.createReadStream(filename));
    }
    );
    const url = `${_BASE_URL}${_CREATE_VOICE_ENDPOINT}`;
    const headers = {
      ...formData.getHeaders(),
      ...this._getHeaders(),
    } 
    return this._fetchAndHandleResponse('POST', url, 'createVoice', formData, headers);
  }

  async updateVoice(voice, options = {}) {
    const url = `${_BASE_URL}${_VOICE_ENDPOINT.replace('{id}', voice)}`;
    return this._fetchAndHandleResponse('PUT', url, 'updateVoice', JSON.stringify(options));
  }

  async deleteVoice(voice) {
    const url = `${_BASE_URL}${_VOICE_ENDPOINT.replace('{id}', voice)}`;
    return this._fetchAndHandleResponse('DELETE', url, 'deleteVoice');
  }
  
  async synthesize(text, voice, options={}) {
    const formData = new FormData();
    formData.append('text', text);
    formData.append('voice', voice);

    const fields = ['format', 'length', 'return_durations', 'return_seed', 'seed', 'speed'];
    fields.forEach(field => {
      if (field in options) {
        if (typeof options[field] === 'boolean') {
          formData.append(field, options[field] ? 'true' : 'false');
        } else {
          formData.append(field, options[field]);
        }
      }
    });
    const url = `${_BASE_URL}${_SPEECH_ENDPOINT}`;
    const responseData = await this._fetchAndHandleResponse('POST', url, 'synthesize', formData);
    let synthesisResult = {};
    synthesisResult.audio = Buffer.from(responseData.audio, 'base64');
    if (options.return_durations) {
      synthesisResult.durations = responseData.durations;
    }
    if (options.return_seed) {
      synthesisResult.seed = responseData.seed;
    }
    return synthesisResult;
  }

  synthesizeStreaming(voice, options={}) {
    return new StreamingSynthesisConnection(this.apiKey, voice, options);
  }

  async fetchAccount() {
    const url = `${_BASE_URL}${_ACCOUNT_ENDPOINT}`;
    return this._fetchAndHandleResponse('GET', url, 'fetchAccount');
  }

  _getHeaders(contentType = null) {
    const headers = {'X-API-Key': this.apiKey};
    if (contentType) {
      headers['Content-Type'] = contentType;
    }
    return headers;
  }

  async _handle_response_errors(response) {
    if (!response.ok) {
      const message = await response.json();
      throw new SpeechError(response.status, message);
    }
  }
};

export default Speech;
