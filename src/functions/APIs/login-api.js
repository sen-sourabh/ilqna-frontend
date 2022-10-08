import axios from "axios";
import ENV from "../../config.json";
import * as functions from '../common/common';

export const loginWithEmailAndPassword = async (body) => {
    return await axios.post(ENV.API_URL+'auth/login', body)
    .then((response) => {
        return functions.refactor(response);
    })
    .catch((error) => {
        return { code: 101, status: 'F_ERROR', message: error };
    })
}