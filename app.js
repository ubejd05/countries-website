const searchBar = document.getElementById('search-bar');
const search = document.getElementById('search');
const ctrSection = document.getElementById('countries');
const modeBtn = document.getElementById('mode-btn');
const modeSpan = document.getElementById('mode');
const regionsBtn = document.getElementById('regions-click');
const regionsDropdown = document.getElementById('regions-dropdown');
const regions = document.querySelectorAll('.region');
const span = document.querySelector('.dropdown-placeholder');

async function getAllCountries() {
  let data = await fetch('https://restcountries.com/v2/all');
  let res = await data.json();
  
  showAllCountries(res);
}

getAllCountries();


regionsBtn.addEventListener('click', () => {
  regionsDropdown.classList.toggle('show');
})

regions.forEach((region) => {
  region.addEventListener('click', () => {
    span.textContent = region.textContent;
    regionsDropdown.classList.remove('show');
  })
  // console.log(regions);
})