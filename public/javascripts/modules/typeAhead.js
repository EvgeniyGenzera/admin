import axios from 'axios';

function typeAhead(e) {
  const val = e.target.value;

  axios({
    method: 'GET',
    url: `/api/search?q=${val}`,
  }).then((res) => {
    console.log(res.data);
  });
}

export default typeAhead;
