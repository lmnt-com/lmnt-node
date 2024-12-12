# Accounts

Types:

- <code><a href="./src/resources/accounts.ts">AccountRetrieveResponse</a></code>

Methods:

- <code title="get /v1/account">client.accounts.<a href="./src/resources/accounts.ts">retrieve</a>({ ...params }) -> AccountRetrieveResponse</code>

# AI

## Speech

Types:

- <code><a href="./src/resources/ai/speech.ts">SpeechCreateResponse</a></code>

Methods:

- <code title="post /v1/ai/speech">client.ai.speech.<a href="./src/resources/ai/speech.ts">create</a>({ ...params }) -> SpeechCreateResponse</code>
- <code title="get /v1/ai/speech">client.ai.speech.<a href="./src/resources/ai/speech.ts">retrieve</a>({ ...params }) -> Response</code>

## Voices

Types:

- <code><a href="./src/resources/ai/voices.ts">Voice</a></code>
- <code><a href="./src/resources/ai/voices.ts">VoiceUpdateResponse</a></code>
- <code><a href="./src/resources/ai/voices.ts">VoiceListResponse</a></code>
- <code><a href="./src/resources/ai/voices.ts">VoiceDeleteResponse</a></code>

Methods:

- <code title="post /v1/ai/voice">client.ai.voices.<a href="./src/resources/ai/voices.ts">create</a>({ ...params }) -> Voice</code>
- <code title="get /v1/ai/voice/{id}">client.ai.voices.<a href="./src/resources/ai/voices.ts">retrieve</a>(id, { ...params }) -> Voice</code>
- <code title="put /v1/ai/voice/{id}">client.ai.voices.<a href="./src/resources/ai/voices.ts">update</a>(id, { ...params }) -> VoiceUpdateResponse</code>
- <code title="get /v1/ai/voice/list">client.ai.voices.<a href="./src/resources/ai/voices.ts">list</a>({ ...params }) -> VoiceListResponse</code>
- <code title="delete /v1/ai/voice/{id}">client.ai.voices.<a href="./src/resources/ai/voices.ts">delete</a>(id, { ...params }) -> unknown</code>
