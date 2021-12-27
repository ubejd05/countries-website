const body = document.querySelector('body');
const searchInput = document.getElementById('search-input');
const ctrSection = document.getElementById('countries');
const modeBtn = document.getElementById('mode-btn');
const regionsBtn = document.getElementById('regions-click');
const regionsDropdown = document.getElementById('regions-dropdown');
const regions = document.querySelectorAll('.region');
const span = document.querySelector('.dropdown-placeholder');
const dropdownIcon = document.querySelector('#regions i');
const loader = document.querySelector('.loader');

let countries;

async function getAllCountries() {
  setTimeout(() => {
    loader.style.display = 'none';
  }, 2000);

  let data = await fetch('https://restcountries.com/v2/all');
  let res = await data.json();
  
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
  
  showCountries(res);
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
