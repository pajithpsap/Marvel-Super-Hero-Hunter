let search_box = document.getElementById("search-string");
var superHeroList = document.getElementById("superhero-list");
search_box.addEventListener("keyup", () => searchHeros(search_box.value));

async function searchHeros(input_value) {

  // let PUBLIC_KEY = "9ab871748d83ae2eb5527ffd69e034de";
  // let PRIVATE_KEY = "ad79003cf7316d9bd72c6eda71d1c93d7e807e90";

  
  // if there is no text written in the search bar then nothing is displayed 
  if (input_value.length == 0) {
       superHeroList.innerHTML = ``;
       return;
  }

  // API call to get the data 
  await fetch(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${input_value}&apikey=9ab871748d83ae2eb5527ffd69e034de&hash=d35377547e551cd64a60657d2517bb7f?ts=1`)
       .then(res => res.json()) //Converting the data into JSON format
       .then(data => display_results(data.data.results)) //sending the searched results characters to show in HTML
}




let searchresults = document.getElementById("search-results");
let searchHero = document.getElementById("search-string").value;

// This Function will display the Data on the Screen
function display_results(dat) {
 
  var results = dat;

  //if array list is empty message will show
  if (results.length === 0) {
    superHeroList.innerHTML = "<b>No Super Hero To Display</b>";
  }

  //otherwise display the superheros from list.
  else {
    superHeroList.innerHTML = "";

    //for loop will help to print all superheros from list.
    for (let result of results) {
      var search_res = searchresults.content.cloneNode(true);

      //  Get all the elemets from id and then changes its Inner HTMl
      search_res.getElementById(
        "my-img"
      ).src = `${result.thumbnail.path}.${result.thumbnail.extension}`;
      search_res.getElementById("name").textContent = result.name;

      //About button
      search_res.getElementById("about")
        .addEventListener("click", function () {
          localStorage.setItem("id", result.id);
          window.location.assign("./about.html");
        });

      //Fav button
      search_res.getElementById("fav")
        .addEventListener("click", function () {
          var index = localStorage.length;
          var data = JSON.stringify(result);
          localStorage.setItem(result.id, data);
        });
      superHeroList.appendChild(search_res);
    }
  }
}