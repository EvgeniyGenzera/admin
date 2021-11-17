const mongoose = require('mongoose');

const Mount = mongoose.model('Mount');

exports.render = async (req, res) => {
  const mount = await Mount.findOne();

  res.render('MOUNT/form', {
    title: 'Монтаж',
    mount,
  });
}

exports.update = async (req, res) => {
  const { id, title, description } = req.body;
  if (!id) {
    await new Mount({
      title,
      description,
    }).save();
  }
  await Mount.findOneAndUpdate({
    _id: id,
  } , req.body).exec();

  req.flash('success', 'Запись успешно обновлена');
  res.redirect('back');
};
