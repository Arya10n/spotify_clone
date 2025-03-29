import { create } from 'zustand';
import { axiosInstance } from '@/lib/axios';

interface chatStore {
  users: any[];
  isLoading: boolean;
  error: string | null;

  fetchUsers: () => Promise<void>;
}

export const useChatStore = create<chatStore>(set => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/users');
      set({ users: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    }
  },
}));
