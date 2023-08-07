import { useState, useEffect } from 'react'
import { AptosClient, CoinClient, FaucetClient, TokenClient, IndexerClient } from "aptos"

export type UseGasProps = {
  network: "testnet" | "mainnet" | "devnet"
}

export type UseBalanceProps = {
  address: string,
  network: "testnet" | "mainnet" | "devnet"
}

export type UseFaucetProps = {
  address: string,
  network: "testnet" | "devnet"
}

export type UseNFTProps = {
  creatorAddress: string,
  collectionName: string,
  tokenName: string,
  network: "testnet" | "mainnet" | "devnet"
}

export type UseCollectionProps = {
  creatorAddress: string,
  collectionName: string,
  network: "testnet" | "mainnet" | "devnet"
}

export type UseTransactionProps = {
  transactionHash: string,
  network: "testnet" | "mainnet" | "devnet"
}

export type UseAccountProps = {
  address: string,
  network: "testnet" | "mainnet" | "devnet"
}

export function useCollection({ creatorAddress, collectionName, network }: UseCollectionProps) {
  const url = network === "testnet" ? "https://fullnode.testnet.aptoslabs.com/v1" : network == "mainnet" ? "https://fullnode.mainnet.aptoslabs.com/v1" : "https://fullnode.devnet.aptoslabs.com/v1"
  const client = new AptosClient(url)
  const tokenClient = new TokenClient(client)

  const [data, setData] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const getCollection = async () => {
    setLoading(true)
    const collection = await tokenClient.getCollectionData(creatorAddress, collectionName)
    setData({
      name: collection.name,
      description: collection.description,
      uri: collection.uri,
      https_uri: "https://ipfs.io/ipfs/" + collection.uri.split("ipfs://")[1],
      maximum: Number(collection.maximum),
      supply: Number(collection.supply),
    })
    setLoading(false)
  }

  useEffect(() => {
    if (creatorAddress && collectionName) {
      getCollection()
    } else {
      setData({})
      setLoading(false)
      setError("Creator Address and Collection Name are required")
    }
  }, [creatorAddress, collectionName])

  return { data, loading, error }
}

export function useNFT({ creatorAddress, collectionName, tokenName, network }: UseNFTProps) {
  const url = network === "testnet" ? "https://fullnode.testnet.aptoslabs.com/v1" : network == "mainnet" ? "https://fullnode.mainnet.aptoslabs.com/v1" : "https://fullnode.devnet.aptoslabs.com/v1"
  const client = new AptosClient(url)
  const tokenClient = new TokenClient(client)

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>({})
  const [error, setError] = useState<any>(null)

  const getNFT = async () => {
    setLoading(true)
    const token = await tokenClient.getTokenData(creatorAddress, collectionName, tokenName)
    setData({
      name: token?.name,
      description: token?.description,
      collection: token?.collection,
      maximum: Number(token?.maximum),
      supply: Number(token?.supply),
      uri: token?.uri,
      https_url: "https://ipfs.io/ipfs/" + token?.uri.split("ipfs://")[1],
    })
    setLoading(false)
  }

  useEffect(() => {
    if (creatorAddress && collectionName && tokenName) {
      getNFT()
    } else {
      setLoading(false)
      setData({})
      setError("Creator Address, Collection Name and Token Name are required")
    }
  }, [creatorAddress, collectionName, tokenName])

  return { data, loading, error }
}

export function useCoin() {

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>({})
  const [error, setError] = useState<any>(null)

  return { data, loading, error }
}

export function useGas({ network }: UseGasProps) {
  const url = network === "testnet" ? "https://fullnode.testnet.aptoslabs.com/v1" : network == "mainnet" ? "https://fullnode.mainnet.aptoslabs.com/v1" : "https://fullnode.devnet.aptoslabs.com/v1"
  const client = new AptosClient(url);

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>({})
  const [error, setError] = useState<any>(null)

  const getGas = async () => {
    setLoading(true)
    const value = await client.estimateGasPrice()
    setData({
      deprioritized: value.deprioritized_gas_estimate,
      gas: value.gas_estimate,
      prioritized: value.prioritized_gas_estimate,
    })
    setLoading(false)
  }

  useEffect(() => {
    setInterval(() => {
      getGas()
    }, 10000)
  }, [])

  return { data, loading, error }
}

export function useFaucet({ address, network }: UseFaucetProps) {
  const url = network === "testnet" ? "https://fullnode.testnet.aptoslabs.com/v1" : "https://fullnode.devnet.aptoslabs.com/v1"
  const faucet_url = network === "testnet" ? "https://faucet.testnet.aptoslabs.com" : "https://faucet.devnet.aptoslabs.com"
  const faucetClient = new FaucetClient(url, faucet_url)

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>({})
  const [error, setError] = useState<any>(null)

  const fundAccount = async () => {
    setLoading(true)
    await faucetClient.fundAccount(address, 100_000_000);
    setLoading(false)
  }

  useEffect(() => {
    if (address) {
      fundAccount()
    } else {
      setLoading(false)
      setData({})
      setError("Address is required")
    }
  }, [address])

  return { data, loading, error }
}

export function useAccount({ address, network }: UseAccountProps) {
  const url = network === "testnet" ? "https://fullnode.testnet.aptoslabs.com/v1" : network == "mainnet" ? "https://fullnode.mainnet.aptoslabs.com/v1" : "https://fullnode.devnet.aptoslabs.com/v1"
  const client = new AptosClient(url);
  const coinClient = new CoinClient(client);
  const indexClient = new IndexerClient(
    network == "mainnet" ? 'https://indexer.mainnet.aptoslabs.com/v1/graphql' : network == "devnet" ? 'https://indexer.devnet.aptoslabs.com/v1/graphql' : 'https://indexer.testnet.aptoslabs.com/v1/graphql'
  );

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>({})
  const [error, setError] = useState<any>(null)

  const getDetails = async () => {
    setLoading(true)

    const [coins, nfts, tokens, transactions, balance] = await Promise.all([
      await indexClient.getAccountCoinsData(address)
      , await indexClient.getAccountNFTs(address)
      , await indexClient.getAccountTokensCount(address)
      , await indexClient.getAccountTransactionsCount(address)
      , await coinClient.checkBalance(address)
    ])

    setData({
      coins: coins.current_coin_balances.map((coin) => {
        return {
          name: coin.coin_info?.name,
          symbol: coin.coin_info?.symbol,
          type: coin.coin_type,
          ammount: coin.amount,
          formatted_amount:
            coin.amount /
            Math.pow(10, coin?.coin_info?.decimals || 0),
        };
      }),
      nfts: nfts.current_token_ownerships.map((nft) => {
        return {
          amount: nft.amount,
          collection_id:
            nft.current_token_data?.collection_data_id_hash,
          collection_name: nft?.current_token_data?.collection_name,
          name: nft?.current_token_data?.name,
          creator_address: nft?.current_token_data?.creator_address,
          description: nft?.current_token_data?.description,
          metadata_uri: nft?.current_token_data?.metadata_uri,
          metadata_https_uri:
            'https://ipfs.io/ipfs/' +
            nft?.current_token_data?.metadata_uri.split('://')[1],
        };
      }),
      transactionsCount: transactions.move_resources_aggregate?.aggregate?.count,
      tokenCount: tokens?.current_token_ownerships_v2_aggregate?.aggregate?.count,
      balance: balance,
      formatted_balancee: (Number(balance) / 100000000) + " APT",
    })
    setLoading(false)
  }

  useEffect(() => {
    if (address) {
      getDetails()
    }
  }, [address])


  return { data, loading, error }
}

export function useBalance({ address, network }: UseBalanceProps) {
  const url = network === "testnet" ? "https://fullnode.testnet.aptoslabs.com/v1" : network == "mainnet" ? "https://fullnode.mainnet.aptoslabs.com/v1" : "https://fullnode.devnet.aptoslabs.com/v1"
  const client = new AptosClient(url);
  const coinClient = new CoinClient(client);

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>({})
  const [error, setError] = useState<any>(null)

  const getBalance = async () => {
    setLoading(true)
    const balance = await coinClient.checkBalance(address);
    setData({
      value: balance,
      formatted: (Number(balance) / 100000000) + " APT",
    })
    setLoading(false)
  }

  useEffect(() => {
    if (address) {
      getBalance()
    } else {
      setData({})
      setLoading(false)
      setError("Address is required")
    }
  }, [address])

  return { data, loading, error }
}

export function useTransaction({ transactionHash, network }: UseTransactionProps) {
  const url = network === "testnet" ? "https://fullnode.testnet.aptoslabs.com/v1" : network == "mainnet" ? "https://fullnode.mainnet.aptoslabs.com/v1" : "https://fullnode.devnet.aptoslabs.com/v1"
  const client = new AptosClient(url)

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>({})
  const [error, setError] = useState<any>(null)


  const getTransaction = async () => {
    setLoading(true)
    const transaction: any = await client.getTransactionByHash(
      transactionHash
    );
    setData({
      gas_unit_price: Number(transaction.gas_unit_price),
      gas_used: Number(transaction.gas_used),
      max_gas_amount: Number(transaction.max_gas_amount),
      sender: transaction.sender,
      receiver: transaction.events.filter((event: any) => event.type === "0x1::coin::DepositEvent")[0].guid.account_address,
      status: transaction.vm_status,
      amount: transaction.events.filter((event: any) => event.type === "0x1::coin::WithdrawEvent")[0].data.amount,
    })
    setLoading(false)
  }

  useEffect(() => {
    if (transactionHash) {
      getTransaction()
    } else {
      setData({})
      setLoading(false)
      setError("Transaction Hash is required")
    }
  }, [transactionHash])


  return { data, loading, error }
}

export function useSendTransaction() {

}

export function useConnect() {

}

export function useMintToken() {

}

export function useAns() {

}

export function useFungible() {

}
