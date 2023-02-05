import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ENV from '../../config.json';

export const questionApiSlice = createApi({
    reducerPath: 'questions-api',
    baseQuery: fetchBaseQuery({
        baseUrl: ENV.API_URL,
        prepareHeaders(headers) {
            return headers;
        }
    }),
    endpoints(builder) {
        return {
            fetchQuestions: builder.query({
                query(limit = 25) {
                    return `/questions/getAllQuestions`;
                }
            }),
        }
    }
});

export const { useFetchQuestionsQuery } = questionApiSlice;