const mongoose = require('mongoose');

const Product = mongoose.model('Product');
const ProductCategory = mongoose.model('ProductCategory');

exports.renderProducts = async (req, res) => {
  const products = await Product.find().populate('category');

  res.render('admin/PRODUCT/table', {
    title: 'Товары',
    products,
  });
};

exports.renderAddNewProduct = async (req, res) => {
  const productCategories = await ProductCategory.find();
  res.render('admin/PRODUCT/form', {
    title: 'Добавление нового товара',
    productCategories,
  });
};

exports.addNewProduct = async (req, res) => {
  const {
    nameUA,
    nameRU,
    descUA,
    descRU,
    newPrice,
    oldPrice,
    category,
    photo,
  } = req.body;

  await new Product({
    nameUA,
    nameRU,
    descUA,
    descRU,
    newPrice,
    oldPrice,
    category,
    photo,
  }).save();

  req.flash('success', 'Запись успешно добавлена');
  res.redirect('/admin/products/all');
};

exports.renderEditProduct = async (req, res) => {
  const { id } = req.params;
  const productCategories = await ProductCategory.find();

  const product = await Product.findOne({
    _id: id,
  }).populate('category');

  res.render('admin/PRODUCT/form', {
    title: 'Редактирование записи',
    product,
    productCategories,
  });
};

exports.editProduct = async (req, res) => {
  const { id } = req.params;

  await Product.findOneAndUpdate(
    {
      _id: id,
    },
    req.body,
  ).exec();

  req.flash('success', 'Запись успешно обновлена');
  res.redirect('/admin/products/all');
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  await Product.findOneAndRemove({
    _id: id,
  });

  req.flash('success', 'Запись удалена');
  res.redirect('back');
};
