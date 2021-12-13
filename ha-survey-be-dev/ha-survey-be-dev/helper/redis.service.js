//TODO: need a redis service on aws from devops
// const redis = require('redis').createClient({host: "ha-redis-dev.8q4bau.ng.0001.use1.cache.amazonaws.com", port: 6379});
const NodeCache = require("node-cache");
const nodeCache = new NodeCache();
const crypto = require('crypto');

class RedisService {
    constructor() {
        this.redis = nodeCache;
        this.setValue = this.setValue.bind(this);
        this.getValue = this.getValue.bind(this);
    }

    setValue(payload) {
        const key = crypto.randomBytes(16).toString('hex');
        let success = nodeCache.set(key, payload, 600);
        console.log(success);
        return key
    }

    getValue(key) {
        let data = nodeCache.get(key)
        console.log(data)
        return data;
    }
}

module.exports = new RedisService();
