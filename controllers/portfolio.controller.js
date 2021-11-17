const mongoose = require('mongoose');

const Portfolio = mongoose.model('Portfolio');

exports.renderPortfolios = async (req, res) => {
  const portfolios = await Portfolio.find();

  res.render('admin/PORTFOLIO/table', {
    title: 'Портфолио',
    portfolios,
  });
};

exports.renderAddNewPortfolio = (req, res) => {
  res.render('admin/PORTFOLIO/form', {
    title: 'Добавление новой работы',
  });
};

exports.addNewPortfolio = async (req, res) => {
  const { title, photo } = req.body;

  await new Portfolio({
    title,
    photo,
  }).save();

  req.flash('success', 'Запись успешно добавлена');
  res.redirect('/admin/portfolio/all');
};

exports.renderEditPortfolio = async (req, res) => {
  const { id } = req.params;

  const portfolio = await Portfolio.findOne({
    _id: id,
  });

  res.render('admin/PORTFOLIO/form', {
    title: 'Редактирование записи',
    portfolio,
  });
};

exports.editPortfolio = async (req, res) => {
  const { id } = req.params;

  await Portfolio.findOneAndUpdate(
    {
      _id: id,
    },
    req.body,
  ).exec();

  req.flash('success', 'Запись успешно обновлена');
  res.redirect('/admin/portfolio/all');
};

exports.deletePortfolio = async (req, res) => {
  const { id } = req.params;

  await Portfolio.findOneAndRemove({
    _id: id,
  });

  req.flash('success', 'Запись удалена');
  res.redirect('back');
};
