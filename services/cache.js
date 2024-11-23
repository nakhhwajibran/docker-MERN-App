const mongoose = require("mongoose");
const exec = mongoose.Query.prototype.exec;
const redis = require("redis");
const client = redis.createClient({
  host: 'redis', // Use the Docker service name here
  port: 6379
});
const util = require("util");
client.hget = util.promisify(client.hget);

mongoose.Query.prototype.cache = function(options = {}){
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || '');

    return this;
}


mongoose.Query.prototype.exec = async function () {
    if(!this.useCache){
        return exec.apply(this, arguments);
    }
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );

  // See if we have a value for a key in redis
  const cacheValue = await client.hget(this.hashKey, key);

  // IF we do , return that
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
    //  const doc = new this.model(JSON.parse(cacheValue))
    //    return doc;
  }
  // Othervise, issue the quert and store the result

  const result = await exec.apply(this, arguments);

  client.hset(this.hasKey || '', key || '', JSON.stringify(result));
  return result;
};

module.exports = {
    clearHash(hashKey) {
        client.del(JSON.stringify(hashKey));
    }
}
