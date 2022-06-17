import create from 'zustand';

export const useInputAlert = create((set) => ({
  inputStatus: false,
  inputTitle: '',
  inputMessage: '',
  inputCallBack: () => {},
  closeInput: () => set(() => ({
    inputStatus: false,
    inputTitle: '',
    inputMessage: '',
    inputCallBack: () => {},
  })),
  askForInput: (title, message, callback) => set(() => ({
    inputStatus: true,
    inputTitle: title,
    inputMessage: message,
    inputCallBack: callback,
  })),
}));

export default useInputAlert;
