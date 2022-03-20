import { BaseConfig } from "../Config/BaseConfig";
import Fetch from "../Helpers/Fetch";

const login = BaseConfig.api.user('/user/login');
const register = BaseConfig.api.user('/user/register');
const checkLogin = BaseConfig.api.user('/user');

const UserService = {
    Login(data){
        const options={
            method: 'POST',
            headers:BaseConfig.utilities.getAuthorizedHeader(),
            body: JSON.stringify(data)
        };
        return Fetch(login, options);
    },
    Register(data){
        const options={
            method: 'POST',
            headers:BaseConfig.utilities.getAuthorizedHeader(),
            body: JSON.stringify(data)
        };
        return Fetch(register, options);
    },
    CheckLogin(){
        const options={
            method: 'GET',
            headers:BaseConfig.utilities.getAuthorizedHeader(),
        };
        return Fetch(checkLogin, options);
    }
}

export default UserService;