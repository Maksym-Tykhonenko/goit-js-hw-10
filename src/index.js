import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchcounries';
const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

const searchCounry = evt => {
    //что-бы не обнавлялась страница
    evt.preventDefault();
    //забираем данные из инпута, trim() обрезает пробелы
    const queryingCountry = evt.target.value.trim();
    //если инпут не пустой то вызови foo fetchCountries()
    if (queryingCountry !== '') {
        fetchCountries(queryingCountry)
            .then(country => {
                console.log(country)
                //если список стран будет больше 10 то выведи сообщ.
                if (country.length > 10) {
                    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.',
                    {
                    width: '360px'},);
                    return;
                }
                //если поиск по инпут выдаст от 2х до 10 стран зарендери их список
                else if (country.length >= 2 && country.length <= 10) {
                    renderCountryList(country);
                }
                //если поиск по инпут выдаст 1 страну зарендери её карточку
                else if (country.length === 1) {
                    renderCountryInfo(country);
                }
                })
                .catch(error => {
                    Notiflix.Notify.warning('Oops, there is no country with that name',
                     {
                    width: '360px'},);
                    return error;
                });
    }
};

const renderCountryList = country => {
    //сначала чистим форму 
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    //потом рендерим форму
    const countryListMarkup = country.map(({ flags, name }) => { 
        return `<li class="list-country"><p><img  src='${flags.svg}'
         alt='${name.common}' class="list-flag">${name.common}</p></li>`
    }).join('');
    //вставляем нашу разметку
    refs.countryList.insertAdjacentHTML('afterbegin', countryListMarkup)
};
const renderCountryInfo = country => {
    //сначала чистим форму 
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    //рендерим форму для 1 страны
    const countryInfoMarkup = country.map(({ name, capital, population, flags, languages }) => {
        return `<p class="info-country"><img  src='${flags.svg}' alt='${name.common}' class="info-flag">${name.common}</p>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        <p>Language: ${Object.values(languages)}</p> `
    }).join('');
    //вставляем разметку на страницу
    refs.countryInfo.insertAdjacentHTML('afterbegin', countryInfoMarkup)
};
//вешаем слушателя на инпут
refs.input.addEventListener('input', debounce(searchCounry, DEBOUNCE_DELAY));




