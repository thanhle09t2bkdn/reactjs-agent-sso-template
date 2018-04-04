import {
    DASH_DATE_TIME_FORMAT,
    DEFAULT_SPACE_DATE_FORMAT,
    SPACE_DATE_TIME_FORMAT,
    NUMBER_RECORD_LIMIT
} from '../constants';
import moment from 'moment/moment';
import Base64 from 'base-64';

export const convertDefaultDateTime = (dateString) => {
    return dateString ? moment(dateString).format(DASH_DATE_TIME_FORMAT) : '';
};

export const convertDefaultDate = (dateString) => {
    return dateString ? moment(dateString).format(DEFAULT_SPACE_DATE_FORMAT) : '';
};

export const convertDateUtc = (dateString) => {
    return dateString ? moment.utc(dateString).format() : '';
};

export const convertDateFormat = (dateString, format) => {
    return dateString ? moment(dateString).format(format) : '';
};

export const initMomentDateFormat = (dateString, format) => {
    return dateString ? moment(dateString, format) : '';
};

export const isMomentDate = (date) => {
    return date && !isNaN(date.day()) && !isNaN(date.month()) && !isNaN(date.year());
};

export const getValidDate = (dateString) => {
    const date = new Date(dateString.trim());
    return isNaN(date.getTime()) ? null : date;
};

export function checkDateOneMonthToNow(date) {
    const now = moment(new Date()).set({hour: 0, minute: 0, second: 0, millisecond: 0});
    const lastMonth = now.clone().subtract(1, 'month');
    date = moment(date);
    return (date > now || date < lastMonth);
}

export function decodeBase64StringToJSON(urlString) {
    let decodeJson = null;
    try {
        const decodeString = Base64.decode(urlString);
        decodeJson = JSON.parse(decodeString);
    }
    catch (error) {
    }
    return decodeJson;
}

export function encodeJSONToBase64String(json) {
    const string = JSON.stringify(json);
    return Base64.encode(string);
}

export function getPage(offset) {
    return offset / NUMBER_RECORD_LIMIT + 1
}