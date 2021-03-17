import { DOMAIN, STATUS_CODE } from "../util/constants/settingSystem";
import Axios from "axios";
import { getCookie } from "../assets/Cookies";

class UserService {
    createUser = async (newUser) => {
        try {
            const res = await Axios({
                url: `${DOMAIN}/users/add`,
                method: "POST",
                data: {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    password: newUser.password,
                },
            });
            if (res.status === STATUS_CODE.SUCCESS) {
                return this.findUser(newUser.email, newUser.password);
            } else {
                console.log(res);
            }
        } catch (err) {
            console.log(err);
        }
    };

    findUser = (email, password) => {
        return Axios({
            url: `${DOMAIN}/users/login`,
            method: "POST",
            data: { email, password },
        });
    };

    getUser = () => {
        const cookie = getCookie();
        if (cookie) {
            return Axios({
                url: `${DOMAIN}/users/getUser`,
                method: "PUT",
                data: { token: cookie },
            });
        } else {
            return;
        }
    };
}

export const userService = new UserService();
