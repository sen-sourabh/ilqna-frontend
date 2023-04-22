import axios from "axios";
import ENV from "../../config.json";
import { checkJWT, refactor } from '../common/common';

export const prepareHeaders = () => {
    let token = !localStorage.getItem('userData') ? '' : JSON.parse(localStorage.getItem('userData')).token;
    return  { headers: {
            authorization: 'Bearer ' + token 
        }
    }
}

export const updateUsername = async (body) => {
    return await axios.put(ENV.API_URL+"users/updateUser", body, prepareHeaders())
    .then((response) => {
        checkJWT(response);
        return refactor(response);
    })
    .catch((error) => {
        return { code: 101, status: 'F_ERROR', message: error };
    });
}

export const changePassword = async (body) => {
    return await axios.post(ENV.API_URL+'auth/changePassword', body, prepareHeaders())
    .then((response) => {
        checkJWT(response);
        return refactor(response);
    })
    .catch((error) => {
        return { code: 101, status: 'F_ERROR', message: error };
    });
}
