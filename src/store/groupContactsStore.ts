import {makeAutoObservable} from "mobx";
import { api } from "src/api";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";
export const groupContactsStore = makeAutoObservable({
    groupContacts: [] as GroupContactsDto[],
    *get(){
        const result: GroupContactsDto[] = yield api.getGroupContacts();
        if(result) this.groupContacts = result;
    },
    *add(groupContact: GroupContactsDto){
        const result: {success: boolean} = yield api.createSuccess();
        if(result && result.success) 
            this.groupContacts = [...this.groupContacts, groupContact];
    },
    *delete(id: GroupContactsDto['id']){
        const result: {success: boolean} = yield api.createSuccess();
        if(result && result.success) 
            this.groupContacts = this.groupContacts.filter((groupContact) => groupContact.id !== id);
    },
});