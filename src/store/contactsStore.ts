import {makeAutoObservable} from "mobx";
import { api } from "src/api";
import { ContactDto } from "src/types/dto/ContactDto";
import { groupContactsStore } from "./groupContactsStore";
export const contactsStore = makeAutoObservable({
    contacts: [] as ContactDto[],
    *get(){
        const result: ContactDto[] = yield api.getContacts();
        if(result) this.contacts = result;
    },
    *add(contact: ContactDto){
        const result: {success: boolean} = yield api.createSuccess();
        if(result && result.success) 
            this.contacts = [...this.contacts, contact];
    },
    *delete(id: ContactDto['id']){
        const result: {success: boolean} = yield api.createSuccess();
        if(result && result.success) 
            {
                this.contacts = this.contacts.filter((contact) => contact.id !== id);
                groupContactsStore.groupContacts = groupContactsStore.groupContacts.map((groupContact) => ({...groupContact, contactIds: groupContact.contactIds.filter((contactId) => contactId !== id)}));
            }
    },
    *switchFavorite(id: ContactDto['id']){
        const result: {success: boolean} = yield api.createSuccess();
        if(result && result.success) 
            this.contacts = this.contacts.map((contact) => contact.id === id ? {...contact, favorite: !contact.favorite} : contact);
    }
});