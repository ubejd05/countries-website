const body = document.querySelector('body');
const searchSection = document.querySelector('#search');
const searchInput = document.getElementById('search-input');
const ctrSection = document.getElementById('countries');
const modeBtn = document.getElementById('mode-btn');
const regionsBtn = document.getElementById('regions-click');
const regionsDropdown = document.getElementById('regions-dropdown');
const regions = document.querySelectorAll('.region');
const regionDisplay = document.querySelector('.dropdown-placeholder');
const dropdownIcon = document.querySelector('#regions i');
const loader = document.querySelector('.loader');
const main = document.querySelector('main');

let countries;
let apiData;
let globalRegion = 'All';

async function getAllCountries() {
  setTimeout(() => {
    loader.style.display = 'none';
  }, 2000);

  let data = await fetch('https://restcountries.com/v2/all');
  let res = await data.json();
  apiData = await res;
  
  showCountries(res);
}

// Show all countries
function showCountries(data) {
  ctrSection.innerHTML = '';
  ctrSection.style.display = 'grid';

  data.forEach((country) => {
    ctrSection.innerHTML += `
      <div class="country-card" data-name=${country.name} data-region=${country.region}>
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
  countries = document.querySelectorAll('.country-card');
  countries.forEach((country) => {
    country.addEventListener("click", () => {
      let countryName = country.children[1].children[0].textContent;
      getCountry(countryName);
    });
  });
}

// Get country by name
async function getCountry(country) {
  let data = await fetch(`https://restcountries.com/v2/name/${country}`);
  let res = await data.json();
  
  showSingleCountry(res[0]);
}

// Show single country page
function showSingleCountry(country) {
  let currencies = [];
  let languages = [];
  let borders = country.borders;

  country.currencies.forEach((item) => {currencies.push(item.code + " ")});
  country.languages.forEach((item) => {languages.push(item.name + " ")});

  searchSection.style.display = 'none';
  ctrSection.style.display = 'block';
  ctrSection.innerHTML = `
    <div id="country">  
      <button id="back"><i class="fas fa-arrow-left"></i> Back</button>
      <div class="flag"><img src="${country.flag}" alt="flag"></div>
      <div class="info">
        <div><h1>${country.name}</h1></div>
        <div class="data">
          <ul>
            <li><b>Native Name:</b> ${country.nativeName}</li>
            <li><b>Population:</b> ${country.population.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</li>
            <li><b>Region:</b> ${country.region}</li>
            <li><b>Sub Region:</b> ${country.subregion}</li>
            <li><b>Capital:</b> ${country.capital}</li>
          </ul>
          <ul>
            <li><b>Top Level Domain:</b> ${country.topLevelDomain}</li>
            <li><b>Currencies:</b> <span id="currencies"></span></li>
            
            <li><b>Languages:</b> <span id="languages"></span></li>
          </ul>
        </div>
        <div class="borders"><b>Border Countries:</b> <span id="borderCountries"></span></div>
      </div>
    </div>`;

  const backBtn = document.getElementById('back'); 
  backBtn.addEventListener('click', () => {
    searchSection.style.display = 'flex';
    showCountries(apiData);
  });

  const currenciesSpan = document.querySelector('#currencies');
  const bordersSpan = document.querySelector('#borderCountries');
  const languagesSpan = document.querySelector('#languages');

  currencies.forEach((item, i) => {currenciesSpan.textContent += (i+1 == currencies.length ? item.trim() : item.trim() + ", ")})
  languages.forEach((item, i) => {languagesSpan.textContent += (i+1 == languages.length ? item.trim() : item.trim() + ", ")})
  if (!borders) {
    bordersSpan.innerHTML = '<span id="borderCountry">No border countries found!</span>'; 
  } else {
    borders.forEach((item) => {bordersSpan.innerHTML += `<span id="borderCountry">${item}</span>`}) 
  }
}

// Filter countries by region and name
function filterCountries() {
  let inputVal = searchInput.value;

  if (globalRegion === "All") {
    countries.forEach((country) => {
      let countryName = country.children[1].children[0].textContent;
      if (countryName.toLowerCase().indexOf(inputVal) !== -1) {
        country.style.display = "block";
      } else {
        country.style.display = "none";
      }
    });
  } else {
    countries.forEach((country) => {
      let countryName = country.children[1].children[0].textContent;
      if (country.dataset.region.toLowerCase() === globalRegion.toLowerCase() && countryName.toLowerCase().indexOf(inputVal) != -1 ) {
        country.style.display = "block";
      } else {
        country.style.display = "none";
      }
    });
  }
}

getAllCountries(); // Initial load


// Event listeners
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
    regionDisplay.textContent = region.textContent;
    regionsDropdown.classList.remove('show');
    dropdownIcon.className = 'fas fa-angle-down';
    globalRegion = region.textContent;
    filterCountries();
  })
})

// Not needed
// searchInput.addEventListener('change', (e) => {
//   getCountry(e.target.value);
//   searchInput.value = '';
// })

searchInput.addEventListener('input', (e) => {
  filterCountries();
})

modeBtn.addEventListener('click', (e) => {
  body.classList.toggle('light');
  if (modeBtn.textContent == ' Light Mode') {
    modeBtn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
  } else {
    modeBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
  }
})
