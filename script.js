var form =document.querySelector('form');
let cityList = [];

function saveCity () {
  console.log("Saved cities")
}

// updates the search history
function updateCityList() {
  console.log("updated jokes list");
  for (var i = 0; i< cityList.length; i++) {
    var cityHTML = document.getElementById('city-list');
    var cityHTMLText =document.createElement("p");
    var cityText = cityList[i];
    
    cityHTML.append(cityHTMLText);
    cityHTMLText.textContent =cityText;
    document.querySelector('form').reset();
  };
 
};

// adds city input to array list
function addNewCity() {
  cityList.push(newCity);
  console.log("city list", cityList);
  updateCityList()
  
};

// initialize form button
function initListeners (event) {
    event.preventDefault();
    console.log("form-submit");
   
   newCity= document.getElementById('new-city').value;
   console.log(newCity);
  
   addNewCity();
};

 form.addEventListener('submit', initListeners);

