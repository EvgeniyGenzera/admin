const mongoose = require('mongoose');

const Service = mongoose.model('Service');

exports.renderServices = async (req, res) => {
  const services = await Service.find();

  res.render('admin/SERVICE/table', {
    title: 'Услуги',
    services,
  });
};

exports.renderAddNewService = (req, res) => {
  res.render('admin/SERVICE/form', {
    title: 'Добавление новой услуги',
  });
};

exports.addNewService = async (req, res) => {
  const { titleUA, titleRU, descriptionUA, descriptionRU, photo } = req.body;

  await new Service({
    titleUA,
    titleRU,
    descriptionUA,
    descriptionRU,
    photo,
  }).save();

  req.flash('success', 'Запись успешно добавлена');
  res.redirect('/admin/services/all');
};

exports.renderEditService = async (req, res) => {
  const { id } = req.params;

  const service = await Service.findOne({
    _id: id,
  });

  res.render('admin/SERVICE/form', {
    title: 'Редактирование записи',
    service,
  });
};

exports.editService = async (req, res) => {
  const { id } = req.params;

  await Service.findOneAndUpdate(
    {
      _id: id,
    },
    req.body,
  ).exec();

  req.flash('success', 'Запись успешно обновлена');
  res.redirect('/admin/services/all');
};

exports.deleteService = async (req, res) => {
  const { id } = req.params;

  await Service.findOneAndRemove({
    _id: id,
  });

  req.flash('success', 'Запись удалена');
  res.redirect('back');
};
