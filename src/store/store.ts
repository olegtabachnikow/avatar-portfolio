import { create } from 'zustand';

export interface RootState {
  isStarted: boolean;
  setIsStarted: (isMoved: boolean) => void;
  isTabletMode: boolean;
  setIsTabletMode: (state: boolean) => void;
  isParticlesMode3: boolean;
  setIsParticlesMode3: (state: boolean) => void;
}

const useStore = create<RootState>((set) => ({
  isStarted: false,
  setIsStarted: (state: boolean) => set({ isStarted: state }),
  isTabletMode: false,
  setIsTabletMode: (state: boolean) => set({ isTabletMode: state }),
  isParticlesMode3: false,
  setIsParticlesMode3: (state: boolean) => set({ isParticlesMode3: state }),
}));

export default useStore;
