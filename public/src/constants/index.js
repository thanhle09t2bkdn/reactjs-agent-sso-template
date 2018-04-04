import {PATH_URL} from './PathUrl';
import {COLOR, STYLE} from './Style';

const ENV = {
    DEVELOPMENT: 'development',
    STAGING: 'staging',
    PRODUCTION: 'production'
};

const GRANT_TYPE = {
    PASSWORD: 'password',
    REFRESH_TOKEN: 'refresh_token',
    CLIENT_CREDENTIALS: 'client_credentials',
};

const SIZE = {
    EX_SMALL: 'ex-small-size',
    SMALL: 'small-size',
    MEDIUM: 'medium-size',
    LARGE: 'large-size',
};

const NUMBER_RECORD_LIMIT = 15;

const SPACE_DATE_TIME_FORMAT = 'DD MMM YYYY hh:mm A';
const DASH_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DEFAULT_SPACE_DATE_FORMAT = 'DD MMM YYYY';
const STRING_DATE_FORMAT = 'DDMMYYYY';
const SLASH_DATE_FORMAT = 'DD/MM/YYYY';
const MM_MONTH_FORMAT = 'MM';
const YYYY_YEAR_FORMAT = 'YYYY';
const DASH_UTC_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss Z';
const DASH_UTC_DATE_T_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS';
const DASH_YYYY_MM_DD_DATE_FORMAT = 'YYYY-MM-DD';

const REPORT_FILE_NAME = 'report.zip';
const ARRAY_BUFFER_RESPONSE_TYPE = 'arraybuffer';

const KEY_LOCAL_STORAGE = 'oauthToken';

export {
    PATH_URL,
    COLOR,
    STYLE,
    ENV,
    GRANT_TYPE,
    SIZE,
    KEY_LOCAL_STORAGE,
    NUMBER_RECORD_LIMIT,
    SPACE_DATE_TIME_FORMAT,
    DASH_DATE_TIME_FORMAT,
    DEFAULT_SPACE_DATE_FORMAT,
    STRING_DATE_FORMAT,
    SLASH_DATE_FORMAT,
    MM_MONTH_FORMAT,
    YYYY_YEAR_FORMAT,
    DASH_UTC_DATE_TIME_FORMAT,
    DASH_UTC_DATE_T_TIME_FORMAT,
    DASH_YYYY_MM_DD_DATE_FORMAT,
    REPORT_FILE_NAME,
    ARRAY_BUFFER_RESPONSE_TYPE,
};