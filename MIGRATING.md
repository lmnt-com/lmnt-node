# Migrating from v1 to v2

## Client Initialization

```typescript
// In both v1 and v2, the API key can be retrieved using the LMNT_API_KEY environment variable or passed as an argument as below.
// v1
import Lmnt from 'lmnt-node';
const client = new Lmnt('your-api-key');

// v2
import Lmnt from 'lmnt-node';
const client = new Lmnt({ apiKey: 'your-api-key' });
```

## Synthesis

```typescript
// v1
const result = await client.synthesize('Hello world', 'voice-id'); // result: { audio: Buffer }

// v2
const response = await client.speech.generate({
    text: 'Hello world',
    voice: 'voice-id',
}); // result: Response
// To get the data all at once:
const buffer = Buffer.from(await response.arrayBuffer());
// Or to stream the data:
for await (const chunk of response.body) {
    // chunk is a Uint8Array of audio data
}
```

## Streaming (Speech Session)
```typescript
// v1
const stream = client.synthesizeStreaming('voice-id', {
    return_extras: true
});
stream.appendText('Hello world');
stream.finish();
for await (const chunk of stream) {
    // chunk: { audio: Buffer, durations?: Duration[], warning?: string }
}

// v2
const session = await client.speech.sessions.create({
    voice: 'voice-id',
    return_extras: true
});
session.appendText('Hello world');
session.finish();
for await (const chunk of session) {
    // chunk: { audio: Buffer, durations?: Duration[], warning?: string }
}
```


## Voice Management
```typescript
// v1
const voices = await client.fetchVoices({ starred: true });
const voice = await client.fetchVoice('voice-id');
await client.updateVoice('voice-id', { name: 'New Name' });
await client.deleteVoice('voice-id');
const filenames = ['filename1', 'filename2'];
await client.createVoice('voice-name', False, filenames)
// v2
const voices = await client.voices.list({ starred: true });
const voice = await client.voices.retrieve('voice-id');
await client.voices.update('voice-id', { name: 'New Name' });
await client.voices.delete('voice-id');
const files = [fs.createReadStream('filename1'), fs.createReadStream('filename2')];
await client.voices.create('voice-name', False, files)
```


## Account Information
```typescript
// v1
const account = await client.fetchAccount();
// v2
const account = await client.accounts.retrieve();
```


## Error Handling
The `SpeechError` class has been replaced with standard error types from the SDK. Errors will contain appropriate status codes and error messages.

## Runtime Detection
The v1 SDK's runtime detection for Node.js vs browser environments has been replaced with built-in environment handling in v2. You no longer need to handle this manually.
