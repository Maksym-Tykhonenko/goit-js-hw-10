const fields = 'name,capital,population,flags,languages';
const BASE_URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(name) {

    return fetch(`${BASE_URL}${name}?fields=${fields}`).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json()
    });
 } 

