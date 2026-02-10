import { contactsApiSlice } from "./contacts.slice";

export const contactsReducer = contactsApiSlice.reducer
export const contactsReducerPath = contactsApiSlice.reducerPath
export const contactsMiddleware = contactsApiSlice.middleware
export const {useGetContactsQuery, useAddContactMutation, useDeleteContactMutation, useSwitchFavoriteContactMutation} = contactsApiSlice;