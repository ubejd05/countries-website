const searchBar = document.getElementById('search-bar');
const search = document.getElementById('search');
const ctrSection = document.getElementById('countries');
const modeBtn = document.getElementById('mode-btn');
const modeSpan = document.getElementById('mode');
const regionsBtn = document.getElementById('regions-click');
const regionsDropdown = document.getElementById('regions-dropdown');
const regions = document.querySelectorAll('.region');
const span = document.querySelector('.dropdown-placeholder');
const dropdownIcon = document.querySelector('#regions i');

async function getAllCountries() {
  let data = await fetch('https://restcountries.com/v2/all');
  let res = await data.json();
  
  showAllCountries(res);
}

function showAllCountries(data) {
  data.forEach((country) => {
    ctrSection.innerHTML += `
    <div class="country-card">
      <div class="flag"><img src="${country.flags.svg}"></div>
      <div class="info">
        <h4>${country.name}</h4>
        <li class="info-item"><strong>Population</strong>:  ${country.population}</li>
        <li class="info-item"><strong>Region</strong>:  ${country.region}</li>
        <li class="info-item"><strong>Capital</strong>:  ${country.capital}</li>
      </div>
    </div>
  `;
  });
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
  })
})