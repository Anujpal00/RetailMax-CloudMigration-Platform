// metrics-server.js
const express = require('express');
const client = require('prom-client');

const app = express();
const port = 9000;

// Create a Prometheus Registry
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Optional: Custom metric
const pageLoadCounter = new client.Counter({
  name: 'page_loads_total',
  help: 'Total number of page loads'
});
register.registerMetric(pageLoadCounter);

// Increment when endpoint is hit
app.get('/track-page-load', (req, res) => {
  pageLoadCounter.inc();
  res.send('Page load tracked');
});

// Prometheus endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(port, () => {
  console.log(`📊 Metrics server running at http://localhost:${port}/metrics`);
});
