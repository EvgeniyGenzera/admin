import axios from 'axios';

function checkboxAjax(...args) {
  const { target } = args[0];
  const { url, prop } = target.nextSibling.nextSibling.dataset;

  if (target.checked) {
    axios({
      url,
      method: 'POST',
      data: {
        [prop]: 'true',
      },
    });
  } else {
    axios({
      url,
      method: 'POST',
      data: {
        [prop]: 'false',
      },
    });
  }
}

export default checkboxAjax;
