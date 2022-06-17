import create from 'zustand';

export const useAwaiting = create((set) => ({
  awaiting: false,
  notAwaiting: () => set(() => ({
    awaiting: false,
  })),
  nowAwaiting: () => set(() => ({
    awaiting: true,
  })),
}));

export default useAwaiting;
