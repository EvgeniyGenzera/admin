const mongoose = require('mongoose');

const MainSlider = mongoose.model('MainSlider');

exports.fetchMainSlider = async (req, res) => {
  const slides = await MainSlider.find({
    visible: 'true',
  });

  res.status(200).json(slides);
};

exports.render = async (req, res) => {
  const slides = await MainSlider.find();

  res.render('admin/MAIN-SLIDER/table', {
    title: 'Главный слайдер',
    slides,
  });
};

exports.renderAddNewSlide = (req, res) => {
  res.render('admin/MAIN-SLIDER/form', {
    title: 'Добавление нового слайда',
  });
};

exports.addNewSlide = async (req, res) => {
  const {
    name,
    nameRU,
    description,
    descriptionRU,
    photo,
    link,
    visible,
  } = req.body;

  await new MainSlider({
    name,
    nameRU,
    description,
    descriptionRU,
    photo,
    link,
    visible,
  }).save();

  req.flash('success', 'Слайд успешно добавлен');
  res.redirect('/admin/banner/all');
};

exports.renderEditSlide = async (req, res) => {
  const { id } = req.params;

  const slide = await MainSlider.findOne({ _id: id });

  res.render('admin/MAIN-SLIDER/form', {
    title: 'Редактирование слайда',
    slide,
  });
};

exports.editSlide = async (req, res) => {
  const { id } = req.params;

  await MainSlider.findOneAndUpdate(
    {
      _id: id,
    },
    req.body,
  ).exec();

  req.flash('success', 'Слайд успешно обновлен');
  res.redirect('/admin/banner/all');
};

exports.deleteSlide = async (req, res) => {
  const { id } = req.params;

  await MainSlider.findOneAndRemove({
    _id: id,
  });

  req.flash('success', 'Слайд успешно удален');
  res.redirect('back');
};
