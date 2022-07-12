import create from 'zustand';

export const useFileDialogue = create((set) => ({
  fileStatus: false,
  fileTitle: '',
  fileMessage: '',
  fileCallBack: () => {},
  closeFile: () => set(() => ({
    fileStatus: false,
    fileTitle: '',
    fileMessage: '',
    fileCallBack: () => {},
  })),
  askForFile: (title, message, callback) => set(() => ({
    fileStatus: true,
    fileTitle: title,
    fileMessage: message,
    fileCallBack: callback,
  })),
}));

export default useFileDialogue;
