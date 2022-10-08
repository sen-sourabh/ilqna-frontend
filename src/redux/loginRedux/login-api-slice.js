import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ENV from '../../config.json';

export const loginApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: ENV.API_URL,
        prepareHeaders(headers) {
            return headers;
        }
    }),
    endpoints(builder) {
        return {
            loginWithEmailAndPassword: builder.query({
                query(data) {
                    return 'auth/login'
                },
            }),
        };
    }
});

export const { useLoginWithEmailAndPasswordQuery } = loginApi

