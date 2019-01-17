const promise = require("../helpers/promise");

module.exports = class DataStore {

    constructor(namespace) {
        this.namespace = namespace;
    }

    // set (put) one item
    set(key, value, cb) {
        throw new Error("Not implemented");
    }

    // delete one item
    delete(key, cb) {
        throw new Error("Not implemented");
    }

    // get one item
    one(key, cb) {
        throw new Error("Not implemented");
    }

    // get an array of items whose values met the specified condition
    list(condition, cb) {
        throw new Error("Not implemented");
    }

    async tryOne(key, cb) {
        try {
            return promise.cbOrSucceed(await this.one(key));
        } catch (error) {
            promise.cbOrSucceed(undefined, cb); 
        }
    }

    async exist(key, cb) {
        const value = await this.tryOne(key);
        return promise.cbOrSucceed(!!value, cb);
    }

    all(cb) {
        return this.list(null, cb);
    }

    // insert, error if already exists
    async insert(key, value, cb) {
        await this.one(key); // will throw if already exists
        return this.set(key, value, cb);
    }

    // insert, ignore if already exists
    async tryInsert(key, value, cb) {
        const oldValue = await this.tryOne(key);
        if (!oldValue) {
            return this.set(key, value, cb);
        } else {
            return promise.cbOrSucceed(false, cb);
        }
    }

    // update, error if not exists
    async update(key, newProps, cb) {
        const value = await this.one(key);
        return this.set(key, Object.assign(value, newProps), cb);
    }

    // update, insert if not exist
    async updateOrInsert(key, value, cb) {
        const oldValue = await this.tryOne(key);
        if (oldValue) {
            return this.set(key, Object.assign(oldValue, value), cb);
        } else {
            return this.set(key, value, cb);
        } 
    }
}