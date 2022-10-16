import './css/styles.css';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputText = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const debounce = require('lodash.debounce');
inputText.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  const name = evt.target.value.trim().toLowerCase();
  fetch(
    `https://restcountries.com/v3/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.length > 10) {
        warningAlert();
        return;
      } else if (data.length === 1) {
        addElmOneCountry(data[0]);
      } else if (data.length > 1) {
        addMaxTenElm(data);
      }
    })
    .catch(error => {
      cleanListHtml();
      cleanInfoHtml();
      errorAlert();
    });
}

function addElmOneCountry(oneCount) {
  cleanInfoHtml();
  list.innerHTML = `<li class="info-list"><img class="flags" src="${oneCount.flags[0]}" alt="flags-${oneCount.name.common}"/><p class="one__country">${oneCount.name.common}</p>`;

  countryInfo.insertAdjacentHTML(
    'beforeend',
    `<ul class="info__list">
        <li>Capital: ${oneCount.capital}</li>
        <li>Population: ${oneCount.population}</li>
        <li>Languages: ${arrLanguages(oneCount).join(', ')}</li>
      </ul>`
  );
}
function arrLanguages(oneCount) {
  const objectLanguages = oneCount.languages;
  const arrLanguages = [];
  for (const key in objectLanguages) {
    arrLanguages.push(objectLanguages[key]);
  }
  return arrLanguages;
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
  data.forEach(item => {
    markyp.push(
      `<li class="info-list"><img class="flags" src="${item.flags[0]}" alt="flags-${item.name.common}"/><p class="no__one">${item.name.common}</p></li>`
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
