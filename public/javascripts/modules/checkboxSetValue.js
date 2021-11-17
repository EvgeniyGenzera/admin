function checkboxSetValue(...args) {
  const { target } = args[0];
  const hidden = target.nextSibling.nextSibling.nextSibling;

  if (target.checked) {
    hidden.value = 'true';
  } else {
    hidden.value = 'false';
  }
}

export default checkboxSetValue;
