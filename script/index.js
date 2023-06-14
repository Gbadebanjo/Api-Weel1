main();

function main() {
  const ul = document.querySelector("ul");
  const [img, bigname, gender, height, button] = document.querySelectorAll(".details>*");
  console.log(document.querySelectorAll(".details>*"));
  const [sec1, sec2] = document.querySelectorAll("section");
  fetchApi();

  button.addEventListener("click", () => {
    sec1.classList.remove("hide");
    sec2.classList.add("hide");
  });

  const arr = ["img/malestarwars.png", "img/woman.jpg", "img/Othersstarwar.jpg"];

  async function fetchApi() {
    let requestURL = "https://swapi.dev/api/people/";
    let request = new Request(requestURL);

    let response = await fetch(request);
    let starWars = await response.json();

    while (starWars.next !== null) {
      //  do something
      populate(starWars.results);
      requestURL = starWars.next;
      request = new Request(requestURL);

      response = await fetch(request);
      starWars = await response.json();
    }
  }

  function populate(charactersList) {
    // console.log(obj)
    charactersList.forEach((character) => {
      //console.log(character.name);
      const li = document.createElement("li");
      li.innerHTML = character.name;
      ul.append(li);
      li.addEventListener("click", () => showDetails(character));
    });
  }

  function showDetails(character) {
    console.log(character.name);
    bigname.innerHTML = character.name;
    gender.innerHTML = "Gender: " + character.gender;
    height.innerHTML = "Height: " + character.height;
    sec1.classList.add("hide");
    sec2.classList.remove("hide");

    img.src = imageSource(character.gender);
    sec2.prepend(img);
    img.style.width = "30%";
    img.style.marginTop = "50px";
    img.style.borderRadius = "50%";
  }

  function imageSource(gender) {
    if (gender == "male") {
      return arr[0];
    } else if (gender == "female") {
      return arr[1];
    } else {
      return arr[2];
    }
  }
}

// module.exports = { main }
