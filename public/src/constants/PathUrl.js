const PATH_URL = {
    HOME: {
        INDEX: {
            TITLE: 'Home',
            PATH: '/'
        },
    },
    NOT_FOUND: {
        TITLE: 'Page not found',
        PATH: '/404'
    },
    SETTING: {
        TITLE: 'Setting',
        PATH: '/setting'
    },
    AUTH: {
        LOGIN: {
            TITLE: 'Login',
            PATH: '/login'
        },
        OAUTH: {
            TITLE: 'Oauth',
            PATH: '/login/:oauthToken'
        },
    },
};

export {
    PATH_URL
}