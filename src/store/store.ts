import { create } from 'zustand';

export interface RootState {
  isStarted: boolean;
  setIsStarted: (isMoved: boolean) => void;
  isTabletMode: boolean;
  setIsTabletMode: (state: boolean) => void;
}

const useStore = create<RootState>((set) => ({
  isStarted: false,
  setIsStarted: (state: boolean) => set({ isStarted: state }),
  isTabletMode: false,
  setIsTabletMode: (state: boolean) => set({ isTabletMode: state }),
}));

export default useStore;
