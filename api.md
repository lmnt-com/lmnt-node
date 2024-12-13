# Lmnt

Types:

- <code><a href="./src/resources/top-level.ts">Voice</a></code>
- <code><a href="./src/resources/top-level.ts">AccountResponse</a></code>
- <code><a href="./src/resources/top-level.ts">DeleteVoiceResponse</a></code>
- <code><a href="./src/resources/top-level.ts">FetchVoicesResponse</a></code>
- <code><a href="./src/resources/top-level.ts">SynthesizeResponse</a></code>
- <code><a href="./src/resources/top-level.ts">UpdateVoiceResponse</a></code>

Methods:

- <code title="get /v1/account">client.<a href="./src/index.ts">account</a>() -> AccountResponse</code>
- <code title="post /v1/ai/voice">client.<a href="./src/index.ts">createVoice</a>({ ...params }) -> Voice</code>
- <code title="delete /v1/ai/voice/{id}">client.<a href="./src/index.ts">deleteVoice</a>(id) -> unknown</code>
- <code title="get /v1/ai/voice/list">client.<a href="./src/index.ts">fetchVoices</a>({ ...params }) -> FetchVoicesResponse</code>
- <code title="post /v1/ai/speech">client.<a href="./src/index.ts">synthesize</a>({ ...params }) -> SynthesizeResponse</code>
- <code title="put /v1/ai/voice/{id}">client.<a href="./src/index.ts">updateVoice</a>(id, { ...params }) -> UpdateVoiceResponse</code>
- <code title="get /v1/ai/voice/{id}">client.<a href="./src/index.ts">voiceInfo</a>(id) -> Voice</code>
