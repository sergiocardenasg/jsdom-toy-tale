const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
let addToy = false;
let divCollect = document.querySelector('#toy-collection');


function getToys() {
  return fetch('http://localhost:3000/toys')
    .then(response => response.json())
}

function postToy(toyData) {
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toyData.name.value,
        "image": toyData.image.value,
        "likes": 0
      })
    })
    .then(response => response.json())
    .then((newToy) => {
      renderToys(newToy)
    });
};

function likes(event) {
  event.preventDefault()
  let addLikes = parseInt(event.target.previousElementSibling.innerText) + 1;

  fetch(`http://localhost:3000/toys/${event.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": addLikes
      })
    })
    .then(response => response.json())
    .then((likeObj => {
      event.target.previousElementSibling.innerText = `${addLikes} likes`;
    }))
}

function renderToys(toy) {
  let h2 = document.createElement('h2');
  h2.innerText = toy.name;

  let img = document.createElement('img');
  img.setAttribute('src', toy.image);
  img.setAttribute('class', 'toy-avatar');

  let p = document.createElement('p');
  p.innerText = `${toy.likes} likes`;

  let btn = document.createElement('button');
  btn.setAttribute('class', 'like-btn');
  btn.setAttribute('id', toy.id);
  btn.innerText = "Like";
  btn.addEventListener('click', (event) => {
    console.log(event.target.dataset);
    likes(event);
  });

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  divCollect.append(divCard)
};

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault();
      postToy(event.target);
    })
  } 
  else {
    toyForm.style.display = 'none'
  }
});

getToys().then(toys => {
  toys.forEach(toy => {
    renderToys(toy);
  });
})