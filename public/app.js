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
}


var app = function(){
  var url = "https://api.punkapi.com/v2/beers";
  makeRequest(url, requestComplete);

  //go ahead and do the XHR stuff first
}

window.addEventListener('load', app);
