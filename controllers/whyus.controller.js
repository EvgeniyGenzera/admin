const mongoose = require('mongoose');

const Whyus = mongoose.model('Whyus');

exports.renderAll = async (req, res) => {
  const whyus = await Whyus.find();

  res.render('WHYUS/table', {
    title: 'Почему мы?',
    whyus,
  });
};

exports.renderAddNew = (req, res) => {
  res.render('WHYUS/form', {
    title: 'Создание новой записи',
  });
};

exports.addNew = async (req, res) => {
  const { title, text } = req.body;

  await new Whyus({
    title,
    text,
  }).save();

  req.flash('success', 'Запись успешно добавлена');
  res.redirect('/whyus/all');
};

exports.renderEdit = async (req, res) => {
  const { id } = req.params;

  const whyus = await Whyus.findOne({
    _id: id,
  });

  res.render('WHYUS/form', {
    title: 'Редактирование записи',
    whyus,
  });
};

exports.edit = async (req, res) => {
  const { id } = req.params;

  await Whyus.findOneAndUpdate(
    {
      _id: id,
    },
    req.body,
  ).exec();

  req.flash('success', 'Запись успешно обновлена');
  res.redirect('/whyus/all');
};

exports.deleteWhyus = async (req, res) => {
  const { id } = req.params;

  await Whyus.findOneAndRemove({
    _id: id,
  });

  req.flash('success', 'Запись удалена');
  res.redirect('back');
};
