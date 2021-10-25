const searchBar = document.getElementById('search-bar');
const search = document.getElementById('search');
// const 


async function getAllCountries() {
  let data = await fetch('https://restcountries.com/v2/all');
  let res = await data.json();
  
  showAllCountries(res);
}

getAllCountries();


