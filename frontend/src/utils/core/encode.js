import * as imageConversion from 'image-conversion';

const maximumFileSizeInKb = 20;

/**
 * Converts a Blob to a File
 * @param {Blob} blob
 * @param {String} name
 * @returns {File}
 */
const blobToFile = (blob, name) => (
  new File([blob], name, { type: blob.type })
);

/**
 * Compresses and encodes a file into a string, then passes the result to a callback.
 * @param {File} file
 * @param {Function} callback
 * @returns {String}
 */
const encode = (file, callback) => {
  if (window.nowAwaiting) window.nowAwaiting()
  imageConversion.compressAccurately(file, maximumFileSizeInKb).then((res) => {
    const compressedFile = blobToFile(res, 'profile');
    const reader = new FileReader();
    reader.readAsBinaryString(compressedFile);
    reader.onload = () => {
      callback(btoa(reader.result));
      if (window.notAwaiting) window.notAwaiting()
    };
  })
};

export default encode;