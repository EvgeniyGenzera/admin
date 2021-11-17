const mongoose = require('mongoose');

const Review = mongoose.model('Review');

exports.renderReviews = async (req, res) => {
  const reviews = await Review.find();

  res.render('admin/REVIEW/table', {
    title: 'Отзывы',
    reviews,
  });
};

exports.renderAddNewReview = (req, res) => {
  res.render('admin/REVIEW/form', {
    title: 'Добавление нового отзыва',
  });
};

exports.addNewReview = async (req, res) => {
  const {
    name,
    text,
    visible,
  } = req.body;

  await new Review({
    name,
    text,
    visible,
  }).save();

  req.flash('success', 'Отзыв успешно добавлен');
  res.redirect('/admin/review/all');
};

exports.renderEditReview = async (req, res) => {
  const { id } = req.params;

  const review = await Review.findOne({ _id: id });

  res.render('admin/REVIEW/form', {
    title: 'Редактирование отзыва',
    review,
  });
};

exports.editReview = async (req, res) => {
  const { id } = req.params;

  await Review.findOneAndUpdate(
    {
      _id: id,
    },
    req.body,
  ).exec();

  req.flash('success', 'Отзыв успешно обновлен');
  res.redirect('/admin/review/all');
};

exports.deleteReview = async (req, res) => {
  const { id } = req.params;

  await Review.findOneAndRemove({
    _id: id,
  });

  req.flash('success', 'Отзыв успешно удален');
  res.redirect('back');
};
