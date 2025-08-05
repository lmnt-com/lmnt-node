# Changelog

## 2.8.0 (2025-08-05)

Full Changelog: [v2.7.0...v2.8.0](https://github.com/lmnt-com/lmnt-node/compare/v2.7.0...v2.8.0)

### Features

* add support for resets in speech sessions ([667d386](https://github.com/lmnt-com/lmnt-node/commit/667d3861de888124faf96f6d70e30130a766d0c4))

## 2.7.0 (2025-07-30)

Full Changelog: [v2.6.0...v2.7.0](https://github.com/lmnt-com/lmnt-node/compare/v2.6.0...v2.7.0)

### Features

* **api:** api update ([f810ae8](https://github.com/lmnt-com/lmnt-node/commit/f810ae8a1165b2edc6a2629839bda8da394ba539))


### Chores

* **internal:** remove redundant imports config ([36387d1](https://github.com/lmnt-com/lmnt-node/commit/36387d1c0453e2f845f1bbf366529328415f183f))

## 2.6.0 (2025-07-16)

Full Changelog: [v2.5.0...v2.6.0](https://github.com/lmnt-com/lmnt-node/compare/v2.5.0...v2.6.0)

### Features

* **api:** add generate detailed method ([8ba36ed](https://github.com/lmnt-com/lmnt-node/commit/8ba36edfce77f8f3e5cd145108668707055edf37))
* clean up environment call outs ([00ecd27](https://github.com/lmnt-com/lmnt-node/commit/00ecd27578e48d35bd6079e31b2c7d44e0527e4f))


### Bug Fixes

* **api:** formatting fix for lint error ([2f49fa4](https://github.com/lmnt-com/lmnt-node/commit/2f49fa4027e72468cfb5f6a8a189f02e1eb54a19))

## 2.5.0 (2025-07-14)

Full Changelog: [v2.4.1...v2.5.0](https://github.com/lmnt-com/lmnt-node/compare/v2.4.1...v2.5.0)

### Features

* **api:** api update ([715bb60](https://github.com/lmnt-com/lmnt-node/commit/715bb60c3b5e4afa32cc9e97de4b5197a9e33287))
* **api:** api update ([5536db4](https://github.com/lmnt-com/lmnt-node/commit/5536db473f1472386f75d24ce04369f3ef070b79))


### Bug Fixes

* **tests:** skip tests broken by Prism ([d347f86](https://github.com/lmnt-com/lmnt-node/commit/d347f8687271a63ff52074b2a6ac6bbaf8d908d0))


### Chores

* **internal:** version bump ([1d9c64d](https://github.com/lmnt-com/lmnt-node/commit/1d9c64d6b5ef0a794d3ed27a852f48856cd5bc19))

## 2.4.1 (2025-05-22)

Full Changelog: [v2.4.0...v2.4.1](https://github.com/lmnt-com/lmnt-node/compare/v2.4.0...v2.4.1)

### Bug Fixes

* **api:** improve type resolution when importing as a package ([#97](https://github.com/lmnt-com/lmnt-node/issues/97)) ([0a6f188](https://github.com/lmnt-com/lmnt-node/commit/0a6f188bd5e411f9051b2e249d823ff155c1e6b9))
* **client:** send `X-Stainless-Timeout` in seconds ([#95](https://github.com/lmnt-com/lmnt-node/issues/95)) ([9e301a2](https://github.com/lmnt-com/lmnt-node/commit/9e301a28eeb8daa2cac382ac1656d6a13de2376d))
* **internal:** work around https://github.com/vercel/next.js/issues/76881 ([#92](https://github.com/lmnt-com/lmnt-node/issues/92)) ([51c9ef5](https://github.com/lmnt-com/lmnt-node/commit/51c9ef526927fa5fa97751e337baca90ea271bb7))
* **mcp:** remove unused tools.ts ([#98](https://github.com/lmnt-com/lmnt-node/issues/98)) ([40402a1](https://github.com/lmnt-com/lmnt-node/commit/40402a1c9636413a845b4b5408786d16c5c5462d))


### Chores

* **ci:** add timeout thresholds for CI jobs ([b6963dd](https://github.com/lmnt-com/lmnt-node/commit/b6963ddf3e8377d206c2515d9776bc3f01265fa5))
* **ci:** bump node version for release workflows ([87e3b2c](https://github.com/lmnt-com/lmnt-node/commit/87e3b2c3fa06f500a3e1449d32fcae081e429c55))
* **ci:** only use depot for staging repos ([e5ddeed](https://github.com/lmnt-com/lmnt-node/commit/e5ddeed26a5e759624f5da30b8d28d78bd089302))
* **client:** minor internal fixes ([2e65e1c](https://github.com/lmnt-com/lmnt-node/commit/2e65e1cc836b3cb1e2efecf8c1e8d0300763c905))
* **docs:** grammar improvements ([e23331f](https://github.com/lmnt-com/lmnt-node/commit/e23331f3c16e04573327fb889680f6dbb8a5cf2a))
* **internal:** add aliases for Record and Array ([#96](https://github.com/lmnt-com/lmnt-node/issues/96)) ([1d49f3d](https://github.com/lmnt-com/lmnt-node/commit/1d49f3dae525f2ce4b45f70a4f6d3a243141b71c))
* **internal:** codegen related update ([9c5d934](https://github.com/lmnt-com/lmnt-node/commit/9c5d9342df101fd774d18c1cbb79f4662233f096))
* **internal:** reduce CI branch coverage ([8be04f2](https://github.com/lmnt-com/lmnt-node/commit/8be04f2879ddb8992fc481a65af94bc897fa7973))
* **internal:** upload builds and expand CI branch coverage ([99503c4](https://github.com/lmnt-com/lmnt-node/commit/99503c4907f8898024c4d163f481e3eada01eeae))


### Documentation

* add examples to tsdocs ([a0310cb](https://github.com/lmnt-com/lmnt-node/commit/a0310cb7cdbca6c319588b21aeceada527b540e4))
* **readme:** fix typo ([0d23dac](https://github.com/lmnt-com/lmnt-node/commit/0d23dac83f2b159336cf67e16e924b21885fca92))

## 2.4.0 (2025-03-27)

Full Changelog: [v2.3.0...v2.4.0](https://github.com/lmnt-com/lmnt-node/compare/v2.3.0...v2.4.0)

### Features

* Add example for voice conversion ([4846f6c](https://github.com/lmnt-com/lmnt-node/commit/4846f6c4fc9f8a87619d134b5e139a358b527330))
* chore(lint): Fix linting errors ([2262582](https://github.com/lmnt-com/lmnt-node/commit/2262582ffef49d9ae05348e0a385e370bb0df1a9))


### Bug Fixes

* avoid type error in certain environments ([#90](https://github.com/lmnt-com/lmnt-node/issues/90)) ([d4e9129](https://github.com/lmnt-com/lmnt-node/commit/d4e91290e459e01fa13522ec071717b27e8a53cb))


### Chores

* **exports:** cleaner resource index imports ([#88](https://github.com/lmnt-com/lmnt-node/issues/88)) ([f4737fa](https://github.com/lmnt-com/lmnt-node/commit/f4737faf5095b965d05a838034640570e49acd72))
* **exports:** stop using path fallbacks ([#89](https://github.com/lmnt-com/lmnt-node/issues/89)) ([9056558](https://github.com/lmnt-com/lmnt-node/commit/90565587576e2a6f950eb9ef43e98ecd51caadb6))
* **internal:** codegen related update ([#86](https://github.com/lmnt-com/lmnt-node/issues/86)) ([bb45285](https://github.com/lmnt-com/lmnt-node/commit/bb45285ece0af99f5f114f33f6893f41effca98e))
* **internal:** remove extra empty newlines ([#87](https://github.com/lmnt-com/lmnt-node/issues/87)) ([aa21830](https://github.com/lmnt-com/lmnt-node/commit/aa218301ab02fece44a2b23e7d722e618ae364be))


### Documentation

* update URLs from stainlessapi.com to stainless.com ([#83](https://github.com/lmnt-com/lmnt-node/issues/83)) ([c6fc612](https://github.com/lmnt-com/lmnt-node/commit/c6fc612ca51ee49cf2ce3d7a2b12795056bcf9b9))

## 2.3.0 (2025-02-26)

Full Changelog: [v2.2.0...v2.3.0](https://github.com/lmnt-com/lmnt-node/compare/v2.2.0...v2.3.0)

### Features

* **api:** voice conversion and other manual updates ([#80](https://github.com/lmnt-com/lmnt-node/issues/80)) ([93d5643](https://github.com/lmnt-com/lmnt-node/commit/93d56436662f575e9d85a34958450706832c525b))


### Bug Fixes

* **client:** fix export map for index exports ([#77](https://github.com/lmnt-com/lmnt-node/issues/77)) ([a1ae220](https://github.com/lmnt-com/lmnt-node/commit/a1ae22069f3c834cf1ac693a540b408d2077b09f))


### Chores

* **internal:** fix devcontainers setup ([#79](https://github.com/lmnt-com/lmnt-node/issues/79)) ([338a93e](https://github.com/lmnt-com/lmnt-node/commit/338a93e3d0e8d8eaa01d980655477f6ec8444be2))

## 2.2.0 (2025-02-06)

Full Changelog: [v2.1.0...v2.2.0](https://github.com/lmnt-com/lmnt-node/compare/v2.1.0...v2.2.0)

### Features

* **client:** send `X-Stainless-Timeout` header ([#75](https://github.com/lmnt-com/lmnt-node/issues/75)) ([2c49aef](https://github.com/lmnt-com/lmnt-node/commit/2c49aef561f4464e412946fb85bcde9346d27e94))
* docs(api): Add session usage example to main README ([baf2f4c](https://github.com/lmnt-com/lmnt-node/commit/baf2f4c98247d028eb4ceae8cd5357aba063224f))


### Bug Fixes

* conform generate example to SDK ([ab9c8d9](https://github.com/lmnt-com/lmnt-node/commit/ab9c8d9666b44910089a187daa36f216d0011cf6))


### Chores

* **internal:** codegen related update ([#72](https://github.com/lmnt-com/lmnt-node/issues/72)) ([7176c03](https://github.com/lmnt-com/lmnt-node/commit/7176c0387a0ffaf0e11018b341cf90a70256ec2e))
* **internal:** codegen related update ([#73](https://github.com/lmnt-com/lmnt-node/issues/73)) ([b96d8d6](https://github.com/lmnt-com/lmnt-node/commit/b96d8d60683b6c5cbc6204efd3a4d191c72d8d3b))

## 2.1.0 (2025-01-17)

Full Changelog: [v2.0.0...v2.1.0](https://github.com/lmnt-com/lmnt-node/compare/v2.0.0...v2.1.0)

### Features

* **api:** Add websocket streaming functionality ([1ca31f1](https://github.com/lmnt-com/lmnt-node/commit/1ca31f18d45c86652a904d91b95cf760fc87a002))
* **api:** manual updates ([#67](https://github.com/lmnt-com/lmnt-node/issues/67)) ([0133143](https://github.com/lmnt-com/lmnt-node/commit/013314344a9bc05e85b894457fe858a055b095b9))


### Chores

* **internal:** codegen related update ([#66](https://github.com/lmnt-com/lmnt-node/issues/66)) ([f41051a](https://github.com/lmnt-com/lmnt-node/commit/f41051affcdd9b939da1b4e319fed55947e79941))


### Documentation

* Add speech generation and voice creation examples ([367c97c](https://github.com/lmnt-com/lmnt-node/commit/367c97c85408a660802d8e1ad772be69a5a8ee76))

## 2.0.0 (2025-01-13)

Full Changelog: [v0.0.1-alpha.0...v2.0.0](https://github.com/lmnt-com/lmnt-node/compare/v0.0.1-alpha.0...v2.0.0)

### Bug Fixes

* **api:** fix generate method name ([#59](https://github.com/lmnt-com/lmnt-node/issues/59)) ([ec4e51d](https://github.com/lmnt-com/lmnt-node/commit/ec4e51d932dd1052b459b0a7d2b7c2d09598e1fb))
