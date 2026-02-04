import { ContactDto } from "src/types/dto/ContactDto";
import { SET_CONTACTS, SET_LOADING_CONTACTS, SET_SUCCESS_CONTACTS, RESET_CONTACTS, ADD_CONTACT, DELETE_CONTACT } from "./types/contactActionTypes";
import { ContactsAction } from "./contactsActions";

interface IContactsState {
    entities: Record<string, ContactDto>;
    ids: string[];
    loading: boolean;
    success: boolean
}

const initialState: IContactsState = { entities: {}, ids: [], loading: false, success: false };

export const contactsReducer = (state: IContactsState = initialState, action: ContactsAction) => {
    switch (action.type) {
        case SET_CONTACTS:
            return {
                ...state,
                entities: {
                    ...action.payload.contacts.reduce((acc, contact) => ({...acc, [contact.id]: contact}), {})
                },
                ids: action.payload.contacts.map(({id}) => id),
            };
        case ADD_CONTACT:
            const newUid = crypto.randomUUID();
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [newUid]: {
                        ...action.payload.contact,
                        id: newUid
                    }
                },
                ids: [...state.ids, newUid]
            }
        case DELETE_CONTACT:
            const {[action.payload.id]: deletedContact, ...restContacts} = state.entities;
            return {
                ...state,
                entities: restContacts,
                ids: state.ids.filter((id) => id !== action.payload.id)
            }
        case SET_LOADING_CONTACTS:
            return {
                ...state,
                loading: true,
                success: false
            }
        case SET_SUCCESS_CONTACTS:
            return {
                ...state,
                loading: false,
                success: true
            }
        case RESET_CONTACTS:
            return initialState
        default:
            return state;
    }
};