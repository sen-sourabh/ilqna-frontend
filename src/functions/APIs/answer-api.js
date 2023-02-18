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

export const fetchAllAnswersByQuestionId = async (body) => {
    return await axios.post(ENV.API_URL+"questions/getAllAnswersByQuestionId", body, prepareHeaders())
    .then((response) => {
        return functions.refactor(response);
    })
    .catch((error) => {
        return { code: 101, status: 'F_ERROR', message: error };
    });
}

export const getAllAnswersCountOfUser = async (_id) => {
    return await axios.get(ENV.API_URL+`answers/getAllAnswersCountOfUser?answerUserId=${_id}`, prepareHeaders())
    .then((response) => {
        functions.checkJWT(response);
        return functions.refactor(response);
    })
    .catch((error) => {
        return { code: 101, status: 'F_ERROR', message: error };
    });
}

export const addAnswer = async (body) => {
    return await axios.post(ENV.API_URL+"answers/addAnswer", body, prepareHeaders())
    .then((response) => {
        return functions.refactor(response);
    })
    .catch((error) => {
        return { code: 101, status: 'F_ERROR', message: error };
    });
}

export const updateAnswer = async(body) => {
    return await axios.put(ENV.API_URL+"answers/updateAnswer", body, prepareHeaders())
    .then((response) => {
        return functions.refactor(response);
    })
    .catch((error) => {
        return { code: 101, status: 'F_ERROR', message: error };
    });
}