// tracing.js
"use strict";

const process = require('process');
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

// The service name is REQUIRED! It is a resource attribute,
// which means that it will be present on all observability data that your service generates.
//
// Your service name will be used as the Service Dataset in Honeycomb, which is where data is stored.
const sdk = new NodeSDK({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'YOUR_SERVICE_NAME',
    }),

    // Instrumentations allow you to add auto-instrumentation packages
    instrumentations: [getNodeAutoInstrumentations()]
});

sdk.start()
    .then(() => console.log('Tracing initialized'))
    .catch((error) => console.log('Error initializing tracing', error));

process.on('SIGTERM', () => {
    sdk.shutdown()
        .then(() => console.log('Tracing terminated'))
        .catch((error) => console.log('Error terminating tracing', error))
        .finally(() => process.exit(0));
});
