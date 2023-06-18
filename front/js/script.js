//je stocke l'adresse url de l'API
const url = 'http://localhost:3000/api/products';
//Je stocke l'élément html dans une variable
const container = document.querySelector('.items');

//Je crée une fonction getInfo qui va chercher les données de l'API
const getInfo = () => {
    fetch(url)
    .then(function (res)  {
            return res.json();
    })
    .then(function (data){
        //j'affiche les données de l'API dans la console
        console.log(data);
        //Je crée une boucle pour afficher les données de l'API dans le html
        for (product in data) {
            //J'insère les données de l'API dans le html
            container.innerHTML += `
            <a href="./product.html?id=42">
            <article>
              <img src="${data[product].imageUrl}" alt="${data[product].altTxt}">
              <h3 class="productName">${data[product].name}</h3>
              <p class="productDescription">${data[product].description}</p>
            </article>
          </a>`
        }
    })
}

//J'appelle la fonction getInfo qui va chercher les données de l'API
getInfo();
