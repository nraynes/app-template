import * as imageConversion from 'image-conversion';

const maximumFileSizeInKb = 20;

const blobToFile = (blob, name) => (
  new File([blob], name, { type: blob.type })
);

const encode = (file, setFunction) => {
  imageConversion.compressAccurately(file, maximumFileSizeInKb).then((res) => {
    const compressedFile = blobToFile(res, 'profile');
    const reader = new FileReader();
    reader.readAsBinaryString(compressedFile);
    reader.onload = () => {
      setFunction(btoa(reader.result));
    };
  })
};

export default encode;