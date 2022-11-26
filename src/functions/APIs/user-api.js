import axios from "axios";
import ENV from "../../config.json";
import * as functions from '../common/common';

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
        console.log("res: " )
        if(response.data[0].code === 100 && response.data[0].message === "jwt expired") {
            logout();
        }
        return functions.refactor(response);
    })
    .catch((error) => {
        return { code: 101, status: 'F_ERROR', message: error };
    });
}

export const logout = () => {
    localStorage.clear();
    window.location.href = ENV.BASE_URL;
}