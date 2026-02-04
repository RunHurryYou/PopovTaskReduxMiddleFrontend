import { applyMiddleware, combineReducers, createStore } from "redux";
import {thunk} from "redux-thunk";
import { contactsReducer } from "./contacts/contactsReducer";
import { favoriteContactsReducer } from "./favContacts/favContactsReducers";
import { groupContactsReducer } from "./groupContacts/groupContactsReducers";

export interface RootState {
    contacts: ReturnType<typeof contactsReducer>;
    favoriteContacts: ReturnType<typeof favoriteContactsReducer>;
    groupContacts: ReturnType<typeof groupContactsReducer>;
}

const rootReducer = combineReducers({
    contacts: contactsReducer,
    favoriteContacts: favoriteContactsReducer,
    groupContacts: groupContactsReducer
});

// @ts-ignore
export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);
//ts много жалуется если таким способом обьявлять rootState
//export type RootState = ReturnType<typeof store.getState>;