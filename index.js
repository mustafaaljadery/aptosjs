"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFungible = exports.useAns = exports.useMintToken = exports.useConnect = exports.useSendTransaction = exports.useCoin = exports.useTransaction = exports.useBalance = exports.useAccount = exports.sendFaucet = exports.useGas = exports.useNFT = exports.useCollection = void 0;
const react_1 = require("react");
const aptos_1 = require("aptos");
function useCollection({ creatorAddress, collectionName, network }) {
    const url = network === "testnet" ? "https://fullnode.testnet.aptoslabs.com/v1" : network == "mainnet" ? "https://fullnode.mainnet.aptoslabs.com/v1" : "https://fullnode.devnet.aptoslabs.com/v1";
    const client = new aptos_1.AptosClient(url);
    const tokenClient = new aptos_1.TokenClient(client);
    const [data, setData] = (0, react_1.useState)({});
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const getCollection = () => __awaiter(this, void 0, void 0, function* () {
        setLoading(true);
        const collection = yield tokenClient.getCollectionData(creatorAddress, collectionName);
        setData({
            name: collection.name,
            description: collection.description,
            uri: collection.uri,
            https_uri: "https://ipfs.io/ipfs/" + collection.uri.split("ipfs://")[1],
            maximum_supply: Number(collection.maximum),
            supply: Number(collection.supply),
        });
        setLoading(false);
    });
    (0, react_1.useEffect)(() => {
        if (creatorAddress && collectionName) {
            getCollection();
        }
        else {
            setData({});
            setLoading(false);
            setError("Creator Address and Collection Name are required");
        }
    }, [creatorAddress, collectionName]);
    return { data, loading, error };
}
exports.useCollection = useCollection;
function useNFT({ creatorAddress, collectionName, tokenName, network }) {
    const url = network === "testnet" ? "https://fullnode.testnet.aptoslabs.com/v1" : network == "mainnet" ? "https://fullnode.mainnet.aptoslabs.com/v1" : "https://fullnode.devnet.aptoslabs.com/v1";
    const client = new aptos_1.AptosClient(url);
    const tokenClient = new aptos_1.TokenClient(client);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [data, setData] = (0, react_1.useState)({});
    const [error, setError] = (0, react_1.useState)(null);
    const getNFT = () => __awaiter(this, void 0, void 0, function* () {
        setLoading(true);
        const token = yield tokenClient.getTokenData(creatorAddress, collectionName, tokenName);
        setData({
            name: token === null || token === void 0 ? void 0 : token.name,
            description: token === null || token === void 0 ? void 0 : token.description,
            collection: token === null || token === void 0 ? void 0 : token.collection,
            maximum: Number(token === null || token === void 0 ? void 0 : token.maximum),
            supply: Number(token === null || token === void 0 ? void 0 : token.supply),
            uri: token === null || token === void 0 ? void 0 : token.uri,
            https_uri: "https://ipfs.io/ipfs/" + (token === null || token === void 0 ? void 0 : token.uri.split("ipfs://")[1]),
        });
        setLoading(false);
    });
    (0, react_1.useEffect)(() => {
        if (creatorAddress && collectionName && tokenName) {
            getNFT();
        }
        else {
            setLoading(false);
            setData({});
            setError("Creator Address, Collection Name and Token Name are required");
        }
    }, [creatorAddress, collectionName, tokenName]);
    return { data, loading, error };
}
exports.useNFT = useNFT;
function useGas({ network }) {
    const url = network === "testnet" ? "https://fullnode.testnet.aptoslabs.com/v1" : network == "mainnet" ? "https://fullnode.mainnet.aptoslabs.com/v1" : "https://fullnode.devnet.aptoslabs.com/v1";
    const client = new aptos_1.AptosClient(url);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [data, setData] = (0, react_1.useState)({});
    const [error, setError] = (0, react_1.useState)(null);
    const getGas = () => __awaiter(this, void 0, void 0, function* () {
        const value = yield client.estimateGasPrice();
        setData({
            deprioritized: value.deprioritized_gas_estimate,
            gas: value.gas_estimate,
            prioritized: value.prioritized_gas_estimate,
        });
        setLoading(false);
    });
    (0, react_1.useEffect)(() => {
        setLoading(true);
        getGas();
        setInterval(() => {
            getGas();
        }, 10000);
    }, []);
    return { data, loading, error };
}
exports.useGas = useGas;
function sendFaucet({ address, network }) {
    const url = network === "testnet" ? "https://fullnode.testnet.aptoslabs.com/v1" : "https://fullnode.devnet.aptoslabs.com/v1";
    const faucet_url = network === "testnet" ? "https://faucet.testnet.aptoslabs.com" : "https://faucet.devnet.aptoslabs.com";
    const faucetClient = new aptos_1.FaucetClient(url, faucet_url);
    const fundAccount = () => __awaiter(this, void 0, void 0, function* () {
        yield faucetClient.fundAccount(address, 100000000);
    });
    fundAccount();
    return "success";
}
exports.sendFaucet = sendFaucet;
function useAccount({ address, network }) {
    const url = network === "testnet" ? "https://fullnode.testnet.aptoslabs.com/v1" : network == "mainnet" ? "https://fullnode.mainnet.aptoslabs.com/v1" : "https://fullnode.devnet.aptoslabs.com/v1";
    const client = new aptos_1.AptosClient(url);
    const coinClient = new aptos_1.CoinClient(client);
    const indexClient = new aptos_1.IndexerClient(network == "mainnet" ? 'https://indexer.mainnet.aptoslabs.com/v1/graphql' : network == "devnet" ? 'https://indexer.devnet.aptoslabs.com/v1/graphql' : 'https://indexer.testnet.aptoslabs.com/v1/graphql');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [data, setData] = (0, react_1.useState)({});
    const [error, setError] = (0, react_1.useState)(null);
    const getDetails = () => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        setLoading(true);
        const [coins, nfts, tokens, transactions, balance] = yield Promise.all([
            yield indexClient.getAccountCoinsData(address),
            yield indexClient.getAccountNFTs(address),
            yield indexClient.getAccountTokensCount(address),
            yield indexClient.getAccountTransactionsCount(address),
            yield coinClient.checkBalance(address)
        ]);
        setData({
            coins: coins.current_coin_balances.map((coin) => {
                var _a, _b, _c;
                return {
                    name: (_a = coin.coin_info) === null || _a === void 0 ? void 0 : _a.name,
                    symbol: (_b = coin.coin_info) === null || _b === void 0 ? void 0 : _b.symbol,
                    type: coin.coin_type,
                    amount: Number(coin.amount),
                    formatted_amount: coin.amount /
                        Math.pow(10, ((_c = coin === null || coin === void 0 ? void 0 : coin.coin_info) === null || _c === void 0 ? void 0 : _c.decimals) || 0),
                };
            }),
            nfts: nfts.current_token_ownerships.map((nft) => {
                var _a, _b, _c, _d, _e, _f, _g;
                return {
                    amount: Number(nft.amount),
                    collection_id: (_a = nft.current_token_data) === null || _a === void 0 ? void 0 : _a.collection_data_id_hash,
                    collection_name: (_b = nft === null || nft === void 0 ? void 0 : nft.current_token_data) === null || _b === void 0 ? void 0 : _b.collection_name,
                    name: (_c = nft === null || nft === void 0 ? void 0 : nft.current_token_data) === null || _c === void 0 ? void 0 : _c.name,
                    creator_address: (_d = nft === null || nft === void 0 ? void 0 : nft.current_token_data) === null || _d === void 0 ? void 0 : _d.creator_address,
                    description: (_e = nft === null || nft === void 0 ? void 0 : nft.current_token_data) === null || _e === void 0 ? void 0 : _e.description,
                    metadata_uri: (_f = nft === null || nft === void 0 ? void 0 : nft.current_token_data) === null || _f === void 0 ? void 0 : _f.metadata_uri,
                    metadata_https_uri: 'https://ipfs.io/ipfs/' +
                        ((_g = nft === null || nft === void 0 ? void 0 : nft.current_token_data) === null || _g === void 0 ? void 0 : _g.metadata_uri.split('://')[1]),
                };
            }).filter((nft, index, self) => index ===
                self.findIndex((t) => t.collection_id === nft.collection_id &&
                    t.name === nft.name)),
            transactionsCount: (_b = (_a = transactions.move_resources_aggregate) === null || _a === void 0 ? void 0 : _a.aggregate) === null || _b === void 0 ? void 0 : _b.count,
            tokenCount: (_d = (_c = tokens === null || tokens === void 0 ? void 0 : tokens.current_token_ownerships_v2_aggregate) === null || _c === void 0 ? void 0 : _c.aggregate) === null || _d === void 0 ? void 0 : _d.count,
            balance: balance,
            formatted_balance: (Number(balance) / 100000000) + " APT",
        });
        setLoading(false);
    });
    (0, react_1.useEffect)(() => {
        if (address) {
            getDetails();
        }
    }, [address]);
    return { data, loading, error };
}
exports.useAccount = useAccount;
function useBalance({ address, network }) {
    const url = network === "testnet" ? "https://fullnode.testnet.aptoslabs.com/v1" : network == "mainnet" ? "https://fullnode.mainnet.aptoslabs.com/v1" : "https://fullnode.devnet.aptoslabs.com/v1";
    const client = new aptos_1.AptosClient(url);
    const coinClient = new aptos_1.CoinClient(client);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [data, setData] = (0, react_1.useState)({});
    const [error, setError] = (0, react_1.useState)(null);
    const getBalance = () => __awaiter(this, void 0, void 0, function* () {
        setLoading(true);
        const balance = yield coinClient.checkBalance(address);
        setData({
            value: balance,
            formatted: (Number(balance) / 100000000) + " APT",
        });
        setLoading(false);
    });
    (0, react_1.useEffect)(() => {
        if (address) {
            getBalance();
        }
        else {
            setData({});
            setLoading(false);
            setError("Address is required");
        }
    }, [address]);
    return { data, loading, error };
}
exports.useBalance = useBalance;
function useTransaction({ transactionHash, network }) {
    const url = network === "testnet" ? "https://fullnode.testnet.aptoslabs.com/v1" : network == "mainnet" ? "https://fullnode.mainnet.aptoslabs.com/v1" : "https://fullnode.devnet.aptoslabs.com/v1";
    const client = new aptos_1.AptosClient(url);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [data, setData] = (0, react_1.useState)({});
    const [error, setError] = (0, react_1.useState)(null);
    const getTransaction = () => __awaiter(this, void 0, void 0, function* () {
        setLoading(true);
        const transaction = yield client.getTransactionByHash(transactionHash);
        setData({
            gas_unit_price: Number(transaction.gas_unit_price),
            gas_used: Number(transaction.gas_used),
            max_gas_amount: Number(transaction.max_gas_amount),
            sender: transaction.sender,
            receiver: transaction.events.filter((event) => event.type === "0x1::coin::DepositEvent")[0].guid.account_address,
            status: transaction.vm_status,
            amount: Number(transaction.events.filter((event) => event.type === "0x1::coin::WithdrawEvent")[0].data.amount)
        });
        setLoading(false);
    });
    (0, react_1.useEffect)(() => {
        if (transactionHash) {
            getTransaction();
        }
        else {
            setData({});
            setLoading(false);
            setError("Transaction Hash is required");
        }
    }, [transactionHash]);
    return { data, loading, error };
}
exports.useTransaction = useTransaction;
function useCoin() {
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [data, setData] = (0, react_1.useState)({});
    const [error, setError] = (0, react_1.useState)(null);
    return { data, loading, error };
}
exports.useCoin = useCoin;
function useSendTransaction() {
}
exports.useSendTransaction = useSendTransaction;
function useConnect() {
}
exports.useConnect = useConnect;
function useMintToken() {
}
exports.useMintToken = useMintToken;
function useAns() {
}
exports.useAns = useAns;
function useFungible() {
}
exports.useFungible = useFungible;
