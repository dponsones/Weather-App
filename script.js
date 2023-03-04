var form =document.querySelector('form');
var cityList = [];
var cityHTML = document.getElementById('city-list');

function updateCityList() {
  console.log("updated jokes list");
  const cityName = 
  for (var index = 0; index < cityList.length; index++) {
   
  }
  
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
   
   newCity= document.getElementById('new-city').value;
   console.log(newCity);
  
   addNewCity();
};

 form.addEventListener('submit', initListeners);

