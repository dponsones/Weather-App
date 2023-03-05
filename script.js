var form =document.querySelector('form');
let cityList = [];
let cityHTMLText =document.createElement("p");
var cityHTML = document.getElementById('city-list');

// saves to local storage
function saveCity () {
  console.log("Saved cities");
  localStorage.setItem('city', JSON.stringify(cityList));
};

// get from local storage load to page
function loadCities () {
  console.log("loaded cities", cityList);
  
  var updatedCityList = JSON.parse(localStorage.getItem('city'));

  for (let i = 0; i < updatedCityList.length; i++) {
    var city = updatedCityList[i];
    var cityHTMLText = document.createElement("p");
    cityHTMLText.textContent = city;
    cityHTML.append(cityHTMLText);
  }
};

// updates the search history
function updateCityList() {
  console.log("updated city list");
    var cityText = newCity;
    cityHTML.append(cityHTMLText);
    cityHTMLText.textContent =cityText;
    document.querySelector('form').reset();

    saveCity();
};

// adds city input to array list
function addNewCity() {
  cityList.push(newCity);
  console.log("city list", cityList);
  updateCityList();
  
};

// initialize form button
function initListeners (event) {
  event.preventDefault();
    console.log("form-submit");  
    newCity = document.getElementById('new-city').value;
    console.log(newCity);
  
   addNewCity();
};
form.addEventListener('submit', initListeners);
loadCities();