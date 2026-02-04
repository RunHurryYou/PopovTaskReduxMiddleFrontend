import { ContactDto } from "src/types/dto/ContactDto";
import { DELETE_CONTACT_FROM_FAVORITE, RESET_FAVORITE_CONTACTS, SET_FAVORITE_CONTACTS, SET_LOADING_FAVORITE_CONTACTS, SET_SUCCESS_FAVORITE_CONTACTS, SWITCH_FAVORITE_CONTACTS } from "./types/favContactsActionTypes";

export interface SetFavoriteContactsAction {
    type: typeof SET_FAVORITE_CONTACTS;
    payload: {
        favoriteContacts: ContactDto[]
    }
}

export interface SetLoadingFavoriteContactsAction {
    type: typeof SET_LOADING_FAVORITE_CONTACTS;
}

export interface SetSuccessFavoriteContactsAction {
    type: typeof SET_SUCCESS_FAVORITE_CONTACTS;
}

export interface ResetFavoriteContactsAction {
    type: typeof RESET_FAVORITE_CONTACTS;
}


export interface SwitchFavoriteContactsAction {
    type: typeof SWITCH_FAVORITE_CONTACTS;
    payload: {
        contact: ContactDto
    }
}

export interface DeleteContactFromFavoriteAction{
    type: typeof DELETE_CONTACT_FROM_FAVORITE;
    payload: {
        id: string
    }
}
export type FavContactsAction = SetFavoriteContactsAction 
    | SetSuccessFavoriteContactsAction 
    | ResetFavoriteContactsAction
    | SwitchFavoriteContactsAction 
    | DeleteContactFromFavoriteAction 
    | SetLoadingFavoriteContactsAction 

export const setFavoriteContactsActionCreator = (favoriteContacts: ContactDto[]): SetFavoriteContactsAction => ({
    type: SET_FAVORITE_CONTACTS,
    payload: {favoriteContacts}
});

export const switchFavoriteContactsActionCreator = (contact: ContactDto): SwitchFavoriteContactsAction => ({
    type: SWITCH_FAVORITE_CONTACTS,
    payload: {contact}
});

export const deleteContactFromFavoriteActionCreator = (id: string): DeleteContactFromFavoriteAction => ({
    type: DELETE_CONTACT_FROM_FAVORITE,
    payload: {id}
});

export const setLoadingFavoriteContactsActionCreator = (): SetLoadingFavoriteContactsAction => ({
    type: SET_LOADING_FAVORITE_CONTACTS,
});

export const setSuccessFavoriteContactsActionCreator = (): SetSuccessFavoriteContactsAction => ({
    type: SET_SUCCESS_FAVORITE_CONTACTS
});

export const resetFavoriteContactsActionCreator = (): ResetFavoriteContactsAction => ({
    type: RESET_FAVORITE_CONTACTS
});


export const fetchFavoriteContacts = () => {
    return async function (dispatch: any) { 
        try{
            dispatch(setLoadingFavoriteContactsActionCreator());
            const res = await fetch('https://mocki.io/v1/3b903a2f-b00d-48ff-a2c3-e608b952191c')
            const data = await res.json();
            dispatch(setFavoriteContactsActionCreator(data));
            dispatch(setSuccessFavoriteContactsActionCreator());
        }
        catch(e){
            dispatch(resetFavoriteContactsActionCreator());
        }
    };
};