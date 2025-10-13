// app.js
const express = require('express');
const redis = require('redis');

const app = express();
const REDIS_URL = process.env.REDIS_URL || 'redis://redis:6379';

// Create Redis client
const client = redis.createClient({ url: REDIS_URL });

// Connect to Redis (async)
(async () => {
  try {
    await client.connect();
    console.log('Connected to Redis at', REDIS_URL);
  } catch (err) {
    console.error('Redis connection error:', err);
    process.exit(1);
  }
})();

// Simple health check endpoint
app.get('/health', async (req, res) => {
  try {
    const pong = await client.ping();
    res.json({ status: 'ok', redis: pong });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

// Main endpoint: increments visit counter
app.get('/', async (req, res) => {
  try {
    let count = await client.get('visits');
    count = parseInt(count) || 0;
    count += 1;
    await client.set('visits', String(count));
    res.send(`Page visited ${count} times`);
  } catch (err) {
    console.error('Error handling / route:', err);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
