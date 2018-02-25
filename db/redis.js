// const redis = require('redis')
const redis = require('ioredis')
const config = require('../config')

const redisLink = config[process.env.NODE_ENV || 'development']['redis']
// const redisClient = redis.createClient(redisLink)
const redisClient = config.redis;

redisClient
    .on('error', err => console.log('------ Redis connection failed ------' + err))
    .on('connect', () => console.log('------ Redis connection succeed ------'))

export default {
    redis: redis,
    redisClient: redisClient,
}
