import EnvClient from './env.json';
import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import {encodeJSONToBase64String} from './helpers';
import {
    ENV,
    ARRAY_BUFFER_RESPONSE_TYPE,
    PATH_URL
} from './constants';

let envType = process.env.NODE_ENV || ENV.DEVELOPMENT;
const superagent = superagentPromise(_superagent, global.Promise);

const USER_SERVICE_URL = `${EnvClient[envType].USER_SERVICE_URL}/`;
const SSO_URL = `${EnvClient[envType].SSO_URL}/`;

let token = null;

const tokenPlugin = req => {
    if (token) {
        req.set('authorization', `Bearer ${token}`);
    }
};

const userServiceRequest = {
    get: (url) => {
        return superagent.get(`${USER_SERVICE_URL}${url}`).use(tokenPlugin);
    },
    post: (url, body) => {
        return superagent.post(`${USER_SERVICE_URL}${url}`, body).use(tokenPlugin);
    },
    put: (url, body) => {
        return superagent.put(`${USER_SERVICE_URL}${url}`, body).use(tokenPlugin);
    },
    postDownload: (url, data) => {
        return superagent.post(`${USER_SERVICE_URL}${url}`, data)
            .use(tokenPlugin)
            .responseType(ARRAY_BUFFER_RESPONSE_TYPE);
    },
};

const Auth = {
    getSSOUri: (currentPath = PATH_URL.HOME.INDEX.PATH) => {
        const redirectUri = window.location.origin + PATH_URL.AUTH.LOGIN.PATH;
        const urlParams = {
            'data': {
            },
            'redirectParam': {
                'current_path': currentPath,
                'env': envType
            },
            'redirectUri': redirectUri,
        };

        const encodeUrlParams = encodeJSONToBase64String(urlParams);
        return `${SSO_URL}login/${encodeUrlParams}`;
    },
    getProfile: () => {
        return userServiceRequest.post(`users/username`);
    },
};

export default {
    Auth,
    setToken: _token => {
        token = _token;
    },
};