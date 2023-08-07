
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/logo-dark.svg">
    <img alt="wagmi logo" src="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/logo-light.svg" width="auto" height="60">
  </picture>
</p>

<p align="center">
  React Hooks for Ethereum
<p>

<p align="center">
  <a href="https://www.npmjs.com/package/aptosjs">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/v/aptosjs?colorA=21262d&colorB=21262d&style=flat">
      <img src="https://img.shields.io/npm/v/aptosjs?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="Version">
    </picture>
  </a>
  <a href="https://github.com/mustafaaljadery/aptosjs/blob/main/LICENSE">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/l/aptosjs?colorA=21262d&colorB=21262d&style=flat">
      <img src="https://img.shields.io/npm/l/aptosjs?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="MIT License">
    </picture>
  </a>
  <a href="https://www.npmjs.com/package/aptosjs">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/dm/aptosjs?colorA=21262d&colorB=21262d&style=flat">
      <img src="https://img.shields.io/npm/dm/aptosjs?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="Downloads per month">
    </picture>
  </a>
</p>

AptosJS is a nodejs library that provides react hooks to easily interact with the Aptos blockchain. It's designed so that you can very easily build a DApp using React or NextJS.

## Features
- Hooks for connecting accounts, fetching transactions, and way more.
- Auto-refresh data as it changes

## Documentation
Read more about documentation and examples, [aptosjs.com](https://aptosjs.com).

## Installation

Install AptosJS with the aptos typescript sdk

```bash
npm install aptosjs aptos
```
f

## Quickstart

### Example

```tsx
import { useAccount } from "aptosjs"

function App() {
  const { data, loading, error } = useAccount({
    "address": "0xaf5b13d09028304654615f4d10d0622056912a9696c4d4fbec9d1a7033962594",
    "network": "mainnet"
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  return <div>{data?.balance}</div>
}
```

### Return Example

```ts
// Data returned for the following address on mainnet:  0xaf5b13d09028304654615f4d10d0622056912a9696c4d4fbec9d1a7033962594
{
  balance: 5216176148n,
  formatted_balance: "52.16176148 APT",
  tokenCount: 566,
  transactionsCount: 6326,
  coins: [
    {
    amount: 5216176148,
    formatted_amount: "52.16176148 APT",
    name: "Aptos Coin",
    symbol : "APT",
    type:"0x1::aptos_coin::AptosCoin" 
    }
  ],
  nfts: [
    {
      amount: 1,
      collection_id: "7b26443a061a6493aed132597e2348d39c88b4101a23a7a0c7c0677f9245376b", 
      collection_name: "ALPHA DRAGON" ,
      creator_addres: "0xf107df9f3e87cb68b20b84623357c3218689a6eec5595890582520326807a412", 
      description: "766 ALPHA DRAGON ", 
      metadata_https_uri: "https://ipfs.io/ipfs/nftstorage.link/ipfs/bafybeigho5x4ppl2zvr2eew72sei7eyqh64ckfjsgwhc5j2vdxaava5txu/762",
      metadata_uri: "https://nftstorage.link/ipfs/bafybeigho5x4ppl2zvr2eew72sei7eyqh64ckfjsgwhc5j2vdxaava5txu/762", 
      name: "ALPHA DRAGON #762"
    }
  ]
}
```

## Author
This is created by [Mustafa Aljadery](https://maxaljadery.com).

- [Twitter](https://twitter.com/maxaljadery)
- [Linkedin](https://www.linkedin.com/in/mustafaaljadery/)
- [Github](https://github.com/mustafaaljadery)

## License

All code is under an MIT License