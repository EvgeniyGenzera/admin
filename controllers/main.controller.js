const http = require('request');
const config = require('../config/config.json');

exports.renderMainPage = (req, res) => {
  res.render('admin/index', {
    title: 'Главная',
  });
};

exports.sendMsg = (req, res) => {
  if (req.headers.referer === 'http://gold-pasture.com/') {
    const reqBody = req.body;
    const checkForNumber = new RegExp(/^\d+$/);
    function hasNumber(myString) {
      return /\d/.test(myString);
    }
    if (!hasNumber(reqBody.name)) {
      const fields = [
        `<b>Name</b>: ${reqBody.name}`,
        `<b>Email</b>: ${reqBody.email}`,
        `<b>Phone</b>: ${reqBody.phone}`,
        `<b>Referer</b>: ${req.headers.referer}`,
      ];
      let msg = '';
      fields.forEach((field) => {
        msg += `${field}\n`;
      });
      msg = encodeURI(msg);
      http.post(
        `https://api.telegram.org/bot${config.telegram.token}/sendMessage?chat_id=${config.telegram.chat}&parse_mode=html&text=${msg}`,
        (error, response, body) => {
          console.log('error:', error);
          console.log('statusCode:', response && response.statusCode);
          console.log('body:', body);
          if (response.statusCode === 200) {
            // res.status(200).json({
            //   status: 'ok',
            //   message: 'Успешно отправлено!',
            // });
            res.redirect('/');
          }
          if (response.statusCode !== 200) {
            res.status(400).json({
              status: 'error',
              message: 'Произошла ошибка!',
            });
          }
        },
      );
    } else {
      res.redirect('/');
    }
  }
};
