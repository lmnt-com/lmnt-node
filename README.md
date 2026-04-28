# LMNT Node SDK

[![NPM version](https://img.shields.io/npm/v/lmnt-node.svg)](https://npmjs.org/package/lmnt-node) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/lmnt-node)

The LMNT Node SDK provides convenient access to the LMNT API from server-side TypeScript applications.

## Documentation

Full documentation is available at [docs.lmnt.com/api/sdks/typescript](https://docs.lmnt.com/api/sdks/typescript).

## Installation

```sh
npm install lmnt-node
```

## Getting started

```ts
import Lmnt from 'lmnt-node';

const client = new Lmnt({
  apiKey: process.env['LMNT_API_KEY'], // This is the default and can be omitted
});

const response = await client.speech.generate({ text: 'hello world.', voice: 'leah' });

const content = await response.blob();
console.log(content);
```

## Requirements

TypeScript >= 4.5 and Node.js 20 LTS or later are supported.

## Contributing

See [the contributing documentation](./CONTRIBUTING.md).
