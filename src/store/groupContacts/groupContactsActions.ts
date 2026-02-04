import { GroupContactsDto } from "src/types/dto/GroupContactsDto";
import { ADD_GROUP_CONTACT, DELETE_CONTACT_FROM_GROUP, DELETE_GROUP_CONTACT, RESET_GROUP_CONTACTS, SET_GROUP_CONTACTS, SET_LOADING_GROUP_CONTACTS, SET_SUCCESS_GROUP_CONTACTS } from "./types/groupContactsActionTypes";

export interface SetGroupContactsAction {
    type: typeof SET_GROUP_CONTACTS;
    payload: {
        groupContacts: GroupContactsDto[]
    }
}

export interface SetLoadingGroupContactsAction {
    type: typeof SET_LOADING_GROUP_CONTACTS;
}

export interface SetSuccessGroupContactsAction {
    type: typeof SET_SUCCESS_GROUP_CONTACTS;
}

export interface ResetGroupContactsAction {
    type: typeof RESET_GROUP_CONTACTS;
}

export interface AddGroupContactAction {
    type: typeof ADD_GROUP_CONTACT;
    payload: {
        groupContact: GroupContactsDto
    }
}

export interface DeleteGroupContactAction {
    type: typeof DELETE_GROUP_CONTACT;
    payload: {
        id: string
    }
}

export interface DeleteContactFromGroupAction {
    type: typeof DELETE_CONTACT_FROM_GROUP;
    payload: {
        id: string
    }
}

export type GroupContactsActions =  SetGroupContactsAction 
    | AddGroupContactAction
    | DeleteGroupContactAction
    | DeleteContactFromGroupAction
    | SetLoadingGroupContactsAction
    | SetSuccessGroupContactsAction
    | ResetGroupContactsAction

export const setGroupContactsActionCreator = (groupContacts: GroupContactsDto[]): SetGroupContactsAction => ({
    type: SET_GROUP_CONTACTS,
    payload: {groupContacts}
});

export const setLoadingGroupContactsActionCreator = (): SetLoadingGroupContactsAction => ({
    type: SET_LOADING_GROUP_CONTACTS
});

export const setSuccessGroupContactsActionCreator = (): SetSuccessGroupContactsAction => ({
    type: SET_SUCCESS_GROUP_CONTACTS
});

export const resetGroupContactsActionCreator = (): ResetGroupContactsAction => ({
    type: RESET_GROUP_CONTACTS
});

export const addGroupContactsActionCreator = (groupContact: GroupContactsDto): AddGroupContactAction => ({
    type: ADD_GROUP_CONTACT,
    payload: {groupContact}
});

export const deleteGroupContactsActionCreator = (id: string): DeleteGroupContactAction => ({
    type: DELETE_GROUP_CONTACT,
    payload: {id}
});

export const deleteContactFromGroupActionCreator = (id: string): DeleteContactFromGroupAction => ({
    type: DELETE_CONTACT_FROM_GROUP,
    payload: {id}
});

export const fetchGroupContacts = () => {
    return async (dispatch: any) => {
        try {
            dispatch(setLoadingGroupContactsActionCreator());
            const res = await fetch('https://mocki.io/v1/fb737dba-03ae-42c2-bdfe-2adc48d52965');
            const data = await res.json();
            dispatch(setGroupContactsActionCreator(data));
            dispatch(setSuccessGroupContactsActionCreator());
        } catch (e) {
            dispatch(resetGroupContactsActionCreator());
        }
    }
};