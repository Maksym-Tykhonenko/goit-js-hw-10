import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchcounries';
const DEBOUNCE_DELAY = 1000;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

//let queryingCountry = "";

const searchCounry = evt => {
    //что-бы не обнавлялась страница
    evt.preventDefault();
    //забираем данные из инпута, trim() обрезает пробелы
    const queryingCountry = evt.target.value.trim();
  //  console.log(queryingCountry);
    //если инпут не пустой то вызови foo fetchCountries()
    if (queryingCountry !== '') {
        fetchCountries(queryingCountry)
            .then(country => {
                console.log(country)
                //если список стран будет больше 10 то выведи сообщ.
                if (country.length > 10) {
                    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                    return;
                }
                //если поиск по инпут выдаст от 2х до 10 стран зарендери их список
                else if (country.length >= 2 || country.length <= 10) {
                    renderCountryList(country);
                }
                //если поиск по инпут выдаст 1 страну зарендери её карточку
                else if (country.length === 1) {
                    renderCountryInfo(country);
                }
            })
            .catch(error => {
                Notiflix.Notify.warning('Oops, there is no country with that name');
                return error;
            });
    }
};

const renderCountryList = country => {
    //сначала чистим форму 
    refs.countryList.innerHTML = '';
    //потом рендерим форму
    const countryListMarkup = country.map(({ flags, name }) => { 
        return `<li class="list-country"><p><img  src='${flags.svg}' alt='${name.common}' class="flag-list"';'>${name.common}</p></li>`
    }).join('');
    //вставляем нашу разметку
    refs.countryList.insertAdjacentHTML('afterbegin', countryListMarkup)
};
const renderCountryInfo = country => {
    //сначала чистим форму 
    refs.countryList.innerHTML = '';
    //рендерим форму для 1 страны
    const countryListMarkup = country.map(({ name, capital, population, flags, languages }) => {
        return ``
    }).join('');
    //вставляем разметку на страницу
    refs.countryInfot.insertAdjacentHTML('afterbegin', countryListMarkup)
};

refs.input.addEventListener('input', debounce(searchCounry, DEBOUNCE_DELAY));




