declare module 'lmnt-node' {
  import { Buffer } from 'buffer';

  /** The binary audio data provided by the server. */
  type AudioData = Buffer;

  /**
   * Options available to pass with synthesize requests. See the
   * [SDK documentation](https://lmnt.com/docs/node/) for available values
   * and defaults.
   */
  interface SynthesizeOptions {
    /** An optional seed for random number generation. */
    seed?: number;

    /** The desired output audio format. */
    format?: string;

    /** The desired speed of the synthesized speech. */
    speed?: number;
  }

  /**
   * Represents a full-duplex streaming connection with the LMNT server.
   */
  class StreamingSynthesisConnection {
    /**
     * @param apiKey The API key to use for the connection. Obtain a key
     *     from the [LMNT account page](https://app.lmnt.com/account).
     * @param voice The voice id to use when synthesizing speech over the connection.
     * @private
     */
    constructor(apiKey: string, voice: string);

    /**
     * Appends text to the overall text to be synthesized.
     *
     * @param text The additional text.
     */
    appendText(text: string): void;

    /**
     * Call this when you've written all the text you're expecting to submit. It will
     * flush any remaining data to the server to ensure you receive any additional
     * synthesized speech audio via the async iterator.
     *
     * @param text The additional text.
     */
    finish(): void;

    /**
     * Returns an async iterator that yields synthesized speech audio data
     *     as a 96kbps mono MP3 stream with a sampling rate of 24kHz.
     */
    [Symbol.asyncIterator](): AsyncIterableIterator<AudioData>;
  }

  type Voice = {
    id: string;
    name: string;
    gender: string;
    imageUrl: string;
    state: string;
    tags: string[];
  };

  type VoiceResponse = {
    voices: {
      [key: string]: Voice;
    };
  };

  /**
   * The Speech class is your primary touch-point with the LMNT API.
   */
  class Speech {
    /**
     * @param apiKey The API key to use for the connection. Obtain a key
     *     from the [LMNT account page](https://app.lmnt.com/account).
     */
    constructor(apiKey: string);

    /**
     * Returns the available voices..
     */
    fetchVoices(): Promise<VoiceResponse>;

    /**
     * Synthesizes text with the given voice and options, returning audio
     * binary data.
     *
     * @param text The text to synthesize.
     * @param voice The voice id of the voice used when synthesizing.
     * @param options Optional configuration options. See the
     *     [documentation](https://lmnt.com/docs/node/#synthesize) for more.
     */
    synthesize(text: string, voice: string, options?: SynthesizeOptions): Promise<AudioData>;

    /**
     * Creates a new, full-duplex streaming session. You can use the returned connection
     * object to concurrently stream text content to the server and receive speech data
     * from the server.
     *
     * @param voice The voice id to use when synthesizing speech.
     */
    synthesizeStreaming(voice: string): StreamingSynthesisConnection;
  }

  export default Speech;
}
