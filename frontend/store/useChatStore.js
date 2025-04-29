import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./authStore";

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
        set({isMessagesLoading : true});
        try {
            const res = axiosInstance.get(`messages/${userId}`);
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
        console.log(selectedUser)
        try {
          const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
          set({ messages: [...messages, res.data] });
        } catch (error) {
          toast.error(error);
        }
      },
    

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}))