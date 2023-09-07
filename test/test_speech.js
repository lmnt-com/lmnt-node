import assert from 'node:assert/strict';
import FormData from 'form-data';
import nock from 'nock';

import Speech from '../speech.js';

describe('Speech', function () {
  describe('#constructor()', function () {
    it('should throw without an api key', function () {
      assert.throws(() => new Speech(), Error);
    });
  });

  describe('#fetchVoices()', function () {
    it('should return json voice list', async function () {
      const scope = nock('https://api.lmnt.com')
        .get('/speech/beta/voices')
        .reply(200, {
          shanti: {
            id: 'shanti',
            name: 'Shanti',
            gender: 'F',
            tags: ['female', 'indian-accent', 'older'],
            imageUrl: 'https://api.lmnt.com/img/voice/shanti.webp',
            state: 'ready'
          }
        });

      let speech = new Speech('1337');
      let response = await speech.fetchVoices();
      assert.equal(response.shanti.id, 'shanti');

      scope.done();
    });
  });

  describe('#synthesize()', function () {
    it('should return synthesized audio', async function () {
      const formData = new FormData();
      formData.append('text', 'Foo Text');
      formData.append('voice', 'foo-voice');
      formData.append('seed', 0);

      const scope = nock('https://api.lmnt.com')
        .post('/speech/beta/synthesize', body => formData)
        .reply(200, {
          blob: 'foo'
        });

      let speech = new Speech('1337');
      const response = await speech.synthesize('Foo Text', 'foo-voice');

      const str = '{"blob":"foo"}';
      const expected = Buffer.from(str, 'utf8');
      assert.deepStrictEqual(response, expected);

      scope.done();
    });
  });

  describe('#createVoice()', function () {
  });

  describe('#cancelVoice()', function () {
  });
});
