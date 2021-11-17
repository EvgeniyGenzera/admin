const mongoose = require('mongoose');
const Landing = mongoose.model('Landing');

exports.renderLandingSettings = (req, res) => {
    res.render('admin/Landing/form', {
        title: 'Edit landing data',
    });
};

exports.upsertData = async (req, res) => {
    const { bannerTxt } = req.body;

    await Landing({
        bannerTxt
    }).save();

    req.flash('success', 'Data saved');
    res.redirect('/admin/landing');
};

exports.renderEdit = async (req, res) => {
    const data = await Landing.findOne();
    console.log(data)
    res.render('admin/Landing/form', {
        title: 'Edit data',
        data,
    })
};

exports.editData = async (req, res) => {
    await Landing.findOneAndUpdate({}, req.body).exec();

    req.flash('success', 'Data saved');
    res.redirect('admin/landing');
}

exports.landing = async (req, res) => {
    const data = await Landing.findOne();

    res.cookie('i18n', req.cookies.i18n == undefined ? 'ru' : req.cookies.i18n);
    res.setLocale(req.cookies.i18n == undefined ? 'ru' : req.cookies.i18n);

    res.render('index', {
        data,
    });
};