import { getCookie } from "../../assets/Cookies"

class Auth {

    isAuthenticated()  {
        const auth = getCookie() !== undefined ? true : false;
        return auth;
    }
}

export default new Auth()