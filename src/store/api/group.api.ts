import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGroup, IUpdateGroupProps } from 'types/Groups';

export const groupApi = createApi({
  reducerPath: 'group/api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['Groups'],
  endpoints: ({ query, mutation }) => ({
    createGroup: mutation<IGroup, Omit<IGroup, 'id'>>({
      query: (body) => ({
        url: 'groups',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Groups']
    }),
    getGroups: query<IGroup[], void>({
      query: () => ({
        url: 'groups',
      }),
      providesTags: ['Groups']
    }),
    updateGroup: mutation<void, IUpdateGroupProps>({
      query: ({ id, group }) => ({
        url: `groups/${id}`,
        method: 'PATCH',
        body: group
      }),
      invalidatesTags: ['Groups']
    }),
    deleteGroup: mutation<void, number>({
      query: (id) => ({
        url: `groups/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Groups']
    }),
  })
});

export const { useCreateGroupMutation, useDeleteGroupMutation, useGetGroupsQuery, useUpdateGroupMutation } = groupApi;

