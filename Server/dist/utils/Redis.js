"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = require("ioredis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = parseInt(process.env.REDIS_PORT || '6379', 10);
// Validate configuration
if (!process.env.REDIS_HOST) {
    console.warn('REDIS_HOST is not set. Using default: localhost');
}
if (!process.env.REDIS_PORT) {
    console.warn('REDIS_PORT is not set. Using default: 6379');
}
// Initialize Redis client
// const redis = new Redis({
//     host: redisHost,
//     port: redisPort,
// });
const redis = new ioredis_1.Redis({
    host: redisHost || '127.0.0.1',
    port: redisPort,
    password: process.env.REDIS_PASSWORD || 'your_strong_password',
    db: 0,
});
redis.on('connect', () => {
    console.log(`redis running on port ${redisPort}`);
});
// Error handling
redis.on('error', (err) => {
    console.error('Redis connection error:', err);
});
exports.default = redis;
