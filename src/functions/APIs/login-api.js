import axios from "axios";
import ENV from "../../config.json";
import * as functions from '../common/common';

export const signInWithEmailAndPassword = async (body) => {
    return await axios.post(ENV.API_URL+'auth/login', body)
    .then((response) => {
        return functions.refactor(response);
    })
    .catch((error) => {
        return { code: 101, status: 'F_ERROR', message: error };
    });
}

export const signUpWithEmailAndPassword = async (body) => {
    return await axios.post(ENV.API_URL+'users/addUser', body)
    .then((response) => {
        return functions.refactor(response);
    })
    .catch((error) => {
        return { code: 101, status: 'F_ERROR', message: error };
    });
}

export const forgotPassword = async (body) => {
    return await axios.post(ENV.API_URL+'auth/forgotPassword', body)
    .then((response) => {
        return functions.refactor(response);
    })
    .catch((error) => {
        return { code: 101, status: 'F_ERROR', message: error };
    });
}

export const resetPassword = async (body) => {
    return await axios.post(ENV.API_URL+'auth/resetPassword', body)
    .then((response) => {
        return functions.refactor(response);
    })
    .catch((error) => {
        return { code: 101, status: 'F_ERROR', message: error };
    });
}