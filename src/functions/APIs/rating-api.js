import axios from "axios";
import ENV from "../../config.json";
import { checkJWT, refactor } from "../common/common";

export function prepareHeaders() {
    let token = !localStorage.getItem('userData') ? '' : JSON.parse(localStorage.getItem('userData')).token;
    return  { headers: {
            authorization: 'Bearer ' + token 
        }
    }
}

export const updateRating = async(body) => {
    return await axios.post(ENV.API_URL+"ratings/updateRating", body, prepareHeaders())
    .then((response) => {
        checkJWT(response);
        return refactor(response);
    })
    .catch((error) => {
        return { code: 101, status: 'F_ERROR', message: error };
    });
}