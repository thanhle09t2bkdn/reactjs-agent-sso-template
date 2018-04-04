# reactjs-agent-template

Copy from [React-redux-realworld-example-app](https://github.com/gothinkster/react-redux-realworld-example-app)

> ### React + Redux + Superagent + Login SSO + Refresh token

## Getting Started

To get the frontend running locally

- Clone this repo
- `yarn install` to install all req'd dependencies
- Setting server .env
    - `NODE_ENV` mode run project: (development, staging, production)
    - `DIST_DIR` folder default run generate file bundle.js
- Setting client `public/src/env.json`
    - `SSO_URL` url of page login SSO
    - `USER_SERVICE_URL` url of another service
    - Key of object must map with `NODE_ENV` (development, staging, production)
- Setting login sso
    - Edit function `Auth.getSSOUri` in `public/src/agent.js`
- `yarn react_dev` to start with development mode (default port 8080)
- `yarn start` to start with product mode (default port 9999)

## Functionality overview

- Login through SSO server.
- Refresh token

**General temple folder**

- `server` Server Node JS to run reactjs page
- `public` reactjs source
    - `client` has file `index.html` and `bundle.js` when run local `yarn react_dev`
    - `dist` has file `index.html` and `bundle.js` when run local `yarn start`. This folder will create according to `DIST_DIR` in file .env 
    - `src` source reactjs of project 
        - `actions` action of redux: every action usually has `ASYNC_START`
            - `auth` action when login and refresh token
            - `common` action redirect page, show message
            - `home` action of home page
        - `components` defines all component of project
        - `constants` defines PathUrl of react page, style, color, ...
        - `containers` contains function `dispatch` call api, `state` you want to convert to `props`
        - `modules` has function to communicate with localStorage
        - `page` UI and logic function of page
        - `reducers` Manage `state` of page (when use redux)
            - `auth` have action `ASYNC_START` to know when action done
            - `common` save information of user, can catch show error of request here
            - `home` action of home page
        - `agent.js` function call API: get, post, put, or download binary
        - `middleware.js` catch request, response API. Check token expired here. `localStorageMiddleware` Communicate with localStorage 
- `webpack.config.js` for development mode when run `yarn react_dev`
- `webpack.config.prod.js` for development mode when run `yarn start`

##Authors
- Thanh Le - Init webpack - [ThanhLe](https://github.com/thanhle09t2bkdn)
- Thanh Ngo - Init source - [ThanhNgo](https://github.com/vietthanhbk1994)

##License
MIT
        
    
