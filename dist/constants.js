"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMPILER_VERSIONS = exports.CURRENT_BUCKET_NAME_BY_NETWORK = exports.CURRENT_URL_BY_NETWORK = exports.CURRENT_NETWORK = void 0;
var NETWORK;
(function (NETWORK) {
    NETWORK["mainnet"] = "mainnet";
    NETWORK["goerli"] = "goerli";
    NETWORK["goerli2"] = "goerli2";
    NETWORK["integration"] = "integration";
})(NETWORK || (NETWORK = {}));
const URL_BY_NETWORKS = {
    mainnet: 'https://voyager.online',
    goerli: 'https://goerli.voyager.online',
    goerli2: 'https://goerli-2.voyager.online/',
    integration: 'https://integration.voyager.online'
};
const BUCKET_NAMES_BY_NETWORK = {
    goerli: 'voyager-goerli-caching',
    goerli2: 'voyager-goerli2-caching',
    mainnet: 'voyager-mainnet-caching',
    integration: 'voyager-goerli-caching'
};
exports.CURRENT_NETWORK = NETWORK.goerli;
exports.CURRENT_URL_BY_NETWORK = URL_BY_NETWORKS[exports.CURRENT_NETWORK];
exports.CURRENT_BUCKET_NAME_BY_NETWORK = BUCKET_NAMES_BY_NETWORK[exports.CURRENT_NETWORK];
exports.COMPILER_VERSIONS = [
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
];
//# sourceMappingURL=constants.js.map