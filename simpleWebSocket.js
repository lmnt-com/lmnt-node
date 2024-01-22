/*
MIT License

Copyright (c) 2023 Lars Grammel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import * as Runtime from "./detectRuntime.js";

/**
 * Creates a simplified websocket connection. This function works in both Node.js and browser.
 */
export async function createSimpleWebSocket(url) {
  switch (Runtime.detectRuntime()) {
    case "vercel-edge":
    case "cloudflare-workers":
    case "browser": {
      return new WebSocket(url);
    }

    case "node": {
      // Use ws library (for Node.js):
      const { default: WebSocket } = await import("isomorphic-ws");
      return new WebSocket(url);
    }

    default: {
      throw new Error("Unknown runtime");
    }
  }
}
