import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ContactDto } from "src/types/dto/ContactDto";

export const contactsApiSlice = createApi(
    {
        reducerPath: "contactsApi",
        baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
        endpoints: (builder) => ({
            getContacts: builder.query<ContactDto[], void>({
                query: () => "/3b903a2f-b00d-48ff-a2c3-e608b952191c",
            }),
            addContact: builder.mutation<{success: boolean}, ContactDto>({
                query: (contact) => ({
                    url: "/d8de35a0-254b-4531-81ed-9d60b5fe8fdc",
                    method: "GET",
                }),
                async onQueryStarted(contact, api) {
                    const res = await api.queryFulfilled
                    if(res.data.success){
                        api.dispatch(
                            contactsApiSlice.util.updateQueryData(
                                "getContacts",
                                undefined,
                                (draft) => [...draft, contact]
                            )
                        )
                    }
                    else{
                        alert("Failed to add contact")
                    }
                }
            }),
            deleteContact: builder.mutation<{success: boolean}, ContactDto['id']>({
                query: (id) => ({
                    url: `/d8de35a0-254b-4531-81ed-9d60b5fe8fdc`,
                    method: "GET"
                }),
                async onQueryStarted(id, api) {
                    const res = await api.queryFulfilled
                    if(res.data.success){
                        api.dispatch(
                            contactsApiSlice.util.updateQueryData(
                                "getContacts",
                                undefined,
                                (draft) => draft.filter((contact) => contact.id !== id)
                            )
                        )
                    }
                    else{
                        alert("Failed to delete contact")
                    }
                }
            }),
            switchFavoriteContact: builder.mutation<{success: boolean}, ContactDto['id']>({
                query: (id) => ({
                    url: `/d8de35a0-254b-4531-81ed-9d60b5fe8fdc`,
                    method: "GET"
                }),
                async onQueryStarted(id, api) {
                    const res = await api.queryFulfilled
                    if(res.data.success){
                        api.dispatch(contactsApiSlice.util.updateQueryData(
                            "getContacts",
                            undefined,
                            (draft) => draft.map((contact) => contact.id === id ? {...contact, favorite: !contact.favorite} : contact)
                        ));
                    }
                    else{
                        alert("Failed to switch favorite contact")
                    }
                }
            })
        }),
    }
)