/* eslint-disable global-require */
import { getUniqId } from "./utils/func";

let nodeID = null;
if (require("fs").existsSync("./package.json"))
    nodeID = require("./package.json").name;

export default {
    namespace: getUniqId(),
    nodeID,
    logger: true,
    logLevel: "info",
    logFormatter: "short",
    cacher: {
        type: "memory",
        options: {
            maxParamsLength: 100,
        },
    },
    transporter: {
        type: "NATS",
        options: {
            maxPacketSize: 60 * 1024 * 1024,
        },
    },
};
