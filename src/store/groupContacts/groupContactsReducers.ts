import { GroupContactsDto } from "src/types/dto/GroupContactsDto";
import { ADD_GROUP_CONTACT, DELETE_CONTACT_FROM_GROUP, DELETE_GROUP_CONTACT, RESET_GROUP_CONTACTS, SET_GROUP_CONTACTS, SET_LOADING_GROUP_CONTACTS, SET_SUCCESS_GROUP_CONTACTS } from "./types/groupContactsActionTypes";
import { GroupContactsActions } from "./groupContactsActions";

interface IGroupContactsState {
    entities: Record<string, GroupContactsDto>;
    ids: string[];
    loading: boolean;
    success: boolean;
}

const initialState: IGroupContactsState = { entities: {}, ids: [], loading: false, success: false };

export const groupContactsReducer = (state: IGroupContactsState = initialState, action: GroupContactsActions) => {
    switch (action.type) {
        case SET_GROUP_CONTACTS:
            return {
                ...state,
                entities: {
                    ...action.payload.groupContacts.reduce((acc, groupContacts) => ({...acc, [groupContacts.id]: groupContacts}), {})
                },
                ids: action.payload.groupContacts.map(({id}) => id),
            };
        case SET_LOADING_GROUP_CONTACTS:
            return {
                ...state,
                loading: true,
                success: false
            }
        case SET_SUCCESS_GROUP_CONTACTS:
            return {
                ...state,
                loading: false,
                success: true
            }
        case RESET_GROUP_CONTACTS:
            return initialState;
        case ADD_GROUP_CONTACT:
            const newUid = crypto.randomUUID();
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [newUid]: {
                        ...action.payload.groupContact,
                        id: newUid
                    }
                },
                ids: [...state.ids, newUid]
            }
        case DELETE_GROUP_CONTACT:
            const {[action.payload.id]: deletedGroupContact, ...restGroupContacts} = state.entities;
            return {
                ...state,
                entities: restGroupContacts,
                ids: state.ids.filter((id) => id !== action.payload.id)
            }
        case DELETE_CONTACT_FROM_GROUP:
            return Object.values(state.entities).reduce<IGroupContactsState>((acc, groupContacts) => {
                return {
                    ...acc,
                    entities: {
                        ...acc.entities,
                        [groupContacts.id]: {
                            ...groupContacts,
                            contactIds: groupContacts.contactIds.filter((id) => id !== action.payload.id)
                        }
                    },
                    ids: [...acc.ids, groupContacts.id]
                }
            }, initialState);
        default:
            return state;
    }
};