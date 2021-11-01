const searchInput = document.getElementById('search-input');
const ctrSection = document.getElementById('countries');
const modeBtn = document.getElementById('mode-btn');
const modeSpan = document.getElementById('mode');
const regionsBtn = document.getElementById('regions-click');
const regionsDropdown = document.getElementById('regions-dropdown');
const regions = document.querySelectorAll('.region');
const span = document.querySelector('.dropdown-placeholder');
const dropdownIcon = document.querySelector('#regions i');
// const countries = document.querySelectorAll('.country-card');

async function getAllCountries() {
  let data = await fetch('https://restcountries.com/v2/all');
  let res = await data.json();
  
  showAllCountries(res);
}

function showAllCountries(data) {
  data.forEach((country) => {
    ctrSection.innerHTML += `
    <div class="country-card">
      <div class="flag"><img src="${country.flag}"></div>
      <div class="info">
        <h4>${country.name}</h4>
        <li class="info-item"><strong>Population</strong>:  ${country.population.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</li>
        <li class="info-item"><strong>Region</strong>:  ${country.region}</li>
        <li class="info-item"><strong>Capital</strong>:  ${country.capital === 'undefined' ? 'N/A': country.capital} </li>
      </div>
    </div>
  `;
  });
}

async function getCountry(country) {
  let data = await fetch(`https://restcountries.com/v2/name/${country}`);
  let res = await data.json();
  
  showCountry(res);
}

// Show single country
function showCountry(country) {
  ctrSection.innerHTML = `
  <div class="country-card">
    <div class="flag"><img src="${country[0].flag}"></div>
    <div class="info">
      <h4>${country[0].name}</h4>
      <li class="info-item"><strong>Population</strong>:  ${country[0].population.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</li>
      <li class="info-item"><strong>Region</strong>:  ${country[0].region}</li>
      <li class="info-item"><strong>Capital</strong>:  ${country[0].capital === 'undefined' ? 'N/A': country[0].capital} </li>
    </div>
  </div>
`;
}



getAllCountries();

regionsBtn.addEventListener('click', () => {
  regionsDropdown.classList.toggle('show');
  if (dropdownIcon.className == 'fas fa-angle-down') {
    dropdownIcon.className = 'fas fa-angle-up';
  } else {
    dropdownIcon.className = 'fas fa-angle-down';
  }
})

regions.forEach((region) => {
  region.addEventListener('click', () => {
    span.textContent = region.textContent;
    regionsDropdown.classList.remove('show');
    dropdownIcon.className = 'fas fa-angle-down';
  })
})

searchInput.addEventListener('change', (e) => {
  getCountry(e.target.value);
})