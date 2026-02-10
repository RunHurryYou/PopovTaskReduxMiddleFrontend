import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { contactsMiddleware, contactsReducer, contactsReducerPath } from "./contacts";
import { groupContactsMiddleware, groupContactsReducer, groupContactsReducerPath } from "./groupContacts";

const rootReducer = combineReducers({
    [contactsReducerPath]: contactsReducer,
    [groupContactsReducerPath]: groupContactsReducer
});

export const store = configureStore(
    {
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware().concat(
                [
                    contactsMiddleware,
                    groupContactsMiddleware
                ]
            )
    }
);

export type RootState = ReturnType<typeof store.getState>;