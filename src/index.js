import './css/styles.css';
import Notiflix from 'notiflix';
import { onInput } from './js/fetch';
const DEBOUNCE_DELAY = 300;

const inputText = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const debounce = require('lodash.debounce');
inputText.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

// function onInput(evt) {
//   const name = evt.target.value.trim().toLowerCase();
//   if (name === '') {
//     cleanListHtml();
//     return;
//   }
//   fetch(
//     `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
//   )
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
//     .then(data => {
//       if (data.length > 10) {
//         cleanListHtml();
//         warningAlert();
//         // return;
//       } else if (data.length === 1) {
//         addElmOneCountry(data[0]);
//       } else if (data.length >= 2 && data.length <= 10) {
//         addMaxTenElm(data);
//       }
//     })
//     .catch(error => {
//       cleanListHtml();
//       cleanInfoHtml();
//       errorAlert();
//     });
// }

function addElmOneCountry(oneCount) {
  cleanInfoHtml();
  list.innerHTML = `<li class="info-list"><img class="flags" src="${oneCount.flags.svg}" alt="flags-${oneCount.name.common}"/><p class="one__country">${oneCount.name.common}</p>`;

  countryInfo.insertAdjacentHTML(
    'beforeend',
    `<ul class="info__list">
        <li>Capital: ${oneCount.capital}</li>
        <li>Population: ${oneCount.population}</li>
        <li>Languages: ${arrLanguages(oneCount)}</li>
        
      </ul>`
  );
}
function arrLanguages(oneCount) {
  return Object.values(oneCount.languages).join(', ');
}
function warningAlert() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}
function errorAlert() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
function addMaxTenElm(data) {
  const markyp = [];
  cleanInfoHtml();
  data.map(item => {
    markyp.push(
      `<li class="info-list"><img class="flags" src="${item.flags.svg}" alt="flags-${item.name.common}"/><p class="no__one">${item.name.common}</p></li>`
    );
    list.innerHTML = markyp.join(' ');
  });
}

function cleanInfoHtml() {
  countryInfo.innerHTML = '';
}
function cleanListHtml() {
  list.innerHTML = '';
}
