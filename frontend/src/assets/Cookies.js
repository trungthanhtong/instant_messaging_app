import Cookie from 'js-cookie';
const EXPIRE_DURATION = 3
const TOKEN = 'token'

export const setCookie = (data) => {
    Cookie.set(TOKEN, data, {expires: EXPIRE_DURATION});
}

export const getCookie = () => {
    return Cookie.get(TOKEN);
}

export const removeCookie = () => {
    Cookie.remove(TOKEN);
}