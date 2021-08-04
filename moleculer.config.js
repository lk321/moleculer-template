/* eslint-disable global-require */
let nodeID = null;
if (require("fs").existsSync("./package.json"))
    nodeID = require("./package.json").name;

module.exports = {
    // Namespace of nodes to segment your nodes on the same network.
    namespace: process.env.NAMESPACE || "microservices",
    nodeID,
    metadata: {},
    logger: {
        type: "Console",
        options: {
            colors: true,
            moduleColors: false,
            formatter: "full",
            objectPrinter: null,
            autoPadding: false,
        },
    },
    logLevel: "info",
    transporter: {
        type: "NATS",
        options: {
            url: process.env.NATS_URI,
            maxPacketSize: 60 * 1024 * 1024,
            maxConnections: process.env.MAX_CONNECTIONS || 40,
        },
    },
    cacher: false,
    serializer: false,
    requestTimeout: 10 * 1000,
    retryPolicy: {
        enabled: false,
        retries: 5,
        delay: 100,
        maxDelay: 1000,
        factor: 2,
        check: (err) => err && !!err.retryable,
    },
    maxCallLevel: 100,
    heartbeatInterval: 10,
    heartbeatTimeout: 30,
    contextParamsCloning: false,
    tracking: {
        enabled: false,
        shutdownTimeout: 5000,
    },
    disableBalancer: false,
    registry: {
        strategy: "RoundRobin",
        preferLocal: true,
    },
    circuitBreaker: {
        enabled: false,
        threshold: 0.5,
        minRequestCount: 20,
        windowTime: 60,
        halfOpenTime: 10 * 1000,
        check: (err) => err && err.code >= 500,
    },
    bulkhead: {
        enabled: false,
        concurrency: 10,
        maxQueueSize: 100,
    },
    validator: true,
    errorHandler: null,
    middlewares: [],
    replCommands: null,
};
