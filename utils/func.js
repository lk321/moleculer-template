const os = require("os");
const crypto = require("crypto");

const sha256 = (str) =>
    crypto.createHash("sha256").update(str, "binary").digest("hex");

exports.getUniqId = () => {
    const interfaces = os.networkInterfaces();
    let mac = os.hostname();

    if (
        interfaces.en0 &&
        Array.isArray(interfaces.en0) &&
        interfaces.en0.length > 0
    ) {
        mac = interfaces.en0.filter((i) => i.family === "IPv4")[0].mac;
    }

    return sha256(mac);
};

exports.isObjectId = (str) => /^[0-9a-fA-F]{24}$/.test(str);

exports.sha256 = sha256;
