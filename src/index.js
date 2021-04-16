let addToy = false;
const baseURL = "http://localhost:3000/toys";

document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.querySelector("#toy-collection");
  
  fetch(baseURL)
  .then(response => response.json())
  .then(data => {
    data.forEach(createNewToy)
  })

  const createNewToy = (toy) => {
    const newDiv = document.createElement("div"), 
    imgTag = document.createElement("img"),
    hTag = document.createElement("h2"),
    pTag = document.createElement("p"),
    bttn = document.createElement("button")

    newDiv.className = "card";
    hTag.innerText = toy.name;
    imgTag.src = `${toy.image}`;
    imgTag.className = "toy-avatar";
    pTag.innerText = toy.likes;
    bttn.innerText = "Like"
    bttn.className = "like-btn"

    newDiv.append(hTag, imgTag, pTag, bttn);
    toyCollection.append(newDiv)

    bttn.addEventListener('click', function(){
      let likes = Number(pTag.innerText) + 1
      fetch(`${baseURL}/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type" : "application/json"
        },
        body:JSON.stringify({
          likes
        })
      })
      pTag.innerText = likes;
    });
  }


  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
