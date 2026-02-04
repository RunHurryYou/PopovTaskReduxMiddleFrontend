import { ContactDto } from "src/types/dto/ContactDto";
import { FavoriteContactsDto } from "src/types/dto/FavoriteContactsDto";
import { FavContactsAction } from "./favContactsActions";
import { DELETE_CONTACT_FROM_FAVORITE, RESET_FAVORITE_CONTACTS, SET_FAVORITE_CONTACTS, SET_LOADING_FAVORITE_CONTACTS, SET_SUCCESS_FAVORITE_CONTACTS, SWITCH_FAVORITE_CONTACTS } from "./types/favContactsActionTypes";

interface IFavContacts {
    entities: Record<string, ContactDto>;
    ids: FavoriteContactsDto;
    loading: boolean;
    success: boolean;
}

const initialState: IFavContacts = { entities: {}, ids: [], loading: false, success: false };

export const favoriteContactsReducer = (state: IFavContacts = initialState, action: FavContactsAction) => {
    switch (action.type) {
        case SET_FAVORITE_CONTACTS:
            return {
                ...state,
                entities: {
                    ...action.payload.favoriteContacts.reduce((acc, contact) => ({ ...acc, [contact.id]: contact }), {})
                },
                ids: action.payload.favoriteContacts.map(({ id }) => id),
            };
        case SWITCH_FAVORITE_CONTACTS:
            if (state.ids.find((id) => id === action.payload.contact.id)) {
                const { [action.payload.contact.id]: deletedContact, ...restContacts } = state.entities;
                return {
                    ...state,
                    entities: restContacts,
                    ids: state.ids.filter((id) => id !== action.payload.contact.id)
                }
            } else {
                return {
                    ...state,
                    entities: {
                        ...state.entities,
                        [action.payload.contact.id]: action.payload.contact
                    },
                    ids: [...state.ids, action.payload.contact.id]
                };
            }
        case DELETE_CONTACT_FROM_FAVORITE:
            const { [action.payload.id]: deletedContact, ...restContacts } = state.entities;
            return {
                ...state,
                entities: restContacts,
                ids: state.ids.filter((id) => id !== action.payload.id)
            }
        case SET_LOADING_FAVORITE_CONTACTS:
            return { ...state, loading: true, success: false };
        case SET_SUCCESS_FAVORITE_CONTACTS:
            return { ...state, loading: false, success: true };
        case RESET_FAVORITE_CONTACTS:
            return initialState
        default:
            return state;
    }
};