import FS from 'fs-extra';
import Path from 'path';
import DotENV from 'dotenv';

DotENV.config();

const env = process.env.NODE_ENV;


const credentials = {
    key: FS.readFileSync(Path.resolve(__dirname, 'ssl', process.env.key || 'key.key')),
    cert: FS.readFileSync(Path.resolve(__dirname, 'ssl', process.env.cert || 'key.crt'))
};

module.exports = {
    env: env,
    port: process.env.PORT,
    credentials
};