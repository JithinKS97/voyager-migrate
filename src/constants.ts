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
    goerli2:'voyager-goerli2-caching',
    mainnet: 'voyager-mainnet-caching',

}

export const CURRENT_NETWORK = NETWORK.goerli
export const CURRENT_URL_BY_NETWORK = URL_BY_NETWORKS[CURRENT_NETWORK]
export const CURRENT_BUCKET_NAME_BY_NETWORK = BUCKET_NAMES_BY_NETWORK[CURRENT_NETWORK]