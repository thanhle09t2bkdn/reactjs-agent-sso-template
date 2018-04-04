import {KEY_LOCAL_STORAGE} from '../constants';

export function checkAuthenticated() {
    const today = new Date().getTime();
    let oauthToken = null;
    try {
        oauthToken = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE));
    }
    catch (error) {
    }
    if (!oauthToken) {
        return {
            oauthToken: null,
            isAuthenticated: false
        };
    }
    const expiresRestTime = oauthToken.expires - today;
    const expiresIn = (oauthToken.expires_in - 120) * 1000;
    const isAuthenticated = expiresRestTime < expiresIn && expiresRestTime > 0;
    return {
        oauthToken: oauthToken,
        isAuthenticated: isAuthenticated
    };
}

export function authenticated(oauthToken) {
    oauthToken.expires = new Date().getTime() + (oauthToken.expires_in - 120) * 1000;
    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(oauthToken));
}

export function removeAuthenticated() {
    localStorage.removeItem(KEY_LOCAL_STORAGE);
}

export function getOauthToken() {
    let oauthToken = null;
    try {
        oauthToken = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE));
    }
    catch (error) {
    }
    return oauthToken;
}