import axios from "axios";
import ENV from "../../config.json";
import * as functions from '../common/common';

export function prepareHeaders() {
    let token = !localStorage.getItem('userData') ? '' : JSON.parse(localStorage.getItem('userData')).token;
    return  { headers: {
            authorization: 'Bearer ' + token 
        }
    }
}

export const fetchAllQuestions = async (body) => {
    return await axios.post(ENV.API_URL+"questions/getAllQuestions", body, prepareHeaders())
    .then((response) => {
        return functions.refactor(response);
    })
    .catch((error) => {
        return { code: 101, status: 'F_ERROR', message: error };
    });
}

export const getAllQuestionsCountOfUser = async (body) => {
    return await axios.get(ENV.API_URL+"questions/getAllQuestionsCountOfUser", body, prepareHeaders())
    .then((response) => {
        functions.checkJWT(response);
        return functions.refactor(response);
    })
    .catch((error) => {
        return { code: 101, status: 'F_ERROR', message: error };
    });
}

export const addQuestion = async (body) => {
    return await axios.post(ENV.API_URL+"questions/addQuestion", body, prepareHeaders())
    .then((response) => {
        functions.checkJWT(response);
        return functions.refactor(response);
    })
    .catch((error) => {
        return { code: 101, status: 'F_ERROR', message: error };
    });
}
