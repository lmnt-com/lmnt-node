# Speech

Methods:

- <code title="post /v1/ai/speech/bytes">client.speech.<a href="./src/resources/speech.ts">generate</a>({ ...params }) -> Response</code>

# Accounts

Types:

- <code><a href="./src/resources/accounts.ts">AccountRetrieveResponse</a></code>

Methods:

- <code title="get /v1/account">client.accounts.<a href="./src/resources/accounts.ts">retrieve</a>() -> AccountRetrieveResponse</code>

# Voices

Types:

- <code><a href="./src/resources/voices.ts">Voice</a></code>
- <code><a href="./src/resources/voices.ts">VoiceUpdateResponse</a></code>
- <code><a href="./src/resources/voices.ts">VoiceListResponse</a></code>
- <code><a href="./src/resources/voices.ts">VoiceDeleteResponse</a></code>

Methods:

- <code title="post /v1/ai/voice">client.voices.<a href="./src/resources/voices.ts">create</a>({ ...params }) -> Voice</code>
- <code title="get /v1/ai/voice/{id}">client.voices.<a href="./src/resources/voices.ts">retrieve</a>(id) -> Voice</code>
- <code title="put /v1/ai/voice/{id}">client.voices.<a href="./src/resources/voices.ts">update</a>(id, { ...params }) -> VoiceUpdateResponse</code>
- <code title="get /v1/ai/voice/list">client.voices.<a href="./src/resources/voices.ts">list</a>({ ...params }) -> VoiceListResponse</code>
- <code title="delete /v1/ai/voice/{id}">client.voices.<a href="./src/resources/voices.ts">delete</a>(id) -> VoiceDeleteResponse</code>
