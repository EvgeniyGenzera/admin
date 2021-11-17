const mongoose = require('mongoose');

const Sale = mongoose.model('Sale');

exports.renderSales = async (req, res) => {
  const sales = await Sale.find();

  res.render('admin/SALE/table', {
    title: 'Акции',
    sales,
  });
};

exports.renderAddNewSale = (req, res) => {
  res.render('admin/SALE/form', {
    title: 'Добавление новой акции',
  });
};

exports.addNewSale = async (req, res) => {
  const {
    name,
    photo,
    visible,
  } = req.body;

  await new Sale({
    name,
    photo,
    visible,
  }).save();

  req.flash('success', 'Акция успешно добавлена');
  res.redirect('/admin/sale/all');
};

exports.renderEditSale = async (req, res) => {
  const { id } = req.params;

  const sale = await Sale.findOne({ _id: id });

  res.render('admin/SALE/form', {
    title: 'Редактирование акции',
    sale,
  });
};

exports.editSale = async (req, res) => {
  const { id } = req.params;

  await Sale.findOneAndUpdate(
    {
      _id: id,
    },
    req.body,
  ).exec();

  req.flash('success', 'Акция успешно обновлена');
  res.redirect('/admin/sale/all');
};

exports.deleteSale = async (req, res) => {
  const { id } = req.params;

  await Sale.findOneAndRemove({
    _id: id,
  });

  req.flash('success', 'Акция успешно удалена');
  res.redirect('back');
};
