import { create } from 'zustand';
import { RootState } from '@/types';

const useStore = create<RootState>((set) => ({
  isStarted: false,
  setIsStarted: (state: boolean) => set({ isStarted: state }),
}));

export default useStore;
