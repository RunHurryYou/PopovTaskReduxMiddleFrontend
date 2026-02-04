import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { ContactsAction } from "./contacts/contactsActions";
import { FavContactsAction } from "./favContacts/favContactsActions";
import { GroupContactsActions } from "./groupContacts/groupContactsActions";
import { ThunkDispatch } from "redux-thunk";

type AppActions = ContactsAction | FavContactsAction | GroupContactsActions;

export const useAppDispatch = useDispatch<ThunkDispatch<RootState, void, AppActions>>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;