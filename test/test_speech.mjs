import assert from 'node:assert/strict';
import FormData from 'form-data';
import nock from 'nock';

import Speech from '../src/esm/speech.js';

const _BASE_URL = 'https://api.lmnt.com';
const _VOICE_ENDPOINT = '/v1/ai/voice/{id}';
const _SPEECH_ENDPOINT = '/v1/ai/speech';

describe('Speech', function () {
  beforeEach(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());

  describe('#constructor()', function () {
    it('should throw without an api key', function () {
      assert.throws(() => new Speech(), Error);
    });
  });

  describe('#fetchVoices()', function () {
    it('should return json voice list', async function () {
      const scope = nock(_BASE_URL)
        .get('/v1/ai/voice/list?starred=false&owner=all')
        .reply(200, [
          {
            id: 'lily',
            name: 'Lily',
            gender: 'F',
            tags: ['female'],
            imageUrl: 'https://api.lmnt.com/img/voice/lily.webp',
            state: 'ready'
          }
        ]);

      let speech = new Speech('1337');
      let response = await speech.fetchVoices();
      assert.equal(response[0].id, 'lily');

      scope.done();
    });

    it('should throw an error if the request fails', async () => {
      const errorMessage = 'Something went wrong';
      const path = '/v1/ai/voice/list?starred=false&owner=all';

      nock(_BASE_URL)
        .get(path)
        .replyWithError(errorMessage);

      const speech = new Speech('apiKey');

      try {
        await speech.fetchVoices();
        assert.fail('Expected error was not thrown');
      } catch (error) {
        assert.equal(error.message, `[fetchVoices] request to ${_BASE_URL}${path} failed, reason: ${errorMessage}`);
      }
    });

    it('should throw an error if the request returns error', async () => {
      const idError = 'Something went wrong';
      const mockResponse = {'error': idError};

      nock(_BASE_URL)
        .get('/v1/ai/voice/list?starred=false&owner=all')
        .reply(400, mockResponse);

      const speech = new Speech('apiKey');

      try {
        await speech.fetchVoices();
        assert.fail('Expected error was not thrown');
      } catch (error) {
        assert.equal(error.message, `[fetchVoices] ${idError}`);
      }
    });

    it('should call the correct URL when starred is true', async () => {
      const path = '/v1/ai/voice/list?starred=true&owner=all';
    
      const scope = nock(_BASE_URL)
        .get(path)
        .reply(200, []);
    
      const speech = new Speech('apiKey');
      const options = { starred: true };
      await speech.fetchVoices(options);
    
      assert(scope.isDone(), 'Expected URL was not called');
    });

    it('should call the correct URL when owner is me', async () => {
      const path = '/v1/ai/voice/list?starred=false&owner=me';
    
      const scope = nock(_BASE_URL)
        .get(path)
        .reply(200, []);
    
      const speech = new Speech('apiKey');
      const options = { owner: 'me' };
      await speech.fetchVoices(options);
    
      assert(scope.isDone(), 'Expected URL was not called');
    });

    it('should call the correct URL when owner is lmnt', async () => {
      const path = '/v1/ai/voice/list?starred=false&owner=system';
    
      const scope = nock(_BASE_URL)
        .get(path)
        .reply(200, []);
    
      const speech = new Speech('apiKey');
      const options = { owner: 'system' };
      await speech.fetchVoices(options);
    
      assert(scope.isDone(), 'Expected URL was not called');
    });

    it('should call the correct URL when owner is me and starred is true', async () => {
      const path = '/v1/ai/voice/list?starred=true&owner=me';
    
      const scope = nock(_BASE_URL)
        .get(path)
        .reply(200, []);
    
      const speech = new Speech('apiKey');
      const options = { owner: 'me', starred: true };
      await speech.fetchVoices(options);
    
      assert(scope.isDone(), 'Expected URL was not called');
    });
  });

  describe('#fetchVoice()', () => {
    it('should fetch voice data', async () => {
      const voiceId = '123';
      const mockResponse = { id: '123', name: 'Test Voice' };

      nock(_BASE_URL)
        .get(`/v1/ai/voice/${voiceId}`)
        .reply(200, mockResponse);

      const speech = new Speech('apiKey');
      const response = await speech.fetchVoice(voiceId);

      assert.deepEqual(response, mockResponse);
    });

    it('should throw an error if the request fails', async () => {
      const voiceId = '123';
      const errorMessage = 'Something went wrong';
      const path = `/v1/ai/voice/${voiceId}`;

      nock(_BASE_URL)
        .get(path)
        .replyWithError(errorMessage);

      const speech = new Speech('apiKey');

      try {
        await speech.fetchVoice(voiceId);
        assert.fail('Expected error was not thrown');
      } catch (error) {
        assert.equal(error.message, `[fetchVoice] request to ${_BASE_URL}${path} failed, reason: ${errorMessage}`);
      }
    });

    it('should throw an error if the request returns error', async () => {
      const voiceId = '123';
      const idError = 'Invalid id';
      const mockResponse = {'error': idError};

      nock(_BASE_URL)
        .get(`/v1/ai/voice/${voiceId}`)
        .reply(400, mockResponse);

      const speech = new Speech('apiKey');

      try {
        await speech.fetchVoice(voiceId);
        assert.fail('Expected error was not thrown');
      } catch (error) {
        assert.equal(error.message, `[fetchVoice] ${idError}`);
      }
    });
  });

  describe('#updateVoice()', () => {
    it ('should update voice data', async () => {
      const voiceId = '123';
      const mockResponse = { id: '123', name: 'Test Voice' };
      const options = {
        name: 'New Name',
        starred: true,
        gender: 'female',
        description: 'New Description',
      };

      nock(_BASE_URL)
        .put(_VOICE_ENDPOINT.replace('{id}', voiceId), (body) => {
          assert.deepEqual(body, options);
          return true;
        })
        .reply(200, mockResponse);

      const speech = new Speech('apiKey');
      const response = await speech.updateVoice(voiceId, options);

      assert.deepEqual(response, mockResponse);
    }
    );

    it ('should update voice data, some missing', async () => {
      const voiceId = '123';
      const mockResponse = { id: '123', name: 'Test Voice' };
      const options = {
        name: 'New Name',
        description: 'New Description',
      };

      nock(_BASE_URL)
        .put(_VOICE_ENDPOINT.replace('{id}', voiceId), (body) => {
          assert.deepEqual(body, options);
          return true;
        })
        .reply(200, mockResponse);

      const speech = new Speech('apiKey');
      const response = await speech.updateVoice(voiceId, options);

      assert.deepEqual(response, mockResponse);
    }
    );

    it ('should update voice data, all missing', async () => {
      const voiceId = '123';
      const mockResponse = { id: '123', name: 'Test Voice' };
      const options = {};

      nock(_BASE_URL)
        .put(_VOICE_ENDPOINT.replace('{id}', voiceId), (body) => {
          assert.deepEqual(body, options);
          return true;
        })
        .reply(200, mockResponse);

      const speech = new Speech('apiKey');
      const response = await speech.updateVoice(voiceId, options);

      assert.deepEqual(response, mockResponse);
    });

    it ('should throw an error if the request fails', async () => {
      const voiceId = '123';
      const errorMessage = 'Something went wrong';
      const path = _VOICE_ENDPOINT.replace('{id}', voiceId);

      nock(_BASE_URL)
        .put(path)
        .replyWithError(errorMessage);

      const speech = new Speech('apiKey');

      try {
        await speech.updateVoice(voiceId, {});
        assert.fail('Expected error was not thrown');
      } catch (error) {
        assert.equal(error.message, `[updateVoice] request to ${_BASE_URL}${path} failed, reason: ${errorMessage}`);
      }
    }
    );

    it ('should throw an error if the request returns error', async () => {
      const voiceId = '123';
      const idError = 'Invalid id';
      const mockResponse = {'error': idError};

      nock(_BASE_URL)
        .put(_VOICE_ENDPOINT.replace('{id}', voiceId))
        .reply(400, mockResponse);

      const speech = new Speech('apiKey');

      try {
        await speech.updateVoice(voiceId, {});
        assert.fail('Expected error was not thrown');
      } catch (error) {
        assert.equal(error.message, `[updateVoice] ${idError}`);
      }
    }
    );
  });

  describe('#deleteVoice()', () => {
    it('should delete a voice', async () => {
      const voiceId = '123';
  
      nock(_BASE_URL)
        .delete(_VOICE_ENDPOINT.replace('{id}', voiceId))
        .reply(200, {});
  
      const speech = new Speech('apiKey');
      const response = await speech.deleteVoice(voiceId);
  
      assert.deepEqual(response, {});
    });
  
    it('should throw an error if the request fails', async () => {
      const voiceId = '123';
      const errorMessage = 'Something went wrong';
      const path = _VOICE_ENDPOINT.replace('{id}', voiceId);
  
      nock(_BASE_URL)
        .delete(path)
        .replyWithError(errorMessage);
  
      const speech = new Speech('apiKey');
  
      try {
        await speech.deleteVoice(voiceId);
        assert.fail('Expected error was not thrown');
      } catch (error) {
        assert.equal(error.message, `[deleteVoice] request to ${_BASE_URL}${path} failed, reason: ${errorMessage}`);
      }
    });
  
    it('should throw an error if the request returns error', async () => {
      const voiceId = '123';
      const idError = 'Invalid id';
      const mockResponse = {'error': idError};
  
      nock(_BASE_URL)
        .delete(_VOICE_ENDPOINT.replace('{id}', voiceId))
        .reply(400, mockResponse);
  
      const speech = new Speech('apiKey');
  
      try {
        await speech.deleteVoice(voiceId);
        assert.fail('Expected error was not thrown');
      } catch (error) {
        assert.equal(error.message, `[deleteVoice] ${idError}`);
      }
    });
  });

  describe('#synthesize()', function () {
    it('should return synthesized audio', async () => {
      const formData = new FormData();
      formData.append('text', 'Foo Text');
      formData.append('voice', 'foo-voice');

      const scope = nock('https://api.lmnt.com')
        .post(_SPEECH_ENDPOINT)
        .reply(200, {
          audio: 'foo'
        })

      let speech = new Speech('1337');
      const response = await speech.synthesize('Foo Text', 'foo-voice');
      const expected = {'audio': Buffer.from('foo', 'base64')};
      assert.deepStrictEqual(response, expected);

      scope.done();
    });

    it ('should return synthesized audio with durations', async () => {
      const scope = nock('https://api.lmnt.com')
        .post(_SPEECH_ENDPOINT)
        .reply(200, {
          audio: 'foo',
          durations: [1, 2, 3]
        })

      let speech = new Speech('1337');
      const response = await speech.synthesize('Foo Text', 'foo-voice', { return_durations: true });
      const expected = {'audio': Buffer.from('foo', 'base64'), 'durations': [1, 2, 3]};
      assert.deepStrictEqual(response, expected);

      scope.done();
    });

    it ('should return synthesized audio with seed', async () => {
      const scope = nock('https://api.lmnt.com')
        .post(_SPEECH_ENDPOINT)
        .reply(200, {
          audio: 'foo',
          seed: 1
        })

      let speech = new Speech('1337');
      const response = await speech.synthesize('Foo Text', 'foo-voice', { return_seed: true });
      const expected = {'audio': Buffer.from('foo', 'base64'), 'seed': 1};
      assert.deepStrictEqual(response, expected);

      scope.done();
    });

    it ('should return synthesized audio with seed and durations', async () => {
      const scope = nock('https://api.lmnt.com')
        .post(_SPEECH_ENDPOINT)
        .reply(200, {
          audio: 'foo',
          seed: 1,
          durations: [1, 2, 3]
        })

      let speech = new Speech('1337');
      const response = await speech.synthesize('Foo Text', 'foo-voice', { return_seed: true, return_durations: true });
      const expected = {'audio': Buffer.from('foo', 'base64'), 'seed': 1, 'durations': [1, 2, 3]};
      assert.deepStrictEqual(response, expected);

      scope.done();
    });

    it ('should throw an error if the request fails', async () => {
      const errorMessage = 'Something went wrong';

      nock(_BASE_URL)
        .post(_SPEECH_ENDPOINT)
        .replyWithError(errorMessage);

      const speech = new Speech('apiKey');

      try {
        await speech.synthesize('Foo Text', 'foo-voice');
        assert.fail('Expected error was not thrown');
      } catch (error) {
        assert.equal(error.message, `[synthesize] request to ${_BASE_URL}${_SPEECH_ENDPOINT} failed, reason: ${errorMessage}`);
      }
    });

    it ('should throw an error if the request returns error', async () => {
      const someError = 'Some error';
      const mockResponse = {'error': someError};

      nock(_BASE_URL)
        .post(_SPEECH_ENDPOINT)
        .reply(400, mockResponse);

      const speech = new Speech('apiKey');

      try {
        await speech.synthesize('Foo Text', 'foo-voice');
        assert.fail('Expected error was not thrown');
      } catch (error) {
        assert.equal(error.message, `[synthesize] ${someError}`);
      }
    });
  });
});
