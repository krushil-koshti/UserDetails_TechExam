import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserState {
  addedUsers: any[];
  editedUsers: Record<string, any>;
  addUser: (user: any) => void;
  editUser: (user: any) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      addedUsers: [],
      editedUsers: {},
      addUser: user =>
        set(state => ({
          addedUsers: [user, ...state.addedUsers],
        })),
      editUser: user =>
        set(state => ({
          editedUsers: { ...state.editedUsers, [user.id]: user },
        })),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
