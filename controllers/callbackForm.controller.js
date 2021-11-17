const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const http = require('request');

const config = require('../config/config.json');

const Callback = mongoose.model('Callback');

exports.renderCallbacks = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 20;
  const skip = page * limit - limit;
  const callbacksPromise = Callback.find().skip(skip).limit(limit);

  const countPromise = Callback.find();

  const [callbacks, count] = await Promise.all([
    callbacksPromise,
    countPromise,
  ]);

  const pages = Math.ceil(count / limit);

  res.render('admin/CALLBACK/table', {
    title: 'Входящие обращения',
    callbacks,
    count,
    page,
    pages,
  });
};

exports.addCallback = async (req, res) => {
  const { name, phone, message = null, type } = req.body;

  await new Callback({
    name,
    phone,
    message,
    type,
  }).save();

  const fields = [
    `<b>Имя</b>: ${name}`,
    `<b>Телефон</b>: ${phone}`,
  ];
  let msg = '';
  fields.forEach((field) => {
    msg += `${field}\n`;
  });
  msg = encodeURI(msg);
  http.post(
    `https://api.telegram.org/bot${config.telegram.token}/sendMessage?chat_id=${config.telegram.chat}&parse_mode=html&text=${msg}`,
    (error, response) => {
      if (response.statusCode === 200) {
        console.log('success');
      }
      if (response.statusCode !== 200) {
        console.log(error);
      }
    },
  );

  // const smtpTransport = nodemailer.createTransport({
  //   service: 'gmail',
  //   host: 'smtp.gmail.com',
  //   auth: {
  //     user: 'alinacgranit@gmail.com',
  //     pass: 'acgranit2017',
  //   },
  // });
  // const mailOptions = {
  //   to: 'linabis777@gmail.com',
  //   subject: 'Заказ с сайта',
  //   text: 'Заказ с сайта',
  //   html: `<!DOCTYPE html>
  //           <html>
  //           <body>
  //             <h1>Заказ с сайта</h1>
  //             <p>Имя - ${name}</p>
  //             <p>Телефон - ${phone}</p>
  //             <p>Сообщение - ${message}</p>
  //           </body>
  //           </html>`,
  // };
  // smtpTransport.sendMail(mailOptions, (error, response) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('sent');
  //   }
  // });

  res.status(200).json({
    success: true,
  });
};

exports.renderSingleCallback = async (req, res) => {
  const { id } = req.params;

  const callback = await Callback.findOne({ _id: id });

  res.render('admin/CALLBACK/form', {
    title: 'Просмотр заявки',
    callback,
  });
};

exports.deleteCallback = async (req, res) => {
  const { id } = req.params;

  await Callback.deleteOne({ _id: id });

  req.flash('success', 'Обращение успешно удалено');
  res.redirect('back');
};
