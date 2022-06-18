import create from 'zustand';

export const useColorPicker = create((set) => ({
  open: false,
  setOpen: () => set(() => ({
    open: true,
  })),
  setClose: () => set(() => ({
    open: false,
  })),
}));

export default useColorPicker;