import create from 'zustand';

export const useAskAlert = create((set) => ({
  askStatus: false,
  askTitle: '',
  askMessage: '',
  askElement: null,
  allowEnter: false,
  askCallBack: () => {},
  closeAsk: () => set(() => ({
    askStatus: false,
    askTitle: '',
    askMessage: '',
    askElement: null,
    allowEnter: false,
    askCallBack: () => {},
  })),
  ask: (title, message, callback, allowEnter = true, element) => set(() => ({
    askStatus: true,
    askTitle: title,
    askMessage: message,
    askElement: element,
    allowEnter,
    askCallBack: callback,
  })),
}));

export default useAskAlert;
