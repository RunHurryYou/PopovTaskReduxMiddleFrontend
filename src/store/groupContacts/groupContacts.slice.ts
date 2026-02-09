import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ContactDto } from "src/types/dto/ContactDto";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";

export const groupContactsSlice = createApi(
    {
        reducerPath: "groupContactsApi",
        baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
        endpoints: (builder) => ({
            getGroupContacts: builder.query<GroupContactsDto[], void>({
                query: () => "/fb737dba-03ae-42c2-bdfe-2adc48d52965",
            }),
            addGroupContact: builder.mutation<{success: boolean}, GroupContactsDto>({
                query: (groupContact) => ({
                    url: "/d8de35a0-254b-4531-81ed-9d60b5fe8fdc",
                    method: "GET",
                }),
                async onQueryStarted(groupContact, api) {
                    const res = await api.queryFulfilled
                    if(res.data.success){
                        api.dispatch(
                            groupContactsSlice.util.updateQueryData(
                                "getGroupContacts",
                                undefined,
                                (draft) => [...draft, groupContact]
                            )
                        )
                    }
                    else{
                        alert("Failed to add group contact")
                    }
                }
            }),
            deleteGroupContact: builder.mutation<{success: boolean}, GroupContactsDto['id']>({
                query: (id) => ({
                    url: `/d8de35a0-254b-4531-81ed-9d60b5fe8fdc`,
                    method: "GET"
                }),
                async onQueryStarted(id, api) {
                    const res = await api.queryFulfilled
                    if(res.data.success){
                        api.dispatch(
                            groupContactsSlice.util.updateQueryData(
                                "getGroupContacts",
                                undefined,
                                (draft) => draft.filter((groupContact) => groupContact.id !== id)
                            )
                        )
                    }
                    else{
                        alert("Failed to delete group contact")
                    }
                }
            }),
            deleteContactFromGroup: builder.mutation<{success: boolean}, {id: ContactDto['id'], groupId: GroupContactsDto['id']}>({
                query: (props) => ({
                    url: `/d8de35a0-254b-4531-81ed-9d60b5fe8fdc`,
                    method: "GET"
                }),
                async onQueryStarted(props, api) {
                    const res = await api.queryFulfilled
                    if(res.data.success){
                        api.dispatch(
                            groupContactsSlice.util.updateQueryData(
                                "getGroupContacts",
                                undefined,
                                (draft) => draft.map((groupContact) => groupContact.id === props.groupId ? {...groupContact, contactIds: groupContact.contactIds.filter((contactId) => contactId !== props.id)} : groupContact)
                            )
                        )
                    }
                    else{
                        alert("Failed to delete contact from group")
                    }
                }
            })
        }),
})