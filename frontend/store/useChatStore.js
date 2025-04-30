import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
// import { useAuthStore } from "./authStore.js";

export const useChatStore = create((set,get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers : async () =>{
        set({isUsersLoading : true})
        try {
            const res = await axiosInstance.get('/messages/users');
            set({users : res.data})
        } catch (error) {
            set({isUsersLoading : false})
            toast.error("Error ",error.response.data.message)
        }finally{
            set({isUsersLoading : false})
        }
    },

    getMessages : async (userId) => {
        console.log("userID :->  ",userId)
        set({isMessagesLoading : true});
        try {
            const res = await axiosInstance.get(`messages/${userId}`);
            console.log("getMessages line 30 -> ",res.data)
            set({messages : res.data});
            set({isMessagesLoading : false});
        } catch (error) {
            toast.error("Error ",error.response.data.message)
            set({isMessagesLoading : false});
        }finally{
            set({isMessagesLoading : false});
        }
    },

    sendMessage: async (messageData) => {
        console.log(messageData)
        const { selectedUser, messages } = get();
        console.log(selectedUser , messages);
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] });
          } catch (error) {
            console.log("Message add failed");

            toast.error(JSON.stringify(error));
            console.log("line 50 in useChatStore.js ",JSON.stringify(error))

        }
      },
    

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}))