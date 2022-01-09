# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
  - [Author](#author)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode

### Links

- Solution URL: (https://www.frontendmentor.io/solutions/rest-countries-api-with-color-theme-switcher-8Z9FicDDY)
- Live Site URL: (https://countrieswebsite-ubi.netlify.app/)
- Code URL: (https://github.com/ubejd05/countries-website)

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- ES6 JavaScript
- Google Fonts
- Font Awesome

### What I learned

I learned many things while working on this project. First of all for the first time I implemented theme switching. I used a custom property to change the background color of the body and text. I also made a completely custom dropdown menu. 
I used flexbox to make the layout responsive and CSS Grid to make the layout more efficient. 
I also used the ES6 JavaScript to make the code more readable.
I learned how to use CSS Grid.


### Some code I'm proud of
```html
<div id="regions">
  <div id="regions-click">
    <span class="dropdown-placeholder">Filter by Region</span>
    <i class="fas fa-angle-down"></i>
  </div>
  <div id="regions-dropdown">
    <li class="region">All</li>
    <li class="region">Africa</li>
    <li class="region">Asia</li>
    <li class="region">Americas</li>
    <li class="region">Europe</li>
    <li class="region">Oceania</li>
  </div>
</div>
```
```css
@media(max-width: 1200px) {
  #countries {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media(max-width: 920px) {
  #countries {
    grid-template-columns: repeat(2, 1fr);
  }
}
```
```js
async function getAllCountries() {
  setTimeout(() => {
    loader.style.display = 'none';
  }, 2000);

  let data = await fetch('https://restcountries.com/v2/all');
  let res = await data.json();
  apiData = await res;
  
  showCountries(res);
}

regions.forEach((region) => {
  region.addEventListener('click', () => {
    regionDisplay.textContent = region.textContent;
    regionsDropdown.classList.remove('show');
    dropdownIcon.className = 'fas fa-angle-down';
    globalRegion = region.textContent;
    filterCountries();
  })
})
```
### Useful resources

- [MDN Web Docs](https://developer.mozilla.org/) - This helped me with Javascript
- [W3 Schools](https://www.w3schools.com/) - This helped me with Javascript and CSS
- [Rest Countries](https://restcountries.com/) - This is the API I used to get the data


## Author

- Website - [Ubejd Haziri](https://www.ubejd-haziri.netlify.app)
- Frontend Mentor - [@ubejd05](https://www.frontendmentor.io/profile/ubejd05)
- LinkedIn - [@ubejd05](https://github.com/ubejd05)

