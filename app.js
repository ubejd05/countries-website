const body = document.querySelector('body');
const searchSection = document.querySelector('#search');
const searchInput = document.getElementById('search-input');
const ctrSection = document.getElementById('countries');
const modeBtn = document.getElementById('mode-btn');
const regionsBtn = document.getElementById('regions-click');
const regionsDropdown = document.getElementById('regions-dropdown');
const regions = document.querySelectorAll('.region');
const span = document.querySelector('.dropdown-placeholder');
const dropdownIcon = document.querySelector('#regions i');
const loader = document.querySelector('.loader');
const main = document.querySelector('main');

let countries;
let apiData;

async function getAllCountries() {
  setTimeout(() => {
    loader.style.display = 'none';
  }, 2000);

  let data = await fetch('https://restcountries.com/v2/all');
  let res = await data.json();
  apiData = await res;
  
  showCountries(res);
}

function showCountries(data) {
  ctrSection.innerHTML = '';
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
      let countryName = country.dataset.name;
      getCountry(countryName);
      // console.log(countryName);
    });
  });
}

async function getCountry(country) {
  let data = await fetch(`https://restcountries.com/v2/name/${country}`);
  let res = await data.json();
  
  showSingleCountry(res[0]);
}

function showSingleCountry(country) {
  let currencies = [];
  let languages = [];
  let borders = country.borders;

  country.currencies.forEach((item) => {currencies.push(item.code + " ")});
  country.languages.forEach((item) => {languages.push(item.name + " ")});

  console.log(currencies)
  console.log(languages)
  console.log(borders)

  searchSection.style.display = 'none';
  ctrSection.innerHTML = `
    <div id="country">  
      <button id="back"><i class="fas fa-arrow-left"></i> Back</button>
      <div class="flag"><img src="${country.flag}" alt="" style="width: 650px;"></div>
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
                                                                    // nese eshte e fundit ktheje vetem emrin nese jo shtoja nje presje
  currencies.forEach((item, i) => {currenciesSpan.textContent += (i+1 == currencies.length ? item.trim() : item.trim() + ", ")})
  languages.forEach((item, i) => {languagesSpan.textContent += (i+1 == languages.length ? item.trim() : item.trim() + ", ")})
  borders.forEach((item) => {bordersSpan.innerHTML += `<span id="borderCountry">${item}</span>`})
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


searchInput.addEventListener('input', (e) => {
  countries.forEach((country) => {
    if (country.dataset.name.toLowerCase().indexOf(e.target.value) != -1) {
      country.style.display = "block"
    } else {
      country.style.display = "none"
    }
  })
})

regions.forEach((region) => {
  region.addEventListener('click', () => {
    if (region.textContent == 'All') {
      countries.forEach((country) => {
        country.style.display = "block";
      })
    } else {
      countries.forEach((country) => {
        if (country.dataset.region.toLowerCase() == region.textContent.toLowerCase()) {
          country.style.display = "block";
        } else {
          country.style.display = "none";
        }
      }) 
    }
    
    // console.log('IT WORKS!!!');
  });
});


modeBtn.addEventListener('click', (e) => {
  body.classList.toggle('light');
  if (modeBtn.textContent == ' Light Mode') {
    modeBtn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
  } else {
    modeBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
  }
})
