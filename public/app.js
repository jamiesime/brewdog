var beerList;

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}

var requestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var beers = JSON.parse(jsonString);
  beerList = beers;
  populateDropdown(beers);
};

var listBeerNames = function(beers){
  var ul = document.getElementById('beer-list');
  for (beer of beers){
    beerProfileSetUp(beer, ul);
  }
};

var getBeer = function(name){
  for (beer of beerList){
    if (name === beer.name){
      return beer;
    }
  }
}

var beerProfileSetUp = function(profile, ul){
  var thisBeer = document.createElement('div')
  thisBeer.classList.add("beer-profile");
  var img = document.createElement('img');
  img.src = profile.image_url;
  thisBeer.appendChild(img);
  var name = document.createElement('p');
  name.innerText = profile.name;
  thisBeer.appendChild(name);
  ul.appendChild(thisBeer);
}

var populateDropdown = function(beers){
  for (beer of beers){
    var option = document.createElement('option');
    option.value = beer.name;
    option.innerText = beer.name;
    var select = document.getElementById('dropdown');
    dropdown.appendChild(option);
  }
}

var switchBeer = function(){
  var name = this.value;
  var newBeer = getBeer(name);
  var ul = document.getElementById('beer-list');
  while (ul.firstChild){
    ul.removeChild(ul.firstChild);
  }
  beerProfileSetUp(newBeer, ul);
}


var app = function(){
  var url = "https://api.punkapi.com/v2/beers";
  makeRequest(url, requestComplete);

  //go ahead and do the XHR stuff first
  var dropdown = document.getElementById('dropdown');
  dropdown.addEventListener('change', switchBeer);
}

window.addEventListener('load', app);
