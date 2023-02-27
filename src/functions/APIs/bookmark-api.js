import axios from "axios";
import ENV from "../../config.json";
import { refactor } from "../common/common";

export function prepareHeaders() {
    let token = !localStorage.getItem('userData') ? '' : JSON.parse(localStorage.getItem('userData')).token;
    return  { headers: {
            authorization: 'Bearer ' + token 
        }
    }
}

export const updateBookmark = async(body) => {
    return await axios.post(ENV.API_URL+"bookmarks/updateBookmark", body, prepareHeaders())
    .then((response) => {
        return refactor(response);
    })
    .catch((error) => {
        return { code: 101, status: 'F_ERROR', message: error };
    });
}