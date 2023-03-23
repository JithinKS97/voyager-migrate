enum NETWORK { 
    mainnet = 'mainnet',
    goerli = 'goerli',
    goerli2 = 'goerli2',
    integration = 'integration' 
}

const URL_BY_NETWORKS = {
    mainnet: 'https://voyager.online',
    goerli: 'https://goerli.voyager.online',
    goerli2: 'https://goerli-2.voyager.online/',
    integration: 'https://integration.voyager.online'
}

const BUCKET_NAMES_BY_NETWORK = {
    goerli:'voyager-goerli-caching',
    goerli2:'voyager-goerli-2-caching',
    mainnet: 'voyager-mainnet-caching',
    integration: 'voyager-goerli-caching'
}

export const CURRENT_NETWORK = NETWORK.goerli
export const CURRENT_URL_BY_NETWORK = URL_BY_NETWORKS[CURRENT_NETWORK]
export const CURRENT_BUCKET_NAME_BY_NETWORK = BUCKET_NAMES_BY_NETWORK[CURRENT_NETWORK]


export const COMPILER_VERSIONS = [
    "0.6.1",
    "0.6.2",
    "0.7.0",
    "0.7.1",
    "0.8.0",
    "0.8.1",
    "0.8.2",
    "0.9.0",
    "0.9.1",
    "0.10.1",
    "0.10.2",
    "0.10.3",
]