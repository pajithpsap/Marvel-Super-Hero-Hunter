//Get the items, stored in local storage and
let resultId = localStorage.getItem("id");
startAbout();
async function startAbout() {
  // API call to get the data
  await fetch(
    `https://gateway.marvel.com/v1/public/characters/${resultId}?ts=1&apikey=9ab871748d83ae2eb5527ffd69e034de&hash=d35377547e551cd64a60657d2517bb7f`
  )
    .then((res) => res.json()) //Converting the data into JSON format
    .then((data) => display_results(data.data.results, data)); //sending the searched results characters to show in HTML
}

// Get all the data from Fetch
function display_results(results, response) {
  // getting Id's of element and change its text.
  //let re = results[0].description;
 // console.log(re);
  document.getElementById(
    "my-img"
  ).src = `${results[0].thumbnail.path}.${results[0].thumbnail.extension}`;
  document.getElementById("name").innerHTML =
    "<b>Name: </b> " + results[0].name;
  document.getElementById("id").innerHTML = "<b>Hero ID: </b> " + results[0].id;
  document.getElementById(
    "desc"
  ).innerHTML = "<b>Description: </b>" + results[0].description;
  document.getElementById("comic").innerHTML =
    "<b>Comic Available: </b>" + results[0].comics.available;
  document.getElementById("series").innerHTML =
    "<b>Series Available: </b>" + results[0].series.available;
  document.getElementById("stories").innerHTML =
    "<b>Stories Available: </b>" + results[0].stories.available;
  document.getElementById("count").innerHTML =
    "<b>Count: </b>" + response.data.count;
  document.getElementById("modified").innerHTML =
    "<b>Modified: </b>" + results[0].modified;
}
