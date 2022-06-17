import create from 'zustand';

export const useButtons = create((set) => ({
  buttons: {
    notifications: false,
    home: false,
    profile: false,
    logIn: false,
    logOut: false,
    adminDash: false,
    terms: false,
  },
  setButtons: (value) => set(() => ({
    buttons: value,
  })),
}));

export default useButtons;