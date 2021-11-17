const mongoose = require('mongoose');

const About = mongoose.model('About');

exports.render = async (req, res) => {
  const about = await About.findOne();

  res.render('admin/ABOUT/form', {
    title: 'О нас',
    about,
  });
};

exports.update = async (req, res) => {
  const { id, textUA, textRU } = req.body;
  if (!id) {
    await new About({
      textUA,
      textRU,
    }).save();
  } else {
    await About.findOneAndUpdate(
      {
        _id: id,
      },
      req.body,
    ).exec();
  }

  req.flash('success', 'Запись успешно обновлена');
  res.redirect('back');
};
