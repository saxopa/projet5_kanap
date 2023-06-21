// Je récupère l'id de l'article dans l'URL
const params = new URL(document.location).searchParams;
// Je stocke l'id dans une variable
const id = params.get("id");
//je vérifie si ça fonctionne bien 
console.log("hello l'ID de cette article est : " + id);
// Je stocke l'URL de l'API dans une variable en y ajoutant l'id
const localUrl = `http://localhost:3000/api/products/${id}`;


const colorsSelect = document.getElementById("colors");

// Je sélectionne les éléments du DOM
const titleElement = document.getElementById("title");
const priceElement = document.getElementById("price");
const descriptionElement = document.getElementById("description");
const containerImg = document.querySelector(".item__img");

// Fonction pour récupérer et afficher les détails de l'article
const fetchArticle = () => {
  fetch(localUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

        // J'ajoute l'image à l'élément img
        const photo = document.createElement("img");
        photo.src = data.imageUrl;
        containerImg.appendChild(photo);

      // J'affiche les données dans les éléments correspondants
      titleElement.textContent = data.name;
      priceElement.textContent = data.price;
      descriptionElement.textContent = data.description;

     //j'affiche les couleurs dans le select
     data.colors.forEach((color) => {
        let option = document.createElement("option");
        option.value = color;
        option.textContent = color;
        colorsSelect.appendChild(option);
      });

      //limites de la quantité à 100 articles
        let quantity = document.getElementById("quantity");
        for (let i = 1; i <= 100; i++) {
            let option = document.createElement("option");
            option.value = i;
            option.textContent = i;
            quantity.appendChild(option);
            }
    
    
    })
    .catch((error) => {
      console.log(error);
    });
};
  

// Appel de la fonction pour récupérer et afficher les détails de l'article
fetchArticle();


