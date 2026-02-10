import { groupContactsSlice } from "./groupContacts.slice";

export const groupContactsReducer = groupContactsSlice.reducer
export const groupContactsMiddleware = groupContactsSlice.middleware
export const groupContactsReducerPath = groupContactsSlice.reducerPath

export const {useGetGroupContactsQuery, useAddGroupContactMutation, useDeleteGroupContactMutation, useDeleteContactFromGroupMutation} = groupContactsSlice