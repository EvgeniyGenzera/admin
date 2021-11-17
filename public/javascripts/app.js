import '../sass/style.scss';

import axios from 'axios';
import { $, $$ } from './modules/bling';
import photoUpload from './modules/photoUpload';
import checkboxSetValue from './modules/checkboxSetValue';
import checkboxAjax from './modules/checkboxAjax';
import typeAhead from './modules/typeAhead';
import smoothscroll from 'smoothscroll-polyfill';
import inputmask from 'inputmask';
import jquery from 'jquery';

// kick off the polyfill!
smoothscroll.polyfill();

jQuery(document).ready(function(){
  jQuery('.content').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true
  });
});

Inputmask('+38 (099) 999 99 99', {
  placeholder: ' ', showMaskOnFocus: true, showMaskOnHover: true,
}).mask($$('input[name="phone"]'));

const PHOTO_UPLOAD_INPUT = $('#photoUpload');
if (PHOTO_UPLOAD_INPUT) {
  PHOTO_UPLOAD_INPUT.on('change', photoUpload);
}

const INP = $$('#inp');
if (INP) {
  INP.on('change', checkboxSetValue);
}

const CHECKBOX_SENT_AJAX = $$('#checkboxSentAjax');
if (CHECKBOX_SENT_AJAX) {
  CHECKBOX_SENT_AJAX.on('change', checkboxAjax);
}

const SEARCH = $('#search');
if (SEARCH) {
  SEARCH.on('keyup', typeAhead);
}

const langFooterDropdown = document.getElementById('langFooterDropdown');
const langDropdown = document.getElementById('langDropdown');
langDropdown.addEventListener('click', () => {
  langDropdown.classList.toggle('active');
}
)
langFooterDropdown.addEventListener('click', () => {
  langFooterDropdown.classList.toggle('active');
}
)
