var form =document.querySelector('form');
let cityList = [];
var cityHTMLText =document.createElement("p");

// saves to local storage
function saveCity () {
  console.log("Saved cities");
  localStorage.setItem('city', JSON.stringify(cityList));
  loadCities()
};

// load on to page from local storage
function loadCities () {
  console.log("loaded cities", cityList);
  let updatedCityList = JSON.parse(localStorage.getItem('city'));
  cityHTMLText.textContent = updatedCityList;
};

// updates the search history
function updateCityList() {
  console.log("updated jokes list");
    var cityHTML = document.getElementById('city-list');
    var cityHTMLText =document.createElement("p");
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