import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetMailsProps, IMail, IUpdateMailProps } from 'types/Mails';

export const mailApi = createApi({
  reducerPath: 'mail/api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['Mails'],
  endpoints: ({ query, mutation }) => ({
    sendMail: mutation<IMail, Omit<IMail, 'id'>>({
      query: (body) => ({
        url: 'mails',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Mails']
    }),
    getMails: query<IMail[], IGetMailsProps>({
      query: ({ filter, q, groupId }) => ({
        url: 'mails',
        params: { filter, q, groupId }
      }),
      providesTags: ['Mails']
    }),
    updateMail: mutation<void, IUpdateMailProps>({
      query: ({ id, mail }) => ({
        url: `mails/${id}`,
        method: 'PATCH',
        body: mail
      }),
      invalidatesTags: ['Mails']
    }),
    deleteMail: mutation<void, number>({
      query: (id) => ({
        url: `mails/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Mails']
    }),
  })
});

export const { useSendMailMutation, useGetMailsQuery, useUpdateMailMutation, useDeleteMailMutation } = mailApi;

