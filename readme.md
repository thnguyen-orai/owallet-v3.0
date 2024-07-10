# OWallet

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/oraichain/owallet/blob/master/LICENSE.txt)
[![Twitter: OWallet](https://img.shields.io/twitter/follow/owallet_dev.svg?style=social)](https://twitter.com/owallet_dev)

## OWallet: Universal gateway to Web3 in single native wallet
OWallet supports all web3 activities on most common liqudity networks, which are
- Bitcoin
- EVM-based: Ethereum, BNB Chain, Oasis / Oasis Sapphire
- Cosmos-based: Oraichain, Osmosis, Injective, Cosmos Hub...
- TVM-based: TRON network

## OWallet’s key features
- Supports multiple accounts  Bitcoin & Cosmos-based & EVM-based networks simultaneously
- Universal swap across various networks
- Portfolio management with cross-chain assets: Multi accounts, Send/Recieve, Price history...
- History of on-chain activities
- Friendly interface on transaction confirmation

## Technical inquiries
- Source code: https://github.com/oraichain/owallet
- Support ticket: https://orai.io/support
- OWallet website: https://owallet.dev
- Discord https://discord.gg/JNyFnU789b
- You can create a pull request to add your network

## Install
1. Git clone this repo to desired directory

```shell
git clone https://github.com/oraichain/owallet
```

2. Install required packages

```shell
yarn bootstrap
```

3. Clone packages/background

```shell
git submodule add --force https://github.com/oraichain/owallet-background.git packages/background
```

4. Build it

```shell
yarn build
or
yarn build:libs
```

## Contributing
OWallet is maintained & under active development mainly by Oraichain Labs, started as a [Keplr's fork](https://github.com/chainapsis/keplr-wallet/tree/0e137373ac4f526caf97b4694de47fe1ba543bd8).

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Release
- iOS: https://apps.apple.com/app/owallet/id1626035069
- Android: https://play.google.com/store/apps/details?id=com.io.owallet
- Chrome extension: https://chrome.google.com/webstore/detail/owallet/hhejbopdnpbjgomhpmegemnjogflenga

## License
```shell
/*
 * Copyright 2022 Oraichain Labs Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at

 *      http://www.apache.org/licenses/LICENSE-2.0

 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.

 * The repository (this work) includes work covered by the following copyright and permission notices:
 *
 *    Copyright 2020 Chainapsis, Inc
 *    Licensed under the Apache License, Version 2.0.
 *
 * NOTICE: The source code branch of Chainapsis Inc. under Apache 2.0 license:
 *  https://github.com/chainapsis/keplr-wallet/tree/0e137373ac4f526caf97b4694de47fe1ba543bd8
 */
```
Full text: [LICENSE.txt](LICENSE.txt)