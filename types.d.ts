declare module 'lmnt-node' {
  import { Buffer } from 'buffer';

  /** The binary audio data provided by the server. */
  export type AudioData = Buffer;

  /**
   * Options available to pass with synthesize requests. See the
   * [SDK documentation](https://lmnt.com/docs/node/) for available values
   * and defaults.
   */
  export interface SynthesizeOptions {
    /** An optional seed for random number generation. */
    seed?: number;

    /** The desired output audio format. */
    format?: string;

    /** The desired speed of the synthesized speech. */
    speed?: number;

    /** The desired target length of the output speech in seconds. */
    length?: number;

    /** If `True`, the response will include word durations detail. */
    return_durations?: boolean;

    /** If `True`, the response will include the seed used for synthesis. */
    return_seed?: boolean;
  }

  /**
   * Options available to pass with streaming synthesis requests. See the
   * [SDK documentation](https://lmnt.com/docs/node/) for available values
   * and defaults.
   */
  export interface StreamingSynthesisOptions {
    /** Whether to return extra data (durations data and warnings) with each audio chunk. */
    return_extras?: boolean;

    /** The desired speed of the synthesized speech. */
    speed?: number;

    /** The amount of variation in speech (e.g. pitch). */
    expressive?: number;
  }

  export interface FetchVoicesOptions {
    /** If true, only returns voices that you have starred. Defaults to false. */
    starred?: boolean;

    /** Specify which voices to return. Choose from `system`, `me`, or `all`. Defaults to `all`. */
    owner?: 'system' | 'me' | 'all';
  }

  export interface UpdateVoiceOptions {
    /** The name of the voice */
    name?: string;

    /** Whether the voice is starred */
    starred?: boolean;

    /** The gender of the voice, e.g. `male`, `female`, `nonbinary`. For categorization purposes. */
    gender?: string;
    
    /** A description of the voice */
    description?: string;
  }

  export interface CreateVoiceOptions {
    /** The type of voice to create. Must be one of `instant` or `professional`. Defaults to `instant`. */
    type?: 'instant' | 'professional';

    /** The gender of the voice, e.g. `male`, `female`, `nonbinary`, `other`. For categorization purposes. */
    gender?: string;

    /** A description of the voice. */
    description?: string;
  }

  /**
   * Represents a full-duplex streaming connection with the LMNT server.
   */
  export class StreamingSynthesisConnection {
    /**
     * @param apiKey The API key to use for the connection. Obtain a key
     *     from the [LMNT account page](https://app.lmnt.com/account).
     * @param voice The voice id to use when synthesizing speech over the connection.
     * @param options Optional configuration options.
     * @private
     */
    constructor(apiKey: string, voice: string, options?: StreamingSynthesisOptions);

    /**
     * Appends text to the overall text to be synthesized.
     *
     * @param text The additional text.
     */
    appendText(text: string): void;

    /**
     * Releases resources associated with this instance.
     */
    close(): void;

    /**
     * Call this when you want to trigger the server to synthesize all the text it
     * currently has and return the audio data. You can access the audio via the 
     * async iterator. This is recommended to be used only sparingly, if at all, 
     * as it can result in a less natural sounding speech. This could be useful if
     * you are sure you have sent text that comes at a natural stop and want all the
     * audio returned without closing the connection.
     */
    flush(): void;

    /**
     * Call this when you've written all the text you're expecting to submit. It will
     * flush any remaining data to the server to ensure you receive any additional
     * synthesized speech audio via the async iterator. The connection will be closed.
     *
     * @param text The additional text.
     */
    finish(): void;

    /**
     * Returns an async iterator that yields an object containing synthesized speech 
     * audio data as a 96kbps mono MP3 stream with a sampling rate of 24kHz.
     */
    [Symbol.asyncIterator](): AsyncIterableIterator<Object>;
  }

  export type Voice = {
    id: string;
    name: string;
    owner: string;
    state: string;
    type: string;
    starred?: boolean;
    gender?: string;
    imageUrl?: string;
    description?: string;
  };

  export type CreateVoiceResponse = {
    id: string;
    voice: Voice;
  }

  export type VoicesResponse = [Voice];

  export type VoiceResponse = {
    voice: Voice;
  }

  /**
   * The Speech class is your primary touch-point with the LMNT API.
   */
  export class Speech {
    /**
     * @param apiKey The API key to use for the connection. Obtain a key
     *     from the [LMNT account page](https://app.lmnt.com/account).
     */
    constructor(apiKey: string);

    /**
     * Returns a list of voices available to you.
     * 
     * @param options Optional configuration options (starred and owner).
     */
    fetchVoices(options?: FetchVoicesOptions): Promise<VoicesResponse>;

    /**
     * Returns details of a specific voice
     * 
     * @param voice The id of the voice to update. Voice ids can be retrieved from `fetchVoices()`.
     */
    fetchVoice(voice: string): Promise<Voice>;

    /**
     * Create a new voice from a set of audio files. Returns the voice metadata object.
     * 
     * @param name The name of the voice.
     * @param enhance For unclean audio with background noise, applies processing to attempt to improve quality. This may degrade quality in some circumstances.
     * @param filenames A list of filenames to use for the voice
     * @param options Optional configuration options.
     */
    createVoice(name: string, enhance: boolean, filenames: string[], options?: CreateVoiceOptions): Promise<CreateVoiceResponse>;

    /**
     * Updates metadata for a specific voice. A voice that is not owned by you can only have its `starred` field updated. 
     * Only provided fields will be changed.
     * 
     * @param voice The id of the voice to update. Voice ids can be retrieved from `fetchVoices()`.
     * @param options Optional configuration options.
     */
    updateVoice(voice: string, options?: UpdateVoiceOptions): Promise<VoiceResponse>;

    /**
     * Deletes a voice and cancels any pending operations on it. The voice must be owned by you. Cannot be undone.
     * 
     * @param voice The id of the voice to delete. Voice ids can be retrieved from `fetchVoices()`.
     */
    deleteVoice(voice: string): Promise<Object>;

    /**
     * Synthesizes text with the given voice and options, returning audio
     * binary data.
     *
     * @param text The text to synthesize.
     * @param voice The voice id of the voice used when synthesizing. Voice ids can be retrieved from `fetchVoices()`.
     * @param options Optional configuration options. See the
     *     [documentation](https://lmnt.com/docs/node/#synthesize) for more.
     */
    synthesize(text: string, voice: string, options?: SynthesizeOptions): Promise<AudioData>;

    /**
     * Creates a new, full-duplex streaming session. You can use the returned connection
     * object to concurrently stream text content to the server and receive speech data
     * from the server.
     *
     * @param voice The voice id to use when synthesizing speech. Voice ids can be retrieved from `fetchVoices()`.
     * @param options Optional configuration options.
     */
    synthesizeStreaming(voice: string, options: StreamingSynthesisOptions): StreamingSynthesisConnection;

    /**
     * Returns details about your account.
     */
    fetchAccount(): Promise<Object>;
  }

  // @ts-ignore
  export default Speech;
}
