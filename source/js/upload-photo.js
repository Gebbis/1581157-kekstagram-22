import {
  imgUploadPreviewImage
} from './edit-image.js'

const fileChooser = document.querySelector('.img-upload__input');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imgUploadPreviewImage.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
})
