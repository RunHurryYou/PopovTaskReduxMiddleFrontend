import { ContactDto } from "src/types/dto/ContactDto";
import { ADD_CONTACT, DELETE_CONTACT, RESET_CONTACTS, SET_CONTACTS, SET_LOADING_CONTACTS, SET_SUCCESS_CONTACTS } from "./types/contactActionTypes";

export interface SetContactsAction {
    type: typeof SET_CONTACTS;
    payload: {
        contacts: ContactDto[],
    }
}

export interface SetLoadingContactsAction {
    type: typeof SET_LOADING_CONTACTS;
}

export interface SetSuccessContactsAction {
    type: typeof SET_SUCCESS_CONTACTS;
}

export interface ResetContactsAction {
    type: typeof RESET_CONTACTS;
}

export interface DeleteContactAction {
    type: typeof DELETE_CONTACT;
    payload: {
        id: string
    }
}

export interface AddContactAction {
    type: typeof ADD_CONTACT;
    payload: {
        contact: ContactDto
    }
}

export type ContactsAction = SetContactsAction | SetLoadingContactsAction | SetSuccessContactsAction | ResetContactsAction | DeleteContactAction | AddContactAction


export const setContactsActionCreator = (contacts: ContactDto[]): SetContactsAction => ({
    type: SET_CONTACTS,
    payload: {contacts}
});

export const setLoadingContactsActionCreator = (): SetLoadingContactsAction => ({
    type: SET_LOADING_CONTACTS
});

export const setSuccessContactsActionCreator = (): SetSuccessContactsAction => ({
    type: SET_SUCCESS_CONTACTS
});

export const resetContactsActionCreator = (): ResetContactsAction => ({
    type: RESET_CONTACTS
});

export const addContactActionCreator = (contact: ContactDto): AddContactAction=> ({
    type: ADD_CONTACT,
    payload: {contact}
})

export const deleteContactActionCreator = (id: string): DeleteContactAction => ({
    type: DELETE_CONTACT,
    payload: {id}
});

export const fetchContacts = () => {
    return async (dispatch:any)=>{
        try{
            dispatch(setLoadingContactsActionCreator());
            const res = await fetch('https://mocki.io/v1/3b903a2f-b00d-48ff-a2c3-e608b952191c');
            const data = await res.json();
            dispatch(setContactsActionCreator(data));
            dispatch(setSuccessContactsActionCreator());
        }catch(e){
            dispatch(resetContactsActionCreator());
        }
    }
}
    