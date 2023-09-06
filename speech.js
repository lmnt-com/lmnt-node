import fetch from 'isomorphic-fetch';
import FormData from 'form-data';

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
