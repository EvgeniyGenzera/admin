function photoUpload(input) {
  const img = document.querySelector('#uploadedImg');
  const form = document.querySelector('form');

  if (input.target.files && input.target.files[0]) {
    const reader = new FileReader();

    reader.onload = (e) => {
      img.style.display = 'block';
      img.src = e.target.result;
      img.width = 380;
      img.height = 240;
      form.enctype = 'multipart/form-data';
    };

    reader.readAsDataURL(input.target.files[0]);
  }
}

export default photoUpload;
