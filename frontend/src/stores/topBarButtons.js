import create from 'zustand';

export const useButtons = create((set) => ({
  buttons: {
    colorPicker: false,
    home: false,
    profile: false,
    logIn: false,
    logOut: false,
  },
  setButtons: (value) => set(() => ({
    buttons: value,
  })),
}));

export default useButtons;