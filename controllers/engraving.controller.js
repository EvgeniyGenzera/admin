const mongoose = require('mongoose');

const Engraving = mongoose.model('Engraving');

exports.renderEngravings = async (req, res) => {
  const engravings = await Engraving.find();

  res.render('ENGRAVING/table', {
    title: 'Гравировка',
    engravings,
  });
};

exports.renderAddNewEngraving = (req, res) => {
  res.render('ENGRAVING/form', {
    title: 'Создание записи',
  });
};

exports.addNewEngraving = async (req, res) => {
  const { photo, desc } = req.body;

  await new Engraving({
    photo,
    desc,
  }).save();

  req.flash('success', 'Запись успешно добавлена');
  res.redirect('/engraving/all');
};

exports.renderEditEngraving = async (req, res) => {
  const { id } = req.params;

  const engraving = await Engraving.findOne({
    _id: id,
  });

  res.render('ENGRAVING/form', {
    title: 'Редактирование записи',
    engraving,
  });
};

exports.editEngraving = async (req, res) => {
  const { id } = req.params;

  await Engraving.findOneAndUpdate(
    {
      _id: id,
    },
    req.body,
  ).exec();

  req.flash('success', 'Запись успешно обновлена');
  res.redirect('/engraving/all');
};

exports.editTitle = async (req, res) => {
  const { id, title } = req.body;

  await Engraving.findOneAndUpdate({
    _id: id,
  }, {
    title,
  }).exec();

  req.flash('success', 'Заголовок успешно обновлен');
  res.redirect('back');
};

exports.deleteEngraving = async (req, res) => {
  const { id } = req.params;

  await Engraving.findOneAndRemove({
    _id: id,
  });

  req.flash('success', 'Запись удалена');
  res.redirect('back');
};
