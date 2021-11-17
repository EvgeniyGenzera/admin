const mongoose = require('mongoose');

const About = mongoose.model('About');
const Banner = mongoose.model('Banner');
const Sale = mongoose.model('Sale');
const Service = mongoose.model('Service');
const Whyus = mongoose.model('Whyus');
const Portfolio = mongoose.model('Portfolio');
const Product = mongoose.model('Product');
const Mount = mongoose.model('Mount');
const Engraving = mongoose.model('Engraving');

exports.fetchData = async (req, res) => {
  const whyusPromise = await Whyus.find();
  const servicesPromise = await Service.find();
  const salePromise = await Sale.findOne();
  const bannerPromise = await Banner.findOne();
  const aboutPromise = await About.findOne();
  const portfolioPromise = await Portfolio.find();
  const productPromise = await Product.find();
  const mountPromise = await Mount.findOne();
  const engravingPromise = await Engraving.find();

  const [about, banner, sale, services, whyus, portfolio, product, mount, engraving] = await Promise.all([aboutPromise, bannerPromise, salePromise, servicesPromise, whyusPromise, portfolioPromise, productPromise, mountPromise, engravingPromise]);

  res.json({
    about,
    banner,
    sale,
    services,
    whyus,
    portfolio,
    product,
    mount,
    engraving,
  });
};