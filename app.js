const searchBar = document.getElementById('search-bar');
const search = document.getElementById('search');
const ctrSection = document.getElementById('countries');
const modeBtn = document.getElementById('mode-btn');
const modeSpan = document.getElementById('mode');


async function getAllCountries() {
  let data = await fetch('https://restcountries.com/v2/all');
  let res = await data.json();
  
  showAllCountries(res);
}

getAllCountries();


// Who wrote this shit? 