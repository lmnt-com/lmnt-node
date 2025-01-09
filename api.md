# Lmnt

Types:

- <code><a href="./src/resources/top-level.ts">AccountResponse</a></code>
- <code><a href="./src/resources/top-level.ts">SynthesizeResponse</a></code>

Methods:

- <code title="get /v1/account">client.<a href="./src/index.ts">account</a>() -> AccountResponse</code>
- <code title="post /v1/ai/speech">client.<a href="./src/index.ts">synthesize</a>({ ...params }) -> SynthesizeResponse</code>
- <code title="get /v1/ai/speech">client.<a href="./src/index.ts">synthesizeChunked</a>({ ...params }) -> Response</code>

# Voices

Types:

- <code><a href="./src/resources/voices.ts">Voice</a></code>
- <code><a href="./src/resources/voices.ts">VoiceUpdateResponse</a></code>
- <code><a href="./src/resources/voices.ts">VoiceListResponse</a></code>
- <code><a href="./src/resources/voices.ts">VoiceDeleteResponse</a></code>

Methods:

- <code title="post /v1/ai/voice">client.voices.<a href="./src/resources/voices.ts">create</a>({ ...params }) -> Voice</code>
- <code title="put /v1/ai/voice/{id}">client.voices.<a href="./src/resources/voices.ts">update</a>(id, { ...params }) -> VoiceUpdateResponse</code>
- <code title="get /v1/ai/voice/list">client.voices.<a href="./src/resources/voices.ts">list</a>({ ...params }) -> VoiceListResponse</code>
- <code title="delete /v1/ai/voice/{id}">client.voices.<a href="./src/resources/voices.ts">delete</a>(id) -> unknown</code>
- <code title="get /v1/ai/voice/{id}">client.voices.<a href="./src/resources/voices.ts">get</a>(id) -> Voice</code>
