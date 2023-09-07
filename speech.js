import fetch from 'isomorphic-fetch';
import FormData from 'form-data';
import WebSocket from 'ws';

const DEBUG = false;
const logDebug = (message) => {
  if (DEBUG) {
    console.debug(message);
  }
};

class StreamingSynthesisConnection {
  constructor(apiKey, voice, audioCallback) {
    this._audioCallback = audioCallback;

    this._socket = new WebSocket('wss://api.lmnt.com/speech/beta/synthesize_streaming');
    // TODO(shaper): We probably want a way for the user to specify an error handler.
    this._socket.on('error', console.error);
    this._socket.on('message', this._onMessage.bind(this));
    this._messages = [];

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
    this._sendMessage({"eof": "true"});
  }

  _sendMessage(message) {
    this._messages.push(message);
    this._flushMessages();
  }

  _flushMessages() {
    if (this._socket.readyState === WebSocket.OPEN) {
      while (this._messages.length) {
        const message = this._messages.shift();
        logDebug(`Sending message:`, message);
        this._socket.send(JSON.stringify(message));
      }
    }
  }

  _onMessage(message) {
    logDebug(`Received message:`, message);
    this._audioCallback(message);
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
    return fetch('https://api.lmnt.com/speech/beta/voices', {
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

    return fetch('https://api.lmnt.com/speech/beta/synthesize', {
      headers: this._getHeaders(),
      method: 'POST',
      body: formData
    }).then(response => response.blob());
  }

  async synthesizeStreaming(voice, audioCallback) {
    return new StreamingSynthesisConnection(this.apiKey, voice, audioCallback);
  }

  createVoice(metadata, files) {
    // TODO(shaper): Finish this.
  }

  cancelVoice(voiceId) {
    // TODO(shaper): Finish this.
  }

  _getHeaders() {
    return {
      'X-API-Key': this.apiKey
    };
  }
};

export default Speech;
