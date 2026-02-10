import { ContactDto } from "./types/dto/ContactDto";
import { GroupContactsDto } from "./types/dto/GroupContactsDto";

class Api {
    async getContacts():Promise<ContactDto[]> {
        const res = await this.fetch(process.env.REACT_APP_API_URL + "/3b903a2f-b00d-48ff-a2c3-e608b952191c");
        return res;
    }

    async getGroupContacts():Promise<GroupContactsDto[]> {
        const res = await this.fetch(process.env.REACT_APP_API_URL + "/fb737dba-03ae-42c2-bdfe-2adc48d52965");
        return res;
    }

    async createSuccess():Promise<{success: boolean}> {
        const res = await this.fetch(process.env.REACT_APP_API_URL + "/d8de35a0-254b-4531-81ed-9d60b5fe8fdc");
        return res;
    }

    async fetch(url: string, config?: RequestInit) {
        return fetch(url, config).then((res) => res.json());
    }
}

export const api = new Api();