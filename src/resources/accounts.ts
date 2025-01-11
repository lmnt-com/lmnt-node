// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Accounts extends APIResource {
  /**
   * Returns details about your account.
   */
  retrieve(options?: Core.RequestOptions): Core.APIPromise<AccountRetrieveResponse> {
    return this._client.get('/v1/account', options);
  }
}

export interface AccountRetrieveResponse {
  plan: AccountRetrieveResponse.Plan;

  usage: AccountRetrieveResponse.Usage;
}

export namespace AccountRetrieveResponse {
  export interface Plan {
    /**
     * The number of characters you are allowed to synthesize in this billing period.
     */
    character_limit: number;

    commercial_use_allowed: boolean;

    /**
     * The number of professional voices you are allowed to create.
     */
    professional_voice_limit: number | null;

    /**
     * The type of plan you are subscribed to.
     */
    type: string;

    /**
     * The number of instant voices you are allowed to create.
     */
    instant_voice_limit?: number;
  }

  export interface Usage {
    /**
     * The number of characters you have synthesized in this billing period.
     */
    characters: number;

    /**
     * The number of professional voices you have created.
     */
    professional_voices: number;

    /**
     * The number of instant voices you have created.
     */
    instant_voices?: number;
  }
}

export declare namespace Accounts {
  export { type AccountRetrieveResponse as AccountRetrieveResponse };
}
