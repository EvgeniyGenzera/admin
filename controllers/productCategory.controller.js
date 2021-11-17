const mongoose = require('mongoose');

const ProductCategory = mongoose.model('ProductCategory');

exports.renderCategories = async (req, res) => {
  const categories = await ProductCategory.find();

  res.render('admin/PRODUCT-CATEGORY/table', {
    title: 'Категории',
    categories,
  });
};

exports.renderAddNewCategory = (req, res) => {
  res.render('admin/PRODUCT-CATEGORY/form', {
    title: 'Добавление новой категории',
  });
};

exports.addNewCategory = async (req, res) => {
  const { nameUA, nameRU } = req.body;

  await new ProductCategory({
    nameUA,
    nameRU,
  }).save();

  req.flash('success', 'Запись успешно добавлена');
  res.redirect('/admin/product-categories/all');
};

exports.renderEditCategory = async (req, res) => {
  const { id } = req.params;

  const category = await ProductCategory.findOne({
    _id: id,
  });

  res.render('admin/PRODUCT-CATEGORY/form', {
    title: 'Редактирование записи',
    category,
  });
};

exports.editCategory = async (req, res) => {
  const { id } = req.params;

  await ProductCategory.findOneAndUpdate(
    {
      _id: id,
    },
    req.body,
  ).exec();

  req.flash('success', 'Запись успешно обновлена');
  res.redirect('/admin/product-categories/all');
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  await ProductCategory.findOneAndRemove({
    _id: id,
  });

  req.flash('success', 'Запись удалена');
  res.redirect('back');
};
