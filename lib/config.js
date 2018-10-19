/*
* js4eos Powered by Eosfavor
* Jack Itleaks @2018
* itleaks@126.com
*/

var fs = require('fs');
var config = {}
defaultConfig = {
    networks:{
        mainnet: {
            chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
            httpEndpoint:'http://bp.cryptolions.io:8888',
            keyPrefix:'EOS',
        },
        eosforce: {
            chainId:'bd61ae3a031e8ef2f97ee3b0e62776d6d30d4833c8f7c1645c657b149151004b',
            httpEndpoint:'http://47.97.115.84:8888',
            keyPrefix:'EOS',
        },
        jungle: {
            chainId:'038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
            httpEndpoint:'http://193.93.219.219:8888',
            keyPrefix:'EOS',
        },
        kylin: {
            chainId:'5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
            httpEndpoint:'http://api-kylin.eoshenzhen.io:8890',
            keyPrefix:'EOS',
        },
        enu: {
            chainId:'5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
            httpEndpoint:'http://enu.mytokenpocket.vip',
            keyPrefix:'ENU',
        },
        fibos: {
            chainId:'6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a',
            httpEndpoint:'http://se-rpc.fibos.io:8870',
            keyPrefix:'FO',
        },
    },
    currentNetwork:'mainnet',
    dataDir:require('path').join(require('os').homedir(), ".js4eos"),
    disable_keosd:false,
}

if (!fs.existsSync(defaultConfig.dataDir)) {
    fs.mkdirSync(defaultConfig.dataDir,'0777', true)
}

var configFile = require('path').join(defaultConfig.dataDir, "config.json");

function loadConfig() {
    let config = {}
    if (!fs.existsSync(configFile)) {
        return config
    }
    try {
        let data = fs.readFileSync(configFile);
        config = JSON.parse(data);
    } catch(e) {
        console.log(e)
    }
    return config;
}

function saveConfig(config) {
    let data = JSON.stringify(config);
    fs.writeFileSync(configFile, data);
}

function getConfig() {
    return config;
}

function disableKeosd(value) {
    config.disable_keosd = value;
    saveConfig(config)
}

function getNetwork() {
    return config.networks[config.currentNetwork];
}

var userConfig = loadConfig();
config = {...defaultConfig, ...userConfig}
module.exports = {getConfig, saveConfig, disableKeosd, getNetwork};